import { getMunicipalityData } from '../src/lib/data/index';
import { calculateScore } from '../src/lib/scoring/engine';

type Case = {
  name: string;
  slug: string;
  answers: Record<string, string>;
  expect: number;
  // 画面表示に使う「世帯の基準点」（採点方式とbaseCapを適用した値）も検証したい場合に指定する
  expectHouseholdBase?: number;
};

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
  // --- 豊見城市（sum / 最高200）---
  {
    name: '豊見城: 父160h以上(20) + 母120h以上(16) = 36',
    slug: 'tomigusuku',
    answers: { p1_situation: 'p1_work_160', p2_situation: 'p2_work_120' },
    expect: 36,
  },
  {
    name: '豊見城: 上記 + 母が採用予定-1 = 35',
    slug: 'tomigusuku',
    answers: {
      p1_situation: 'p1_work_160', p2_situation: 'p2_work_120',
      p2_naitei: 'p2_naitei_yes',
    },
    expect: 35,
  },
  {
    name: '豊見城: ひとり親(保護者2未回答/就労20) +12 = 32',
    slug: 'tomigusuku',
    answers: { p1_situation: 'p1_work_160', adj_hitorioya: 'adj_hitorioya_yes' },
    expect: 32,
  },
  {
    name: '豊見城: ひとり親かつ65歳未満同居人あり(+12-3=+9) 就労20 = 29',
    slug: 'tomigusuku',
    answers: { p1_situation: 'p1_work_160', adj_hitorioya: 'adj_hitorioya_yes_dokyo' },
    expect: 29,
  },
  {
    name: '豊見城: 母のみ妊娠出産(20) 父160h(20) + 保育士市内+15 = 55',
    slug: 'tomigusuku',
    answers: {
      p1_situation: 'p1_work_160', p2_situation: 'p2_birth',
      adj_hoikushi: 'adj_hoikushi_shinai',
    },
    expect: 55,
  },
  {
    name: '豊見城: 父母とも社会的養護100+100 = 200（最高基本指数）',
    slug: 'tomigusuku',
    answers: { p1_situation: 'p1_abuse', p2_situation: 'p2_dv' },
    expect: 200,
  },
  {
    name: '豊見城: 育休延長許容-150 と 未納-15 を含む = 36-165 = -129',
    slug: 'tomigusuku',
    answers: {
      p1_situation: 'p1_work_160', p2_situation: 'p2_work_120',
      adj_ikukyu_encho: 'adj_ikukyu_encho_yes', adj_minou: 'adj_minou_yes',
    },
    expect: -129,
  },
  // --- 柳川市（min / 最高300）---
  {
    name: '柳川: 保護者1が120h以上(80) 保護者2が60-120h(50) → min=50',
    slug: 'yanagawa',
    answers: { p1_hitsuyo: 'p1_work_120', p2_hitsuyo: 'p2_work_60' },
    expect: 50,
  },
  {
    name: '柳川: 上記 + ひとり親+35 + 兄弟同時利用+30 = 115',
    slug: 'yanagawa',
    answers: {
      p1_hitsuyo: 'p1_work_120', p2_hitsuyo: 'p2_work_60',
      adj_hitorioya: 'adj_hitorioya_yes', adj_kyodai: 'adj_kyodai_yes',
    },
    expect: 115,
  },
  {
    name: '柳川: 保育士加点は該当保護者のみ（p1に+300しても低い方はp2の50）',
    slug: 'yanagawa',
    answers: {
      p1_hitsuyo: 'p1_work_120', p1_hoikushi: 'p1_hoikushi_yes',
      p2_hitsuyo: 'p2_work_60',
    },
    expect: 50,
  },
  {
    name: '柳川: 父母とも保育士(+300)なら min=(80+300)と(50+300)の低い方=350',
    slug: 'yanagawa',
    answers: {
      p1_hitsuyo: 'p1_work_120', p1_hoikushi: 'p1_hoikushi_yes',
      p2_hitsuyo: 'p2_work_60', p2_hoikushi: 'p2_hoikushi_yes',
    },
    expect: 350,
  },
  {
    name: '柳川: ひとり親(保護者2未回答/120h以上80) +35 = 115',
    slug: 'yanagawa',
    answers: { p1_hitsuyo: 'p1_work_120', adj_hitorioya: 'adj_hitorioya_yes' },
    expect: 115,
  },
  {
    name: '柳川: 広域入所-75 を含む 80/80 → 80-75 = 5',
    slug: 'yanagawa',
    answers: {
      p1_hitsuyo: 'p1_work_120', p2_hitsuyo: 'p2_work_120',
      adj_koiki: 'adj_koiki_yes',
    },
    expect: 5,
  },
  {
    name: '柳川: 災害復旧300 と 虐待DV300 → min=300（最高基本指数）',
    slug: 'yanagawa',
    answers: { p1_hitsuyo: 'p1_disaster', p2_hitsuyo: 'p2_dv' },
    expect: 300,
  },
  // --- 御代田町（min / 最高20）---
  {
    name: '御代田: 保護者1が外勤180h(20) 保護者2が外勤120h(18) → min=18（公式の例示と一致）',
    slug: 'miyota',
    answers: { p1_situation: 'p1_out_180', p2_situation: 'p2_out_120' },
    expect: 18,
  },
  {
    name: '御代田: 上記 + きょうだい同時通園+10 + 多胎児+8 = 36',
    slug: 'miyota',
    answers: {
      p1_situation: 'p1_out_180', p2_situation: 'p2_out_120',
      adj_kyodai: 'adj_kyodai_doji', adj_tataiji: 'adj_tataiji_yes',
    },
    expect: 36,
  },
  {
    name: '御代田: ひとり親(保護者2未回答/外勤180h=20) +10 = 30',
    slug: 'miyota',
    answers: { p1_situation: 'p1_out_180', adj_hitorioya: 'adj_hitorioya_yes' },
    expect: 30,
  },
  {
    name: '御代田: 内勤64h(14)と外勤180h(20) → min=14',
    slug: 'miyota',
    answers: { p1_situation: 'p1_in_64', p2_situation: 'p2_out_180' },
    expect: 14,
  },
  {
    name: '御代田: 滞納6月分以上-10 と 書類不備-10 = 18-20 = -2',
    slug: 'miyota',
    answers: {
      p1_situation: 'p1_out_180', p2_situation: 'p2_out_120',
      adj_nofu: 'adj_nofu_tainou_over6', adj_shorui: 'adj_shorui_yes',
    },
    expect: -2,
  },
  // --- 日置市（sum / 最高20）---
  {
    name: '日置: 父が居宅外160h(10) + 母が居宅外120h(9) = 19',
    slug: 'hioki',
    answers: { p1_situation: 'p1_out_emp_160', p2_situation: 'p2_out_emp_120' },
    expect: 19,
  },
  {
    name: '日置: 父160h(10) + 母のみ妊娠出産(10) = 20（最高基準点）',
    slug: 'hioki',
    answers: { p1_situation: 'p1_out_emp_160', p2_situation: 'p2_birth' },
    expect: 20,
  },
  {
    name: '日置: ひとり親(保護者2未回答/居宅外160h=10) + 世帯形態ひとり親+12 = 22',
    slug: 'hioki',
    answers: { p1_situation: 'p1_out_emp_160', adj_setai: 'adj_setai_hitorioya' },
    expect: 22,
  },
  {
    name: '日置: 19 + きょうだい同施設+10 + 小学生兄弟2人以上+2 = 31',
    slug: 'hioki',
    answers: {
      p1_situation: 'p1_out_emp_160', p2_situation: 'p2_out_emp_120',
      adj_kyodai_zaien: 'adj_kyodai_zaien_same', adj_kyodai_shogakusei: 'adj_kyodai_shogakusei_2',
    },
    expect: 31,
  },
  {
    name: '日置: 市外在住で事由なし-20 を含む = 19-20 = -1',
    slug: 'hioki',
    answers: {
      p1_situation: 'p1_out_emp_160', p2_situation: 'p2_out_emp_120',
      adj_shigai: 'adj_shigai_riyu_nashi',
    },
    expect: -1,
  },
  {
    name: '日置: 父が内職48h(5) + 母が居宅内自営160h(9) = 14',
    slug: 'hioki',
    answers: { p1_situation: 'p1_in_hojo_48', p2_situation: 'p2_in_emp_160' },
    expect: 14,
  },
  // --- 向日市（sum / 最高80）---
  {
    name: '向日: 父母とも居宅外週40h以上(40+40) = 80（原典※7の「基本指数の合計が80点」と一致）',
    slug: 'muko',
    answers: { p1_situation: 'p1_out_40', p2_situation: 'p2_out_40' },
    expect: 80,
  },
  {
    name: '向日: 父が居宅内週40h(36)+個人事業主+4 と 母が居宅外週40h(40) = 80（※7の但し書きと一致）',
    slug: 'muko',
    answers: {
      p1_situation: 'p1_in_40', p1_kojin_jigyonushi: 'p1_kojin_yes',
      p2_situation: 'p2_out_40',
    },
    expect: 80,
  },
  {
    name: '向日: 父40 + 母のみ妊娠出産(30) = 70',
    slug: 'muko',
    answers: { p1_situation: 'p1_out_40', p2_situation: 'p2_birth' },
    expect: 70,
  },
  {
    name: '向日: ひとり親(保護者2未回答/居宅外週40h=40) +50 = 90',
    slug: 'muko',
    answers: { p1_situation: 'p1_out_40', adj_hitorioya: 'adj_hitorioya_yes' },
    expect: 90,
  },
  {
    name: '向日: 70 + 保育士市内+10 + きょうだい在園+6 = 86',
    slug: 'muko',
    answers: {
      p1_situation: 'p1_out_40', p2_situation: 'p2_out_30',
      adj_hoikushi: 'adj_hoikushi_shinai', adj_kyodai: 'adj_kyodai_zaien',
    },
    expect: 86,
  },
  {
    name: '向日: 保護者ごとの加減算（父が内定-5、母が週30h以上+2）= 40-5+30+2 = 67',
    slug: 'muko',
    answers: {
      p1_situation: 'p1_out_40', p1_shurou_jokyo: 'p1_shurou_naitei',
      p2_situation: 'p2_out_30', p2_shurou_jikan: 'p2_shurou_jikan_30ijo',
    },
    expect: 67,
  },
  {
    name: '向日: 滞納-50 を含む 70-50 = 20',
    slug: 'muko',
    answers: {
      p1_situation: 'p1_out_40', p2_situation: 'p2_out_30',
      adj_tainou: 'adj_tainou_yes',
    },
    expect: 20,
  },
  // --- 小野市（sum / 最高20）---
  {
    name: '小野: 父母とも家庭外労働(中心者)1日8h以上(10+10) = 20（最高基準指数）',
    slug: 'ono',
    answers: { p1_situation: 'p1_out_c_8', p2_situation: 'p2_out_c_8' },
    expect: 20,
  },
  {
    name: '小野: 父が家庭外中心者8h(10) + 母が家庭内協力者5h未満(2) = 12',
    slug: 'ono',
    answers: { p1_situation: 'p1_out_c_8', p2_situation: 'p2_in_k_u5' },
    expect: 12,
  },
  {
    name: '小野: 就労日数の減点は保護者ごと（父が月16日未満-3、母が月18日未満-1）= 20-4 = 16',
    slug: 'ono',
    answers: {
      p1_situation: 'p1_out_c_8', p1_shurou_nissu: 'p1_nissu_12',
      p2_situation: 'p2_out_c_8', p2_shurou_nissu: 'p2_nissu_18',
    },
    expect: 16,
  },
  {
    name: '小野: ひとり親(保護者2未回答/家庭外中心者8h=10) +3 = 13',
    slug: 'ono',
    answers: { p1_situation: 'p1_out_c_8', adj_hitorioya: 'adj_hitorioya_yes' },
    expect: 13,
  },
  {
    name: '小野: 20 + 市内保育士+8 + きょうだい在園+5 = 33',
    slug: 'ono',
    answers: {
      p1_situation: 'p1_out_c_8', p2_situation: 'p2_out_c_8',
      adj_hoikushi: 'adj_hoikushi_shinai', adj_kyodai: 'adj_kyodai_zaien',
    },
    expect: 33,
  },
  {
    name: '小野: 同居祖父母-3 と 書類未提出-2 を含む 20-5 = 15',
    slug: 'ono',
    answers: {
      p1_situation: 'p1_out_c_8', p2_situation: 'p2_out_c_8',
      adj_sofubo: 'adj_sofubo_yes', adj_shorui: 'adj_shorui_nashi',
    },
    expect: 15,
  },
  // --- 須恵町（sum / 上限150）---
  {
    name: '須恵: 父が居宅外被雇用160h(150) + 母が居宅内64h(80) → 合算230だが上限150が適用され150',
    slug: 'sue',
    answers: { p1_situation: 'p1_out1_160', p2_situation: 'p2_in1_64' },
    expect: 150,
  },
  {
    name: '須恵: 父が採用見込み64h(70) + 母が求職中(就労先未定10) = 80（上限150未満なのでそのまま）',
    slug: 'sue',
    answers: { p1_situation: 'p1_out3_64', p2_situation: 'p2_seek_other' },
    expect: 80,
  },
  {
    name: '須恵: 保育士加算は保護者ごと（父200・母115＝合算315）だが上限150が適用され150',
    slug: 'sue',
    answers: {
      p1_situation: 'p1_out1_160', p1_hoikushi: 'p1_hoikushi_120',
      p2_situation: 'p2_in1_64', p2_hoikushi: 'p2_hoikushi_64',
    },
    expect: 150,
  },
  {
    name: '須恵: ひとり親(保護者2未回答/居宅外被雇用160h=150・上限内) + 同居者なしひとり親+75 = 225',
    slug: 'sue',
    answers: { p1_situation: 'p1_out1_160', adj_hitorioya: 'adj_hitorioya_keizoku' },
    expect: 225,
  },
  {
    name: '須恵: 上限適用後の基準指数150 + 生計中心者の失業+100 + きょうだい入園済+30 = 280',
    slug: 'sue',
    answers: {
      p1_situation: 'p1_out1_160', p2_situation: 'p2_in1_64',
      adj_shitsugyo: 'adj_shitsugyo_yes', adj_kyodai: 'adj_kyodai_nyuen',
    },
    expect: 280,
  },
  {
    name: '須恵: 上限適用後の基準指数150 から 復職予定日が2か月以上先-150 と 同居祖父母-10 = -10',
    slug: 'sue',
    answers: {
      p1_situation: 'p1_out1_160', p2_situation: 'p2_in1_64',
      adj_fukushoku_saki: 'adj_fukushoku_saki_yes', adj_sofubo: 'adj_sofubo_yes',
    },
    expect: -10,
  },
  // --- 八女市（sum / 最高200）---
  {
    name: '八女: 父母とも就労160h以上(100+100) = 200（最高基本点数）',
    slug: 'yame',
    answers: { p1_situation: 'p1_work_160', p2_situation: 'p2_work_160' },
    expect: 200,
  },
  {
    name: '八女: 父が就労120h(84) + 母が家内労働90h(70) = 154',
    slug: 'yame',
    answers: { p1_situation: 'p1_work_120', p2_situation: 'p2_kanai_90' },
    expect: 154,
  },
  {
    name: '八女: ひとり親(保護者2未回答/就労160h=100) + 基本100+調整100 = 300',
    slug: 'yame',
    answers: { p1_situation: 'p1_work_160', adj_setai: 'adj_setai_hitorioya' },
    expect: 300,
  },
  {
    name: '八女: 200 + 市内保育士+100 + きょうだい利用中+30 = 330',
    slug: 'yame',
    answers: {
      p1_situation: 'p1_work_160', p2_situation: 'p2_work_160',
      adj_hoikushi: 'adj_hoikushi_shinai', adj_kyodai: 'adj_kyodai_riyou',
    },
    expect: 330,
  },
  {
    name: '八女: 世帯の状況は区分内で1つのみ（生活保護100を選ぶとひとり親200は加算されない）',
    slug: 'yame',
    answers: {
      p1_situation: 'p1_work_160', p2_situation: 'p2_work_160',
      adj_setai: 'adj_setai_hogo',
    },
    expect: 300,
  },
  {
    name: '八女: 母のみ妊娠出産(80) + 父就労160h(100) + 単身赴任+10 = 190',
    slug: 'yame',
    answers: {
      p1_situation: 'p1_work_160', p2_situation: 'p2_birth',
      adj_tanshin: 'adj_tanshin_yes',
    },
    expect: 190,
  },
  // --- いちき串木野市（sum / 最高20）---
  {
    name: 'いちき串木野: 公式の計算例（父A1=10 + 母C1=8 + 児童手帳所持3）= 21',
    slug: 'ichikikushikino',
    answers: {
      p1_situation: 'p1_A1', p2_situation: 'p2_C1',
      adj_jido_techo: 'adj_jido_techo_yes',
    },
    expect: 21,
  },
  {
    name: 'いちき串木野: 父母とも居宅外A1(10+10) = 20（最高基準指数）',
    slug: 'ichikikushikino',
    answers: { p1_situation: 'p1_A1', p2_situation: 'p2_A1' },
    expect: 20,
  },
  {
    name: 'いちき串木野: 父が内職O2(3) + 母が居宅内自営専従者K3(4) = 7',
    slug: 'ichikikushikino',
    answers: { p1_situation: 'p1_O2', p2_situation: 'p2_K3' },
    expect: 7,
  },
  {
    name: 'いちき串木野: ひとり親(保護者2未回答/A1=10) +15 = 25',
    slug: 'ichikikushikino',
    answers: { p1_situation: 'p1_A1', adj_hitorioya: 'adj_hitorioya_yes' },
    expect: 25,
  },
  {
    name: 'いちき串木野: 産前産後ときょうだいは併用可(+5)、育休とは排他 20+5 = 25',
    slug: 'ichikikushikino',
    answers: {
      p1_situation: 'p1_A1', p2_situation: 'p2_A1',
      adj_sankyu_kyodai: 'adj_sankyu_kyodai_both',
    },
    expect: 25,
  },
  {
    name: 'いちき串木野: 市外在住かつ勤務地市外-20 と 同居祖父母-5 = 20-25 = -5',
    slug: 'ichikikushikino',
    answers: {
      p1_situation: 'p1_A1', p2_situation: 'p2_A1',
      adj_koiki: 'adj_koiki_shigai', adj_sofubo: 'adj_sofubo_yes',
    },
    expect: -5,
  },
  {
    name: 'いちき串木野: 母のみの育児休業(10)が母側に存在する',
    slug: 'ichikikushikino',
    answers: { p2_situation: 'p2_ikukyu' },
    expect: 10,
  },
  // --- 山鹿市（sum / 最高40）---
  {
    name: '山鹿: 父母とも外勤160h以上(10+10) = 20',
    slug: 'yamaga',
    answers: { p1_situation: 'p1_work_160', p2_situation: 'p2_work_160' },
    expect: 20,
  },
  {
    name: '山鹿: 父が外勤64h(6) + 母が内職(月収不明5) = 11',
    slug: 'yamaga',
    answers: { p1_situation: 'p1_work_64', p2_situation: 'p2_naishoku_fumei' },
    expect: 11,
  },
  {
    name: '山鹿: 自営の資料未提出は保護者ごとの減算（父-4）20-4 = 16',
    slug: 'yamaga',
    answers: {
      p1_situation: 'p1_work_160', p1_jiei_shorui: 'p1_jiei_shorui_nashi',
      p2_situation: 'p2_work_160',
    },
    expect: 16,
  },
  {
    name: '山鹿: ひとり親(保護者2未回答/外勤160h=10) +15 = 25',
    slug: 'yamaga',
    answers: { p1_situation: 'p1_work_160', adj_hitorioya: 'adj_hitorioya_yes' },
    expect: 25,
  },
  {
    name: '山鹿: 20 + 市内保育士+15 + 3歳未満児施設卒園+12 = 47',
    slug: 'yamaga',
    answers: {
      p1_situation: 'p1_work_160', p2_situation: 'p2_work_160',
      adj_hoikushi: 'adj_hoikushi_yes', adj_sotsuen: 'adj_sotsuen_yes',
    },
    expect: 47,
  },
  {
    name: '山鹿: 滞納-5 と 市内転園-3 = 20-8 = 12',
    slug: 'yamaga',
    answers: {
      p1_situation: 'p1_work_160', p2_situation: 'p2_work_160',
      adj_tainou: 'adj_tainou_yes', adj_tenen: 'adj_tenen_yes',
    },
    expect: 12,
  },
  {
    name: '山鹿: 母のみの妊娠出産(8)が母側に存在する',
    slug: 'yamaga',
    answers: { p2_situation: 'p2_birth' },
    expect: 8,
  },
  // --- 表示用「世帯の基準点」(householdBase) の回帰テスト ---
  // 画面はこの値をそのまま表示する。Math.min 等を画面側で再計算していた頃は
  // ひとり親（保護者2未回答）で min(保護者1, 0)=0 と誤表示されていた
  {
    name: '[表示]御代田(min): ひとり親は保護者1の値がそのまま世帯基準点になる',
    slug: 'miyota',
    answers: { p1_situation: 'p1_out_180' },
    expect: 20,
    expectHouseholdBase: 20,
  },
  {
    name: '[表示]御代田(min): 父母ありなら低い方が世帯基準点',
    slug: 'miyota',
    answers: { p1_situation: 'p1_out_180', p2_situation: 'p2_out_120' },
    expect: 18,
    expectHouseholdBase: 18,
  },
  {
    name: '[表示]須恵(baseCap150): 合算230でも世帯基準点は上限150',
    slug: 'sue',
    answers: { p1_situation: 'p1_out1_160', p2_situation: 'p2_in1_64' },
    expect: 150,
    expectHouseholdBase: 150,
  },
  {
    name: '[表示]岩倉(avg): 父10・母8 → 平均9が世帯基準点',
    slug: 'iwakura',
    answers: { p1_situation: 'p1_out_now_8h20d', p2_situation: 'p2_out_now_68h15d' },
    expect: 9,
    expectHouseholdBase: 9,
  },
  {
    name: '[表示]さぬき(保護者2ステップなし): 保護者1のみで合算される',
    slug: 'sanuki',
    answers: { parent1_reason: 'parent1_reason_ext1', parent1_ext1: 'parent1_ext1_10a' },
    expect: 10,
    expectHouseholdBase: 10,
  },
  // --- 津南町（sum / 最高20）---
  {
    name: '津南: 父母とも週5日以上7h以上(10+10) = 20（最高基準指数）',
    slug: 'tsunan',
    answers: { p1_situation: 'p1_w5_7', p2_situation: 'p2_w5_7' },
    expect: 20,
    expectHouseholdBase: 20,
  },
  {
    name: '津南: 父が週4日6h(8) + 母が週3日5h(6) = 14',
    slug: 'tsunan',
    answers: { p1_situation: 'p1_w4_6', p2_situation: 'p2_w3_5' },
    expect: 14,
  },
  {
    name: '津南: ひとり親(保護者2未回答/週5日7h=10) +5 = 15',
    slug: 'tsunan',
    answers: { p1_situation: 'p1_w5_7', adj_single_parent: 'adj_single_parent_yes' },
    expect: 15,
  },
  {
    name: '津南: 「祖父母と同居していない」は加点(+2)。20+2+5(保育士) = 27',
    slug: 'tsunan',
    answers: {
      p1_situation: 'p1_w5_7', p2_situation: 'p2_w5_7',
      adj_sofubo: 'adj_sofubo_bekkyo', adj_hoikushi: 'adj_hoikushi_yes',
    },
    expect: 27,
  },
  {
    name: '津南: 調整指数は重複加算（生保5+失業5+3子目2）20+12 = 32',
    slug: 'tsunan',
    answers: {
      p1_situation: 'p1_w5_7', p2_situation: 'p2_w5_7',
      adj_seikatsuhogo: 'adj_seikatsuhogo_yes', adj_shitsugyo: 'adj_shitsugyo_yes',
      adj_tashi: 'adj_tashi_yes',
    },
    expect: 32,
  },
  {
    name: '津南: 滞納-5 を含む 20-5 = 15',
    slug: 'tsunan',
    answers: {
      p1_situation: 'p1_w5_7', p2_situation: 'p2_w5_7',
      adj_tainou: 'adj_tainou_yes',
    },
    expect: 15,
  },
  {
    name: '津南: 母のみの妊娠・出産(10)が母側に存在する',
    slug: 'tsunan',
    answers: { p2_situation: 'p2_birth' },
    expect: 10,
  },
  // --- 直方市（sum / 最高40。調整点数は「一番高い1つ」のみ）---
  {
    name: '直方: 父母とも居宅外就労150h以上(20+20) = 40（最高基準点数）',
    slug: 'nogata',
    answers: { parent1_base: 'p1_out_150', parent2_base: 'p2_out_150' },
    expect: 40,
    expectHouseholdBase: 40,
  },
  {
    name: '直方: 父が居宅外120h(19) + 母が内職90h(16) = 35',
    slug: 'nogata',
    answers: { parent1_base: 'p1_out_120', parent2_base: 'p2_naishoku_90' },
    expect: 35,
  },
  {
    name: '直方: ひとり親(保護者2未回答/居宅外150h=20) +20(基準点数への加点) +6(調整) = 46',
    slug: 'nogata',
    answers: {
      parent1_base: 'p1_out_150',
      adj_single_parent: 'adj_single_parent_yes',
      adj_chosei: 'adj_chosei_single_parent',
    },
    expect: 46,
  },
  {
    name: '直方: 40 + 調整「生計維持者の失業」10 = 50（調整は最高1つのみ）',
    slug: 'nogata',
    answers: {
      parent1_base: 'p1_out_150',
      parent2_base: 'p2_out_150',
      adj_chosei: 'adj_chosei_shitsugyo',
    },
    expect: 50,
  },
  // --- 相馬市（sum / 最高30。調整点数は重複加算）---
  {
    name: '相馬: 父母とも保育士等7h以上(15+15) = 30（最高基準点数）',
    slug: 'soma',
    answers: { parent1_base: 'p1_hoiku_7', parent2_base: 'p2_hoiku_7' },
    expect: 30,
    expectHouseholdBase: 30,
  },
  {
    name: '相馬: 父が被用者 月20日7h(10) + 母が被用者 月16日5h(7) = 17',
    slug: 'soma',
    answers: { parent1_base: 'p1_emp20_7', parent2_base: 'p2_emp16_5' },
    expect: 17,
  },
  {
    name: '相馬: ひとり親(保護者2未回答/被用者10) + 不存在調整15 = 25',
    slug: 'soma',
    answers: { parent1_base: 'p1_emp20_7', adj_single_parent: 'adj_single_parent_hitorioya' },
    expect: 25,
  },
  {
    name: '相馬: 20 + 生活保護5 + 失業4 = 29（調整は重複加算）',
    slug: 'soma',
    answers: {
      parent1_base: 'p1_emp20_7',
      parent2_base: 'p2_emp20_7',
      adj_seikatsuhogo: 'adj_seikatsuhogo_yes',
      adj_shitsugyo: 'adj_shitsugyo_yes',
    },
    expect: 29,
  },
  {
    name: '相馬: 滞納6か月分以上12か月分未満(-4) を含む 20-4 = 16',
    slug: 'soma',
    answers: {
      parent1_base: 'p1_emp20_7',
      parent2_base: 'p2_emp20_7',
      adj_tainou: 'adj_tainou_6',
    },
    expect: 16,
  },
  // --- 新富町（sum / 最高20。調整指数は重複加算）---
  {
    name: '新富: 父母とも月平均120時間以上(10+10) = 20（最高基本指数）',
    slug: 'shintomi',
    answers: { parent1_base: 'p1_work_120', parent2_base: 'p2_work_120' },
    expect: 20,
    expectHouseholdBase: 20,
  },
  {
    name: '新富: ひとり親(保護者2未回答/120h以上=10) +20 = 30',
    slug: 'shintomi',
    answers: { parent1_base: 'p1_work_120', adj_single_parent: 'adj_single_parent_yes' },
    expect: 30,
  },
  {
    name: '新富: 母のみの妊娠・出生(10)が母側に存在する',
    slug: 'shintomi',
    answers: { parent2_base: 'p2_shussan' },
    expect: 10,
  },
  {
    name: '新富: 20 + きょうだい同一施設10 + 育休復職10 = 40（調整は重複加算）',
    slug: 'shintomi',
    answers: {
      parent1_base: 'p1_work_120',
      parent2_base: 'p2_work_120',
      adj_kyodai: 'adj_kyodai_yes',
      adj_fukushoku: 'adj_fukushoku_yes',
    },
    expect: 40,
  },
  {
    name: '新富: 同居祖父母(60歳以上を除く)が保育可能 -10。20-10 = 10',
    slug: 'shintomi',
    answers: {
      parent1_base: 'p1_work_120',
      parent2_base: 'p2_work_120',
      adj_sofubo: 'adj_sofubo_yes',
    },
    expect: 10,
  },
  // --- 周南市（min / 最高100）---
  {
    name: '周南: 父月160h以上100 母月80h以上60 → min=60（合計160ではない）',
    slug: 'shunan',
    answers: { p1_situation: 'p1_work_160', p2_situation: 'p2_work_80' },
    expect: 60,
    expectHouseholdBase: 60,
  },
  {
    name: '周南: 父母とも月160h以上 → min=100。きょうだい+100 = 200',
    slug: 'shunan',
    answers: {
      p1_situation: 'p1_work_160', p2_situation: 'p2_work_160',
      adj_kyodai: 'adj_kyodai_yes',
    },
    expect: 200,
    expectHouseholdBase: 100,
  },
  {
    name: '周南: ひとり親(保護者2未回答)は本人の点数のみ。100 + ひとり親100 = 200',
    slug: 'shunan',
    answers: { p1_situation: 'p1_work_160', adj_single_parent: 'adj_single_parent_yes' },
    expect: 200,
    expectHouseholdBase: 100,
  },
  {
    name: '周南: 求職活動中10 と 育休明け+50 = 60',
    slug: 'shunan',
    answers: {
      p1_situation: 'p1_work_160', p2_situation: 'p2_seek',
      adj_ikukyu_ake: 'adj_ikukyu_ake_yes',
    },
    expect: 60,
    expectHouseholdBase: 10,
  },
  {
    name: '周南: 介護・看護と在学は労働の点数に準ずる。父介護160h=100 母在学120h=80 → min=80',
    slug: 'shunan',
    answers: { p1_situation: 'p1_care_160', p2_situation: 'p2_school_120' },
    expect: 80,
    expectHouseholdBase: 80,
  },
  // --- 国立市（sum / 最高200）---
  {
    name: '国立: 父外勤週5日40h(90) + 母外勤週4日22h(60) = 150',
    slug: 'kunitachi',
    answers: { p1_situation: 'p1_work_5_40', p2_situation: 'p2_work_4_22' },
    expect: 150,
    expectHouseholdBase: 150,
  },
  {
    name: '国立: 自営(居宅内)は外勤より2点低い。父88 + 母90 = 178',
    slug: 'kunitachi',
    answers: { p1_situation: 'p1_self_in_5_40', p2_situation: 'p2_work_5_40' },
    expect: 178,
  },
  {
    name: '国立: ひとり親(同居人なし)90 + 80 = 170。保護者2は未回答',
    slug: 'kunitachi',
    answers: { p1_situation: 'p1_work_5_40', adj_single_parent: 'adj_single_parent_alone' },
    expect: 170,
    expectHouseholdBase: 90,
  },
  {
    name: '国立: 祖父母(65歳未満・健康で不就労)-10 と 自営書類未提出-6。180-16 = 164',
    slug: 'kunitachi',
    answers: {
      p1_situation: 'p1_work_5_40', p2_situation: 'p2_work_5_40',
      adj_sofubo: 'adj_sofubo_yes', adj_jiei_shorui: 'adj_jiei_shorui_none_submit',
    },
    expect: 164,
  },
  {
    name: '国立: 医療的ケア+30 と 卒園+40 と きょうだい3人以上+13 は併算。180+83 = 263',
    slug: 'kunitachi',
    answers: {
      p1_situation: 'p1_work_5_40', p2_situation: 'p2_work_5_40',
      adj_ko_shogai: 'adj_ko_shogai_iryo', adj_sotsuen: 'adj_sotsuen_yes',
      adj_kyodai_moushikomi: 'adj_kyodai_3',
    },
    expect: 263,
  },
  // --- 西尾市（avg / 最高15）---
  {
    name: '西尾: 父月155h(15) 母月60h(4) → 平均9.5（合計19ではない）',
    slug: 'nishio',
    answers: { p1_situation: 'p1_work_155', p2_situation: 'p2_work_60' },
    expect: 9.5,
    expectHouseholdBase: 9.5,
  },
  {
    name: '西尾: 個人調整は平均する前に父母それぞれへ加算。父15+2=17 母11+2=13 → 平均15',
    slug: 'nishio',
    answers: {
      p1_situation: 'p1_work_155', p1_adj_hoikushi: 'p1_adj_hoikushi_in',
      p2_situation: 'p2_work_120', p2_adj_hoikushi: 'p2_adj_hoikushi_in',
    },
    expect: 15,
    expectHouseholdBase: 15,
  },
  {
    name: '西尾: 世帯調整は平均のあとに加算。平均11 + ひとり親(祖父母同居なし)+3 = 14',
    slug: 'nishio',
    answers: {
      p1_situation: 'p1_work_120', p2_situation: 'p2_work_120',
      adj_single_parent: 'adj_single_parent_alone',
    },
    expect: 14,
    expectHouseholdBase: 11,
  },
  {
    name: '西尾: ひとり親(保護者2未回答)は本人の指数のみ。15 + 滞納-10 = 5',
    slug: 'nishio',
    answers: { p1_situation: 'p1_work_155', adj_tainou: 'adj_tainou_yes' },
    expect: 5,
    expectHouseholdBase: 15,
  },
  {
    name: '西尾: 就労先を確認できない-5 は父母それぞれ。父15-5=10 母15-5=10 → 平均10',
    slug: 'nishio',
    answers: {
      p1_situation: 'p1_work_155', p1_adj_mikakutei: 'p1_adj_mikakutei_yes',
      p2_situation: 'p2_work_155', p2_adj_mikakutei: 'p2_adj_mikakutei_yes',
    },
    expect: 10,
    expectHouseholdBase: 10,
  },
  // --- 狛江市（sum / 最高50）---
  {
    name: '狛江: 父週5日40h(20) + 母週4日30h(14) = 34',
    slug: 'komae',
    answers: { p1_situation: 'p1_work_5_40', p2_situation: 'p2_work_4_30' },
    expect: 34,
    expectHouseholdBase: 34,
  },
  {
    name: '狛江: 個人調整は父母それぞれに効く。父20+4=24 母20+4=24 = 48',
    slug: 'komae',
    answers: {
      p1_situation: 'p1_work_5_40', p1_adj_shippei: 'p1_adj_shippei_techo',
      p2_situation: 'p2_work_5_40', p2_adj_shippei: 'p2_adj_shippei_techo',
    },
    expect: 48,
  },
  {
    name: '狛江: 介護21は労働20より高い。父居宅外介護21 + 母20 = 41',
    slug: 'komae',
    answers: { p1_situation: 'p1_care_out_5', p2_situation: 'p2_work_5_40' },
    expect: 41,
  },
  {
    name: '狛江: ひとり親(保育を行える同居親族なし・生活保護)+20。不存在25+20 = 45',
    slug: 'komae',
    answers: { p1_situation: 'p1_absent', adj_single_parent: 'adj_single_parent_hogo' },
    expect: 45,
    expectHouseholdBase: 25,
  },
  {
    name: '狛江: 保育士かつきょうだい同園(14+21)+6 と 滞納-5。40+6-5 = 41',
    slug: 'komae',
    answers: {
      p1_situation: 'p1_work_5_40', p2_situation: 'p2_work_5_40',
      adj_takuji_kyodai: 'adj_takuji_kyodai_14_21', adj_tainou: 'adj_tainou_yes',
    },
    expect: 41,
  },
  // --- 清瀬市（保護者それぞれ最大50・調整は世帯の加点をひとつだけ）---
  {
    name: '清瀬: 保護者2人とも月20日160時間以上 50+50 = 100',
    slug: 'kiyose',
    answers: { parent1_employment: 'parent1_employment_50', parent2_employment: 'parent2_employment_50' },
    expect: 100,
    expectHouseholdBase: 100,
  },
  {
    name: '清瀬: 上記 + 兄弟姉妹が市内在園+5 と 希望園1園のみ-1 = 104',
    slug: 'kiyose',
    answers: {
      parent1_employment: 'parent1_employment_50', parent2_employment: 'parent2_employment_50',
      adj_household_bonus: 'adj_household_bonus_sibling_enrolled',
      adj_single_choice: 'adj_single_choice_yes',
    },
    expect: 104,
  },
  {
    name: '清瀬: 育休延長に同意-70 と 6か月以上の滞納-40 は併算 100-110 = -10',
    slug: 'kiyose',
    answers: {
      parent1_employment: 'parent1_employment_50', parent2_employment: 'parent2_employment_50',
      adj_parental_leave_extension: 'adj_parental_leave_extension_yes',
      adj_arrears: 'adj_arrears_6m',
    },
    expect: -10,
  },

  // --- 清須市（min / 基本指数の最高20）---
  // 原典「父母それぞれの指数の低い方を算定対象として適用する」の確認
  {
    name: '清須: 父20点・母16点なら低い方の16。調整なしで16',
    slug: 'kiyosu',
    answers: {
      parent1_employment: 'parent1_employment_0',
      parent2_employment: 'parent2_employment_5',
    },
    expect: 16,
    expectHouseholdBase: 16,
  },
  {
    name: '清須: 低い方16 + ひとり親10 + 兄弟在園4 = 30',
    slug: 'kiyosu',
    answers: {
      parent1_employment: 'parent1_employment_0',
      parent2_employment: 'parent2_employment_5',
      adj_single_parent: 'adj_single_parent_1',
      adj_sibling: 'adj_sibling_1',
    },
    expect: 30,
  },
  {
    name: '清須: 滞納-10 と 同一敷地内の祖父母-4 は併算 20-14 = 6',
    slug: 'kiyosu',
    answers: {
      parent1_employment: 'parent1_employment_0',
      parent2_employment: 'parent2_employment_0',
      adj_fee_delinquent: 'adj_fee_delinquent_1',
      adj_family_home: 'adj_family_home_1',
    },
    expect: 6,
  },

  // --- 香取市（sum / 基準点の最高15）---
  // 原典「基準点は保護者それぞれの点数を合算。」の確認
  {
    name: '香取: 父10点 + 母9点 = 19（合算）',
    slug: 'katori',
    answers: {
      parent1_employment: 'parent1_employment_0',
      parent2_employment: 'parent2_employment_1',
    },
    expect: 19,
    expectHouseholdBase: 19,
  },
  {
    name: '香取: 合算20 + 18歳未満3人+2 + 兄弟在園+4 = 26',
    slug: 'katori',
    answers: {
      parent1_employment: 'parent1_employment_0',
      parent2_employment: 'parent2_employment_0',
      adj_children_count: 'adj_children_count_2',
      adj_sibling: 'adj_sibling_1',
    },
    expect: 26,
  },
  {
    name: '香取: 育休延長を許容-20 と 祖母-5 は併算 20-25 = -5',
    slug: 'katori',
    answers: {
      parent1_employment: 'parent1_employment_0',
      parent2_employment: 'parent2_employment_0',
      adj_leave_extendable: 'adj_leave_extendable_1',
      adj_grandmother: 'adj_grandmother_1',
    },
    expect: -5,
  },

  // --- 大仙市（sum / 基準指数の最高10）---
  {
    name: '大仙: 父10点（居宅外140h）+ 母6点（居宅外48h）= 16',
    slug: 'daisen',
    answers: {
      parent1_employment: 'parent1_employment_0',
      parent2_employment: 'parent2_employment_4',
    },
    expect: 16,
    expectHouseholdBase: 16,
  },
  {
    name: '大仙: 合算20 + 育休明け+3 + 保育士+4 - 祖父母60〜64歳-2 = 25',
    slug: 'daisen',
    answers: {
      parent1_employment: 'parent1_employment_0',
      parent2_employment: 'parent2_employment_0',
      adj_leave_return: 'adj_leave_return_1',
      adj_nursery_staff: 'adj_nursery_staff_1',
      adj_grandparent: 'adj_grandparent_2',
    },
    expect: 25,
  },

  // --- つくばみらい市（sum / 基本点数の最高10）---
  {
    name: 'つくばみらい: 父10点 + 母8点 = 18',
    slug: 'tsukubamirai',
    answers: {
      parent1_employment: 'parent1_employment_0',
      parent2_employment: 'parent2_employment_3',
    },
    expect: 18,
    expectHouseholdBase: 18,
  },
  {
    name: 'つくばみらい: 合算20 + 保育士50 + ひとり親60 = 130',
    slug: 'tsukubamirai',
    answers: {
      parent1_employment: 'parent1_employment_0',
      parent2_employment: 'parent2_employment_0',
      adj_nursery_staff: 'adj_nursery_staff_1',
      adj_single_parent: 'adj_single_parent_2',
    },
    expect: 130,
  },
  {
    name: 'つくばみらい: 育休延長を許容-40 と 6ヵ月滞納-40 は併算 20-80 = -60',
    slug: 'tsukubamirai',
    answers: {
      parent1_employment: 'parent1_employment_0',
      parent2_employment: 'parent2_employment_0',
      adj_leave_extendable: 'adj_leave_extendable_1',
      adj_fee_delinquent: 'adj_fee_delinquent_2',
    },
    expect: -60,
  },

  // --- 下松市（sum / 基本項目の最高10）---
  // 原典「父母それぞれの状況に当てはまる①基本項目を合算する」の確認
  {
    name: '下松: 父10点（正規雇用）+ 母6点（臨時4〜6h）= 16',
    slug: 'kudamatsu',
    answers: {
      parent1_employment: 'parent1_employment_0',
      parent2_employment: 'parent2_employment_3',
    },
    expect: 16,
    expectHouseholdBase: 16,
  },
  {
    name: '下松: 合算20 + 里帰り再入園15 + ひとり親10 - 滞納10 = 35',
    slug: 'kudamatsu',
    answers: {
      parent1_employment: 'parent1_employment_0',
      parent2_employment: 'parent2_employment_0',
      adj_rehome: 'adj_rehome_1',
      adj_single_parent: 'adj_single_parent_1',
      adj_fee_delinquent: 'adj_fee_delinquent_1',
    },
    expect: 35,
  },

  // --- 湖西市（sum / 基本指数の最高20）---
  {
    name: '湖西: 父20点（月155h以上）+ 母15点（月120h以上）= 35',
    slug: 'kosai',
    answers: { parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_3' },
    expect: 35,
    expectHouseholdBase: 35,
  },
  {
    name: '湖西: 合算40 + 地域型卒園20 + ひとり親（非同居）10 - 辞退15 = 55',
    slug: 'kosai',
    answers: {
      parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_0',
      adj_graduate: 'adj_graduate_1', adj_household: 'adj_household_1', adj_declined: 'adj_declined_1',
    },
    expect: 55,
  },

  // --- 名護市（sum / 基本指数の最高55）---
  // 原典「父母それぞれの基本指数を合算し、世帯の基本指数を決定する。」の確認
  {
    name: '名護: 父55点 + 母45点 = 100',
    slug: 'nago',
    answers: { parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_2' },
    expect: 100,
    expectHouseholdBase: 100,
  },
  {
    name: '名護: 合算110 + ひとり親65 - 育休延長110 = 65',
    slug: 'nago',
    answers: {
      parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_0',
      adj_single_parent: 'adj_single_parent_1', adj_leave_extendable: 'adj_leave_extendable_1',
    },
    expect: 65,
  },

  // --- 大和高田市（sum / 基本項目の最高100）---
  {
    name: '大和高田: 父100点 + 母80点 = 180',
    slug: 'yamatotakada',
    answers: { parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_4' },
    expect: 180,
    expectHouseholdBase: 180,
  },
  {
    name: '大和高田: 合算200 + ひとり親120 - 祖父母2人60 = 260',
    slug: 'yamatotakada',
    answers: {
      parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_0',
      adj_single_parent: 'adj_single_parent_1', adj_grandparent: 'adj_grandparent_2',
    },
    expect: 260,
  },

  // --- 那珂市（sum / 基準点の最高20）---
  // 原典「基準点は、父、母それぞれに配点し、合算した点数を基準点とする。」の確認
  {
    name: '那珂: 父20点 + 母16点 = 36',
    slug: 'naka',
    answers: { parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_4' },
    expect: 36,
    expectHouseholdBase: 36,
  },
  {
    name: '那珂: 合算40 + 地域型連携施設100 + ひとり親20 - 滞納20 = 140',
    slug: 'naka',
    answers: {
      parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_0',
      adj_graduate: 'adj_graduate_1', adj_household: 'adj_household_2',
      adj_fee_delinquent: 'adj_fee_delinquent_1',
    },
    expect: 140,
  },
  {
    name: '那珂: 就労内定パート-4 と 祖父母-4 は併算 40-8 = 32',
    slug: 'naka',
    answers: {
      parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_0',
      adj_job_offer: 'adj_job_offer_2', adj_grandparent: 'adj_grandparent_2',
    },
    expect: 32,
  },

  // --- 赤穂市（sum / 基本点数の最高30）---
  {
    name: '赤穂: 父28点 + 母22点 = 50',
    slug: 'ako',
    answers: { parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_2' },
    expect: 50,
    expectHouseholdBase: 50,
  },
  {
    name: '赤穂: 合算56 + 母子15 + 保育士10 - 同居祖父母5 = 76',
    slug: 'ako',
    answers: {
      parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_0',
      adj_single_parent: 'adj_single_parent_1', adj_nursery_staff: 'adj_nursery_staff_1',
      adj_grandparent: 'adj_grandparent_1',
    },
    expect: 76,
  },

  // --- 津幡町（sum / 基本指数の最高20）---
  {
    name: '津幡: 父20点 + 母16点 = 36',
    slug: 'tsubata',
    answers: { parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_2' },
    expect: 36,
    expectHouseholdBase: 36,
  },
  {
    name: '津幡: 疾病は「状況」と「手帳の種類」の合計。常時病臥15 + 手帳1級15 = 30',
    slug: 'tsubata',
    answers: {
      parent1_illness_state: 'parent1_illness_state_0',
      parent1_illness_handbook: 'parent1_illness_handbook_0',
    },
    expect: 30,
    expectHouseholdBase: 30,
  },
  {
    name: '津幡: 介護は「状況」と「認定等」の合計。付添10 + 要介護3〜5の12 = 22',
    slug: 'tsubata',
    answers: {
      parent1_care_state: 'parent1_care_state_0',
      parent1_care_level: 'parent1_care_level_0',
    },
    expect: 22,
  },
  {
    name: '津幡: 合算40 + ひとり親25 + きょうだい14 - 未納20 = 59',
    slug: 'tsubata',
    answers: {
      parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_0',
      adj_single_parent: 'adj_single_parent_1', adj_sibling: 'adj_sibling_1',
      adj_fee_delinquent: 'adj_fee_delinquent_1',
    },
    expect: 59,
  },

  // --- 滝川市（sum / 基礎点数の最高100）---
  {
    name: '滝川: 父100点 + 母70点 = 170',
    slug: 'takikawa',
    answers: { parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_3' },
    expect: 170,
    expectHouseholdBase: 170,
  },
  {
    name: '滝川: 合算200 + ひとり親120 + 保育士120 - 育休延長10 = 430',
    slug: 'takikawa',
    answers: {
      parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_0',
      adj_single_parent: 'adj_single_parent_1', adj_nursery_staff: 'adj_nursery_staff_1',
      adj_leave_extendable: 'adj_leave_extendable_1',
    },
    expect: 430,
  },

  // --- 藍住町（sum / 基本点数の最高110）---
  // 備考2「ひとり親世帯については、当該ひとり親の点数と100点との合算」の確認
  {
    name: '藍住: ひとり親（保護者1のみ110点）+ 100 = 210',
    slug: 'aizumi',
    answers: { parent1_employment: 'parent1_employment_0', adj_single_parent: 'adj_single_parent_1' },
    expect: 210,
    expectHouseholdBase: 110,
  },
  {
    name: '藍住: 父110点 + 母80点 = 190',
    slug: 'aizumi',
    answers: { parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_6' },
    expect: 190,
  },

  // --- 菊川市（sum / 基準点の最高25）---
  {
    name: '菊川: 父20点 + 母17点 = 37',
    slug: 'kikugawa',
    answers: { parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_3' },
    expect: 37,
    expectHouseholdBase: 37,
  },
  {
    name: '菊川: 合算40 + 保育士15 - 65歳未満の祖父母5 - 滞納20 = 30',
    slug: 'kikugawa',
    answers: {
      parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_0',
      adj_nursery_staff: 'adj_nursery_staff_1', adj_grandparent: 'adj_grandparent_2',
      adj_fee_delinquent: 'adj_fee_delinquent_1',
    },
    expect: 30,
  },

  // --- 糸魚川市（min / 基準点の最高10）---
  // 原典「基準点は父母それぞれの状況で算出し、どちらかの低い点数を適用します。」の確認
  {
    name: '糸魚川: 父10点・母5点なら低い方の5',
    slug: 'itoigawa',
    answers: { parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_2' },
    expect: 5,
    expectHouseholdBase: 5,
  },
  {
    name: '糸魚川: 低い方5 + ひとり親6 + 保育士3 - 滞納5 = 9',
    slug: 'itoigawa',
    answers: {
      parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_2',
      adj_household: 'adj_household_1', adj_nursery_staff: 'adj_nursery_staff_1',
      adj_fee_delinquent: 'adj_fee_delinquent_1',
    },
    expect: 9,
  },

  // --- 十和田市（sum / 基本点数の最高8）---
  // 原典「父母それぞれの基本点数を合算して世帯の基本点数とする。」の確認
  {
    name: '十和田: 父8点 + 母5点 = 13',
    slug: 'towada',
    answers: { parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_3' },
    expect: 13,
    expectHouseholdBase: 13,
  },
  {
    name: '十和田: 合算16 + 兄弟在園4 + 保育士4 - 未就学児1 = 23',
    slug: 'towada',
    answers: {
      parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_0',
      adj_sibling: 'adj_sibling_1', adj_nursery_staff: 'adj_nursery_staff_1',
      adj_home_child: 'adj_home_child_1',
    },
    expect: 23,
  },

  // --- むつ市（sum / 基礎指数の最高6）---
  // 原典の集計欄「父基礎指数＋母基礎指数＋優先利用指数＝総合指数」の確認
  {
    name: 'むつ: 父5点 + 母4点 = 9',
    slug: 'mutsu',
    answers: { parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_2' },
    expect: 9,
    expectHouseholdBase: 9,
  },
  {
    name: 'むつ: 合算10 + ひとり親6 + 失業7 - 12ヶ月滞納10 = 13',
    slug: 'mutsu',
    answers: {
      parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_0',
      adj_single_parent: 'adj_single_parent_1', adj_unemployed: 'adj_unemployed_1',
      adj_fee_delinquent: 'adj_fee_delinquent_3',
    },
    expect: 13,
  },

  // --- 洲本市（sum / 基本指数の最高100）---
  // 原典「父母の基本指数を算出し、その合算を基本指数とする。」の確認
  {
    name: '洲本: 父100点 + 母70点 = 170',
    slug: 'sumoto',
    answers: { parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_6' },
    expect: 170,
    expectHouseholdBase: 170,
  },
  {
    name: '洲本: ひとり親（保護者1のみ100点）+ 基本100 + 調整20 = 220',
    slug: 'sumoto',
    answers: {
      parent1_employment: 'parent1_employment_0',
      adj_household: 'adj_household_1',
      adj_single_parent_bonus: 'adj_single_parent_bonus_1',
    },
    expect: 220,
    expectHouseholdBase: 100,
  },

  // --- 塩竈市（sum / 基準指数の最高20）---
  // 原典の備考「父・母それぞれの指数を把握し、合算する。」の確認
  {
    name: '塩竈: 父20点 + 母16点 = 36',
    slug: 'shiogama',
    answers: { parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_3' },
    expect: 36,
    expectHouseholdBase: 36,
  },
  {
    name: '塩竈: 合算40 + 小規模卒園16 + 母子10 - 滞納20 = 46',
    slug: 'shiogama',
    answers: {
      parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_0',
      adj_graduate: 'adj_graduate_1', adj_household: 'adj_household_1',
      adj_fee_delinquent: 'adj_fee_delinquent_1',
    },
    expect: 46,
  },

  // --- 笛吹市（sum / 基礎項目の最高100）---
  // 原典の計算例そのもの：
  //   （父）家庭外労働 1日8時間以上かつ月20日以上 = 100点
  //   （母）自営業（従業員）1日6時間以上かつ月15日以上 = 75点  合計175点
  {
    name: '笛吹: 原典の例 父100点 + 母75点 = 175',
    slug: 'fuefuki',
    answers: { parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_22' },
    expect: 175,
    expectHouseholdBase: 175,
  },
  {
    name: '笛吹: 合算200 + きょうだい120 + ひとり親110 - 滞納100 = 330',
    slug: 'fuefuki',
    answers: {
      parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_0',
      adj_sibling: 'adj_sibling_1', adj_single_parent: 'adj_single_parent_1',
      adj_fee_delinquent: 'adj_fee_delinquent_2',
    },
    expect: 330,
  },

  // --- 南魚沼市（sum / 基本指数の最高10）---
  {
    name: '南魚沼: 父10点 + 母8点 = 18',
    slug: 'minamiuonuma',
    answers: { parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_3' },
    expect: 18,
    expectHouseholdBase: 18,
  },
  {
    name: '南魚沼: 合算20 + 児童の障害10 + ひとり親5 + 兄弟在園2 = 37',
    slug: 'minamiuonuma',
    answers: {
      parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_0',
      adj_child_disability: 'adj_child_disability_1', adj_single_parent: 'adj_single_parent_1',
      adj_sibling: 'adj_sibling_1',
    },
    expect: 37,
  },

  // --- 荒尾市（sum / 基本点数の最高150）---
  // 原典「保護者（父母等）それぞれの基本点数を合算します。
  //      （保護者が1人の場合は100点を加算）」の確認
  {
    name: '荒尾: 父100点 + 母90点 = 190',
    slug: 'arao',
    answers: { parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_1' },
    expect: 190,
    expectHouseholdBase: 190,
  },
  {
    name: '荒尾: ひとり親（保護者1のみ100点）+ 1人加算100 + 調整40 = 240',
    slug: 'arao',
    answers: {
      parent1_employment: 'parent1_employment_0',
      adj_single_parent: 'adj_single_parent_1',
    },
    expect: 240,
    expectHouseholdBase: 100,
  },
  {
    name: '荒尾: 合算200 + きょうだい在園100 + 保育教諭100 = 400',
    slug: 'arao',
    answers: {
      parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_0',
      adj_sibling: 'adj_sibling_1', adj_nursery_staff: 'adj_nursery_staff_1',
    },
    expect: 400,
  },

  // --- いなべ市（sum / 基本点数の最高100）---
  {
    name: 'いなべ: 父100点 + 母75点 = 175',
    slug: 'inabe',
    answers: { parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_5' },
    expect: 175,
    expectHouseholdBase: 175,
  },
  {
    name: 'いなべ: 合算200 + ひとり親120 + 保育士20 = 340',
    slug: 'inabe',
    answers: {
      parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_0',
      adj_single_parent: 'adj_single_parent_1', adj_nursery_staff: 'adj_nursery_staff_1',
    },
    expect: 340,
  },

  // --- 中野市（min / 基本点の最高10）---
  // 原典「※ 父母のどちらか低い指数で算出する」の確認
  {
    name: '中野(長野): 父10点・母7点なら低い方の7',
    slug: 'nakano-nagano',
    answers: { parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_4' },
    expect: 7,
    expectHouseholdBase: 7,
  },
  {
    name: '中野(長野): 低い方7 + ひとり親5 + 保育士3 - 滞納3 = 12',
    slug: 'nakano-nagano',
    answers: {
      parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_4',
      adj_single_parent: 'adj_single_parent_1', adj_nursery_staff: 'adj_nursery_staff_1',
      adj_fee_delinquent: 'adj_fee_delinquent_1',
    },
    expect: 12,
  },

  // --- 常滑市（min / 指数①の最高10）---
  // 原典「保護者のそれぞれの指数のうち低い方で指数①を決定し、
  //      ②を加えた指数の高い順に入園できます。」の確認
  {
    name: '常滑: 父10点・母7点なら低い方の7',
    slug: 'tokoname',
    answers: { parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_2' },
    expect: 7,
    expectHouseholdBase: 7,
  },
  {
    name: '常滑: 小数の加算。低い方7 + 兄弟2人1 + 希望園在園0.3 + 保育士0.5 = 8.8',
    slug: 'tokoname',
    answers: {
      parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_2',
      adj_sibling_same: 'adj_sibling_same_1', adj_sibling_enrolled: 'adj_sibling_enrolled_1',
      adj_nursery_staff: 'adj_nursery_staff_2',
    },
    expect: 8.8,
  },
  {
    name: '常滑: 内職は-2。父10点・母-2点なら低い方の-2',
    slug: 'tokoname',
    answers: { parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_11' },
    expect: -2,
    expectHouseholdBase: -2,
  },

  // --- 境港市（sum / 基本指数の最高10）---
  {
    name: '境港: 父10点 + 母7点 = 17',
    slug: 'sakaiminato',
    answers: { parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_3' },
    expect: 17,
    expectHouseholdBase: 17,
  },
  {
    name: '境港: 合算20 + ひとり親(非同居)20 + 卒園児10 - 同居者2 = 48',
    slug: 'sakaiminato',
    answers: {
      parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_0',
      adj_household: 'adj_household_2', adj_graduate: 'adj_graduate_1',
      adj_other_caregiver: 'adj_other_caregiver_1',
    },
    expect: 48,
  },

  // --- 網走市（sum / 基本点数の最高100）---
  {
    name: '網走: 父100点 + 母70点 = 170',
    slug: 'abashiri',
    answers: { parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_1' },
    expect: 170,
    expectHouseholdBase: 170,
  },
  {
    name: '網走: 合算200 + ひとり親80 + 保育士70 + 継続兄弟80 = 430',
    slug: 'abashiri',
    answers: {
      parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_0',
      adj_single_parent: 'adj_single_parent_1', adj_nursery_staff: 'adj_nursery_staff_1',
      adj_sibling: 'adj_sibling_1',
    },
    expect: 430,
  },

  // --- 上里町（sum / 基準点数の最高12）---
  {
    name: '上里: 父9点 + 母7点 = 16',
    slug: 'kamisato',
    answers: { parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_3' },
    expect: 16,
    expectHouseholdBase: 16,
  },
  {
    name: '上里: 合算18 + ひとり親3 + 兄弟在園3 - 滞納10 = 14',
    slug: 'kamisato',
    answers: {
      parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_0',
      adj_single_parent: 'adj_single_parent_1', adj_sibling: 'adj_sibling_1',
      adj_fee_delinquent: 'adj_fee_delinquent_1',
    },
    expect: 14,
  },

  // --- 二宮町（sum / 基本指数の最高20）---
  // 原典の備考1「保護者全員について個別に点数を算出し、合算する。」の確認
  {
    name: '二宮: 父20点 + 母16点 = 36',
    slug: 'ninomiya',
    answers: { parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_3' },
    expect: 36,
    expectHouseholdBase: 36,
  },
  {
    name: '二宮: 調整指数は合算。合算40 + 生活保護30 + ひとり親25 + きょうだい10 = 105',
    slug: 'ninomiya',
    answers: {
      parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_0',
      adj_welfare: 'adj_welfare_1', adj_single_parent: 'adj_single_parent_1',
      adj_sibling: 'adj_sibling_1',
    },
    expect: 105,
  },

  // --- 篠栗町（min / 基礎指数の最高20）---
  // 原典の備考1「基礎指数は、保護者のどちらか低い方とする。」の確認
  {
    name: '篠栗: 父15点・母12点なら低い方の12',
    slug: 'sasaguri',
    answers: { parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_6' },
    expect: 12,
    expectHouseholdBase: 12,
  },
  {
    name: '篠栗: 低い方12 + ひとり親8 + 保育士8 - 同居親族5 = 23',
    slug: 'sasaguri',
    answers: {
      parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_6',
      adj_single_parent: 'adj_single_parent_1', adj_nursery_staff: 'adj_nursery_staff_1',
      adj_family_requirement: 'adj_family_requirement_1',
    },
    expect: 23,
  },

  // --- 胎内市（sum / 保育の必要性の最高10）---
  {
    name: '胎内: 父10点 + 母6点 = 16',
    slug: 'tainai',
    answers: { parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_2' },
    expect: 16,
    expectHouseholdBase: 16,
  },
  {
    name: '胎内: 合算20 + ひとり親(同居親族なし)10 + きょうだい在園7 - 拘束柔軟2 = 35',
    slug: 'tainai',
    answers: {
      parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_0',
      adj_single_parent: 'adj_single_parent_1', adj_sibling: 'adj_sibling_1',
      adj_flexible_hours: 'adj_flexible_hours_1',
    },
    expect: 35,
  },

  // --- 朝来市（avg / 基準指数の最高10）---
  // 原典の手順5「父母の基準指数を足して2で除した数に調整指数を加算した数を
  //             選考指数とする。」の確認
  {
    name: '朝来: 父10点・母8点なら平均の9',
    slug: 'asago',
    answers: { parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_2' },
    expect: 9,
    expectHouseholdBase: 9,
  },
  {
    name: '朝来: 平均9 + 保育士5 + 育休明け再希望6 - 滞納10 = 10',
    slug: 'asago',
    answers: {
      parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_2',
      adj_nursery_staff: 'adj_nursery_staff_1', adj_leave_return: 'adj_leave_return_1',
      adj_fee_delinquent: 'adj_fee_delinquent_1',
    },
    expect: 10,
  },
  {
    name: '朝来: ひとり親（保護者1のみ10点）+ 手順2の10 + 調整6 = 26',
    slug: 'asago',
    answers: {
      parent1_employment: 'parent1_employment_0',
      adj_single_parent: 'adj_single_parent_1',
    },
    expect: 26,
    expectHouseholdBase: 10,
  },

  // --- 善通寺市（min / 基本点数の最高12）---
  // 原典「※父母の合計点数が異なる場合は、いずれか低い方を合計点数とする。」の確認
  {
    name: '善通寺: 父12点・母8点なら低い方の8',
    slug: 'zentsuji',
    answers: { parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_2' },
    expect: 8,
    expectHouseholdBase: 8,
  },
  {
    name: '善通寺: 低い方8 + 支援必要10 + ひとり親3 - 滞納2 = 19',
    slug: 'zentsuji',
    answers: {
      parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_2',
      adj_welfare_support: 'adj_welfare_support_1', adj_single_parent: 'adj_single_parent_1',
      adj_fee_delinquent: 'adj_fee_delinquent_1',
    },
    expect: 19,
  },

  // --- 伊達市（北海道）（sum / 基本点数の最高100）---
  // 原典「父母それぞれの基本点数を合算して世帯の基本点数とします。」の確認
  {
    name: '伊達(北海道): 父100点 + 母70点 = 170',
    slug: 'date-hokkaido',
    answers: { parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_3' },
    expect: 170,
    expectHouseholdBase: 170,
  },
  {
    name: '伊達(北海道): ひとり親かつ求職中（保護者1のみ100点）+ 基本100 + 調整80 = 280',
    slug: 'date-hokkaido',
    answers: {
      parent1_employment: 'parent1_employment_0',
      adj_single_parent: 'adj_single_parent_1',
    },
    expect: 280,
    expectHouseholdBase: 100,
  },
  {
    name: '伊達(北海道): 合算200 + 地域型卒園100 - 祖父母5 - 未申込児10 = 285',
    slug: 'date-hokkaido',
    answers: {
      parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_0',
      adj_graduate: 'adj_graduate_1', adj_grandparent: 'adj_grandparent_1',
      adj_sibling: 'adj_sibling_3',
    },
    expect: 285,
  },

  // --- 筑前町（sum / 基準点の最高20）---
  {
    name: '筑前: 父20点 + 母16点 = 36',
    slug: 'chikuzen',
    answers: { parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_4' },
    expect: 36,
    expectHouseholdBase: 36,
  },
  {
    name: '筑前: 合算40 + 保育士50 + ひとり親32 - 辞退5 = 117',
    slug: 'chikuzen',
    answers: {
      parent1_employment: 'parent1_employment_0', parent2_employment: 'parent2_employment_0',
      adj_nursery_staff: 'adj_nursery_staff_1', adj_single_parent: 'adj_single_parent_1',
      adj_declined: 'adj_declined_1',
    },
    expect: 117,
  },
];

let ng = 0;
for (const c of cases) {
  const data = getMunicipalityData(c.slug);
  if (!data) { console.log(`NG (データ未登録): ${c.name}`); ng++; continue; }
  const r = calculateScore(data.questions, c.answers, data.municipality.scoringMethod, data.municipality.baseCap);
  const okTotal = r.total === c.expect;
  const okBase = c.expectHouseholdBase === undefined || r.householdBase === c.expectHouseholdBase;
  const ok = okTotal && okBase;
  if (!ok) ng++;
  const baseNote =
    c.expectHouseholdBase === undefined
      ? ''
      : ` / 世帯基準点=${r.householdBase} 期待=${c.expectHouseholdBase}`;
  console.log(`${ok ? 'OK ' : 'NG '} ${c.name} => total=${r.total} (p1=${r.parent1Base} p2=${r.parent2Base} adj=${r.adjustment})${baseNote} 期待=${c.expect}`);
}
console.log(ng === 0 ? `\n全${cases.length}件合格` : `\n${ng}件失敗 / ${cases.length}件`);
process.exit(ng === 0 ? 0 : 1);
