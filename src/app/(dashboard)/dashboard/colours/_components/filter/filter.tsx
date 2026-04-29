import ColourOrder from "@/app/(dashboard)/dashboard/colours/_components/filter/order";
import ColourSearch from "@/app/(dashboard)/dashboard/colours/_components/filter/search";
import ColourSort from "@/app/(dashboard)/dashboard/colours/_components/filter/sort";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function ColourFilter() {
  return (
    <div className="flex md:ms-auto justify-center items-center gap-1">
      <div className="hidden md:flex">
        <ColourSearch />
      </div>
      <div className="hidden md:flex">
        <ColourSort />
      </div>
      <div className="hidden md:flex">
        <ColourOrder />
      </div>
    </div>
  );
}

export function ColourFilterSheet() {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden ml-auto">
        <Button>
          <HugeiconsIcon icon={Filter} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="flex w-full flex-col py-20 px-2 justify-start items-center gap-2">
          <ColourSearch />
          <ColourSort />
          <ColourOrder />
        </div>
      </SheetContent>
    </Sheet>
  );
}
