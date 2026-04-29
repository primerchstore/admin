"use client";

import { PageBreadcrumb } from "@/app/_components/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="h-full w-full">
      <div className="flex border-primary/10 rounded-2xl border w-full h-full flex-col justify-start items-stretch">
        <header className="p-4 flex justify-between items-center">
          <PageBreadcrumb pathname={pathname} />
          <Button>
            <HugeiconsIcon icon={Plus} />
            <span className="hidden md:inline">Add item</span>
          </Button>
        </header>
        <Separator />
        <main className="flex-1 p-4 overflow-auto">{children}</main>
        <Separator />
        <footer className="p-4">Footer</footer>
      </div>
    </div>
  );
}
