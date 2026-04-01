import { NextRequest, NextResponse } from "next/server";
import { resolveCitySlug } from "@/lib/subdomain";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const url = request.nextUrl.clone();
  const citySlug = resolveCitySlug(host, url);

  if (!citySlug) {
    return NextResponse.next();
  }

  // パスが既にcitySlugで始まっている場合はリライト不要
  // (ページ内リンクが /setagaya/articles のような絶対パスの場合)
  if (url.pathname.startsWith(`/${citySlug}`)) {
    return NextResponse.next();
  }

  // サブドメインがある場合 → /[city]/... にリライト
  // setagaya.hoikaten.com/ → /setagaya
  // setagaya.hoikaten.com/articles → /setagaya/articles
  url.pathname = `/${citySlug}${url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|opengraph-image|robots.txt|sitemap.xml).*)",
  ],
};
