import { SizeQueryValidationType } from "@/fromServer/helpers/types/size.type";

type SetSizePageStoreType = {
  setPage: (val: number) => void;
  setTotalPage: (val: number) => void;
  setTotalItems: (val: number) => void;
  setTake: (val: number) => void;
  setSort: (val: string) => void;
  setOrder: (val: string) => void;
  setNext: (val: boolean) => void;
  setPrev: (val: boolean) => void;
  setQ: (val: string) => void;
};

export type SizePageStoreType = SizeQueryValidationType & {
  hasNext: boolean;
  hasPrev: boolean;
  totalItems: number;
  totalPage: number;
} & SetSizePageStoreType;
