import NavSheet from "@/app/_components/nav-sheet";
import Sidebar from "@/app/_components/sidebar";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const headersList = await headers();
  const cookieHeader = headersList.get("cookie") ?? "";

  const session = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/get-session`,
    {
      headers: { cookie: cookieHeader },
      cache: "no-store",
    },
  ).then((r) => (r.ok ? r.json() : null));

  if (!session?.user) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/forbidden");

  return <>{children}</>;
}
