"use client";

import {
  MediaFilter,
  MediaFilterSheet,
} from "@/app/(dashboard)/dashboard/medias/_components/filter/filter";
import MediaPagination from "@/app/(dashboard)/dashboard/medias/_components/pagination";
import { PageBreadcrumb } from "@/app/_components/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Back, Circle, Plus } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="h-full w-full">
      <div className="flex border-primary/10 rounded-2xl border w-full h-full flex-col justify-start items-stretch">
        <header className="p-4 flex gap-1 justify-between items-center">
          <PageBreadcrumb pathname={pathname} />
          <MediaFilterSheet />
          {!pathname.includes("add") ? (
            <>
              <MediaFilter />
              <Button asChild>
                <Link href="/dashboard/medias/add">
                  <HugeiconsIcon icon={Plus} />
                  <span className="hidden md:inline">Add item</span>
                </Link>
              </Button>
            </>
          ) : (
            <Button asChild>
              <Link href="/dashboard/medias">
                <HugeiconsIcon icon={Back} />
                <span className="hidden md:inline">Cancel</span>
              </Link>
            </Button>
          )}
        </header>
        <Separator />
        <main className="flex-1 p-4 overflow-auto">{children}</main>

        {pathname === "/dashboard/medias" && (
          <>
            <Separator />
            <footer className="p-4 flex justify-between items-center">
              <MediaPagination />
            </footer>
          </>
        )}
      </div>
    </div>
  );
}
