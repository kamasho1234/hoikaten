"""
中野区の「保育施設一覧」ページから、各園のサイトURL・所在地・電話を集める

実行: python scripts/vacancy-research/nakano/collect.py <出力先JSON>

## 集め方
中野区の一覧表には**園そのものの公式サイト（外部サイト）**が並んでいる。
区のページではなく運営法人・園のサイトなので、`type` は "facility"（法人サイトのときは "corp"）
として扱えるが、区の一覧に載っているURLをそのまま使うので出所は区の公式ページである。

表の各行は「施設名（外部サイト）／区分／所在地／電話」。
施設名の末尾に付く「（外部サイト）」は表示上の飾りなので落とす。
"""

import html as html_mod
import json
import re
import sys
import urllib.parse
import urllib.request

BASE = "https://www.city.tokyo-nakano.lg.jp"
# **認可保育園の一覧ページには認定こども園と地域型が載っていない**。
# それぞれ専用ページがあるので3ページとも見る
PAGES = [
    "/kosodate/kosodatesite_ohirune/mokuteki/hoikuen/hoikuen/goannnai/hoikushisetsuichiran.html",
    "/kosodate/kosodatesite_ohirune/mokuteki/hoikuen/hoikuen/goannnai/ninteikodomoen.html",
    "/kosodate/kosodatesite_ohirune/mokuteki/hoikuen/hoikuen/goannnai/jigyosyoichiran.html",
]
UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)"


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=40) as res:
        return res.read().decode("utf-8", "replace")


def clean(s):
    s = html_mod.unescape(s or "")
    s = re.sub(r"<[^>]+>", " ", s)
    return " ".join(s.split())


def collect_rows(html, url, records, seen):
    """1ページぶんの表から施設の行を集める"""
    for row in re.findall(r"<tr>(.*?)</tr>", html, re.S):
        cells = [clean(c) for c in re.findall(r"<t[dh][^>]*>(.*?)</t[dh]>", row, re.S)]
        if len(cells) < 3:
            continue
        name = re.sub(r"[（(]外部サイト[）)]", "", cells[0]).strip()
        if not name or name in ("施設名", "名称", "保育園名", "事業所名"):
            continue
        link = re.search(r'<a[^>]*href="([^"]+)"', row)
        site = urllib.parse.urljoin(url, link.group(1)) if link else ""
        # ページ内リンク（#…）は施設サイトではない
        if "#" in site.replace(url, "") and site.startswith(url):
            site = ""
        address = next((c for c in cells if "丁目" in c or "番" in c), "")
        tel = next((c for c in cells if re.fullmatch(r"[0-9\-]{9,13}", c.strip())), "")
        key = (name, site)
        if key in seen:
            continue
        seen.add(key)
        records.append(
            {
                "name": name,
                "url": site,
                "kubun": cells[1] if len(cells) > 1 else "",
                "address": address,
                "tel": tel,
            }
        )


def main():
    if len(sys.argv) != 2:
        raise SystemExit("出力先のJSONパスを指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")

    records = []
    seen = set()
    for page_path in PAGES:
        url = BASE + page_path
        try:
            html = fetch(url)
        except Exception as exc:
            print(f"{page_path}: 取得できません（{exc}）", file=sys.stderr)
            continue
        before = len(records)
        collect_rows(html, url, records, seen)
        print(f"{page_path.split('/')[-1]}: {len(records) - before}件")
    withUrl = sum(1 for r in records if r["url"])
    print(f"一覧の行: {len(records)}件（うちサイトURLあり {withUrl}件）")
    with open(sys.argv[1], "w", encoding="utf-8", newline="\n") as f:
        json.dump({"source": url, "facilities": records}, f, ensure_ascii=False, indent=1)
        f.write("\n")
    print(f"書き出しました: {sys.argv[1]}")


if __name__ == "__main__":
    main()
