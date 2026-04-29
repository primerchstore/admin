import { ApiResponse } from "@/fromServer/helpers/types/api.type";
import {
  SizePostValidationType,
  SizeQueryResponseType,
  SizeQueryValidationType,
} from "@/fromServer/helpers/types/size.type";
import { toParams } from "@/helpers/query/params-generator";
import { serverUrl } from "@/lib/constant";
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";

export const useQuerySize = (
  query?: SizeQueryValidationType,
): UseQueryResult<
  ApiResponse & {
    result?: SizeQueryResponseType;
  },
  Error
> => {
  return useQuery({
    queryKey: ["sizes", query],
    queryFn: async () => {
      const response = await fetch(
        `${serverUrl}/api/admin/sizes/query?${toParams(query ?? {})}`,
        {
          credentials: "include",
        },
      );
      const data = await response.json();
      return data;
    },
  });
};

export const useDeleteSizes = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${serverUrl}/api/admin/sizes/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      return data;
    },
  });
};

export const usePostSize = () => {
  return useMutation({
    mutationFn: async (body: SizePostValidationType) => {
      const response = await fetch(`${serverUrl}/api/admin/sizes`, {
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

export const usePatchSizes = () => {
  return useMutation({
    mutationFn: async (bodyWithId: {
      body: SizePostValidationType;
      id: string;
    }) => {
      const response = await fetch(
        `${serverUrl}/api/admin/sizes/${bodyWithId.id}`,
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
