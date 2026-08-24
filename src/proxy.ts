import { NextRequest, NextResponse } from "next/server";
import { getSubdomain, resolveCitySlug } from "@/lib/subdomain";

/** 正規のドメイン。同じ中身が複数のURLで見えないよう、ここに寄せる */
const MAIN_ORIGIN = "https://hoikaten.com";

function redirectToMain(url: URL) {
  return NextResponse.redirect(new URL(url.pathname + url.search, MAIN_ORIGIN), 301);
}

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const hostname = host.split(":")[0];
  const url = request.nextUrl.clone();

  // www ありでも同じ中身が出てしまうので、www なしに寄せる
  if (hostname === "www.hoikaten.com") {
    return redirectToMain(url);
  }

  const citySlug = resolveCitySlug(host, url);

  if (!citySlug) {
    return NextResponse.next();
  }

  // サブドメインの中のリンクは /setagaya/articles のような絶対パスなので、
  // たどると setagaya.hoikaten.com/setagaya/articles という二重のURLになる。
  // 中身は hoikaten.com/setagaya/articles と同じで、検索エンジンのクロールが
  // そちらに流れてしまうため、正規のURLへ寄せる
  const isSubdomain = getSubdomain(host) !== null;
  const hasCityPath =
    url.pathname === `/${citySlug}` || url.pathname.startsWith(`/${citySlug}/`);
  if (isSubdomain && hasCityPath) {
    return redirectToMain(url);
  }

  // 開発時の ?city=xxx でパスが既に付いている場合は、そのまま通す
  if (hasCityPath) {
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
