import { ApiResponse } from "@/fromServer/helpers/types/api.type";
import {
  ProductGetResponseType,
  ProductGetValidationType,
} from "@/fromServer/helpers/types/product.type";
import { serverUrl } from "@/lib/constant";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetProduct = (
  identifier: ProductGetValidationType,
): UseQueryResult<
  ApiResponse & {
    result?: ProductGetResponseType;
  },
  Error
> => {
  return useQuery({
    queryKey: ["products", "detail", identifier],
    queryFn: async () => {
      const response = await fetch(
        `${serverUrl}/api/products/get?by=${identifier.by}&value=${identifier.value}`,
        {
          credentials: "include",
        },
      );
      const data = await response.json();
      return data;
    },
  });
};
