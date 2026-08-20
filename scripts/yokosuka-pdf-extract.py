"""
横須賀市の「保育施設等の空き状況」PDFから表を抜き出してJSONで返す

実行: python scripts/yokosuka-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-yokosuka-vacancy.ts から呼ぶ）

## 表の作り
- 2ページにわたる1つの表。
  「行政センター別区域／区分／保育施設等名／0歳〜5歳／所在地／最寄り駅等」の11列
- 行政センター別区域（追浜地区・田浦地区など）は変わる行にだけ入る
- 区分は1文字の記号。表の下に「保：認可保育園」「小：小規模保育事業」などの凡例がある
- **空欄は空き人数なし**（表の上に「※空欄は空き人数無しを表しています」と書かれている）
- 最後の行が「合計」で、年齢ごとの数と総数が入る
- 施設名の後ろに「※」が付くことがあり、表の下の但し書きに対応する
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


def extract(path):
    rows = []
    head = None
    sub = None
    target = set()
    as_of = set()
    notes = []

    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ""
            flat = "".join(text.translate(Z).split())
            m = re.search(r"令和(\d+)年(\d+)月入園", flat)
            if m:
                target.add((int(m.group(1)), int(m.group(2))))
            m = re.search(r"令和(\d+)年(\d+)月(\d+)日更新", flat)
            if m:
                as_of.add((int(m.group(1)), int(m.group(2)), int(m.group(3))))
            # 表の下の但し書き（「※南横須賀幼稚園の2歳児枠については…」など）
            for line in text.split("\n"):
                line = line.strip()
                if line.startswith("※") and "区分の見方" not in line and "空欄" not in line:
                    if line not in notes:
                        notes.append(line)

            for table_obj in page.find_tables():
                table = [[cell(c) for c in r] for r in table_obj.extract()]
                if not table:
                    continue
                if head is None and any("区分" in c for c in table[0]):
                    head, sub = table[0], table[1]
                    rows.extend(table[2:])
                else:
                    # 2ページめは見出しが繰り返されるので読み飛ばす
                    start = 2 if any("区分" in c for c in table[0]) else 0
                    rows.extend(table[start:])

    if head is None:
        fail("空き状況の表を取り出せませんでした")
    if len(as_of) != 1:
        fail(f"更新日が{len(as_of)}種類あります")
    if len(target) != 1:
        fail(f"対象月が{len(target)}種類あります")

    return {
        "asOf": sorted(as_of)[0],
        "target": sorted(target)[0],
        "head": head,
        "sub": sub,
        "rows": rows,
        "notes": notes,
    }


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
