"""
つくば市の「保育施設空き情報」PDFから表を抜き出す

実行: python scripts/tsukuba-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-tsukuba-vacancy.ts から呼ぶ）

## 表の作り
- 2ページ。どちらのページにも同じ見出しの表が1つずつ入っている
- 罫線が引いてあるので pdfplumber の extract_tables がそのまま17列で取れる
- 列: 園番号／区分／保育園名称／0〜5歳児（在籍数・募集数の2列ずつ）／合計（在籍数・募集数）
- 見出しは2行にまたがる（1行目に「0 歳児」、2行目に「在籍数」「募集数」）
- 設けていないクラスは「-」。在籍数・募集数の両方が「-」になる
- **いちばん下に合計の行がある**ので、列ごとの検算ができる
- 園番号は欠番がある（1,2,3,5,7…）ので数の検算には使わない
"""

import json
import re
import sys

import pdfplumber

COL_NO = 0
COL_KUBUN = 1
COL_NAME = 2
COL_AGE0 = 3
AGE_COUNT = 6
COL_TOTAL = COL_AGE0 + AGE_COUNT * 2
COLUMN_COUNT = COL_TOTAL + 2

TOTAL_ROW = "合計"
NO_CLASS = "-"
ZEN = str.maketrans("０１２３４５６７８９－―ー", "0123456789---")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def check_heads(head1, head2):
    """見出し2行の並びが思っているとおりか確かめる"""
    if cell(head1[COL_NAME]) != "保育園名称":
        fail(f"3列目の見出しが「{cell(head1[COL_NAME])}」になっています（保育園名称のはず）")
    for age in range(AGE_COUNT):
        column = COL_AGE0 + age * 2
        if cell(head1[column]) != f"{age}歳児":
            fail(f"{column + 1}列目の見出しが「{cell(head1[column])}」になっています（{age}歳児のはず）")
        if cell(head2[column]) != "在籍数" or cell(head2[column + 1]) != "募集数":
            fail(
                f"{age}歳児の見出しが「{cell(head2[column])}／{cell(head2[column + 1])}」に"
                "なっています（在籍数／募集数のはず）"
            )
    if cell(head1[COL_TOTAL]) != TOTAL_ROW:
        fail(f"合計の見出しが「{cell(head1[COL_TOTAL])}」になっています")
    if cell(head2[COL_TOTAL]) != "在籍数" or cell(head2[COL_TOTAL + 1]) != "募集数":
        fail("合計の見出しが在籍数／募集数になっていません")


def number(value, where):
    if value == NO_CLASS:
        return None
    if not re.fullmatch(r"\d+", value):
        fail(f"{where}: 数でも「{NO_CLASS}」でもありません: 「{value}」")
    return int(value)


def extract(path):
    as_of = None
    admission = None
    legend = None
    notes = []
    rows = []
    totals = None

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) < 1:
            fail("ページがありません")

        for page_index, page in enumerate(pdf.pages):
            text = page.extract_text() or ""
            flat = "".join(text.split()).translate(ZEN)

            if page_index == 0:
                m = re.search(r"令和(\d+)年(\d+)月(\d+)日現在", flat)
                if not m:
                    fail("基準日（令和N年M月D日現在）を読み取れませんでした")
                as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

                m = re.search(r"令和(\d+)年(\d+)月入所用", flat)
                if not m:
                    fail("何月入所用かを読み取れませんでした")
                admission = (int(m.group(1)), int(m.group(2)))

            # 区分の凡例（最後のページにある）
            m = re.search(r"※(公立：[^\n]+?)(?:\n|$)", text)
            if m:
                legend = m.group(1).strip()
            for line in text.split("\n"):
                line = line.strip()
                if line.startswith("・") and "募集数" in line:
                    notes.append(line.lstrip("・").strip())

            tables = page.extract_tables()
            if len(tables) != 1:
                fail(f"{page_index + 1}ページ目の表が{len(tables)}個あります（1個のはず）")
            table = tables[0]
            if len(table) < 3:
                fail(f"{page_index + 1}ページ目の表の行が{len(table)}しかありません")
            for row in table:
                if len(row) != COLUMN_COUNT:
                    fail(
                        f"{page_index + 1}ページ目に{len(row)}列の行があります"
                        f"（{COLUMN_COUNT}列のはず）"
                    )
            check_heads(table[0], table[1])

            for row in table[2:]:
                values = [cell(c) for c in row]
                no = values[COL_NO]
                name = values[COL_NAME]

                if no == TOTAL_ROW:
                    if totals is not None:
                        fail("合計の行が2つあります")
                    if name:
                        fail(f"合計の行に施設名が入っています: 「{name}」")
                    totals = {
                        "enrolled": [
                            number(values[COL_AGE0 + a * 2], "合計行") for a in range(AGE_COUNT)
                        ],
                        "vacancy": [
                            number(values[COL_AGE0 + a * 2 + 1], "合計行") for a in range(AGE_COUNT)
                        ],
                        "totalEnrolled": number(values[COL_TOTAL], "合計行"),
                        "totalVacancy": number(values[COL_TOTAL + 1], "合計行"),
                    }
                    continue

                if not no and not name:
                    continue
                if totals is not None:
                    fail(f"合計の行より後に施設の行があります: 「{name}」")
                if not re.fullmatch(r"\d+", no):
                    fail(f"園番号が数ではありません: 「{no}」（{name}）")
                if not name:
                    fail(f"施設名が空の行があります（園番号 {no}）")

                where = f"{name}（園番号 {no}）"
                rows.append(
                    {
                        "no": int(no),
                        "kubun": values[COL_KUBUN],
                        "name": name,
                        "enrolled": [
                            number(values[COL_AGE0 + a * 2], where) for a in range(AGE_COUNT)
                        ],
                        "vacancy": [
                            number(values[COL_AGE0 + a * 2 + 1], where) for a in range(AGE_COUNT)
                        ],
                        "totalEnrolled": number(values[COL_TOTAL], where),
                        "totalVacancy": number(values[COL_TOTAL + 1], where),
                    }
                )

    if not rows:
        fail("施設の行を取り出せませんでした")
    if totals is None:
        fail("いちばん下の合計の行が見つかりません")
    if legend is None:
        fail("区分の凡例（※公立：…）が見つかりません")

    return {
        "asOf": as_of,
        "admission": admission,
        "legend": legend,
        "notes": notes,
        "rows": rows,
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
