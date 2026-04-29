import MediaOrder from "@/app/(dashboard)/dashboard/medias/_components/filter/order";
import MediaSort from "@/app/(dashboard)/dashboard/medias/_components/filter/sort";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function MediaFilter() {
  return (
    <div className="flex md:ms-auto justify-center items-center gap-1">
      <div className="hidden md:flex">
        <MediaSort />
      </div>
      <div className="hidden md:flex">
        <MediaOrder />
      </div>
    </div>
  );
}

export function MediaFilterSheet() {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden ml-auto">
        <Button>
          <HugeiconsIcon icon={Filter} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="flex w-full flex-col py-20 px-2 justify-start items-center gap-2">
          <MediaSort />
          <MediaOrder />
        </div>
      </SheetContent>
    </Sheet>
  );
}
