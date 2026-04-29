"use client";
import GalleryCard from "@/app/(dashboard)/dashboard/medias/_components/gallery-card";
import { useQueryMedia } from "@/app/(dashboard)/dashboard/medias/_components/query";
import EmptyData from "@/app/_components/empty-data";
import LoadingData from "@/app/_components/loading-data";
import { MediaQueryResponseType } from "@/fromServer/helpers/types/media.type";
import { validateQueryResult } from "@/helpers/query/validate-query";
import { useMediaPageStore } from "@/stores/media.page.store";
import { Image01Icon } from "@hugeicons/core-free-icons";
import { useEffect } from "react";

export default function Page() {
  const {
    page,
    take,
    sort,
    order,
    setNext,
    setPrev,
    setTotalPage,
    setPage,
    setTotalItems,
  } = useMediaPageStore();
  const { data, isLoading, refetch } = useQueryMedia({
    page,
    take,
    sort,
    order,
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
      <EmptyData title="Media" icon={Image01Icon} url="/dashboard/medias/add" />
    );
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {data?.result?.query?.map(
        (item: MediaQueryResponseType["query"][number], index: number) => (
          <GalleryCard item={item} key={index} refetchMedia={refetch} />
        ),
      )}
    </div>
  );
}
