# records/*.json を読み込む records/index.ts を作り直す（ファイルを足したら実行する）
#   python scripts/gen-shurou-index.py
import glob, io, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REC = os.path.join(ROOT, "src/lib/articles/shurou-shoumeisho/records")
slugs = sorted(os.path.basename(p)[:-5] for p in glob.glob(os.path.join(REC, "*.json")))
lines = [
    "// このファイルは scripts/gen-shurou-index.py が作る。手で編集しない",
    'import type { ShurouRecord } from "../types";',
    "",
]
names = []
for s in slugs:
    n = re.sub(r"-(\w)", lambda m: m.group(1).upper(), s)
    names.append(n)
    lines.append(f'import {n} from "./{s}.json";')
lines += [
    "",
    "// JSON の文字列は union 型に狭まらないので、ここで型を付ける。",
    "// 値の検査は scripts/verify-shurou-records.py が行う",
    "export const shurouRecords: ShurouRecord[] = [",
    *[f"  {n} as ShurouRecord," for n in names],
    "];",
    "",
]
io.open(os.path.join(REC, "index.ts"), "w", encoding="utf-8").write("\n".join(lines))
print(f"{len(slugs)}件")
