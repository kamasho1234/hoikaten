"""
和光市の「選考募集人数」PDFから表を抜き出してJSONで返す

実行: python scripts/wako-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-wako-vacancy.ts から呼ぶ）

## 表の作り
- 1ページに表が2つ。1つめが0〜2歳児、2つめが3〜5歳児
- **1つの表に年齢が3つ横に並ぶ**。年齢ごとに
  「施設名／申込者数(第1希望)／申込者数(合計)／募集人数」の4列で、
  年齢と年齢の間に空の列が1つ入る
- 当サイトが載せるのは**募集人数**（＝その月の選考で受け入れる枠）
- 「保育園計」「小規模計」「市内合計」の行があるので、積み上げと突き合わせられる
- 施設名の欄が空の行は、その年齢にその施設が無いことを表す
"""

import json
import re
import sys

import pdfplumber

# 1つの年齢が使う列数（施設名・第1希望・合計・募集人数）
BLOCK = 4
AGE_PER_TABLE = 3
TOTAL_ROWS = ("保育園計", "小規模計", "市内合計", "認定こども園計", "合計")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    return "".join(str(s or "").split())


def number(text):
    t = cell(text).translate(str.maketrans("０１２３４５６７８９", "0123456789"))
    return int(t) if re.fullmatch(r"\d+", t) else None


def extract(path):
    ages = {}
    totals = {}
    as_of = None
    target = None

    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            flat = "".join((page.extract_text() or "").split())
            if as_of is None:
                m = re.search(r"令和(\d+)年(\d+)月(\d+)日現在", flat)
                if m:
                    as_of = [int(g) for g in m.groups()]
            if target is None:
                m = re.search(r"令和(\d+)年(\d+)月選考募集人数", flat)
                if m:
                    target = [int(m.group(1)), int(m.group(2))]

            for table in page.find_tables():
                rows = [[cell(c) for c in r] for r in table.extract()]
                if not rows:
                    continue
                head = rows[0]
                # 「０歳児」「1歳児」…の見出しが3つ並ぶ表だけを読む
                starts = []
                for i, h in enumerate(head):
                    m = re.fullmatch(r"([０-９\d])歳児", h)
                    if m:
                        starts.append((i, int(m.group(1).translate(str.maketrans("０１２３４５", "012345")))))
                if len(starts) != AGE_PER_TABLE:
                    continue
                for col, age in starts:
                    if head[col + 3] != "募集人数":
                        fail(f"{age}歳児の欄に「募集人数」がありません: {head[col : col + 4]}")
                    for row in rows[1:]:
                        name = row[col]
                        if not name or name.endswith("こども園") and name == "保育園・認定こども園":
                            continue
                        if name in ("保育園・認定こども園", "小規模保育事業所", "事業所内保育事業所"):
                            continue
                        value = number(row[col + 3])
                        if name in TOTAL_ROWS:
                            if value is not None:
                                totals.setdefault(age, {})[name] = value
                            continue
                        if value is None:
                            # 申込者数だけがあって募集人数が空、という行は無いはず
                            if any(cell(row[col + k]) for k in (1, 2, 3)):
                                fail(f"{name}: {age}歳児の募集人数を読めません（「{row[col + 3]}」）")
                            continue
                        ages.setdefault(name, {})[age] = value

    if as_of is None:
        fail("「令和N年M月D日現在」を読み取れませんでした")
    if target is None:
        fail("「令和N年M月選考募集人数」を読み取れませんでした")
    if not ages:
        fail("施設の行を取り出せませんでした")
    return {
        "asOf": as_of,
        "target": target,
        "rows": [{"name": n, "values": v} for n, v in ages.items()],
        "totals": totals,
    }


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
