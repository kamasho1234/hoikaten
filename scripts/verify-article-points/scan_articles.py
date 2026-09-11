# 自治体コラム（src/lib/articles）を読み込む共通部品
import re, io, glob, sys, collections, json, os
sys.stdout.reconfigure(encoding="utf-8")
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..") + "/"

def field(block, name):
    # name: "..."  or name: `...`  or name:\n "..."
    m = re.search(r'\b' + name + r':\s*"((?:[^"\\]|\\.)*)"', block)
    if m: return m.group(1)
    m = re.search(r'\b' + name + r':\s*`((?:[^`\\]|\\.)*)`', block)
    if m: return m.group(1)
    return None

def load():
    arts = []
    for f in sorted(glob.glob(ROOT + "src/lib/articles/*.ts")):
        s = io.open(f, encoding="utf-8").read()
        if "registerArticles" not in s: continue
        # 記事オブジェクトは "  {\n    slug:" で始まる
        parts = re.split(r'\n  \{\n(?=\s*slug:)', s)
        for blk in parts[1:]:
            slug = field(blk, "slug"); city = field(blk, "citySlug")
            content = field(blk, "content")
            if not slug or not city or content is None: continue
            arts.append(dict(file=f.replace("\\", "/").split("/")[-1], slug=slug, city=city,
                             title=field(blk, "title") or "", desc=field(blk, "description") or "",
                             content=content, pub=field(blk, "publishedAt") or ""))
    return arts

def text(html):
    t = re.sub(r"</(p|li|h2|h3|tr|td|th)>", "\n", html)
    t = re.sub(r"<[^>]+>", " ", t)
    return re.sub(r"[ \t]+", " ", t)

if __name__ == "__main__":
    arts = load()
    print("total", len(arts), "general", sum(a["city"] == "general" for a in arts))
    c = collections.Counter(a["pub"][:7] for a in arts)
    print(sorted(c.items()))
    num = re.compile(r"\d+(?:[.,]\d+)?\s*(?:点|円|万円|%|％|時間|日|週間|か月|ヶ月|カ月|年度|園|人|施設|km|m以内)")
    flag = [a for a in arts if a["city"] != "general" and num.search(text(a["content"]))]
    print("数字入り", len(flag))
    print(sorted(collections.Counter(a["pub"][:7] for a in flag).items()))
