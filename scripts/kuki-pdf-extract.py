"""
久喜市の「保育所等入所受入予定数」PDFから表を抜き出す

実行: python scripts/kuki-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-kuki-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・12列（№／公立私立／地区／名称／定員／電話番号／0歳児〜5歳児）
- 公立私立と地区は結合セルで、グループの先頭の行にだけ入る
- 記号は5段階（◎10人以上／○6〜9人／□3〜5人／△1〜2人／×空きなし）。
  凡例は表の上の行にある
- 施設名のセルが折り返されていることがある。改行をつめると正式な名前になる
  （「そらにとどくき 認定こども園」＋「ののの」→「そらにとどくき認定こども園ののの」）
- 空らんは、そのクラスがない施設のもの（地域型保育は0〜2歳児まで）
- 定員と電話番号の列は使わない
"""

import json
import re
import sys

import pdfplumber

COL_PUBLIC = 1
COL_AREA = 2
COL_NAME = 3
COL_AGE0 = 6
AGE_COUNT = 6
COLUMN_COUNT = COL_AGE0 + AGE_COUNT

MARKS = "◎○◯〇□△×✕"
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

        m = re.search(r"令和(\d+)年(\d+)月(\d+)日調査日時点", flat)
        if not m:
            fail("「令和N年M月D日調査日時点」を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        m = re.search(r"令和(\d+)年(\d+)月入所受入予定数", flat)
        if not m:
            fail("「令和N年M月入所受入予定数」を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        # 「◎：10人以上空き予定 ○：6～9人空き予定 …」の行から凡例を取る
        for line in text.splitlines():
            stripped = line.strip()
            if "：" in stripped and stripped[0] in MARKS:
                for mark, label in re.findall(rf"([{MARKS}])：([^{MARKS}]+)", stripped):
                    legend.append({"mark": mark, "label": cell(label)})
            elif stripped.startswith("※") and len(stripped) > 8:
                notes.append(stripped.lstrip("※").strip())
        if not legend:
            fail("記号の凡例が見つかりません")

        tables = page.find_tables()
        if not tables:
            fail("表が見つかりません")
        extracted = tables[0].extract()

        head = [cell(c) for c in extracted[0]]
        if len(head) != COLUMN_COUNT:
            fail(f"列数が{len(head)}です（{COLUMN_COUNT}列のはず）")
        if head[COL_NAME] != "名称" or head[COL_AREA] != "地区":
            fail(f"見出しが想定と違います: {head}")
        for age in range(AGE_COUNT):
            if head[COL_AGE0 + age] != f"{age}歳児":
                fail(f"年齢の見出しが想定と違います: {head}")

        public_carry = ""
        area_carry = ""
        for values in (list(map(cell, r)) for r in extracted[1:]):
            name = values[COL_NAME]
            if not name:
                continue
            if values[COL_PUBLIC]:
                public_carry = values[COL_PUBLIC]
            if values[COL_AREA]:
                area_carry = values[COL_AREA]
            if not public_carry:
                fail(f"{name}: 公立私立の区分が分かりません")
            if not area_carry:
                fail(f"{name}: 地区が分かりません")

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
            rows.append({"public": public_carry, "area": area_carry, "name": name, "marks": marks})

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
