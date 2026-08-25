"""
福島市の「受入予定数 及び 申込み状況」PDFから表を抜き出す

実行: python scripts/fukushima-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-fukushima-vacancy.ts から呼ぶ）

## 表の作り
- 4ページ。列は 分類／保育施設名／住所／電話番号／定員／開所時間／保育サービス／0歳〜5歳
- **年齢の欄は上下2段**。上が受入予定数の記号、下が申込み人数
- 受入予定数の記号は ×…0人、▲…1〜2人、△…3〜5人、〇…6〜10人

## 読み取りで気をつけること
- **罫線の行と施設の行が合わない**（1つのrowに何施設ぶんもの文字が入る）ので、
  表のセルは使わない
- **同じ施設の中で、記号は施設名より約7pt上、申込み人数は約8pt下**に印字されている。
  さらに施設名が2行に分かれることもある（「ふくしま中央」＋「認定こども園」）。
  そのため**記号の行を施設の基準にして、その下にある施設名の語をつなぐ**
- 施設の分類（公立保育所／私立保育所1／地域型保育事業など）は左端の列に**縦書き**で、
  グループの縦中央に1回だけ印字されている。左端の列の横罫線でバンドに区切って割り当てる
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
MARKS = "○◯〇△▲×✕"
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")
# 同じ行とみなす縦のずれ
SAME_LINE = 4.0
# 記号の行から見て、施設名が印字されている縦の範囲
NAME_FROM = 2.0
NAME_TO = 25.0


def fail(message):
    raise SystemExit(f"[中断] {message}")


def squeeze(s):
    return "".join(str(s or "").split()).translate(ZEN)


def bands(page, x0, x1, top, bottom):
    """左端の列を横罫線で区切り、(上端, 下端, 縦書きの分類名) を返す"""
    ys = set()
    for edge in page.edges:
        if edge["orientation"] != "h":
            continue
        a, b = min(edge["x0"], edge["x1"]), max(edge["x0"], edge["x1"])
        if a <= x0 + 3 and b >= x1 - 3 and top - 2 <= edge["top"] <= bottom + 2:
            ys.add(round(edge["top"], 1))
    edges = sorted(ys)
    if len(edges) < 2:
        fail(f"分類の列の横罫線が{len(edges)}本しかありません")

    out = []
    for upper, lower in zip(edges, edges[1:]):
        if lower - upper < 20:
            continue
        words = page.crop((x0, upper + 1, x1, lower - 1)).extract_words()
        # 縦書きなので上から順につなぐ
        name = squeeze("".join(w["text"] for w in sorted(words, key=lambda w: w["top"])))
        if name:
            out.append((upper, lower, name))
    return out


def read_page(page, rows, printed):
    tables = [t for t in page.find_tables() if len(t.extract()[0]) >= 10]
    if not tables:
        return
    table = tables[0]

    # 見出しから年齢の列と「住所」の位置を決める
    heads = {}
    head_bottom = None
    address_x = None
    for word in page.crop(
        (table.bbox[0], table.bbox[1], table.bbox[2], table.bbox[1] + 40)
    ).extract_words():
        text = squeeze(word["text"])
        m = re.fullmatch(r"(\d)歳", text)
        if m:
            heads[int(m.group(1))] = (word["x0"], word["x1"])
            head_bottom = max(head_bottom or 0, word["bottom"])
        if text == "住所":
            address_x = word["x0"]
    if len(heads) != AGE_COUNT:
        fail(f"年齢の見出しが{len(heads)}個です（{AGE_COUNT}個のはず）")
    if address_x is None:
        fail("「住所」の見出しが見つかりません")

    # 分類の欄と施設名の欄の右端。見出しの位置と中身の位置がずれているので表のセルから取る。
    # 見出しの行は分類と施設名がひとつのセルになっているので、両方に分かれている行を探す
    kubun_right = None
    name_right = None
    for row in table.rows:
        if len(row.cells) > 1 and row.cells[0] is not None and row.cells[1] is not None:
            if row.cells[0][2] < row.cells[1][2]:
                kubun_right = row.cells[0][2]
                name_right = row.cells[1][2]
                break
    if kubun_right is None or name_right is None:
        fail("分類と施設名の欄の位置を取れませんでした")

    centers = [(heads[a][0] + heads[a][1]) / 2 for a in range(AGE_COUNT)]
    step = centers[1] - centers[0]
    ages_left = centers[0] - step / 2

    groups = bands(page, table.bbox[0], kubun_right, head_bottom, table.bbox[3])
    if not groups:
        fail("分類のバンドを作れませんでした")

    # 見出しは何行にも分かれているので、分類のバンドの上端から下だけを見る
    # （そうしないと「保育施設名」の見出しを施設として拾ってしまう）
    body_top = groups[0][0] + 1
    body = page.crop(
        (table.bbox[0], body_top, table.bbox[2], table.bbox[3])
    ).extract_words()

    # 記号の行を施設の基準にする（施設名は記号より下、2行に分かれることもある）
    marks_all = [
        w
        for w in body
        if (w["x0"] + w["x1"]) / 2 >= ages_left and squeeze(w["text"])[:1] in MARKS
    ]
    name_words = [
        w for w in body if kubun_right <= w["x0"] < name_right - 2 and squeeze(w["text"])
    ]

    lines = []
    for word in sorted(marks_all, key=lambda w: (w["top"], w["x0"])):
        if lines and abs(lines[-1][0]["top"] - word["top"]) <= SAME_LINE:
            lines[-1].append(word)
        else:
            lines.append([word])

    for words in lines:
        base = min(w["top"] for w in words)
        name = squeeze(
            "".join(
                w["text"]
                for w in sorted(name_words, key=lambda w: (w["top"], w["x0"]))
                if base + NAME_FROM <= w["top"] <= base + NAME_TO
            )
        )
        if not name:
            fail(f"y={round(base, 1)} の行の施設名が空です")

        marks = [None] * AGE_COUNT
        for mark_word in words:
            center = (mark_word["x0"] + mark_word["x1"]) / 2
            index = min(range(AGE_COUNT), key=lambda i: abs(centers[i] - center))
            if abs(centers[index] - center) > step * 0.6:
                continue
            mark = squeeze(mark_word["text"])[0]
            if marks[index] is not None:
                fail(f"{name}: {index}歳の欄に記号が2つあります（{marks[index]}／{mark}）")
            marks[index] = mark
            printed[mark] = printed.get(mark, 0) + 1

        kubun = next((g[2] for g in groups if g[0] <= base <= g[1]), "")
        if not kubun:
            fail(f"{name}: 分類が分かりません")
        rows.append({"kubun": kubun, "name": name, "marks": marks})


def extract(path):
    as_of = None
    target = None
    legend = []
    notes = []
    rows = []
    printed = {}
    total_printed = {}

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) < 1:
            fail("ページがありません")

        for page in pdf.pages:
            text = page.extract_text() or ""
            flat = squeeze(text)

            if as_of is None:
                m = re.search(r"令和(\d+)年(\d+)月受入予定数.*?令和(\d+)年(\d+)月(\d+)日現在", flat)
                if m:
                    target = (int(m.group(1)), int(m.group(2)))
                    as_of = (int(m.group(3)), int(m.group(4)), int(m.group(5)))

            if not legend:
                for line in text.splitlines():
                    if "…" not in line:
                        continue
                    found = re.findall(rf"([{MARKS}])…([^、。\s]+)", line)
                    if found:
                        legend = [{"mark": m, "label": l.strip()} for m, l in found]
                        break

            for line in text.splitlines():
                line = line.strip()
                if line.startswith("●") and len(line) > 10:
                    notes.append(line.lstrip("●").strip())

            read_page(page, rows, printed)

            # 印字されている記号の数。年齢の欄の範囲だけを数える
            tables = [t for t in page.find_tables() if len(t.extract()[0]) >= 10]
            if tables:
                table = tables[0]
                head_bottom = None
                left = None
                for word in page.crop(
                    (table.bbox[0], table.bbox[1], table.bbox[2], table.bbox[1] + 40)
                ).extract_words():
                    if re.fullmatch(r"\d歳", squeeze(word["text"])):
                        head_bottom = max(head_bottom or 0, word["bottom"])
                        left = min(left if left is not None else word["x0"], word["x0"])
                if head_bottom and left:
                    for word in page.crop(
                        (left - 8, head_bottom + 2, table.bbox[2], table.bbox[3])
                    ).extract_words():
                        for mark in MARKS:
                            n = word["text"].count(mark)
                            if n:
                                total_printed[mark] = total_printed.get(mark, 0) + n

    if not rows:
        fail("施設の行を取り出せませんでした")
    if as_of is None or target is None:
        fail("「令和N年M月受入予定数 … 令和N年M月D日現在」を読み取れませんでした")
    if not legend:
        fail("記号の凡例が見つかりません")

    return {
        "asOf": as_of,
        "target": target,
        "legend": legend,
        "notes": notes,
        "taken": printed,
        "printed": total_printed,
        "rows": rows,
    }


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
