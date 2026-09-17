# レコードを通読用に1件ずつ「値 ← quote」の形で出す
#   python scripts/dump-shurou-records.py chuo koto ...
import io, json, os, sys
sys.stdout.reconfigure(encoding="utf-8")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REC = os.path.join(ROOT, "src/lib/articles/shurou-shoumeisho/records")
for slug in sys.argv[1:]:
    r = json.load(io.open(os.path.join(REC, slug + ".json"), encoding="utf-8"))
    ev = r["evidence"]
    print(f"===== {slug}  formType={r['formType']}  seal={r['seal']}  {r.get('sealNote','')}")
    print("  formPage:", r["formPage"]["label"], r["formPage"]["url"])
    for f in r.get("formFiles", []):
        print("  file:", f["label"], f["url"])
    print("  formType ←", ev.get("formType", {}).get("quote"))
    if "seal" in ev: print("  seal ←", ev["seal"]["quote"])
    for k in ["validity", "deadline", "submitTo", "online", "siblings"]:
        if k in r:
            print(f"  {k}: {r[k]}")
            print(f"      ← {ev.get(k, {}).get('quote')}")
    for k in ["selfEmployedDocs", "differences", "notes"]:
        for i, v in enumerate(r.get(k) or []):
            print(f"  {k}.{i}: {v}")
            print(f"      ← {ev.get(f'{k}.{i}', ev.get(k, {})).get('quote')}")
