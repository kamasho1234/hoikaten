"use client";

import { useState, useMemo } from "react";
import type { MunicipalityData, Question } from "@/lib/types";
import { calculateScore } from "@/lib/scoring/engine";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
  if (question.inputType === "select") {
    return (
      <div className="space-y-2">
        <Label>{question.label}</Label>
        {question.helpText && (
          <p className="text-xs text-muted-foreground">{question.helpText}</p>
        )}
        <Select value={value ?? ""} onValueChange={(val) => { if (val) onChange(val); }}>
          <SelectTrigger className="w-full">
            {value
              ? question.options.find((o) => o.value === value)?.label
              : "選択してください"}
          </SelectTrigger>
          <SelectContent>
            {question.options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Label>{question.label}</Label>
      {question.helpText && (
        <p className="text-xs text-muted-foreground">{question.helpText}</p>
      )}
      <RadioGroup value={value ?? ""} onValueChange={onChange}>
        {question.options.map((opt) => (
          <div key={opt.value} className="flex items-center gap-3">
            <RadioGroupItem value={opt.value} id={opt.value} />
            <Label htmlFor={opt.value} className="font-normal cursor-pointer">
              {opt.label}
              {opt.points !== 0 && (
                <span className="ml-2 text-xs text-muted-foreground">
                  ({opt.points > 0 ? "+" : ""}
                  {opt.points}点)
                </span>
              )}
            </Label>
          </div>
        ))}
      </RadioGroup>
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
    "※ 同ランクの場合の優先順位：調整指数 → 養育児童数 → 所得の低い世帯",
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
    "※ 同点の場合は保育の必要性の事由（就労 > 疾病 > 障害 > 介護...）で優先されます",
  ];
  if (total >= 210) return { label: "かなり有利", color: "text-green-600", description: "フルタイム共働き＋複数の加点がある高得点です。多くの園で入園が期待できます。", tip: "希望する園の過去のボーダーラインも確認しておくと安心です。", notes };
  if (total >= 207) return { label: "有利", color: "text-emerald-600", description: "フルタイム共働き＋加点ありの状態です。多くの園でチャンスがあります。", tip: "人気園では同点の中での競争になることがあります。複数の園を希望に入れましょう。", notes };
  if (total >= 200) return { label: "標準的（フルタイム共働き相当）", color: "text-blue-600", description: "両親フルタイムの基本ラインです。加点がないと人気園では厳しい場合があります。", tip: "育休復帰加点（+7）、認可外利用（+5）、きょうだい加点（+3）など使える加点がないか確認しましょう。", notes };
  if (total >= 160) return { label: "やや厳しめ", color: "text-yellow-600", description: "パートタイムや時短勤務の方に多い点数帯です。人気園は難しい場合がありますが、園によってはチャンスがあります。", tip: "小規模保育や新設園も視野に入れましょう。認可外保育施設を利用すると加点がつく場合もあります。", notes };
  if (total >= 120) return { label: "認可園は厳しい", color: "text-orange-600", description: "求職中や短時間勤務の方に多い点数帯です。認可園への入園は難しい状況です。", tip: "認可外保育施設や一時保育も並行して検討するのがおすすめです。", notes };
  return { label: "認可園は極めて難しい", color: "text-red-600", description: "この点数では認可園への入園は極めて難しい状況です。", tip: "まずは認可外保育施設やファミリーサポートなど別の預け先を検討しましょう。", notes };
}

function getGenericEvaluation(total: number): ScoreEvaluation {
  return { label: "結果", color: "text-primary", description: `合計${total}点です。くわしくはお住まいの自治体にご確認ください。`, tip: "自治体の窓口で、この点数で入園できそうか相談してみましょう。" };
}

export function SimulatorForm({ data }: { data: MunicipalityData }) {
  const [step, setStep] = useState<Step>("parent1");
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const stepIndex = STEPS.findIndex((s) => s.key === step);
  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  const setAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => {
      const next = { ...prev, [questionId]: value };
      // 理由を変更したら、そのparentの古い詳細回答をクリア
      if (questionId === "parent1_reason" || questionId === "parent2_reason") {
        const prefix = questionId.replace("_reason", "");
        const detailKeys = [
          "employment", "offer", "illness", "disability", "care",
          "childbirth", "education", "jobseeking",
        ];
        for (const key of detailKeys) {
          delete next[`${prefix}_${key}`];
        }
      }
      return next;
    });
  };

  // ひとり親判定（保護者2ステップの冒頭で聞く）
  const isSingleParent =
    answers["adj_single_parent"] === "adj_single_parent_yes" ||
    answers["adj_single_parent"] === "adj_single_parent_relative";

  // Filter questions for current step
  const visibleQuestions = useMemo(() => {
    const allQ = data.questions;

    if (step === "parent1") {
      const parent1Qs = allQ.filter((q) => q.category === "parent1_base");
      const reason = getReasonFromAnswers(answers, "parent1");
      if (!reason) return parent1Qs.filter((q) => q.id === "parent1_reason");
      return parent1Qs.filter(
        (q) => q.id === "parent1_reason" || q.id === `parent1_${reason}`
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
      const reason = getReasonFromAnswers(answers, "parent2");
      if (!reason) return parent2Qs.filter((q) => q.id === "parent2_reason");
      return parent2Qs.filter(
        (q) => q.id === "parent2_reason" || q.id === `parent2_${reason}`
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
    return calculateScore(data.questions, answers);
  }, [step, data.questions, answers]);

  const canProceed = useMemo(() => {
    if (step === "parent1") {
      const reason = getReasonFromAnswers(answers, "parent1");
      if (!reason) return false;
      return answers[`parent1_${reason}`] !== undefined;
    }
    if (step === "parent2") {
      // ひとり親質問が未回答
      if (!answers["adj_single_parent"]) return false;
      // ひとり親→スキップ可能
      if (isSingleParent) return true;
      // 通常の保護者2入力
      const reason = getReasonFromAnswers(answers, "parent2");
      if (!reason) return false;
      return answers[`parent2_${reason}`] !== undefined;
    }
    if (step === "adjustment") return true;
    return false;
  }, [step, answers]);

  const goNext = () => {
    if (step === "parent2" && isSingleParent) {
      // ひとり親の場合、保護者2の詳細をスキップして調整指数へ
      setStep("adjustment");
      return;
    }
    const idx = STEPS.findIndex((s) => s.key === step);
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1].key);
  };

  const goPrev = () => {
    if (step === "adjustment" && isSingleParent) {
      setStep("parent2"); // ひとり親質問がある保護者2ステップへ戻る
      return;
    }
    const idx = STEPS.findIndex((s) => s.key === step);
    if (idx > 0) setStep(STEPS[idx - 1].key);
  };

  const reset = () => {
    setAnswers({});
    setStep("parent1");
  };

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          {STEPS.map((s, i) => (
            <span
              key={s.key}
              className={i <= stepIndex ? "text-primary font-medium" : ""}
            >
              {s.label}
            </span>
          ))}
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Questions */}
      {step !== "result" && (
        <Card>
          <CardHeader>
            <CardTitle>
              {step === "adjustment"
                ? "ご家庭の状況を教えてください"
                : `${STEPS[stepIndex].label}について`}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {visibleQuestions.map((q) => (
              <QuestionField
                key={q.id}
                question={q}
                value={answers[q.id]}
                onChange={(val) => setAnswer(q.id, val)}
              />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Result */}
      {step === "result" && result && (
        <div className="space-y-4">
          <Card className="border-primary">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-lg">あなたのご家庭の点数は...</CardTitle>
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
              <CardTitle className="text-base">点数のうちわけ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>保護者1の点数</span>
                <Badge variant="secondary">{result.parent1Base}点</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>保護者2の点数</span>
                <Badge variant="secondary">{result.parent2Base}点</Badge>
              </div>
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
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        {step !== "parent1" ? (
          <div className="flex gap-2">
            {step === "result" && (
              <Button variant="outline" onClick={reset}>
                最初からやり直す
              </Button>
            )}
            <Button variant="outline" onClick={goPrev}>
              戻る
            </Button>
          </div>
        ) : (
          <div />
        )}
        {step !== "result" && (
          <Button onClick={goNext} disabled={!canProceed}>
            {step === "adjustment" ? "結果を見る" : "次へ"}
          </Button>
        )}
      </div>
    </div>
  );
}
