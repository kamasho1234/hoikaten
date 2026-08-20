"""
多摩市の「保育所等の募集人数（空き状況）」PDFから認可の表を抜き出してJSONで返す

実行: python scripts/tama-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-tama-vacancy.ts から呼ぶ）

## 表の作り
- 1ページめが認可保育所・認定こども園・小規模保育事業所・家庭的保育事業所・事業所内保育事業所。
  2ページめは認証保育所や企業主導型保育所（市に申し込む施設ではない）なので取らない
- **施設ごとに2行**。上段が募集人数（空き状況）、下段（網掛け）がその園を第一希望として
  申請し入所・転所保留になっている児童の数
- 施設の種類は左端の縦書き。**2列に割れて文字の順が崩れる**ことがあるので、
  取り込み側で文字の集まりとして突き合わせる
- **pdfplumber の extract() では行がずれる**。行の高さが12ptしかなく、上下の行の文字を
  取り違えるため、罫線から行と列の境界だけをもらい、文字は座標から拾い直す
- 末尾に「合計」と「第一希望として申請し保留となっている児童の数」の2行がある
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


def build_grid(page, table):
    """
    罫線から行と列の境界をもらい、セルの中身は文字の座標から組み直す。

    pdfplumber の extract() は結合セルを先頭のセルにまとめてしまうので、
    「計」の列のように縦に結合された表では複数行ぶんの数字が1か所に入ってしまう。
    ここでは境界だけを使い、文字はどのマスに入るかを座標で決める。
    """
    rows = table.rows
    ys = [r.bbox[1] for r in rows] + [rows[-1].bbox[3]]
    xs = sorted(
        {round(c[0], 1) for r in rows for c in r.cells if c}
        | {round(c[2], 1) for r in rows for c in r.cells if c}
    )
    grid = []
    for y0, y1 in zip(ys, ys[1:]):
        band = [ch for ch in page.chars if y0 - 0.5 <= (ch["top"] + ch["bottom"]) / 2 <= y1 + 0.5]
        row = []
        for x0, x1 in zip(xs, xs[1:]):
            cells = [ch for ch in band if x0 - 0.5 <= (ch["x0"] + ch["x1"]) / 2 <= x1 + 0.5]
            cells.sort(key=lambda ch: (round(ch["top"], 0), ch["x0"]))
            row.append("".join(ch["text"] for ch in cells).strip())
        grid.append(row)
    return grid


def read_kind_blocks(page, table):
    """
    施設の種類が入る左端の列を、結合されたセルの区切りごとに読む。

    種類は縦書きで、2列に割れて文字の順が崩れることがある。ここでは
    「そのセルの中にある文字」と「そのセルが覆う行の範囲」だけを返し、
    どの種類かは取り込み側が文字の集まりとして突き合わせて決める。
    """
    ys = [r.bbox[1] for r in table.rows] + [table.rows[-1].bbox[3]]
    x0 = min(c[0] for r in table.rows for c in r.cells if c)
    seen = {}
    for cell_box in (c for r in table.rows for c in r.cells if c and abs(c[0] - x0) < 1):
        seen[(round(cell_box[1], 1), round(cell_box[3], 1))] = cell_box
    blocks = []
    for (top, bottom), box in sorted(seen.items()):
        chars = [
            ch["text"]
            for ch in page.chars
            if box[0] - 0.5 <= (ch["x0"] + ch["x1"]) / 2 <= box[2] + 0.5
            and top - 0.5 <= (ch["top"] + ch["bottom"]) / 2 <= bottom + 0.5
        ]
        # 行の範囲は、セルの上端・下端に最も近い境界から求める
        start = min(range(len(ys)), key=lambda i: abs(ys[i] - top))
        end = min(range(len(ys)), key=lambda i: abs(ys[i] - bottom))
        blocks.append({"text": "".join(chars).strip(), "from": start, "to": end})
    return blocks


def extract(path):
    with pdfplumber.open(path) as pdf:
        page = pdf.pages[0]
        flat = "".join((page.extract_text() or "").translate(Z).split())
        m = re.search(r"令和(\d+)年度(\d+)月入所募集人数", flat)
        if not m:
            fail("表題から対象月を読み取れませんでした")
        target = [int(m.group(1)), int(m.group(2))]
        m = re.search(r"R(\d+)\.(\d+)\.(\d+)時点", flat)
        if not m:
            fail("基準日を読み取れませんでした")
        as_of = [int(m.group(1)), int(m.group(2)), int(m.group(3))]

        tables = page.find_tables()
        if not tables:
            fail("認可の表を取り出せませんでした")
        table = tables[0]
        rows = build_grid(page, table)
        blocks = read_kind_blocks(page, table)

    return {"target": target, "asOf": as_of, "rows": rows, "blocks": blocks}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
