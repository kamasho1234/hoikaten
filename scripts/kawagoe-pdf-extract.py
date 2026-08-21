"""
川越市の「募集空き状況表」PDFから表を抜き出してJSONで返す

実行: python scripts/kawagoe-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-kawagoe-vacancy.ts から呼ぶ）

## 表の作り
- 1ページに**左右2段**。どちらも「区分／保育園名／対象年齢／0歳児〜5歳児／計」
- 地区ごとに**小計の行**、いちばん下に**施設合計の行**があるので、そこで検算できる
- 地区名は縦書きでセルに散らばるので拾わない
- 空きは**人数（実数）**。対象年齢の外のクラスは空欄
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
    return "".join(str(s).split())


def extract(path):
    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"1ページのはずが{len(pdf.pages)}ページあります")
        page = pdf.pages[0]
        text = page.extract_text() or ""
        flat = "".join(text.translate(Z).split())

        # 「〈 令和８年９月募集空き状況表 〉Ｒ８.８.５時点」
        m = re.search(r"令和(\d+)年(\d+)月募集空き状況表", flat)
        if not m:
            fail("対象月を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        m = re.search(r"[RＲ](\d+)[.．](\d+)[.．](\d+)時点", flat.replace("Ｒ", "R"))
        if not m:
            fail("基準日を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        tables = page.find_tables()
        if len(tables) != 1:
            fail(f"ページに表が{len(tables)}個あります")
        rows = [[cell(c) for c in r] for r in tables[0].extract()]
        if not rows:
            fail("表を取り出せませんでした")

        return {"target": target, "asOf": as_of, "rows": rows}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
