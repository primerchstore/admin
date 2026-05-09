import CategoryProductTable from "@/app/(dashboard)/dashboard/categories/detail/[slug]/_components/table/table";
import { useQueryProduct } from "@/app/(dashboard)/dashboard/products/_components/query";
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

export default function CategoryProduct({
  categorySlug,
}: {
  categorySlug?: string;
}) {
  const { data: products, isLoading: productsLoading } = useQueryProduct(
    {
      take: 10,
      order: "desc",
      page: 1,
      sort: "createdAt",
      category: categorySlug,
    },
    !!categorySlug,
  );
  return (
    <FieldGroup className="md:col-span-2 p-4 border border-primary/5 rounded-xl">
      <FieldSet>
        <FieldLegend className="flex justify-center items-center gap-2">
          <HugeiconsIcon icon={GitBranchIcon} /> Variants
        </FieldLegend>
        <FieldDescription></FieldDescription>
        <FieldGroup>
          {productsLoading && <LoadingData />}
          {!productsLoading &&
            products?.result?.query &&
            products.result.query.length === 0 && (
              <EmptyData title="Products" icon={GitBranchIcon} />
            )}
          {!productsLoading &&
            products?.result?.query &&
            products.result.query.length > 0 && (
              <CategoryProductTable data={products.result?.query} />
            )}
        </FieldGroup>
      </FieldSet>
    </FieldGroup>
  );
}
