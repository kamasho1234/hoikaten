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

  // サブドメインがある場合 → /[city]/... にリライト
  // setagaya.hoikaten.com/ → /setagaya
  // setagaya.hoikaten.com/articles → /setagaya/articles
  // setagaya.hoikaten.com/articles/xxx → /setagaya/articles/xxx
  url.pathname = `/${citySlug}${url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|opengraph-image|robots.txt|sitemap.xml).*)"],
};
