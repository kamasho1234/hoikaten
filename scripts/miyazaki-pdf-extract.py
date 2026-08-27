"""
宮崎市の「認可保育所・認定こども園等の空き状況一覧」PDFから表を抜き出してJSONで返す

実行: python scripts/miyazaki-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-miyazaki-vacancy.ts から呼ぶ）

## 表の作り
- 1ページめは表紙。2ページめ以降が一覧で、**記号が左端**に来る
  「0歳〜5歳／備考／区域／種類／施設名／所在地／電話番号／定員数／保育時間…」
- 空きは記号（○＝5人以上、△＝1〜4人、×＝空きなし、－＝受入不可）
- 区域は縦結合で、ブロックのいちばん上の行にだけ入る
- 凡例と施設種類の読み替えは各ページの本文にある
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split())


def extract(path):
    rows = []
    legend = []
    kinds = {}
    target = None
    as_of = None
    mark_counts = {}

    with pdfplumber.open(path) as pdf:
        for page_index, page in enumerate(pdf.pages):
            text = page.extract_text() or ""
            flat = "".join(text.split())
            z = str.maketrans("０１２３４５６７８９", "0123456789")

            if page_index == 0:
                m = re.search(r"【令和([０-９\d]+)年([０-９\d]+)月】入所希望者用", flat)
                if not m:
                    fail("対象月を読み取れませんでした")
                target = (int(m.group(1).translate(z)), int(m.group(2).translate(z)))
                m = re.search(r"「令和([０-９\d]+)年([０-９\d]+)月([０-９\d]+)日時点」", flat)
                if not m:
                    fail("基準日を読み取れませんでした")
                as_of = tuple(int(g.translate(z)) for g in m.groups())
                # 「「○」･･･5人以上の空き、「△」･･･1～4人の空き、…」
                for mark, label in re.findall(r"「(.)」[･・]+([^、。「■※]+)", flat):
                    if mark in "○◯〇△×✕－-":
                        legend.append({"mark": mark, "label": label})
            # 「保…保育所、認…認定こども園、小…小規模保育事業、事…事業所内保育事業」は
            # 2ページめ以降の見出しに入っている
            if not kinds:
                for code, label in re.findall(
                    r"(.)…([^、。※■\s]{2,12}?)(?=[、。※■]|受入可能|$)", flat
                ):
                    if len(code) == 1 and 2 <= len(label) <= 12:
                        kinds[code] = label

            if page_index == 0:
                continue

            # 記号は行の左端に並ぶ。右端の「休日保育」「一時保育」の欄にも○が入るので、
            # 行の先頭に続いている記号だけを数える
            for line in text.splitlines():
                stripped = " ".join(line.split())
                if not stripped or "人以上の空き" in stripped:
                    continue
                # 記号に「※」が付く行がある（「△ △※ × △ △ ×」）。
                # ※ を許さないと、そこで記号の並びが切れて数え落とす
                # （実際に △ を3個少なく数えて検算に落ちた）
                m = re.match(
                    r"^((?:[○◯〇△×✕－\-][※*＊]?\s+){0,5}[○◯〇△×✕－\-][※*＊]?)(?=\s)",
                    stripped,
                )
                if not m:
                    continue
                head = "".join(m.group(1).split())
                for mark in ("○", "◯", "〇", "△", "×", "✕"):
                    mark_counts[mark] = mark_counts.get(mark, 0) + head.count(mark)

            for table in page.find_tables():
                for row in table.extract():
                    rows.append([cell(c) for c in row])

    if not rows:
        fail("空き状況の表を取り出せませんでした")
    if len(legend) < 3:
        fail(f"記号の凡例を読み取れませんでした（{len(legend)}件）")
    if len(kinds) < 3:
        fail(f"施設種類の読み替えを取り出せませんでした（{len(kinds)}件）")

    return {
        "target": target,
        "asOf": as_of,
        "legend": legend,
        "kinds": kinds,
        "markCounts": {k: v for k, v in mark_counts.items() if v},
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
