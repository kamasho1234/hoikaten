"""
志木市の「入園可能人数」PDFから表を抜き出す

実行: python scripts/shiki-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-shiki-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・8列（施設名／0歳〜5歳／合計）
- 見出しが2段（1段目に年齢、2段目に「人数」）
- 施設名は「い ろ は 保 育 園」のように1文字ずつ空きが入る（つめれば元に戻る）
- いちばん下に「合 計」の行があるので検算に使う
- 各行にも「合 計」の欄があるので、年齢ごとの合計と突き合わせられる
- 空らんは、そのクラスがない施設のもの（地域型保育など）
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

        m = re.search(r"令和(\d+)年(\d+)月(\d+)日現在", flat)
        if not m:
            fail("「令和N年M月D日現在」を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        m = re.search(r"(\d+)月入所可能人数", flat)
        if not m:
            fail("「N月入所可能人数」を読み取れませんでした")
        target = int(m.group(1))

        for line in text.splitlines():
            stripped = line.strip()
            if stripped.startswith("※") and len(stripped) > 10:
                notes.append("".join(stripped.lstrip("※").split()))

        tables = page.find_tables()
        if not tables:
            fail("表が見つかりません")
        extracted = tables[0].extract()

        head = [cell(c) for c in extracted[0]]
        if len(head) != COLUMN_COUNT:
            fail(f"列数が{len(head)}です（{COLUMN_COUNT}列のはず）")
        for age in range(AGE_COUNT):
            if head[COL_AGE0 + age] != f"{age}歳":
                fail(f"年齢の見出しが想定と違います: {head}")
        if head[COL_TOTAL] != "合計":
            fail(f"「合計」の見出しが見つかりません: {head}")

        for values in (list(map(cell, r)) for r in extracted[1:]):
            name = values[COL_NAME]
            if not name or name == "保育園":
                continue

            counts = []
            for age in range(AGE_COUNT):
                value = values[COL_AGE0 + age]
                if value == "":
                    counts.append(None)
                    continue
                if not re.fullmatch(r"\d+", value):
                    fail(f"{name}: {age}歳が数字ではありません（「{value}」）")
                counts.append(int(value))

            total = values[COL_TOTAL]
            if not re.fullmatch(r"\d+", total):
                fail(f"{name}: 合計が数字ではありません（「{total}」）")
            if sum(c for c in counts if c is not None) != int(total):
                fail(f"{name}: 年齢ごとの合計が「合計」の欄と合いません（{counts} / {total}）")

            if name == "合計":
                totals = counts
                continue
            if all(c is None for c in counts):
                fail(f"{name}: 全ての年齢が空らんです")
            rows.append({"name": name, "counts": counts})

    if not rows:
        fail("施設の行を取り出せませんでした")
    if totals is None:
        fail("いちばん下の「合 計」の行が見つかりません")

    return {"asOf": as_of, "target": target, "notes": notes, "totals": totals, "rows": rows}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
