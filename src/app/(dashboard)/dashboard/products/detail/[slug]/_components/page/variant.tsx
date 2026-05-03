import ProductVariantsTable from "@/app/(dashboard)/dashboard/products/detail/[slug]/_components/table/table";
import { useQueryVariant } from "@/app/(dashboard)/dashboard/variants/_components/query";
import EmptyData from "@/app/_components/empty-data";
import LoadingData from "@/app/_components/loading-data";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { GitBranchIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function ProductVariant({ productId }: { productId?: string }) {
  const { data: variants, isLoading: variantsLoading } = useQueryVariant(
    {
      take: 10,
      order: "desc",
      page: 1,
      sort: "createdAt",
      productId: productId,
    },
    !!productId,
  );
  return (
    <FieldGroup className="md:col-span-2 p-4 border border-primary/5 rounded-xl">
      <FieldSet>
        <FieldLegend className="flex justify-center items-center gap-2">
          <HugeiconsIcon icon={GitBranchIcon} /> Variants
        </FieldLegend>
        <FieldDescription></FieldDescription>
        <FieldGroup>
          {variantsLoading && <LoadingData />}
          {!variantsLoading &&
            variants?.result?.query &&
            variants.result.query.length === 0 && (
              <EmptyData title="Variants" icon={GitBranchIcon} />
            )}
          {!variantsLoading &&
            variants?.result?.query &&
            variants.result.query.length > 0 && (
              <ProductVariantsTable data={variants.result?.query} />
            )}
        </FieldGroup>
      </FieldSet>
    </FieldGroup>
  );
}
