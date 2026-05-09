import { FileEntry } from "@/app/(dashboard)/dashboard/medias/add/_components/type";
import { ApiResponse } from "@/fromServer/helpers/types/api.type";
import { MediaPostResponseType } from "@/fromServer/helpers/types/media.type";
import { serverUrl } from "@/lib/constant";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export const usePostMedia = (): UseMutationResult<
  ApiResponse & {
    result?: MediaPostResponseType;
  },
  any,
  File,
  unknown
> => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`${serverUrl}/api/admin/medias`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      return data;
    },
  });
};

export const usePostMediaBulk = (
  entries: FileEntry[],
  setEntries: Dispatch<SetStateAction<FileEntry[]>>,
  router: AppRouterInstance,
) => {
  return useMutation({
    mutationFn: async (ids: string[]) => {
      const files = entries
        .filter((e) => ids.includes(e.id))
        .map((e) => e.file);

      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));

      const res = await fetch(`${serverUrl}/api/admin/medias/bulk`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message ?? "Upload failed");
      }
      const data = await res.json();
      return data;
    },
    onMutate: (ids) => {
      setEntries((prev) =>
        prev.map((e) =>
          ids.includes(e.id) ? { ...e, status: "uploading" } : e,
        ),
      );
    },
    onSuccess: (_, ids) => {
      setEntries((prev) =>
        prev.map((e) => (ids.includes(e.id) ? { ...e, status: "success" } : e)),
      );
      toast.success(`${ids.length} image(s) uploaded successfully.`);
      router.push("/dashboard/medias");
    },
    onError: (err, ids) => {
      setEntries((prev) =>
        prev.map((e) =>
          ids.includes(e.id)
            ? { ...e, status: "error", error: (err as Error).message }
            : e,
        ),
      );
      toast.error((err as Error).message ?? "Upload failed.");
    },
  });
};
