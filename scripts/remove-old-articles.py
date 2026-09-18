# 自治体ファイル（src/lib/articles/<city>.ts）から、ビルダーに置き換える旧記事を外す。
#   python scripts/remove-old-articles.py --slugs scoring-system-guide,scoring-system --legacy src/lib/articles/scoring-guide/legacy.json setagaya chiba ...
# --legacy を付けると、外した記事の slug / title / publishedAt / popularity を JSON に残す（新記事が日付と URL を引き継ぐため）。
# 自治体名の代わりに --all を渡すと、該当 slug を持つ全ファイルを対象にする。
# 自治体ファイルは LF と CRLF が混在しているので、改行はファイルごとに合わせる。
import glob
import io
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CR = chr(13)
LF = chr(10)


def main():
    args = sys.argv[1:]
    slugs = None
    legacy_path = None
    cities = []
    i = 0
    while i < len(args):
        if args[i] == "--slugs":
            slugs = args[i + 1].split(",")
            i += 2
        elif args[i] == "--legacy":
            legacy_path = os.path.join(ROOT, args[i + 1])
            i += 2
        elif args[i] == "--all":
            cities = None
            i += 1
        else:
            if cities is not None:
                cities.append(args[i])
            i += 1
    if not slugs:
        sys.exit("--slugs を指定してください")
    pat = re.compile(r'slug: "(' + "|".join(re.escape(x) for x in slugs) + r')",')
    if cities is None:
        cities = [
            os.path.basename(p)[:-3]
            for p in sorted(glob.glob(os.path.join(ROOT, "src/lib/articles/*.ts")))
            if pat.search(io.open(p, encoding="utf-8").read())
        ]
    legacy = {}
    if legacy_path and os.path.exists(legacy_path):
        legacy = json.load(io.open(legacy_path, encoding="utf-8"))
    removed = 0
    for city in cities:
        p = os.path.join(ROOT, "src/lib/articles", city + ".ts")
        if not os.path.exists(p):
            print(f"{city}: ファイルなし")
            continue
        s = io.open(p, encoding="utf-8", newline="").read()
        nl = CR + LF if (CR + LF) in s else LF
        m = pat.search(s)
        if not m:
            print(f"{city}: 旧記事なし")
            continue
        start = s.rfind(nl + "  {", 0, m.start()) + len(nl)
        j = s.index("publishedAt", m.start())
        end = s.index(nl, s.index("},", j)) + len(nl)
        block = s[start:end]
        title = re.search(r'title:\s*"([^"]*)"', block)
        pub = re.search(r'publishedAt:\s*"([^"]*)"', block)
        pop = re.search(r"popularity:\s*(\d+)", block)
        legacy[city] = {
            "slug": m.group(1),
            "title": title.group(1) if title else None,
            "publishedAt": pub.group(1) if pub else None,
            "popularity": int(pop.group(1)) if pop else None,
        }
        io.open(p, "w", encoding="utf-8", newline="").write(s[:start] + s[end:])
        removed += 1
        print(f"{city}: {m.group(1)} を外した（{end - start}文字）")
    if legacy_path:
        os.makedirs(os.path.dirname(legacy_path), exist_ok=True)
        json.dump(legacy, io.open(legacy_path, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
        io.open(legacy_path, "a", encoding="utf-8").write(LF)
    print(f"{removed}件を外した")


main()
