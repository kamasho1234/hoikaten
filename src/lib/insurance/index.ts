import type { InsuranceArticle, InsuranceGroup } from "./types";

const all: InsuranceArticle[] = [];

export function registerInsuranceArticles(articles: InsuranceArticle[]) {
  for (const article of articles) {
    if (article.sources.length === 0) {
      throw new Error(`${article.slug}: 出典のない記事は登録できません`);
    }
    if (all.some((a) => a.slug === article.slug)) {
      throw new Error(`${article.slug}: slug が重複しています`);
    }
    all.push(article);
  }
}

export function getAllInsuranceArticles(): InsuranceArticle[] {
  return [...all].sort((a, b) => a.order - b.order);
}

export function getInsuranceArticle(slug: string): InsuranceArticle | undefined {
  return all.find((a) => a.slug === slug);
}

/** その自治体のお金の記事。自治体のページから案内するのに使う */
export function getInsuranceArticleByCity(citySlug: string): InsuranceArticle | undefined {
  return all.find((a) => a.citySlug === citySlug);
}

/** グループごとにまとめる。一覧ページの見出し単位 */
export function getInsuranceByGroup(): { group: InsuranceGroup; articles: InsuranceArticle[] }[] {
  const order: InsuranceGroup[] = [
    "妊娠中のお金",
    "出産のお金",
    "育休中のお金",
    "子どもが生まれたあとの備え",
    "教育費",
    "住む場所で変わるお金",
    "自治体ごとの支援",
    "相談のしかた",
  ];
  return order
    .map((group) => ({
      group,
      articles: getAllInsuranceArticles().filter((a) => a.group === group),
    }))
    .filter((section) => section.articles.length > 0);
}

/**
 * グループごとの色。ヒーロー画像（src/lib/hero-image）と見出しのラベルで共通に使う。
 * hero-image が受け付ける色名に合わせている
 */
export const INSURANCE_GROUP_COLOR: Record<
  InsuranceGroup,
  "green" | "blue" | "amber" | "rose" | "purple" | "teal"
> = {
  妊娠中のお金: "rose",
  出産のお金: "purple",
  育休中のお金: "blue",
  子どもが生まれたあとの備え: "teal",
  教育費: "amber",
  住む場所で変わるお金: "rose",
  自治体ごとの支援: "blue",
  相談のしかた: "green",
};
