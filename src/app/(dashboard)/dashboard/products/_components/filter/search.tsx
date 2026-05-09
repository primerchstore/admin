import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { useProductPageStore } from "@/stores/product.page.store";
import { Search } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function ProductSearch() {
  const { setQ } = useProductPageStore();
  return (
    <ButtonGroup className="w-full md:max-w-48">
      <Button size="icon" variant="outline">
        <HugeiconsIcon icon={Search} />
      </Button>
      <Input onChange={(e) => setQ(e.target.value)} placeholder="Id, Name" />
    </ButtonGroup>
  );
}
