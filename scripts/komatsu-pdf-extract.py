"""
小松市の「認定こども園・保育所・幼稚園 空き状況一覧」PDFから表を抜き出す

実行: python scripts/komatsu-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-komatsu-vacancy.ts から呼ぶ）

## 表の作り
- 1ページに区分ごとの表が7つ並ぶ。表の上に「（私立）幼保連携型認定こども園」
  のような見出しがあるので、座標で表と結びつける
- 各表は 番号／施設名／所在地／TEL／利用定員／0歳児〜5歳児
- 記号は △＝1〜2人程度、〇＝3〜4人程度、◎＝5人以上
- **空らんと斜線で意味が違う**。
  空らん … 受入可能人数が無い（＝空きなし）
  斜線 … そのクラスを受け入れていない
  斜線は `page.curves` に入っているので、年齢の欄と重なるかどうかで見分ける
"""

import json
import re
import sys

import pdfplumber

COL_NO = 0
COL_NAME = 1
AGE_COUNT = 6
MARKS = "◎○◯〇△×✕"
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def heading_for(table, headings):
    """表のすぐ上にある見出しを返す"""
    above = [h for h in headings if h["top"] < table.bbox[1]]
    if not above:
        return None
    return max(above, key=lambda h: h["top"])


def has_slash(box, slashes):
    """欄の中に斜線が引かれているか（斜線の中心が欄の中にあるか）"""
    for s in slashes:
        cx = (s["x0"] + s["x1"]) / 2
        cy = (s["top"] + s["bottom"]) / 2
        if box[0] <= cx <= box[2] and box[1] <= cy <= box[3]:
            return True
    return False


def extract(path):
    notes = []
    legend = []
    groups = []
    mark_counts = {}
    blanks = 0
    slashed = 0

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        text = page.extract_text() or ""
        flat = "".join(text.split()).translate(ZEN)

        m = re.search(r"令和(\d+)年(\d+)月(\d+)日時点", flat)
        if not m:
            fail("「令和N年M月D日時点」を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        # 「・「△」が1～2人程度、「○」が3～4人程度、「◎」が5人以上の受入可能人数を示しています。」
        for mark, label in re.findall(rf"「([{MARKS}])」が([^、。]+)", flat):
            legend.append({"mark": mark, "label": label.strip()})
        if not legend:
            fail("記号の凡例が見つかりません")
        if "空欄は受入可能人数が無い" not in flat:
            fail("「空欄は受入可能人数が無い」という説明が見つかりません")
        if "斜線は受入れしておりません" not in flat:
            fail("「斜線は受入れしておりません」という説明が見つかりません")

        for line in text.splitlines():
            stripped = line.strip()
            if stripped.startswith("・") and len(stripped) > 10:
                notes.append(stripped.lstrip("・").strip())

        headings = [
            {"text": cell(w["text"]), "top": w["top"]}
            for w in page.extract_words()
            if w["text"].startswith(("（私立）", "（公立）", "(私立)", "(公立)"))
        ]
        if not headings:
            fail("「（私立）」「（公立）」で始まる見出しが見つかりません")

        slashes = [
            {"x0": c["x0"], "x1": c["x1"], "top": c["top"], "bottom": c["bottom"]}
            for c in page.curves
        ]

        tables = page.find_tables()
        if not tables:
            fail("表が見つかりません")

        for table in tables:
            heading = heading_for(table, headings)
            if heading is None:
                fail(f"表（{[round(v) for v in table.bbox]}）に対応する見出しが見つかりません")
            extracted = table.extract()

            # 見出しは2段（1行目に「利用定員」、2行目に年齢）
            head_index = None
            ages = {}
            for index, row in enumerate(extracted[:3]):
                values = [cell(c) for c in row]
                found = {}
                for column, value in enumerate(values):
                    m = re.fullmatch(r"(\d)歳児", value)
                    if m:
                        found[int(m.group(1))] = column
                if len(found) == AGE_COUNT:
                    head_index = index
                    ages = found
                    break
            if head_index is None:
                fail(f"{heading['text']}: 0歳児〜5歳児の見出しが見つかりません")

            rows = []
            for index in range(head_index + 1, len(extracted)):
                values = list(map(cell, extracted[index]))
                cells = table.rows[index].cells
                name = values[COL_NAME]
                if not name:
                    continue
                no = values[COL_NO]
                if not re.fullmatch(r"\d+", no):
                    fail(f"{name}: 番号が数字ではありません（「{no}」）")

                marks = []
                for age in range(AGE_COUNT):
                    column = ages[age]
                    value = values[column]
                    box = cells[column]
                    if value == "":
                        if box is not None and has_slash(box, slashes):
                            # 斜線＝そのクラスを受け入れていない
                            slashed += 1
                            marks.append(None)
                            continue
                        # 空らん＝受入可能人数が無い
                        blanks += 1
                        marks.append("")
                        continue
                    if value not in MARKS:
                        fail(f"{name}: {age}歳児が想定の記号ではありません（「{value}」）")
                    marks.append(value)
                    mark_counts[value] = mark_counts.get(value, 0) + 1

                rows.append({"no": int(no), "name": name, "marks": marks})

            if not rows:
                fail(f"{heading['text']}: 施設の行を取り出せませんでした")
            groups.append({"heading": heading["text"], "rows": rows})

    if not groups:
        fail("施設の行を取り出せませんでした")

    return {
        "asOf": as_of,
        "legend": legend,
        "notes": notes,
        "markCounts": mark_counts,
        "blanks": blanks,
        "slashed": slashed,
        "slashesOnPage": len(slashes),
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
