"use client";

import ProductTable from "@/app/(dashboard)/dashboard/products/_components/table/table";
import { useQueryProduct } from "@/app/(dashboard)/dashboard/products/_components/query";
import EmptyData from "@/app/_components/empty-data";
import LoadingData from "@/app/_components/loading-data";
import { validateQueryResult } from "@/helpers/query/validate-query";
import { useProductPageStore } from "@/stores/product.page.store";
import { Palette } from "@hugeicons/core-free-icons";
import { useEffect } from "react";

export default function Page() {
  const {
    setPage,
    setTotalItems,
    setTotalPage,
    setNext,
    setPrev,
    order,
    page,
    sort,
    take,
    q,
  } = useProductPageStore();
  const { data, isLoading, refetch } = useQueryProduct({
    q,
    order,
    page,
    sort,
    take,
  });

  useEffect(() => {
    if (data && data.success && data.result?.pagination) {
      setPage(data.result.pagination.page);
      setTotalItems(data.result.pagination.totalItems);
      setTotalPage(data.result.pagination.totalPages);
      setNext(data.result.pagination.hasNext);
      setPrev(data.result.pagination.hasPrev);
    }
  }, [data]);

  if (isLoading) return <LoadingData />;
  if (!validateQueryResult(data) && data?.result?.query?.length === 0)
    return <EmptyData title="Size" icon={Palette} url="/dashboard/sizes/add" />;
  return <ProductTable refetch={refetch} data={data?.result?.query} />;
}
