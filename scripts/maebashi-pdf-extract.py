"""
前橋市の「途中入所 保育所・認定こども園（保育部分）空き状況」PDFから表を抜き出す

実行: python scripts/maebashi-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-maebashi-vacancy.ts から呼ぶ）

## 表の作り
- 2ページ。「保育所(園)名／住所／電話／最小受入年齢／開所時間／0歳児〜5歳児」の11列
- 空きは記号（◎＝5人以上、○＝3〜4人程度、△＝1〜2人程度、×＝募集なし）。
  受け入れていない歳児は空欄
- 「公立」「私立」「認定こども園」の見出しが表の前に入る
- 凡例は1ページめの本文
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 5 + AGE_COUNT


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
    mark_counts = {}

    with pdfplumber.open(path) as pdf:
        for page_index, page in enumerate(pdf.pages):
            text = page.extract_text() or ""
            flat = "".join(text.split())
            z = str.maketrans("０１２３４５６７８９", "0123456789")

            if page_index == 0:
                m = re.search(r"令和([０-９\d]+)年度([０-９\d]+)月途中入所", flat)
                if not m:
                    fail("対象月を読み取れませんでした")
                target = (int(m.group(1).translate(z)), int(m.group(2).translate(z)))
                # 「△が１～２人程度、○が３～４人程度、◎が５人以上の募集予定」
                for mark, label in re.findall(
                    r"([◎○〇△▲])が([０-９\d]+[~～－\-][０-９\d]+人程度|[０-９\d]+人以上)", flat
                ):
                    legend.append({"mark": mark, "label": label.translate(z)})

            # 記号の数。前置きの文にも記号が出てくるので、
            # 電話番号の入った行（＝施設の行）だけを数える
            for line in text.splitlines():
                squeezed = "".join(line.split())
                if not squeezed or not re.search(r"\d{3}-\d{4}", squeezed):
                    continue
                for mark in ("◎", "○", "◯", "〇", "△", "×", "✕"):
                    mark_counts[mark] = mark_counts.get(mark, 0) + squeezed.count(mark)

            for table in page.find_tables():
                for row in table.extract():
                    values = [cell(c) for c in row]
                    if len(values) != EXPECTED_COLUMNS:
                        fail(f"列数が{len(values)}になっています: {values[:3]}")
                    rows.append(values)

    if not rows:
        fail("空き状況の表を取り出せませんでした")
    if len(legend) < 3:
        fail(f"記号の凡例を読み取れませんでした（{len(legend)}件）")

    return {
        "target": target,
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
