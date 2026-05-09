import {
  useGetMedia,
  useQueryMedia,
} from "@/app/(dashboard)/dashboard/medias/_components/query";
import { usePostMedia } from "@/app/(dashboard)/dashboard/medias/add/_components/query";
import EmptyData from "@/app/_components/empty-data";
import LoadingData from "@/app/_components/loading-data";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import {
  MediaQueryResponseType,
  MediaQueryValidationType,
} from "@/fromServer/helpers/types/media.type";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  Computer,
  Images,
  ImageUpload01FreeIcons,
  Upload,
  X,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import { toast } from "sonner";

export default function MediaInput({
  media,
  addedMedia,
  deletedMedia,
}: {
  media: { value: string[]; setValue: Dispatch<SetStateAction<string[]>> };
  addedMedia?: {
    value: string[];
    setValue: Dispatch<SetStateAction<string[]>>;
  };
  deletedMedia?: {
    value: string[];
    setValue: Dispatch<SetStateAction<string[]>>;
  };
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {media.value.map((item, index: number) => (
        <div className="relative flex" key={index}>
          <Button
            type="button"
            className="z-2 absolute top-1 right-1 cursor-pointer"
            size="icon-sm"
            onClick={() => {
              media.setValue((prev) => prev.filter((a) => a !== item));
              if (addedMedia?.value.includes(item)) {
                addedMedia.setValue((prev) => prev.filter((id) => id !== item));
              } else {
                deletedMedia?.setValue((prev) => [...prev, item]);
              }
            }}
          >
            <HugeiconsIcon icon={X} />
          </Button>
          <MediaImageCard id={item} />
        </div>
      ))}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="aspect-square flex justify-center items-center border border-dashed rounded-lg cursor-pointer">
            <HugeiconsIcon
              icon={Upload}
              size={20}
              className="text-muted-foreground"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-60">
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <MediaUpload addedMedia={addedMedia} media={media} />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <MediaSelect addedMedia={addedMedia} media={media} />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function MediaSelect({
  media,
  addedMedia,
}: {
  media: { value: string[]; setValue: Dispatch<SetStateAction<string[]>> };
  addedMedia?: {
    value: string[];
    setValue: Dispatch<SetStateAction<string[]>>;
  };
}) {
  const [selectedId, setSelectedId] = useState<string>();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [mediaQuery, setMediaQuery] = useState<MediaQueryValidationType>({
    take: 9,
    order: "desc",
    page: 1,
    sort: "createdAt",
  });
  const { data, isLoading } = useQueryMedia(mediaQuery);

  const handleSelect = () => {
    if (selectedId) {
      if (media.value.includes(selectedId)) {
        toast.error("Already selected");
        return;
      }
      media.setValue((prev) => [...prev, selectedId]);
      if (addedMedia) addedMedia.setValue((prev) => [...prev, selectedId]);
    }

    if (!selectedId) {
      toast.error("Select the image!");
      return;
    }

    setDialogOpen(false);
  };

  return (
    <Dialog
      defaultOpen={dialogOpen}
      open={dialogOpen}
      onOpenChange={() => setDialogOpen(!dialogOpen)}
    >
      <DialogTrigger asChild>
        <Button className="w-full justify-start" variant="ghost">
          <HugeiconsIcon icon={Images} />
          Select from media
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Media</DialogTitle>
        </DialogHeader>
        {isLoading && <LoadingData />}
        {!isLoading &&
          data &&
          data.result?.query &&
          data.result.query.length === 0 && <EmptyData title="Media" />}
        {!isLoading &&
          data &&
          data.result?.query &&
          data.result.query.length > 0 && (
            <div className="grid gap-2 grid-cols-3">
              {data.result.query.map(
                (
                  item: MediaQueryResponseType["query"][number],
                  index: number,
                ) => (
                  <div
                    onClick={() => setSelectedId(item.id)}
                    className={cn(
                      "aspect-square cursor-pointer overflow-hidden rounded-lg border",
                      selectedId === item.id && "border-primary border-dashed",
                    )}
                    key={index}
                  >
                    <Image
                      src={item?.url}
                      alt="media"
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ),
              )}
            </div>
          )}
        <DialogFooter>
          <div className="flex justify-between w-full items-center">
            <Field orientation="horizontal">
              <Button
                onClick={() =>
                  setMediaQuery((prev) => ({ ...prev, page: prev.page - 1 }))
                }
                disabled={!data?.result?.pagination.hasPrev}
              >
                <HugeiconsIcon icon={ArrowLeft} />
              </Button>
              <Button
                onClick={() =>
                  setMediaQuery((prev) => ({ ...prev, page: prev.page + 1 }))
                }
                disabled={!data?.result?.pagination.hasNext}
              >
                <HugeiconsIcon icon={ArrowRight} />
              </Button>
            </Field>
            <Field orientation="horizontal">
              <DialogClose asChild>
                <Button className="ml-auto" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button onClick={handleSelect}>Select</Button>
            </Field>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function MediaImageCard({ id }: { id: string }) {
  const { data, isLoading } = useGetMedia({ by: "id", value: id });
  return (
    <div className="aspect-square z-1 flex overflow-hidden justify-center items-center border rounded-lg cursor-pointer">
      {isLoading && <Spinner />}
      {data && data.result?.url && (
        <Image
          loading="lazy"
          src={data.result.url}
          alt="media"
          width={400}
          height={400}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}

function MediaUpload({
  media,
  addedMedia,
}: {
  media: { value: string[]; setValue: Dispatch<SetStateAction<string[]>> };
  addedMedia?: {
    value: string[];
    setValue: Dispatch<SetStateAction<string[]>>;
  };
}) {
  const [image, setImage] = useState<{ file: File; preview: string } | null>(
    null,
  );
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { mutate, isPending } = usePostMedia();

  const handleClick = () => {
    inputRef.current?.click();
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setImage({
      file,
      preview: previewUrl,
    });
  };

  const handleRemove = () => {
    if (image?.preview) {
      URL.revokeObjectURL(image.preview);
    }
    setImage(null);
  };

  const handleUpload = () => {
    if (!image) return;
    mutate(image.file, {
      onSuccess: (data) => {
        if (data) {
          if (!data.success) toast.error("Something went wrong!");
          if (data.success && data.result && data.result.id) {
            media.setValue((prev) => [...prev, data.result?.id as string]);
            if (addedMedia) {
              addedMedia.setValue((prev) => [
                ...prev,
                data.result?.id as string,
              ]);
            }
          }
        }
        setDialogOpen(false);
      },
    });
  };

  return (
    <Dialog
      open={dialogOpen}
      defaultOpen={dialogOpen}
      onOpenChange={() => setDialogOpen(!dialogOpen)}
    >
      <DialogTrigger asChild>
        <Button className="w-full justify-start" variant="ghost">
          <HugeiconsIcon icon={Computer} /> Upload from computer
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload image from your computer</DialogTitle>
        </DialogHeader>

        <div className="">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
          {image ? (
            <div className="rounded-xl my-4 overflow-hidden relative flex">
              <Button
                onClick={handleRemove}
                disabled={isPending}
                className="absolute z-2 right-2 top-2"
              >
                Remove <HugeiconsIcon icon={X} />
              </Button>
              <Image
                src={image.preview}
                alt="preview"
                width={800}
                height={800}
                className="w-full z-1"
              />
            </div>
          ) : (
            <div
              className="w-full my-4 flex-col gap-2 cursor-pointer flex justify-center items-center border border-dashed p-4 rounded-xl"
              onClick={handleClick}
            >
              <HugeiconsIcon
                icon={ImageUpload01FreeIcons}
                className="text-muted-foreground"
              />
              <p className="text-muted-foreground">Upload media</p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Field orientation="horizontal" className="justify-end">
            <DialogClose asChild>
              <Button disabled={isPending} variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={handleUpload} disabled={!image || isPending}>
              {isPending ? <Spinner /> : "Upload"}
            </Button>
          </Field>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
