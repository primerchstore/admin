import { ProductQueryValidationType } from "@/fromServer/helpers/types/product.type";

type SetProductPageStoreType = {
  setPage: (val: number) => void;
  setTotalPage: (val: number) => void;
  setTotalItems: (val: number) => void;
  setTake: (val: number) => void;
  setSort: (val: string) => void;
  setOrder: (val: string) => void;
  setNext: (val: boolean) => void;
  setPrev: (val: boolean) => void;
  setQ: (val: string) => void;
  setCategory: (val: string) => void;
  setTags: (val: string[]) => void;
};

export type ProductPageStoreType = ProductQueryValidationType & {
  hasNext: boolean;
  hasPrev: boolean;
  totalItems: number;
  totalPage: number;
} & SetProductPageStoreType;
