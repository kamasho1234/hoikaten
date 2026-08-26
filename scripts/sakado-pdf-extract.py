"""
坂戸市の「保育園等空き状況表」PDFから表を抜き出す

実行: python scripts/sakado-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-sakado-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・7列（施設名／0歳児クラス〜5歳児クラス）
- **区分（公立保育園・私立保育園・小規模保育施設・認定こども園）は
  見出しの行として表の中に混ざる**。1列目が区分の名前で、
  2列目以降が「０歳児クラス」…になっている行がそれ
- 記号は ○＝空きあり、×＝空きなし の2つだけ（人数は非公表）
- 空らんは、そのクラスがない施設のもの（小規模保育は0〜2歳まで）
- 施設名が2行に折り返される（「子どもの夢保育園」＋「南口ハウス」）
"""

import json
import re
import sys

import pdfplumber

COL_NAME = 0
COL_AGE0 = 1
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
    legend = []
    notes = []
    rows = []
    mark_counts = {}
    blanks = 0

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        text = page.extract_text() or ""
        flat = "".join(text.split()).translate(ZEN)

        m = re.search(r"令和(\d+)年(\d+)月(\d+)日入所", flat)
        if not m:
            fail("「令和N年M月D日入所」を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        # 「○・・・空きあり ×・・・空きなし ※具体的な人数については非公表となります。」
        legend_line = next((l for l in text.splitlines() if "・・・" in l), None)
        if legend_line is None:
            fail("記号の凡例の行が見つかりません")
        squeezed = "".join(legend_line.split()).translate(ZEN)
        for mark, label in re.findall(rf"([{MARKS}])・・・([^{MARKS}※]+)", squeezed):
            legend.append({"mark": mark, "label": label})
        if not legend:
            fail("凡例から記号を取り出せませんでした")
        note = re.search(r"※(.+)$", squeezed)
        if note:
            notes.append(note.group(1))

        tables = page.find_tables()
        if not tables:
            fail("表が見つかりません")
        extracted = tables[0].extract()

        kind_carry = ""
        for values in (list(map(cell, r)) for r in extracted):
            if len(values) != COLUMN_COUNT:
                fail(f"列数が{len(values)}の行があります（{COLUMN_COUNT}列のはず）")
            name = values[COL_NAME]
            if not name:
                continue

            # 区分の見出しの行（2列目以降が「N歳児クラス」）
            if all(
                values[COL_AGE0 + age] == f"{age}歳児クラス" for age in range(AGE_COUNT)
            ):
                kind_carry = name
                continue
            if not kind_carry:
                fail(f"{name}: 区分が分かりません")

            marks = []
            for age in range(AGE_COUNT):
                value = values[COL_AGE0 + age]
                if not value:
                    blanks += 1
                    marks.append(None)
                    continue
                if value not in MARKS:
                    fail(f"{name}: {age}歳児が想定の記号ではありません（「{value}」）")
                marks.append(value)
                mark_counts[value] = mark_counts.get(value, 0) + 1

            if all(m is None for m in marks):
                fail(f"{name}: 全ての年齢が空らんです")
            rows.append({"kind": kind_carry, "name": name, "marks": marks})

    if not rows:
        fail("施設の行を取り出せませんでした")

    return {
        "target": target,
        "legend": legend,
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
