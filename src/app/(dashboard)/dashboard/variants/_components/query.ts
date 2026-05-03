import { ApiResponse } from "@/fromServer/helpers/types/api.type";
import {
  VariantQueryResponseType,
  VariantQueryValidationType,
} from "@/fromServer/helpers/types/variant.type";
import { toParams } from "@/helpers/query/params-generator";
import { serverUrl } from "@/lib/constant";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useQueryVariant = (
  query?: VariantQueryValidationType,
  enabled?: boolean,
): UseQueryResult<
  ApiResponse & {
    result?: VariantQueryResponseType;
  },
  Error
> => {
  return useQuery({
    queryKey: ["variants", query],
    queryFn: async () => {
      const response = await fetch(
        `${serverUrl}/api/admin/variants/query?${toParams(query ?? {})}`,
        {
          credentials: "include",
        },
      );
      const data = await response.json();
      return data;
    },
    enabled,
  });
};
