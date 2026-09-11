# 記事の「ひとり親 +N点」「きょうだい +N点」「満点 N点」のような主張を、公式データの該当項目と突き合わせる
import re, io, glob, sys, os, collections
sys.path.insert(0, os.path.dirname(__file__))
from scan_articles import load, text, ROOT
sys.stdout.reconfigure(encoding="utf-8")

TOPICS = {
    "ひとり親": (r"(?:ひとり親|母子|父子|単親)", r"ひとり親|母子|父子|単親"),
    "きょうだい": (r"(?:きょうだい|兄弟|兄姉|姉妹)", r"きょうだい|兄弟|兄姉|姉妹|同時に|同じ園|同一園"),
    "祖父母": (r"祖父母", r"祖父母|同居|親族"),
    "認可外": (r"(?:認可外|無認可|ベビーシッター)", r"認可外|無認可|ベビーシッター|預け"),
    "育休": (r"(?:育休|育児休業)", r"育休|育児休業"),
    "生活保護": (r"生活保護", r"生活保護"),
}

def load_data():
    d = {}
    for f in glob.glob(ROOT + "src/lib/data/*.ts"):
        s = io.open(f, encoding="utf-8").read()
        m = re.search(r'slug:\s*["\']([^"\']+)["\']', s)
        if not m: continue
        items = []  # (label, points)
        for lm in re.finditer(r"label:\s*(['\"`])((?:(?!\1).)*)\1[^\n]*?points:\s*(-?\d+(?:\.\d+)?)", s):
            items.append((lm.group(2), float(lm.group(3))))
        # 設問の label（質問文）も、直後の選択肢に効かせるため持つ
        qlabels = re.findall(r"label:\s*(['\"`])((?:(?!\1).)*)\1\s*,\s*\n\s*(?:helpText|options|type|category|id|showFor)", s)
        mb = re.search(r'maxBasePoints:\s*(\d+(?:\.\d+)?)', s)
        sm = re.search(r"scoringMethod:\s*['\"](\w+)['\"]", s)
        d[m.group(1)] = dict(items=items, qlabels=[q[1] for q in qlabels], maxBase=float(mb.group(1)) if mb else None,
                              method=sm.group(1) if sm else "sum", src=s)
    return d

def topic_points(data, topic_label_re):
    pts = set()
    rx = re.compile(topic_label_re)
    src = data["src"]
    # 設問ブロック単位で見る: label に topic が出る設問の選択肢の点数を全部拾う
    for blk in re.split(r"\n\s*\{\s*\n\s*id:", src):
        if rx.search(blk):
            for p in re.findall(r"points:\s*(-?\d+(?:\.\d+)?)", blk):
                pts.add(abs(float(p)))
    for label, p in data["items"]:
        if rx.search(label): pts.add(abs(p))
    pts.discard(0)
    return pts

if __name__ == "__main__":
    arts = load(); D = load_data()
    rows = []
    for a in arts:
        if a["city"] not in D: continue
        d = D[a["city"]]; t = text(a["content"]); bad = []
        for sent in re.split(r"[。\n]", t):
            for name, (crx, lrx) in TOPICS.items():
                for m in re.finditer(crx + r"[^。\n]{0,40}?[+＋\-−－]?\s*(\d+(?:\.\d+)?)\s*点", sent):
                    v = float(m.group(1))
                    pts = topic_points(d, lrx)
                    if v not in pts:
                        bad.append((name, v, sorted(pts), sent.strip()[:100]))
            # 満点
            for m in re.finditer(r"(?:満点|最大|最高|上限)[^。\n]{0,12}?(\d+(?:\.\d+)?)\s*点", sent):
                v = float(m.group(1)); mb = d["maxBase"]
                okv = {mb, mb / 2, mb * 2} if mb else set()
                if v not in okv: bad.append(("満点", v, sorted(okv), sent.strip()[:100]))
            for m in re.finditer(r"(\d+(?:\.\d+)?)\s*点(?:満点|が満点|が上限)", sent):
                v = float(m.group(1)); mb = d["maxBase"]
                okv = {mb, mb / 2, mb * 2} if mb else set()
                if v not in okv: bad.append(("満点", v, sorted(okv), sent.strip()[:100]))
        if bad: rows.append((a, bad))
    print("不一致の記事", len(rows), "/ 自治体", len({a['city'] for a, _ in rows}))
    print(sorted(collections.Counter(a["pub"][:7] for a, _ in rows).items()))
    print(collections.Counter(b[0] for _, bad in rows for b in bad).most_common())
    cities = collections.Counter(a["city"] for a, _ in rows)
    print(cities.most_common(80))
    out = io.open(os.path.dirname(__file__) + "/topics_mismatch.txt", "w", encoding="utf-8")
    for a, bad in rows:
        out.write(f"### {a['file']} | {a['city']} | {a['slug']} | {a['pub']} | {a['title']}\n")
        for name, v, pts, s in bad: out.write(f"  [{name}] 記事 {v:g} / データ {pts} :: {s}\n")
    out.close()
