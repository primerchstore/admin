"use client";
import { LogOutDialog } from "@/app/_components/log-out";
import { Button } from "@/components/ui/button";
import { nav } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { Nav } from "@/types/nav.type";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <nav className="w-full h-full p-2 rounded-2xl flex flex-col bg-primary justify-start items-stretch gap-1">
      {nav.map((item: Nav, index: number) => (
        <Button
          key={index}
          variant={pathname.includes(item.url) ? "default" : "secondary"}
          className={cn(
            "justify-start",
            !pathname.includes(item.url) &&
              "bg-transparent text-primary-foreground hover:bg-primary-2 hover:text-primary",
          )}
          asChild
        >
          <Link href={item.url}>
            <HugeiconsIcon icon={item.icon} />
            {item.name}
          </Link>
        </Button>
      ))}

      <div className="mt-auto flex flex-col justify-start items-stretch">
        <LogOutDialog />
      </div>
    </nav>
  );
}
