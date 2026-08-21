"""
姫路市の「保育所・認定こども園 空き状況一覧」PDFから表を抜き出してJSONで返す

実行: python scripts/himeji-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-himeji-vacancy.ts から呼ぶ）

## 表の作り
- 3ページ。**見出しの行は表の外**にあるので、表そのものは施設の行だけになる
  （「施設名 校区 利用年齢 0 1 2 3 4 5 備考 バス送迎 一時保育」の12列）
- 空きは記号（△＝1〜2名、○＝3名以上）。空欄の意味は公式に書かれていない
- 凡例と対象月は1ページめの本文にある
"""

import json
import re
import sys

import pdfplumber

Z = str.maketrans("０１２３４５６７８９", "0123456789")

HEADER_WORDS = ["施設名", "校区", "利用年齢", "0", "1", "2", "3", "4", "5", "備考", "バス送迎", "一時保育"]


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split())


def extract(path):
    rows = []
    target = set()
    legend = []

    with pdfplumber.open(path) as pdf:
        for page_index, page in enumerate(pdf.pages):
            text = page.extract_text() or ""
            flat = "".join(text.translate(Z).split())

            m = re.search(r"令和(\d+)年度(\d+)月空き状況", flat)
            if m:
                target.add((int(m.group(1)), int(m.group(2))))
            if page_index == 0:
                # 「△・・・1～2名の空き」「○・・・3名以上の空き」
                for mark, label in re.findall(r"([○◯〇△▲])・+([^○◯〇△▲\s]+の空き)", flat):
                    legend.append({"mark": mark, "label": label})

            # 見出しは表の外にある。列の並びが変わっていないかを見るために拾っておく
            header = None
            for line in text.split("\n"):
                if line.strip().startswith("施設名"):
                    header = line.split()
                    break
            if header != HEADER_WORDS:
                fail(f"{page_index + 1}ページめの見出しが変わりました: {header}")

            tables = page.find_tables()
            if len(tables) != 1:
                fail(f"{page_index + 1}ページめに表が{len(tables)}個あります")
            for row in tables[0].extract():
                values = [cell(c) for c in row]
                if len(values) != len(HEADER_WORDS):
                    fail(f"列数が{len(values)}になっています: {values[:3]}")
                rows.append(values)

    if not rows:
        fail("空き状況の表を取り出せませんでした")
    if len(target) != 1:
        fail(f"対象月が{len(target)}種類あります")
    if len(legend) < 2:
        fail(f"記号の凡例を読み取れませんでした（{len(legend)}件）")

    return {"target": sorted(target)[0], "legend": legend, "rows": rows}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
