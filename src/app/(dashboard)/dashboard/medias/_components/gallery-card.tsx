import DeleteMediaAlert from "@/app/(dashboard)/dashboard/medias/_components/delete-alert";
import { Button } from "@/components/ui/button";
import { MediaQueryResponseType } from "@/fromServer/helpers/types/media.type";
import { GitBranchIcon, Package01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";

export default function GalleryCard({
  item,
  refetchMedia,
}: {
  item: MediaQueryResponseType["query"][number];
  refetchMedia?: () => void;
}) {
  return (
    <div className="rounded-lg overflow-hidden border border-primary/5 flex flex-col justify-start items-stretch">
      <Image
        src={item.url}
        width={600}
        height={600}
        alt="media"
        loading="lazy"
        className="w-full object-cover aspect-square"
      />
      <div className="flex gap-1 justify-center items-center border-t border-primary/5 p-2">
        <Button size="sm">
          <HugeiconsIcon icon={Package01Icon} /> {item._count.productMedias}
        </Button>
        <Button size="sm">
          <HugeiconsIcon icon={GitBranchIcon} /> {item._count.variantMedias}
        </Button>

        <DeleteMediaAlert id={item.id} onSuccess={refetchMedia} />
      </div>
      <div className="">{item.id}</div>
    </div>
  );
}
