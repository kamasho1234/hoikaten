"""
藤沢市の「クラス別空き状況」PDFから表を抜き出してJSONで返す

実行: python scripts/fujisawa-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-fujisawa-vacancy.ts から呼ぶ）

## 表の作り
- 4ページ。1ページめが公立、2〜3ページめが法人立、4ページめが小規模保育事業など
- 見出しの左端がそのまま施設の種類（「公立」「法人立」「小規模保育事業」）
- 列は「施設名／住所／0歳児クラス〜」。**空き数ではなく記号**（〇・―・※）が入る
- 小規模保育事業の表は2歳児クラスまで
- 凡例は1ページめの本文にある（「〇 ・・・ クラス定員に空きがある」など）
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
    as_of = set()
    legend_lines = []

    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ""
            flat = "".join(text.translate(Z).split())
            m = re.search(r"令和(\d+)年(\d+)月クラス別空き状況", flat)
            if m:
                target.add((int(m.group(1)), int(m.group(2))))
            m = re.search(r"(\d{4})年(\d+)月入所調整", flat)
            if m:
                as_of.add((int(m.group(1)), int(m.group(2))))
            # 「〇 ・・・ クラス定員に空きがある（…）」の行を凡例として集める
            for line in text.split("\n"):
                line = line.strip()
                if re.match(r"^[〇○◯―－※]\s*・・・", line):
                    legend_lines.append(line)

            for table_obj in page.find_tables():
                rows = [[cell(c) for c in r] for r in table_obj.extract()]
                if len(rows) < 2 or not any("歳児" in c for c in rows[0]):
                    continue
                tables.append({"head": rows[0], "rows": rows[1:]})

    if not tables:
        fail("空き状況の表を取り出せませんでした")
    if len(target) != 1:
        fail(f"対象月が{len(target)}種類あります")
    if not legend_lines:
        fail("記号の凡例を読み取れませんでした")

    return {
        "target": sorted(target)[0],
        "asOf": sorted(as_of)[0] if as_of else None,
        "legend": legend_lines,
        "tables": tables,
    }


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
