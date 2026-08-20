"""
町田市の「入園募集人数一覧」PDFから表を抜き出してJSONで返す

実行: python scripts/machida-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-machida-vacancy.ts から呼ぶ）

## 表の作り
- **施設の種類ごとに表が分かれ、種類は表の上の見出し行**にある
  （「2026年9月1日入園 公立・私立認可保育所募集人数」「認定こども園募集人数」
  　「小規模保育園募集人数」「家庭的保育者（保育ママ）募集人数」）。
  **同じページに2つの表が並ぶことがある**ので、ページ単位ではなく
  表の上端より上にある直近の「〜募集人数」の行を見出しとして使う。
- 列の並びは種類ごとに少しずつ違う（認可保育所だけ空の列がひとつ多いなど）。
  見出しの文字（保育所名・こども園名・施設名・保育室名／定員）で列を引く。
- **年齢の見出しは2行目**（0歳〜5歳）。
- 地域の列は縦に結合されていて、変わるときだけ値が入る。
  「堺地域」と「堺」のように書き方が揺れる。
- 募集人数の欄に「子どもの森幼稚園に継続して在園」のような注記が入ることがある。
"""

import json
import re
import sys

import pdfplumber

Z = str.maketrans("０１２３４５６７８９", "0123456789")
TITLE = re.compile(r"(\S+?)募集人数")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return " ".join(str(s).split())


def extract(path):
    tables = []
    target = set()
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            flat = "".join((page.extract_text() or "").translate(Z).split())
            m = re.search(r"(\d{4})年(\d+)月(\d+)日入園", flat)
            if m:
                target.add(tuple(int(g) for g in m.groups()))

            lines = [
                {"text": " ".join(ln["text"].split()), "top": ln["top"]}
                for ln in page.extract_text_lines()
            ]
            for table_obj in page.find_tables():
                rows = [[cell(c) for c in r] for r in table_obj.extract()]
                if len(rows) < 3:
                    continue
                head = [cell(c) for c in rows[0]]
                if not any(re.sub(r"\s", "", h) in ("保育所名", "こども園名", "施設名", "保育室名") for h in head):
                    continue
                # 表の上端より上にある直近の見出し行が施設の種類。
                # **注記にも「募集人数」の語が出る**（「※定員・募集人数については…」）ので、
                # 「〜年〜月〜日入園 ○○募集人数」の形をした行だけを見出しとみなす
                above = [
                    ln
                    for ln in lines
                    if ln["top"] < table_obj.bbox[1] - 2
                    and re.search(r"\d+年\d+月\d+日入園\s*\S+募集人数", ln["text"])
                ]
                section = above[-1]["text"] if above else ""
                tables.append(
                    {
                        "section": section,
                        "head": head,
                        "ageHead": [cell(c) for c in rows[1]],
                        "rows": rows[2:],
                    }
                )
    if not tables:
        fail("施設の表を1つも取り出せませんでした")
    return {"target": sorted(target), "tables": tables}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
