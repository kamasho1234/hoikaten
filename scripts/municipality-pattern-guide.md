# Municipality Data File Pattern Guide

## File Location
`src/lib/data/[slug].ts`

## Sum-type Pattern (加算方式)
Most municipalities use this. Father + Mother base points are summed.

```typescript
import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// [市名] 保育園入園 利用調整基準データ
// 出典: [市名]「令和7年度 利用調整基準表」
// [公式URL]
// ---------------------------------------------------------------------------
// [市名]は「基準点数（父母それぞれ最大X点）＋ 調整点数」の加算方式。
// ---------------------------------------------------------------------------

const municipality = {
  id: '[slug]',
  name: '[市名]',
  slug: '[slug]',
  prefecture: '[県名]',
  maxBasePoints: [父の最大 + 母の最大],
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  // Point values from official criteria (e.g. monthly hours thresholds)
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  // ...
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  // ...
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  // ...
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  // ...
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  // ...
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '[scoring explanation]',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労時間（月あたり）は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障害の程度は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+X）', value: 'adj_single_parent_yes', points: X },
    ],
  },
  // More adjustment questions from official criteria...
];

export const [slug]Data: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
```

## Min-type Pattern (ランク方式)
Add `scoringMethod: 'min' as const` to municipality object.
maxBasePoints = highest rank value.
Points represent rank conversion (A=highest, etc.)

## Key Rules
- Export name: `[slug]Data` (camelCase, e.g. `shinjukuData`, `minamiAlpsData` -> `minamialpsData`)
- All option values must be unique strings using the prefix pattern
- Every options array must start with "あてはまらない" (points: 0)
- adjustment category questions use `id: 'adj_...'`
- Source URL MUST be in the comment header
- Points must match official criteria exactly
