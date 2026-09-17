# 旧い就労証明書の記事（slug shurou-shoumeisho / employment-certificate）を自治体ファイルから外す。
# レコード方式（src/lib/articles/shurou-shoumeisho）の記事と slug が重なるため。
#   python scripts/remove-old-shurou-articles.py setagaya chiba ...
import io, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
for slug in sys.argv[1:]:
    p = os.path.join(ROOT, "src/lib/articles", slug + ".ts")
    s = io.open(p, encoding="utf-8").read()
    m = re.search(r'slug: "(shurou-shoumeisho|employment-certificate)",', s)
    if not m:
        print(f"{slug}: 旧記事なし")
        continue
    start = s.rfind("  {\n", 0, m.start())
    j = s.index("publishedAt", m.start())
    end = s.index("  },\n", j) + len("  },\n")
    io.open(p, "w", encoding="utf-8").write(s[:start] + s[end:])
    print(f"{slug}: {m.group(1)} を外した（{end - start}文字）")
