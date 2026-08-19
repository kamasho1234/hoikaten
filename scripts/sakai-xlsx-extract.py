"""
堺市の「認定こども園・保育所などの空き状況」Excelを読んでJSONで返す

実行: python scripts/sakai-xlsx-extract.py <xlsx>
出力: 標準出力にJSON（fetch-sakai-vacancy.ts から呼ぶ）

## ファイルの作り
- シートは1枚（「公表」）。先頭に表題と注意事項があり、
  「所在区／施設種別／施設名／所在地」の見出し行から表が始まる。
- **年齢の見出しは次の行**にあり、しかも5歳→0歳の逆順で並ぶ。
- ページの変わり目に見出し行がもう一度入る。
"""

import json
import sys

import openpyxl


def fail(message):
    raise SystemExit(f"[中断] {message}")


def text(v):
    if v is None:
        return ""
    return " ".join(str(v).split())


def extract(path):
    book = openpyxl.load_workbook(path, data_only=True)
    ws = book.worksheets[0]
    rows = [[text(c) for c in r] for r in ws.iter_rows(values_only=True)]

    header = next((i for i, r in enumerate(rows) if r and r[0] == "所在区"), None)
    if header is None:
        fail("「所在区」の見出し行が見つかりません")
    head = rows[header]
    if head[1] != "施設種別" or head[2] != "施設名" or head[3] != "所在地":
        fail(f"見出しが想定と違います: {head[:6]}")
    # 年齢の見出しは次の行の5列目から
    age_heads = [c for c in rows[header + 1][4:] if c]
    if len(age_heads) != 6:
        fail(f"年齢の見出しが6つではありません: {age_heads}")

    title = next((c for r in rows[: header] for c in r if c), "")
    lead = ""
    for r in rows[:header]:
        for c in r:
            if "時点" in c:
                lead = c
                break
        if lead:
            break
    if not lead:
        fail("「令和X年Y月Z日時点」を含む説明が見つかりません")

    return {
        "title": title,
        "lead": lead,
        "ageHeads": age_heads,
        "rows": rows[header + 2 :],
    }


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("Excelのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
