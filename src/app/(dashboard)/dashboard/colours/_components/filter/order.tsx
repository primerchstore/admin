import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { order } from "@/fromServer/helpers/constants/order.constant";
import { useColourPageStore } from "@/stores/colour.page.store";

export default function ColourOrder() {
  const { order: orderStore, setOrder } = useColourPageStore();
  return (
    <Select defaultValue={orderStore} onValueChange={(val) => setOrder(val)}>
      <SelectTrigger className="w-full md:max-w-48">
        <SelectValue placeholder="Select order by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Order</SelectLabel>
          {order.items.map((item: string, index: number) => (
            <SelectItem key={index} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
