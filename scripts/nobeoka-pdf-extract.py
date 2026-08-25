"""
延岡市の「認可保育所・認定こども園等の受入れ状況一覧」PDFから表を抜き出す

実行: python scripts/nobeoka-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-nobeoka-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・12列（地区／施設の種類／施設名／所在地／電話番号／0歳〜5歳／備考）
  都城市とまったく同じ様式（宮崎県内で様式をそろえているらしい）
- 地区は結合セルで、グループの先頭の行にだけ入る
- 空きは記号。**凡例はPDFになく、掲載ページの本文に書かれている**ので
  取り込み側（TypeScript）でページから読む
  延岡市は ○＝5人以上の空き、△＝1〜4人の空き、×＝空きなし、―＝クラス設定なし
- 施設名は1文字ずつ間隔をあけて印字されるので、セルの値から空白を落とす
"""

import json
import re
import sys

import pdfplumber

COL_AREA = 0
COL_KIND = 1
COL_NAME = 2
COL_ADDRESS = 3
COL_TEL = 4
COL_AGE0 = 5
AGE_COUNT = 6
COL_NOTE = COL_AGE0 + AGE_COUNT
COLUMN_COUNT = COL_NOTE + 1

# 「―」(U+2015) と「－」(U+FF0D) と「—」(U+2014) は別の文字。延岡市は U+2015 を使う
MARKS = "○◯〇△×✕－-—―"
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def extract(path):
    as_of = None
    target = None
    rows = []
    mark_counts = {}
    blanks = 0

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        text = page.extract_text() or ""
        flat = "".join(text.split()).translate(ZEN)

        # 「（令和8年8月20日時点 令和8年10月分）」
        m = re.search(r"令和(\d+)年(\d+)月(\d+)日時点", flat)
        if not m:
            fail("「令和N年M月D日時点」を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        # 延岡市の一覧には対象月の記載がない（時点だけ）
        target = None

        tables = page.find_tables()
        if not tables:
            fail("表が見つかりません")
        table = tables[0]
        extracted = table.extract()
        head = [cell(c) for c in extracted[0]]
        if len(head) != COLUMN_COUNT:
            fail(f"列数が{len(head)}です（{COLUMN_COUNT}列のはず）")
        if head[COL_AREA] != "地区" or head[COL_NAME] != "施設名":
            fail(f"見出しが想定と違います: {head[:4]}")

        # 2行目に「0歳」〜「5歳」
        ages = [cell(c) for c in extracted[1]]
        for age in range(AGE_COUNT):
            if ages[COL_AGE0 + age] != f"{age}歳":
                fail(f"年齢の見出しが想定と違います: {ages}")

        area_carry = ""
        for values in (list(map(cell, r)) for r in extracted[2:]):
            name = values[COL_NAME]
            if not name:
                continue
            if values[COL_AREA]:
                area_carry = values[COL_AREA]

            marks = []
            for age in range(AGE_COUNT):
                value = values[COL_AGE0 + age]
                if not value:
                    # 「空欄＝今後掲載予定」
                    blanks += 1
                    marks.append(None)
                    continue
                if not all(ch in MARKS for ch in value):
                    fail(f"{name}: {age}歳が記号ではありません（「{value}」）")
                marks.append(value)
                mark_counts[value] = mark_counts.get(value, 0) + 1

            rows.append(
                {
                    "area": area_carry,
                    "kind": values[COL_KIND],
                    "name": name,
                    "address": values[COL_ADDRESS],
                    "marks": marks,
                }
            )

    if not rows:
        fail("施設の行を取り出せませんでした")

    return {
        "asOf": as_of,
        "target": target,
        "markCounts": mark_counts,
        "blanks": blanks,
        "rows": rows,
    }


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
