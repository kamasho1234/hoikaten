"""
茨木市の「保育所等の空き状況一覧表」PDFから表を抜き出す

実行: python scripts/ibaraki-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-ibaraki-vacancy.ts から呼ぶ）

## 表の作り
- 2ページ。9列（公立私立／No.／名称／0歳〜5歳）
- 記号は〇（4〜枠）△（1〜3枠）×（受け入れなし）ー（受け入れ対象歳児ではない）
- 待機児童保育事業だけ「※」（状況に応じて随時選考）が入り、
  いくつかの歳児にまたがって結合されている
- 表の上に【保育所】【認定こども園】などの見出しがある
- 公立・私立は縦結合。セルの範囲を見て行に配る
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 3 + AGE_COUNT
COL_PUBLIC = 0
COL_NAME = 2
COL_AGE0 = 3
MARKS = "〇○◯△×✕ー－-※"
# 文字クラスに入れる用。ハイフンは範囲と間違われるのでうしろに置く
MARKS_CLASS = r"〇○◯△×✕ー－※\-"


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split())


def extract(path):
    sections = []
    legend = []
    target = None
    as_of = None
    mark_counts = {}

    with pdfplumber.open(path) as pdf:
        for page_index, page in enumerate(pdf.pages):
            text = page.extract_text() or ""
            flat = "".join(text.split())
            z = str.maketrans("０１２３４５６７８９", "0123456789")

            if page_index == 0:
                m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月入所", flat.translate(z))
                if not m:
                    fail("対象月を読み取れませんでした")
                target = (int(m.group(1)), int(m.group(2)))
                m = re.search(r"【令和([０-９\d]+)年([０-９\d]+)月([０-９\d]+)日時点】", flat.translate(z))
                if not m:
                    fail("基準日を読み取れませんでした")
                as_of = tuple(int(g) for g in m.groups())

            if not legend:
                # 「〇 → ４～枠 △ → １～３枠 × → 受け入れなし ー → 受け入れ対象歳児ではない」
                for mark, label in re.findall(rf"([{MARKS_CLASS}])→([^{MARKS_CLASS}\s【]+)", flat):
                    legend.append({"mark": mark, "label": label.translate(z)})
            # 「※状況に応じて、随時選考を実施しています。」
            m = re.search(r"※([^※]*随時選考[^※]*?)。", flat)
            if m and not any(l["mark"] == "※" for l in legend):
                legend.append({"mark": "※", "label": m.group(1)})

            # 表の見出し。日付の【】は見出しではない
            heads = []
            for line in page.extract_text_lines():
                s = line["text"].strip()
                m = re.match(r"^【([^】]+)】$", s)
                if m and not re.search(r"\d", m.group(1).translate(z)):
                    heads.append({"top": line["top"], "text": m.group(1)})

            for table in sorted(page.find_tables(), key=lambda t: t.bbox[1]):
                extracted = table.extract()
                if len(extracted[0]) != EXPECTED_COLUMNS:
                    fail(f"{page_index + 1}ページめの列数が{len(extracted[0])}になっています")
                labels = [cell(c).translate(z) for c in extracted[1][COL_AGE0 : COL_AGE0 + AGE_COUNT]]
                if labels != [f"{i}歳" for i in range(AGE_COUNT)]:
                    fail(f"{page_index + 1}ページめの歳児の見出しが{labels}になっています")

                # 記号の数。施設名の長音や注意書きの「※」を拾わないよう、
                # 歳児の欄のx座標の中だけを切り出して数える
                first = table.rows[1].cells[COL_AGE0]
                last_cell = table.rows[1].cells[COL_AGE0 + AGE_COUNT - 1]
                if first is None or last_cell is None:
                    fail(f"{page_index + 1}ページめの歳児の見出しの位置を取れませんでした")
                for word in page.crop(
                    (first[0], table.rows[1].bbox[3], last_cell[2], table.bbox[3])
                ).extract_words():
                    for mark in MARKS:
                        mark_counts[mark] = mark_counts.get(mark, 0) + word["text"].count(mark)

                above = [h for h in heads if h["top"] < table.bbox[1]]
                if not above:
                    fail(f"{page_index + 1}ページめの表に対応する見出しが見つかりません")
                head = above[-1]["text"]

                # 公立・私立は縦結合
                public_spans = []
                for row_index, row in enumerate(table.rows):
                    c = row.cells[COL_PUBLIC]
                    value = cell(extracted[row_index][COL_PUBLIC])
                    if c is None or not value or value == "No.":
                        continue
                    public_spans.append((c[1], c[3], value))

                rows = []
                for row_index, row in enumerate(table.rows):
                    if row_index < 2:
                        continue
                    values = [cell(c) for c in extracted[row_index]]
                    name = values[COL_NAME]
                    if not name:
                        continue
                    name_cell = row.cells[COL_NAME]
                    top, bottom = (
                        (name_cell[1], name_cell[3]) if name_cell else (row.bbox[1], row.bbox[3])
                    )
                    middle = (top + bottom) / 2
                    public = ""
                    for span_top, span_bottom, value in public_spans:
                        if span_top <= middle <= span_bottom:
                            public = value
                            break

                    stages = []
                    last = ""
                    for i in range(AGE_COUNT):
                        c = row.cells[COL_AGE0 + i]
                        v = values[COL_AGE0 + i]
                        if c is not None:
                            last = v
                            stages.append({"text": v, "joined": False})
                        else:
                            # 結合された欄の続き
                            stages.append({"text": last, "joined": True})
                    rows.append({"public": public, "no": values[1], "name": name, "stages": stages})

                if not rows:
                    fail(f"{head}: 施設の行がありません")
                sections.append({"name": head, "rows": rows})

    if not sections:
        fail("空き状況の表を取り出せませんでした")
    if len(legend) < 4:
        fail(f"記号の凡例を読み取れませんでした（{len(legend)}件）")

    return {
        "target": target,
        "asOf": as_of,
        "legend": legend,
        "markCounts": {k: v for k, v in mark_counts.items() if v},
        "sections": sections,
    }


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
