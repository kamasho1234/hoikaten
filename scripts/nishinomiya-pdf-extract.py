"""
西宮市の「欠員状況一覧」PDFから表を抜き出してJSONで返す

実行: python scripts/nishinomiya-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-nishinomiya-vacancy.ts から呼ぶ）

## 表の作り
- 4ページ。「地区／公私立／類型／施設／所在地／0歳〜5歳／備考」の12列
- 地区と公私立は縦結合なので、いちばん上の行にしか入らない
- 空きは記号（×＝0人、△＝1〜2人、〇＝3〜5人、◎＝6人以上、＼＝受入れなし）。
  **「＼」は斜線の図形で描かれていて文字にならない**ので、空欄として返る
- 記号の凡例と類型の凡例は、どちらも1ページめの本文にある
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
    rows = []
    marks = {}
    kinds = {}
    as_of = set()

    with pdfplumber.open(path) as pdf:
        for page_index, page in enumerate(pdf.pages):
            text = page.extract_text() or ""
            flat = "".join(text.split())

            m = re.search(r"欠員状況一覧（令和(\d+)年(\d+)月(\d+)日利用調整後）", flat.translate(Z))
            if m:
                as_of.add((int(m.group(1)), int(m.group(2)), int(m.group(3))))

            if page_index == 0:
                # 「受入れ可能人数…「×」：０人、「△」：１～２人、…」
                area = flat.split("受入れ可能人数")[-1].split("類型…")[0]
                for mark, label in re.findall(r"「(.)」：([^、。]+)", area):
                    marks[mark] = label
                # 「類型…「保」:保育所（園）、「認（幼保）」:幼保連携型認定こども園、…」
                area = flat.split("類型…")[-1].split("(※)")[0]
                for code, label in re.findall(r"「(.+?)」[:：]([^、。]+)", area):
                    kinds[code] = label

            for table in page.find_tables():
                for row in table.extract():
                    rows.append([cell(c) for c in row])

    if not rows:
        fail("欠員状況の表を取り出せませんでした")
    if len(as_of) != 1:
        fail(f"基準日が{len(as_of)}種類あります")
    if len(marks) < 4:
        fail(f"記号の凡例を読み取れませんでした（{len(marks)}件）")
    if len(kinds) < 4:
        fail(f"類型の凡例を読み取れませんでした（{len(kinds)}件）")

    return {
        "asOf": sorted(as_of)[0],
        "marks": marks,
        "kinds": kinds,
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
