"""
江東区の「認可保育園等の紹介」ページから、各園の紹介PDFのURLを集める

実行: python scripts/vacancy-research/koto/collect.py <出力先JSON>

## 集め方
江東区は**施設ごとのWebページを持たず、園ごとの紹介PDF（チラシ）**を
地区別の紹介ページからリンクしている。リンクの文言がそのまま施設名なので、
文言と空き状況の施設名を突き合わせて対応づける。

大田区の前例どおり、リンク先がPDFでも掲載できる（UI側が「（PDF）」と示す）。
"""

import html as html_mod
import json
import re
import sys
import urllib.parse
import urllib.request

BASE = "https://www.city.koto.lg.jp"
UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)"
INDEX = "/kodomo/hoiku/ninka/shokai/index.html"


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=40) as res:
        return res.read().decode("utf-8", "replace")


def clean_label(s):
    """
    「おはよう保育園 清澄白河（PDF：744KB）（別ウィンドウで開きます）」→ 施設名

    **数値文字参照が入る**（`Kid&#39;sPatio`）ので先にデコードする。
    """
    s = html_mod.unescape(s)
    s = " ".join(s.split())
    s = re.sub(r"[（(]PDF[：:][^）)]*[）)]", "", s)
    s = re.sub(r"[（(]別ウィンドウで開きます[）)]", "", s)
    return s.strip()


def main():
    if len(sys.argv) != 2:
        raise SystemExit("出力先のJSONパスを指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")

    index_html = fetch(BASE + INDEX)
    areas = []
    for href, label in re.findall(r'<a[^>]*href="([^"]+)"[^>]*>([^<]{2,60})</a>', index_html):
        if "認可保育園等の紹介（" in label:
            areas.append((urllib.parse.urljoin(BASE + INDEX, href), " ".join(label.split())))
    if not areas:
        raise SystemExit("[中断] 地区別の紹介ページが見つかりません。")

    records = []
    seen = set()
    for url, label in areas:
        html = fetch(url)
        added = 0
        for href, text in re.findall(r'<a[^>]*href="([^"]+\.pdf)"[^>]*>([^<]{2,80})</a>', html):
            name = clean_label(text)
            if not name:
                continue
            full = urllib.parse.urljoin(url, href)
            if full in seen:
                continue
            seen.add(full)
            records.append({"name": name, "url": full, "area": label})
            added += 1
        print(f"{label}: {added}件")

    with open(sys.argv[1], "w", encoding="utf-8", newline="\n") as f:
        json.dump({"source": BASE + INDEX, "facilities": records}, f, ensure_ascii=False, indent=1)
        f.write("\n")
    print(f"\n合計 {len(records)}件を書き出しました: {sys.argv[1]}")


if __name__ == "__main__":
    main()
