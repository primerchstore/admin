"use client";

import ProductPagination from "@/app/(dashboard)/dashboard/products/_components/pagination";
import { SizeFilterSheet } from "@/app/(dashboard)/dashboard/sizes/_components/filter/filter";
import { PageBreadcrumb } from "@/app/_components/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "@hugeicons/core-free-icons";
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
          <SizeFilterSheet />
          {pathname.includes("/products/detail") && (
            <Button asChild>
              <Link href={`/dashboard/products`}>
                <HugeiconsIcon icon={ArrowLeft} /> Back
              </Link>
            </Button>
          )}
        </header>
        <Separator />
        <main className="flex-1 p-4 overflow-auto">{children}</main>
        {pathname === "/dashboard/products" && (
          <>
            <Separator />
            <footer className="p-4 flex justify-between items-center">
              <ProductPagination />
            </footer>
          </>
        )}
      </div>
    </div>
  );
}
