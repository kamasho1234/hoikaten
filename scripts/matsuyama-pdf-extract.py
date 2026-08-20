"""
松山市の「保育所等入所可能数」PDFから表を抜き出してJSONで返す

実行: python scripts/matsuyama-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-matsuyama-vacancy.ts から呼ぶ）

## 表の作り
- 3ページにわたる1つの表。
  「地域／類型／施設名／入園できる年齢／0歳〜5歳／合計」の11列
- 地域（中心部・北条など）と類型（保・認・小・事）は変わる行にだけ入る
- 施設名は長いと2行に割れる
- 「-」はそのクラスを設けていない（乳児保育園などは2歳児まで）
- 3ページめの後半に注意事項が入るので、施設の行だけを拾う
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
    head = None
    sub = None
    rows = []
    target = set()

    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            flat = "".join((page.extract_text() or "").translate(Z).split())
            m = re.search(r"令和(\d+)年(\d+)月入所可能数", flat)
            if m:
                target.add((int(m.group(1)), int(m.group(2))))

            for table_obj in page.find_tables():
                table = [[cell(c) for c in r] for r in table_obj.extract()]
                if not table:
                    continue
                is_head = any("施設名" in c for c in table[0])
                if head is None and is_head:
                    head, sub = table[0], table[1]
                    rows.extend(table[2:])
                else:
                    rows.extend(table[2:] if is_head else table)

    if head is None:
        fail("入所可能数の表を取り出せませんでした")
    if len(target) != 1:
        fail(f"対象月が{len(target)}種類あります")

    return {"target": sorted(target)[0], "head": head, "sub": sub, "rows": rows}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
