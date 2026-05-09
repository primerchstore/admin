"use client";

import EmptyData from "@/app/_components/empty-data";
import LoadingData from "@/app/_components/loading-data";
import { validateQueryResult } from "@/helpers/query/validate-query";
import { GridIcon } from "@hugeicons/core-free-icons";
import { useEffect } from "react";
import { useCategoryPageStore } from "@/stores/category.page.store";
import { useQueryCategory } from "@/app/(dashboard)/dashboard/categories/_components/query";
import CategoryTable from "@/app/(dashboard)/dashboard/categories/_components/table/table";

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
  } = useCategoryPageStore();
  const { data, isLoading, refetch } = useQueryCategory({
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
  if (validateQueryResult(data) && data?.result?.query?.length === 0)
    return (
      <EmptyData
        title="Category"
        icon={GridIcon}
        url="/dashboard/categories/create"
      />
    );
  return <CategoryTable refetch={refetch} data={data?.result?.query} />;
}
