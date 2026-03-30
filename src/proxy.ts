import { NextRequest, NextResponse } from "next/server";
import { resolveCitySlug } from "@/lib/subdomain";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const url = request.nextUrl.clone();
  const citySlug = resolveCitySlug(host, url);

  // サブドメインがない場合（hoikaten.com / localhost）→ そのまま通す
  if (!citySlug) {
    return NextResponse.next();
  }

  // サブドメインがある場合 → /[city] にリライト
  // setagaya.hoikaten.com/ → /setagaya として処理
  if (url.pathname === "/") {
    url.pathname = `/${citySlug}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
