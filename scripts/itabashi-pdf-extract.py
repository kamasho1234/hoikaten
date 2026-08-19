"""
板橋区の「空き状況一覧」PDF（表面＝認可保育園等、裏面＝地域型保育施設）から表を抜き出す

実行: python scripts/itabashi-pdf-extract.py <pdf...>
出力: 標準出力にJSON（fetch-itabashi-vacancy.ts から呼ぶ）

## 表の作り
- **1ページに表が4つ**、しかも左右2段組。pdfplumber は素直に4つの表として認識してくれる
- 認可保育園の表は「地域／園名／月齢／0〜5歳／合計／延長／要支援児枠」。
  **地域（板橋地域・常盤台地域…）は縦書きの結合セル**で、値の入る行だけに文字がある
- **私立の表は途中で段が変わる**（右上の続きが左下に来る）。続きの表は地域の縦書きが
  見出し行から始まるため、見出しの列位置が1つずれる。「月齢」の位置を基準に列を引く
- **1行ごとに「合計」列がある**ので、年齢別の積み上げと1施設ずつ突き合わせられる
- 在宅家庭福祉員とベビールームは年齢別がなく「定員／欠員」だけ
- 空欄はそのクラスの受け入れがない。0は空きなし
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


def resolve_area(rows):
    """縦書きの地域（結合セル）を各行へ配る。文字は1つのセルに全部入っているので carry するだけ"""
    out = []
    carried = ""
    for r in rows:
        v = "".join((r[0] or "").split()) if r and r[0] else ""
        # 「区立 保育園」のような表題や「合計」は地域ではない
        if v.endswith("地域"):
            carried = v
        out.append(carried)
    return out


def extract(paths):
    tables = []
    as_of = set()
    target = set()
    for path in paths:
        with pdfplumber.open(path) as pdf:
            for page in pdf.pages:
                text = page.extract_text() or ""
                m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月([０-９\d]+)日現在", text)
                if m:
                    as_of.add(tuple(int(g.translate(Z)) for g in m.groups()))
                m = re.search(r"([０-９\d]+)月利用空き状況", text)
                if m:
                    target.add(int(m.group(1).translate(Z)))

                for table_obj in page.find_tables():
                    rows = [[cell(c) for c in r] for r in table_obj.extract()]
                    if len(rows) < 2:
                        continue
                    head = [normalize(c) for c in rows[0]]
                    if not any(h in ("月齢", "欠員", "所在地") for h in head):
                        continue
                    tables.append(
                        {
                            "head": head,
                            "areaByRow": resolve_area(rows),
                            "rows": [[c if c is not None else "" for c in r] for r in rows],
                        }
                    )
    if not tables:
        fail("施設の表を1つも取り出せませんでした")
    return {"asOf": sorted(as_of), "target": sorted(target), "tables": tables}


def main():
    paths = sys.argv[1:]
    if not paths:
        fail("PDFのパスを指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
