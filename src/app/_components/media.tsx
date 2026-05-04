import { useQueryMedia } from "@/app/(dashboard)/dashboard/medias/_components/query";
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
import { Field, FieldGroup } from "@/components/ui/field";
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
  Upload,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";

export default function MediaInput({
  media,
}: {
  media: { value: string[]; setValue: Dispatch<SetStateAction<string[]>> };
}) {
  console.log({ media: media.value });
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
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
        <DropdownMenuContent className="w-full">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <HugeiconsIcon icon={Computer} /> Upload from computer
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <MediaSelect media={media} />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function MediaSelect({
  media,
}: {
  media: { value: string[]; setValue: Dispatch<SetStateAction<string[]>> };
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
      media.setValue((prev) => [...prev, selectedId]);
    }
    setDialogOpen(false);
  };

  return (
    <Dialog
      defaultOpen={dialogOpen}
      open={dialogOpen}
      onOpenChange={(e) => setDialogOpen(!dialogOpen)}
    >
      <DialogTrigger asChild>
        <Button className="w-full" variant="ghost">
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
