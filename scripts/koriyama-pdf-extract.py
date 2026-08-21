"""
郡山市の「認可保育施設 空き状況一覧」PDFから表を抜き出す

実行: python scripts/koriyama-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-koriyama-vacancy.ts から呼ぶ）

## 表の作り
- 2ページ。13列（地区／小地区／施設番号／保育施設名／定員／所在地／
  入所対象年齢／0歳〜5歳）
- 空きは記号（〇＝3名以上空きあり、△＝1〜2名空きあり）。空欄は空きなし
- 表のすぐ上に「１ 保育所〔西部地区〕」「２ 小規模保育事業」などの見出しがある
- 地区・小地区は縦結合で、ブロックのいちばん上の行にだけ入る
- 表の中の「〇」は凡例の「○」と字体が違うので、取り込む側で揃える
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 7 + AGE_COUNT
COL_NAME = 3
COL_AGE0 = 7


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
                m = re.search(
                    r"令和([０-９\d]+)年([０-９\d]+)月([０-９\d]+)日時点", flat.translate(z)
                )
                if not m:
                    fail("基準日を読み取れませんでした")
                as_of = tuple(int(g) for g in m.groups())

            if not legend:
                # 「凡例…△：1～2名空きあり ○：3名以上空きあり」
                for mark, label in re.findall(r"([○◯〇△▲])：([^○◯〇△▲\s]+空きあり)", flat):
                    legend.append({"mark": mark, "label": label.translate(z)})

            # 記号の数（凡例の行は除く）
            for line in text.splitlines():
                squeezed = "".join(line.split())
                if not squeezed or "空きあり" in squeezed:
                    continue
                for mark in ("○", "◯", "〇", "△", "▲"):
                    mark_counts[mark] = mark_counts.get(mark, 0) + squeezed.count(mark)

            # 表の見出し。「１ 保育所〔西部地区〕 空欄：空きなし」「２ 小規模保育事業」
            heads = []
            for line in page.extract_text_lines():
                s = line["text"].strip()
                if re.match(r"^[０-９]\s*[^0-9０-９]", s) and ("保育" in s or "こども園" in s):
                    heads.append({"top": line["top"], "text": s})

            for table in sorted(page.find_tables(), key=lambda t: t.bbox[1]):
                extracted = table.extract()
                if len(extracted[0]) != EXPECTED_COLUMNS:
                    fail(f"{page_index + 1}ページめの列数が{len(extracted[0])}になっています")
                labels = [cell(c) for c in extracted[1][COL_AGE0 : COL_AGE0 + AGE_COUNT]]
                if labels != [f"{i}歳" for i in range(AGE_COUNT)]:
                    fail(f"{page_index + 1}ページめの歳児の見出しが{labels}になっています")

                above = [h for h in heads if h["top"] < table.bbox[1]]
                if not above:
                    fail(f"{page_index + 1}ページめの表に対応する見出しが見つかりません")
                head = above[-1]["text"]

                rows = []
                for row_index, row in enumerate(extracted):
                    if row_index < 2:
                        continue
                    values = [cell(c) for c in row]
                    if not values[COL_NAME]:
                        continue
                    rows.append(values)
                if not rows:
                    fail(f"{head}: 施設の行がありません")
                sections.append({"name": head, "rows": rows})

    if not sections:
        fail("空き状況の表を取り出せませんでした")
    if len(legend) < 2:
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
