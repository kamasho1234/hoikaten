# src/lib/data/<slug>.ts の冒頭コメントから、点数のしくみ記事に載せる出典を抜き出す。
#   python scripts/gen-scoring-sources.py
# → src/lib/articles/scoring-guide/sources.json  { slug: { url, urls, label, applies } }
# URL がコメントに無い自治体は載せない（記事も作らない）。
import glob
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "src", "lib", "data")
OUT = os.path.join(ROOT, "src", "lib", "articles", "scoring-guide", "sources.json")

URL_RE = re.compile(r"https?://[^\s）)」>]+")


def header_lines(src: str) -> list[str]:
    """import 行のあと、最初のコードが始まるまでのコメント行（// を外したもの）"""
    out = []
    started = False
    for line in src.splitlines():
        s = line.strip()
        if s.startswith("import "):
            started = True
            continue
        if not started:
            continue
        if s == "":
            continue
        if s.startswith("//"):
            body = s[2:].strip()
            if set(body) <= set("-= "):
                continue
            out.append(body)
            continue
        if s.startswith("/*") or s.startswith("*"):
            out.append(s.lstrip("/* ").rstrip("*/ "))
            continue
        break
    return out


def pick_label(lines: list[str], city: str) -> str:
    # 「出典」を含む行と、その直後のインデント続き行を資料名にする（URL は除く）
    for i, l in enumerate(lines):
        if "出典" in l:
            text = re.sub(r"^.*?出典\s*[:：]\s*", "", l)
            text = URL_RE.sub("", text).strip(" 　")
            # 「（…」で終わる括弧の開きっぱなしは閉じる
            if text.count("（") > text.count("）"):
                text += "）"
            if text.count("(") > text.count(")"):
                text += ")"
            j = i + 1
            # 続き行は、資料名の一部に見えるものだけ足す（「計算方式:」のような説明は足さない）
            while j < len(lines) and j - i <= 2 and not URL_RE.search(lines[j]) and "http" not in lines[j]:
                nxt = lines[j].strip(" 　")
                if (
                    nxt
                    and len(nxt) < 50
                    and re.search(r"表|案内|ガイド|基準|規則|要綱|条例|課|部|別表|P\d", nxt)
                    and not re.search(r"[:：]|注|※|方式|20\d\d-", nxt)
                ):
                    text = f"{text} {nxt}".strip()
                    j += 1
                else:
                    break
            if text:
                return tidy(text)
    return f"{city}の利用調整基準表"


def tidy(text: str) -> str:
    """「（…）続き」の形なら括弧の中身だけを資料名にする。開きっぱなしの括弧は閉じる"""
    text = text.strip()
    m = re.match(r"^[（(](.+?)[）)](.*)$", text)
    if m:
        inner = m.group(1)
        # 括弧の中に括弧があるときは対応を数えて取り出す
        depth = 0
        for i, ch in enumerate(text):
            if ch in "（(":
                depth += 1
            elif ch in "）)":
                depth -= 1
                if depth == 0:
                    inner = text[1:i]
                    break
        text = inner.strip()
    text = text[:90]
    if text.count("「") > text.count("」"):
        text += "」"
    if text.count("（") > text.count("）"):
        text += "）"
    if text.count("(") > text.count(")"):
        text += ")"
    return text


def pick_applies(lines: list[str]) -> str | None:
    text = " ".join(lines)
    m = re.search(r"(令和\s*\d+\s*年\s*度?[^。\n、）)]{0,25}?(?:適用|入所|入園|入園分|版|以降))", text)
    if m:
        return re.sub(r"\s+", "", m.group(1))
    m = re.search(r"(20\d\d\s*年\s*度?[^。\n、）)]{0,20}?(?:適用|入所|入園|版))", text)
    if m:
        return re.sub(r"\s+", "", m.group(1))
    m = re.search(r"令和\s*\d+\s*年\s*度?", text)
    return re.sub(r"\s+", "", m.group(0)) if m else None


def main():
    out = {}
    skipped = []
    for path in sorted(glob.glob(os.path.join(DATA, "*.ts"))):
        slug = os.path.basename(path)[:-3]
        if slug == "index":
            continue
        src = open(path, encoding="utf-8").read()
        lines = header_lines(src)
        urls = []
        for l in lines:
            for u in URL_RE.findall(l):
                u = u.rstrip("。、.")
                if u not in urls:
                    urls.append(u)
        if not urls:
            skipped.append(slug)
            continue
        m = re.search(r"name:\s*['\"]([^'\"]+)['\"]", src)
        city = m.group(1) if m else slug
        out[slug] = {
            "url": urls[0],
            "urls": urls[:4],
            "label": pick_label(lines, city),
            "applies": pick_applies(lines),
        }
    # データファイルのコメントに URL が無い自治体は、手で確かめた sources-extra.json で補う
    extra_path = os.path.join(os.path.dirname(OUT), "sources-extra.json")
    if os.path.exists(extra_path):
        extra = json.load(open(extra_path, encoding="utf-8"))
        for slug, v in extra.items():
            if slug in out:
                continue
            out[slug] = {"url": v["url"], "urls": v.get("urls", [v["url"]]), "label": v["label"], "applies": v.get("applies")}
            if slug in skipped:
                skipped.remove(slug)
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    json.dump(out, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    open(OUT, "a", encoding="utf-8").write("\n")
    print(f"{len(out)}件を書き出した → {OUT}")
    print(f"URL なし {len(skipped)}件: {' '.join(skipped)}")


if __name__ == "__main__":
    main()
