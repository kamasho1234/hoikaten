"""
唐津市の「教育・保育施設空き状況一覧表」PDFから表を抜き出す

実行: python scripts/karatsu-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-karatsu-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・14列
  地区／施設名／施設類型／公立／施設所在地／電話番号／
  利用定員（幼稚園部門）／利用定員（保育部門）／0歳〜5歳
- 記号は ○＝受入可能、×＝受入不可、－＝保育を提供していない
- 地区は結合セルで、グループの先頭の行にだけ入る
- 「公立」の列は公立なら○が入る（私立は空欄）

## 注意
唐津市は同じ「空き状況一覧」という名前で**2つのPDF**を出している。
- 1号認定（教育部門）用 … 3歳・4歳・5歳のみ
- 2号・3号認定（保育部門）用 … 0歳〜5歳
このスクリプトは0歳〜5歳のあるほう（保育部門）を前提にしていて、
年齢の見出しが6つそろわなければ中断する。取り込み側で両方を試して選ぶ。
"""

import json
import re
import sys

import pdfplumber

COL_AREA = 0
COL_NAME = 1
COL_KIND = 2
COL_PUBLIC = 3
COL_ADDRESS = 4
COL_TEL = 5
COL_CAP_YOCHIEN = 6
COL_CAP_HOIKU = 7
COL_AGE0 = 8
AGE_COUNT = 6
COLUMN_COUNT = COL_AGE0 + AGE_COUNT

MARKS = "○◯〇×✕－-—"
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def extract(path):
    as_of = None
    notes = []
    rows = []
    mark_counts = {}

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) < 1:
            fail("ページがありません")
        page = pdf.pages[0]
        text = page.extract_text() or ""
        flat = "".join(text.split()).translate(ZEN)

        m = re.search(r"令和(\d+)年(\d+)月(\d+)日時点", flat)
        if not m:
            fail("「令和N年M月D日時点」を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        for line in text.splitlines():
            line = line.strip()
            if line.startswith("※") and len(line) > 8:
                notes.append(line.lstrip("※").strip())

        tables = page.find_tables()
        if not tables:
            fail("表が見つかりません")
        table = tables[0]
        extracted = table.extract()

        # 「0歳」を含む行を見出しとする
        head_index = None
        for index, row in enumerate(extracted[:3]):
            values = [cell(c) for c in row]
            if "0歳" in values:
                head_index = index
                break
        if head_index is None:
            fail("「0歳」の見出しが見つかりません（保育部門のPDFではない可能性があります）")

        head = [cell(c) for c in extracted[head_index]]
        if len(head) != COLUMN_COUNT:
            fail(f"列数が{len(head)}です（{COLUMN_COUNT}列のはず）")
        if head[COL_AREA] != "地区" or head[COL_NAME] != "施設名":
            fail(f"見出しが想定と違います: {head[:3]}")
        for age in range(AGE_COUNT):
            if head[COL_AGE0 + age] != f"{age}歳":
                fail(f"年齢の見出しが想定と違います: {head}")

        area_carry = ""
        for values in (list(map(cell, r)) for r in extracted[head_index + 1 :]):
            name = values[COL_NAME]
            if not name:
                continue
            if values[COL_AREA]:
                area_carry = values[COL_AREA]
            if not area_carry:
                fail(f"{name}: 地区が分かりません")

            marks = []
            for age in range(AGE_COUNT):
                value = values[COL_AGE0 + age]
                if not value:
                    fail(f"{name}: {age}歳の欄が空です")
                if not all(ch in MARKS for ch in value):
                    fail(f"{name}: {age}歳が記号ではありません（「{value}」）")
                marks.append(value)
                mark_counts[value] = mark_counts.get(value, 0) + 1

            rows.append(
                {
                    "area": area_carry,
                    "name": name,
                    "kind": values[COL_KIND],
                    "public": bool(values[COL_PUBLIC]),
                    "capacity": values[COL_CAP_HOIKU],
                    "marks": marks,
                }
            )

    if not rows:
        fail("施設の行を取り出せませんでした")

    return {
        "asOf": as_of,
        "notes": notes,
        "markCounts": mark_counts,
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
