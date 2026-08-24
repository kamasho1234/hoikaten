"""
春日井市の「入園受入可能人数（園種別）」PDFから表を抜き出す

実行: python scripts/kasugai-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-kasugai-vacancy.ts から呼ぶ）

## 表の作り
- 3ページ・12列（園種別／園番／園名／中学校区／所在地／対象最小年齢／0歳児〜5歳児）
- 空きは記号（〇＝5人以上の空き、△＝4名以下の空き、×＝空きなし）
- **注記が同じセルに入って罫線が途切れ、行が融合することがある**（西部保育園）。
  セルの抽出に頼らず、**行の中でいちばん上のかたまりだけを座標で拾う**ことで外す
- そのクラスがない欄には斜線。記号も斜線もない欄も少しだけある
- 園種別の欄は縦結合なので引き継ぐ
"""

import json
import re
import sys

import pdfplumber

COL_KUBUN = 0
COL_NO = 1
COL_NAME = 2
COL_SCHOOL = 3
COL_AGE0 = 6
AGE_COUNT = 6
COLUMN_COUNT = COL_AGE0 + AGE_COUNT

MARKS = "〇○◯△×✕"
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")
# 同じ行とみなす縦のずれ
SAME_LINE = 4.0


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def has_slash(page, box):
    return any(
        box[0] - 1 <= c["x0"]
        and c["x1"] <= box[2] + 1
        and box[1] - 1 <= c["top"]
        and c["bottom"] <= box[3] + 1
        for c in page.curves
    )


def column_ranges(table):
    """列ごとのx範囲を、罫線のある行から集める"""
    ranges = {}
    for row in table.rows:
        for index, box in enumerate(row.cells):
            if box is not None and index not in ranges:
                ranges[index] = (box[0], box[2])
    return ranges


