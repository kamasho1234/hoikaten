"""
和光市の「選考募集人数」PDFから表を抜き出してJSONで返す

実行: python scripts/wako-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-wako-vacancy.ts から呼ぶ）

## 表の作り（令和8年11月選考分から。それまでは0〜2歳と3〜5歳の表が2つに分かれていた）
- 1ページに表が1つ。1行目に「０歳児」〜「５歳児」の見出しが3列おきに並び、
  2行目がその下の「申込者数(第1希望)／申込者数(合計)／募集人数」
- 施設名は「施設名」の列。その左の列は「保育園・認定こども園」「小規模保育事業所」の
  縦書きの類型（セルが結合されているので一部の行にしか出ない）
- 当サイトが載せるのは**募集人数**（＝その月の選考で受け入れる枠）
- 「保育園・認定こども園 計」「小規模 計」「市内合計」の行があるので、積み上げと突き合わせられる
- 申込者数も募集人数も空の欄は、その年齢にその施設のクラスが無いことを表す
- 「令和N年M月D日現在」の文言は無くなった。時点は呼び出し側で資料の公開日（Last-Modified）にする
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
TOTAL_ROWS = ("保育園計", "小規模計", "市内合計", "認定こども園計", "保育園・認定こども園計", "合計")


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
                if len(rows) < 3:
                    continue
                head, sub = rows[0], rows[1]
                # 1行目に「０歳児」…が並ぶ表だけを読む
                starts = []
                for i, h in enumerate(head):
                    m = re.fullmatch(r"([０-９\d])歳児", h)
                    if m:
                        starts.append((i, int(m.group(1).translate(str.maketrans("０１２３４５", "012345")))))
                if len(starts) != AGE_COUNT:
                    continue
                name_cols = [i for i, h in enumerate(sub) if h == "施設名"]
                if len(name_cols) != 1:
                    fail(f"「施設名」の列が見つかりません: {sub}")
                name_col = name_cols[0]
                for col, age in starts:
                    if sub[col + 2] != "募集人数":
                        fail(f"{age}歳児の欄に「募集人数」がありません: {sub[col : col + 3]}")
                for row in rows[2:]:
                    # 「市内合計」は施設名の列ではなく左の類型の列に書かれている
                    name = row[name_col] or row[name_col - 1]
                    if not name or name in ("保育園・認定こども園", "小規模保育事業所", "事業所内保育事業所"):
                        continue
                    for col, age in starts:
                        value = number(row[col + 2])
                        if name in TOTAL_ROWS:
                            if value is not None:
                                totals.setdefault(age, {})[name] = value
                            continue
                        if value is None:
                            # 申込者数だけがあって募集人数が空、という行は無いはず
                            if any(row[col + k] for k in (0, 1, 2)):
                                fail(f"{name}: {age}歳児の募集人数を読めません（「{row[col + 2]}」）")
                            continue
                        ages.setdefault(name, {})[age] = value

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
