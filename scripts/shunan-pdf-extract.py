"""
周南市の「保育所等の空き状況」PDFから表を抜き出す

実行: python scripts/shunan-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-shunan-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・9列（地域／公私／施設名／0歳児〜5歳児）
- 記号は ×＝受入無し、△＝若干名受入可能、〇＝3名以上受入可能。表題の行に凡例がある
- 地域（徳山・新南陽・熊毛・鹿野など）と公私は結合セルで、グループの先頭にだけ入る
- **0歳児の欄に月齢が併記されることがある**（「×6ヵ月～」など）。
  記号のあとに「◯ヵ月～」が付くので、記号だけを取り出して月齢は別に持つ
- 施設名に「（認定こども園）」が入ることがある
"""

import json
import re
import sys

import pdfplumber

COL_AREA = 0
COL_PUBLIC = 1
COL_NAME = 2
COL_AGE0 = 3
AGE_COUNT = 6
COLUMN_COUNT = COL_AGE0 + AGE_COUNT

MARKS = "○◯〇△×✕"
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
    legend = []
    notes = []
    rows = []
    mark_counts = {}

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        text = page.extract_text() or ""
        flat = "".join(text.split()).translate(ZEN)

        # 「2026.8.24現在」
        m = re.search(r"(\d{4})\.(\d+)\.(\d+)現在", flat)
        if not m:
            fail("「YYYY.M.D現在」を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        m = re.search(r"令和(\d+)年(\d+)月(\d+)日入所", flat)
        if not m:
            fail("「令和N年M月D日入所」を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        # 「（×受入無し △若干名受入可能 〇3名以上受入可能）」
        m = re.search(r"[（(]([^）)]*受入[^）)]*)[）)]", flat)
        if m:
            for mark, label in re.findall(rf"([{MARKS}])([^{MARKS}）)]+)", m.group(1)):
                legend.append({"mark": mark, "label": label.strip()})
        if not legend:
            fail("記号の凡例が見つかりません")

        for line in text.splitlines():
            line = line.strip()
            if line.startswith("※") and len(line) > 8:
                notes.append(line.lstrip("※").strip())

        tables = page.find_tables()
        if not tables:
            fail("表が見つかりません")
        table = tables[0]
        extracted = table.extract()

        # 「地域」を含む行を見出しとする
        head_index = None
        for index, row in enumerate(extracted[:4]):
            values = [cell(c) for c in row]
            if values[COL_AREA] == "地域":
                head_index = index
                break
        if head_index is None:
            fail("「地域」の見出しが見つかりません")

        head = [cell(c) for c in extracted[head_index]]
        if len(head) != COLUMN_COUNT:
            fail(f"列数が{len(head)}です（{COLUMN_COUNT}列のはず）")
        for age in range(AGE_COUNT):
            if not head[COL_AGE0 + age].startswith(f"{age}歳児"):
                fail(f"年齢の見出しが想定と違います: {head}")

        area_carry = ""
        public_carry = ""
        for values in (list(map(cell, r)) for r in extracted[head_index + 1 :]):
            name = values[COL_NAME]
            # 注記の行（※で始まる）は飛ばす
            if not name or values[COL_AREA].startswith("※"):
                continue
            if values[COL_AREA]:
                area_carry = values[COL_AREA]
            if values[COL_PUBLIC]:
                public_carry = values[COL_PUBLIC]
            if not area_carry:
                fail(f"{name}: 地域が分かりません")

            marks = []
            months = None
            for age in range(AGE_COUNT):
                value = values[COL_AGE0 + age]
                if not value:
                    marks.append(None)
                    continue
                # 「×6ヵ月～」のように記号のあとに月齢が付くことがある
                m = re.match(rf"([{MARKS}])(.*)$", value)
                if not m:
                    fail(f"{name}: {age}歳児が記号で始まっていません（「{value}」）")
                mark = m.group(1)
                rest = m.group(2).strip()
                if rest:
                    if age != 0:
                        fail(f"{name}: {age}歳児に記号以外が入っています（「{value}」）")
                    months = rest
                marks.append(mark)
                mark_counts[mark] = mark_counts.get(mark, 0) + 1

            rows.append(
                {
                    "area": area_carry,
                    "public": public_carry,
                    "name": name,
                    "marks": marks,
                    "months": months,
                }
            )

    if not rows:
        fail("施設の行を取り出せませんでした")

    return {
        "asOf": as_of,
        "target": target,
        "legend": legend,
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
