"use client";
import { usePostMediaBulk } from "@/app/(dashboard)/dashboard/medias/add/_components/query";
import {
  FileEntry,
  UploadStatus,
} from "@/app/(dashboard)/dashboard/medias/add/_components/type";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  Alert,
  CheckCircle,
  ImageUp,
  Loader,
  Upload,
  X,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

const MAX_FILE_SIZE_MB = 5;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function BulkUpload() {
  const [entries, setEntries] = useState<FileEntry[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const addFiles = useCallback((files: File[]) => {
    const valid = files.filter((f) => {
      if (!ACCEPTED_TYPES.includes(f.type)) {
        toast.error(`"${f.name}" is not a supported image type.`);
        return false;
      }
      if (f.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.error(`"${f.name}" exceeds ${MAX_FILE_SIZE_MB}MB.`);
        return false;
      }
      return true;
    });

    const newEntries: FileEntry[] = valid.map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random()}`,
      file,
      preview: URL.createObjectURL(file),
      status: "idle",
    }));

    setEntries((prev) => [...prev, ...newEntries]);
  }, []);

  const removeEntry = useCallback((id: string) => {
    setEntries((prev) => {
      const entry = prev.find((e) => e.id === id);
      if (entry) URL.revokeObjectURL(entry.preview);
      return prev.filter((e) => e.id !== id);
    });
  }, []);

  const { mutate, isPending } = usePostMediaBulk(entries, setEntries, router);

  const handleUpload = () => {
    const pendingIds = entries
      .filter((e) => e.status === "idle" || e.status === "error")
      .map((e) => e.id);
    if (!pendingIds.length) return;
    mutate(pendingIds);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      addFiles(Array.from(e.dataTransfer.files));
    },
    [addFiles],
  );

  const pendingCount = entries.filter(
    (e) => e.status === "idle" || e.status === "error",
  ).length;
  const successCount = entries.filter((e) => e.status === "success").length;
  const uploadingCount = entries.filter((e) => e.status === "uploading").length;

  return (
    <div className="w-full mx-auto space-y-4">
      <Card
        className={cn(
          "border-2 border-primary-2 border-dashed transition-colors cursor-pointer",
          isDragging
            ? "border-primary-2 bg-primary-2/5"
            : "border-muted-foreground/25 hover:border-primary-2/50",
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <CardContent className="flex flex-col items-center justify-center py-10 gap-3 text-center">
          <div className="p-3 rounded-full bg-muted">
            <HugeiconsIcon icon={Upload} />
          </div>
          <div>
            <p className="font-medium text-sm">
              Drag & drop images here, or{" "}
              <span className="text-primary underline underline-offset-2">
                browse
              </span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              JPG, PNG, WebP, GIF — max {MAX_FILE_SIZE_MB}MB each
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_TYPES.join(",")}
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files) addFiles(Array.from(e.target.files));
              e.target.value = "";
            }}
          />
        </CardContent>
      </Card>

      {entries.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="relative group rounded-lg overflow-hidden border bg-muted aspect-square"
            >
              <Image
                src={entry.preview}
                alt={entry.file.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 33vw"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />

              {entry.status !== "uploading" && (
                <button
                  onClick={() => removeEntry(entry.id)}
                  className="absolute top-1.5 right-1.5 p-0.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary-2"
                >
                  <HugeiconsIcon icon={X} />
                </button>
              )}

              <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between gap-1">
                <span className="text-[10px] text-white truncate drop-shadow max-w-[70%]">
                  {entry.file.name}
                </span>
                <StatusIcon status={entry.status} />
              </div>

              {entry.status === "uploading" && (
                <div className="absolute bottom-0 left-0 right-0">
                  <Progress value={undefined} className="h-1 rounded-none" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {entries.length > 0 && (
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap text-xs text-muted-foreground">
            {pendingCount > 0 && (
              <Badge variant="secondary">{pendingCount} pending</Badge>
            )}
            {uploadingCount > 0 && (
              <Badge
                variant="outline"
                className="text-blue-600 border-blue-300"
              >
                {uploadingCount} uploading
              </Badge>
            )}
            {successCount > 0 && (
              <Badge
                variant="outline"
                className="text-green-600 border-green-300"
              >
                {successCount} done
              </Badge>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                entries.forEach((e) => URL.revokeObjectURL(e.preview));
                setEntries([]);
              }}
              disabled={isPending}
            >
              Clear all
            </Button>
            <Button
              size="sm"
              onClick={handleUpload}
              disabled={isPending || pendingCount === 0}
            >
              {isPending ? (
                <>
                  <HugeiconsIcon icon={Loader} />
                  Uploading…
                </>
              ) : (
                <>
                  <HugeiconsIcon icon={ImageUp} />
                  Upload {pendingCount > 0 ? `(${pendingCount})` : ""}
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusIcon({ status }: { status: UploadStatus }) {
  if (status === "uploading") return <HugeiconsIcon icon={Loader} />;
  if (status === "success") return <HugeiconsIcon icon={CheckCircle} />;
  if (status === "error") return <HugeiconsIcon icon={Alert} />;
  return null;
}
