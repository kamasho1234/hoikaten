# レコードを通読用に1件ずつ「値 ← quote」の形で出す
#   python scripts/dump-fact-records.py ichiji chuo koto ...
#   python scripts/dump-fact-records.py shurou setagaya
import io, json, os, sys
sys.stdout.reconfigure(encoding="utf-8")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KINDS = {"shurou": "src/lib/articles/shurou-shoumeisho/records", "ichiji": "src/lib/articles/ichiji-hoiku/records"}
k = sys.argv[1]
REC = os.path.join(ROOT, KINDS[k])
SKIP = {"citySlug", "checkedAt", "evidence", "sources", "slug"}
for slug in sys.argv[2:]:
    r = json.load(io.open(os.path.join(REC, slug + ".json"), encoding="utf-8"))
    ev = r["evidence"]
    print(f"===== {slug}  checkedAt={r['checkedAt']}")
    for key, v in r.items():
        if key in SKIP:
            continue
        if isinstance(v, dict) and "url" in v:
            print(f"  {key}: {v['label']} {v['url']}")
            if key in ev:
                print(f"      ← {ev[key]['quote']}")
        elif isinstance(v, list) and v and isinstance(v[0], dict):
            for f in v:
                print(f"  {key}: {f.get('label')} {f.get('url')}")
        elif isinstance(v, list):
            for i, x in enumerate(v):
                print(f"  {key}.{i}: {x}")
                e = ev.get(f"{key}.{i}", ev.get(key))
                print(f"      ← {e['quote'] if e else None}")
        else:
            print(f"  {key}: {v}")
            if key in ev:
                print(f"      ← {ev[key]['quote']}")
