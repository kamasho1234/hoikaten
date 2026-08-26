"""
浦添市の「受入可能児童数及び入所待ち児童数」PDFから表を抜き出す

実行: python scripts/urasoe-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-urasoe-vacancy.ts から呼ぶ）

## 表の作り
- 5ページ。1ページに区分ごとの表がひとつ
  （公立保育所／法人保育園／小規模・事業所内保育事業所／私立認定こども園／
  公立・公私連携型認定こども園）
- 区分の名前は表のすぐ上の行にある
- 各表は10列（番号／施設名／区分（受入可能・入所待ち）／0歳〜5歳／備考）
- **1施設が2行**（受入可能児童数と入所待ち児童数）
- 番号と施設名はページごとに1から振り直される
- 備考が「調整中」の施設は、数がひとつも入らないことがある
- 空らんは、そのクラスがない施設のもの
  （小規模は0〜2歳、認定こども園の一部は3〜5歳だけ）
"""

import json
import re
import sys

import pdfplumber

COL_NO = 0
COL_NAME = 1
COL_KIND = 2
COL_AGE0 = 3
AGE_COUNT = 6
COL_REMARK = COL_AGE0 + AGE_COUNT
COLUMN_COUNT = COL_REMARK + 1

KIND_VACANCY = "受入可能"
KIND_WAITING = "入所待ち"
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def extract(path):
    notes = []
    groups = []

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) < 2:
            fail(f"ページ数が{len(pdf.pages)}しかありません")

        first = pdf.pages[0]
        flat = "".join((first.extract_text() or "").split()).translate(ZEN)

        m = re.search(r"令和(\d+)年(\d+)月(\d+)日受入可能児童数", flat)
        if not m:
            fail("「令和N年M月D日受入可能児童数」を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        for line in (first.extract_text() or "").splitlines():
            stripped = line.strip()
            if stripped.startswith("〇") and len(stripped) > 12:
                notes.append(stripped.lstrip("〇").strip())

        for index, page in enumerate(pdf.pages):
            tables = page.find_tables()
            if len(tables) != 1:
                fail(f"{index + 1}ページ目の表が{len(tables)}個です（1個のはず）")
            table = tables[0]

            # 区分の名前は表のすぐ上にある短い行
            above = [
                cell(w["text"])
                for w in page.extract_words()
                if w["bottom"] < table.bbox[1] and 3 <= len(cell(w["text"])) <= 20
            ]
            heading = next(
                (v for v in reversed(above) if not v.startswith(("〇", "※", "（"))), ""
            )
            if not heading:
                fail(f"{index + 1}ページ目の区分の名前が見つかりません")

            extracted = table.extract()
            head = [cell(c) for c in extracted[0]]
            if len(head) != COLUMN_COUNT:
                fail(f"{heading}: 列数が{len(head)}です（{COLUMN_COUNT}列のはず）")
            for age in range(AGE_COUNT):
                if head[COL_AGE0 + age] != f"{age}歳":
                    fail(f"{heading}: 年齢の見出しが想定と違います（{head}）")

            rows = []
            current = None
            for values in (list(map(cell, r)) for r in extracted[1:]):
                kind = values[COL_KIND]
                if kind not in (KIND_VACANCY, KIND_WAITING):
                    if not any(values):
                        continue
                    fail(f"{heading}: 区分が想定と違います（「{kind}」）")

                if kind == KIND_VACANCY:
                    no = values[COL_NO]
                    name = values[COL_NAME]
                    if not re.fullmatch(r"\d+", no):
                        fail(f"{heading}: 番号が数字ではありません（「{no}」）")
                    if not name:
                        fail(f"{heading}: 施設名が空です（番号{no}）")
                    current = {
                        "no": int(no),
                        "name": name,
                        "remark": values[COL_REMARK],
                        "vacancy": None,
                        "waiting": None,
                    }
                    rows.append(current)
                if current is None:
                    fail(f"{heading}: 「{KIND_WAITING}」の行が先に出てきました")

                counts = []
                for age in range(AGE_COUNT):
                    value = values[COL_AGE0 + age]
                    if value == "":
                        counts.append(None)
                        continue
                    if not re.fullmatch(r"\d+", value):
                        fail(f"{heading} {current['name']}: {age}歳が数字ではありません（「{value}」）")
                    counts.append(int(value))

                current["vacancy" if kind == KIND_VACANCY else "waiting"] = counts

            if not rows:
                fail(f"{heading}: 施設の行を取り出せませんでした")
            for row in rows:
                if row["vacancy"] is None or row["waiting"] is None:
                    fail(f"{heading} {row['name']}: 受入可能か入所待ちの行がありません")
                if all(v is None for v in row["vacancy"]) and not row["remark"]:
                    # 「調整中」のように備考がある施設は数が出ていなくてよい
                    fail(f"{heading} {row['name']}: 全ての年齢が空らんです")
            groups.append({"heading": heading, "rows": rows})

    if not groups:
        fail("施設の行を取り出せませんでした")

    return {"target": target, "notes": notes, "groups": groups}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
