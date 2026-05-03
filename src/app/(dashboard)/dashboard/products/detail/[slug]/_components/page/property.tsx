import { FieldSet } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { ProductGetResponseType } from "@/fromServer/helpers/types/product.type";
import {
  Bookmark,
  Chat,
  CheckListFreeIcons,
  Eye,
  GitBranchIcon,
  List,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function ProductProperty({
  data,
  stock,
}: {
  data?: ProductGetResponseType;
  stock?: { loading?: boolean; value?: number };
}) {
  return (
    <FieldSet className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
      <div className="p-8 border bg-primary border-primary-2 rounded-xl flex justify-center items-stretch">
        <div className="flex-1 flex flex-col justify-center gap-2 items-start">
          <h3 className="text-primary-2/30 uppercase text-xs font-bold">
            Total Stock
          </h3>
          {stock?.loading ? (
            <Spinner />
          ) : (
            <p className="text-2xl font-bold text-background">{stock?.value}</p>
          )}
        </div>
        <div className="flex justify-center items-center">
          <HugeiconsIcon
            icon={List}
            className="text-muted-foreground"
            size={32}
          />
        </div>
      </div>
      <div className="p-8 border bg-primary border-primary-2 rounded-xl flex justify-center items-stretch">
        <div className="flex-1 flex flex-col justify-center gap-2 items-start">
          <h3 className="text-primary-2/30 uppercase text-xs font-bold">
            Sold
          </h3>
          <p className="text-2xl font-bold text-background">{data?.sold}</p>
        </div>
        <div className="flex justify-center items-center">
          <HugeiconsIcon
            icon={CheckListFreeIcons}
            className="text-muted-foreground"
            size={32}
          />
        </div>
      </div>
      <div className="p-8 border bg-primary-2 border-primary-2 rounded-xl flex justify-center items-stretch">
        <div className="flex-1 flex flex-col justify-center gap-2 items-start">
          <h3 className="text-primary/30 uppercase text-xs font-bold">
            Variants
          </h3>
          <p className="text-2xl font-bold">{data?._count.variants}</p>
        </div>
        <div className="flex justify-center items-center">
          <HugeiconsIcon
            icon={GitBranchIcon}
            className="text-muted-foreground"
            size={32}
          />
        </div>
      </div>

      <div className="p-8 border bg-primary-2 border-primary-2 rounded-xl flex justify-center items-stretch">
        <div className="flex-1 flex flex-col justify-center gap-2 items-start">
          <h3 className="text-primary/30 uppercase text-xs font-bold">Views</h3>
          <p className="text-2xl font-bold">{data?._count.productViews}</p>
        </div>
        <div className="flex justify-center items-center">
          <HugeiconsIcon
            icon={Eye}
            className="text-muted-foreground"
            size={32}
          />
        </div>
      </div>

      <div className="p-8 border bg-primary-2 border-primary-2 rounded-xl flex justify-center items-stretch">
        <div className="flex-1 flex flex-col justify-center gap-2 items-start">
          <h3 className="text-primary/30 uppercase text-xs font-bold">
            Reviews
          </h3>
          <p className="text-2xl font-bold">{data?._count.reviews}</p>
        </div>
        <div className="flex justify-center items-center">
          <HugeiconsIcon
            icon={Chat}
            className="text-muted-foreground"
            size={32}
          />
        </div>
      </div>

      <div className="p-8 border bg-primary-2 border-primary-2 rounded-xl flex justify-center items-stretch">
        <div className="flex-1 flex flex-col justify-center gap-2 items-start">
          <h3 className="text-primary/30 uppercase text-xs font-bold">
            Wishlist
          </h3>
          <p className="text-2xl font-bold">{data?._count.wishlists}</p>
        </div>
        <div className="flex justify-center items-center">
          <HugeiconsIcon
            icon={Bookmark}
            className="text-muted-foreground"
            size={32}
          />
        </div>
      </div>
    </FieldSet>
  );
}
