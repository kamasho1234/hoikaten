"""
越谷市の「保育施設入所の受入可能状況」PDFから表を抜き出してJSONで返す

実行: python scripts/koshigaya-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-koshigaya-vacancy.ts から呼ぶ）

## 表の作り
- 2ページ。表面が保育所・認定こども園、裏面が小規模・家庭的保育
- 列は「区分（縦書き2列）／保育施設等の名称／コード／0歳児〜」。
  裏面は区分が1列で、2歳児まで
- **空き数ではなく記号**（○＝3名以上、△＝1〜2名程度、空欄＝受入れなし、
  ＊＝翌月から募集予定）
- 「※新規受入停止中※」のような但し書きが数のかわりに入ることがある
- 凡例はページの下のほうに「・受入可能数 ○=３名以上の受入れ …」の形で入る
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
    tables = []
    target = set()
    as_of = set()
    legend = ""

    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ""
            flat = "".join(text.translate(Z).split())
            m = re.search(r"令和(\d+)年度\((\d+)年度\)(\d+)月入所", flat)
            if m:
                target.add((int(m.group(1)), int(m.group(3))))
            m = re.search(r"令和(\d+)年\((\d+)年\)(\d+)月(\d+)日現在", flat)
            if m:
                as_of.add((int(m.group(1)), int(m.group(3)), int(m.group(4))))
            for line in text.split("\n"):
                if "受入可能数" in line and "=" in line and not legend:
                    legend = " ".join(line.split())

            for table_obj in page.find_tables():
                rows = [[cell(c) for c in r] for r in table_obj.extract()]
                if len(rows) < 2:
                    continue
                # 見出しの行（「保育施設等の名称」を含む）を探す
                head_index = next(
                    (i for i, r in enumerate(rows[:3]) if any("保育施設等の名称" in c for c in r)),
                    None,
                )
                if head_index is None:
                    continue
                tables.append({"head": rows[head_index], "rows": rows[head_index + 1 :]})

    if not tables:
        fail("受入可能状況の表を取り出せませんでした")
    if len(target) != 1:
        fail(f"対象月が{len(target)}種類あります")
    if not as_of:
        fail("基準日を読み取れませんでした")
    if not legend:
        fail("記号の凡例を読み取れませんでした")

    return {
        "target": sorted(target)[0],
        "asOf": sorted(as_of)[0],
        "legend": legend,
        "tables": tables,
    }


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
