import { getMunicipalityData } from '../src/lib/data/index';
import { calculateScore } from '../src/lib/scoring/engine';

type Case = { name: string; slug: string; answers: Record<string, string>; expect: number };

const cases: Case[] = [
  // --- 君津市（sum / 最高60）---
  {
    name: '君津: 父月20日8h(22) + 母月16日6h(16) = 38',
    slug: 'kimitsu',
    answers: { p1_situation: 'p1_work_20_8', p2_situation: 'p2_work_16_6' },
    expect: 38,
  },
  {
    name: '君津: 上記 + 保育士+15 + 小規模卒園+15 = 68',
    slug: 'kimitsu',
    answers: {
      p1_situation: 'p1_work_20_8', p2_situation: 'p2_work_16_6',
      adj_hoikushi: 'adj_hoikushi_yes', adj_shokibo: 'adj_shokibo_yes',
    },
    expect: 68,
  },
  {
    name: '君津: 育休延長許容-40 と滞納-4 を含む = 38-44 = -6',
    slug: 'kimitsu',
    answers: {
      p1_situation: 'p1_work_20_8', p2_situation: 'p2_work_16_6',
      adj_ikukyu_encho: 'adj_ikukyu_encho_yes', adj_tainou: 'adj_tainou_yes',
    },
    expect: -6,
  },
  {
    name: '君津: ひとり親(母未回答/不在30) 単独 = 30',
    slug: 'kimitsu',
    answers: { p1_situation: 'p1_absent' },
    expect: 30,
  },
  {
    name: '君津: 多子3名+2 と 多胎児+1 は併算 = 22+22+3 = 47',
    slug: 'kimitsu',
    answers: {
      p1_situation: 'p1_work_20_8', p2_situation: 'p2_work_20_8',
      adj_tashi: 'adj_tashi_3', adj_tataiji: 'adj_tataiji_yes',
    },
    expect: 47,
  },
  // --- 野々市市（min / 最高100）---
  {
    name: '野々市: 父100 母90 → min=90',
    slug: 'nonoichi',
    answers: { p1_situation: 'p1_work_160', p2_situation: 'p2_work_140' },
    expect: 90,
  },
  {
    name: '野々市: 父50 母100 → min=50',
    slug: 'nonoichi',
    answers: { p1_situation: 'p1_work_48', p2_situation: 'p2_work_160' },
    expect: 50,
  },
  {
    name: '野々市: ひとり親(保護者2未回答) 週30h以上就労=100',
    slug: 'nonoichi',
    answers: { p1_situation: 'p1_single_120' },
    expect: 100,
  },
  {
    name: '野々市: 父災害100 母求職20 → min=20',
    slug: 'nonoichi',
    answers: { p1_situation: 'p1_disaster', p2_situation: 'p2_seek_other' },
    expect: 20,
  },
  // --- 京田辺市（sum / 最高80）---
  {
    name: '京田辺: 父区分1-160h(40) + 母区分1-120h(36) = 76',
    slug: 'kyotanabe',
    answers: { p1_situation: 'p1_work1_160', p2_situation: 'p2_work1_120' },
    expect: 76,
  },
  {
    name: '京田辺: 上記 + 父単身赴任+2 = 78',
    slug: 'kyotanabe',
    answers: { p1_situation: 'p1_work1_160', p2_situation: 'p2_work1_120', p1_tanshin: 'p1_tanshin_yes' },
    expect: 78,
  },
  {
    name: '京田辺: 父の保育士加点(月160h以上18 + 本市8)は合算 = 76+26 = 102',
    slug: 'kyotanabe',
    answers: {
      p1_situation: 'p1_work1_160', p2_situation: 'p2_work1_120',
      p1_hoikushi: 'p1_hoikushi_160', p1_hoikushi_shinai: 'p1_hoikushi_shinai_yes',
    },
    expect: 102,
  },
  {
    name: '京田辺: ひとり親(離婚成立+42) 父のみ区分1-160h = 40+42 = 82',
    slug: 'kyotanabe',
    answers: { p1_situation: 'p1_work1_160', adj_hitorioya: 'adj_hitorioya_rikon' },
    expect: 82,
  },
  {
    name: '京田辺: 滞納-35 と 内定辞退-35 の併算 = 76-70 = 6',
    slug: 'kyotanabe',
    answers: {
      p1_situation: 'p1_work1_160', p2_situation: 'p2_work1_120',
      adj_tainou: 'adj_tainou_yes', adj_jitai: 'adj_jitai_yes',
    },
    expect: 6,
  },
  {
    name: '京田辺: 母のみの妊娠中・出産(5)が母側に存在する',
    slug: 'kyotanabe',
    answers: { p2_situation: 'p2_birth' },
    expect: 5,
  },
  // --- 木津川市（sum / 最高48）---
  {
    name: '木津川: 父外勤160h(22) + 母外勤120h(20) = 42',
    slug: 'kizugawa',
    answers: { p1_situation: 'p1_gaikin_160', p2_situation: 'p2_gaikin_120' },
    expect: 42,
  },
  {
    name: '木津川: 上記 + 父通勤1h以上+2 + 母内定-2 = 42',
    slug: 'kizugawa',
    answers: {
      p1_situation: 'p1_gaikin_160', p2_situation: 'p2_gaikin_120',
      p1_tsukin: 'p1_tsukin_yes', p2_naitei: 'p2_naitei_yes',
    },
    expect: 42,
  },
  {
    name: '木津川: 育休延長許容-80 = 42-80 = -38',
    slug: 'kizugawa',
    answers: {
      p1_situation: 'p1_gaikin_160', p2_situation: 'p2_gaikin_120',
      adj_ikukyu_encho: 'adj_ikukyu_encho_yes',
    },
    expect: -38,
  },
  {
    name: '木津川: ひとり親+18 父のみ外勤160h = 22+18 = 40',
    slug: 'kizugawa',
    answers: { p1_situation: 'p1_gaikin_160', adj_hitorioya: 'adj_hitorioya_yes' },
    expect: 40,
  },
  {
    name: '木津川: 生活保護と失業は排他selectのため片方のみ = 42+6 = 48',
    slug: 'kizugawa',
    answers: {
      p1_situation: 'p1_gaikin_160', p2_situation: 'p2_gaikin_120',
      adj_hogo_shitsugyo: 'adj_hogo_shitsugyo_hogo',
    },
    expect: 48,
  },
  // --- 守山市（sum / 最高48）---
  {
    name: '守山: 父20 + 母17 = 37（公式の計算例）',
    slug: 'moriyama',
    answers: { p1_situation: 'p1_emp_20_8', p2_situation: 'p2_emp_17_8' },
    expect: 37,
  },
  {
    name: '守山: 公式例の続き 父単身赴任+4 = 41',
    slug: 'moriyama',
    answers: { p1_situation: 'p1_emp_20_8', p2_situation: 'p2_emp_17_8', adj_tanshin: 'adj_tanshin_yes' },
    expect: 41,
  },
  {
    name: '守山: ひとり親(祖父母別居+28) 父のみ20 = 48',
    slug: 'moriyama',
    answers: { p1_situation: 'p1_emp_20_8', adj_hitorioya: 'adj_hitorioya_bekkyo' },
    expect: 48,
  },
  {
    name: '守山: 育休延長許容-20 と 祖父母同居-6 = 37-26 = 11',
    slug: 'moriyama',
    answers: {
      p1_situation: 'p1_emp_20_8', p2_situation: 'p2_emp_17_8',
      adj_sankyu_ikukyu: 'adj_sankyu_ikukyu_encho', adj_sofubo: 'adj_sofubo_dokyo',
    },
    expect: 11,
  },
  {
    name: '守山: 母のみの妊娠・出産(前後2ヶ月12)が母側に存在する',
    slug: 'moriyama',
    answers: { p2_situation: 'p2_birth_2' },
    expect: 12,
  },
  // --- 小郡市（min / 最高20）---
  {
    name: '小郡: 父20 母16 → min=16',
    slug: 'ogori',
    answers: { p1_situation: 'p1_out_160', p2_situation: 'p2_out_120' },
    expect: 16,
  },
  {
    name: '小郡: min=16 + 小規模卒園+60 = 76',
    slug: 'ogori',
    answers: {
      p1_situation: 'p1_out_160', p2_situation: 'p2_out_120',
      adj_shokibo: 'adj_shokibo_yes',
    },
    expect: 76,
  },
  {
    name: '小郡: ひとり親(保護者2未回答/14) 父20 = 34',
    slug: 'ogori',
    answers: { p1_situation: 'p1_out_160', adj_hitorioya: 'adj_hitorioya_single' },
    expect: 34,
  },
  {
    name: '小郡: 保育士120h以上+50 と 同居者求職中-2 = 16+48 = 64',
    slug: 'ogori',
    answers: {
      p1_situation: 'p1_out_160', p2_situation: 'p2_out_120',
      adj_hoikushi: 'adj_hoikushi_120ijo', adj_dokyosha: 'adj_dokyosha_yes',
    },
    expect: 64,
  },
  {
    name: '小郡: 父内職64h(8) 母居宅外160h(20) → min=8',
    slug: 'ogori',
    answers: { p1_situation: 'p1_nai_64', p2_situation: 'p2_out_160' },
    expect: 8,
  },
];

let ng = 0;
for (const c of cases) {
  const data = getMunicipalityData(c.slug);
  if (!data) { console.log(`NG (データ未登録): ${c.name}`); ng++; continue; }
  const r = calculateScore(data.questions, c.answers, data.municipality.scoringMethod);
  const ok = r.total === c.expect;
  if (!ok) ng++;
  console.log(`${ok ? 'OK ' : 'NG '} ${c.name} => total=${r.total} (p1=${r.parent1Base} p2=${r.parent2Base} adj=${r.adjustment}) 期待=${c.expect}`);
}
console.log(ng === 0 ? `\n全${cases.length}件合格` : `\n${ng}件失敗 / ${cases.length}件`);
process.exit(ng === 0 ? 0 : 1);
