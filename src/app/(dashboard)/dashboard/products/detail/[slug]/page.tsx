"use client";

import ProductInformation from "@/app/(dashboard)/dashboard/products/detail/[slug]/_components/page/information";
import ProductMedia from "@/app/(dashboard)/dashboard/products/detail/[slug]/_components/page/media";
import ProductProperty from "@/app/(dashboard)/dashboard/products/detail/[slug]/_components/page/property";
import ProductVariant from "@/app/(dashboard)/dashboard/products/detail/[slug]/_components/page/variant";
import {
  useGetProduct,
  useGetProductTotalStock,
} from "@/app/(dashboard)/dashboard/products/detail/[slug]/_components/query";
import EmptyData from "@/app/_components/empty-data";
import LoadingData from "@/app/_components/loading-data";
import { Package01Icon } from "@hugeicons/core-free-icons";
import { use } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data, isLoading } = useGetProduct({ by: "slug", value: slug });
  const { data: stock, isLoading: stockLoading } = useGetProductTotalStock({
    enabled: !!data?.result?.id,
    productId: data?.result?.id ?? "",
  });
  if (isLoading) return <LoadingData />;
  if (!data || data.statusCode !== 200)
    return <EmptyData title="Product" icon={Package01Icon} />;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ProductInformation data={data.result} />
      <ProductMedia data={data.result} />
      <ProductProperty
        data={data.result}
        stock={{ loading: stockLoading, value: stock?.result?.stock }}
      />
      <ProductVariant productId={data?.result?.id} />
    </div>
  );
}
