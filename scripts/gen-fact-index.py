# records/*.json を読み込む records/index.ts を作り直す（ファイルを足したら実行する）
#   python scripts/gen-fact-index.py shurou
#   python scripts/gen-fact-index.py ichiji
import glob, io, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KINDS = {
    "shurou": ("src/lib/articles/shurou-shoumeisho/records", "ShurouRecord", "shurouRecords"),
    "ichiji": ("src/lib/articles/ichiji-hoiku/records", "IchijiRecord", "ichijiRecords"),
}
if len(sys.argv) < 2 or sys.argv[1] not in KINDS:
    print("使い方: python scripts/gen-fact-index.py <" + "|".join(KINDS) + ">")
    sys.exit(2)
rec, typ, name = KINDS[sys.argv[1]]
REC = os.path.join(ROOT, rec)
os.makedirs(REC, exist_ok=True)
slugs = sorted(os.path.basename(p)[:-5] for p in glob.glob(os.path.join(REC, "*.json")))
lines = [
    "// このファイルは scripts/gen-fact-index.py が作る。手で編集しない",
    f'import type {{ {typ} }} from "../types";',
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
    "// 値の検査は scripts/verify-fact-records.py が行う",
    f"export const {name}: {typ}[] = [",
    *[f"  {n} as {typ}," for n in names],
    "];",
    "",
]
io.open(os.path.join(REC, "index.ts"), "w", encoding="utf-8").write("\n".join(lines))
print(f"{len(slugs)}件")
