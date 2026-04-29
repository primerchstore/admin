import { ColourQueryValidationType } from "@/fromServer/helpers/types/colour.type";

type SetColourPageStoreType = {
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

export type ColourPageStoreType = ColourQueryValidationType & {
  hasNext: boolean;
  hasPrev: boolean;
  totalItems: number;
  totalPage: number;
} & SetColourPageStoreType;
