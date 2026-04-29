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
import { useColourPageStore } from "@/stores/colour.page.store";

export default function ColourSort() {
  const { sort: sortStore, setSort } = useColourPageStore();
  return (
    <Select defaultValue={sortStore} onValueChange={(val) => setSort(val)}>
      <SelectTrigger className="w-full md:max-w-48">
        <SelectValue placeholder="Select sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort</SelectLabel>
          {Sort.COLOUR.items.map((item: string, index: number) => (
            <SelectItem key={index} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
