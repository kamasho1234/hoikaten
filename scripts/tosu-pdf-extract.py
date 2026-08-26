"""
鳥栖市の「保育所等の空き状況」PDFから表を抜き出す

実行: python scripts/tosu-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-tosu-vacancy.ts から呼ぶ）

## 表の作り
- 1ページに区分ごとの表が3つ（認可保育所／認定こども園／地域型保育事業）
- **区分の見出しの行に凡例も一緒に書かれている**
  （「（１）認可保育所 ○：3人以上空きあり、△：1〜2人空きあり、×：空きなし」）
- 各表は9列（園名／町区名／小学校区／0歳児〜5歳児）
- 小学校区が「若葉・田代※１」のように注の番号つきで書かれることがある
- 空らんは、そのクラスがない施設のもの（地域型保育は0〜2歳まで）
"""

import json
import re
import sys

import pdfplumber

COL_NAME = 0
COL_TOWN = 1
COL_SCHOOL = 2
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
    legend = {}
    notes = []
    groups = []
    mark_counts = {}
    blanks = 0

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        text = page.extract_text() or ""
        flat = "".join(text.split()).translate(ZEN)

        m = re.search(r"令和(\d+)年(\d+)月(\d+)日更新", flat)
        if not m:
            fail("「令和N年M月D日更新」を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        m = re.search(r"令和(\d+)年度(\d+)月入所分", flat)
        if not m:
            fail("「令和N年度M月入所分」を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        # 「（１）認可保育所 ○：3人以上空きあり、△：1～2人空きあり、×：空きなし」
        headings = []
        for line in text.splitlines():
            stripped = line.strip()
            m2 = re.match(r"^[（(](\d+)[）)]\s*(.+)$", stripped)
            if m2:
                body = m2.group(2)
                # 凡例より前が区分の名前
                name = re.split(rf"[{MARKS}]：", body)[0].strip()
                # 「地域型保育事業（小規模A…小A、…）」の括弧は残す
                headings.append({"no": int(m2.group(1)), "name": name})
                for mark, label in re.findall(rf"([{MARKS}])：([^、。]+)", body):
                    legend[mark] = label.strip()
            elif stripped.startswith(("（！）", "○")) and len(stripped) > 12:
                notes.append(re.sub(r"^[（(]！[）)]|^○", "", stripped).strip())
        if not headings:
            fail("「（N）区分名」の見出しが見つかりません")
        if not legend:
            fail("記号の凡例が見つかりません")

        tables = [t for t in page.find_tables() if len(t.extract()[0]) == COLUMN_COUNT]
        if len(tables) != len(headings):
            fail(f"表が{len(tables)}個、見出しが{len(headings)}個で数が合いません")

        # 表と見出しは上から順に対応する
        tables.sort(key=lambda t: t.bbox[1])
        for heading, table in zip(headings, tables):
            extracted = table.extract()
            head = [cell(c) for c in extracted[0]]
            if head[COL_NAME] != "園名" or head[COL_SCHOOL] != "小学校区":
                fail(f"{heading['name']}: 見出しが想定と違います（{head}）")
            for age in range(AGE_COUNT):
                if head[COL_AGE0 + age] != f"{age}歳児":
                    fail(f"{heading['name']}: 年齢の見出しが想定と違います（{head}）")

            rows = []
            for values in (list(map(cell, r)) for r in extracted[1:]):
                name = values[COL_NAME]
                if not name:
                    continue

                marks = []
                for age in range(AGE_COUNT):
                    value = values[COL_AGE0 + age]
                    if value == "":
                        blanks += 1
                        marks.append(None)
                        continue
                    if value not in MARKS:
                        fail(f"{name}: {age}歳児が想定の記号ではありません（「{value}」）")
                    marks.append(value)
                    mark_counts[value] = mark_counts.get(value, 0) + 1

                if all(m is None for m in marks):
                    fail(f"{name}: 全ての年齢が空らんです")
                rows.append(
                    {
                        "name": name,
                        "town": values[COL_TOWN],
                        "school": values[COL_SCHOOL],
                        "marks": marks,
                    }
                )

            if not rows:
                fail(f"{heading['name']}: 施設の行を取り出せませんでした")
            groups.append({"kind": heading["name"], "rows": rows})

    if not groups:
        fail("施設の行を取り出せませんでした")

    return {
        "asOf": as_of,
        "target": target,
        "legend": [{"mark": k, "label": v} for k, v in legend.items()],
        "notes": notes,
        "markCounts": mark_counts,
        "blanks": blanks,
        "groups": groups,
    }


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
