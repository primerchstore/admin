import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Gender } from "@/fromServer/generated/prisma";
import { useProductPageStore } from "@/stores/product.page.store";
import { GENDERS } from "@/types/gender.type";

export default function ProductGender() {
  const { setGender } = useProductPageStore();
  return (
    <Select
      onValueChange={(val) =>
        setGender(val === "all" ? undefined : (val as Gender))
      }
    >
      <SelectTrigger className="w-full md:max-w-48">
        <SelectValue placeholder="Gender" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Gender</SelectLabel>
          {GENDERS.map((item, index: number) => (
            <SelectItem key={index} value={item}>
              {item}
            </SelectItem>
          ))}
          <SelectItem value="all">All</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
