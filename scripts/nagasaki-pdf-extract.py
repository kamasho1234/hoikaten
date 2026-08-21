"""
長崎市の「保育施設空き状況一覧」PDFから表を抜き出してJSONで返す

実行: python scripts/nagasaki-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-nagasaki-vacancy.ts から呼ぶ）

## 表の作り
- 2ページ。「地区／施設類型／保育施設名／所在地／電話番号／定員／0歳〜5歳」の12列
- **入っている記号は「×」だけ**（受け入れが難しい学齢に付く）。
  それ以外の欄は空になる
- 地区は縦結合で、ブロックのいちばん上の行にだけ入る
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 6 + AGE_COUNT


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split())


def extract(path):
    rows = []
    as_of = None
    note = ""
    mark_count = 0

    with pdfplumber.open(path) as pdf:
        for page_index, page in enumerate(pdf.pages):
            text = page.extract_text() or ""
            flat = "".join(text.split())

            if page_index == 0:
                m = re.search(r"空き状況一覧【令和(\d+)年(\d+)月(\d+)日時点】", flat)
                if not m:
                    fail("基準日を読み取れませんでした")
                as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))
                m = re.search(r"(現時点で受け入れが難しい[^。]+)。", flat)
                if not m:
                    fail("記号の説明を読み取れませんでした")
                note = m.group(1)

            # 表の部分に出てくる×の数（説明の行は除く）
            for line in text.splitlines():
                squeezed = "".join(line.split())
                if not squeezed or "受け入れが難しい" in squeezed:
                    continue
                mark_count += squeezed.count("×") + squeezed.count("✕")

            for table in page.find_tables():
                for row in table.extract():
                    values = [cell(c) for c in row]
                    if len(values) != EXPECTED_COLUMNS:
                        fail(f"列数が{len(values)}になっています: {values[:4]}")
                    rows.append(values)

    if not rows:
        fail("空き状況の表を取り出せませんでした")

    return {"asOf": as_of, "note": note, "markCount": mark_count, "rows": rows}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
