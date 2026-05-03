import EmptyData from "@/app/_components/empty-data";
import { Badge } from "@/components/ui/badge";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { ProductGetResponseType } from "@/fromServer/helpers/types/product.type";
import {
  Image01FreeIcons,
  PencilEdit01FreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";

export default function ProductMedia({
  data,
}: {
  data?: ProductGetResponseType;
}) {
  return (
    <FieldGroup className="p-4 border border-primary/5 rounded-xl">
      <FieldSet>
        <FieldLegend className="flex justify-center items-center gap-2">
          <HugeiconsIcon icon={PencilEdit01FreeIcons} /> Media
        </FieldLegend>
        <FieldDescription></FieldDescription>
      </FieldSet>
      {data?.medias && data.medias.length === 0 && (
        <EmptyData title="Media" icon={Image01FreeIcons} />
      )}
      {data?.medias && data.medias.length > 0 && (
        <div className="w-full grid gap-2 grid-rows-2 grid-cols-2 md:grid-cols-4">
          {data.medias.map((item, index: number) => (
            <div
              key={index}
              className="aspect-square rounded-lg overflow-hidden border border-primary/10 relative flex"
            >
              {index === 0 && (
                <Badge className="z-2 absolute top-1 right-1">Cover</Badge>
              )}
              <Image
                alt="cover"
                width={400}
                height={400}
                loading="lazy"
                className="w-full h-full object-cover z-1"
                src={item.media.url}
              />
            </div>
          ))}
        </div>
      )}
    </FieldGroup>
  );
}
