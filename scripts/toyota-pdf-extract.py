"""
豊田市の「こども園等 空き状況・申込状況一覧表」PDFから表を抜き出してJSONで返す

実行: python scripts/toyota-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-toyota-vacancy.ts から呼ぶ）

## 表の作り
- 2ページ。1ページめは市街地、2ページめは地区ごと（左端に「地区」の列が増える）
- 見出しは2段。上段が「空き状況／申込状況」、下段が「園名かな／園名／園名ﾛｰﾏ字／定員／
  ０〜２歳児／３歳児／４歳児／５歳児」（空き状況と申込状況で同じ並びが2回）
- **年齢が「０〜２歳児／３歳児／４歳児／５歳児」の4区分**で、0〜2歳がまとまっている
- 「未実施」（そのクラスを設けていない）、「直接園にお尋ねください」、
  「令和8年度は休園」が、年齢の欄をまたいで横に結合して入る。
  **どの年齢までまたいでいるかは、升目の横幅を見ないと分からない。**
  文字だけを見ると「大畑 = 未実施 / △ / 空 / 空」となり、
  4歳児と5歳児が読み取り漏れなのか、3歳児の「△」がそこまで掛かっているのか
  区別できない。升目の右端の位置を、見出しの列の境目と突き合わせて決める
"""

import json
import re
import sys

import pdfplumber

# 空き状況の欄（0〜2歳児・3歳児・4歳児・5歳児）
AGE_LABELS = ["０〜２歳児", "３歳児", "４歳児", "５歳児"]
# 年齢の欄をまたいで入る言葉
SPANNING = ("未実施", "直接園にお尋ねください", "休園")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    return "".join(str(s or "").split())


def extract(path):
    rows = []
    as_of = None
    target = None
    legend = []

    with pdfplumber.open(path) as pdf:
        for page_index, page in enumerate(pdf.pages):
            flat = "".join((page.extract_text() or "").split())
            if page_index == 0:
                m = re.search(r"令和(\d+)年(\d+)月(\d+)日時点", flat)
                if not m:
                    fail("「令和N年M月D日時点」を読み取れませんでした")
                as_of = [int(g) for g in m.groups()]
                m = re.search(r"令和(\d+)年(\d+)月入園希望者用", flat)
                if not m:
                    fail("「令和N年M月入園希望者用」を読み取れませんでした")
                target = [int(m.group(1)), int(m.group(2))]
                # 「【乳児】×…空席なし、△…１〜４席空席有 ▲…１、２歳児空席有、〇…５席以上空席有」
                for mark, label in re.findall(r"([○◯〇△▲×✕])…([^、。\s]+)", flat):
                    if not any(l["mark"] == mark for l in legend):
                        legend.append({"mark": mark, "label": label})

            tables = page.find_tables()
            if len(tables) != 1:
                fail(f"{page_index + 1}ページ目の表が{len(tables)}個です（1個のはず）")
            extracted = [[cell(c) for c in r] for r in tables[0].extract()]
            if len(extracted) < 3:
                fail(f"{page_index + 1}ページ目に施設の行がありません")

            head = extracted[1]
            if "園名" not in head:
                fail(f"{page_index + 1}ページ目の見出しが想定と違います: {head}")
            name_col = head.index("園名")
            # 年齢の欄は「空き状況」側（先に出てくるほう）を使う
            age_cols = []
            for label in AGE_LABELS:
                if label not in head:
                    fail(f"{page_index + 1}ページ目に「{label}」の見出しがありません: {head}")
                age_cols.append(head.index(label))
            if age_cols != list(range(age_cols[0], age_cols[0] + len(AGE_LABELS))):
                fail(f"{page_index + 1}ページ目の年齢の欄が並んでいません: {age_cols}")

            # 見出しの行から、年齢の欄それぞれの右端を取る（結合の広がりを測るため）
            head_row = tables[0].rows[1]
            edges = []
            for c in age_cols:
                box = head_row.cells[c]
                if box is None:
                    fail(f"{page_index + 1}ページ目の年齢の見出しの位置を取れません")
                edges.append(box[2])

            for row_index, row in enumerate(extracted[2:], start=2):
                name = row[name_col]
                if not name or name == "園名":
                    continue
                cells = tables[0].rows[row_index].cells
                values = [""] * len(AGE_LABELS)
                for i, c in enumerate(age_cols):
                    box = cells[c] if c < len(cells) else None
                    if box is None:
                        continue
                    text = row[c]
                    if not text:
                        continue
                    # 升目の右端がどの年齢の欄まで届いているかで、掛かる範囲を決める
                    last = i
                    for j in range(i, len(AGE_LABELS)):
                        if box[2] >= edges[j] - 2:
                            last = j
                    marks = [c for c in text if c in "○◯〇△▲×✕"]
                    if len(marks) > 1:
                        # 1つの升目に記号が2つ以上入ることがある（大草の「△」と「〇」）。
                        # 文字の位置から、どの年齢の欄のものかを決める
                        chars = sorted(
                            (
                                c
                                for c in page.chars
                                if box[0] <= c["x0"] <= box[2]
                                and box[1] - 2 <= c["top"] <= box[3] + 2
                                and c["text"] in "○◯〇△▲×✕"
                            ),
                            key=lambda c: c["x0"],
                        )
                        for c in chars:
                            center = (c["x0"] + c["x1"]) / 2
                            near = min(
                                range(len(AGE_LABELS)),
                                key=lambda j: abs(edges[j] - center),
                            )
                            # 中心が右端より左の欄に入るよう、届いている欄から選ぶ
                            for j in range(i, last + 1):
                                if center <= edges[j]:
                                    near = j
                                    break
                            values[near] = c["text"]
                        # 記号が入らなかった欄は、左隣と同じ扱い（結合の続き）
                        for j in range(i, last + 1):
                            if not values[j]:
                                values[j] = values[j - 1] if j > i else marks[0]
                        continue
                    for j in range(i, last + 1):
                        values[j] = text
                rows.append({"name": name, "values": values})

    if as_of is None or target is None:
        fail("時点か対象月を読み取れませんでした")
    if not rows:
        fail("施設の行を取り出せませんでした")
    if len(legend) < 3:
        fail(f"記号の凡例を読み取れませんでした（{len(legend)}件）")
    return {"asOf": as_of, "target": target, "legend": legend, "rows": rows}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
