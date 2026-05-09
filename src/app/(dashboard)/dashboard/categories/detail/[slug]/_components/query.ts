import { ApiResponse } from "@/fromServer/helpers/types/api.type";
import {
  CategoryGetResponseType,
  CategoryGetValidationType,
} from "@/fromServer/helpers/types/category.type";
import { serverUrl } from "@/lib/constant";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetCategory = (
  identifier: CategoryGetValidationType,
): UseQueryResult<
  ApiResponse & {
    result?: CategoryGetResponseType;
  },
  Error
> => {
  return useQuery({
    queryKey: ["categories", "detail", identifier],
    queryFn: async () => {
      const response = await fetch(
        `${serverUrl}/api/categories/get?by=${identifier.by}&value=${identifier.value}`,
        {
          credentials: "include",
        },
      );
      const data = await response.json();
      return data;
    },
  });
};
