"""
中野区の「入園募集予定人数（空き状況）」PDFから表を抜き出してJSONで返す

実行: python scripts/nakano-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-nakano-vacancy.ts から呼ぶ）

## 表の作り
- **表の1行目がそのまま施設類型の見出し**になっている（区立保育園／私立保育園／
  認定こども園（2号3号認定）／地域型保育事業（認可小規模保育事業）／同（認可家庭的保育事業））。
  他の自治体のように本文から見出しを拾う必要がない。
- 2行目が列見出し。**認可（0〜5歳クラス）と地域型（0〜2歳クラス）で列数が違う**
  （8列と6列）ので、年齢の見出しを数えて分ける。
- **「なし」がクラスの設定なし**。0は空きなし。この2つが文字で書き分けられているので、
  さいたま市や江東区のように図形を見る必要はない。
- 私立保育園はページをまたぐ（1ページ目の途中から2ページ目まで）。**同じ見出しの表が
  複数出てくる**ので、取り込み側で施設名の重複だけ弾けばよい。
"""

import json
import re
import sys

import pdfplumber

Z = str.maketrans("０１２３４５６７８９", "0123456789")
AGE6 = ["0歳クラス", "1歳クラス", "2歳クラス", "3歳クラス", "4歳クラス", "5歳クラス"]
AGE3 = ["0歳クラス", "1歳クラス", "2歳クラス"]


def fail(message):
    raise SystemExit(f"[中断] {message}")


def normalize(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(Z)


def cell_text(s):
    if s is None:
        return ""
    return " ".join(str(s).split())


def extract(path):
    tables = []
    target = set()
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ""
            # 「２０２６年９月１日入園募集予定人数」
            m = re.search(r"([０-９\d]{4})年([０-９\d]{1,2})月([０-９\d]{1,2})日入園募集予定人数", text)
            if m:
                target.add(tuple(int(g.translate(Z)) for g in m.groups()))

            for table_obj in page.find_tables():
                rows = [list(r) for r in table_obj.extract()]
                if len(rows) < 3:
                    continue
                # 1行目＝見出し、2行目＝列見出し
                section = cell_text(rows[0][0])
                head = [normalize(c) for c in rows[1]]
                if "名称" not in head:
                    continue
                labels = AGE6 if all(a in head for a in AGE6) else AGE3
                if not all(a in head for a in labels):
                    fail(f"{section}: 年齢の見出しが見つかりません: {head}")
                tables.append(
                    {
                        "section": section,
                        "columns": {
                            "name": head.index("名称"),
                            "ages": [head.index(a) for a in labels],
                        },
                        "rows": [[cell_text(c) for c in r] for r in rows[2:]],
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
