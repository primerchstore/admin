import { MediaQueryValidationType } from "@/fromServer/helpers/types/media.type";

type SetMediaPageStoreType = {
  setPage: (val: number) => void;
  setTotalPage: (val: number) => void;
  setTotalItems: (val: number) => void;
  setTake: (val: number) => void;
  setSort: (val: string) => void;
  setOrder: (val: string) => void;
  setNext: (val: boolean) => void;
  setPrev: (val: boolean) => void;
};

export type MediaPageStoreType = MediaQueryValidationType & {
  hasNext: boolean;
  hasPrev: boolean;
  totalItems: number;
  totalPage: number;
} & SetMediaPageStoreType;
