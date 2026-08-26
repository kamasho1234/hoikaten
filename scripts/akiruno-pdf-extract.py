"""
あきる野市の「保育施設受入可能数」PDFから表を抜き出す

実行: python scripts/akiruno-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-akiruno-vacancy.ts から呼ぶ）

## 表の作り
- 1ページに区分ごとの表が4つ（保育施設／小規模保育施設／認定こども園／その他）
- いちばん左に「公立」「私立」といった区分が縦書きで入っているが、
  **その区分がどの行からどの行までを指すのかを機械的に決められない**
  （罫線に太さの差がなく、セルも結合されていない）。
  誤った区分を出すより載せないほうがよいので、区分は取り込まない
- 表ごとに「小 計」の行があり、いちばん下に全体の「合 計」の表がある。両方を検算に使う
- 施設名も「小 計」も複数の列に割れているので、年齢の列より左をつないで名前にする
- 年齢の列は表によって違う（小規模保育施設は0〜2歳だけ）
- **「―」はそのクラスがないことを表す**（受入可能数0とは別）
"""

import json
import re
import sys

import pdfplumber

COL_KIND = 0
COL_NAME = 1
AGE_COUNT = 6
# クラスがないことを表す記号（全角ダッシュ・ハイフン・長音がまざる）
NONE_MARKS = "―－—‐-ー"
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def extract(path):
    groups = []
    total = None

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        text = page.extract_text() or ""
        flat = "".join(text.split()).translate(ZEN)

        m = re.search(r"令和(\d+)年(\d+)月(\d+)日現在", flat)
        if not m:
            fail("「令和N年M月D日現在」を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        m = re.search(r"令和(\d+)年(\d+)月保育施設受入可能数", flat)
        if not m:
            fail("「令和N年M月保育施設受入可能数」を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        tables = page.find_tables()
        if not tables:
            fail("表が見つかりません")

        for index, table in enumerate(tables):
            extracted = table.extract()

            # 見出しは2段（1段目に「クラス」、2段目に年齢）
            head_index = None
            ages = {}
            for row_index, row in enumerate(extracted[:3]):
                values = [cell(c) for c in row]
                found = {}
                for column, value in enumerate(values):
                    m = re.fullmatch(r"(\d)歳", value)
                    if m:
                        found[int(m.group(1))] = column
                if found:
                    head_index = row_index
                    ages = found
                    break
            if head_index is None:
                fail(f"{index + 1}つ目の表に年齢の見出しが見つかりません")

            first_age_col = min(ages.values())

            rows = []
            subtotal = None
            grand = None
            for row_index in range(head_index + 1, len(extracted)):
                values = list(map(cell, extracted[row_index]))
                # 施設名も「小 計」も複数の列に割れているのでつなぐ
                name = "".join(values[COL_NAME:first_age_col])
                if not name:
                    continue

                counts = []
                for age in range(AGE_COUNT):
                    if age not in ages:
                        counts.append(None)
                        continue
                    value = values[ages[age]]
                    if value == "" or value in NONE_MARKS:
                        counts.append(None)
                        continue
                    if not re.fullmatch(r"\d+", value):
                        fail(f"{name}: {age}歳が数字ではありません（「{value}」）")
                    counts.append(int(value))

                if name == "小計":
                    subtotal = counts
                    continue
                if name == "合計":
                    grand = counts
                    continue
                if all(c is None for c in counts):
                    fail(f"{name}: 全ての年齢が空らんです")
                rows.append({"name": name, "counts": counts})

            if grand is not None and not rows:
                # いちばん下の「合計」だけの表
                if total is not None and total != grand:
                    fail("「合計」の行が2つあって中身が違います")
                total = grand
                continue
            if not rows:
                continue
            if subtotal is None:
                fail(f"{index + 1}つ目の表に「小 計」の行がありません")
            groups.append({"rows": rows, "subtotal": subtotal})

    if not groups:
        fail("施設の行を取り出せませんでした")

    if total is None:
        fail("いちばん下の「合計」の行が見つかりません")

    return {"asOf": as_of, "target": target, "total": total, "groups": groups}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
