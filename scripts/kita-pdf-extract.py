"""
北区の「保育園空き人数及び入園申込状況」PDFから表を抜き出してJSONで返す

実行: python scripts/kita-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-kita-vacancy.ts から呼ぶ）

## 表の作り
- **1つの年齢につき列が2つ**。「空き人数」と「申請者数（総数と第1希望の内数）」。
  申請者数のセルには「9 2」のように総数と内数が並んで入る。
- **表の直前の行が節の見出し**。「王子・滝野川方面」「赤羽方面」のように方面を示すものと、
  「小規模保育事業所」「認定こども園（保育部分）」のように施設の種類を示すものがある。
- **公立／私立の別は左端の縦書き**（結合セル）。園コードだけの表には縦書きの列がない。
- 年齢の見出しは表によって数が違う（0〜5歳、0〜3歳、「3歳児・4歳児・5歳児」をまとめた列など）。
  見出しの文字から何歳を指すかを読み取る。
- 園名は均等割付で1文字ずつ空いている（「王 子 本 町」）。空白は落として使う。
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
        return None
    return " ".join(str(s).split())


def normalize(s):
    return "".join((s or "").split()).translate(Z)


def section_of(lines, table_top):
    """表の上端より上にある直近の行を節の見出しとして使う"""
    above = [ln for ln in lines if ln["top"] < table_top - 2]
    if not above:
        return ""
    return max(above, key=lambda ln: ln["top"])["text"]


def resolve_labels(rows):
    """左端の縦書き（公立保育園／私立保育園）を各行へ配る"""
    out = []
    carried = ""
    for r in rows:
        v = normalize(r[0]) if r and r[0] else ""
        if v and not v.startswith("園コード"):
            carried = v
        out.append(carried)
    return out


def extract(path):
    tables = []
    as_of = set()
    target = set()
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ""
            m = re.search(r"令和(\d+)年(\d+)月(\d+)日\s*現在", text)
            if m:
                as_of.add(tuple(int(g) for g in m.groups()))
            m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月期\s*保育園空き人数", text)
            if m:
                target.add(tuple(int(g.translate(Z)) for g in m.groups()))

            lines = [
                {"text": " ".join(ln["text"].split()), "top": ln["top"]}
                for ln in page.extract_text_lines()
            ]
            for table_obj in page.find_tables():
                rows = [[cell(c) for c in r] for r in table_obj.extract()]
                if len(rows) < 3:
                    continue
                head = [normalize(c) for c in rows[0]]
                if not any("歳児" in h for h in head):
                    continue
                tables.append(
                    {
                        "section": section_of(lines, table_obj.bbox[1]),
                        "head": head,
                        "labelByRow": resolve_labels(rows),
                        "rows": [[c if c is not None else "" for c in r] for r in rows],
                    }
                )
    if not tables:
        fail("施設の表を1つも取り出せませんでした")
    return {"asOf": sorted(as_of), "target": sorted(target), "tables": tables}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
