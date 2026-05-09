import { ProductPageStoreType } from "@/types/stores/product.page.store.type";
import { create } from "zustand";

export const useProductPageStore = create<ProductPageStoreType>((set) => ({
  hasNext: false,
  hasPrev: false,
  order: "desc",
  sort: "createdAt",
  page: 1,
  take: 12,
  totalItems: 0,
  totalPage: 0,
  q: undefined,
  category: undefined,
  tags: undefined,
  setCategory: (val) => set({ category: val }),
  setTags: (val: string[]) => set({ tags: val }),
  setQ: (val) => set({ q: val }),
  setTotalPage: (val) => set({ totalPage: val }),
  setTotalItems: (val) => set({ totalItems: val }),
  setNext: (val) => set({ hasNext: val }),
  setPrev: (val) => set({ hasPrev: val }),
  setOrder: (val) => set({ order: val }),
  setPage: (val) => set({ page: val }),
  setSort: (val) => set({ sort: val }),
  setTake: (val) => set({ take: val }),
  setGender: (val) => set({ gender: val }),
}));
