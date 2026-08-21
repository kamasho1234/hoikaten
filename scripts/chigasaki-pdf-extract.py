"""
茅ヶ崎市の「各園空き状況一覧」「待機児童数一覧」PDFから表を抜き出してJSONで返す

実行: python scripts/chigasaki-pdf-extract.py <空き状況.pdf> <待機児童数.pdf>
出力: 標準出力にJSON（fetch-chigasaki-vacancy.ts から呼ぶ）

## 表の作り
- どちらも「類型／施設名／公私区分名称／0歳クラス〜5歳クラス」。
  待機児童数のほうには合計の列と、いちばん下に市内合計の行がある
- 空きは記号（〇＝若干空きあり、×＝空きなし）
- **受け入れ対象外のクラスは網掛け**。網掛けの上にも×が印字されているので、
  文字だけ見ると「空きなし」と区別が付かない。
  そこで灰色（0.5）で塗られた矩形の位置を拾って、そのセルを shaded として返す
"""

import json
import sys

import pdfplumber

# 網掛けの灰色。他の塗り（見出しの水色、罫線の黒）と区別する
SHADE_GRAY = 0.502
SHADE_TOLERANCE = 0.05


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split())


def gray_value(color):
    """塗りの色を灰色の濃さにする。グレースケールでない塗りは None"""
    if color is None:
        return None
    if isinstance(color, (int, float)):
        return float(color)
    if isinstance(color, (list, tuple)) and len(color) == 1:
        return float(color[0])
    if isinstance(color, (list, tuple)) and len(color) == 3 and len(set(color)) == 1:
        return float(color[0])
    return None


def read_table(path, want_shaded):
    rows = []
    shaded = []
    legend = ""
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            if want_shaded and not legend:
                # 「〇：若干空きあり ×：空きなし」
                for line in (page.extract_text() or "").splitlines():
                    if "〇" in line and "×" in line and "：" in line:
                        legend = " ".join(line.split())
                        break
            shades = []
            if want_shaded:
                for rect in page.rects:
                    g = gray_value(rect.get("non_stroking_color"))
                    if g is not None and abs(g - SHADE_GRAY) < SHADE_TOLERANCE:
                        shades.append(rect)

            tables = page.find_tables()
            if len(tables) != 1:
                fail(f"1ページに表が{len(tables)}個あります: {path}")
            table = tables[0]
            extracted = table.extract()
            for row_index, row in enumerate(table.rows):
                values = [cell(c) for c in extracted[row_index]]
                marks = []
                for col_index, box in enumerate(row.cells):
                    if box is None:
                        continue
                    x0, top, x1, bottom = box
                    for rect in shades:
                        # セルの真ん中が塗りの中に入っていれば網掛けとみなす
                        cx = (x0 + x1) / 2
                        cy = (top + bottom) / 2
                        if rect["x0"] <= cx <= rect["x1"] and rect["top"] <= cy <= rect["bottom"]:
                            marks.append(col_index)
                            break
                rows.append(values)
                shaded.append(marks)
    if not rows:
        fail(f"表を取り出せませんでした: {path}")
    if want_shaded and not legend:
        fail(f"記号の凡例を読み取れませんでした: {path}")
    return rows, shaded, legend


def main():
    paths = sys.argv[1:]
    if len(paths) != 2:
        fail("空き状況PDFと待機児童数PDFのパスを順に指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")

    vacancy_rows, vacancy_shaded, legend = read_table(paths[0], want_shaded=True)
    waiting_rows, _, _ = read_table(paths[1], want_shaded=False)

    json.dump(
        {
            "vacancy": {"rows": vacancy_rows, "shaded": vacancy_shaded, "legend": legend},
            "waiting": {"rows": waiting_rows},
        },
        sys.stdout,
        ensure_ascii=False,
    )


if __name__ == "__main__":
    main()
