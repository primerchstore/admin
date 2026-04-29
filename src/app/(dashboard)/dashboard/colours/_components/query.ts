import { ApiResponse } from "@/fromServer/helpers/types/api.type";
import {
  ColourPostValidationType,
  ColourQueryResponseType,
  ColourQueryValidationType,
} from "@/fromServer/helpers/types/colour.type";
import { toParams } from "@/helpers/query/params-generator";
import { serverUrl } from "@/lib/constant";
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";

export const useQueryColour = (
  query?: ColourQueryValidationType,
): UseQueryResult<
  ApiResponse & {
    result?: ColourQueryResponseType;
  },
  Error
> => {
  return useQuery({
    queryKey: ["colours", query],
    queryFn: async () => {
      const response = await fetch(
        `${serverUrl}/api/admin/colours/query?${toParams(query ?? {})}`,
        {
          credentials: "include",
        },
      );
      const data = await response.json();
      return data;
    },
  });
};

export const useDeleteColour = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${serverUrl}/api/admin/colours/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      return data;
    },
  });
};

export const usePostColour = () => {
  return useMutation({
    mutationFn: async (body: ColourPostValidationType) => {
      const response = await fetch(`${serverUrl}/api/admin/colours`, {
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

export const usePatchColour = () => {
  return useMutation({
    mutationFn: async (bodyWithId: {
      body: ColourPostValidationType;
      id: string;
    }) => {
      const response = await fetch(
        `${serverUrl}/api/admin/colours/${bodyWithId.id}`,
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
