"use client";
import { Nav as NavType } from "@/types/nav.type";
import { Button } from "@/components/ui/button";
import { nav } from "@/lib/constant";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { usePathname } from "next/navigation";
import { LogOutDialog } from "@/app/_components/log-out";

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="bg-primary flex justify-center items-center flex-wrap p-2 rounded-2xl">
      {nav.map((item: NavType, index) => (
        <Button
          variant={pathname.includes(item.url) ? "default" : "secondary"}
          key={index}
          className={`${!pathname.includes(item.url) && "bg-transparent text-primary-foreground hover:bg-primary-2 hover:text-primary"}`}
          asChild
        >
          <Link href={item.url}>
            <HugeiconsIcon icon={item.icon} size={24} />
            {item.name}
          </Link>
        </Button>
      ))}
    </nav>
  );
}
