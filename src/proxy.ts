import { NextRequest, NextResponse } from "next/server";
import { getSubdomain, resolveCitySlug } from "@/lib/subdomain";

/** 正規のドメイン。同じ中身が複数のURLで見えないよう、ここに寄せる */
const MAIN_ORIGIN = "https://hoikaten.com";

/** サブドメインで自治体ページとして出すパス（/[city]/ の下に同じものがある） */
const CITY_SECTIONS = ["/articles", "/vacancy"];

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

  const isSubdomain = getSubdomain(host) !== null;
  const hasCityPath =
    url.pathname === `/${citySlug}` || url.pathname.startsWith(`/${citySlug}/`);

  // サブドメイン（setagaya.hoikaten.com）は中身が hoikaten.com/setagaya と同じで、
  // canonical を正規のURLに向けていても Google は141のサブドメインを別に検索結果へ出していた
  //（Search Console 2026-10-02。代替 canonical 558件・重複13件がすべてサブドメイン）。
  // リライトで見せるのをやめて、すべて正規のURLへ301で寄せる
  if (isSubdomain) {
    const isCitySection =
      url.pathname === "/" ||
      CITY_SECTIONS.some((p) => url.pathname === p || url.pathname.startsWith(`${p}/`));
    // setagaya.hoikaten.com/ → /setagaya、/articles/x → /setagaya/articles/x
    // 二重のパス（/setagaya/articles）と共通ページ（/insurance など）はそのまま
    if (isCitySection && !hasCityPath) {
      url.pathname = url.pathname === "/" ? `/${citySlug}` : `/${citySlug}${url.pathname}`;
    }
    return redirectToMain(url);
  }

  // 開発時の ?city=xxx でパスが既に付いている場合は、そのまま通す
  if (hasCityPath) {
    return NextResponse.next();
  }

  // 開発時の ?city=xxx → /[city]/... にリライト
  url.pathname = `/${citySlug}${url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    // icon / apple-icon はサイト共通の画像。サブドメインでリライトすると
    // /{city}/icon になって404になるので、ここで外しておく
    "/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|opengraph-image|robots.txt|sitemap.xml).*)",
  ],
};
