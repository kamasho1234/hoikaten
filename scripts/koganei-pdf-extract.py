"""
小金井市の「認可保育施設 募集状況」PDFから表を抜き出してJSONで返す

実行: python scripts/koganei-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-koganei-vacancy.ts から呼ぶ）

## 表の作り
- 1ページに表が1つ。「設置主体／施設区分／施設（事業者）／0歳児〜5歳児」の9列
- 設置主体（公立・私立）と施設区分（特定保育施設など）は縦書きで、変わる行にだけ値が入る
- **空欄はそのクラスを設けていないことを表す**。市立くりのみ保育園は4・5歳クラス、
  市立さくら保育園は3〜5歳クラスしかなく、十八・二十コスモ保育園と
  アンジェリカ東小金井保育園、にじいろ保育園武蔵小金井は1歳クラスからの園
  （いずれも公式の施設ページ・一覧の注記で確認）
- 末尾に合計行がある
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
    as_of = set()
    target = set()
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            flat = "".join((page.extract_text() or "").translate(Z).split())
            m = re.search(r"募集状況（(\d+)月入所）", flat)
            if m:
                target.add(int(m.group(1)))
            m = re.search(r"（令和(\d+)年(\d+)月(\d+)日現在）", flat)
            if m:
                as_of.add((int(m.group(1)), int(m.group(2)), int(m.group(3))))
            for table_obj in page.find_tables():
                rows = [[cell(c) for c in r] for r in table_obj.extract()]
                if len(rows) < 2:
                    continue
                if not any("歳児" in h for h in rows[0]):
                    continue
                tables.append({"head": rows[0], "rows": rows[1:]})
    if not tables:
        fail("募集状況の表を取り出せませんでした")
    return {"asOf": sorted(as_of), "target": sorted(target), "tables": tables}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
