"""
牛久市の「入園受入見込人数」PDFから表を抜き出す

実行: python scripts/ushiku-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-ushiku-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・9列（区分／施設名／0歳児〜5歳児／募集計）
- 区分（公立保育園・私立保育園・認定こども園・小規模保育園）は縦書きの結合セルで、
  グループの先頭の行に入る。「※１」のような注の番号が付く
- 各行に「募集計」の欄、いちばん下に「合 計」の行があるので、どちらも検算に使う
- 空らんは、そのクラスがない施設のもの
"""

import json
import re
import sys

import pdfplumber

COL_KIND = 0
COL_NAME = 1
COL_AGE0 = 2
AGE_COUNT = 6
COL_TOTAL = COL_AGE0 + AGE_COUNT
COLUMN_COUNT = COL_TOTAL + 1

ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def extract(path):
    notes = []
    rows = []
    totals = None

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        text = page.extract_text() or ""
        flat = "".join(text.split()).translate(ZEN)

        # 右上に「2026/8/19」の形で作成日が入る
        m = re.search(r"(\d{4})/(\d{1,2})/(\d{1,2})", flat)
        if not m:
            fail("「YYYY/M/D」の形の日付を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        m = re.search(r"令和(\d+)年度(\d+)月入園", flat)
        if not m:
            fail("「令和N年度M月入園」を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        for line in text.splitlines():
            stripped = line.strip()
            if stripped.startswith("※") and len(stripped) > 12:
                notes.append(stripped.lstrip("※").strip())

        tables = page.find_tables()
        if not tables:
            fail("表が見つかりません")
        extracted = tables[0].extract()

        head = [cell(c) for c in extracted[0]]
        if len(head) != COLUMN_COUNT:
            fail(f"列数が{len(head)}です（{COLUMN_COUNT}列のはず）")
        for age in range(AGE_COUNT):
            if head[COL_AGE0 + age] != f"{age}歳児":
                fail(f"年齢の見出しが想定と違います: {head}")
        if head[COL_TOTAL] != "募集計":
            fail(f"「募集計」の見出しが見つかりません: {head}")

        kind_carry = ""
        for values in (list(map(cell, r)) for r in extracted[1:]):
            name = values[COL_NAME]
            kind = values[COL_KIND]
            if kind and not kind.startswith("合計"):
                # 「公立保育園※１」の注の番号は落とす
                kind_carry = re.sub(r"※.*$", "", kind)
            if not name and not kind.startswith("合計"):
                continue

            counts = []
            for age in range(AGE_COUNT):
                value = values[COL_AGE0 + age]
                if value == "":
                    counts.append(None)
                    continue
                if not re.fullmatch(r"\d+", value):
                    fail(f"{name or kind}: {age}歳児が数字ではありません（「{value}」）")
                counts.append(int(value))

            total = values[COL_TOTAL]
            if not re.fullmatch(r"\d+", total):
                fail(f"{name or kind}: 募集計が数字ではありません（「{total}」）")
            if sum(c for c in counts if c is not None) != int(total):
                fail(f"{name or kind}: 年齢ごとの合計が募集計と合いません（{counts} / {total}）")

            if kind.startswith("合計"):
                totals = counts
                continue
            if not kind_carry:
                fail(f"{name}: 区分が分かりません")
            if all(c is None for c in counts):
                fail(f"{name}: 全ての年齢が空らんです")
            rows.append({"kind": kind_carry, "name": name, "counts": counts})

    if not rows:
        fail("施設の行を取り出せませんでした")
    if totals is None:
        fail("「合 計」の行が見つかりません")

    return {"asOf": as_of, "target": target, "notes": notes, "totals": totals, "rows": rows}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
