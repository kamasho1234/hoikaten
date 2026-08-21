"""
神戸市の「教育・保育施設（2・3号）の申込状況」PDFから表を抜き出してJSONで返す

実行: python scripts/kobe-pdf-extract.py <pdf> [<pdf> ...]
出力: 標準出力にJSON（fetch-kobe-vacancy.ts から呼ぶ）

## 表の作り
- 区・支所ごとに1つのPDF。
  「分類／施設名／組織／利用定員／受入予定(0〜5歳)／申込児童数(0〜5歳)／合計」の17列
- 受入予定は記号（◎＝6人以上、○＝3〜5人、△＝1〜2人、×＝0人）、申込児童数は実数。
  そのクラスがない年齢は空欄になる（列の位置で年齢が決まる）
- **施設名の欄には分類の文字もいっしょに入る**（「幼保連携型認定こども園聖ニコラス天使園」）。
  切り分けるために、ページの素のテキストの行もあわせて返す
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 4 + AGE_COUNT * 2 + 1


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split())


def extract_one(path):
    as_of = None
    legend = []
    rows = []
    lines = []

    with pdfplumber.open(path) as pdf:
        for page_index, page in enumerate(pdf.pages):
            text = page.extract_text() or ""
            flat = "".join(text.split())
            for line in text.split("\n"):
                squeezed = " ".join(line.split())
                if squeezed:
                    lines.append(squeezed)

            if page_index == 0:
                m = re.search(r"(\d{4})年(\d+)月(\d+)日現在", flat)
                if m:
                    as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))
                # 「「受入予定」の人数は、◎（6人以上）、○（3～5人）、△（1～2人）、×（0人）」
                for mark, label in re.findall(r"([◎○〇△▲×✕])（([^）]+)）", flat):
                    legend.append({"mark": mark, "label": label})

            for table in page.find_tables():
                for row in table.extract():
                    values = [cell(c) for c in row]
                    if len(values) != EXPECTED_COLUMNS:
                        fail(
                            f"列数が{len(values)}になっています（{EXPECTED_COLUMNS}列のはず）: {path}"
                        )
                    rows.append(values)

    if not rows:
        fail(f"表を取り出せませんでした: {path}")
    if as_of is None:
        fail(f"基準日を読み取れませんでした: {path}")
    return {"asOf": as_of, "legend": legend, "rows": rows, "lines": lines}


def main():
    paths = sys.argv[1:]
    if not paths:
        fail("PDFのパスを1つ以上指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump([extract_one(p) for p in paths], sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
