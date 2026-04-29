import { ApiResponse } from "@/fromServer/helpers/types/api.type";
import {
  ProductPostValidationType,
  ProductQueryResponseType,
  ProductQueryValidationType,
} from "@/fromServer/helpers/types/product.type";
import { toParams } from "@/helpers/query/params-generator";
import { serverUrl } from "@/lib/constant";
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";

export const useQueryProduct = (
  query?: ProductQueryValidationType,
): UseQueryResult<
  ApiResponse & {
    result?: ProductQueryResponseType;
  },
  Error
> => {
  return useQuery({
    queryKey: ["products", query],
    queryFn: async () => {
      const response = await fetch(
        `${serverUrl}/api/products/query?${toParams(query ?? {})}`,
        {
          credentials: "include",
        },
      );
      const data = await response.json();
      return data;
    },
  });
};

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${serverUrl}/api/admin/products/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      return data;
    },
  });
};

export const usePostProduct = () => {
  return useMutation({
    mutationFn: async (body: ProductPostValidationType) => {
      const response = await fetch(`${serverUrl}/api/admin/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
      });
      const data = await response.json();
      return data;
    },
  });
};

export const usePatchProduct = () => {
  return useMutation({
    mutationFn: async (bodyWithId: {
      body: ProductPostValidationType;
      id: string;
    }) => {
      const response = await fetch(
        `${serverUrl}/api/admin/products/${bodyWithId.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyWithId.body),
          credentials: "include",
        },
      );
      const data = await response.json();
      return data;
    },
  });
};
