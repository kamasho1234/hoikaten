"""
流山市の「市内認可保育施設 空き状況一覧」PDFから表を抜き出してJSONで返す

実行: python scripts/nagareyama-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-nagareyama-vacancy.ts から呼ぶ）

## 表の作り
- 1ページに**3段**。左が公立保育所、中が私立保育所、右が小規模保育（0〜2歳のみ）
- どの段も「区分／コード／施設名称／定員／0歳〜5歳」の並び
- **空き数ではなく記号**（●＝3人以上、△＝1〜2人、空欄＝空きなし）
- 区分（公立保育所など）は縦書きで、段ごとに1回だけ入る
- 凡例は本文の1行め（「（凡例） ●：3人以上空きあり △：1～2人空きあり 空欄：空きなし」）
"""

import json
import re
import sys

import pdfplumber

Z = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return " ".join(str(s).split())


def extract(path):
    tables = []
    target = set()
    legend = ""

    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ""
            flat = "".join(text.translate(Z).split())
            m = re.search(r"令和(\d+)年(\d+)月入所審査", flat)
            if m:
                target.add((int(m.group(1)), int(m.group(2))))
            for line in text.split("\n"):
                if "凡例" in line and not legend:
                    legend = " ".join(line.split())

            for table_obj in page.find_tables():
                rows = [[cell(c) for c in r] for r in table_obj.extract()]
                if len(rows) < 3:
                    continue
                tables.append({"head": rows[0], "sub": rows[1], "rows": rows[2:]})

    if not tables:
        fail("空き状況の表を取り出せませんでした")
    if len(target) != 1:
        fail(f"対象月が{len(target)}種類あります")
    if not legend:
        fail("記号の凡例を読み取れませんでした")

    return {"target": sorted(target)[0], "legend": legend, "tables": tables}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
