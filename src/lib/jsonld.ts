// 構造化データ(JSON-LD)生成ヘルパー
import type { MunicipalityData } from "./types";

const SITE = "https://hoikaten.com";

export interface BreadcrumbItem {
  name: string;
  /** サイトルートからのパス（"/setagaya" など）。省略時はitemを付けない */
  path?: string;
}

/** BreadcrumbList 構造化データを生成 */
export function breadcrumbList(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.path ? { item: `${SITE}${item.path}` } : {}),
    })),
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** FAQPage 構造化データを生成 */
export function faqPage(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * 自治体データからFAQ Q&Aを生成する。
 * 内容は採点方式・最大点数などデータから機械的に導出できる事実のみ。
 * 個別の加点項目には踏み込まず、最後に必ず公式確認を促す。
 */
export function buildCityFaq(data: MunicipalityData): FaqItem[] {
  const { name, maxBasePoints, scoringMethod } = data.municipality;
  const method = scoringMethod ?? "sum";

  let howAnswer: string;
  if (method === "min") {
    howAnswer =
      `${name}の保育園入園点数（利用調整指数）は、保護者のうち低い方の基準指数をもとに、` +
      `ひとり親・きょうだいの在園などの家庭状況に応じた調整指数を加減して決まります。` +
      `就労時間や病気・介護などの状況によって基準指数が変わります。`;
  } else if (method === "avg") {
    howAnswer =
      `${name}の保育園入園点数（利用調整指数）は、保護者それぞれの基準指数の平均に、` +
      `家庭状況に応じた調整指数を加減して決まります。` +
      `就労時間や病気・介護などの状況によって基準指数が変わります。`;
  } else {
    howAnswer =
      `${name}の保育園入園点数（利用調整指数）は、保護者それぞれの就労状況などから算出した基準指数を合計し、` +
      `家庭状況に応じた調整指数を加減して決まります。基準指数は保護者2人の合計で最大${maxBasePoints}点です。` +
      `就労時間や病気・介護などの状況によって点数が変わります。`;
  }

  return [
    {
      question: `${name}の保育園の入園点数（利用調整指数）はどうやって決まりますか？`,
      answer: howAnswer,
    },
    {
      question: `${name}の保育園入園点数は無料で計算できますか？`,
      answer:
        `はい。hoikatenの${name}向けシミュレーターは登録不要・無料でご利用いただけます。` +
        `かんたんな質問に答えるだけで、入園点数の目安と「有利か厳しいか」の評価がわかります。`,
    },
    {
      question: `${name}で保育園に入るには点数（指数）が高い方が有利ですか？`,
      answer:
        `認可保育園は原則として点数（利用調整指数）の高い世帯から入園が決まります。` +
        `就労時間を増やす、求職中から就労中に変わるなどで基準指数が上がる場合があります。` +
        `加点・減点の項目は自治体ごとに異なるため、${name}の基準表をご確認ください。`,
    },
    {
      question: `このシミュレーターで出る点数は正確ですか？`,
      answer:
        `本シミュレーターの点数はあくまで目安です。実際の選考基準や点数は年度・施設により変わることがあるため、` +
        `正確な情報は${name}の公式窓口・公式サイトで必ずご確認ください。`,
    },
  ];
}
