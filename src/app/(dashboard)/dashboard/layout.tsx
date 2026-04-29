"use client";
import NavSheet from "@/app/_components/nav-sheet";
import Sidebar from "@/app/_components/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-dvh w-full relative grid grid-rows-1 grid-cols-1 md:grid-cols-[15%_85%]">
        <div className="md:hidden absolute top-2 left-2 z-10">
          <NavSheet />
        </div>
        <div className="hidden md:flex p-2">
          <Sidebar />
        </div>
        <div className="p-2 md:pl-0 pt-12 md:pt-2">{children}</div>
      </div>
      <Toaster position="bottom-center" />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
