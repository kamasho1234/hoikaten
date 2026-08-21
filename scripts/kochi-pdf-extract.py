"""
高知市の「教育・保育施設一覧表（欠員補充状況一覧表）」PDFから表を抜き出す

実行: python scripts/kochi-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-kochi-vacancy.ts から呼ぶ）

## 表の作り
- 4ページ。29列（地区／No.／施設名／施設種別／住所／電話番号／経営主体／
  保育実施年齢／受入可能月齢／0歳〜5歳／備考／…）
- 欠員は人数。空欄は0人で、保育実施年齢の外はそもそもクラスがない
- 地区は縦結合で、ブロックのいちばん上の行にだけ入る
- 見出しは2行（1行めが大見出し、2行めに0歳〜5歳）

## 検算のための持ち出し
- 0歳〜5歳の欄のx座標の中に入っている数字を、表とは別に語の単位で拾って合計する。
  列がずれて読めていたらこの合計と合わなくなる
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 29
COL_AGE0 = 9


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split())


def extract(path):
    rows = []
    target = None
    as_of = None
    word_sum = 0

    with pdfplumber.open(path) as pdf:
        for page_index, page in enumerate(pdf.pages):
            text = page.extract_text() or ""
            flat = "".join(text.split())
            z = str.maketrans("０１２３４５６７８９", "0123456789")

            if page_index == 0:
                m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月からの利用", flat.translate(z))
                if not m:
                    fail("対象月を読み取れませんでした")
                target = (int(m.group(1)), int(m.group(2)))
                m = re.search(
                    r"最終更新日：令和([０-９\d]+)年([０-９\d]+)月([０-９\d]+)日", flat.translate(z)
                )
                if not m:
                    fail("最終更新日を読み取れませんでした")
                as_of = tuple(int(g) for g in m.groups())

            for table in page.find_tables():
                extracted = table.extract()
                if len(extracted[0]) != EXPECTED_COLUMNS:
                    fail(f"{page_index + 1}ページめの列数が{len(extracted[0])}になっています")

                # 見出しの2行めから0歳〜5歳の欄のx座標を取る
                header = table.rows[1].cells[COL_AGE0 : COL_AGE0 + AGE_COUNT]
                if any(c is None for c in header):
                    fail(f"{page_index + 1}ページめの歳児の見出しを読み取れませんでした")
                labels = [cell(c) for c in extracted[1][COL_AGE0 : COL_AGE0 + AGE_COUNT]]
                if labels != [f"{i}歳" for i in range(AGE_COUNT)]:
                    fail(f"{page_index + 1}ページめの歳児の見出しが{labels}になっています")
                x0, x1 = header[0][0], header[-1][2]

                # 行ごとに切ると結合された行が重なって二重に数えてしまうので、
                # 見出しの下から表の終わりまでをひと続きに切る
                top = table.rows[1].bbox[3]
                for word in page.crop((x0, top, x1, table.bbox[3])).extract_words():
                    if re.fullmatch(r"\d+", word["text"]):
                        word_sum += int(word["text"])

                for row_index, row in enumerate(extracted):
                    if row_index < 2:
                        continue
                    values = [cell(c) for c in row]
                    if not values[2]:
                        continue
                    rows.append(values)

    if not rows:
        fail("欠員補充状況の表を取り出せませんでした")

    return {
        "target": target,
        "asOf": as_of,
        "wordSum": word_sum,
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
