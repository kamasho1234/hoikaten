"""
いの町の「保育施設空き状況」PDFから表を抜き出す

実行: python scripts/ino-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-ino-vacancy.ts から呼ぶ）

## 表の作り
- 罫線が1本も無い。列は文字の位置だけで決まる
- 3つの表（保育所／認定こども園／地域型保育事業所）
- 地域型保育事業所の表は「0歳児〜2歳児」の1列にまとまっている
- 値は人数（「6」）か「若干名」か「×」。斜線（＝受入なし）のセルは何も書かれない
- 施設名が2行に分かれる施設がある（家庭的保育事業所／あんずのぽっけ）
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
AGE_HEADERS = ["0歳児", "1歳児", "2歳児", "3歳児", "4歳児", "5歳児"]
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    return "".join(str(s or "").split()).translate(ZEN)


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    if len(sys.argv) != 2:
        fail("使い方: python scripts/ino-pdf-extract.py <pdf>")

    rows = []
    text_all = []
    with pdfplumber.open(sys.argv[1]) as pdf:
        for page in pdf.pages:
            text_all.append(page.extract_text() or "")
            words = page.extract_words()
            # 同じ行の文字をまとめる
            lines = {}
            for w in words:
                lines.setdefault(round(w["top"] / 5) * 5, []).append(w)

            heading = None       # いま読んでいる表の種類
            age_x = None         # 年齢の列の中心位置
            pending_name = None  # 施設名が2行に分かれるとき、前の行の名前
            tail = []            # 直前に値を読んだ施設（名前の続きが下の行に来ることがある）
            for y in sorted(lines):
                line = sorted(lines[y], key=lambda w: w["x0"])
                joined = "".join(cell(w["text"]) for w in line)

                if joined in ("保育所", "認定こども園", "地域型保育事業所"):
                    heading = joined
                    age_x = None
                    tail = []
                    continue
                if joined.startswith("施設名所在地"):
                    tail = []
                    # 見出しの行から年齢の列の位置を覚える
                    age_x = []
                    for w in line:
                        t = cell(w["text"])
                        if t in AGE_HEADERS or t == "0歳児〜2歳児":
                            age_x.append((t, (w["x0"] + w["x1"]) / 2))
                    if not age_x:
                        fail(f"年齢の見出しが読めません: {joined[:40]}")
                    continue
                if heading is None or age_x is None:
                    continue
                if joined.startswith("表中の斜線") or joined.startswith("令和"):
                    heading = None
                    continue

                name_words = [w for w in line if w["x0"] < 200]
                if not name_words:
                    # 施設名が前の行にある（家庭的保育事業所／あんずのぽっけ）
                    if pending_name is None:
                        continue
                    name = pending_name
                else:
                    name = "".join(cell(w["text"]) for w in name_words)
                    if len(line) == len(name_words):
                        # その行が施設名だけのとき。
                        # 直前に値の行があれば、その施設の名前の続き
                        if tail:
                            rows[tail[-1]]["name"] += name
                            tail = []
                        else:
                            pending_name = (pending_name or "") + name
                        continue

                values = {}
                for w in line:
                    if w["x0"] < 400:
                        continue
                    cx = (w["x0"] + w["x1"]) / 2
                    label, dist = None, 1e9
                    for t, x in age_x:
                        if abs(cx - x) < dist:
                            label, dist = t, abs(cx - x)
                    if dist > 30:
                        continue
                    values[label] = cell(w["text"])
                if not values:
                    pending_name = name
                    continue

                rows.append({"category": heading, "name": name, "values": values})
                pending_name = None
                # 施設名が値の行より下に続くことがある（あんずのぽっけ）ので、
                # 次の行が名前だけならこの施設の名前に足す
                tail.append(len(rows) - 1)

    text = "\n".join(text_all)
    m = re.search(r"（令和([０-９\d]+)年([０-９\d]{1,2})月([０-９\d]{1,2})日時点）", text)
    if not m:
        fail("「（令和◯年◯月◯日時点）」が見つかりません")
    as_of = [int(x.translate(ZEN)) for x in m.groups()]

    m2 = re.search(r"令和([０-９\d]+)年([０-９\d]{1,2})月入園", text)
    for_month = [int(x.translate(ZEN)) for x in m2.groups()] if m2 else None

    if len(rows) < 8:
        fail(f"施設が{len(rows)}件しか取れていません")

    json.dump(
        {"asOf": as_of, "forMonth": for_month, "rows": rows},
        sys.stdout,
        ensure_ascii=False,
    )


if __name__ == "__main__":
    main()
