const MAIN_DOMAIN = "hoikaten.com";

/**
 * ホスト名からサブドメイン部分を抽出する
 * 例: "setagaya.hoikaten.com" → "setagaya"
 *     "hoikaten.com" → null
 *     "localhost:3001" → null
 */
export function getSubdomain(host: string): string | null {
  // ポート番号を除去
  const hostname = host.split(":")[0];

  // localhost / IPアドレスの場合はサブドメインなし
  if (hostname === "localhost" || /^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
    return null;
  }

  // hoikaten.com の場合
  if (hostname === MAIN_DOMAIN || hostname === `www.${MAIN_DOMAIN}`) {
    return null;
  }

  // setagaya.hoikaten.com → setagaya
  if (hostname.endsWith(`.${MAIN_DOMAIN}`)) {
    return hostname.replace(`.${MAIN_DOMAIN}`, "");
  }

  // Vercelプレビュー等のサブドメイン対応
  // setagaya.hoikaten-xxx.vercel.app のような場合は対応しない
  return null;
}

/**
 * 開発環境でサブドメインをシミュレートするためのクエリパラメータ
 * localhost:3001?city=setagaya でsetagaya.hoikaten.comと同じ動作
 */
export function getSubdomainFromQuery(url: URL): string | null {
  return url.searchParams.get("city");
}

/**
 * ホストまたはクエリからサブドメイン（自治体slug）を取得
 */
export function resolveCitySlug(host: string, url: URL): string | null {
  return getSubdomain(host) || getSubdomainFromQuery(url);
}
