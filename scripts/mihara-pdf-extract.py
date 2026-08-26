"""
三原市の「受入状況一覧表」PDFから表を抜き出す

実行: python scripts/mihara-pdf-extract.py <0歳児のpdf> <1歳児> … <5歳児>
出力: 標準出力にJSON（fetch-mihara-vacancy.ts から呼ぶ）

## 表の作り
- **年齢ごとにPDFが分かれる**（0歳児〜5歳児の6本）。
  1本ずつ「公立・私立／保育所名／所在地／受入状況」の表になっている
- 記号は 〇＝受入可、△＝受入可（残りわずか）。
  **空きなしの施設は表に載らない**ので、6本を突き合わせて施設の一覧を作る
- 記号の凡例と注意事項は各PDFの上のほうにある
- 引数のPDFは0歳児から5歳児の順に並べる
"""

import json
import re
import sys

import pdfplumber

COL_PUBLIC = 0
COL_NAME = 1
COL_ADDRESS = 2
COL_MARK = 3
COLUMN_COUNT = COL_MARK + 1

MARKS = "○◯〇△×✕"
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def read_one(path, age):
    """1本のPDFから、その年齢の受入状況を読む"""
    rows = []
    legend = []
    notes = []
    as_of = None
    target = None

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"{age}歳児のPDFのページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        text = page.extract_text() or ""
        flat = "".join(text.split()).translate(ZEN)

        m = re.search(r"令和(\d+)年(\d+)月(\d+)日現在", flat)
        if not m:
            fail(f"{age}歳児: 「令和N年M月D日現在」を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        m = re.search(r"(\d+)月入所受入状況一覧表[（(](\d)歳児[）)]", flat)
        if not m:
            fail(f"{age}歳児: 「N月入所受入状況一覧表（N歳児）」を読み取れませんでした")
        target = int(m.group(1))
        if int(m.group(2)) != age:
            fail(f"{age}歳児のはずのPDFに「{m.group(2)}歳児」と書かれています")

        for line in text.splitlines():
            stripped = line.strip()
            m2 = re.match(rf"^([{MARKS}])\s*(.+)$", stripped)
            if m2 and len(m2.group(2)) <= 20:
                legend.append({"mark": m2.group(1), "label": "".join(m2.group(2).split())})
            elif stripped.startswith("・") and len(stripped) > 12:
                notes.append(stripped.lstrip("・").strip())

        for table in page.find_tables():
            extracted = table.extract()
            head = [cell(c) for c in extracted[0]]
            # 見出しが年齢によって「保育所名」と「施設名」で揺れる
            if len(head) != COLUMN_COUNT or head[COL_NAME] not in ("保育所名", "施設名"):
                continue
            for values in (list(map(cell, r)) for r in extracted[1:]):
                name = values[COL_NAME]
                if not name:
                    continue
                mark = values[COL_MARK]
                if mark not in MARKS:
                    fail(f"{age}歳児 {name}: 想定の記号ではありません（「{mark}」）")
                rows.append(
                    {
                        "public": values[COL_PUBLIC],
                        "name": name,
                        "address": values[COL_ADDRESS],
                        "mark": mark,
                    }
                )

    if not rows:
        fail(f"{age}歳児: 施設の行を取り出せませんでした")
    return {"asOf": as_of, "target": target, "legend": legend, "notes": notes, "rows": rows}


def extract(paths):
    if len(paths) != 6:
        fail(f"PDFのパスを6つ（0歳児から5歳児）指定してください（{len(paths)}個でした）")

    facilities = {}
    order = []
    legend = []
    notes = []
    as_of = None
    target = None
    marks_total = 0

    for age, path in enumerate(paths):
        one = read_one(path, age)
        if as_of is None:
            as_of, target, legend, notes = one["asOf"], one["target"], one["legend"], one["notes"]
        else:
            if one["asOf"] != as_of:
                fail(f"{age}歳児のPDFだけ時点が違います（{one['asOf']} / {as_of}）")
            if one["target"] != target:
                fail(f"{age}歳児のPDFだけ入所月が違います（{one['target']} / {target}）")

        for row in one["rows"]:
            key = row["name"]
            if key not in facilities:
                facilities[key] = {
                    "public": row["public"],
                    "name": key,
                    "address": row["address"],
                    "marks": [None] * 6,
                }
                order.append(key)
            facilities[key]["marks"][age] = row["mark"]
            marks_total += 1

    return {
        "asOf": as_of,
        "target": target,
        "legend": legend,
        "notes": notes,
        "markTotal": marks_total,
        "rows": [facilities[k] for k in order],
    }


def main():
    paths = sys.argv[1:]
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
