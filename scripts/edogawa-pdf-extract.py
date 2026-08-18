"""
江戸川区の「認可保育施設の定員と募集数」PDFから表を抜き出してJSONで返す

実行: python scripts/edogawa-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-edogawa-vacancy.ts から呼ぶ）

## この表の特徴
- **1施設が2行**。「受入可能数」の行と「募集数」の行が交互に並ぶ。掲載するのは募集数のほう。
- **「4歳・5歳」が1列にまとまっている**が、**募集数の行だけは4歳と5歳が隣り合う2列に分かれて入る**。
  受入可能数の行では合算値が「4歳・5歳」列に入り、その右は空。
- **最終ページだけ12列**（区立延長保育の別表で、4歳・5歳が分かれない）。
  それ以外は13列。**列は見出し名から引き、「計」との位置関係で5歳列の有無を決める**。
- 空欄はそのクラスを設けていないこと、0は募集がないことを示す。
"""

import json
import re
import sys

import pdfplumber

HEAD_KEYS = ["地区", "施設区分", "施設名", "区分", "計"]
AGE_HEADS = ["0歳", "1歳", "2歳", "3歳", "4歳・5歳"]


def fail(message):
    raise SystemExit(f"[中断] {message}")


def normalize(s):
    if s is None:
        return ""
    return "".join(str(s).split())


def parse_int(v, where):
    v = normalize(v)
    if v == "":
        return None
    if re.fullmatch(r"\d+", v):
        return int(v)
    fail(f"{where}: 数値として読めません: 「{v}」")


def extract(path):
    facilities = []
    totals = []
    as_of = set()
    target = set()
    with pdfplumber.open(path) as pdf:
        page_count = len(pdf.pages)
        for page in pdf.pages:
            text = page.extract_text() or ""
            m = re.search(r"(\d{4})年(\d{1,2})月(\d{1,2})日現在", text)
            if m:
                as_of.add((int(m.group(1)), int(m.group(2)), int(m.group(3))))
            m = re.search(r"令和(\d+)年(\d+)月入園", text)
            if m:
                target.add((int(m.group(1)), int(m.group(2))))

            for table in page.extract_tables():
                head = [normalize(c) for c in table[0]]
                for key in HEAD_KEYS:
                    if key not in head:
                        fail(f"{path}: 見出しに「{key}」がありません: {head}")
                idx = {}
                for label in AGE_HEADS:
                    if label not in head:
                        fail(f"{path}: 見出しに「{label}」がありません: {head}")
                    idx[label] = head.index(label)
                i_total = head.index("計")
                i_kubun = head.index("区分")
                # 「4歳・5歳」と「計」の間に列があれば、そこが募集数行の5歳になる
                i_45 = idx["4歳・5歳"]
                i_five = i_45 + 1 if i_total - i_45 >= 2 else None

                ward = ""
                kind = ""
                name = ""
                pending = None  # 受入可能数の行を保持して、次の募集数の行と組にする
                for raw in table[1:]:
                    cells = [normalize(c) for c in raw]
                    if not any(cells):
                        continue
                    if cells[0]:
                        ward = cells[0]
                    if cells[1]:
                        kind = cells[1]
                    if cells[2]:
                        name = cells[2]
                    label = cells[i_kubun] if i_kubun < len(cells) else ""
                    take = lambda i: parse_int(cells[i] if i < len(cells) else "", f"{path} {name}")

                    if label == "受入可能数":
                        pending = {
                            "capacity": [take(idx[a]) for a in AGE_HEADS],
                            "total": take(i_total),
                        }
                        continue
                    if label.replace(" ", "") == "募集数":
                        if pending is None:
                            fail(f"{path}: {name} の募集数の前に受入可能数の行がありません")
                        ages = [take(idx["0歳"]), take(idx["1歳"]), take(idx["2歳"]), take(idx["3歳"])]
                        ages.append(take(i_45))
                        ages.append(take(i_five) if i_five is not None else None)
                        row = {
                                "ward": ward,
                                "kind": kind,
                                "name": name,
                                "ages": ages,
                                "total": take(i_total),
                                "capacity": pending["capacity"],
                                "capacityTotal": pending["total"],
                                "splitFive": i_five is not None,
                        }
                        # 表の末尾に「合計」行がある。地区の欄が「合計」になり、
                        # 施設名は直前の施設のものが残る。検算に使うので分けて持つ
                        if ward == "合計":
                            totals.append(row)
                        else:
                            facilities.append(row)
                        pending = None
                        continue
                    # 受入可能数・募集数のどちらでもない行は想定外
                    fail(f"{path}: 区分が「{label}」の行があります: {cells}")
    return {
        "pageCount": page_count,
        "asOf": sorted(as_of),
        "target": sorted(target),
        "facilities": facilities,
        "totals": totals,
    }


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    out = extract(paths[0])
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(out, sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
