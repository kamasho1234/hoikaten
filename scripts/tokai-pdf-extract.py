"""
東海市の「保育所等空き状況」PDFから表を抜き出す

実行: python scripts/tokai-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-tokai-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・8列（区分／施設名／0歳児〜5歳児）
- 空きは記号（○＝空きあり、×＝空きなし、－＝保育実施なし）。凡例は本文にある
- **区分ごとに見出しの行が繰り返される**（公立保育園・私立保育園・小規模保育）。
  見出しの行は3列目が「0歳児」になるので、それで見分けて区分名（2列目）を拾う
- 区分の列は縦書きで1文字ずつ分断されるので使わない
"""

import json
import re
import sys

import pdfplumber

COL_KUBUN = 0
COL_NAME = 1
COL_AGE0 = 2
AGE_COUNT = 6
COLUMN_COUNT = COL_AGE0 + AGE_COUNT

MARKS = "○◯〇×✕△－―-"
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def extract(path):
    target = None
    legend = []
    rows = []
    mark_counts = {}
    categories = []

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) < 1:
            fail("ページがありません")

        for page_index, page in enumerate(pdf.pages):
            flat = "".join((page.extract_text() or "").split()).translate(ZEN)

            # PDFの中に基準日は書かれていない（リンクの文言にある）ので、
            # ここでは入所月だけを読む
            if target is None:
                m = re.search(r"【令和(\d+)年(\d+)月〜?入所分】", flat)
                if m:
                    target = (int(m.group(1)), int(m.group(2)))

            if not legend:
                # 「空きあり：○ 空きなし：× 保育実施なし：－」
                for line in (page.extract_text() or "").splitlines():
                    if "空きあり" not in line:
                        continue
                    for label, mark in re.findall(
                        rf"([^\s：:]+)\s*[：:]\s*([{MARKS}])", line
                    ):
                        legend.append({"mark": mark, "label": label.strip()})
                    break

            for table in page.find_tables():
                extracted = table.extract()
                if len(extracted[0]) != COLUMN_COUNT:
                    continue

                current = ""
                for row_index in range(len(extracted)):
                    values = [cell(c) for c in extracted[row_index]]
                    # 見出しの行（3列目が「0歳児」）。2列目に区分名が入っている
                    if values[COL_AGE0] == "0歳児":
                        heading = values[COL_NAME]
                        if not heading:
                            fail("見出しの行に区分名がありません")
                        for age in range(AGE_COUNT):
                            if values[COL_AGE0 + age] != f"{age}歳児":
                                fail(
                                    f"見出しの{age}歳児が「{values[COL_AGE0 + age]}」に"
                                    "なっています"
                                )
                        current = heading
                        if current not in categories:
                            categories.append(current)
                        continue

                    name = values[COL_NAME]
                    if not name:
                        continue
                    if not current:
                        fail(f"{name}: 区分が分かりません（見出しの行より前にあります）")

                    marks = [values[COL_AGE0 + a] for a in range(AGE_COUNT)]
                    if any(not m for m in marks):
                        fail(f"{name}: 空の欄があります（{marks}）")
                    rows.append({"kubun": current, "name": name, "marks": marks})

                # 記号の数。歳児の欄のx座標と表の範囲で切り出す
                ranges = {}
                for row in table.rows:
                    for index, box in enumerate(row.cells):
                        if box is not None and index not in ranges:
                            ranges[index] = (box[0], box[2])
                if COL_AGE0 not in ranges or COL_AGE0 + AGE_COUNT - 1 not in ranges:
                    fail("歳児の列のx座標を取れませんでした")
                for word in page.crop(
                    (
                        ranges[COL_AGE0][0],
                        table.bbox[1],
                        ranges[COL_AGE0 + AGE_COUNT - 1][1],
                        table.bbox[3],
                    )
                ).extract_words():
                    # 見出しの「0歳児」などは数えない
                    if re.fullmatch(r"\d歳児", word["text"]):
                        continue
                    for mark in MARKS:
                        n = word["text"].count(mark)
                        if n:
                            mark_counts[mark] = mark_counts.get(mark, 0) + n

    if not rows:
        fail("施設の行を取り出せませんでした")
    if target is None:
        fail("何月入所分かを読み取れませんでした")
    if not legend:
        fail("記号の凡例が見つかりません")

    return {
        "target": target,
        "legend": legend,
        "categories": categories,
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
