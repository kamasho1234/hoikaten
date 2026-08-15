// 登録済み自治体の一覧を JSON で標準出力に吐く（未対応自治体の洗い出し用）
import { getAllMunicipalities } from '../src/lib/data/index';

const rows = getAllMunicipalities().map((m: any) => ({
  slug: m.slug,
  name: m.name,
  prefecture: m.prefecture,
  method: m.scoringMethod ?? 'sum',
  maxBasePoints: m.maxBasePoints,
}));

rows.sort((a, b) => a.prefecture.localeCompare(b.prefecture, 'ja') || a.name.localeCompare(b.name, 'ja'));
process.stdout.write(JSON.stringify(rows, null, 0));
