# 自治体コラムの断片ファイル（batch-N.ts）の機械チェック
#
#   python scripts/article-batch/check.py <slug> <作業ディレクトリ> [batch-1.ts ...]
#
# 作業ディレクトリに facts.md（記事に書いてよい数字・URL の一覧）と batch-*.ts を置く。
# 見るもの: 絵文字／他市の固有語／URL が facts.md の一覧にあるか／本文の長さ／h2 の数／
#           point-box・info-box の有無／category と categoryColor の組み合わせ／slug の重複
# これで拾えるのは構成の不足だけ。数字の使いどころの誤りは全文を通読しないと見つからない（README 参照）
import glob
import os
import re
import sys

sys.stdout.reconfigure(encoding="utf-8")

slug_city, D = sys.argv[1], sys.argv[2]
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
facts = open(os.path.join(D, "facts.md"), encoding="utf-8").read()
allowed = set(re.findall(r"https?://[^\s|)]+", facts)) | {f"/{slug_city}", f"/{slug_city}/vacancy"}
files = sys.argv[3:] or sorted(glob.glob(os.path.join(D, "batch-*.ts")))
existing_path = os.path.join(ROOT, "src", "lib", "articles", f"{slug_city}.ts")
existing = set()
if os.path.exists(existing_path):
    existing = set(re.findall(r'slug: "([^"]+)"', open(existing_path, encoding="utf-8").read()))

CATEGORIES = {
    ("保活の基本", "green"), ("選考のしくみ", "blue"), ("点数アップ", "amber"), ("育休・復職", "blue"),
    ("園えらび", "teal"), ("制度を知る", "rose"), ("お金の話", "rose"), ("データ", "purple"), ("最新情報", "purple"),
}
FORBIDDEN = ["仙台", "青葉区", "宮城野区", "若林区", "太白区", "泉区", "20点満点", "待機児童ゼロ", "筆者", "私たち運営", "区役所"]

seen = set()
total = bad = 0
for f in files:
    s = open(f, encoding="utf-8").read()
    for slug, body in re.findall(r'  \{\n    slug: "([^"]+)",(.*?)\n  \},', s, re.S):
        total += 1
        errs = []
        if slug in seen or slug in existing:
            errs.append("slug 重複")
        seen.add(slug)
        m = re.search(r"content: `(.*?)`,\n", body, re.S)
        content = m.group(1) if m else ""
        text = re.sub(r"\s", "", re.sub(r"<[^>]+>", "", content))
        if not (400 <= len(text) <= 750):
            errs.append(f"本文 {len(text)} 字")
        if content.count("<h2>") < 3:
            errs.append("h2 が3未満")
        if 'class="point-box"' not in content:
            errs.append("point-box なし")
        if 'class="info-box"' not in content:
            errs.append("info-box なし")
        for u in re.findall(r'href="([^"]+)"', content):
            if u not in allowed:
                errs.append(f"許可外URL {u}")
        if re.search(r"[\U0001F300-\U0001FAFF☀-➿⭐✅❌]", body):
            errs.append("絵文字")
        for w in FORBIDDEN:
            if w in body:
                errs.append(f"禁止語 {w}")
        if f'citySlug: "{slug_city}"' not in body:
            errs.append("citySlug")
        if not re.search(r'publishedAt: "\d{4}-\d{2}-\d{2}"', body):
            errs.append("publishedAt")
        cat = re.search(r'category: "([^"]+)",\n\s*categoryColor: "([^"]+)"', body)
        if not cat or (cat.group(1), cat.group(2)) not in CATEGORIES:
            errs.append(f"category {cat.groups() if cat else None}")
        if "${" in content or "`" in content:
            errs.append("テンプレート文字")
        if errs:
            bad += 1
            print(f"[{os.path.basename(f)}] {slug}: " + "；".join(errs))
print(f"合計 {total} 本、問題 {bad} 本")
