"""
大田区の「保育園別・クラス年齢別欠員リスト」PDFから表を抜き出してJSONで返す

実行: python scripts/ota-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-ota-vacancy.ts から呼ぶ）

## 川崎市・さいたま市のPDFとの違い
- **全ページが同じ1つの表**（14列）で、ページごとにヘッダー行が繰り返される。
  さいたま市のように1ページに複数の表が並ぶことはない。
- **`×` が「受け入れがない年齢のクラス」（黒塗り）で、空欄が「空きなし」**。
  さいたま市は空欄がクラスなしだったので逆。取り違えると空き0の園がクラスなしになる。
- **所在地と電話が載っている**。空き状況そのものには使わないが、施設リンクの照合に効くので一緒に返す。
"""

import json
import re
import sys

import pdfplumber

HEADER = ["番号", "種別", "(延)", "保育所", "開始", "０歳", "１歳", "２歳", "３歳", "４歳", "５歳", "緊急", "所在地", "電話"]
# 「令和８年７月２日現在」
AS_OF = re.compile(r"令和(\d+|[０-９一二三四五六七八九十]+)年(\d+|[０-９一二三四五六七八九十]+)月(\d+|[０-９一二三四五六七八九十]+)日現在")
# 「本表は令和８年８月利用調整のための保育園欠員です。」
TARGET = re.compile(r"本表は令和(\d+|[０-９一二三四五六七八九十]+)年(\d+|[０-９一二三四五六七八九十]+)月利用調整")

ZEN = "０１２３４５６７８９"


def fail(message):
    raise SystemExit(f"[中断] {message}")


def normalize(s):
    if s is None:
        return ""
    return "".join(str(s).split())


def to_int(s):
    """全角数字と漢数字の年月日を整数にする"""
    s = normalize(s)
    for i, z in enumerate(ZEN):
        s = s.replace(z, str(i))
    if s.isdigit():
        return int(s)
    kanji = {"一": 1, "二": 2, "三": 3, "四": 4, "五": 5, "六": 6, "七": 7, "八": 8, "九": 9}
    if s == "十":
        return 10
    if len(s) == 2 and s[0] == "十":
        return 10 + kanji.get(s[1], 0)
    if len(s) == 2 and s[1] == "十":
        return kanji.get(s[0], 0) * 10
    if len(s) == 3 and s[1] == "十":
        return kanji.get(s[0], 0) * 10 + kanji.get(s[2], 0)
    return kanji.get(s, None)


def extract(path):
    rows = []
    as_of = set()
    target = set()
    notes = []
    with pdfplumber.open(path) as pdf:
        page_count = len(pdf.pages)
        for page in pdf.pages:
            text = page.extract_text() or ""
            m = AS_OF.search(text)
            if m:
                as_of.add((to_int(m.group(1)), to_int(m.group(2)), to_int(m.group(3))))
            m = TARGET.search(text)
            if m:
                target.add((to_int(m.group(1)), to_int(m.group(2))))
            # 表の上にある注意書き（黒塗りの意味や次回更新日）を拾う。
            # 箇条書きの区切りは行頭かスペース付きの「・」。本文中の中黒
            #（「小規模・事業所内保育所」）で切らないよう、区切りを限定する
            for line in text.split("\n"):
                if not line.strip().startswith("・"):
                    continue
                for part in re.split(r"(?:^|\s)・", line):
                    part = part.strip()
                    if part and len(part) > 6 and part not in notes:
                        notes.append(part)

            tables = page.extract_tables()
            if len(tables) != 1:
                fail(f"{path}: 1ページに表が{len(tables)}個あります（1個のはず）")
            table = tables[0]
            header = [normalize(c) for c in table[0]]
            if header != HEADER:
                fail(f"{path}: 見出しが想定と違います\n  実際: {header}\n  想定: {HEADER}")
            for row in table[1:]:
                cells = [normalize(c) for c in row]
                if not any(cells):
                    continue
                if not re.fullmatch(r"\d+", cells[0]):
                    fail(f"{path}: 番号が数字でない行があります: {cells}")
                rows.append(cells)
    return {
        "pageCount": page_count,
        "asOf": sorted(as_of),
        "target": sorted(target),
        "notes": notes,
        "header": HEADER,
        "rows": rows,
    }


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    out = extract(paths[0])
    # Windowsの既定は cp932 で、施設名がそのままでは壊れる
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(out, sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
