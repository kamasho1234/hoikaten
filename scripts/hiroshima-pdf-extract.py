"""
広島市の区ごとの「保育施設空き状況リスト」PDFから表を抜き出してJSONで返す

実行: python scripts/hiroshima-pdf-extract.py <区名>:<pdf> ...
出力: 標準出力にJSON（fetch-hiroshima-vacancy.ts から呼ぶ）

## 表の作り
- **区ごとにPDFが分かれていて、しかも区ごとにレイアウトが違う**。
  中区は「保育園等／所在地」、安佐南区は「施設区分／保育園／所在地」、
  安芸区は「保育園」だけ、というように先頭の列がばらばら。
  共通しているのは**「0歳」〜「5歳」の見出しがあり、その下に
  「入園可能人数」と「待機者数」の2列が並ぶ**こと。ここを手がかりに列を引く。
- 施設の種類は、表の直前の見出し（「認定こども園」「小規模保育事業所」など）か、
  安佐南区のように行の「施設区分」の列に入る。
- 基準日は区ごとに違うことがある（多くは8月1日だが南区は8月3日）。区ごとに拾う。
"""

import json
import re
import sys

import pdfplumber

AGE_HEADS = ["0歳", "1歳", "2歳", "3歳", "4歳", "5歳"]


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return " ".join(str(s).split())


def normalize(s):
    return "".join((s or "").split())


def extract_one(path):
    tables = []
    as_of = set()
    target = set()
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ""
            m = re.search(r"(\d+)月(\d+)日現在", text)
            if m:
                as_of.add((int(m.group(1)), int(m.group(2))))
            m = re.search(r"令和(\d+)年度?(\d+)月入所", text)
            if m:
                target.add((int(m.group(1)), int(m.group(2))))

            lines = [
                {"text": " ".join(ln["text"].split()), "top": ln["top"]}
                for ln in page.extract_text_lines()
            ]
            for table_obj in page.find_tables():
                rows = [[cell(c) for c in r] for r in table_obj.extract()]
                if len(rows) < 3:
                    continue
                head = [normalize(c) for c in rows[0]]
                if "0歳" not in head:
                    continue
                above = [ln for ln in lines if ln["top"] < table_obj.bbox[1] - 2]
                section = above[-1]["text"] if above else ""
                # 見出し2行を除いて、何かしら値の入っている行数。
                # 取り込み側でこの数と突き合わせ、行の取りこぼしに気づけるようにする
                data_rows = sum(1 for r in rows[2:] if any((c or "").strip() for c in r))
                tables.append(
                    {"section": section, "head": head, "rows": rows, "dataRows": data_rows}
                )
    return {"asOf": sorted(as_of), "target": sorted(target), "tables": tables}


def main():
    args = sys.argv[1:]
    if not args:
        fail("「区名:PDFのパス」を1つ以上指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    out = []
    for arg in args:
        ward, _, path = arg.partition(":")
        if not path:
            fail(f"「区名:PDFのパス」の形で指定してください: {arg}")
        result = extract_one(path)
        result["ward"] = ward
        out.append(result)
    json.dump({"wards": out}, sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
