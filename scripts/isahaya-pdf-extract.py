"""
諫早市の「保育施設空き状況の目安」PDFから表を抜き出す

実行: python scripts/isahaya-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-isahaya-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・10列（提供区域／施設名／施設住所／0歳児〜5歳児／求職活動）
- **空欄が「受け入れ可能」**という、ほかの自治体と逆の書き方
  - 空欄 … 受け入れ可能
  - `×` … 受け入れができない
  - `※` … 状況によって受け入れられない
- 「求職活動」の列は年齢ではなく、求職活動を理由とする入所の可否。
  ここも**空欄なら可能**（「求職活動での入所は、求職活動の列が空欄の園でのみ」と本文にある）
- 提供区域は中央・東部・西部・南部の4つ
"""

import json
import re
import sys

import pdfplumber

COL_AREA = 0
COL_NAME = 1
COL_ADDRESS = 2
COL_AGE0 = 3
AGE_COUNT = 6
COL_JOB = COL_AGE0 + AGE_COUNT
COLUMN_COUNT = COL_JOB + 1

MARKS = "×✕※"
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
    notes = []
    rows = []
    mark_counts = {}
    blanks = 0

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) < 1:
            fail("ページがありません")
        page = pdf.pages[0]
        text = page.extract_text() or ""
        flat = "".join(text.split()).translate(ZEN)

        m = re.search(r"【令和(\d+)年(\d+)月(\d+)日時点】", flat)
        if not m:
            fail("「【令和N年M月D日時点】」を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        m = re.search(r"(\d+)月入園の空き状況", flat)
        if not m:
            fail("「N月入園の空き状況」を読み取れませんでした")
        target = int(m.group(1))

        for line in text.splitlines():
            line = line.strip()
            if line.startswith("〇") and len(line) > 8:
                notes.append(line.lstrip("〇").strip())

        tables = page.find_tables()
        if not tables:
            fail("表が見つかりません")
        table = tables[0]
        extracted = table.extract()
        head = [cell(c) for c in extracted[0]]
        if len(head) != COLUMN_COUNT:
            fail(f"列数が{len(head)}です（{COLUMN_COUNT}列のはず）")
        if head[COL_AREA] != "提供区域" or head[COL_NAME] != "施設名":
            fail(f"見出しが想定と違います: {head[:3]}")
        for age in range(AGE_COUNT):
            if head[COL_AGE0 + age] != f"{age}歳児":
                fail(f"年齢の見出しが想定と違います: {head}")
        if head[COL_JOB] != "求職活動":
            fail(f"「求職活動」の見出しが見つかりません: {head}")

        for values in (list(map(cell, r)) for r in extracted[1:]):
            name = values[COL_NAME]
            if not name:
                continue
            area = values[COL_AREA]
            if not area:
                fail(f"{name}: 提供区域が空です")

            marks = []
            for age in range(AGE_COUNT):
                value = values[COL_AGE0 + age]
                if not value:
                    # 空欄＝受け入れ可能
                    blanks += 1
                    marks.append("")
                    continue
                if not all(ch in MARKS for ch in value):
                    fail(f"{name}: {age}歳児が想定の記号ではありません（「{value}」）")
                marks.append(value)
                mark_counts[value] = mark_counts.get(value, 0) + 1

            job = values[COL_JOB]
            if job and not all(ch in MARKS for ch in job):
                fail(f"{name}: 求職活動の欄が想定の記号ではありません（「{job}」）")

            rows.append(
                {
                    "area": area,
                    "name": name,
                    "address": values[COL_ADDRESS],
                    "marks": marks,
                    "job": job,
                }
            )

    if not rows:
        fail("施設の行を取り出せませんでした")

    return {
        "asOf": as_of,
        "target": target,
        "notes": notes,
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
