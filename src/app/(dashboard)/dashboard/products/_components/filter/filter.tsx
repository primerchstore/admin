import ProductOrder from "@/app/(dashboard)/dashboard/products/_components/filter/order";
import ProductSearch from "@/app/(dashboard)/dashboard/products/_components/filter/search";
import ProductSort from "@/app/(dashboard)/dashboard/products/_components/filter/sort";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function ProductFilter() {
  return (
    <div className="flex md:ms-auto justify-center items-center gap-1">
      <div className="hidden md:flex">
        <ProductSearch />
      </div>
      <div className="hidden md:flex">
        <ProductSort />
      </div>
      <div className="hidden md:flex">
        <ProductOrder />
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
          <ProductSearch />
          <ProductSort />
          <ProductOrder />
        </div>
      </SheetContent>
    </Sheet>
  );
}
