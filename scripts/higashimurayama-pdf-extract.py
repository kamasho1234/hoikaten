"""
東村山市の「保育施設 欠員見込」PDFから表を抜き出してJSONで返す

実行: python scripts/higashimurayama-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-higashimurayama-vacancy.ts から呼ぶ）

## 表の作り（令和8年10月期からの形）
- 1ページに表が1つ。「園名／0歳〜5歳／保育年齢／保育園所在地」の9列
- **区分は「施 設 型」「地 域 型」という独立した行**で入る。
  それより下の施設がその区分に属する
- 末尾に「欠員計」の行がある。年齢ごとの合計と、いちばん右にその総計
- **「定員無」は横に結合されたセル**で、そこから右の空欄も同じ意味。
  次に数字が現れる欄までが「そのクラスを設けていない」ことを表す
- 認定こども園は園名が2行になり、1行目に「【認定こども園】」が入る

## 前の形（令和8年9月期まで）
区分が縦書きで1文字ずつ散らばり、どの行がどちらの区分かを高さから
推し量る必要があった。10月期に作りが変わって、そこは読みやすくなった。
表題も「M月空き状況(…時点)」から「M月期 保育施設欠員見込 ※…時点」に変わっている。
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 9
# その年齢のクラスを設けていないことを表す言葉
NO_CLASS = "定員無"


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    return "".join(str(s or "").split())


def number(text):
    t = cell(text).translate(str.maketrans("０１２３４５６７８９", "0123456789"))
    return int(t) if re.fullmatch(r"\d+", t) else None


def read_values(row):
    """年齢の欄を読む。「定員無」から次の数字までは「クラスなし」(None)"""
    values = [None] * AGE_COUNT
    no_class = False
    for age in range(AGE_COUNT):
        raw = cell(row[1 + age])
        if raw == NO_CLASS:
            no_class = True
            continue
        n = number(raw)
        if n is not None:
            no_class = False
            values[age] = n
            continue
        if raw:
            fail(f"人数として読めない欄があります: 「{raw}」")
        # 空欄。「定員無」の続きならクラスなし、そうでなければ読み取り漏れ
        if not no_class:
            fail(f"{cell(row[0])}: {age}歳の欄が空です")
    return values


def extract(path):
    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"1ページのPDFを想定していますが{len(pdf.pages)}ページあります")
        page = pdf.pages[0]
        flat = "".join((page.extract_text() or "").split())

        m = re.search(r"令和(\d+)年(\d+)月期[^※]{0,20}※令和(\d+)年(\d+)月(\d+)日時点", flat)
        if not m:
            fail("表題から対象月と基準日を読み取れませんでした")
        target = [int(m.group(1)), int(m.group(2))]
        as_of = [int(m.group(3)), int(m.group(4)), int(m.group(5))]

        tables = page.find_tables()
        if not tables:
            fail("表が見つかりません")
        rows = [[cell(c) for c in r] for r in tables[0].extract()]
        if any(len(r) != EXPECTED_COLUMNS for r in rows):
            fail(f"列数が{EXPECTED_COLUMNS}ではない行があります")

        head = rows[0]
        if "園名" not in head[0]:
            fail(f"見出しが想定と違います: {head}")
        for age in range(AGE_COUNT):
            if head[1 + age] != f"{age}歳":
                fail(f"年齢の見出しが想定と違います: {head}")

        out = []
        total = None
        kubun = None
        for row in rows[1:]:
            name = row[0]
            if not name:
                continue
            # 「施設型」「地域型」だけの行は区分の見出し
            if not any(row[1:]) and re.fullmatch(r"(施設型|地域型)", name):
                kubun = name
                continue
            if name.startswith("欠員計"):
                total = [number(row[1 + a]) for a in range(AGE_COUNT)]
                continue
            if kubun is None:
                fail(f"{name}: どの区分に属するか分かりません")
            # 認定こども園は園名が2行になり、1行目に類型が入る
            kind = None
            m = re.match(r"^【(.+?)】(.*)$", name)
            if m:
                kind, name = m.group(1), m.group(2)
                if not name:
                    fail(f"園名が読み取れません: 「{row[0]}」")
            out.append(
                {
                    "kubun": kubun,
                    "kind": kind,
                    "name": name,
                    "values": read_values(row),
                    "ageFrom": row[7],
                    "address": row[8],
                }
            )

        if total is None:
            fail("「欠員計」の行が見つかりません")
        if not out:
            fail("施設の行を取り出せませんでした")
        return {"target": target, "asOf": as_of, "rows": out, "total": total}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
