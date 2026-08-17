"""
川崎市の「保育所等の受入可能数」PDFから表を抜き出してJSONで返す

実行: python scripts/kawasaki-pdf-extract.py <pdf> [<pdf> ...]
出力: 標準出力にJSON（fetch-kawasaki-vacancy.ts から呼ぶ）

## なぜPythonなのか
このPDFは pdftotext だと日本語が落ちて数字だけになる（-layout の有無を問わず）。
pdfplumber の extract_tables() なら表の構造ごと取れる。

## 列の位置は固定できない
区によって「エリア」列があったりなかったり、位置も違う（1列目のことも6列目のこともある）。
そのためヘッダー行の見出し名から列位置を引く。
見出しに「施設名」が無い表は、注意書きが表として誤検出されたものなので捨てる。
"""

import json
import sys

import pdfplumber

# 見出しの表記ゆれを吸収する（PDF内では "施設\n種別" のように改行が入る）
REQUIRED = ["施設名", "0歳児", "1歳児", "2歳児", "3歳児", "4歳児", "5歳児"]
OPTIONAL = ["施設種別", "住所", "定員", "受入年齢", "エリア"]


def normalize(s):
    if s is None:
        return ""
    return "".join(str(s).split())


def extract(path):
    rows = []
    notes = []
    with pdfplumber.open(path) as pdf:
        page_count = len(pdf.pages)
        for page in pdf.pages:
            # 凡例（施設種別の略号、産休明け保育のカッコ書き、調査日）を拾う。
            # 呼び出し側が略号を展開したり、基準日を突き合わせたりするのに使う
            text = page.extract_text() or ""
            buffer = ""
            for line in text.split("\n"):
                line = line.strip()
                if line.startswith("●"):
                    if buffer:
                        notes.append(buffer)
                    buffer = line
                elif buffer and not buffer.endswith("）") and line:
                    # 凡例は行をまたぐことがある（施設種別の一覧など）
                    buffer += line
                elif buffer:
                    notes.append(buffer)
                    buffer = ""
            if buffer:
                notes.append(buffer)
            for table in page.extract_tables():
                if not table:
                    continue
                # 区によっては注意書きのブロックが表の1行目として取り込まれ、
                # 本当のヘッダーが2行目に来る（多摩区がそうだった）。
                # そのため先頭数行から「施設名」を含む行を探してヘッダーとする
                header_index = None
                for i, row in enumerate(table[:3]):
                    if "施設名" in [normalize(c) for c in row]:
                        header_index = i
                        break
                # 見つからなければ表ではない（注意書きだけのブロック）
                if header_index is None:
                    continue
                header = [normalize(c) for c in table[header_index]]
                missing = [c for c in REQUIRED if c not in header]
                if missing:
                    raise SystemExit(
                        f"[中断] {path}: 必要な列がありません: {missing} / 実際の見出し: {header}"
                    )
                index = {name: header.index(name) for name in REQUIRED}
                for name in OPTIONAL:
                    if name in header:
                        index[name] = header.index(name)

                for raw in table[header_index + 1 :]:
                    cells = [normalize(c) for c in raw]
                    name = cells[index["施設名"]] if index["施設名"] < len(cells) else ""
                    if name == "":
                        continue
                    row = {
                        # 施設名はPDF内で改行されている（"こあらっこはうす\nル・シエルブルー"）。
                        # normalize で改行と空白を落として1つの名前にしている
                        "name": name,
                        "ages": [
                            cells[index[f"{age}歳児"]] if index[f"{age}歳児"] < len(cells) else ""
                            for age in range(6)
                        ],
                    }
                    for key, label in (
                        ("type", "施設種別"),
                        ("address", "住所"),
                        ("capacity", "定員"),
                        ("acceptAge", "受入年齢"),
                        ("area", "エリア"),
                    ):
                        if label in index and index[label] < len(cells):
                            row[key] = cells[index[label]]
                    rows.append(row)
    # 同じ凡例が各ページに繰り返されるので重複を落とす（並びは保つ）
    unique_notes = list(dict.fromkeys(notes))
    return {"pageCount": page_count, "rows": rows, "notes": unique_notes}


def main():
    paths = sys.argv[1:]
    if not paths:
        raise SystemExit("[中断] PDFのパスを引数で指定してください。")
    out = {path: extract(path) for path in paths}
    # 呼び出し側（Node）が読むので必ずUTF-8で出す。
    # Windowsのコンソールに直接出すと文字化けするが、パイプで受ける分には問題ない
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(out, sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
