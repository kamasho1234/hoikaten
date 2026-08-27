"""
中野区の「入園募集予定人数（空き状況）」PDFから表を抜き出してJSONで返す

実行: python scripts/nakano-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-nakano-vacancy.ts から呼ぶ）

## 表の作り（2026年10月分で作りが変わった）

**以前は表の1行目がそのまま施設類型の見出し**（「区立保育園」など）だったが、
いまは**見出しが表の外に「●認可保育所」のような行**として置かれ、
表の1行目は列見出し（地域／区分／園コード／名称／空き人数（名）／基本 保育時間／延長保育時間）
になっている。**この変更で「施設の表を1つも取り出せませんでした」と落ちた。**

いまの作り:

- 1行目 … 列見出し。`名称` はここ。`空き人数（名）` の下に年齢の列がぶら下がる
- 2行目 … 年齢の見出し。`０歳` `１歳` …（**以前の「0歳クラス」から「クラス」が取れた**）
- 3行目以降 … 施設。認可（0〜5歳）と地域型（0〜2歳）で列数が違う
- **施設類型は表の外の「●…」の行**。表の上端より上にある直近の●を、その表の見出しとする
  （ページごとに ● と表が同じ数・同じ順で並ぶが、順番ではなく y 座標で結びつける）
- **「●認可保育所」は区立と私立の両方を含む**ので、類型は `区分` 列（区立／私立）と
  組み合わせて決める。その判断は取り込み側（fetch-nakano-vacancy.ts）に任せ、
  ここでは区分列の位置を返すだけにする
- **「なし」がクラスの設定なし**。0は空きなし。この2つが文字で書き分けられているので、
  さいたま市や江東区のように図形を見る必要はない
- 認可保育所はページをまたぐ。**同じ見出しの表が複数出てくる**ので、
  取り込み側で施設名の重複だけ弾けばよい
"""

import json
import re
import sys

import pdfplumber

Z = str.maketrans("０１２３４５６７８９", "0123456789")
AGE6 = ["0歳", "1歳", "2歳", "3歳", "4歳", "5歳"]
AGE3 = ["0歳", "1歳", "2歳"]


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


def heading_above(headings, top):
    """表の上端より上にある直近の「●…」を返す"""
    above = [h for h in headings if h[0] < top]
    if not above:
        return None
    return max(above, key=lambda h: h[0])[1]


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

            headings = [
                (line["top"], line["text"].strip())
                for line in page.extract_text_lines()
                if line["text"].strip().startswith("●")
            ]

            for table_obj in page.find_tables():
                rows = [list(r) for r in table_obj.extract()]
                if len(rows) < 3:
                    continue
                head = [normalize(c) for c in rows[0]]
                age_head = [normalize(c) for c in rows[1]]
                if "名称" not in head:
                    continue

                labels = AGE6 if all(a in age_head for a in AGE6) else AGE3
                if not all(a in age_head for a in labels):
                    fail(f"年齢の見出しが見つかりません: {age_head}")

                section = heading_above(headings, table_obj.bbox[1])
                if not section:
                    fail(f"表の上に「●…」の見出しが見つかりません（{head}）")

                tables.append(
                    {
                        "section": section,
                        "columns": {
                            "name": head.index("名称"),
                            # 区分（区立／私立）。「●認可保育所」を区立と私立に分けるのに要る
                            "kind": head.index("区分") if "区分" in head else None,
                            "ages": [age_head.index(a) for a in labels],
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
