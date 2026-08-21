"""
那覇市の「新規受け入れ児童数の見込み」PDFから表を抜き出してJSONで返す

実行: python scripts/naha-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-naha-vacancy.ts から呼ぶ）

## 表の作り
- 12ページ。「園名／地域／人数の種類／0才〜5才」の9列
- **1つの施設が3行**（空き／入所待ち／入所待ち(第一希望のみ)）
- 空きの欄には人数のほか「※（保育士配置等あれば可）」「-（受入れ不可）」が入る
- 園名と地域は3行のいちばん上にだけ入る
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 3 + AGE_COUNT


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split())


def extract(path):
    rows = []
    target = None
    notes = []

    with pdfplumber.open(path) as pdf:
        for page_index, page in enumerate(pdf.pages):
            text = page.extract_text() or ""
            flat = "".join(text.split())

            if page_index == 0:
                z = str.maketrans("０１２３４５６７８９", "0123456789")
                m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月入所に向けた空き状況", flat.translate(z))
                if not m:
                    fail("対象月を読み取れませんでした")
                target = (int(m.group(1)), int(m.group(2)))
                for line in text.splitlines():
                    squeezed = " ".join(line.split())
                    if squeezed.startswith("※") or squeezed.startswith("-は"):
                        notes.append(squeezed)

            for table in page.find_tables():
                for row in table.extract():
                    values = [cell(c) for c in row]
                    if len(values) != EXPECTED_COLUMNS:
                        fail(f"列数が{len(values)}になっています: {values[:4]}")
                    rows.append(values)

    if not rows:
        fail("空き状況の表を取り出せませんでした")
    return {"target": target, "notes": notes, "rows": rows}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
