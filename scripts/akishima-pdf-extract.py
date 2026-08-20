"""
昭島市の「保育所等募集状況表」PDFから表を抜き出してJSONで返す

実行: python scripts/akishima-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-akishima-vacancy.ts から呼ぶ）

## 表の作り
- 2ページで表が3つ。1ページめが認可保育園、2ページめが幼保連携型認定こども園と地域型保育施設
- 表の種類は表の上の「≪認可保育園≫」のような行に書かれている
- 列は「施設名／延長保育／市民対象／0才〜5才」。延長保育と市民対象は○か空欄、
  年齢の欄は募集人数（空欄は募集なし）
- 施設名のない空行がまじる
"""

import json
import re
import sys

import pdfplumber

Z = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return " ".join(str(s).split())


def extract(path):
    tables = []
    as_of = set()
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            flat = "".join((page.extract_text() or "").translate(Z).split())
            m = re.search(r"募集状況表（令和(\d+)年(\d+)月(\d+)日現在）", flat)
            if m:
                as_of.add((int(m.group(1)), int(m.group(2)), int(m.group(3))))

            lines = [
                {"text": " ".join(ln["text"].split()), "top": ln["top"]}
                for ln in page.extract_text_lines()
            ]
            for table_obj in page.find_tables():
                rows = [[cell(c) for c in r] for r in table_obj.extract()]
                if len(rows) < 2 or not any("才" in h for h in rows[0]):
                    continue
                # 表の種類は表の上にある「≪認可保育園≫」の行
                above = [ln["text"] for ln in lines if ln["top"] < table_obj.bbox[1] - 2]
                section = ""
                for text in reversed(above):
                    flat_text = "".join(text.split())
                    if flat_text.startswith("≪") and flat_text.endswith("≫"):
                        section = flat_text.strip("≪≫")
                        break
                if not section:
                    fail("表の種類（≪認可保育園≫など）が見つかりませんでした")
                tables.append({"section": section, "head": rows[0], "rows": rows[1:]})
    if not tables:
        fail("募集状況の表を取り出せませんでした")
    if len(as_of) != 1:
        fail(f"基準日が{len(as_of)}種類あります")
    return {"asOf": sorted(as_of)[0], "tables": tables}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
