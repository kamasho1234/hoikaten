import type { DocumentGuide, DocumentGroup } from "./types";

const all: DocumentGuide[] = [];

export function registerDocuments(guides: DocumentGuide[]) {
  for (const guide of guides) {
    if (guide.sources.length === 0) {
      throw new Error(`${guide.slug}: 出典のない書類ガイドは登録できません`);
    }
    if (all.some((g) => g.slug === guide.slug)) {
      throw new Error(`${guide.slug}: slug が重複しています`);
    }
    all.push(guide);
  }
}

export function getAllDocuments(): DocumentGuide[] {
  return [...all].sort((a, b) => a.order - b.order);
}

export function getDocument(slug: string): DocumentGuide | undefined {
  return all.find((g) => g.slug === slug);
}

/** グループごとにまとめる。ハブページの見出し単位 */
export function getDocumentsByGroup(): { group: DocumentGroup; guides: DocumentGuide[] }[] {
  const order: DocumentGroup[] = [
    "就労証明書",
    "所得・課税の証明",
    "住民票・戸籍",
    "マイナンバー",
    "入園・就学の手続き",
    "手当・医療費",
    "障害・療育",
    "母子保健",
  ];
  return order
    .map((group) => ({
      group,
      guides: getAllDocuments().filter((g) => g.group === group),
    }))
    .filter((section) => section.guides.length > 0);
}

/**
 * グループごとの色。ヒーロー画像（src/lib/hero-image）と見出しのラベルで共通に使う。
 * hero-image が受け付ける色名に合わせている
 */
export const GROUP_COLOR: Record<DocumentGroup, "green" | "blue" | "amber" | "rose" | "purple" | "teal"> = {
  就労証明書: "blue",
  "所得・課税の証明": "amber",
  "住民票・戸籍": "green",
  マイナンバー: "purple",
  "入園・就学の手続き": "teal",
  "手当・医療費": "amber",
  "障害・療育": "purple",
  母子保健: "rose",
};

export type { DocumentGuide, DocumentGroup, DocumentSource, DocumentFaq } from "./types";
