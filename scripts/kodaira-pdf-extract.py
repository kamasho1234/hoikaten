"""
小平市の「認可保育園等の募集予定人数」PDFから表を抜き出してJSONで返す

実行: python scripts/kodaira-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-kodaira-vacancy.ts から呼ぶ）

## 表の作り
- **1ページに表が5つ**。認可保育園は左右2段組で2つ、そのほかに小規模保育・
  家庭的保育事業・認定こども園の表が並ぶ。
- 施設の種類は表の上の見出し。ただし**直前の行に前の表の最終行がくっつく**ことがあるので、
  取り込み側で行の末尾から種類を探す。
- 表題に「令和８年度9月認可保育園等の募集予定人数（8月1日現在）」。
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
    target = set()
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            flat = "".join((page.extract_text() or "").translate(Z).split())
            m = re.search(r"令和(\d+)年度(\d+)月認可保育園等の募集予定人数", flat)
            if m:
                target.add((int(m.group(1)), int(m.group(2))))
            m = re.search(r"募集予定人数（(\d+)月(\d+)日現在）", flat)
            if m:
                as_of.add((int(m.group(1)), int(m.group(2))))

            lines = [
                {"text": " ".join(ln["text"].split()), "top": ln["top"]}
                for ln in page.extract_text_lines()
            ]
            for table_obj in page.find_tables():
                rows = [[cell(c) for c in r] for r in table_obj.extract()]
                if len(rows) < 2:
                    continue
                head = [cell(c) for c in rows[0]]
                if not any("歳" in h for h in head):
                    continue
                # **表の直前の行が「私」のような1文字だけのことがある**（公私の印が
                # 縦書きで別行になるため）。種類が分かる行に当たるまで数行さかのぼる
                above = [ln["text"] for ln in lines if ln["top"] < table_obj.bbox[1] - 2]
                section = ""
                # 見出しは前の表の行と同じ行の右端に置かれることがある
                # （「ふれあいの森 0 0 0 0 0 1 小 規 模 保 育 事 業」）
                for text in reversed(above[-6:]):
                    flat = "".join(text.split())
                    if re.search(r"(認可保育園|小規模保育事業|家庭的保育事業|認定こども園)$", flat):
                        section = text
                        break
                if not section and above:
                    section = above[-1]
                tables.append({"section": section, "head": head, "rows": rows[1:]})
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
