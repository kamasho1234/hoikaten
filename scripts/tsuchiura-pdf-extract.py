"""
土浦市の「保育所・認定こども園等 受入見込児童数」PDFから表を抜き出す

実行: python scripts/tsuchiura-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-tsuchiura-vacancy.ts から呼ぶ）

## 表の作り
- 1ページに小さな表がタイル状に並ぶ。区分ごとに別の表になっていて、
  それぞれの上に「■公立保育所」「■私立保育所（園）」「■認定こども園」
  「■地域型保育」「■企業主導型」の見出しがある。
  表と見出しは座標で結びつける（同じ列にあって、表のすぐ上にあるもの）
- 年齢の列は表によって違う（地域型保育は0〜2歳だけ）。見出しの「N歳」で決める
- 認定こども園の表だけ列が2つ多い。
  いちばん左が縦書きの区分（幼保連携型など）、次が施設名、その次が認定区分「（保育）」
- 空らんは、そのクラスがない施設のもの。
  **クラスのない年齢の欄に、注記の文が重ねて印字されていることがある**ので、
  数字でない値はその欄を空らんとして扱い、注記として別に返す
- **企業主導型は「直接各施設にお申込みください」とあり市の入所調整の対象外**なので、
  取り込まずに件数だけ返す
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")
# 市の入所調整の対象外なので取り込まない
SKIP_HEADING = "企業主導型"


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def heading_for(table, headings):
    """表のすぐ上にある見出しを返す（同じ列に並んでいるものだけを見る）"""
    x0, top = table.bbox[0], table.bbox[1]
    above = [h for h in headings if h["top"] < top and abs(h["x0"] - x0) < 20]
    if not above:
        return None
    return max(above, key=lambda h: h["top"])


def extract(path):
    notes = []
    overlaid = []
    groups = []
    skipped = 0

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        text = page.extract_text() or ""
        flat = "".join(text.split()).translate(ZEN)

        m = re.search(r"[（(]R(\d+)\.(\d+)\.(\d+)現在[）)]", flat)
        if not m:
            fail("「（R8.8.18現在）」の形の日付を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        m = re.search(r"令和(\d+)年(\d+)月入所用", flat)
        if not m:
            fail("「令和N年M月入所用」を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        for line in text.splitlines():
            line = line.strip()
            if line.startswith("◎") and len(line) > 8:
                notes.append(line.lstrip("◎").strip())

        headings = [
            {"text": cell(w["text"]).lstrip("■"), "x0": w["x0"], "top": w["top"]}
            for w in page.extract_words()
            if w["text"].startswith("■")
        ]
        if not headings:
            fail("「■」で始まる見出しが見つかりません")

        tables = page.find_tables()
        if not tables:
            fail("表が見つかりません")

        for table in tables:
            heading = heading_for(table, headings)
            if heading is None:
                fail(f"表（{[round(v) for v in table.bbox]}）に対応する見出しが見つかりません")
            name = heading["text"]
            extracted = table.extract()
            head = [cell(c) for c in extracted[0]]

            ages = {}
            for index, value in enumerate(head):
                m = re.fullmatch(r"(\d)歳", value)
                if m:
                    ages[int(m.group(1))] = index
            if not ages:
                fail(f"{name}: 年齢の見出しが見つかりません（{head}）")
            first_age_col = min(ages.values())
            if first_age_col < 1:
                fail(f"{name}: 年齢の列が左端にあります（{head}）")

            if name.startswith(SKIP_HEADING):
                skipped += sum(1 for r in extracted[1:] if cell(r[0]))
                continue

            rows = []
            kind_carry = ""
            for values in (list(map(cell, r)) for r in extracted[1:]):
                left = values[:first_age_col]
                # 認定こども園の表は 縦書きの区分／施設名／認定区分「（保育）」 の3列
                kinds = [v for v in left if v.endswith("型")]
                if kinds:
                    kind_carry = kinds[-1]
                labels = [
                    v
                    for v in left
                    if v and not v.endswith("型") and not re.fullmatch(r"[（(].*[）)]", v)
                ]
                if not labels:
                    continue
                if len(labels) > 1:
                    fail(f"{name}: 施設名らしい値が{len(labels)}個あります（{labels}）")
                facility = labels[0]

                counts = []
                for age in range(AGE_COUNT):
                    if age not in ages:
                        counts.append(None)
                        continue
                    value = values[ages[age]]
                    if value == "":
                        counts.append(None)
                        continue
                    if not re.fullmatch(r"\d+", value):
                        # クラスのない年齢の欄に、注記の文が重ねて印字されていることがある
                        if len(value) < 5 or not re.search(r"[ぁ-んァ-ン一-龥]", value):
                            fail(f"{name} {facility}: {age}歳が数字ではありません（「{value}」）")
                        overlaid.append(value)
                        counts.append(None)
                        continue
                    counts.append(int(value))

                if all(c is None for c in counts):
                    fail(f"{name} {facility}: 全ての年齢が空らんです")
                rows.append({"name": facility, "kind": kind_carry, "counts": counts})

            if not rows:
                fail(f"{name}: 施設の行を取り出せませんでした")
            groups.append({"heading": name, "rows": rows})

        # 検算用に、年齢の列の中にある数字の個数をページから数え直す
        printed = 0
        for table in tables:
            heading = heading_for(table, headings)
            if heading is None or heading["text"].startswith(SKIP_HEADING):
                continue
            first_row = table.rows[0]
            bounds = []
            for index, box in enumerate(first_row.cells):
                if box is None:
                    continue
                value = cell(table.extract()[0][index])
                if re.fullmatch(r"\d歳", value):
                    bounds.append((box[0], box[2]))
            if not bounds:
                fail("年齢の列の位置を取れませんでした")
            left = min(b[0] for b in bounds) - 1
            right = max(b[1] for b in bounds) + 1
            for word in page.extract_words():
                if not re.fullmatch(r"\d+", word["text"]):
                    continue
                if word["x0"] < left or word["x1"] > right:
                    continue
                if word["top"] < table.bbox[1] or word["bottom"] > table.bbox[3]:
                    continue
                printed += 1

    if not groups:
        fail("施設の行を取り出せませんでした")

    return {
        "asOf": as_of,
        "target": target,
        "notes": notes,
        "overlaidNotes": overlaid,
        "skipped": skipped,
        "printedNumbers": printed,
        "groups": groups,
    }


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
