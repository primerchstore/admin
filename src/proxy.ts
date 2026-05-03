import { NextRequest, NextResponse } from "next/server";
import { getSessionFromCookie } from "@/lib/auth-server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await getSessionFromCookie(request);

  if (pathname === "/login") {
    if (session?.user?.role === "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session.user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/forbidden", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!forbidden|_next|favicon.ico|api).*)"],
};