def extract(path):
    target = None
    legend = []
    notes = []
    rows = []
    mark_counts = {}
    slashes = 0
    missing = []
    unassigned = []
    printed = 0
    kubun_carry = ""

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) < 1:
            fail("ページがありません")

        for page_index, page in enumerate(pdf.pages):
            flat = "".join((page.extract_text() or "").split()).translate(ZEN)

            if target is None:
                m = re.search(r"令和(\d+)年(\d+)月入園受入可能人数", flat)
                if m:
                    target = (int(m.group(1)), int(m.group(2)))

            if not legend:
                # 「凡例：〇=５人以上の空き △＝４名以下の空き ×＝空きなし」
                for line in (page.extract_text() or "").splitlines():
                    if "凡例" not in line:
                        continue
                    for mark, label in re.findall(
                        rf"([{MARKS}])\s*[=＝]\s*(.+?)(?=\s*[{MARKS}]\s*[=＝]|$)", line
                    ):
                        legend.append({"mark": mark, "label": label.strip()})
                    break

            for line in (page.extract_text() or "").splitlines():
                line = line.strip()
                if (
                    line.startswith("表中の年齢")
                    or line.startswith("受入状況")
                    or line.startswith("特別支援保育")
                ):
                    if line not in notes:
                        notes.append(line)

            tables = page.find_tables()
            if not tables:
                fail(f"{page_index + 1}ページ目に表がありません")
            table = tables[0]
            extracted = table.extract()
            heads = [cell(c) for c in extracted[0]]
            if len(heads) != COLUMN_COUNT:
                fail(f"列数が{len(heads)}になっています（{COLUMN_COUNT}列のはず）")
            if heads[COL_NAME] != "園名":
                fail(f"3列目の見出しが「{heads[COL_NAME]}」になっています（園名のはず）")
            for age in range(AGE_COUNT):
                if heads[COL_AGE0 + age] != f"{age}歳児":
                    fail(f"{age}歳児の見出しが「{heads[COL_AGE0 + age]}」になっています")

            ranges = column_ranges(table)
            for age in range(AGE_COUNT):
                if COL_AGE0 + age not in ranges:
                    fail(f"{age}歳児の列のx範囲を取れませんでした")

            for row_index, row in enumerate(table.rows):
                if row_index == 0:
                    continue
                values = [cell(c) for c in extracted[row_index]]
                if values[COL_KUBUN] and values[COL_KUBUN] != "園種別":
                    kubun_carry = values[COL_KUBUN]

                words = page.crop(row.bbox).extract_words()
                if not words:
                    continue

                # 歳児の欄に入っている記号。そのy位置をこの行の基準にする
                age_x0 = ranges[COL_AGE0][0]
                age_x1 = ranges[COL_AGE0 + AGE_COUNT - 1][1]
                in_age_columns = [
                    w
                    for w in words
                    if age_x0 - 1 <= w["x0"]
                    and w["x1"] <= age_x1 + 1
                    and any(ch in MARKS for ch in w["text"])
                ]
                base_top = (
                    min(w["top"] for w in in_age_columns)
                    if in_age_columns
                    else min(w["top"] for w in words)
                )
                # 行の中でいちばん上のかたまりだけを使う（注記や2行目の所在地を外すため）
                line_words = [w for w in words if abs(w["top"] - base_top) <= SAME_LINE]
                mark_words = [w for w in in_age_columns if abs(w["top"] - base_top) <= SAME_LINE]

                def pick(column):
                    x0, x1 = ranges[column]
                    return "".join(
                        w["text"]
                        for w in sorted(line_words, key=lambda w: w["x0"])
                        if x0 - 1 <= w["x0"] and w["x1"] <= x1 + 1
                    ).strip()

                name = cell(pick(COL_NAME))
                if not name or name == "園名":
                    continue
                if not kubun_carry:
                    fail(f"{name}: 園種別が分かりません")

                printed += len(mark_words)
                assigned = 0
                marks = []
                for age in range(AGE_COUNT):
                    column = COL_AGE0 + age
                    x0, x1 = ranges[column]
                    found = [
                        w["text"]
                        for w in line_words
                        if x0 - 1 <= w["x0"]
                        and w["x1"] <= x1 + 1
                        and any(ch in MARKS for ch in w["text"])
                    ]
                    if len(found) > 1:
                        fail(f"{name}: {age}歳児の欄に記号が{len(found)}個あります（{found}）")
                    if found:
                        mark = found[0].strip()
                        mark_counts[mark] = mark_counts.get(mark, 0) + 1
                        assigned += 1
                        marks.append(mark)
                        continue
                    box = row.cells[column]
                    if box is None:
                        box = (x0, row.bbox[1], x1, row.bbox[3])
                    if has_slash(page, box):
                        slashes += 1
                        marks.append(None)
                    else:
                        # 記号も斜線もない。意味が分からないので記録して null にする
                        missing.append({"name": name, "age": age})
                        marks.append(None)

                if assigned < len(mark_words):
                    # 記号が列の境目に印字されていて、どの歳児のものか決められない
                    for word in mark_words:
                        center = (word["x0"] + word["x1"]) / 2
                        if not any(
                            ranges[COL_AGE0 + a][0] - 1 <= word["x0"]
                            and word["x1"] <= ranges[COL_AGE0 + a][1] + 1
                            for a in range(AGE_COUNT)
                        ):
                            unassigned.append(
                                {"name": name, "mark": word["text"].strip(), "x": round(center, 1)}
                            )

                rows.append(
                    {
                        "kubun": kubun_carry,
                        "no": cell(pick(COL_NO)),
                        "name": name,
                        "school": cell(pick(COL_SCHOOL)),
                        "marks": marks,
                    }
                )

    if not rows:
        fail("施設の行を取り出せませんでした")
    if target is None:
        fail("何月の受入可能人数かを読み取れませんでした")
    if not legend:
        fail("記号の凡例が見つかりません")

    return {
        "target": target,
        "legend": legend,
        "notes": notes,
        "markCounts": mark_counts,
        "slashes": slashes,
        "missing": missing,
        "unassigned": unassigned,
        "printed": printed,
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
