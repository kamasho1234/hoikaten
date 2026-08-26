"""
江南市の「入園申込手続きのご案内」PDFから保育施設一覧表を抜き出す

実行: python scripts/konan-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-konan-vacancy.ts から呼ぶ）

## なぜPDFを読むのか
空き状況そのものは公式ページのHTMLの表にある。ただしその表には
「ー」と空らんが混ざっていて、どちらが「クラスなし」なのかが書かれていない。
このPDFの一覧表には施設ごとの「入所年齢」があるので、
**「ー」が受け入れていない年齢に付いているか**を確かめるために使う。

## 表の作り
- 「江南市立保育園一覧表」「私立保育園一覧表」「幼保連携型認定こども園一覧表」
  「小規模保育事業所一覧表」の4つに分かれている
- 見出しの行と表は上から順に対応する
- 入所年齢は「7か月目～」「１歳児～」「7か月目～2歳児」のような書き方
"""

import json
import re
import sys

import pdfplumber

HEADING = re.compile(r"^(.+?)一覧表$")
ZEN = str.maketrans("０１２３４５６７８９　", "0123456789 ")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def extract(path):
    groups = []

    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ""
            if "一覧表" not in text:
                continue

            # 見出しの行を、ページの中の位置つきで拾う
            headings = []
            for word in page.extract_words(use_text_flow=True):
                pass
            for line in text.splitlines():
                stripped = line.strip()
                m = HEADING.match(stripped)
                if m and "保育施設" not in stripped:
                    headings.append(m.group(1).strip())
            if not headings:
                continue

            tables = [t for t in page.find_tables() if len(t.extract()[0]) >= 4]
            tables = [t for t in tables if any("施設名" in cell(c) for c in t.extract()[0])]
            if len(tables) != len(headings):
                fail(
                    f"{page.page_number}ページ: 表が{len(tables)}個、"
                    f"見出しが{len(headings)}個で数が合いません"
                )
            tables.sort(key=lambda t: t.bbox[1])

            for heading, table in zip(headings, tables):
                extracted = table.extract()
                head = [cell(c) for c in extracted[0]]
                col_name = next((i for i, h in enumerate(head) if "施設名" in h), None)
                col_age = next((i for i, h in enumerate(head) if "入所年齢" in h), None)
                if col_name is None or col_age is None:
                    fail(f"{heading}: 「施設名」か「入所年齢」の列が見つかりません（{head}）")

                rows = []
                for values in (list(map(cell, r)) for r in extracted[1:]):
                    name = values[col_name] if col_name < len(values) else ""
                    accept = values[col_age] if col_age < len(values) else ""
                    if not name or not accept:
                        continue
                    rows.append({"name": name, "accept": accept})
                if not rows:
                    fail(f"{heading}: 施設の行を取り出せませんでした")
                groups.append({"kind": heading, "rows": rows})

    if not groups:
        fail("施設一覧表が見つかりませんでした")

    return {"groups": groups}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
