"""
高石市の「受け入れ可能枠一覧表」PDFから表を抜き出す

実行: python scripts/takaishi-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-takaishi-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ。施設名は縦書きで、文字が1字ずつ縦に並ぶ。
  pdfplumber の extract_table では施設名が読めないので、罫線で升目を作って字を拾い直す
- 横線13本（見出し1行＋施設11行）、縦線8本（施設名＋0〜5歳の6列）
- 記号は ○（4枠以上）△（1〜3枠）×（受け入れなし）。空欄はそのクラスを設けていない
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
MARKS = "○◯〇△×✕✖"


def fail(message):
    raise SystemExit(f"[中断] {message}")


def lines_of(page, horizontal):
    """罫線のうち、横線（または縦線）の位置を重複なしで返す"""
    out = set()
    for obj in page.lines:
        if horizontal and abs(obj["top"] - obj["bottom"]) < 2:
            out.add(round(obj["top"], 1))
        if not horizontal and abs(obj["x0"] - obj["x1"]) < 2:
            out.add(round(obj["x0"], 1))
    return sorted(out)


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    if len(sys.argv) != 2:
        fail("使い方: python scripts/takaishi-pdf-extract.py <pdf>")

    with pdfplumber.open(sys.argv[1]) as pdf:
        if len(pdf.pages) != 1:
            fail(f"{len(pdf.pages)}ページあります（1ページのはず）")
        page = pdf.pages[0]
        text = page.extract_text() or ""
        rows_y = lines_of(page, True)
        cols_x = lines_of(page, False)
        chars = page.chars

    if len(cols_x) != AGE_COUNT + 2:
        fail(f"縦の罫線が{len(cols_x)}本です（{AGE_COUNT + 2}本のはず）")
    if len(rows_y) < 4:
        fail(f"横の罫線が{len(rows_y)}本しかありません")

    # 「令和8年9月1日時点」
    m = re.search(r"令和\s*(\d+)\s*年\s*(\d{1,2})\s*月\s*(\d{1,2})\s*日時点", text)
    if not m:
        fail("「令和◯年◯月◯日時点」が見つかりません")
    as_of = [int(x) for x in m.groups()]

    # 凡例「○ → ４～枠 △ → １～３枠 × → 受け入れなし」
    legend = []
    for mark, label in re.findall(
        rf"([{MARKS}])\s*→\s*([^{MARKS}\n]+)", text.replace("　", " ")
    ):
        label = label.strip()
        if mark not in [x["mark"] for x in legend]:
            legend.append({"mark": mark, "label": label})
    if len(legend) < 2:
        fail(f"記号の凡例が{len(legend)}個しか読めません")

    def in_cell(char, top, bottom, left, right):
        cx = (char["x0"] + char["x1"]) / 2
        cy = (char["top"] + char["bottom"]) / 2
        return top < cy < bottom and left < cx < right

    rows = []
    # 1行目は見出しなので飛ばす
    for r in range(1, len(rows_y) - 1):
        top, bottom = rows_y[r], rows_y[r + 1]
        # 施設名は縦書き。名前の升目の字を、上から順につないで名前にする
        name_chars = [
            c for c in chars if in_cell(c, top, bottom, cols_x[0], cols_x[1])
        ]
        name = "".join(
            c["text"] for c in sorted(name_chars, key=lambda c: (c["top"], c["x0"]))
        )
        name = "".join(name.split())
        if not name:
            fail(f"{r}行目の施設名が空です")

        marks = []
        for a in range(AGE_COUNT):
            left, right = cols_x[1 + a], cols_x[2 + a]
            got = [
                c["text"]
                for c in chars
                if in_cell(c, top, bottom, left, right) and c["text"] in MARKS
            ]
            if len(got) > 1:
                fail(f"{name}の{a}歳の升目に記号が{len(got)}個あります")
            marks.append(got[0] if got else None)
        if all(x is None for x in marks):
            fail(f"{name}: 記号が1つもありません")
        rows.append({"name": name, "marks": marks})

    # 拾った記号の数が、PDFの文字そのものの数と合うか確かめる材料
    mark_counts = {}
    for c in chars:
        if c["text"] in MARKS and c["top"] > rows_y[0]:
            mark_counts[c["text"]] = mark_counts.get(c["text"], 0) + 1

    if len(rows) < 8:
        fail(f"施設が{len(rows)}件しか取れていません")

    json.dump(
        {"asOf": as_of, "legend": legend, "markCounts": mark_counts, "rows": rows},
        sys.stdout,
        ensure_ascii=False,
    )


if __name__ == "__main__":
    main()
