"""
箕面市の「保育施設の空き状況」PDFから表を抜き出す

実行: python scripts/minoh-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-minoh-vacancy.ts から呼ぶ）

## 表の作り
- 4ページ。**地区ごとに表が分かれる**（市内北部／西部／中部／東部）。
  1ページ目は注記と北部の表が同じページにあるので、1ページ目も読む
- 7列（施設名／0歳〜5歳）
- 空きは記号（〇＝3名以上、△＝1・2名、×＝空きなし）。凡例は1ページ目にある
- **空らんはその年齢の受け入れがないこと**。施設名に受入年齢が書いてあるので照合できる
  （「（0歳から2歳のみ）」なら3〜5歳が空らん）
"""

import json
import re
import sys

import pdfplumber

COL_NAME = 0
COL_AGE0 = 1
AGE_COUNT = 6
COLUMN_COUNT = COL_AGE0 + AGE_COUNT

MARKS = "○◯〇△×✕"
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def expected_blanks(name):
    """
    施設名に書いてある受入年齢から、空らんになるはずの歳を出す。
    書かれていなければ None（照合しない）
    """
    plain = name.translate(ZEN)
    m = re.search(r"(\d)歳から(\d)歳のみ", plain)
    if m:
        low, high = int(m.group(1)), int(m.group(2))
        return [a for a in range(AGE_COUNT) if a < low or a > high]
    m = re.search(r"(\d)歳から", plain)
    if m:
        low = int(m.group(1))
        return [a for a in range(AGE_COUNT) if a < low]
    return None


def extract(path):
    as_of = None
    legend = []
    wards = []
    rows = []
    mark_counts = {}
    blanks = 0
    mismatches = []

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) < 1:
            fail("ページがありません")

        for page_index, page in enumerate(pdf.pages):
            text = page.extract_text() or ""
            flat = "".join(text.split()).translate(ZEN)

            if as_of is None:
                m = re.search(r"空き状況（令和(\d+)年(\d+)月(\d+)日現在）", flat)
                if m:
                    as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

            if not legend:
                # 「〇・・・３名以上空き枠がある保育施設」
                for line in text.splitlines():
                    m = re.match(rf"^([{MARKS}])\s*・{{2,}}\s*(.+)$", line.strip())
                    if m:
                        legend.append({"mark": m.group(1), "label": m.group(2).strip()})

            # このページの地区（表の見出しとして本文にある）
            ward = None
            for line in text.splitlines():
                line = line.strip()
                if line.startswith("市内") and line.endswith("の保育施設"):
                    ward = line
                    break

            for table in page.find_tables():
                extracted = table.extract()
                if len(extracted[0]) != COLUMN_COUNT:
                    continue
                if ward is None:
                    fail(f"{page_index + 1}ページ目の地区の見出しが見つかりません")
                if ward not in wards:
                    wards.append(ward)

                for row_index in range(len(extracted)):
                    values = [cell(c) for c in extracted[row_index]]
                    name = values[COL_NAME]
                    if not name or name == "施設名":
                        continue

                    marks = []
                    empty_ages = []
                    for age in range(AGE_COUNT):
                        value = values[COL_AGE0 + age]
                        if not value:
                            blanks += 1
                            empty_ages.append(age)
                            marks.append(None)
                            continue
                        marks.append(value)

                    # 施設名に書いてある受入年齢と、空らんの位置が合うか
                    expected = expected_blanks(name)
                    if expected is not None and empty_ages != expected:
                        mismatches.append(
                            {"name": name, "blanks": empty_ages, "expected": expected}
                        )

                    rows.append({"ward": ward, "name": name, "marks": marks})

                # 記号の数。歳の欄のx座標と表の範囲で切り出す
                ranges = {}
                for row in table.rows:
                    for index, box in enumerate(row.cells):
                        if box is not None and index not in ranges:
                            ranges[index] = (box[0], box[2])
                if COL_AGE0 not in ranges or COL_AGE0 + AGE_COUNT - 1 not in ranges:
                    fail("歳の列のx座標を取れませんでした")
                for word in page.crop(
                    (
                        ranges[COL_AGE0][0],
                        table.bbox[1],
                        ranges[COL_AGE0 + AGE_COUNT - 1][1],
                        table.bbox[3],
                    )
                ).extract_words():
                    for mark in MARKS:
                        n = word["text"].count(mark)
                        if n:
                            mark_counts[mark] = mark_counts.get(mark, 0) + n

    if not rows:
        fail("施設の行を取り出せませんでした")
    if as_of is None:
        fail("基準日（空き状況（令和N年M月D日現在））を読み取れませんでした")
    if not legend:
        fail("記号の凡例が見つかりません")
    if mismatches:
        fail(
            "施設名に書いてある受入年齢と空らんの位置が合いません: "
            + "、".join(f"{m['name']}（空らん{m['blanks']} / 想定{m['expected']}）" for m in mismatches[:3])
        )

    return {
        "asOf": as_of,
        "legend": legend,
        "wards": wards,
        "markCounts": {k: v for k, v in mark_counts.items() if v},
        "blanks": blanks,
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
