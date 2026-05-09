import { FieldSet } from "@/components/ui/field";
import { CategoryGetResponseType } from "@/fromServer/helpers/types/category.type";
import { GitBranchIcon, List } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function CategoryProperty({
  data,
}: {
  data?: CategoryGetResponseType;
}) {
  return (
    <FieldSet className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
      <div className="p-8 border bg-primary-2 border-primary-2 rounded-xl flex justify-center items-stretch">
        <div className="flex-1 flex flex-col justify-center gap-2 items-start">
          <h3 className="text-primary/30 uppercase text-xs font-bold">
            Total products
          </h3>
          <p className="text-2xl font-bold">{data?._count.products}</p>
        </div>
        <div className="flex justify-center items-center">
          <HugeiconsIcon
            icon={GitBranchIcon}
            className="text-muted-foreground"
            size={32}
          />
        </div>
      </div>
    </FieldSet>
  );
}
