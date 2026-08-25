"""
米子市の「保育施設等入所可能児童数一覧」PDFから表を抜き出す

実行: python scripts/yonago-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-yonago-vacancy.ts から呼ぶ）

## 表の作り
- 2ページ。どちらのページにも同じ見出しの表がある
  （区分／公私／施設名／0歳児〜5歳児／備考）
- 区分（保育所・認定こども園・小規模保育事業所・事業所内保育事業所）と
  公私（公立・私立）は**結合セル**で、グループの先頭の行にだけ入る
- 空きは人数（数値）。空らんはない
- 施設名は1文字ずつ間隔をあけて印字されるので、セルの値から空白を落とす
- 備考に「0歳児は◯月◯日以降に入所可能」などの条件が書かれることがある
"""

import json
import re
import sys

import pdfplumber

COL_KUBUN = 0
COL_KOSHI = 1
COL_NAME = 2
COL_AGE0 = 3
AGE_COUNT = 6
COL_NOTE = COL_AGE0 + AGE_COUNT
COLUMN_COUNT = COL_NOTE + 1

ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def extract(path):
    as_of = None
    target = None
    notes = []
    rows = []
    printed_sum = 0
    printed_count = 0

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) < 1:
            fail("ページがありません")

        for page_index, page in enumerate(pdf.pages):
            text = page.extract_text() or ""
            flat = "".join(text.split()).translate(ZEN)

            if as_of is None:
                m = re.search(r"令和(\d+)年(\d+)月(\d+)日現在", flat)
                if m:
                    as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))
            if target is None:
                # 「令和８年10月１日からの入所可能な児童数」
                m = re.search(r"令和(\d+)年(\d+)月(\d+)日からの入所可能", flat)
                if m:
                    target = (int(m.group(1)), int(m.group(2)))

            if not notes:
                for line in text.splitlines():
                    line = line.strip()
                    if line.startswith("令和") and "入所可能な児童数" in line:
                        notes.append(line)
                    elif line.startswith("年齢は、") or line.startswith("利用調整により"):
                        notes.append(line)

            tables = page.find_tables()
            if not tables:
                continue
            table = tables[0]
            extracted = table.extract()
            head = [cell(c) for c in extracted[0]]
            if len(head) != COLUMN_COUNT:
                fail(
                    f"{page_index + 1}ページ目の列数が{len(head)}です（{COLUMN_COUNT}列のはず）"
                )
            if head[COL_KUBUN] != "区分" or head[COL_NAME] != "施設名":
                fail(f"{page_index + 1}ページ目の見出しが想定と違います: {head[:4]}")
            for age in range(AGE_COUNT):
                if head[COL_AGE0 + age] != f"{age}歳児":
                    fail(f"{page_index + 1}ページ目の年齢の見出しが想定と違います: {head}")

            kubun_carry = ""
            koshi_carry = ""
            for values in (list(map(cell, r)) for r in extracted[1:]):
                name = values[COL_NAME]
                if not name:
                    continue
                if values[COL_KUBUN]:
                    kubun_carry = values[COL_KUBUN]
                    # 区分が変わったら公私も引き継がない
                    koshi_carry = ""
                if values[COL_KOSHI]:
                    koshi_carry = values[COL_KOSHI]
                if not kubun_carry:
                    fail(f"{name}: 区分が分かりません")

                counts = []
                for age in range(AGE_COUNT):
                    value = values[COL_AGE0 + age]
                    if not re.fullmatch(r"\d+", value):
                        fail(f"{name}: {age}歳児の値を読めません（「{value}」）")
                    counts.append(int(value))

                rows.append(
                    {
                        "kubun": kubun_carry,
                        "koshi": koshi_carry,
                        "name": name,
                        "counts": counts,
                        "note": values[COL_NOTE],
                    }
                )

            # 年齢の欄に印字されている数字の合計（検算用）
            ranges = {}
            for row in table.rows:
                for index, box in enumerate(row.cells):
                    if box is not None and index not in ranges:
                        ranges[index] = (box[0], box[2])
            if COL_AGE0 not in ranges or COL_AGE0 + AGE_COUNT - 1 not in ranges:
                fail(f"{page_index + 1}ページ目の年齢の列のx座標を取れませんでした")
            head_bottom = table.rows[0].bbox[3]
            for word in page.crop(
                (
                    ranges[COL_AGE0][0],
                    head_bottom,
                    ranges[COL_AGE0 + AGE_COUNT - 1][1],
                    table.bbox[3],
                )
            ).extract_words():
                t = cell(word["text"])
                if re.fullmatch(r"\d+", t):
                    printed_sum += int(t)
                    printed_count += 1

    if not rows:
        fail("施設の行を取り出せませんでした")
    if as_of is None:
        fail("「令和N年M月D日現在」を読み取れませんでした")
    if target is None:
        fail("「令和N年M月D日からの入所可能」を読み取れませんでした")

    return {
        "asOf": as_of,
        "target": target,
        "notes": notes,
        "printed": {"sum": printed_sum, "count": printed_count},
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
