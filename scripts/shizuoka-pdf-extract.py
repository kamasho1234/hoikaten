"""
静岡市の「こども園等の入園選考後の状況」PDFから表を抜き出す

実行: python scripts/shizuoka-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-shizuoka-vacancy.ts から呼ぶ）

## 表の作り
- 3ページ。1ページに1区（葵区・駿河区・清水区）
- 9列（施設の種類／園名／所在地／0歳クラス〜5歳クラス）
- 空きは記号（◎十分余裕あり／○余裕あり／△残りわずか／－受入枠なし／
  ※直接園にお問い合わせください）。設けていないクラスは空欄
- 施設の種類は縦結合で、ブロックのいちばん上の行にだけ入る
- 園名の末尾の★は市立、◆は新設園
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 3 + AGE_COUNT
COL_NAME = 1
COL_AGE0 = 3
MARKS = "◎○◯〇△－-※"
# 文字クラスに入れる用。ハイフンは範囲と間違われるのでエスケープする
MARKS_CLASS = r"◎○◯〇△－\-※"


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split())


def extract(path):
    sections = []
    legend = []
    target = None
    mark_counts = {}

    with pdfplumber.open(path) as pdf:
        for page_index, page in enumerate(pdf.pages):
            text = page.extract_text() or ""
            flat = "".join(text.split())
            z = str.maketrans("０１２３４５６７８９", "0123456789")

            if page_index == 0:
                m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月入園選考後", flat.translate(z))
                if not m:
                    fail("対象月を読み取れませんでした")
                target = (int(m.group(1)), int(m.group(2)))

            if not legend:
                # 「（注釈）◎：十分余裕あり ○：余裕あり …」
                for mark, label in re.findall(rf"([{MARKS_CLASS}])：([^{MARKS_CLASS}\s]+)", flat):
                    legend.append({"mark": mark, "label": label})

            ward = None
            for line in text.splitlines():
                m = re.search(r"≪([^≫]+)≫", line)
                if m:
                    ward = "".join(m.group(1).split())
                    break
            if not ward:
                fail(f"{page_index + 1}ページめの区名を読み取れませんでした")

            tables = page.find_tables()
            if len(tables) != 1:
                fail(f"{page_index + 1}ページめの表が{len(tables)}件あります")
            extracted = tables[0].extract()
            if len(extracted[0]) != EXPECTED_COLUMNS:
                fail(f"{page_index + 1}ページめの列数が{len(extracted[0])}になっています")
            # 見出しは「０歳クラス」のページと「０歳児」のページがある
            labels = [cell(c).translate(z) for c in extracted[0][COL_AGE0 : COL_AGE0 + AGE_COUNT]]
            for i, label in enumerate(labels):
                if not re.fullmatch(rf"{i}歳(クラス|児)", label):
                    fail(f"{page_index + 1}ページめの歳児の見出しが{labels}になっています")

            # 記号の数。凡例や注意書きにも記号が出てくるので、
            # 歳児の欄のx座標の中だけを切り出して数える
            header = tables[0].rows[0].cells[COL_AGE0 : COL_AGE0 + AGE_COUNT]
            if any(c is None for c in header):
                fail(f"{page_index + 1}ページめの歳児の見出しの位置を取れませんでした")
            box = (header[0][0], tables[0].rows[0].bbox[3], header[-1][2], tables[0].bbox[3])
            for word in page.crop(box).extract_words():
                for mark in MARKS:
                    mark_counts[mark] = mark_counts.get(mark, 0) + word["text"].count(mark)

            rows = []
            for row in extracted[1:]:
                values = [cell(c) for c in row]
                if not values[COL_NAME]:
                    continue
                rows.append(values)
            if not rows:
                fail(f"{ward}: 施設の行がありません")
            sections.append({"ward": ward, "rows": rows})

    if not sections:
        fail("空き状況の表を取り出せませんでした")
    if len(legend) < 4:
        fail(f"記号の凡例を読み取れませんでした（{len(legend)}件）")

    return {
        "target": target,
        "legend": legend,
        "markCounts": {k: v for k, v in mark_counts.items() if v},
        "sections": sections,
    }


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
