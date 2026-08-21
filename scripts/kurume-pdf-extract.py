"""
久留米市の「保育所・認定こども園等（保育部分）受入可能状況」PDFから表を抜き出す

実行: python scripts/kurume-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-kurume-vacancy.ts から呼ぶ）

## 表の作り
- 2ページ。「類型／施設名称／所在地／対象年齢／0歳児〜5歳児」の10列
- 記号は○（3人以上受入可）と△（1〜2人受入可）だけで、**受入なしは空欄**
- 類型は縦結合で、ブロックのいちばん上の行にだけ入る
- 対象年齢の書き方はさまざま（空欄、生後4ヶ月〜、生後4ヶ月〜2歳児、1・2歳児、5歳児 など）
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 4 + AGE_COUNT


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
                m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月入所", flat.translate(z))
                if not m:
                    fail("対象月を読み取れませんでした")
                target = (int(m.group(1)), int(m.group(2)))
                m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月([０-９\d]+)日更新", flat.translate(z))
                if not m:
                    fail("更新日を読み取れませんでした")
                as_of = tuple(int(g) for g in m.groups())
                # 「○：3人以上受入可 △：1～2人受入可 ：受入なし」
                for mark, label in re.findall(r"([○◯〇△▲])：([^○◯〇△▲：\s]+受入可)", flat):
                    legend.append({"mark": mark, "label": label})

            # 記号の数。凡例と、行頭に○の付く注意書き（句点で終わる文）は除く
            for line in text.splitlines():
                squeezed = "".join(line.split())
                if not squeezed or "受入可" in squeezed or squeezed.endswith("。"):
                    continue
                for mark in ("○", "◯", "〇", "△"):
                    mark_counts[mark] = mark_counts.get(mark, 0) + squeezed.count(mark)

            for table in page.find_tables():
                for row in table.extract():
                    values = [cell(c) for c in row]
                    if len(values) != EXPECTED_COLUMNS:
                        continue
                    rows.append(values)

    if not rows:
        fail("受入可能状況の表を取り出せませんでした")
    if len(legend) < 2:
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
