"""
四日市市の「認可保育施設の空き状況」PDFから表を抜き出してJSONで返す

実行: python scripts/yokkaichi-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-yokkaichi-vacancy.ts から呼ぶ）

## 表の作り
- 4ページ。「類型／施設名／0歳児〜5歳児」の8列
- 空きは記号（○＝空きあり、△＝空く可能性があり、×＝空きなし）
- **満1歳からの施設は0歳児と1歳児の欄がひとつに結合されている**
  （満1歳の児童は0歳児として数え、1歳児と同じクラスで保育するため）。
  セルの幅を見て切り分ける
- 類型は縦結合で、ブロックのいちばん上の行にだけ入る
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split())


def extract(path):
    rows = []
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
                m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月入所", flat)
                if not m:
                    fail("対象月を読み取れませんでした")
                target = (int(m.group(1).translate(z)), int(m.group(2).translate(z)))
                m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月([０-９\d]+)日現在", flat.translate(z))
                if not m:
                    fail("基準日を読み取れませんでした")
                as_of = tuple(int(g) for g in m.groups())
                # 「○：空きあり △：空く可能性があり ×：空きなし」
                for mark, label in re.findall(r"([○◯〇△▲×✕])：([^○◯〇△▲×✕\s【]+)", flat):
                    legend.append({"mark": mark, "label": label})

            # 記号の数（凡例の行は除く）
            for line in text.splitlines():
                squeezed = "".join(line.split())
                if not squeezed or "空きあり" in squeezed:
                    continue
                for mark in ("○", "◯", "〇", "△", "×", "✕"):
                    mark_counts[mark] = mark_counts.get(mark, 0) + squeezed.count(mark)

            for table in page.find_tables():
                extracted = table.extract()
                for row_index, row in enumerate(table.rows):
                    values = [cell(c) for c in extracted[row_index]]
                    widths = [None if c is None else round(c[2] - c[0]) for c in row.cells]
                    # 表は3通りある（0〜5歳／3〜5歳だけ／0〜2歳だけ）ので列数も返す
                    rows.append({"values": values, "widths": widths, "columns": len(values)})

    if not rows:
        fail("空き状況の表を取り出せませんでした")
    if len(legend) < 3:
        fail(f"記号の凡例を読み取れませんでした（{len(legend)}件）")

    return {
        "target": target,
        "asOf": as_of,
        "legend": legend,
        "markCounts": {k: v for k, v in mark_counts.items() if v},
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
