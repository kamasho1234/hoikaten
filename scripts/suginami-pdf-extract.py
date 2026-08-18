"""
杉並区の「認可保育所等（所在地別）募集予定人数」PDFから表を抜き出してJSONで返す

実行: python scripts/suginami-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-suginami-vacancy.ts から呼ぶ）

## 表の作り
- **1〜2ページは注意事項**。3ページ以降が7つの所在地グループの表で、どれも15列。
- 見出しが3行。1行目が所在地グループ名、2行目が「区分/月齢/№/園コード/保育所名/募集予定人数（名）」、
  3行目に「０歳〜５歳」が入る。
- **区分（私立・区立・小規模・事業所・家庭的）は結合セル**で先頭行にしか入らないので引き継ぐ。
- **園コードがある**ので施設IDに使える。
- `－` は募集なし。空欄はそのクラスを設けていない。
"""

import json
import re
import sys

import pdfplumber

AGE_HEADS = ["０歳", "１歳", "２歳", "３歳", "４歳", "５歳"]
HEAD_KEYS = ["区分", "月齢", "№", "園コード", "保育所名"]


def fail(message):
    raise SystemExit(f"[中断] {message}")


def normalize(s):
    if s is None:
        return ""
    return "".join(str(s).split())


def extract(path):
    groups = []
    as_of = set()
    target = set()
    z = str.maketrans("０１２３４５６７８９", "0123456789")
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ""
            m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月([０-９\d]+)日現在", text)
            if m:
                as_of.add(
                    (
                        int(m.group(1).translate(z)),
                        int(m.group(2).translate(z)),
                        int(m.group(3).translate(z)),
                    )
                )
            m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月募集", text)
            if m:
                target.add((int(m.group(1).translate(z)), int(m.group(2).translate(z))))

            # 所在地グループ名はページ本文の2行目にある（表に入るページと入らないページがある）
            lines = [ln.strip() for ln in text.splitlines() if ln.strip()]
            area_line = next((ln for ln in lines[:4] if re.match(r"^[➊-➐]", ln)), "")

            for table_obj in page.find_tables():
                table = table_obj.extract()
                rows = [[normalize(c) for c in r] for r in table]
                if len(rows) < 3:
                    continue
                # 「区分」「園コード」が並ぶ行を見出しとする。
                # **ページによって所在地グループ名の行が表に入る／入らない**ので位置を決め打ちしない
                hi = next((i for i, r in enumerate(rows[:3]) if all(k in r for k in HEAD_KEYS)), None)
                if hi is None:
                    continue
                head = rows[hi]
                if hi + 1 >= len(rows):
                    continue
                ages = rows[hi + 1]
                idx = {}
                for label in AGE_HEADS:
                    if label not in ages:
                        fail(f"{path}: 3行目に「{label}」がありません: {ages}")
                    idx[label] = ages.index(label)
                # 区分は縦に結合されたセルで、値は結合範囲の中央の行にしか入らない。
                # セルの bbox を見て、同じセルに属する行へ同じ区分を配る
                ki = head.index("区分")
                kubun_by_row = []
                for ri, row_obj in enumerate(table_obj.rows):
                    cell = row_obj.cells[ki] if ki < len(row_obj.cells) else None
                    kubun_by_row.append(cell)
                resolved = [""] * len(rows)
                for ri in range(len(rows)):
                    cell = kubun_by_row[ri] if ri < len(kubun_by_row) else None
                    if cell is None:
                        continue
                    # 同じ bbox を共有する行のうち、値が入っている行から拾う
                    same = [j for j in range(len(rows)) if ri < len(kubun_by_row) and kubun_by_row[j] == cell]
                    value = next((rows[j][ki] for j in same if rows[j][ki]), "")
                    resolved[ri] = value

                groups.append(
                    {
                        "area": (rows[0][0] if hi > 0 and rows[0][0] else area_line),
                        "kubunByRow": resolved[hi + 2 :],
                        "columns": {
                            "kubun": head.index("区分"),
                            "month": head.index("月齢"),
                            "no": head.index("№"),
                            "code": head.index("園コード"),
                            "name": head.index("保育所名"),
                            "ages": [idx[a] for a in AGE_HEADS],
                        },
                        "rows": rows[hi + 2 :],
                    }
                )
    return {"asOf": sorted(as_of), "target": sorted(target), "groups": groups}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
