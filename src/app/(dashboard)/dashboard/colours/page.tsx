"use client";

import { useQueryColour } from "@/app/(dashboard)/dashboard/colours/_components/query";
import ColourTable from "@/app/(dashboard)/dashboard/colours/_components/table/table";
import EmptyData from "@/app/_components/empty-data";
import LoadingData from "@/app/_components/loading-data";
import { validateQueryResult } from "@/helpers/query/validate-query";
import { useColourPageStore } from "@/stores/colour.page.store";
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
  } = useColourPageStore();
  const { data, isLoading, refetch } = useQueryColour({
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
    return (
      <EmptyData title="Colour" icon={Palette} url="/dashboard/colours/add" />
    );

  return <ColourTable refetch={refetch} data={data?.result?.query} />;
}
