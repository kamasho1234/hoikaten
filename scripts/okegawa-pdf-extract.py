"""
桶川市の「入所受入可能人数」PDFから表を抜き出す

実行: python scripts/okegawa-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-okegawa-vacancy.ts から呼ぶ）

## 表の作り
- 1ページに表が2つ。1つ目が受入可能人数、2つ目はクラスと生年月日の対応表
- 受入可能人数の表は8列（区分／保育所名／0歳児〜5歳児）
- 区分（公立・私立・認定こども園・小規模保育施設）は縦書きの結合セルで、
  グループの先頭の行に入る。最後に「※」だけの行が入ることがある
- 空らんは、そのクラスがない施設のもの
- 施設名が2行に折り返される（「カオルキッズランド保」＋「育園」）
"""

import json
import re
import sys

import pdfplumber

COL_KIND = 0
COL_NAME = 1
COL_AGE0 = 2
AGE_COUNT = 6
COLUMN_COUNT = COL_AGE0 + AGE_COUNT

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

        m = re.search(r"令和(\d+)年(\d+)月入所受入可能人数", flat)
        if not m:
            fail("「令和N年M月入所受入可能人数」を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        for line in text.splitlines():
            stripped = line.strip()
            if stripped.startswith("※") and len(stripped) > 12:
                notes.append(stripped.lstrip("※").strip())

        tables = page.find_tables()
        if not tables:
            fail("表が見つかりません")

        main = None
        for table in tables:
            head = [cell(c) for c in table.extract()[0]]
            if len(head) == COLUMN_COUNT and "保育所名" in head[COL_NAME]:
                main = table
                break
        if main is None:
            fail("受入可能人数の表が見つかりません")

        extracted = main.extract()
        head = [cell(c) for c in extracted[0]]
        for age in range(AGE_COUNT):
            if head[COL_AGE0 + age] != f"{age}歳児":
                fail(f"年齢の見出しが想定と違います: {head}")

        kind_carry = ""
        for values in (list(map(cell, r)) for r in extracted[1:]):
            name = values[COL_NAME]
            if not name:
                continue
            if values[COL_KIND] and values[COL_KIND] != "※":
                kind_carry = values[COL_KIND]
            if not kind_carry:
                fail(f"{name}: 区分が分かりません")

            counts = []
            for age in range(AGE_COUNT):
                value = values[COL_AGE0 + age]
                if value == "":
                    counts.append(None)
                    continue
                if not re.fullmatch(r"\d+", value):
                    fail(f"{name}: {age}歳児が数字ではありません（「{value}」）")
                counts.append(int(value))

            if all(c is None for c in counts):
                fail(f"{name}: 全ての年齢が空らんです")
            rows.append({"kind": kind_carry, "name": name, "counts": counts})

    if not rows:
        fail("施設の行を取り出せませんでした")

    return {"asOf": as_of, "target": target, "notes": notes, "rows": rows}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
