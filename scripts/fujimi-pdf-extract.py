"""
富士見市の「各施設の受入可能状況」PDFから表を抜き出す

実行: python scripts/fujimi-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-fujimi-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・8列（施設名／0歳児〜5歳児／合計）
- 値は3種類。ページ本文に「保無 ⇒保育未実施、 --- ⇒空きなし」と書いてある
  - 数字 … 空き人数
  - `---` … 空きなし（0）
  - `保無` … 保育未実施（そのクラスの保育をしていない）
- **いちばん下に合計の行がある**ので、行ごと・列ごとの両方で検算できる
"""

import json
import re
import sys

import pdfplumber

COL_NAME = 0
COL_AGE0 = 1
AGE_COUNT = 6
COL_TOTAL = COL_AGE0 + AGE_COUNT
COLUMN_COUNT = COL_TOTAL + 1

TOTAL_ROW = "合計"
NO_VACANCY = "---"
NOT_OFFERED = "保無"
ZEN = str.maketrans("０１２３４５６７８９－―ー", "0123456789---")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def value_of(raw, where):
    """数字なら人数、--- なら0、保無なら None（保育未実施）"""
    if re.fullmatch(r"-{2,}", raw):
        return 0
    if raw == NOT_OFFERED:
        return None
    if re.fullmatch(r"\d+", raw):
        return int(raw)
    fail(f"{where}: 思っていない値です: 「{raw}」")


def extract(path):
    as_of = None
    rows = []
    totals = None
    not_offered = 0

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        flat = "".join((page.extract_text() or "").split()).translate(ZEN)

        m = re.search(r"令和(\d+)年(\d+)月調整終了時点", flat)
        if not m:
            fail("何月の調整終了時点かを読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)))

        tables = page.find_tables()
        if not tables:
            fail("表が見つかりません")
        table = tables[0]
        extracted = table.extract()
        heads = [cell(c) for c in extracted[0]]
        if len(heads) != COLUMN_COUNT:
            fail(f"列数が{len(heads)}になっています（{COLUMN_COUNT}列のはず）")
        for age in range(AGE_COUNT):
            if heads[COL_AGE0 + age] != f"{age}歳児":
                fail(f"{age}歳児の見出しが「{heads[COL_AGE0 + age]}」になっています")
        if heads[COL_TOTAL] != TOTAL_ROW:
            fail(f"いちばん右の見出しが「{heads[COL_TOTAL]}」になっています（合計のはず）")

        for row_index in range(1, len(extracted)):
            values = [cell(c) for c in extracted[row_index]]
            name = values[COL_NAME]
            if not name:
                continue

            if name == TOTAL_ROW:
                if totals is not None:
                    fail("合計の行が2つあります")
                totals = {
                    "byAge": [
                        value_of(values[COL_AGE0 + a], "合計行") for a in range(AGE_COUNT)
                    ],
                    "total": value_of(values[COL_TOTAL], "合計行"),
                }
                continue
            if totals is not None:
                fail(f"合計の行より後に施設の行があります: 「{name}」")

            counts = []
            for age in range(AGE_COUNT):
                v = value_of(values[COL_AGE0 + age], f"{name} の{age}歳児")
                if v is None:
                    not_offered += 1
                counts.append(v)
            row_total = value_of(values[COL_TOTAL], f"{name} の合計")
            rows.append({"name": name, "counts": counts, "total": row_total})

    if not rows:
        fail("施設の行を取り出せませんでした")
    if totals is None:
        fail("いちばん下の合計の行が見つかりません")

    return {
        "asOf": as_of,
        "totals": totals,
        "notOffered": not_offered,
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
