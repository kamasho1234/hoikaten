"""
久米島町の「島内保育施設空き状況」PDFから表を抜き出してJSONで返す

実行: python scripts/kumejima-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-kumejima-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ。施設ごとに2行組で、上が「定数」下が「空き」
- **年齢が0歳児〜4歳児の5つしかない**（5歳児の欄が無い）
- 施設名は2行組の上の行にだけ入る（名前が長い園は2行に折り返す）
- 末尾に「計」の行があるので、積み上げと突き合わせられる
- 表の下に待機児童数の別表がある（読まない）
"""

import json
import re
import sys

import pdfplumber

# この町の資料にある年齢（0歳児〜4歳児）
AGE_LABELS = ["0歳児", "1歳児", "2歳児", "3歳児", "4歳児"]


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

        m = re.search(r"令和(\d+)年(\d{1,2})月(\d{1,2})日時点", flat)
        if not m:
            fail("「令和N年M月D日時点」を読み取れませんでした")
        as_of = [int(g) for g in m.groups()]

        body = None
        for table in page.find_tables():
            e = [[cell(c) for c in r] for r in table.extract()]
            if e and e[0] and e[0][0] == "施設名":
                body = e
                break
        if body is None:
            fail("施設の表が見つかりません")

        head = body[0]
        if head[1] != "人数":
            fail(f"見出しが想定と違います: {head}")
        age_cols = []
        for label in AGE_LABELS:
            if label not in head:
                fail(f"「{label}」の見出しがありません: {head}")
            age_cols.append(head.index(label))
        total_col = head.index("計") if "計" in head else -1
        if total_col < 0:
            fail(f"「計」の見出しがありません: {head}")

        rows = []
        name = ""
        totals = None
        for raw in body[1:]:
            if raw[0]:
                # 名前が2行に折り返すことがあるので、空きの行に来るまでつなぐ
                name = raw[0] if raw[1] == "定数" else name + raw[0]
            kind = raw[1]
            if kind == "空き":
                counts = [number(raw[c]) for c in age_cols]
                declared = number(raw[total_col])
                if declared is None:
                    fail(f"{name}: 計を読めません（「{raw[total_col]}」）")
                got = sum(c for c in counts if c is not None)
                if got != declared:
                    fail(f"{name}: 年齢を足すと{got}なのに計は{declared}です")
                if name == "計":
                    totals = counts
                else:
                    if not name:
                        fail("施設名の分からない行があります")
                    rows.append({"name": name, "values": counts, "total": declared})
                name = ""

        if not rows:
            fail("施設の行を取り出せませんでした")
        if totals is None:
            fail("「計」の行が見つかりません")
        return {"asOf": as_of, "ages": AGE_LABELS, "rows": rows, "totals": totals}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
