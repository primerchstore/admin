import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { useColourPageStore } from "@/stores/colour.page.store";
import { Search } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function ColourSearch() {
  const { setQ, q } = useColourPageStore();
  return (
    <ButtonGroup className="w-full md:max-w-48">
      <Button size="icon" variant="outline">
        <HugeiconsIcon icon={Search} />
      </Button>
      <Input
        onChange={(e) => setQ(e.target.value)}
        placeholder="Id, Name, Hexcode"
      />
    </ButtonGroup>
  );
}
