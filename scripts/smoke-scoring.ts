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
