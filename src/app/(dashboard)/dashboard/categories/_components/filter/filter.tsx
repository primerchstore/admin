import CategoryOrder from "@/app/(dashboard)/dashboard/categories/_components/filter/order";
import CategorySearch from "@/app/(dashboard)/dashboard/categories/_components/filter/search";
import CategorySort from "@/app/(dashboard)/dashboard/categories/_components/filter/sort";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function CategoryFilter() {
  return (
    <div className="flex md:ms-auto justify-center items-center gap-1">
      <div className="hidden md:flex">
        <CategorySearch />
      </div>
      <div className="hidden md:flex">
        <CategorySort />
      </div>
      <div className="hidden md:flex">
        <CategoryOrder />
      </div>
    </div>
  );
}

export function CategoryFilterSheet() {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden ml-auto">
        <Button>
          <HugeiconsIcon icon={Filter} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="flex w-full flex-col py-20 px-2 justify-start items-center gap-2">
          <CategorySearch />
          <CategorySort />
          <CategoryOrder />
        </div>
      </SheetContent>
    </Sheet>
  );
}
