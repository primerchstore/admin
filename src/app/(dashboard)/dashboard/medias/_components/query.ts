import { ApiResponse } from "@/fromServer/helpers/types/api.type";
import {
  MediaGetResponseType,
  MediaGetValidationType,
  MediaQueryResponseType,
  MediaQueryValidationType,
} from "@/fromServer/helpers/types/media.type";
import { toParams } from "@/helpers/query/params-generator";
import { serverUrl } from "@/lib/constant";
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";

export const useQueryMedia = (
  query?: MediaQueryValidationType,
): UseQueryResult<
  ApiResponse & {
    result?: MediaQueryResponseType;
  },
  Error
> => {
  return useQuery({
    queryKey: ["medias", query],
    queryFn: async () => {
      const response = await fetch(
        `${serverUrl}/api/admin/medias/query?${toParams(query ?? {})}`,
        {
          credentials: "include",
        },
      );
      const data = await response.json();
      return data;
    },
  });
};

export const useGetMedia = (
  identifier: MediaGetValidationType,
): UseQueryResult<
  ApiResponse & {
    result?: MediaGetResponseType;
  },
  Error
> => {
  return useQuery({
    queryKey: ["medias", "get", identifier],
    queryFn: async () => {
      const response = await fetch(
        `${serverUrl}/api/admin/medias/get?by=${identifier.by}&value=${identifier.value}`,
        {
          credentials: "include",
        },
      );
      const data = await response.json();
      return data;
    },
  });
};

export const useDeleteMedia = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${serverUrl}/api/admin/medias/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      return data;
    },
  });
};
