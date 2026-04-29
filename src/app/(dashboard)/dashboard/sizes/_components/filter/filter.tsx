import SizeOrder from "@/app/(dashboard)/dashboard/sizes/_components/filter/order";
import SizeSearch from "@/app/(dashboard)/dashboard/sizes/_components/filter/search";
import SizeSort from "@/app/(dashboard)/dashboard/sizes/_components/filter/sort";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function SizeFilter() {
  return (
    <div className="flex md:ms-auto justify-center items-center gap-1">
      <div className="hidden md:flex">
        <SizeSearch />
      </div>
      <div className="hidden md:flex">
        <SizeSort />
      </div>
      <div className="hidden md:flex">
        <SizeOrder />
      </div>
    </div>
  );
}

export function SizeFilterSheet() {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden ml-auto">
        <Button>
          <HugeiconsIcon icon={Filter} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="flex w-full flex-col py-20 px-2 justify-start items-center gap-2">
          <SizeSearch />
          <SizeSort />
          <SizeOrder />
        </div>
      </SheetContent>
    </Sheet>
  );
}
