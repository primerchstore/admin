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
import { useSizePageStore } from "@/stores/size.page.store";

export default function SizeSort() {
  const { sort: sortStore, setSort } = useSizePageStore();
  return (
    <Select defaultValue={sortStore} onValueChange={(val) => setSort(val)}>
      <SelectTrigger className="w-full md:max-w-48">
        <SelectValue placeholder="Select sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort</SelectLabel>
          {Sort.SIZE.items.map((item: string, index: number) => (
            <SelectItem key={index} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
