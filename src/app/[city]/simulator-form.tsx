"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import type { MunicipalityData, Question } from "@/lib/types";
import { calculateScore } from "@/lib/scoring/engine";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FullScreenAd } from "@/components/fullscreen-ad";
import { RandomTextAd } from "@/components/random-text-ad";

type Step = "parent1" | "parent2" | "adjustment" | "result";

const STEPS: { key: Step; label: string }[] = [
  { key: "parent1", label: "保護者1" },
  { key: "parent2", label: "保護者2" },
  { key: "adjustment", label: "家庭の状況" },
  { key: "result", label: "結果" },
];

function getReasonFromAnswers(
  answers: Record<string, string>,
  prefix: string
): string | null {
  const val = answers[`${prefix}_reason`];
  if (!val) return null;
  // e.g. "parent1_reason_employment" → "employment"
  return val.replace(`${prefix}_reason_`, "");
}

function QuestionField({
  question,
  value,
  onChange,
}: {
  question: Question;
  value: string | undefined;
  onChange: (val: string) => void;
}) {
  return (
    <div className="space-y-3">
      <Label className="text-base font-semibold">{question.label}</Label>
      {question.helpText && (
        <p className="text-xs text-muted-foreground">{question.helpText}</p>
      )}
      <div className="space-y-2">
        {question.options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all active:scale-[0.98] ${
              value === opt.value
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border hover:border-primary/30"
            }`}
          >
            <span className="font-medium">{opt.label}</span>
            {opt.points !== 0 && (
              <span className="ml-2 text-sm text-muted-foreground">
                ({opt.points > 0 ? "+" : ""}
                {opt.points}点)
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

type ScoreEvaluation = {
  label: string;
  color: string;
  description: string;
  tip: string;
  notes?: string[];
};

function getScoreEvaluation(slug: string, total: number): ScoreEvaluation {
  if (slug === "setagaya") return getSetagayaEvaluation(total);
  if (slug === "yokohama") return getYokohamaEvaluation(total);
  if (slug === "osaka") return getOsakaEvaluation(total);
  if (slug === "kawasaki") return getKawasakiEvaluation(total);
  if (slug === "nagoya") return getNagoyaEvaluation(total);
  if (slug === "saitama") return getSaitamaEvaluation(total);
  if (slug === "sapporo") return getSapporoEvaluation(total);
  if (slug === "kobe") return getKobeEvaluation(total);
  if (slug === "fukuoka") return getFukuokaEvaluation(total);
  if (slug === "hiroshima") return getHiroshimaEvaluation(total);
  if (slug === "sendai") return getSendaiEvaluation(total);
  if (slug === "kyoto") return getKyotoEvaluation(total);
  if (slug === "kitakyushu") return getKitakyushuEvaluation(total);
  if (slug === "hamamatsu") return getHamamatsuEvaluation(total);
  if (slug === "chiba") return getChibaEvaluation(total);
  if (slug === "adachi") return getAdachiEvaluation(total);
  if (slug === "suginami") return getSuginamiEvaluation(total);
  if (slug === "itabashi") return getItabashiEvaluation(total);
  if (slug === "nerima") return getNerimaEvaluation(total);
  if (slug === "ota") return getOtaEvaluation(total);
  if (slug === "edogawa") return getEdogawaEvaluation(total);
  if (slug === "sakai") return getSakaiEvaluation(total);
  if (slug === "niigata") return getNiigataEvaluation(total);
  if (slug === "sagamihara") return getSagamiharaEvaluation(total);
  if (slug === "nakano") return getNakanoEvaluation(total);
  if (slug === "toshima") return getToshimaEvaluation(total);
  if (slug === "kita") return getKitaEvaluation(total);
  if (slug === "arakawa") return getArakawaEvaluation(total);
  if (slug === "shinagawa") return getShinagawaEvaluation(total);
  if (slug === "funabashi") return getFunabashiEvaluation(total);
  if (slug === "hachioji") return getHachiojiEvaluation(total);
  if (slug === "kawaguchi") return getKawaguchiEvaluation(total);
  if (slug === "himeji") return getHimejiEvaluation(total);
  if (slug === "matsuyama") return getMatsuyamaEvaluation(total);
  return getGenericEvaluation(total);
}

function getSetagayaEvaluation(total: number): ScoreEvaluation {
  const notes = [
    "※ 世田谷区では入園児童の約40%がフルタイム共働き＋育休明け加点の105点です",
    "※ 同点の場合の優先順位：小規模保育等の卒園児 → 基本指数が高い世帯 → 所得が低い世帯 → 認可外利用期間が長い世帯 → 区内居住期間が長い世帯 → 保育理由の類型",
  ];
  if (total >= 110) return { label: "かなり有利", color: "text-green-600", description: "世田谷区でもトップクラスの点数です。多くの園で入園が期待できます。", tip: "希望する園の過去のボーダーラインも確認しておくと、より安心です。", notes };
  if (total >= 106) return { label: "有利だけど油断は禁物", color: "text-emerald-600", description: "フルタイム共働き＋複数の加点がある状態です。多くの園でチャンスがありますが、人気園では106点以上でも競争になることがあります。", tip: "人気園に絞りすぎず、複数の園を希望に入れておくのが安心です。", notes };
  if (total >= 105) return { label: "最激戦ゾーン", color: "text-blue-600", description: "世田谷区で最も多い点数帯です。入園児童の約40%がこの層にいるため、同点の中での競争になります。", tip: "加点をもう1つ積めないか確認しましょう（認可外利用+6点、きょうだい加点+5点など）。園の選び方も重要です。", notes };
  if (total >= 100) return { label: "加点なしでは厳しい", color: "text-yellow-600", description: "両親フルタイムの基本ラインですが、世田谷区ではほとんどの家庭が育休明け加点（+5）などを持っているため、100点では入園は厳しい状況です。", tip: "育休明け加点（+5）、認可外利用（+5〜6）、きょうだい加点（+5）など、使える加点がないかもう一度チェックしてみましょう。", notes };
  if (total >= 80) return { label: "認可園は非常に厳しい", color: "text-orange-600", description: "パートタイムや時短勤務の方に多い点数帯です。世田谷区の認可園はほぼフルタイム＋加点ありの家庭で埋まるため、この点数での入園は非常に難しいのが現実です。", tip: "小規模保育や新設園も視野に入れましょう。認可外保育施設に預けると加点（+5〜6）がつくので、翌年度のステップアップも検討してみてください。", notes };
  if (total >= 60) return { label: "認可園はかなり厳しい", color: "text-red-500", description: "求職中やパートタイム勤務の方に多い点数帯です。世田谷区の認可園への入園は現実的に難しい状況です。", tip: "認可外保育施設や一時保育の利用を並行して検討するのがおすすめです。認可外に預けると加点がつくので、次年度の入園に向けた準備にもなります。", notes };
  return { label: "認可園は極めて難しい", color: "text-red-600", description: "この点数では認可園への入園は極めて難しい状況です。", tip: "まずは認可外保育施設やファミリーサポートなど、別の預け先を検討しましょう。就労状況が変われば点数も変わるので、定期的にシミュレーションし直してみてください。", notes };
}

function getYokohamaEvaluation(total: number): ScoreEvaluation {
  // 横浜市: ランクA(9点)+調整指数。ランクAの共働き=9点+調整
  const notes = [
    "※ 横浜市はランク制（A〜I）で選考されます。この点数はランクを数値化した目安です",
    "※ 同ランクの場合の優先順位：調整指数 → 類型間の優先順位（疾病・障害 > 就労 > 介護...）→ 養育児童数 → 所得の低い世帯",
  ];
  if (total >= 14) return { label: "かなり有利", color: "text-green-600", description: "ランクA＋複数の加点がある状態です。多くの園で入園が期待できます。", tip: "希望する園の過去の内定ラインも確認しておくと安心です。", notes };
  if (total >= 12) return { label: "有利", color: "text-emerald-600", description: "ランクA＋加点がある状態です。多くの園でチャンスがあります。", tip: "人気園では同ランク内での競争になります。複数の園を希望に入れておきましょう。", notes };
  if (total >= 9) return { label: "標準的（ランクA相当）", color: "text-blue-600", description: "両親フルタイムの基本ラインです。横浜市ではランクAの家庭が多いため、加点の有無が勝負を分けます。", tip: "横浜保育室・小規模保育の卒園児加点（+5）、きょうだい加点（+4）、認可外利用（+3）など、使える加点がないか確認しましょう。", notes };
  if (total >= 7) return { label: "やや不利", color: "text-yellow-600", description: "ランクB〜C相当です。ランクAの家庭が優先されるため、人気園への入園は難しい状況です。", tip: "フルタイムへの切り替えが可能か検討するか、比較的空きのある園を探しましょう。", notes };
  if (total >= 4) return { label: "認可園は厳しい", color: "text-orange-600", description: "パートタイムや求職中の方に多いランクです。認可園への入園は難しい状況です。", tip: "横浜保育室や認可外保育施設も並行して検討しましょう。認可外利用で加点がつく場合もあります。", notes };
  return { label: "認可園は極めて難しい", color: "text-red-600", description: "このランクでは認可園への入園は極めて難しい状況です。", tip: "まずは横浜保育室や認可外保育施設など別の預け先を検討しましょう。", notes };
}

function getOsakaEvaluation(total: number): ScoreEvaluation {
  // 大阪市: 父母各100点、合計最大200点+調整
  const notes = [
    "※ 大阪市では両親フルタイムで200点が基本ラインです",
    "※ 同点の場合の優先順位：災害 → 就労（親族外雇用）→ 就労（親族雇用）→ 就労内定 → ひとり親等の求職 → 疾病 → 障害 → 介護 → 就学 → 出産 → 求職",
  ];
  if (total >= 210) return { label: "かなり有利", color: "text-green-600", description: "フルタイム共働き＋複数の加点がある高得点です。多くの園で入園が期待できます。", tip: "希望する園の過去のボーダーラインも確認しておくと安心です。", notes };
  if (total >= 207) return { label: "有利", color: "text-emerald-600", description: "フルタイム共働き＋加点ありの状態です。多くの園でチャンスがあります。", tip: "人気園では同点の中での競争になることがあります。複数の園を希望に入れましょう。", notes };
  if (total >= 200) return { label: "標準的（フルタイム共働き相当）", color: "text-blue-600", description: "両親フルタイムの基本ラインです。加点がないと人気園では厳しい場合があります。", tip: "育休復帰加点（+7）、認可外利用（+5）、きょうだい加点（+3）など使える加点がないか確認しましょう。", notes };
  if (total >= 160) return { label: "やや厳しめ", color: "text-yellow-600", description: "パートタイムや時短勤務の方に多い点数帯です。人気園は難しい場合がありますが、園によってはチャンスがあります。", tip: "小規模保育や新設園も視野に入れましょう。認可外保育施設を利用すると加点がつく場合もあります。", notes };
  if (total >= 120) return { label: "認可園は厳しい", color: "text-orange-600", description: "求職中や短時間勤務の方に多い点数帯です。認可園への入園は難しい状況です。", tip: "認可外保育施設や一時保育も並行して検討するのがおすすめです。", notes };
  return { label: "認可園は極めて難しい", color: "text-red-600", description: "この点数では認可園への入園は極めて難しい状況です。", tip: "まずは認可外保育施設やファミリーサポートなど別の預け先を検討しましょう。", notes };
}

function getKawasakiEvaluation(total: number): ScoreEvaluation {
  // 川崎市: ランクA(8点)+調整指数。フルタイム共働き+就労実績1年以上(+4)+育休明け(+2)=A-6が標準
  const notes = [
    "※ 川崎市はランク制（A〜H）で選考されます。この点数はランクを数値化した目安です",
    "※ 同ランク・同指数の場合は、養育する子ども3人以上の世帯 → 所得が低い世帯 の順で優先されます",
  ];
  if (total >= 15) return { label: "かなり有利", color: "text-green-600", description: "ランクA＋きょうだい加点などがある高得点です。多くの園で入園が期待できます。", tip: "希望する園の過去のボーダーも確認しておくと安心です。", notes };
  if (total >= 12) return { label: "有利", color: "text-emerald-600", description: "ランクA＋複数の加点がある状態です。多くの園でチャンスがあります。", tip: "中原区・高津区など激戦区では、この点数帯でも競争になることがあります。", notes };
  if (total >= 10) return { label: "標準的（A-6前後）", color: "text-blue-600", description: "フルタイム共働き＋就労実績＋育休明け（A-6）の標準ラインです。川崎市ではこの層が最も多く、加点の有無が勝負を分けます。", tip: "認可外利用（+2）やきょうだい加点（+7）など使える加点がないか確認しましょう。", notes };
  if (total >= 8) return { label: "加点なしでは厳しい", color: "text-yellow-600", description: "ランクAだが加点が少ない状態です。人気園への入園は厳しい場合があります。", tip: "就労実績の加点（1年以上で+2/人）や育休明け加点（+2）を確認しましょう。", notes };
  if (total >= 5) return { label: "認可園は厳しい", color: "text-orange-600", description: "ランクB〜D相当です。ランクAの家庭が優先されるため、認可園への入園は難しい状況です。", tip: "フルタイムへの切り替えが可能か検討するか、比較的空きのある園を探しましょう。", notes };
  return { label: "認可園は極めて難しい", color: "text-red-600", description: "このランクでは認可園への入園は極めて難しい状況です。", tip: "認可外保育施設や企業主導型保育など別の預け先を検討しましょう。", notes };
}

function getNagoyaEvaluation(total: number): ScoreEvaluation {
  // 名古屋市: ランクA(9点)+調整指数。人気園ボーダーはA7〜A10
  const notes = [
    "※ 名古屋市はランク制（A〜I）で選考されます。この点数はランクを数値化した目安です",
    "※ 同ランク・同指数の場合は所得が低い世帯が優先されます",
    "※ ランクアップ制度（ひとり親で最大3ランクアップ等）は本シミュレーターに反映されていません。くわしくは名古屋市にご確認ください",
  ];
  if (total >= 17) return { label: "かなり有利", color: "text-green-600", description: "ランクA＋きょうだい加点など高い加点がある状態です。多くの園で入園が期待できます。", tip: "希望する園の過去のボーダーも確認しておくと安心です。", notes };
  if (total >= 14) return { label: "有利", color: "text-emerald-600", description: "ランクA＋複数の加点がある状態です。人気園でもチャンスがあります。", tip: "第1希望の園で+2の加点がつくことも考慮に入れましょう。", notes };
  if (total >= 12) return { label: "標準的（ランクA＋加点あり）", color: "text-blue-600", description: "フルタイム共働き＋加点ありの層です。名古屋市では人気園のボーダーがA7〜A10程度のため、加点の積み上げが重要です。", tip: "きょうだい同一施設（+5）、認可外利用（+3）、育休復帰（+3）など使える加点を確認しましょう。", notes };
  if (total >= 9) return { label: "加点なしでは厳しい", color: "text-yellow-600", description: "ランクAだが加点がない状態です。人気園では厳しく、不人気園でもボーダーぎりぎりです。", tip: "認可外保育施設に預けると+3の加点がつきます。きょうだい加点や育休復帰加点も確認しましょう。", notes };
  if (total >= 6) return { label: "認可園は厳しい", color: "text-orange-600", description: "ランクB〜D相当です。ランクAの家庭が優先されるため、認可園への入園は難しい状況です。", tip: "フルタイムへの切り替えや、比較的空きのある園を探しましょう。", notes };
  return { label: "認可園は極めて難しい", color: "text-red-600", description: "このランクでは認可園への入園は極めて難しい状況です。", tip: "認可外保育施設や企業主導型保育など別の預け先を検討しましょう。", notes };
}

function getSaitamaEvaluation(total: number): ScoreEvaluation {
  // さいたま市: 父母各最大26点+調整。フルタイム共働き＋育休＋祖父母別居=62点が標準
  const notes = [
    "※ さいたま市ではフルタイム共働き＋育休中＋祖父母別居で62点が標準ラインです",
    "※ 同点の場合の優先順位：ひとり親 → 災害 → 疾病・障害 → 出産 → 看護・介護 → 就労 → 育休中 → 就学 → 求職 → 所得の低い順",
    "※ ひとり親の場合、配偶者は「不存在」として60点が加算されます（公式基準に準拠）",
  ];
  if (total >= 67) return { label: "かなり有利", color: "text-green-600", description: "フルタイム共働き＋複数の加点がある高得点です。多くの園で入園が期待できます。", tip: "希望する園の過去のボーダーも確認しておくと安心です。", notes };
  if (total >= 64) return { label: "有利", color: "text-emerald-600", description: "フルタイム共働き＋加点ありの状態です。多くの園でチャンスがあります。", tip: "人気園（浦和区・南区・大宮区）では同点の競争になることもあります。", notes };
  if (total >= 62) return { label: "標準的（フルタイム共働き相当）", color: "text-blue-600", description: "フルタイム共働き＋育休中＋祖父母別居の標準ラインです。さいたま市では62点がボーダーになることが多いです。", tip: "認可外利用（+7）やきょうだい加点（+3）など使える加点がないか確認しましょう。", notes };
  if (total >= 52) return { label: "加点なしでは厳しい", color: "text-yellow-600", description: "フルタイム共働きだが調整指数が足りない状態です。人気園では厳しい場合があります。", tip: "保育状況の加点（育休中+6、認可外利用+7）や祖父母別居の加点を確認しましょう。", notes };
  if (total >= 36) return { label: "認可園は厳しい", color: "text-orange-600", description: "パートタイムや求職中の方に多い点数帯です。認可園への入園は難しい状況です。", tip: "認可外保育施設や小規模保育も並行して検討しましょう。", notes };
  return { label: "認可園は極めて難しい", color: "text-red-600", description: "この点数では認可園への入園は極めて難しい状況です。", tip: "認可外保育施設やファミリーサポートなど別の預け先を検討しましょう。", notes };
}

function getSapporoEvaluation(total: number): ScoreEvaluation {
  // 札幌市: 父母各100点+調整。フルタイム200点+育休明け40=240点が標準
  const notes = [
    "※ 札幌市ではフルタイム共働き200点が基本ライン。育休明け（+40）やきょうだい在園（+80）の加点が重要です",
    "※ 同点の場合の優先順位：きょうだい同園在園 → きょうだい他園在園 → 所得割額が低い → ひとり親・障害者同居 → 多子世帯 → 核家族",
  ];
  if (total >= 300) return { label: "かなり有利", color: "text-green-600", description: "フルタイム共働き＋きょうだい在園＋育休明けの高得点です。多くの園で入園が期待できます。", tip: "希望する園の過去の申込状況も確認しておくと安心です。", notes };
  if (total >= 280) return { label: "有利", color: "text-emerald-600", description: "フルタイム共働き＋きょうだい在園の状態です。多くの園でチャンスがあります。", tip: "人気園（中央区・豊平区）では同点の競争になることもあります。", notes };
  if (total >= 240) return { label: "標準的（フルタイム＋育休明け）", color: "text-blue-600", description: "フルタイム共働き＋育休明けの標準ラインです。加点の有無が勝負を分けます。", tip: "きょうだい加点（+80）や認可外利用の実績があると有利です。", notes };
  if (total >= 200) return { label: "加点なしでは厳しめ", color: "text-yellow-600", description: "フルタイム共働きの基本ラインですが、加点がないと人気園では厳しい場合があります。", tip: "育休明け加点（+40）が使えないか確認しましょう。", notes };
  if (total >= 140) return { label: "認可園は厳しい", color: "text-orange-600", description: "パートタイムや時短勤務の方に多い点数帯です。認可園への入園は難しい状況です。", tip: "認可外保育施設も並行して検討しましょう。", notes };
  return { label: "認可園は極めて難しい", color: "text-red-600", description: "この点数では認可園への入園は極めて難しい状況です。", tip: "認可外保育施設やファミリーサポートなど別の預け先を検討しましょう。", notes };
}

function getKobeEvaluation(total: number): ScoreEvaluation {
  // 神戸市: 父母各100点+調整。フルタイム200点が基本
  const notes = [
    "※ 神戸市ではフルタイム共働き200点が基本ラインです",
    "※ 「育休延長も許容できる」を選ぶと-90点の大きな減点になります",
    "※ 同点の場合の優先順位：基本点数が高い → 希望順位 → きょうだい数 → 市民税が低い",
  ];
  if (total >= 215) return { label: "かなり有利", color: "text-green-600", description: "フルタイム共働き＋きょうだい加点などがある高得点です。多くの園で入園が期待できます。", tip: "希望する園の申込状況を確認しておくと安心です。", notes };
  if (total >= 208) return { label: "有利", color: "text-emerald-600", description: "フルタイム共働き＋加点ありの状態です。多くの園でチャンスがあります。", tip: "きょうだいが在園中の園を第一希望にすると+15の大きな加点がつきます。", notes };
  if (total >= 200) return { label: "標準的（フルタイム共働き）", color: "text-blue-600", description: "フルタイム共働きの基本ラインです。人気園では加点がないと厳しい場合があります。", tip: "認可外利用（+5）やきょうだい加点を確認しましょう。", notes };
  if (total >= 160) return { label: "やや厳しめ", color: "text-yellow-600", description: "パートタイムや時短勤務の方に多い点数帯です。園によってはチャンスがあります。", tip: "不人気園や小規模保育も視野に入れましょう。", notes };
  if (total >= 110) return { label: "認可園は厳しい", color: "text-orange-600", description: "認可園への入園は難しい状況です。", tip: "認可外保育施設も並行して検討しましょう。育休延長許容（-90）を選んでいないか確認してください。", notes };
  return { label: "認可園は極めて難しい", color: "text-red-600", description: "この点数では認可園への入園は極めて難しい状況です。", tip: "認可外保育施設やファミリーサポートなど別の預け先を検討しましょう。", notes };
}

function getFukuokaEvaluation(total: number): ScoreEvaluation {
  // 福岡市: min方式、フルタイム=150点+調整
  const notes = [
    "※ 福岡市では保護者の低い方の基本点数が採用されます。フルタイム共働きで150点が基本ラインです",
    "※ 同点の場合の優先順位：希望順位 → 事由の優先順位 → 未就学児の数 → 所得低い順",
  ];
  if (total >= 220) return { label: "かなり有利", color: "text-green-600", description: "フルタイム＋きょうだい加点などがある高得点です。多くの園で入園が期待できます。", tip: "希望する園の申込状況も確認しておくと安心です。", notes };
  if (total >= 165) return { label: "有利", color: "text-emerald-600", description: "フルタイム＋育休明けやきょうだい加点がある状態です。チャンスがあります。", tip: "人気園では同点の競争になることもあります。", notes };
  if (total >= 150) return { label: "標準的（フルタイム共働き）", color: "text-blue-600", description: "フルタイム共働きの基本ラインです。人気園では加点がないと厳しい場合があります。", tip: "きょうだい加点（+70）や育休明け（+15）など使える加点を確認しましょう。", notes };
  if (total >= 100) return { label: "やや厳しめ", color: "text-yellow-600", description: "パートタイムや時短勤務の方に多い点数帯です。", tip: "フルタイムへの切り替えが可能か検討しましょう。", notes };
  if (total >= 50) return { label: "認可園は厳しい", color: "text-orange-600", description: "認可園への入園は難しい状況です。", tip: "認可外保育施設も並行して検討しましょう。", notes };
  return { label: "認可園は極めて難しい", color: "text-red-600", description: "この点数では認可園への入園は極めて難しい状況です。", tip: "認可外保育施設やファミリーサポートなど別の預け先を検討しましょう。", notes };
}

function getHiroshimaEvaluation(total: number): ScoreEvaluation {
  // 広島市: ランク制min方式、A=8+調整
  const notes = [
    "※ 広島市はランク制（S〜X）で選考されます。この点数はランクを数値化した目安です",
    "※ 同ランク・同指数の場合は、きょうだい在園 → 生活保護 → 非課税世帯 → 所得低い順で優先されます",
  ];
  if (total >= 15) return { label: "かなり有利", color: "text-green-600", description: "ランクA＋複数の加点がある状態です。多くの園で入園が期待できます。", tip: "希望する園の申込状況も確認しておくと安心です。", notes };
  if (total >= 11) return { label: "有利", color: "text-emerald-600", description: "ランクA＋加点ありの状態です。チャンスがあります。", tip: "きょうだい加点（+4）や育休明け（+3）が重要です。", notes };
  if (total >= 8) return { label: "標準的（ランクA）", color: "text-blue-600", description: "フルタイム共働きの基本ラインです。加点があるかどうかが勝負を分けます。", tip: "育休明け加点（+3）やきょうだい加点（+4）を確認しましょう。", notes };
  if (total >= 6) return { label: "やや不利", color: "text-yellow-600", description: "ランクB〜C相当です。ランクAの家庭が優先されます。", tip: "フルタイムへの切り替えが可能か検討しましょう。", notes };
  if (total >= 3) return { label: "認可園は厳しい", color: "text-orange-600", description: "認可園への入園は難しい状況です。", tip: "認可外保育施設も並行して検討しましょう。", notes };
  return { label: "認可園は極めて難しい", color: "text-red-600", description: "この点数では認可園への入園は極めて難しい状況です。", tip: "認可外保育施設やファミリーサポートなど別の預け先を検討しましょう。", notes };
}

function getSendaiEvaluation(total: number): ScoreEvaluation {
  // 仙台市: 父母各10点+調整。フルタイム共働き=20点が基本
  const notes = [
    "※ 仙台市ではフルタイム共働き20点が基本ラインです",
    "※ 同点の場合の優先順位：きょうだい在園 → 基準指数が高い → 低所得世帯 → 認可外利用 → 所得低い順",
  ];
  if (total >= 26) return { label: "かなり有利", color: "text-green-600", description: "フルタイム共働き＋複数の加点がある高得点です。多くの園で入園が期待できます。", tip: "希望する園の申込状況も確認しておくと安心です。", notes };
  if (total >= 23) return { label: "有利", color: "text-emerald-600", description: "フルタイム共働き＋加点ありの状態です。多くの園でチャンスがあります。", tip: "きょうだい加点（+3）やひとり親加点（+3）が重要です。", notes };
  if (total >= 20) return { label: "標準的（フルタイム共働き）", color: "text-blue-600", description: "フルタイム共働きの基本ラインです。加点があるかどうかが勝負を分けます。", tip: "きょうだい利用中（+3）や生活保護/非課税（+2）など使える加点を確認しましょう。", notes };
  if (total >= 14) return { label: "やや厳しめ", color: "text-yellow-600", description: "パートタイムや時短勤務の方に多い点数帯です。園によってはチャンスがあります。", tip: "不人気園や小規模保育も視野に入れましょう。", notes };
  if (total >= 8) return { label: "認可園は厳しい", color: "text-orange-600", description: "認可園への入園は難しい状況です。", tip: "認可外保育施設も並行して検討しましょう。", notes };
  return { label: "認可園は極めて難しい", color: "text-red-600", description: "この点数では認可園への入園は極めて難しい状況です。", tip: "認可外保育施設やファミリーサポートなど別の預け先を検討しましょう。", notes };
}

function getKyotoEvaluation(total: number): ScoreEvaluation {
  // 京都市: min方式、父母各40点+調整。フルタイム=40点が基本
  const notes = [
    "※ 京都市では保護者の低い方の点数が採用されます。フルタイム（週40時間以上）で40点が基本ラインです",
    "※ きょうだい加点（+15）が非常に大きく、当落を大きく左右します",
  ];
  if (total >= 55) return { label: "かなり有利", color: "text-green-600", description: "フルタイム＋きょうだい加点などがある高得点です。多くの園で入園が期待できます。", tip: "希望する園の申込状況も確認しておくと安心です。", notes };
  if (total >= 45) return { label: "有利", color: "text-emerald-600", description: "フルタイム＋加点ありの状態です。多くの園でチャンスがあります。", tip: "人気園では同点の競争になることもあります。", notes };
  if (total >= 40) return { label: "標準的（フルタイム共働き）", color: "text-blue-600", description: "フルタイム共働きの基本ラインです。人気園では加点がないと厳しい場合があります。", tip: "きょうだい加点（+15）や育休復帰加点（+1〜2）を確認しましょう。", notes };
  if (total >= 25) return { label: "やや厳しめ", color: "text-yellow-600", description: "パートタイムや時短勤務の方に多い点数帯です。", tip: "フルタイムへの切り替えが可能か検討しましょう。", notes };
  if (total >= 10) return { label: "認可園は厳しい", color: "text-orange-600", description: "認可園への入園は難しい状況です。", tip: "認可外保育施設も並行して検討しましょう。", notes };
  return { label: "認可園は極めて難しい", color: "text-red-600", description: "この点数では認可園への入園は極めて難しい状況です。", tip: "認可外保育施設やファミリーサポートなど別の預け先を検討しましょう。", notes };
}

function getKitakyushuEvaluation(total: number): ScoreEvaluation {
  // 北九州市: 合算方式、父母各220点。フルタイム共働き=440点が基本
  const notes = [
    "※ 北九州市ではフルタイム共働き440点が基本ラインです",
    "※ 就労は月120時間以上（220点）と未満（130点）の2段階とシンプルです",
  ];
  if (total >= 610) return { label: "かなり有利", color: "text-green-600", description: "フルタイム共働き＋きょうだい加点などがある高得点です。多くの園で入園が期待できます。", tip: "希望する園の申込状況も確認しておくと安心です。", notes };
  if (total >= 480) return { label: "有利", color: "text-emerald-600", description: "フルタイム共働き＋加点ありの状態です。チャンスがあります。", tip: "きょうだい加点（+170）や育休復帰加点が重要です。", notes };
  if (total >= 440) return { label: "標準的（フルタイム共働き）", color: "text-blue-600", description: "フルタイム共働きの基本ラインです。人気園では加点がないと厳しい場合があります。", tip: "きょうだい加点（+170）や育休復帰（+140〜170）を確認しましょう。", notes };
  if (total >= 260) return { label: "やや厳しめ", color: "text-yellow-600", description: "パートタイム（月120時間未満）の方に多い点数帯です。", tip: "月120時間以上の就労で220点に上がります。", notes };
  if (total >= 60) return { label: "認可園は厳しい", color: "text-orange-600", description: "認可園への入園は難しい状況です。", tip: "認可外保育施設も並行して検討しましょう。", notes };
  return { label: "認可園は極めて難しい", color: "text-red-600", description: "この点数では認可園への入園は極めて難しい状況です。", tip: "認可外保育施設やファミリーサポートなど別の預け先を検討しましょう。", notes };
}

function getHamamatsuEvaluation(total: number): ScoreEvaluation {
  // 浜松市: min方式、父母各20点。フルタイム=20点+就労日数3=23点が標準
  const notes = [
    "※ 浜松市では保護者の低い方の基準点が採用されます。フルタイム（月150時間以上）で20点+就労日数加点が基本です",
    "※ 同点の場合の優先順位：基準点が高い → 事由の優先順位 → ひとり親 → 子どもの数 → 市民税が低い順",
  ];
  if (total >= 28) return { label: "かなり有利", color: "text-green-600", description: "フルタイム＋複数の加点がある高得点です。多くの園で入園が期待できます。", tip: "希望する園の申込状況も確認しておくと安心です。", notes };
  if (total >= 26) return { label: "有利", color: "text-emerald-600", description: "フルタイム＋育休復帰加点ありの状態です。チャンスがあります。", tip: "認可外利用（+2）やひとり親加点も確認しましょう。", notes };
  if (total >= 23) return { label: "標準的（フルタイム＋就労日数加点）", color: "text-blue-600", description: "フルタイム共働き＋就労日数加点の標準ラインです。加点の積み上げが重要です。", tip: "育休復帰（+3）や認可外利用（+2）など使える加点を確認しましょう。", notes };
  if (total >= 20) return { label: "加点なしでは厳しめ", color: "text-yellow-600", description: "フルタイムだが就労日数加点がない状態です。", tip: "月20日以上の就労で+3の加点がつきます。", notes };
  if (total >= 12) return { label: "認可園は厳しい", color: "text-orange-600", description: "認可園への入園は難しい状況です。", tip: "認可外保育施設も並行して検討しましょう。", notes };
  return { label: "認可園は極めて難しい", color: "text-red-600", description: "この点数では認可園への入園は極めて難しい状況です。", tip: "認可外保育施設やファミリーサポートなど別の預け先を検討しましょう。", notes };
}

function getChibaEvaluation(total: number): ScoreEvaluation {
  // 千葉市: 合算、父母各最大22点(就労)。フルタイム+週5日+育休明け=49点が標準
  const notes = [
    "※ 千葉市ではフルタイム共働き＋週5日勤務＋育休明けで49点が標準ラインです",
    "※ 同点の場合：ひとり親・単身赴任 → 基準点合計 → 同居保育可能者なし → 子どもの数 → 就労時間 → 勤務地距離の順",
  ];
  if (total >= 55) return { label: "かなり有利", color: "text-green-600", description: "フルタイム共働き＋きょうだい加点などがある高得点です。多くの園で入園が期待できます。", tip: "希望する園の過去のボーダーも確認しておくと安心です。", notes };
  if (total >= 49) return { label: "標準的（フルタイム＋育休明け）", color: "text-blue-600", description: "フルタイム共働き＋週5日勤務＋育休明けの標準ラインです。人気園では加点の積み上げが重要です。", tip: "きょうだい加点（+6）や認可外利用（+4）など使える加点を確認しましょう。", notes };
  if (total >= 44) return { label: "加点なしでは厳しめ", color: "text-yellow-600", description: "フルタイム共働きの基本ラインですが、育休明けや認可外利用の加点がないと人気園は厳しい場合があります。", tip: "認可外利用（+4）や育休明け（+3）の加点を確認しましょう。", notes };
  if (total >= 30) return { label: "認可園は厳しい", color: "text-orange-600", description: "パートタイムや求職中の方に多い点数帯です。認可園への入園は難しい状況です。", tip: "認可外保育施設も並行して検討しましょう。", notes };
  return { label: "認可園は極めて難しい", color: "text-red-600", description: "この点数では認可園への入園は極めて難しい状況です。", tip: "認可外保育施設やファミリーサポートなど別の預け先を検討しましょう。", notes };
}

function getSakaiEvaluation(total: number): ScoreEvaluation {
  // 堺市: 合算方式、父母各20点。フルタイム共働き=40点が基本
  const notes = [
    "※ 堺市ではフルタイム共働き40点が基本ラインです",
    "※ 育休延長許容を選ぶと-50点の大きな減点になります",
    "※ 同点の場合の優先順位：基準項目の合計点が高い → きょうだい在園 → ひとり親 → 所得が低い世帯",
  ];
  if (total >= 50) return { label: "かなり有利", color: "text-green-600", description: "フルタイム共働き＋複数の加点がある高得点です。多くの園で入園が期待できます。", tip: "希望する園の過去のボーダーも確認しておくと安心です。", notes };
  if (total >= 46) return { label: "有利", color: "text-emerald-600", description: "フルタイム共働き＋加点ありの状態です。多くの園でチャンスがあります。", tip: "人気園（堺区・北区）では同点の競争になることもあります。", notes };
  if (total >= 40) return { label: "標準的（フルタイム共働き）", color: "text-blue-600", description: "フルタイム共働きの基本ラインです。人気園では加点がないと厳しい場合があります。", tip: "きょうだい同一施設（+4）や育休復帰（+2）など使える加点を確認しましょう。", notes };
  if (total >= 30) return { label: "やや厳しめ", color: "text-yellow-600", description: "パートタイムや時短勤務の方に多い点数帯です。園によってはチャンスがあります。", tip: "不人気園や小規模保育も視野に入れましょう。", notes };
  if (total >= 14) return { label: "認可園は厳しい", color: "text-orange-600", description: "認可園への入園は難しい状況です。", tip: "認可外保育施設も並行して検討しましょう。", notes };
  return { label: "認可園は極めて難しい", color: "text-red-600", description: "この点数では認可園への入園は極めて難しい状況です。", tip: "認可外保育施設やファミリーサポートなど別の預け先を検討しましょう。", notes };
}

function getNiigataEvaluation(total: number): ScoreEvaluation {
  // 新潟市: 合算方式、父母各10点。フルタイム共働き=20点が基本
  const notes = [
    "※ 新潟市ではフルタイム共働き（外勤週5日・35時間以上）20点が基本ラインです",
    "※ 外勤と内勤・自営では点数が異なります（外勤の方が高い）",
    "※ 同点の場合の優先順位：きょうだい在園 → ひとり親 → 多子世帯 → 所得が低い世帯",
  ];
  if (total >= 26) return { label: "かなり有利", color: "text-green-600", description: "フルタイム共働き＋複数の加点がある高得点です。多くの園で入園が期待できます。", tip: "希望する園の申込状況も確認しておくと安心です。", notes };
  if (total >= 23) return { label: "有利", color: "text-emerald-600", description: "フルタイム共働き＋加点ありの状態です。多くの園でチャンスがあります。", tip: "人気園（中央区・西区）では同点の競争になることもあります。", notes };
  if (total >= 20) return { label: "標準的（フルタイム共働き）", color: "text-blue-600", description: "フルタイム共働きの基本ラインです。加点があるかどうかが勝負を分けます。", tip: "単身赴任加点（+2〜4）やきょうだい加点（+4）など使える加点を確認しましょう。", notes };
  if (total >= 14) return { label: "やや厳しめ", color: "text-yellow-600", description: "パートタイムや内勤・自営の方に多い点数帯です。園によってはチャンスがあります。", tip: "不人気園や小規模保育も視野に入れましょう。", notes };
  if (total >= 6) return { label: "認可園は厳しい", color: "text-orange-600", description: "認可園への入園は難しい状況です。", tip: "認可外保育施設も並行して検討しましょう。", notes };
  return { label: "認可園は極めて難しい", color: "text-red-600", description: "この点数では認可園への入園は極めて難しい状況です。", tip: "認可外保育施設やファミリーサポートなど別の預け先を検討しましょう。", notes };
}

function getSagamiharaEvaluation(total: number): ScoreEvaluation {
  // 相模原市: 合算方式、父母各20点。フルタイム共働き=40点が基本
  const notes = [
    "※ 相模原市ではフルタイム共働き（月20日以上・1日8時間以上）40点が基本ラインです",
    "※ 同点の場合の優先順位：ひとり親・単身赴任 → 基準点合計 → きょうだい在園 → 子どもの数 → 所得が低い順",
  ];
  if (total >= 50) return { label: "かなり有利", color: "text-green-600", description: "フルタイム共働き＋複数の加点がある高得点です。多くの園で入園が期待できます。", tip: "希望する園の申込状況も確認しておくと安心です。", notes };
  if (total >= 45) return { label: "有利", color: "text-emerald-600", description: "フルタイム共働き＋加点ありの状態です。多くの園でチャンスがあります。", tip: "人気園（中央区・南区）では同点の競争になることもあります。", notes };
  if (total >= 40) return { label: "標準的（フルタイム共働き）", color: "text-blue-600", description: "フルタイム共働きの基本ラインです。人気園では加点がないと厳しい場合があります。", tip: "きょうだい同一施設（+5）や育休復帰（+3）、認可外利用（+3）など使える加点を確認しましょう。", notes };
  if (total >= 28) return { label: "やや厳しめ", color: "text-yellow-600", description: "パートタイムや時短勤務の方に多い点数帯です。園によってはチャンスがあります。", tip: "不人気園や小規模保育も視野に入れましょう。", notes };
  if (total >= 14) return { label: "認可園は厳しい", color: "text-orange-600", description: "認可園への入園は難しい状況です。", tip: "認可外保育施設も並行して検討しましょう。", notes };
  return { label: "認可園は極めて難しい", color: "text-red-600", description: "この点数では認可園への入園は極めて難しい状況です。", tip: "認可外保育施設やファミリーサポートなど別の預け先を検討しましょう。", notes };
}

function getNerimaEvaluation(total: number): ScoreEvaluation {
  // 練馬区: 父母各40点、合計80点+調整。フルタイム共働き=80点が基本
  const notes = [
    "※ 練馬区ではフルタイム共働き80点が基本ラインです。0歳児ボーダー80点、1歳児ボーダー81点が目安です",
    "※ 同一指数の場合の優先順位：練馬区在住 → 保育指数が高い → 保育料滞納なし → ひとり親等 → 児童の障害 → 多子世帯 → 所得が低い世帯",
  ];
  if (total >= 90) return { label: "かなり有利", color: "text-green-600", description: "フルタイム共働き＋複数の加点がある高得点です。多くの園で入園が期待できます。", tip: "希望する園の過去のボーダーラインも確認しておくと安心です。", notes };
  if (total >= 84) return { label: "有利だけど油断は禁物", color: "text-emerald-600", description: "フルタイム共働き＋加点ありの状態です。多くの園でチャンスがありますが、人気園では競争になることがあります。", tip: "複数の園を希望に入れておくのが安心です。", notes };
  if (total >= 81) return { label: "最激戦ゾーン", color: "text-blue-600", description: "フルタイム共働き＋少しの加点がある状態です。1歳児のボーダーが81点のため、この点数帯が最も多い層です。", tip: "加点をもう1つ積めないか確認しましょう（認可外利用+2〜3点、多胎児+3点など）。", notes };
  if (total >= 80) return { label: "加点なしでは厳しい", color: "text-yellow-600", description: "両親フルタイムの基本ラインですが、0歳児でぎりぎりのボーダーです。1歳児では加点がないと厳しい状況です。", tip: "認可外利用（+2〜3）、育休明け（+1〜2）、多胎児（+3）、未就学児3人以上（+5）など使える加点がないか確認しましょう。", notes };
  if (total >= 60) return { label: "認可園は非常に厳しい", color: "text-orange-600", description: "パートタイムや時短勤務の方に多い点数帯です。練馬区の認可園はフルタイム＋加点ありの家庭で埋まるため、この点数での入園は厳しい状況です。", tip: "小規模保育や新設園も視野に入れましょう。認可外保育施設に預けると加点がつくので、翌年度のステップアップも検討してみてください。", notes };
  if (total >= 40) return { label: "認可園はかなり厳しい", color: "text-red-500", description: "求職中やパートタイム勤務の方に多い点数帯です。認可園への入園は現実的に難しい状況です。", tip: "認可外保育施設や一時保育の利用を並行して検討するのがおすすめです。", notes };
  return { label: "認可園は極めて難しい", color: "text-red-600", description: "この点数では認可園への入園は極めて難しい状況です。", tip: "まずは認可外保育施設やファミリーサポートなど、別の預け先を検討しましょう。", notes };
}

function getOtaEvaluation(total: number): ScoreEvaluation {
  // 大田区: 父母各11点、合計22点+調整。フルタイム共働き=22点が基本
  const notes = [
    "※ 大田区ではフルタイム共働き22点が基本ラインです",
    "※ 同一指数の場合の優先順位：入所/転園 → 基準指数が高い → ひとり親 → 保護者の疾病 → 保護者の障害 → 児童の障害 → 卒園年齢児 → 所得割額が低い → きょうだい在園",
  ];
  if (total >= 28) return { label: "かなり有利", color: "text-green-600", description: "フルタイム共働き＋複数の加点がある高得点です。多くの園で入園が期待できます。", tip: "希望する園の過去の最低指数も確認しておくと安心です。", notes };
  if (total >= 25) return { label: "有利", color: "text-emerald-600", description: "フルタイム共働き＋加点ありの状態です。多くの園でチャンスがあります。", tip: "人気園では同点の競争になることもあります。複数の園を希望に入れましょう。", notes };
  if (total >= 22) return { label: "標準的（フルタイム共働き相当）", color: "text-blue-600", description: "両親フルタイムの基本ラインです。大田区では22点の家庭が多いため、加点の有無が勝負を分けます。", tip: "きょうだい加点（+2）、認可外利用（+2）、保育士加点（+2）など、使える加点がないか確認しましょう。", notes };
  if (total >= 18) return { label: "やや厳しめ", color: "text-yellow-600", description: "パートタイムや時短勤務の方に多い点数帯です。人気園では厳しい場合がありますが、園によってはチャンスがあります。", tip: "フルタイムへの切り替えが可能か検討するか、比較的空きのある園を探しましょう。", notes };
  if (total >= 10) return { label: "認可園は厳しい", color: "text-orange-600", description: "認可園への入園は難しい状況です。", tip: "認可外保育施設も並行して検討しましょう。", notes };
  return { label: "認可園は極めて難しい", color: "text-red-600", description: "この点数では認可園への入園は極めて難しい状況です。", tip: "認可外保育施設やファミリーサポートなど別の預け先を検討しましょう。", notes };
}

function getEdogawaEvaluation(total: number): ScoreEvaluation {
  // 江戸川区: 父母各50点、合計100点+調整。フルタイム共働き=100点が基本
  const notes = [
    "※ 江戸川区ではフルタイム共働き（居宅外・月20日以上・7時間以上）100点が基本ラインです",
    "※ 同一指数の場合：保護者の状況、経済状況、家庭環境等を総合的に判断されます。就労実績があり収入が低い世帯が優先される傾向があります",
  ];
  if (total >= 108) return { label: "かなり有利", color: "text-green-600", description: "フルタイム共働き＋複数の加点がある高得点です。多くの園で入園が期待できます。", tip: "希望する園の過去のボーダーも確認しておくと安心です。", notes };
  if (total >= 106) return { label: "有利", color: "text-emerald-600", description: "フルタイム共働き＋きょうだい加点などがある状態です。多くの園でチャンスがあります。", tip: "人気園では同点の競争になることもあります。", notes };
  if (total >= 100) return { label: "標準的（フルタイム共働き相当）", color: "text-blue-600", description: "両親フルタイムの基本ラインです。江戸川区ではこの点数の家庭が多いため、加点の有無が重要です。", tip: "きょうだい加点（+6）、認可外利用（+1）、育休明け（+1）など使える加点を確認しましょう。", notes };
  if (total >= 80) return { label: "加点なしでは厳しい", color: "text-yellow-600", description: "パートタイムや時短勤務の方に多い点数帯です。人気園では厳しい場合があります。", tip: "居宅外のフルタイム勤務への切り替えが可能か検討しましょう。居宅内労働は居宅外より5点低くなります。", notes };
  if (total >= 50) return { label: "認可園は厳しい", color: "text-orange-600", description: "求職中や短時間勤務の方に多い点数帯です。認可園への入園は難しい状況です。", tip: "認可外保育施設も並行して検討しましょう。", notes };
  return { label: "認可園は極めて難しい", color: "text-red-600", description: "この点数では認可園への入園は極めて難しい状況です。", tip: "認可外保育施設やファミリーサポートなど別の預け先を検討しましょう。", notes };
}

function getAdachiEvaluation(total: number): ScoreEvaluation {
  // 足立区: 父母各23点、合計最大46点+調整。フルタイム共働き46点+育休2+認可外3=51点が標準
  const notes = [
    "※ 足立区ではフルタイム共働き46点＋育休明け（+2）＋認可外利用（+3）の51点が標準ラインです",
    "※ 同点の場合の優先順位：希望施設にきょうだい在園 → 足立区在住期間が長い → 基本指数が高い → 所得が低い世帯",
  ];
  if (total >= 53) return { label: "かなり有利", color: "text-green-600", description: "フルタイム共働き＋複数の加点がある高得点です。多くの園で入園が期待できます。", tip: "希望する園の過去のボーダーラインも確認しておくと安心です。", notes };
  if (total >= 51) return { label: "有利", color: "text-emerald-600", description: "フルタイム共働き＋育休明け＋認可外利用の標準的な高得点です。多くの園でチャンスがあります。", tip: "人気エリア（北千住・綾瀬周辺）では同点の競争になることもあります。", notes };
  if (total >= 48) return { label: "標準的（フルタイム＋加点あり）", color: "text-blue-600", description: "フルタイム共働き＋加点ありの状態です。加点の積み上げが重要です。", tip: "認可外利用（+3）や育休明け（+2）、きょうだい加点（+2）など使える加点を確認しましょう。", notes };
  if (total >= 46) return { label: "加点なしでは厳しめ", color: "text-yellow-600", description: "フルタイム共働きの基本ラインですが、加点がないと人気園では厳しい場合があります。", tip: "認可外保育施設に預けると+3の加点がつきます。育休明け加点（+2）も確認しましょう。", notes };
  if (total >= 30) return { label: "認可園は厳しい", color: "text-orange-600", description: "パートタイムや時短勤務の方に多い点数帯です。認可園への入園は難しい状況です。", tip: "認可外保育施設や小規模保育も並行して検討しましょう。", notes };
  return { label: "認可園は極めて難しい", color: "text-red-600", description: "この点数では認可園への入園は極めて難しい状況です。", tip: "認可外保育施設やファミリーサポートなど別の預け先を検討しましょう。", notes };
}

function getSuginamiEvaluation(total: number): ScoreEvaluation {
  // 杉並区: 父母各20点、合計最大40点+調整。フルタイム共働き40点+育休明け10=50点が標準
  const notes = [
    "※ 杉並区ではフルタイム共働き40点＋育休明け加点（+10）の50点が標準ラインです",
    "※ 育休明け加点が+10と非常に大きいのが杉並区の特徴です",
    "※ 同点の場合の優先順位：区内在住 → 障害のある子ども → 父母不在 → ひとり親 → 生活保護 → 多子世帯 → 所得が低い世帯",
  ];
  if (total >= 54) return { label: "かなり有利", color: "text-green-600", description: "フルタイム共働き＋育休明け＋きょうだい加点などがある高得点です。多くの園で入園が期待できます。", tip: "希望する園の過去のボーダーも確認しておくと安心です。", notes };
  if (total >= 50) return { label: "標準的（フルタイム＋育休明け）", color: "text-blue-600", description: "フルタイム共働き＋育休明けの標準ラインです。杉並区では50点がボーダーになることが多いです。", tip: "きょうだい加点（+3）や認可外利用（+2〜4）など追加の加点があると有利です。", notes };
  if (total >= 44) return { label: "育休明け加点なしだと厳しい", color: "text-yellow-600", description: "フルタイム共働き＋一部加点の状態です。育休明け加点（+10）がないと人気園では厳しい場合があります。", tip: "育休明け加点（+10）が非常に大きいです。復職タイミングの調整を検討しましょう。", notes };
  if (total >= 40) return { label: "加点なしでは厳しい", color: "text-yellow-600", description: "フルタイム共働きの基本ラインですが、杉並区では育休明け加点なしだと入園は厳しい状況です。", tip: "育休明け加点（+10）が大きな差を生みます。認可外利用（+2〜4）も検討しましょう。", notes };
  if (total >= 26) return { label: "認可園は厳しい", color: "text-orange-600", description: "パートタイムや時短勤務の方に多い点数帯です。認可園への入園は難しい状況です。", tip: "認可外保育施設や小規模保育も並行して検討しましょう。", notes };
  return { label: "認可園は極めて難しい", color: "text-red-600", description: "この点数では認可園への入園は極めて難しい状況です。", tip: "認可外保育施設やファミリーサポートなど別の預け先を検討しましょう。", notes };
}

function getItabashiEvaluation(total: number): ScoreEvaluation {
  // 板橋区: 父母各30点、合計最大60点+調整。ひとり親は+30。フルタイム共働き60点+育休2+認可外2=64点が標準
  const notes = [
    "※ 板橋区ではフルタイム共働き60点が基本ラインです。ひとり親世帯は基本指数に+30されます",
    "※ 同点の場合の優先順位：ひとり親 → 養育する子の数 → 基本指数が高い → 所得が低い世帯 → 区内在住期間が長い",
  ];
  if (total >= 67) return { label: "かなり有利", color: "text-green-600", description: "フルタイム共働き＋複数の加点がある高得点です。多くの園で入園が期待できます。", tip: "希望する園の過去のボーダーも確認しておくと安心です。", notes };
  if (total >= 64) return { label: "有利", color: "text-emerald-600", description: "フルタイム共働き＋育休明け＋認可外利用の状態です。多くの園でチャンスがあります。", tip: "人気園では同点の競争になることもあります。", notes };
  if (total >= 62) return { label: "標準的（フルタイム＋加点あり）", color: "text-blue-600", description: "フルタイム共働き＋加点ありの層です。加点の有無が勝負を分けます。", tip: "認可外利用（+2）やきょうだい加点（+3）など使える加点を確認しましょう。", notes };
  if (total >= 60) return { label: "加点なしでは厳しめ", color: "text-yellow-600", description: "フルタイム共働きの基本ラインですが、加点がないと人気園では厳しい場合があります。", tip: "認可外利用（+2）や育休明け（+2）の加点を確認しましょう。", notes };
  if (total >= 40) return { label: "認可園は厳しい", color: "text-orange-600", description: "パートタイムや時短勤務の方に多い点数帯です。認可園への入園は難しい状況です。", tip: "認可外保育施設や小規模保育も並行して検討しましょう。", notes };
  return { label: "認可園は極めて難しい", color: "text-red-600", description: "この点数では認可園への入園は極めて難しい状況です。", tip: "認可外保育施設やファミリーサポートなど別の預け先を検討しましょう。", notes };
}

function getNakanoEvaluation(total: number): ScoreEvaluation {
  // 中野区: 父母各20点、合計最大40点+調整。フルタイム共働き40点+育休2+認可外2=44点が標準
  const notes = [
    "※ 中野区ではフルタイム共働き40点が基本ラインです。育休明け（+2）＋認可外利用（+2）の44点が標準的な入園ラインです",
    "※ 同点の場合の優先順位：ひとり親 → 在園きょうだいあり → 基本指数が高い → 区内在住期間が長い → 所得が低い世帯",
  ];
  if (total >= 47) return { label: "かなり有利", color: "text-green-600", description: "フルタイム共働き＋複数の加点がある高得点です。多くの園で入園が期待できます。", tip: "希望する園の過去のボーダーラインも確認しておくと安心です。", notes };
  if (total >= 44) return { label: "有利", color: "text-emerald-600", description: "フルタイム共働き＋育休明け＋認可外利用の標準的な高得点です。多くの園でチャンスがあります。", tip: "人気園（中野坂上・中野駅周辺）では同点の競争になることもあります。", notes };
  if (total >= 42) return { label: "標準的（フルタイム＋加点あり）", color: "text-blue-600", description: "フルタイム共働き＋加点ありの状態です。加点の積み上げが重要です。", tip: "認可外利用（+2）や育休明け（+2）、きょうだい加点（+2）など使える加点を確認しましょう。", notes };
  if (total >= 40) return { label: "加点なしでは厳しめ", color: "text-yellow-600", description: "フルタイム共働きの基本ラインですが、加点がないと人気園では厳しい場合があります。", tip: "認可外保育施設に預けると+2の加点がつきます。育休明け加点（+2）も確認しましょう。", notes };
  if (total >= 26) return { label: "認可園は厳しい", color: "text-orange-600", description: "パートタイムや時短勤務の方に多い点数帯です。認可園への入園は難しい状況です。", tip: "認可外保育施設や小規模保育も並行して検討しましょう。", notes };
  return { label: "認可園は極めて難しい", color: "text-red-600", description: "この点数では認可園への入園は極めて難しい状況です。", tip: "認可外保育施設やファミリーサポートなど別の預け先を検討しましょう。", notes };
}

function getToshimaEvaluation(total: number): ScoreEvaluation {
  // 豊島区: 父母各20点、合計最大40点+調整。フルタイム共働き40点+育休2+認可外2=44点が標準
  const notes = [
    "※ 豊島区ではフルタイム共働き40点が基本ラインです。ひとり親世帯は+8の大きな加点があります",
    "※ 同点の場合の優先順位：ひとり親 → 生活保護 → きょうだい在園 → 基本指数が高い → 所得が低い世帯",
  ];
  if (total >= 47) return { label: "かなり有利", color: "text-green-600", description: "フルタイム共働き＋複数の加点がある高得点です。多くの園で入園が期待できます。", tip: "希望する園の過去の内定指数も確認しておくと安心です。", notes };
  if (total >= 44) return { label: "有利", color: "text-emerald-600", description: "フルタイム共働き＋加点ありの状態です。多くの園でチャンスがあります。", tip: "池袋周辺など人気エリアでは同点の競争になることもあります。", notes };
  if (total >= 42) return { label: "標準的（フルタイム＋加点あり）", color: "text-blue-600", description: "フルタイム共働き＋加点ありの層です。加点の有無が勝負を分けます。", tip: "認可外利用（+2）やきょうだい加点（+3）、育休明け（+2）など使える加点を確認しましょう。", notes };
  if (total >= 40) return { label: "加点なしでは厳しめ", color: "text-yellow-600", description: "フルタイム共働きの基本ラインですが、加点がないと人気園では厳しい場合があります。", tip: "認可外保育施設に預けると+2の加点がつきます。きょうだい加点（+3）も大きいです。", notes };
  if (total >= 26) return { label: "認可園は厳しい", color: "text-orange-600", description: "パートタイムや時短勤務の方に多い点数帯です。認可園への入園は難しい状況です。", tip: "認可外保育施設や小規模保育も並行して検討しましょう。", notes };
  return { label: "認可園は極めて難しい", color: "text-red-600", description: "この点数では認可園への入園は極めて難しい状況です。", tip: "認可外保育施設やファミリーサポートなど別の預け先を検討しましょう。", notes };
}

function getKitaEvaluation(total: number): ScoreEvaluation {
  // 北区: 父母各10点、合計最大20点+調整。フルタイム共働き20点が基本
  const notes = [
    "※ 北区ではフルタイム共働き20点が基本ラインです。調整指数の項目が少ないのが特徴です",
    "※ 同点の場合の優先順位：ひとり親 → 生活保護 → 保護者の障害 → きょうだい多子世帯 → 所得が低い世帯",
  ];
  if (total >= 25) return { label: "かなり有利", color: "text-green-600", description: "フルタイム共働き＋複数の加点がある高得点です。多くの園で入園が期待できます。", tip: "希望する園の過去の最低保育指数も確認しておくと安心です。", notes };
  if (total >= 22) return { label: "有利", color: "text-emerald-600", description: "フルタイム共働き＋加点ありの状態です。多くの園でチャンスがあります。", tip: "赤羽・王子エリアなど人気園では同点の競争になることもあります。", notes };
  if (total >= 20) return { label: "標準的（フルタイム共働き相当）", color: "text-blue-600", description: "両親フルタイムの基本ラインです。北区は調整指数の項目が少ないため、同点の優先順位が重要です。", tip: "きょうだい加点（+2）や保育士加点（+3）など使える加点がないか確認しましょう。", notes };
  if (total >= 16) return { label: "やや厳しめ", color: "text-yellow-600", description: "パートタイムや時短勤務の方に多い点数帯です。園によってはチャンスがあります。", tip: "フルタイムへの切り替えが可能か検討するか、比較的空きのある園を探しましょう。", notes };
  if (total >= 8) return { label: "認可園は厳しい", color: "text-orange-600", description: "認可園への入園は難しい状況です。", tip: "認可外保育施設も並行して検討しましょう。", notes };
  return { label: "認可園は極めて難しい", color: "text-red-600", description: "この点数では認可園への入園は極めて難しい状況です。", tip: "認可外保育施設やファミリーサポートなど別の預け先を検討しましょう。", notes };
}

function getArakawaEvaluation(total: number): ScoreEvaluation {
  // 荒川区: 父母各20点、合計最大40点+調整。フルタイム共働き40点+育休2+認可外2=44点が標準
  const notes = [
    "※ 荒川区ではフルタイム共働き40点が基本ラインです。ひとり親世帯は保護者指数に+20が加算されます",
    "※ 同点の場合の優先順位：基本指数が高い → ひとり親 → きょうだい在園 → 所得が低い世帯 → 区内在住期間",
  ];
  if (total >= 47) return { label: "かなり有利", color: "text-green-600", description: "フルタイム共働き＋複数の加点がある高得点です。多くの園で入園が期待できます。", tip: "希望する園の過去のボーダーも確認しておくと安心です。", notes };
  if (total >= 44) return { label: "有利", color: "text-emerald-600", description: "フルタイム共働き＋育休明け＋認可外利用の標準的な高得点です。多くの園でチャンスがあります。", tip: "日暮里・町屋エリアなど人気園では同点の競争になることもあります。", notes };
  if (total >= 42) return { label: "標準的（フルタイム＋加点あり）", color: "text-blue-600", description: "フルタイム共働き＋加点ありの層です。加点の有無が勝負を分けます。", tip: "認可外利用（+2）や育休明け（+2）、きょうだい加点（+2）など使える加点を確認しましょう。", notes };
  if (total >= 40) return { label: "加点なしでは厳しめ", color: "text-yellow-600", description: "フルタイム共働きの基本ラインですが、加点がないと人気園では厳しい場合があります。", tip: "認可外保育施設に預けると+2の加点がつきます。きょうだい加点（+2）も確認しましょう。", notes };
  if (total >= 26) return { label: "認可園は厳しい", color: "text-orange-600", description: "パートタイムや時短勤務の方に多い点数帯です。認可園への入園は難しい状況です。", tip: "認可外保育施設や小規模保育も並行して検討しましょう。", notes };
  return { label: "認可園は極めて難しい", color: "text-red-600", description: "この点数では認可園への入園は極めて難しい状況です。", tip: "認可外保育施設やファミリーサポートなど別の預け先を検討しましょう。", notes };
}

function getShinagawaEvaluation(total: number): ScoreEvaluation {
  // 品川区: 父母各20点、合計最大40点+調整。フルタイム共働き40点が基本
  const notes = [
    "※ 品川区ではフルタイム共働き40点が基本ラインです。きょうだい在園（+3）が大きな加点です",
    "※ 同点の場合の優先順位：ひとり親 → 生活保護 → きょうだい在園 → 基本指数が高い → 所得が低い世帯",
    "※ 品川区独自の「150円ベビーシッター制度」もあわせて活用しましょう",
  ];
  if (total >= 47) return { label: "かなり有利", color: "text-green-600", description: "フルタイム共働き＋複数の加点がある高得点です。多くの園で入園が期待できます。", tip: "希望する園の過去の最下指数も確認しておくと安心です。", notes };
  if (total >= 44) return { label: "有利", color: "text-emerald-600", description: "フルタイム共働き＋きょうだい在園＋認可外利用の状態です。多くの園でチャンスがあります。", tip: "大井町・武蔵小山エリアなど人気園では同点の競争になることもあります。", notes };
  if (total >= 42) return { label: "標準的（フルタイム＋加点あり）", color: "text-blue-600", description: "フルタイム共働き＋加点ありの層です。加点の有無が勝負を分けます。", tip: "きょうだい在園（+3）、認可外利用（+2）など使える加点を確認しましょう。", notes };
  if (total >= 40) return { label: "加点なしでは厳しめ", color: "text-yellow-600", description: "フルタイム共働きの基本ラインですが、加点がないと人気園では厳しい場合があります。", tip: "認可外保育施設やベビーシッターに預けると+2の加点がつきます。", notes };
  if (total >= 26) return { label: "認可園は厳しい", color: "text-orange-600", description: "パートタイムや時短勤務の方に多い点数帯です。認可園への入園は難しい状況です。", tip: "認可外保育施設や品川区の150円ベビーシッター制度も検討しましょう。", notes };
  return { label: "認可園は極めて難しい", color: "text-red-600", description: "この点数では認可園への入園は極めて難しい状況です。", tip: "認可外保育施設やファミリーサポートなど別の預け先を検討しましょう。", notes };
}

function getFunabashiEvaluation(total: number): ScoreEvaluation {
  // 船橋市: 合算方式、父母各10点。フルタイム共働き=20点+調整点が基本
  const notes = [
    "※ 船橋市ではフルタイム共働き（月160時間以上）20点が基本ラインです",
    "※ 同点の場合の優先順位：基本点が高い → ひとり親 → きょうだい在園 → 所得が低い世帯",
  ];
  if (total >= 24) return { label: "かなり有利", color: "text-green-600", description: "フルタイム共働き＋複数の加点がある高得点です。多くの園で入園が期待できます。", tip: "希望する園の過去のボーダーも確認しておくと安心です。", notes };
  if (total >= 22) return { label: "有利", color: "text-emerald-600", description: "フルタイム共働き＋加点ありの状態です。多くの園でチャンスがあります。", tip: "人気エリア（船橋駅・津田沼駅周辺）では同点の競争になることもあります。", notes };
  if (total >= 20) return { label: "標準的（フルタイム共働き）", color: "text-blue-600", description: "フルタイム共働きの基本ラインです。人気園では加点がないと厳しい場合があります。", tip: "きょうだい加点（+1）、認可外利用（+1）、育休復帰（+1）など使える加点を確認しましょう。", notes };
  if (total >= 16) return { label: "やや厳しめ", color: "text-yellow-600", description: "パートタイムや時短勤務の方に多い点数帯です。園によってはチャンスがあります。", tip: "不人気園や小規模保育も視野に入れましょう。", notes };
  if (total >= 10) return { label: "認可園は厳しい", color: "text-orange-600", description: "認可園への入園は難しい状況です。", tip: "認可外保育施設も並行して検討しましょう。", notes };
  return { label: "認可園は極めて難しい", color: "text-red-600", description: "この点数では認可園への入園は極めて難しい状況です。", tip: "認可外保育施設やファミリーサポートなど別の預け先を検討しましょう。", notes };
}

function getHachiojiEvaluation(total: number): ScoreEvaluation {
  // 八王子市: 合算方式、父母各10点。フルタイム共働き=20点+調整
  const notes = [
    "※ 八王子市ではフルタイム共働き（週40時間以上）20点が基本ラインです",
    "※ 同点の場合の優先順位：保育の必要性が高い → きょうだい在園 → 所得が低い世帯",
  ];
  if (total >= 24) return { label: "かなり有利", color: "text-green-600", description: "フルタイム共働き＋複数の加点がある高得点です。多くの園で入園が期待できます。", tip: "希望する園の過去のボーダーも確認しておくと安心です。", notes };
  if (total >= 22) return { label: "有利", color: "text-emerald-600", description: "フルタイム共働き＋小規模保育卒園やひとり親加点がある状態です。多くの園でチャンスがあります。", tip: "南大沢・八王子駅周辺の人気園では同点の競争になることもあります。", notes };
  if (total >= 20) return { label: "標準的（フルタイム共働き）", color: "text-blue-600", description: "フルタイム共働きの基本ラインです。加点があるかどうかが勝負を分けます。", tip: "きょうだい加点（+1）、認可外利用（+1）、小規模保育卒園（+2）など使える加点を確認しましょう。", notes };
  if (total >= 16) return { label: "やや厳しめ", color: "text-yellow-600", description: "パートタイムや時短勤務の方に多い点数帯です。園によってはチャンスがあります。", tip: "八王子市は広いので、駅から離れた園は比較的入りやすい傾向があります。", notes };
  if (total >= 10) return { label: "認可園は厳しい", color: "text-orange-600", description: "認可園への入園は難しい状況です。", tip: "認可外保育施設も並行して検討しましょう。", notes };
  return { label: "認可園は極めて難しい", color: "text-red-600", description: "この点数では認可園への入園は極めて難しい状況です。", tip: "認可外保育施設やファミリーサポートなど別の預け先を検討しましょう。", notes };
}

function getKawaguchiEvaluation(total: number): ScoreEvaluation {
  // 川口市: 合算方式、父母各20点。フルタイム共働き=40点+調整
  const notes = [
    "※ 川口市ではフルタイム共働き（月160時間以上）40点が基本ラインです",
    "※ 同点の場合の優先順位：ひとり親 → きょうだい在園 → 子どもの数 → 所得が低い世帯",
  ];
  if (total >= 44) return { label: "かなり有利", color: "text-green-600", description: "フルタイム共働き＋複数の加点がある高得点です。多くの園で入園が期待できます。", tip: "希望する園の過去のボーダーも確認しておくと安心です。", notes };
  if (total >= 42) return { label: "有利", color: "text-emerald-600", description: "フルタイム共働き＋加点ありの状態です。多くの園でチャンスがあります。", tip: "川口駅・西川口駅周辺の人気園では同点の競争になることもあります。", notes };
  if (total >= 40) return { label: "標準的（フルタイム共働き）", color: "text-blue-600", description: "フルタイム共働きの基本ラインです。人気園では加点がないと厳しい場合があります。", tip: "きょうだい在園（+1）、育休復帰（+1）、同居の子ども（+1）など使える加点を確認しましょう。", notes };
  if (total >= 32) return { label: "やや厳しめ", color: "text-yellow-600", description: "パートタイムや時短勤務の方に多い点数帯です。園によってはチャンスがあります。", tip: "不人気園や小規模保育も視野に入れましょう。", notes };
  if (total >= 16) return { label: "認可園は厳しい", color: "text-orange-600", description: "認可園への入園は難しい状況です。", tip: "認可外保育施設も並行して検討しましょう。", notes };
  return { label: "認可園は極めて難しい", color: "text-red-600", description: "この点数では認可園への入園は極めて難しい状況です。", tip: "認可外保育施設やファミリーサポートなど別の預け先を検討しましょう。", notes };
}

function getHimejiEvaluation(total: number): ScoreEvaluation {
  // 姫路市: 合算方式、父母各10点。フルタイム共働き=20点+調整
  const notes = [
    "※ 姫路市ではフルタイム共働き（月160時間以上）20点が基本ラインです",
    "※ 同点の場合の優先順位：保育の必要性が高い → きょうだい在園 → ひとり親 → 所得が低い世帯",
  ];
  if (total >= 26) return { label: "かなり有利", color: "text-green-600", description: "フルタイム共働き＋複数の加点がある高得点です。多くの園で入園が期待できます。", tip: "希望する園の過去のボーダーも確認しておくと安心です。", notes };
  if (total >= 23) return { label: "有利", color: "text-emerald-600", description: "フルタイム共働き＋加点ありの状態です。多くの園でチャンスがあります。", tip: "姫路駅周辺の人気園では同点の競争になることもあります。", notes };
  if (total >= 20) return { label: "標準的（フルタイム共働き）", color: "text-blue-600", description: "フルタイム共働きの基本ラインです。人気園では加点がないと厳しい場合があります。", tip: "小規模保育卒園（+3）、ひとり親（+3）、認可外利用（+2）、きょうだい在園（+2）など使える加点を確認しましょう。", notes };
  if (total >= 14) return { label: "やや厳しめ", color: "text-yellow-600", description: "パートタイムや時短勤務の方に多い点数帯です。園によってはチャンスがあります。", tip: "不人気園や小規模保育も視野に入れましょう。", notes };
  if (total >= 8) return { label: "認可園は厳しい", color: "text-orange-600", description: "認可園への入園は難しい状況です。", tip: "認可外保育施設も並行して検討しましょう。", notes };
  return { label: "認可園は極めて難しい", color: "text-red-600", description: "この点数では認可園への入園は極めて難しい状況です。", tip: "認可外保育施設やファミリーサポートなど別の預け先を検討しましょう。", notes };
}

function getMatsuyamaEvaluation(total: number): ScoreEvaluation {
  // 松山市: 合算方式、父母各10点。フルタイム共働き=20点+調整
  const notes = [
    "※ 松山市ではフルタイム共働き（月160時間以上）20点が基本ラインです",
    "※ 同点の場合の優先順位：保育の必要性が高い → きょうだい在園 → ひとり親 → 所得が低い世帯",
  ];
  if (total >= 26) return { label: "かなり有利", color: "text-green-600", description: "フルタイム共働き＋複数の加点がある高得点です。多くの園で入園が期待できます。", tip: "希望する園の過去のボーダーも確認しておくと安心です。", notes };
  if (total >= 23) return { label: "有利", color: "text-emerald-600", description: "フルタイム共働き＋加点ありの状態です。多くの園でチャンスがあります。", tip: "松山市駅周辺の人気園では同点の競争になることもあります。", notes };
  if (total >= 20) return { label: "標準的（フルタイム共働き）", color: "text-blue-600", description: "フルタイム共働きの基本ラインです。人気園では加点がないと厳しい場合があります。", tip: "小規模保育卒園（+3）、ひとり親（+3）、認可外利用（+2）、きょうだい在園（+2）など使える加点を確認しましょう。", notes };
  if (total >= 14) return { label: "やや厳しめ", color: "text-yellow-600", description: "パートタイムや時短勤務の方に多い点数帯です。園によってはチャンスがあります。", tip: "不人気園や小規模保育も視野に入れましょう。", notes };
  if (total >= 8) return { label: "認可園は厳しい", color: "text-orange-600", description: "認可園への入園は難しい状況です。", tip: "認可外保育施設も並行して検討しましょう。", notes };
  return { label: "認可園は極めて難しい", color: "text-red-600", description: "この点数では認可園への入園は極めて難しい状況です。", tip: "認可外保育施設やファミリーサポートなど別の預け先を検討しましょう。", notes };
}

function getGenericEvaluation(total: number): ScoreEvaluation {
  return { label: "結果", color: "text-primary", description: `合計${total}点です。くわしくはお住まいの自治体にご確認ください。`, tip: "自治体の窓口で、この点数で入園できそうか相談してみましょう。" };
}

function ShareButtons({
  municipalityName,
  total,
  slug,
}: {
  municipalityName: string;
  total: number;
  slug: string;
}) {
  const text = `${municipalityName}の保育園入園点数をシミュレーションしたら${total}点でした！`;
  const url = `https://${slug}.hoikaten.com`;
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);

  return (
    <div className="space-y-3">
      {/* シェア直上のテキスト広告 */}
      <RandomTextAd />
      <p className="text-sm font-medium text-center text-muted-foreground">
        結果をシェアする
      </p>
      <div className="flex justify-center gap-3">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          X (Twitter)
        </a>
        <a
          href={`https://social-plugins.line.me/lineit/share?url=${encodedUrl}&text=${encodedText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#06C755] text-white text-sm font-medium hover:bg-[#05b04c] transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
          </svg>
          LINE
        </a>
        <button
          onClick={() => {
            navigator.clipboard.writeText(`${text}\n${url}`);
            alert("コピーしました！");
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors border border-gray-200"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          コピー
        </button>
      </div>
    </div>
  );
}

export function SimulatorForm({ data }: { data: MunicipalityData }) {
  const [step, setStep] = useState<Step>("parent1");
  const [showAdPopup, setShowAdPopup] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [pendingAdvance, setPendingAdvance] = useState(false);

  const stepIndex = STEPS.findIndex((s) => s.key === step);
  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  const setAnswer = useCallback((questionId: string, value: string) => {
    setAnswers((prev) => {
      const next = { ...prev, [questionId]: value };
      if (questionId === "parent1_reason" || questionId === "parent2_reason") {
        // 理由を変えたら、その保護者の詳細質問の回答をすべてクリアする
        const prefix = questionId.replace("_reason", "");
        for (const key of Object.keys(next)) {
          if (key.startsWith(`${prefix}_`) && key !== questionId) {
            delete next[key];
          }
        }
      }
      return next;
    });
    setPendingAdvance(true);
  }, []);

  const isMinScoring = data.municipality.scoringMethod === "min";
  const isAvgScoring = data.municipality.scoringMethod === "avg";

  // ひとり親判定（保護者2ステップの冒頭で聞く）
  const isSingleParent =
    answers["adj_single_parent"] === "adj_single_parent_yes" ||
    answers["adj_single_parent"] === "adj_single_parent_relative";

  // Filter questions for current step
  const visibleQuestions = useMemo(() => {
    const allQ = data.questions;

    if (step === "parent1") {
      const parent1Qs = allQ.filter((q) => q.category === "parent1_base");
      // reason質問を持たない自治体は base 質問をすべて順番に表示する
      if (!parent1Qs.some((q) => q.id === "parent1_reason")) return parent1Qs;
      const reason = getReasonFromAnswers(answers, "parent1");
      if (!reason) return parent1Qs.filter((q) => q.id === "parent1_reason");
      return parent1Qs.filter(
        (q) =>
          q.id === "parent1_reason" ||
          q.id === `parent1_${reason}` ||
          q.showFor?.includes(reason)
      );
    }

    if (step === "parent2") {
      // まずひとり親かどうかを聞く
      const singleParentQ = allQ.find((q) => q.id === "adj_single_parent");
      if (singleParentQ && answers["adj_single_parent"] !== "adj_single_parent_no") {
        // ひとり親未回答 or 「はい」の場合、ひとり親質問だけ表示
        if (!answers["adj_single_parent"] || isSingleParent) {
          return singleParentQ ? [singleParentQ] : [];
        }
      }
      // ひとり親「いいえ」の場合は通常の保護者2質問
      const parent2Qs = allQ.filter((q) => q.category === "parent2_base");
      // reason質問を持たない自治体は base 質問をすべて順番に表示する
      if (!parent2Qs.some((q) => q.id === "parent2_reason")) return parent2Qs;
      const reason = getReasonFromAnswers(answers, "parent2");
      if (!reason) return parent2Qs.filter((q) => q.id === "parent2_reason");
      return parent2Qs.filter(
        (q) =>
          q.id === "parent2_reason" ||
          q.id === `parent2_${reason}` ||
          q.showFor?.includes(reason)
      );
    }

    if (step === "adjustment") {
      // ひとり親質問は保護者2ステップで回答済みなので除外
      return allQ.filter(
        (q) => q.category === "adjustment" && q.id !== "adj_single_parent"
      );
    }

    return [];
  }, [data.questions, step, answers]);

  // Compute result
  const result = useMemo(() => {
    if (step !== "result") return null;
    return calculateScore(data.questions, answers, data.municipality.scoringMethod);
  }, [step, data.questions, answers, data.municipality.scoringMethod]);

  const safeQuestionIndex = Math.min(questionIndex, Math.max(0, visibleQuestions.length - 1));
  const currentQuestion = visibleQuestions[safeQuestionIndex];

  // 選択後の自動進行
  useEffect(() => {
    if (!pendingAdvance) return;

    const timer = setTimeout(() => {
      setPendingAdvance(false);

      if (safeQuestionIndex < visibleQuestions.length - 1) {
        setQuestionIndex(safeQuestionIndex + 1);
      } else {
        // ステップ内の最後の質問 → 次のステップへ
        if (step === "parent2" && isSingleParent) {
          setStep("adjustment");
          setQuestionIndex(0);
          return;
        }
        const idx = STEPS.findIndex((s) => s.key === step);
        if (idx < STEPS.length - 1) {
          const nextStep = STEPS[idx + 1].key;
          if (nextStep === "result") setShowAdPopup(true);
          setStep(nextStep);
          setQuestionIndex(0);
        }
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [pendingAdvance, safeQuestionIndex, visibleQuestions.length, step, isSingleParent]);

  const goPrev = () => {
    if (safeQuestionIndex > 0) {
      setQuestionIndex(safeQuestionIndex - 1);
      return;
    }
    // ステップの最初の質問 → 前のステップの最後の質問へ
    if (step === "adjustment" && isSingleParent) {
      setStep("parent2");
      setQuestionIndex(0);
      return;
    }
    const idx = STEPS.findIndex((s) => s.key === step);
    if (idx > 0) {
      setStep(STEPS[idx - 1].key);
      setQuestionIndex(999); // clampされる
    }
  };

  const reset = () => {
    setAnswers({});
    setStep("parent1");
    setQuestionIndex(0);
  };

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm text-muted-foreground">
          {STEPS.map((s, i) => (
            <span
              key={s.key}
              className={
                i <= stepIndex
                  ? "text-primary font-medium"
                  : "text-muted-foreground/60"
              }
            >
              <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs mr-1 ${
                i < stepIndex
                  ? "bg-primary text-primary-foreground"
                  : i === stepIndex
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "bg-muted text-muted-foreground/50"
              }`}>
                {i < stepIndex ? "\u2713" : i + 1}
              </span>
              {s.label}
            </span>
          ))}
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Questions */}
      {step !== "result" && currentQuestion && (
        <Card>
          <CardContent className="flex flex-col pt-6">
            <div>
              <p className="text-xs text-muted-foreground mb-4">
                {step === "adjustment"
                  ? "ご家庭の状況を教えてください"
                  : `${STEPS[stepIndex].label}について`}
              </p>
              <QuestionField
                key={currentQuestion.id}
                question={currentQuestion}
                value={answers[currentQuestion.id]}
                onChange={(val) => setAnswer(currentQuestion.id, val)}
              />
            </div>
            <div className="pt-6">
              {(step !== "parent1" || safeQuestionIndex > 0) && (
                <Button variant="outline" onClick={goPrev}>
                  戻る
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <FullScreenAd isOpen={showAdPopup} onClose={() => setShowAdPopup(false)} />

      {/* Result */}
      {step === "result" && result && (
        <div className="space-y-4">
          <Card className="border-primary/40 bg-gradient-to-b from-primary/5 to-transparent">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-lg" style={{ fontFamily: "var(--font-heading)" }}>あなたのご家庭の点数は...</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-5xl font-bold text-primary">
                {result.total}
                <span className="text-lg font-normal text-muted-foreground ml-1">
                  点
                </span>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                （{data.municipality.name}の基準での目安）
              </p>
            </CardContent>
          </Card>

          {(() => {
            const evaluation = getScoreEvaluation(data.municipality.slug, result.total);
            return (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className={`text-base ${evaluation.color}`}>
                    {evaluation.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm">{evaluation.description}</p>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-sm">
                      <span className="font-medium">ワンポイント：</span>
                      {evaluation.tip}
                    </p>
                  </div>
                  {evaluation.notes && (
                    <div className="text-xs text-muted-foreground space-y-1 pt-1">
                      {evaluation.notes.map((note, i) => (
                        <p key={i}>{note}</p>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })()}

          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                {isMinScoring ? "ランクのうちわけ" : "点数のうちわけ"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isMinScoring ? (
                <>
                  <div className="flex justify-between items-center">
                    <span>保護者1のランク</span>
                    <Badge variant="secondary">ランク値 {result.parent1Base}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>保護者2のランク</span>
                    <Badge variant="secondary">ランク値 {result.parent2Base}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>世帯ランク（低い方を採用）</span>
                    <Badge variant="default">
                      ランク値 {Math.min(result.parent1Base, result.parent2Base)}
                    </Badge>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <span>保護者1の点数</span>
                    <Badge variant="secondary">{result.parent1Base}点</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>保護者2の点数</span>
                    <Badge variant="secondary">{result.parent2Base}点</Badge>
                  </div>
                  {isAvgScoring && (
                    <div className="flex justify-between items-center">
                      <span>世帯点数（父母の平均）</span>
                      <Badge variant="default">
                        {result.total - result.adjustment}点
                      </Badge>
                    </div>
                  )}
                </>
              )}
              <div className="flex justify-between items-center">
                <span>家庭の状況による加減点</span>
                <Badge
                  variant={result.adjustment >= 0 ? "secondary" : "destructive"}
                >
                  {result.adjustment > 0 ? "+" : ""}
                  {result.adjustment}点
                </Badge>
              </div>
              <Separator />
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  くわしい内訳
                </p>
                {result.breakdown
                  .filter((b) => b.points !== 0)
                  .map((b) => (
                    <div
                      key={b.questionId}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-muted-foreground">{b.label}</span>
                      <span>
                        {b.points > 0 ? "+" : ""}
                        {b.points}点
                      </span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
            <p className="font-medium mb-1">ここだけ注意！</p>
            <p>
              この点数はあくまで目安です。実際の選考では、ほかにも考慮されるポイントがあります。
              くわしくは{data.municipality.name}の窓口で確認してくださいね。
            </p>
          </div>

          {/* SNS共有 */}
          <ShareButtons
            municipalityName={data.municipality.name}
            total={result.total}
            slug={data.municipality.slug}
          />
        </div>
      )}

      {/* Navigation (result only) */}
      {step === "result" && (
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={reset}>
              最初からやり直す
            </Button>
            <Button variant="outline" onClick={goPrev}>
              戻る
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
