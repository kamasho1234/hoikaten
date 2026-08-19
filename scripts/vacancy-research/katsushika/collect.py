"""
葛飾区の施設案内ページから、保育施設のページURL・所在地・電話番号を集める

実行: python scripts/vacancy-research/katsushika/collect.py <出力先JSON>

## 集め方
区の「施設案内」は種別ごとにカテゴリページがあり、**各ページの表に
「施設名（リンク）／〒＋所在地／電話番号」が並ぶ**。sitemap.xml は404なので、
このカテゴリページを辿るしかない。

- 区立保育園   /institution/1030224/1000100/1007108/index.html
- 私立保育園   /institution/1030224/1000100/1007109/index.html
- 認定こども園 /institution/1030224/1000100/1007110/index.html
- 小規模保育事業所・保育ママも同じ階層にあるので、親カテゴリから拾えるものは拾う

URLの生存確認と、ページ内に施設名があることの確認は verify 側で行う。
"""

import json
import re
import sys
import urllib.parse
import urllib.request

BASE = "https://www.city.katsushika.lg.jp"
UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)"
CATEGORIES = {
    "区立保育園": "/institution/1030224/1000100/1007108/index.html",
    "私立保育園": "/institution/1030224/1000100/1007109/index.html",
    "認定こども園": "/institution/1030224/1000100/1007110/index.html",
}
# 施設種別の親カテゴリ。ここから小規模保育事業所などのカテゴリを見つける
PARENT = "/institution/1030224/1000100/index.html"


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=40) as res:
        return res.read().decode("utf-8", "replace")


def parse_list(html, page_url):
    """
    表ではなくリンクの並びで施設を出しているページ（認定こども園）から拾う。

    リンク文言が「幼保連携型認定こども園　まどか幼稚園」のように**種別＋施設名**なので、
    種別の接頭辞を落とした名前も候補として持たせる。所在地と電話はこの形式では取れない。
    """
    out = []
    body = html[html.find('<article id="content"') :]
    for href, label in re.findall(r'<a[^>]*href="([^"]+)"[^>]*>([^<]{2,60})</a>', body):
        name = " ".join(label.split())
        if "こども園" not in name:
            continue
        short = re.sub(r"^(幼保連携型|幼稚園型|保育所型|地方裁量型)?認定こども園\s*", "", name).strip()
        out.append(
            {
                "name": name,
                "shortName": short,
                "url": urllib.parse.urljoin(page_url, href),
                "address": "",
                "tel": "",
            }
        )
    return out


def parse_rows(html, page_url):
    """
    表の行から（施設名, URL, 所在地, 電話）を取り出す。

    **施設名で絞り込んではいけない**。「キッズスマイル葛飾東水元」のように
    名前に「保育」が入らない園があり、名前フィルタだと落ちる。
    代わりに**同じ行に葛飾区の所在地セルがあること**を施設行の条件にする。
    """
    out = []
    for row in re.findall(r"<tr>(.*?)</tr>", html, re.S):
        link = re.search(r'<a[^>]*href="([^"]+)"[^>]*>([^<]+)</a>', row)
        if not link:
            continue
        name = " ".join(link.group(2).split())
        cells = [re.sub(r"<[^>]+>", " ", c) for c in re.findall(r"<td[^>]*>(.*?)</td>", row, re.S)]
        cells = [" ".join(c.split()) for c in cells]
        # 区立・私立の表は「〒125-0031 東京都葛飾区西水元2-16-10」だが、
        # 小規模・保育ママの表は区名が無く「〒125-0062 青戸3-10-5」と書かれる
        address = next((c for c in cells if "葛飾区" in c or re.search(r"〒\s*\d{3}-?\d{4}", c)), "")
        if not address:
            continue
        tel = next((c for c in cells if re.fullmatch(r"[0-9\-]{9,13}", c.strip())), "")
        out.append(
            {
                "name": name,
                "url": urllib.parse.urljoin(page_url, link.group(1)),
                "address": address,
                "tel": tel.strip(),
            }
        )
    return out


def main():
    if len(sys.argv) != 2:
        raise SystemExit("出力先のJSONパスを指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")

    categories = dict(CATEGORIES)
    # 親カテゴリから保育関係のカテゴリを足す（小規模保育事業所など）
    try:
        parent_html = fetch(BASE + PARENT)
        for href, label in re.findall(r'<a[^>]*href="([^"]+)"[^>]*>([^<]{2,30})</a>', parent_html):
            label = label.strip()
            if re.search(r"(小規模保育|保育ママ|家庭的保育|保育室)", label) and label not in categories:
                categories[label] = urllib.parse.urljoin(BASE + PARENT, href).replace(BASE, "")
    except Exception as exc:  # 親カテゴリが取れなくても主要3種は集める
        print(f"（親カテゴリを取得できませんでした: {exc}）", file=sys.stderr)

    records = []
    seen = set()
    for label, path in categories.items():
        url = BASE + path if path.startswith("/") else path
        try:
            html = fetch(url)
        except Exception as exc:
            print(f"{label}: 取得できません（{exc}）", file=sys.stderr)
            continue
        rows = parse_rows(html, url)
        if not rows:
            rows = parse_list(html, url)
        added = 0
        for r in rows:
            if r["url"] in seen:
                continue
            seen.add(r["url"])
            r["category"] = label
            records.append(r)
            added += 1
        print(f"{label}: {added}件")

    with open(sys.argv[1], "w", encoding="utf-8", newline="\n") as f:
        json.dump({"source": BASE, "facilities": records}, f, ensure_ascii=False, indent=1)
        f.write("\n")
    print(f"\n合計 {len(records)}件を書き出しました: {sys.argv[1]}")


if __name__ == "__main__":
    main()
