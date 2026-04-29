import { NextRequest } from "next/server";

export async function getSessionFromCookie(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get("cookie") ?? "";

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/get-session`,
      {
        headers: { cookie: cookieHeader },
        cache: "no-store",
      },
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data?.session ? data : null;
  } catch {
    return null;
  }
}
