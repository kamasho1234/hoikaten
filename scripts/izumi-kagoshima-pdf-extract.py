"""
出水市（鹿児島県）の「保育所等空き状況」PDFから表を抜き出してJSONで返す

実行: python scripts/izumi-kagoshima-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-izumi-kagoshima-vacancy.ts から呼ぶ）

## 表の作り
- 1ページに表が2つ。1つめが施設の一覧、2つめは年齢と生年月日の対応表（読まない）
- 施設の表は「区分／通し番号／施設名／0歳〜5歳／合計」の11列
- **区分（保育所・認定こども園・小規模・事業所内）は縦書き**で、
  そのかたまりの最初の行にだけ入る
- **空欄はそのクラスを設けていないこと**を表す（小規模は2歳児まで）
- 行ごとに「合計」があるので、年齢を足したものと突き合わせられる
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 11
COL_KUBUN = 0
COL_NO = 1
COL_NAME = 2
COL_AGE0 = 3
COL_TOTAL = COL_AGE0 + AGE_COUNT


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    return "".join(str(s or "").split())


def number(text):
    t = cell(text).translate(str.maketrans("０１２３４５６７８９", "0123456789"))
    return int(t) if re.fullmatch(r"\d+", t) else None


def extract(path):
    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"1ページのPDFを想定していますが{len(pdf.pages)}ページあります")
        page = pdf.pages[0]
        flat = "".join((page.extract_text() or "").split())

        m = re.search(r"R(\d+)\.(\d{1,2})\.(\d{1,2})現在", flat)
        if not m:
            fail("「R8.8.20現在」の形の日付を読み取れませんでした")
        as_of = [int(g) for g in m.groups()]

        tables = [t.extract() for t in page.find_tables()]
        body = None
        for t in tables:
            if t and cell(t[0][COL_NAME]) == "施設名" or (t and cell(t[0][0]) == "施設名"):
                body = t
                break
        if body is None:
            fail("施設の表が見つかりません")
        if any(len(r) != EXPECTED_COLUMNS for r in body):
            fail(f"列数が{EXPECTED_COLUMNS}ではない行があります")

        head = [cell(c) for c in body[0]]
        for age in range(AGE_COUNT):
            if head[COL_AGE0 + age] != f"{age}歳":
                fail(f"年齢の見出しが想定と違います: {head}")
        if head[COL_TOTAL] != "合計":
            fail(f"「合計」の見出しがありません: {head}")

        rows = []
        kubun = None
        for raw in body[1:]:
            values = [cell(c) for c in raw]
            if values[COL_KUBUN]:
                kubun = values[COL_KUBUN]
            no = number(values[COL_NO])
            name = values[COL_NAME]
            if no is None or not name:
                continue
            if kubun is None:
                fail(f"{name}: どの区分に属するか分かりません")
            counts = []
            for age in range(AGE_COUNT):
                raw_value = values[COL_AGE0 + age]
                if raw_value == "":
                    counts.append(None)
                    continue
                n = number(raw_value)
                if n is None:
                    fail(f"{name}: {age}歳の欄を数として読めません（「{raw_value}」）")
                counts.append(n)
            total = number(values[COL_TOTAL])
            if total is None:
                fail(f"{name}: 合計を読めません（「{values[COL_TOTAL]}」）")
            got = sum(c for c in counts if c is not None)
            if got != total:
                fail(f"{name}: 年齢を足すと{got}なのに合計は{total}です")
            rows.append({"no": no, "kubun": kubun, "name": name, "values": counts, "total": total})

        if not rows:
            fail("施設の行を取り出せませんでした")
        # 通し番号が1から欠けずに続くか
        for i, r in enumerate(rows, start=1):
            if r["no"] != i:
                fail(f"通し番号が飛んでいます（{i}番目が{r['no']}）")
        return {"asOf": as_of, "rows": rows}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
