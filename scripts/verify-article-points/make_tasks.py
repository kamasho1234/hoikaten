# 公式データと食い違う点数を書いている記事を自治体ごとにまとめ、修正タスクのファイルを作る
import re, io, sys, os, collections, json
sys.path.insert(0, os.path.dirname(__file__))
from scan_articles import load, text, ROOT
from check_topics import load_data, topic_points, TOPICS
sys.stdout.reconfigure(encoding="utf-8")

STRICT = {n: re.compile(c + r"[^。\n、）)]{0,14}?[（(]?\s*[+＋\-−－]\s*(\d+(?:\.\d+)?)\s*点") for n, (c, l) in TOPICS.items()}
MAXRX = re.compile(r"(?:父母各|それぞれ|1人あたり|一人あたり|各)\s*(?:最大|満点)?\s*(\d+)\s*点|合計\s*(\d+)\s*点満点|(\d+)\s*点満点|満点(?:の|は|が)\s*(\d+)\s*点|最大\s*(\d+)\s*点")

def find_flags(arts, D):
    flags = collections.defaultdict(list)  # (city) -> [(file, slug, title, [sentences])]
    for a in arts:
        if a["city"] not in D: continue
        d = D[a["city"]]; t = text(a["content"]); bad = []
        for sent in re.split(r"[。\n]", t):
            s = sent.strip()
            for n, rx in STRICT.items():
                for m in rx.finditer(s):
                    v = float(m.group(1))
                    pts = topic_points(d, TOPICS[n][1])
                    if v != 0 and v not in pts:
                        bad.append(f"[{n}] 記事は{v:g}点 / データの該当項目 {sorted(pts) or 'なし'} :: {s[:120]}")
            for m in MAXRX.finditer(s):
                v = float([g for g in m.groups() if g][0]); mb = d["maxBase"]
                per = mb / 2 if d["method"] == "sum" else mb
                if mb and v not in {mb, per}:
                    bad.append(f"[満点] 記事は{v:g}点 / データは世帯{mb:g}点・1人{per:g}点（{d['method']}方式） :: {s[:120]}")
        # タイトル・説明にも
        for fld in ("title", "desc"):
            for n, rx in STRICT.items():
                for m in rx.finditer(a[fld]):
                    v = float(m.group(1)); pts = topic_points(d, TOPICS[n][1])
                    if v != 0 and v not in pts:
                        bad.append(f"[{n}/{fld}] 記事は{v:g}点 / データの該当項目 {sorted(pts) or 'なし'} :: {a[fld][:120]}")
        if bad:
            flags[a["city"]].append((a["file"], a["slug"], a["title"], sorted(set(bad))))
    return flags

if __name__ == "__main__":
    arts = load(); D = load_data()
    flags = find_flags(arts, D)
    outdir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "tasks", "article-points")
    os.makedirs(outdir, exist_ok=True)
    for f in os.listdir(outdir): os.remove(outdir + "/" + f)
    n_art = 0
    for city, lst in sorted(flags.items()):
        d = D[city]
        name = re.search(r"name:\s*['\"]([^'\"]+)['\"]", d["src"]).group(1)
        files = sorted({x[0] for x in lst})
        with io.open(f"{outdir}/{city}.md", "w", encoding="utf-8") as o:
            o.write(f"# {name}（slug: {city}）\n\n")
            o.write(f"- 公式データ: src/lib/data/{city}.ts（scoringMethod={d['method']}, maxBasePoints={d['maxBase']:g}）\n")
            o.write(f"- 記事ファイル: {', '.join('src/lib/articles/' + f for f in files)}\n\n")
            for file, slug, title, bad in lst:
                n_art += 1
                o.write(f"## {slug}（{file}）\n{title}\n")
                for b in bad: o.write(f"- {b}\n")
                o.write("\n")
    print("自治体", len(flags), "記事", n_art)
    json.dump({c: [x[1] for x in lst] for c, lst in flags.items()}, io.open(outdir + "/_index.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
