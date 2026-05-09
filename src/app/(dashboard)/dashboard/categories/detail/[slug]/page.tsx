"use client";

import CategoryInformation from "@/app/(dashboard)/dashboard/categories/detail/[slug]/_components/page/information";
import CategoryMedia from "@/app/(dashboard)/dashboard/categories/detail/[slug]/_components/page/media";
import CategoryProduct from "@/app/(dashboard)/dashboard/categories/detail/[slug]/_components/page/product";
import CategoryProperty from "@/app/(dashboard)/dashboard/categories/detail/[slug]/_components/page/property";
import { useGetCategory } from "@/app/(dashboard)/dashboard/categories/detail/[slug]/_components/query";
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
  const { data, isLoading } = useGetCategory({ by: "slug", value: slug });
  if (isLoading) return <LoadingData />;
  if (!data || data.statusCode !== 200)
    return <EmptyData title="Category" icon={Package01Icon} />;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CategoryInformation data={data.result} />
      <CategoryMedia data={data.result} />
      <CategoryProperty data={data.result} />
      <CategoryProduct categorySlug={data?.result?.slug} />
    </div>
  );
}
