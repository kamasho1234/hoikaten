"""
合志市の「認可保育施設受入可能人数」PDFから表を抜き出す

実行: python scripts/koshi-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-koshi-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・10列（施設種別／保育施設名／定員／受入開始月齢／0歳〜5歳）
- 施設種別（保育所・認定こども園・小規模保育・家庭的保育）は縦書きの結合セルで、
  グループの先頭の行に入る。「認定こども園（※1）」のように注の番号が付く
- 記号は5段階。◎＝6名以上、○＝3〜5名、△＝1〜2名、×＝空き無し、－＝預かり無し
- 受入開始月齢が施設ごとに違う（3ヶ月、2ヶ月（57日目）、概ね6ヶ月など）
- 時点はいちばん下の「更新日：令和8年8月21日現在」から取る
"""

import json
import re
import sys

import pdfplumber

COL_KIND = 0
COL_NAME = 1
COL_CAPACITY = 2
COL_ACCEPT = 3
COL_AGE0 = 4
AGE_COUNT = 6
COLUMN_COUNT = COL_AGE0 + AGE_COUNT

# ハイフンは文字クラスで範囲と解釈されるので末尾に置く
MARKS = "◎○◯〇△×✕－―—-"
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

        m = re.search(r"更新日[：:]令和(\d+)年(\d+)月(\d+)日現在", flat)
        if not m:
            fail("「更新日：令和N年M月D日現在」を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        m = re.search(r"令和(\d+)年(\d+)月審査用", flat)
        if not m:
            fail("「令和N年M月審査用」を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        # 「◎：6名以上空き(入りやすい) ○：3～5名空き …」
        legend_line = next((l for l in text.splitlines() if l.count("：") >= 3), None)
        if legend_line is None:
            fail("記号の凡例の行が見つかりません")
        squeezed = "".join(legend_line.split()).translate(ZEN)
        for mark, label in re.findall(rf"([{MARKS}])：([^{MARKS}]+)", squeezed):
            legend.append({"mark": mark, "label": label})
        if not legend:
            fail("凡例から記号を取り出せませんでした")

        for line in text.splitlines():
            stripped = line.strip()
            if stripped.startswith("（※") and len(stripped) > 10:
                notes.append(stripped)
            elif stripped.startswith("なお、") and len(stripped) > 12:
                notes.append(stripped)

        tables = page.find_tables()
        if not tables:
            fail("表が見つかりません")
        extracted = tables[0].extract()

        head = [cell(c) for c in extracted[0]]
        if len(head) != COLUMN_COUNT:
            fail(f"列数が{len(head)}です（{COLUMN_COUNT}列のはず）")
        if head[COL_NAME] != "保育施設名" or head[COL_ACCEPT] != "受入開始月齢":
            fail(f"見出しが想定と違います: {head}")
        for age in range(AGE_COUNT):
            if head[COL_AGE0 + age] != f"{age}歳":
                fail(f"年齢の見出しが想定と違います: {head}")

        kind_carry = ""
        for values in (list(map(cell, r)) for r in extracted[1:]):
            name = values[COL_NAME]
            if not name:
                continue
            if values[COL_KIND]:
                # 「認定こども園（※1）」の注の番号は落とす
                kind_carry = re.sub(r"[（(]※.*$", "", values[COL_KIND])
            if not kind_carry:
                fail(f"{name}: 施設種別が分かりません")

            marks = []
            for age in range(AGE_COUNT):
                value = values[COL_AGE0 + age]
                if value == "":
                    blanks += 1
                    marks.append(None)
                    continue
                if value not in MARKS:
                    fail(f"{name}: {age}歳が想定の記号ではありません（「{value}」）")
                marks.append(value)
                mark_counts[value] = mark_counts.get(value, 0) + 1

            if all(m is None for m in marks):
                fail(f"{name}: 全ての年齢が空らんです")
            rows.append(
                {
                    "kind": kind_carry,
                    "name": name,
                    "capacity": values[COL_CAPACITY],
                    "acceptAge": values[COL_ACCEPT],
                    "marks": marks,
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
