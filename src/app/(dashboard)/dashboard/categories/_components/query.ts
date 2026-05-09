import { ApiResponse } from "@/fromServer/helpers/types/api.type";
import {
  CategoryPatchValidationType,
  CategoryPostValidationType,
  CategoryQueryResponseType,
  CategoryQueryValidationType,
} from "@/fromServer/helpers/types/category.type";
import { toParams } from "@/helpers/query/params-generator";
import { serverUrl } from "@/lib/constant";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";

export const useQueryCategory = (
  query?: CategoryQueryValidationType,
): UseQueryResult<
  ApiResponse & {
    result?: CategoryQueryResponseType;
  },
  Error
> => {
  return useQuery({
    queryKey: ["categories", query],
    queryFn: async () => {
      const response = await fetch(
        `${serverUrl}/api/categories/query?${toParams(query ?? {})}`,
        {
          credentials: "include",
        },
      );
      const data = await response.json();
      return data;
    },
  });
};

export const usePostCategory = (): UseMutationResult<
  ApiResponse,
  any,
  CategoryPostValidationType,
  unknown
> => {
  return useMutation({
    mutationFn: async (body: CategoryPostValidationType) => {
      const response = await fetch(`${serverUrl}/api/admin/categories`, {
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

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${serverUrl}/api/admin/categories/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      return data;
    },
  });
};

export const usePatchCategory = () => {
  return useMutation({
    mutationFn: async (bodyWithId: {
      body: CategoryPatchValidationType;
      id: string;
    }) => {
      const response = await fetch(
        `${serverUrl}/api/admin/categories/${bodyWithId.id}`,
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
