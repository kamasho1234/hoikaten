"""
奈良市の「保育所等における受入可能数の結果」PDFから最新月の表を抜き出してJSONで返す

実行: python scripts/nara-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-nara-vacancy.ts から呼ぶ）

## 表の作り
- **1つのPDFに直近1年半ぶんが入っている**。2ページで1か月。
  「令和８年8月の保育所等における受入可能数の結果」という表題のあるページが月の始まり
- 表は「区分／保育所名／0歳〜5歳」。区分（公立・私立）は縦結合で最初の行にしか入らない
- 空きは記号（○＝4人以上、△＝1〜3人、×＝受入れなし）。凡例は表題のあるページの本文
- 施設名は1文字ずつ空きが入る（「都 南 保 育 園」）ので、空白を落として使う
"""

import json
import re
import sys

import pdfplumber

Z = str.maketrans("０１２３４５６７８９", "0123456789")
KANJI = {"１": 1, "２": 2, "３": 3, "４": 4, "５": 5, "６": 6, "７": 7, "８": 8, "９": 9, "１０": 10}


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split())


def to_int(s):
    t = str(s).translate(Z)
    return int(t) if t.isdigit() else None


def extract(path):
    with pdfplumber.open(path) as pdf:
        # 月ごとの先頭ページを見つける
        heads = []
        for index, page in enumerate(pdf.pages):
            flat = "".join((page.extract_text() or "").split())
            m = re.search(r"令和(\d+)年(\d+)月の保育所等における受入可能数", flat.translate(Z))
            if m:
                heads.append((int(m.group(1)), int(m.group(2)), index))
        if not heads:
            fail("受入可能数の表題が見つかりませんでした")

        reiwa, month, start = max(heads)
        # 次の月の先頭ページまでが、その月のぶん
        later = [i for _, _, i in heads if i > start]
        end = min(later) if later else len(pdf.pages)

        legend = []
        rows = []
        for index in range(start, end):
            page = pdf.pages[index]
            if index == start:
                flat = "".join((page.extract_text() or "").split())
                # 「○印は４人以上の受入可能、△印は１～３人の受入可能、×印は受入れがなかった園です。」
                for mark, label in re.findall(r"([○◯〇△▲×✕✖])印は(.+?)(?=[、。])", flat):
                    legend.append({"mark": mark, "label": label})
            for table in page.find_tables():
                rows.extend([[cell(c) for c in r] for r in table.extract()])

        if not rows:
            fail("受入可能数の表を取り出せませんでした")
        if len(legend) < 3:
            fail(f"記号の凡例を読み取れませんでした（{len(legend)}件）")

        return {
            "target": [reiwa, month],
            "pages": [start + 1, end],
            "legend": legend,
            "rows": rows,
        }


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
