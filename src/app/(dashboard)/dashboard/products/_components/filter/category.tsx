import { useQueryCategory } from "@/app/(dashboard)/dashboard/categories/_components/query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CategoryQueryResponseType,
  CategoryQueryValidationType,
} from "@/fromServer/helpers/types/category.type";
import { useProductPageStore } from "@/stores/product.page.store";
import { useState } from "react";

export default function ProductCategory() {
  const [queryCategory] = useState<CategoryQueryValidationType>({
    order: "desc",
    sort: "createdAt",
    take: 100,
    page: 1,
  });
  const { data } = useQueryCategory(queryCategory);
  const { setCategory } = useProductPageStore();
  return (
    <Select
      onValueChange={(val) => setCategory(val === "all" ? undefined : val)}
    >
      <SelectTrigger className="w-full md:max-w-48">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          {data &&
            data.result?.query &&
            data.result.query.map(
              (
                item: CategoryQueryResponseType["query"][number],
                index: number,
              ) => (
                <SelectItem key={index} value={item.slug}>
                  {item.name}
                </SelectItem>
              ),
            )}
          <SelectItem value="all">All</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
