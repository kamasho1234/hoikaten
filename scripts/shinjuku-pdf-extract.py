"""
新宿区の「募集見込数一覧」PDFから表を抜き出してJSONで返す

実行: python scripts/shinjuku-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-shinjuku-vacancy.ts から呼ぶ）

## 表の作り
- 8列（区分／園名／0〜5歳児クラス）。**区分は縦書きの結合セル**（区立認可保育園・
  私立認可保育園・子ども園・保育ルームなど）で、値が入る行が飛び飛びになる。
- **末尾に合計行がある**ので検算に使える。
- **空欄はそのクラスの受け入れがない**（「アイグラン保育園西新宿」の0歳児など）。
  0は募集見込みが0人。文字での書き分けはないが、家庭的保育者の行は0歳以外が
  そもそもセルごと無い（None）ので区別できる。
- 園名に「※1」のような注記番号や【公設民営】が付く。名前の一部として残す。
"""

import json
import re
import sys

import pdfplumber

Z = str.maketrans("０１２３４５６７８９", "0123456789")
AGE_HEADS = ["0歳児クラス", "1歳児クラス", "2歳児クラス", "3歳児クラス", "4歳児クラス", "5歳児クラス"]


def fail(message):
    raise SystemExit(f"[中断] {message}")


def normalize(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(Z)


def cell_text(s):
    if s is None:
        return ""
    return " ".join(str(s).split())


def resolve_kubun(rows, col):
    """
    区分（縦書きラベル）を各行へ配る。

    **新宿区の区分は結合セルではなく、縦書きの文字が数行にまたがって1〜2文字ずつ入る**
    （「区立」「認可」「保」「育園」で "区立認可保育園"）。しかもラベルはその区分の
    区間の途中に置かれるので、セルの範囲からは区間が分からない。

    そこで
    1. 文字が入っている行の**連続ブロック**を1つのラベルとして連結する
    2. ラベルどうしの**中点**を区間の境界にする
    という手順で各行に区分を割り当てる。
    """
    # **縦書きラベルは1〜2行あくことがある**（「地域型保」→空行→「育事業」）。
    # 数行の隙間までは同じラベルの続きとみなす
    GAP = 2
    marks = []  # (開始行, 終了行, ラベル)
    ri = 0
    while ri < len(rows):
        if not cell_text(rows[ri][col]):
            ri += 1
            continue
        start = ri
        text = ""
        last = ri
        while ri < len(rows):
            v = cell_text(rows[ri][col])
            if v:
                text += v.replace(" ", "")
                last = ri
                ri += 1
                continue
            # 隙間の先にまだ文字が続くなら同じラベルとみなす
            look = ri
            while look < len(rows) and look - last <= GAP and not cell_text(rows[look][col]):
                look += 1
            if look < len(rows) and look - last <= GAP and cell_text(rows[look][col]):
                ri = look
                continue
            break
        # **「合計」は区分ではなく最終行のラベル**。区分として配ると
        # 直前の施設（家庭的保育者など）が「合計」区分になってしまう
        if text.replace("　", "") != "合計":
            marks.append((start, last, text))

    resolved = [""] * len(rows)
    if not marks:
        return resolved
    for mi, (start, end, text) in enumerate(marks):
        # 区間の始まりは前のラベルとの中点、終わりは次のラベルとの中点
        if mi == 0:
            lo = 0
        else:
            prev_end = marks[mi - 1][1]
            lo = (prev_end + start) // 2 + 1
        if mi + 1 == len(marks):
            hi = len(rows) - 1
        else:
            next_start = marks[mi + 1][0]
            hi = (end + next_start) // 2
        for j in range(lo, hi + 1):
            resolved[j] = text
    return resolved


def extract(path):
    tables = []
    as_of = set()
    target = set()
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ""
            m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月([０-９\d]+)日\s*公開", text)
            if m:
                as_of.add(tuple(int(g.translate(Z)) for g in m.groups()))
            m = re.search(r"［令和([０-９\d]+)年([０-９\d]+)月入園］", text)
            if m:
                target.add(tuple(int(g.translate(Z)) for g in m.groups()))

            for table_obj in page.find_tables():
                rows = [list(r) for r in table_obj.extract()]
                if len(rows) < 2:
                    continue
                head = [normalize(c) for c in rows[0]]
                if not all(a in head for a in AGE_HEADS):
                    continue
                name_col = head.index("園名（50音順）") if "園名（50音順）" in head else 1
                # 園名の列は見出しが1列目に寄っているので、実データの列（1）を使う
                tables.append(
                    {
                        "columns": {
                            "kubun": 0,
                            "name": 1 if name_col == 0 else name_col,
                            "ages": [head.index(a) for a in AGE_HEADS],
                        },
                        "kubunByRow": resolve_kubun(rows[1:], 0),
                        "rows": [[cell_text(c) for c in r] for r in rows[1:]],
                    }
                )
    if not tables:
        fail("施設の表を1つも取り出せませんでした")
    return {"asOf": sorted(as_of), "target": sorted(target), "tables": tables}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
