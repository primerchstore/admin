"use client";

import {
  CategoryFilter,
  CategoryFilterSheet,
} from "@/app/(dashboard)/dashboard/categories/_components/filter/filter";
import CategoryPagination from "@/app/(dashboard)/dashboard/categories/_components/pagination";
import { PageBreadcrumb } from "@/app/_components/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Plus } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="h-full w-full">
      <div className="flex border-primary/10 rounded-2xl border w-full h-full flex-col justify-start items-stretch">
        <header className="p-4 flex justify-between gap-1 items-center">
          <PageBreadcrumb pathname={pathname} />
          {pathname === "/dashboard/categories" && (
            <>
              <CategoryFilter />
              <CategoryFilterSheet />
              <Button asChild>
                <Link href={`/dashboard/categories/create`}>
                  <HugeiconsIcon icon={Plus} />
                  <span className="hidden md:inline">Add item</span>
                </Link>
              </Button>
            </>
          )}
          {pathname.includes("/categories/detail") && (
            <Button asChild>
              <Link href={`/dashboard/categories`}>
                <HugeiconsIcon icon={ArrowLeft} /> Back
              </Link>
            </Button>
          )}
        </header>
        <Separator />
        <main className="flex-1 p-4 overflow-auto">{children}</main>
        {pathname === "/dashboard/categories" && (
          <>
            <Separator />
            <footer className="p-4 flex justify-between items-center">
              <CategoryPagination />
            </footer>
          </>
        )}
      </div>
    </div>
  );
}
