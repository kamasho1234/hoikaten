"""
東久留米市の「認可保育施設空き状況表」PDFから表を抜き出してJSONで返す

実行: python scripts/higashikurume-pdf-extract.py <空き状況.pdf> <入所申込者数.pdf>
出力: 標準出力にJSON（fetch-higashikurume-vacancy.ts から呼ぶ）

## 表の作り
- 空き状況は2ページ。1ページめが認可保育所（0〜5歳）、2ページめが
  小規模保育施設・家庭的保育施設（0〜2歳）
- 区分（公立・公設民営・私立・小規模保育施設・家庭的保育施設）は左端の縦書きだが、
  セル内の改行として取り出せるので詰めれば読める
- どちらの表にも「計」の列があり、行ごとに年齢の和と突き合わせられる。合計行はない
- 施設別入所申込者数のPDFは区分ごとに小計行があるので、**区分ごとの施設数**を数えて
  空き状況表と突き合わせる（取りこぼしの検出に使う。申込者数そのものは対象月が違うので取らない）
"""

import json
import re
import sys

import pdfplumber

Z = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return " ".join(str(s).split())


def read_vacancy(path):
    tables = []
    as_of = set()
    target = set()
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            flat = "".join((page.extract_text() or "").translate(Z).split())
            m = re.search(r"令和(\d+)年(\d+)月(\d+)日付", flat)
            if m:
                target.add((int(m.group(1)), int(m.group(2)), int(m.group(3))))
            m = re.search(r"R(\d+)\.(\d+)\.(\d+)現在", flat)
            if m:
                as_of.add((int(m.group(1)), int(m.group(2)), int(m.group(3))))
            for table_obj in page.find_tables():
                rows = [[cell(c) for c in r] for r in table_obj.extract()]
                if len(rows) < 2 or not any("歳" in h for h in rows[0]):
                    continue
                tables.append({"head": rows[0], "rows": rows[1:]})
    if not tables:
        fail("空き状況の表を取り出せませんでした")
    return {"asOf": sorted(as_of), "target": sorted(target), "tables": tables}


def count_by_section(path):
    """入所申込者数のPDFから、区分ごとの施設数を数える"""
    counts = []
    current = 0
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            for table_obj in page.find_tables():
                for row in table_obj.extract():
                    cells = [cell(c) for c in row]
                    if len(cells) < 3:
                        continue
                    label = "".join(cells[:2]).replace(" ", "")
                    if label.startswith("小計"):
                        counts.append(current)
                        current = 0
                        continue
                    if label.startswith("合計") or label.startswith("保育園名"):
                        continue
                    # 施設名は2列目。区分（縦書き）が入る1列目は読み飛ばす
                    if cell(row[1]):
                        current += 1
    if not counts:
        fail("入所申込者数のPDFから区分ごとの施設数を数えられませんでした")
    return counts


def main():
    paths = sys.argv[1:]
    if len(paths) != 2:
        fail("空き状況と入所申込者数のPDFを順に指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    result = read_vacancy(paths[0])
    result["sectionCounts"] = count_by_section(paths[1])
    json.dump(result, sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
