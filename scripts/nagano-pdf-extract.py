"""
長野市の「認可保育施設 空き状況」PDFから表を抜き出す

実行: python scripts/nagano-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-nagano-vacancy.ts から呼ぶ）

## 表の作り
- 3ページ。1ページめは注意事項（クラス年齢の対応表だけが2列の表で入る）
- 表は「施設名／公私／所在地／電話／受入年齢／0歳児〜5歳児／備考」の12列
- 空きは記号（◎＝3人以上、○＝1人または2人、×＝0人）。
  受け入れていない歳児は空欄
- 表のすぐ上に「保育園（北部）」などの見出しがあり、そこに凡例も並ぶ
- **1歳児と2歳児をひとつのクラスで見る施設は欄が結合されている**。
  セルの幅を見て切り分ける
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 5 + AGE_COUNT + 1
COL_AGE0 = 5


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
    mark_counts = {}

    with pdfplumber.open(path) as pdf:
        for page_index, page in enumerate(pdf.pages):
            text = page.extract_text() or ""
            flat = "".join(text.split())
            z = str.maketrans("０１２３４５６７８９", "0123456789")

            if page_index == 0:
                m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月入所空き状況", flat.translate(z))
                if not m:
                    fail("対象月を読み取れませんでした")
                target = (int(m.group(1)), int(m.group(2)))

            # 見出しの行。「◎：３人以上 ○：１人または２人 ×：０人」が並ぶ
            heads = []
            for line in text.splitlines():
                squeezed = "".join(line.split())
                if "◎：" not in squeezed:
                    continue
                name = squeezed.split("◎")[0]
                if not name:
                    fail(f"見出しの名前を読み取れませんでした: {squeezed}")
                heads.append(name)
                if not legend:
                    for mark, label in re.findall(
                        r"([◎○〇×✕])：([０-９\d]+人以上|[０-９\d]+人または[０-９\d]+人|[０-９\d]+人)",
                        squeezed,
                    ):
                        legend.append({"mark": mark, "label": label.translate(z)})

            # 記号の数。施設の行（電話番号のある行）だけを数える
            for line in text.splitlines():
                squeezed = "".join(line.split())
                if not re.search(r"\d{3}-\d{4}", squeezed):
                    continue
                for mark in ("◎", "○", "◯", "〇", "×", "✕"):
                    mark_counts[mark] = mark_counts.get(mark, 0) + squeezed.count(mark)

            tables = [
                t
                for t in sorted(page.find_tables(), key=lambda t: t.bbox[1])
                if len(t.extract()[0]) == EXPECTED_COLUMNS
            ]
            if len(tables) != len(heads):
                fail(f"{page_index + 1}ページめの見出しが{len(heads)}件、表が{len(tables)}件で数が合いません")

            for head, table in zip(heads, tables):
                extracted = table.extract()
                rows = []
                for row_index, row in enumerate(table.rows):
                    values = [cell(c) for c in extracted[row_index]]
                    if len(values) != EXPECTED_COLUMNS:
                        fail(f"{head}: 列数が{len(values)}になっています: {values[:3]}")
                    if values[0] == "施設名":
                        continue
                    widths = [
                        None if c is None else round(c[2] - c[0])
                        for c in row.cells[COL_AGE0 : COL_AGE0 + AGE_COUNT]
                    ]
                    rows.append({"values": values, "widths": widths})
                if not rows:
                    fail(f"{head}: 施設の行がありません")
                sections.append({"name": head, "rows": rows})

    if not sections:
        fail("空き状況の表を取り出せませんでした")
    if len(legend) < 3:
        fail(f"記号の凡例を読み取れませんでした（{len(legend)}件）")

    return {
        "target": target,
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
