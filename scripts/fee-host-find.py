# 公式サイトのホスト名が分からない自治体について、
# よくある形をいくつか当てて、**そのページに自治体名が出るか**で確かめる。
# 名前が出ないものは採らない（別の自治体・無関係なサイトを掴むため）。
import concurrent.futures as cf, io, re, ssl, sys, urllib.request, html as H
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
UA={"User-Agent":"Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)"}
CTX=ssl.create_default_context(); CTX.check_hostname=False; CTX.verify_mode=ssl.CERT_NONE
PREF={"chikushino":"fukuoka","dazaifu":"fukuoka","fujisawa":"kanagawa","fukuoka":"fukuoka",
"habikino":"osaka","hakusan":"ishikawa","hatsukaichi":"hiroshima","higashimurayama":"tokyo",
"himeji":"hyogo","hita":"oita","ichinomiya":"aichi","ichinoseki":"iwate","iida":"nagano",
"itami":"hyogo","kanoya":"kagoshima","kashiwara":"osaka","kasuga":"fukuoka","katano":"osaka",
"kitahiroshima":"hokkaido","kitami":"hokkaido","kokubunji":"tokyo","kuki":"saitama",
"kumamoto":"kumamoto","kurashiki":"okayama","matsubara":"osaka","matsuyama":"ehime",
"mihara":"hiroshima","nakatsu":"oita","nobeoka":"miyazaki","okayama":"okayama","ome":"tokyo",
"omura":"nagasaki","onojo":"fukuoka","osaka":"osaka","osakasayama":"osaka","otaru":"hokkaido",
"sapporo":"hokkaido","sayama":"saitama","shijonawate":"osaka","shizuoka":"shizuoka",
"tenri":"nara","toda":"saitama","toyonaka":"osaka","tsuyama":"okayama","uji":"kyoto","yamato":"kanagawa"}
def get(u,timeout=20):
    try:
        r=urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=timeout,context=CTX)
        b=r.read(400_000)
        for e in ("utf-8","cp932","euc_jp"):
            try: return r.geturl(), b.decode(e)
            except UnicodeDecodeError: pass
        return r.geturl(), b.decode("utf-8","replace")
    except Exception: return None,None
def try_one(a):
    slug,name=a
    pref=PREF.get(slug,"")
    cands=[f"https://www.city.{slug}.lg.jp/", f"https://www.city.{slug}.{pref}.jp/",
           f"https://www.city.{slug}.jp/"]
    for c in cands:
        final,t=get(c)
        if not t: continue
        flat=re.sub(r"<[^>]+>"," ",H.unescape(t))
        if name in flat:
            return slug,name,re.sub(r"^https?://","",final).split("/")[0]
    return slug,name,None
rows=[l.rstrip("\n").split("\t")[:2] for l in io.open(sys.argv[1],encoding="utf-8") if l.strip()]
rows=[r for r in rows if r[0]!="index"]
out=[]
with cf.ThreadPoolExecutor(max_workers=8) as ex:
    for slug,name,host in ex.map(try_one,rows):
        if host: out.append(f"{slug}\t{name}\t{host}"); print(f"○ {name} {host}",flush=True)
        else: print(f"× {name} 当たらず",flush=True)
io.open(sys.argv[2],"w",encoding="utf-8",newline="\n").write("\n".join(out)+"\n")
print(f"見つかった {len(out)}/{len(rows)}")
