"""
幕別町の「認可保育所等 入所状況・空き状況」PDFから表を抜き出してJSONで返す

実行: python scripts/makubetsu-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-makubetsu-vacancy.ts から呼ぶ）

## 表の作り
- 1施設が2行組。上の行が「現在入所者数」、下の行が「空き状況」で、
  左端に「現在入所者数／空き状況」というラベルの列がある
- **表の升目の切れ方が施設によってばらばら**で、表として読むと記号が
  隣の行や末尾の升目に紛れ込む。そこで**「空き状況」というラベルの高さ（y）と、
  年齢の見出しの位置（x）から、記号を直に拾う**
- 空きは記号（〇 1名以上の空きあり／× 空きなし）
- 認定こども園は「保育」と「教育」で2組あり、当サイトが載せるのは保育のほう
- 施設名は年齢の欄より左にあり、住所や電話番号と同じ帯に入る
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
MARKS = {"○": "〇", "◯": "〇", "〇": "〇", "×": "×", "✕": "×"}
# 施設名の帯（運営区分より右、定員より左）
NAME_X = (60, 250)


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    return "".join(str(s or "").split())


def extract(path):
    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"1ページのPDFを想定していますが{len(pdf.pages)}ページあります")
        page = pdf.pages[0]
        words = page.extract_words()
        flat = "".join((page.extract_text() or "").split())

        m = re.search(r"令和(\d+)年(\d{1,2})月(\d{1,2})日現在", flat)
        if not m:
            fail("「令和N年M月D日現在」を読み取れませんでした")
        as_of = [int(g) for g in m.groups()]

        # 年齢の見出し。表が縦に並ぶので同じ x が何度も出てくる
        centers = {}
        for w in words:
            mm = re.fullmatch(r"([０-５0-5])歳", w["text"])
            if mm:
                age = int(mm.group(1).translate(str.maketrans("０１２３４５", "012345")))
                centers.setdefault(age, []).append((w["x0"] + w["x1"]) / 2)
        if len(centers) != AGE_COUNT:
            fail(f"年齢の見出しが{len(centers)}個しか見つかりません")
        # いちばん多く出てくる位置を、その年齢の欄の中心とする
        age_x = {}
        for age, xs in centers.items():
            xs.sort()
            age_x[age] = xs[len(xs) // 2]

        # 「空き状況」のラベルがある高さを、その組の記号の行とみなす
        rows = []
        for w in words:
            if w["text"] != "空き状況":
                continue
            top, bottom = w["top"], w["bottom"]
            # 記号はラベルと同じ高さか、少し下にずれて置かれることがある
            picked = {}
            for c in words:
                mark = MARKS.get(c["text"])
                if not mark:
                    continue
                y = (c["top"] + c["bottom"]) / 2
                if not (top - 4 <= y <= bottom + 10):
                    continue
                x = (c["x0"] + c["x1"]) / 2
                age = min(age_x, key=lambda a: abs(age_x[a] - x))
                if abs(age_x[age] - x) > 16:
                    continue
                if age in picked:
                    fail(f"y={top:.0f} の行で{age}歳の記号が2つあります")
                picked[age] = mark
            if not picked:
                continue
            # 施設名は、この組のいちばん上の行から探す（ラベルより上に置かれる）。
            # 同じ帯に住所・電話番号・運営区分・「保育」「教育」も入るので落とす
            parts = [
                c["text"]
                for c in sorted(
                    (
                        c
                        for c in words
                        if NAME_X[0] <= c["x0"] <= NAME_X[1] and top - 26 <= c["top"] <= bottom + 6
                    ),
                    key=lambda c: (round(c["top"] / 6), c["x0"]),
                )
            ]
            # 施設名は、この帯のいちばん上の行にある。
            # その下は住所と電話番号なので、**1行目だけ**を採る
            lines = {}
            for c in words:
                if not (NAME_X[0] <= c["x0"] <= NAME_X[1] and top - 26 <= c["top"] <= bottom + 6):
                    continue
                lines.setdefault(round(c["top"] / 6), []).append(c)
            kind = None
            name = ""
            for key in sorted(lines):
                texts = [c["text"] for c in sorted(lines[key], key=lambda c: c["x0"])]
                # 「保育」「教育」は認定こども園の区分。運営区分もこの帯に紛れる
                picked_name = []
                for t in texts:
                    if t in ("保育", "教育"):
                        kind = t
                        continue
                    if t in ("町立", "私立"):
                        continue
                    picked_name.append(t)
                joined = "".join(picked_name)
                if not joined:
                    continue
                # 住所や電話番号の行に来たら、そこで終わり
                if re.search(r"番地|電話|\d{3}-\d{4}", joined):
                    break
                name = joined
                break
            rows.append(
                {
                    "top": round(top, 1),
                    "name": name,
                    "kind": kind,
                    "marks": [picked.get(a) for a in range(AGE_COUNT)],
                }
            )

        # 名前が取れなかった行は、直前の施設の「教育」の組（認定こども園の1号）。
        # 当サイトが載せるのは保育のほうなので落とす
        kept = []
        for row in rows:
            if row["name"]:
                kept.append(row)
                continue
            if not kept:
                fail(f"y={row['top']} の行の施設名が分かりません")
            # 直前が保育の組で、これが教育の組であることを確かめる
            kept[-1].setdefault("dropped", 0)
            kept[-1]["dropped"] += 1
        for row in kept:
            if row.get("dropped", 0) > 1:
                fail(f"{row['name']}: 名前の無い組が{row['dropped']}個続いています")
        if not kept:
            fail("空き状況の行を取り出せませんでした")
        return {"asOf": as_of, "rows": kept}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
