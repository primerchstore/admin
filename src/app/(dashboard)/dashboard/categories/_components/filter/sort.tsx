import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sort } from "@/fromServer/helpers/constants/sort.constant";
import { useCategoryPageStore } from "@/stores/category.page.store";

export default function CategorySort() {
  const { sort: sortStore, setSort } = useCategoryPageStore();
  return (
    <Select defaultValue={sortStore} onValueChange={(val) => setSort(val)}>
      <SelectTrigger className="w-full md:max-w-48">
        <SelectValue placeholder="Select sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort</SelectLabel>
          {Sort.PRODUCT.items.map((item: string, index: number) => (
            <SelectItem key={index} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
