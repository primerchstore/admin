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
import { useMediaPageStore } from "@/stores/media.page.store";

export default function MediaSort() {
  const { sort: sortStore, setSort } = useMediaPageStore();
  return (
    <Select defaultValue={sortStore} onValueChange={(val) => setSort(val)}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Order</SelectLabel>
          {Sort.MEDIA.items.map((item: string, index: number) => (
            <SelectItem key={index} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
