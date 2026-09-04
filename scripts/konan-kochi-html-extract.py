"""
香南市（高知県）の空き状況ページの表を読み出す

実行: python scripts/konan-kochi-html-extract.py <html>
出力: 標準出力にJSON（fetch-konan-kochi-vacancy.ts から呼ぶ）

## この自治体の表の作り
- 3つの表（公立施設／私立認定こども園／小規模保育施設）に分かれる
- 表の <caption> に「令和8年8月13日現在の公立施設の令和8年10月入所の空き状況の表」と書いてある
- **年齢のセルが横に結合されている行がある**（「3歳～5歳で4」「0歳～2歳で0」、
  数字だけ書いて2列ぶんを占める行もある）。
  結合されたセルの人数は年齢ごとに割れないので、その年齢は null にして
  「何歳から何歳で何人」という形で持ち帰り、備考に載せる
- 「なし」はそのクラスを設けていないこと
"""

import json
import re
import sys
from html.parser import HTMLParser

AGE_COUNT = 6
AGE_HEADERS = ["0歳児", "1歳児", "2歳児", "3歳児", "4歳児", "5歳児"]


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    return "".join(str(s or "").split())


class Grabber(HTMLParser):
    """表を、セルごとの (文字, 横に占める数) の並びとして取り出す"""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.tables = []
        self._text = []
        self._table = None
        self._row = None
        self._cell = None
        self._span = 1
        # 表の <caption>（「令和8年8月13日現在の…の表」）を見出しとして持つ
        self._caption = None
        self._heading = ""

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "table":
            self._table = []
            self._heading = ""
        elif tag == "caption" and self._table is not None:
            self._caption = []
        elif tag == "tr" and self._table is not None:
            self._row = []
        elif tag in ("td", "th") and self._row is not None:
            self._cell = []
            try:
                self._span = max(1, int(a.get("colspan", "1")))
            except ValueError:
                self._span = 1

    def handle_endtag(self, tag):
        if tag == "caption" and self._caption is not None:
            self._heading = cell("".join(self._caption))
            self._caption = None
        elif tag in ("td", "th") and self._cell is not None:
            self._row.append((cell("".join(self._cell)), self._span))
            self._cell = None
            self._span = 1
        elif tag == "tr" and self._row is not None:
            if self._row:
                self._table.append(self._row)
            self._row = None
        elif tag == "table" and self._table is not None:
            self.tables.append({"heading": self._heading, "grid": self._table})
            self._table = None

    def handle_data(self, data):
        if self._caption is not None:
            self._caption.append(data)
        elif self._cell is not None:
            self._cell.append(data)


def read_html(path):
    raw = open(path, "rb").read()
    for enc in ("utf-8", "cp932", "euc_jp"):
        try:
            return raw.decode(enc)
        except UnicodeDecodeError:
            continue
    fail("HTMLの文字コードを判別できませんでした")


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    if len(sys.argv) != 2:
        fail("使い方: python scripts/konan-kochi-html-extract.py <html>")

    parser = Grabber()
    parser.feed(read_html(sys.argv[1]))

    as_of = None
    sections = []
    for t in parser.tables:
        head = t["heading"]
        if "空き状況の表" not in head:
            continue
        m = re.search(r"令和(\d+)年(\d{1,2})月(\d{1,2})日現在", head)
        if not m:
            fail(f"表の見出しに基準日がありません: {head[-60:]}")
        got = [int(x) for x in m.groups()]
        if as_of is None:
            as_of = got
        elif as_of != got:
            fail(f"表ごとに基準日が違います: {as_of} と {got}")
        # 「…現在の公立施設の…」の「公立施設」を施設の類型として使う
        m2 = re.search(r"日現在の(.+?)の令和", head)
        if not m2:
            fail(f"表の見出しから施設の類型を読めません: {head[-60:]}")
        sections.append({"category": m2.group(1), "grid": t["grid"]})

    if not sections:
        fail("空き状況の表が見つかりません")

    rows = []
    for sec in sections:
        grid = sec["grid"]
        head = [c for c, _ in grid[0]]
        if head[:3] != ["施設名称", "施設所在地", "受入月齢"]:
            fail(f"見出しが想定と違います: {head[:3]}")
        ages = head[3:]
        for i, a in enumerate(ages):
            if a != AGE_HEADERS[i]:
                fail(f"年齢の見出しが想定と違います: {ages}")
        age_count = len(ages)

        for raw in grid[1:]:
            if len(raw) < 4:
                fail(f"列が{len(raw)}個しかない行があります: {[c for c, _ in raw]}")
            name = cell(raw[0][0]).replace("　", "")
            if not name:
                fail("施設名が空の行があります")
            values = [None] * AGE_COUNT
            notes = []
            col = 0
            for text, span in raw[3:]:
                if col >= age_count:
                    fail(f"{name}: 年齢の列が多すぎます")
                covered = list(range(col, min(col + span, age_count)))
                if text == "なし":
                    pass  # そのクラスを設けていない → null のまま
                elif re.fullmatch(r"\d+", text):
                    if span == 1:
                        values[col] = int(text)
                    else:
                        # 数だけ書いて複数の年齢にまたがるセル。年齢ごとには割れない
                        notes.append(
                            f"{covered[0]}歳〜{covered[-1]}歳で{int(text)}人"
                        )
                else:
                    m = re.fullmatch(r"(\d+)歳[〜～\-](\d+)歳で(\d+)", text)
                    if not m:
                        fail(f"{name}: 読めないセルです「{text}」")
                    notes.append(f"{m.group(1)}歳〜{m.group(2)}歳で{int(m.group(3))}人")
                col += span
            if col != age_count:
                fail(f"{name}: 年齢の列が{col}個です（{age_count}個のはず）")
            if all(v is None for v in values) and not notes:
                fail(f"{name}: 空き数が1つも読めません")
            rows.append(
                {
                    "name": name,
                    "category": sec["category"],
                    "address": cell(raw[1][0]),
                    "acceptAge": cell(raw[2][0]),
                    "values": values,
                    "mergedNotes": notes,
                }
            )

    if len(rows) < 10:
        fail(f"施設が{len(rows)}件しか取れていません")

    json.dump({"asOf": as_of, "rows": rows}, sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
