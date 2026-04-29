import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { nav } from "@/lib/constant";
import { Nav } from "@/types/nav.type";
import { Hamburger } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export default function NavSheet() {
  return (
    <Sheet>
      <SheetTrigger>
        <Button>
          <HugeiconsIcon icon={Hamburger} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="flex flex-col justify-start items-stretch">
          {nav.map((item: Nav, index: number) => (
            <Button asChild key={index}>
              <Link href={item.url}>{item.name}</Link>
            </Button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
