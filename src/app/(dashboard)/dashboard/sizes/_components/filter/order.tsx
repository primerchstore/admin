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
import { useSizePageStore } from "@/stores/size.page.store";

export default function SizeOrder() {
  const { order: orderStore, setOrder } = useSizePageStore();
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
