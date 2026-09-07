# 自治体名からローマ字のslugを当て、そのホスト名を「ページに自治体名が出るか」で確かめる。
# 名前が出ないものは採らない（別の自治体を掴むため）。
import concurrent.futures as cf, io, re, ssl, sys, urllib.request, html as H
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
UA={"User-Agent":"Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)"}
CTX=ssl.create_default_context(); CTX.check_hostname=False; CTX.verify_mode=ssl.CERT_NONE
PREF={"北海道":"hokkaido","青森県":"aomori","岩手県":"iwate","宮城県":"miyagi","秋田県":"akita",
"山形県":"yamagata","福島県":"fukushima","茨城県":"ibaraki","栃木県":"tochigi","群馬県":"gunma",
"埼玉県":"saitama","千葉県":"chiba","東京都":"tokyo","神奈川県":"kanagawa","新潟県":"niigata",
"富山県":"toyama","石川県":"ishikawa","福井県":"fukui","山梨県":"yamanashi","長野県":"nagano",
"岐阜県":"gifu","静岡県":"shizuoka","愛知県":"aichi","三重県":"mie","滋賀県":"shiga",
"京都府":"kyoto","大阪府":"osaka","兵庫県":"hyogo","奈良県":"nara","和歌山県":"wakayama",
"鳥取県":"tottori","島根県":"shimane","岡山県":"okayama","広島県":"hiroshima","山口県":"yamaguchi",
"徳島県":"tokushima","香川県":"kagawa","愛媛県":"ehime","高知県":"kochi","福岡県":"fukuoka",
"佐賀県":"saga","長崎県":"nagasaki","熊本県":"kumamoto","大分県":"oita","宮崎県":"miyazaki",
"鹿児島県":"kagoshima","沖縄県":"okinawa"}
def get(u,timeout=18):
    try:
        r=urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=timeout,context=CTX)
        b=r.read(300_000)
        for e in ("utf-8","cp932","euc_jp"):
            try: return r.geturl(), b.decode(e)
            except UnicodeDecodeError: pass
        return r.geturl(), b.decode("utf-8","replace")
    except Exception: return None,None
def try_one(a):
    code,pref,name,pop,slug=a
    p=PREF.get(pref,"")
    kind="city" if name.endswith("市") else ("town" if name.endswith("町") else "vil")
    cands=[]
    for k in ([kind]+["city","town","vil"]):
        for host in (f"www.{k}.{slug}.lg.jp", f"www.{k}.{slug}.{p}.jp", f"www.{k}.{slug}.jp",
                     f"{k}.{slug}.lg.jp"):
            if host not in cands: cands.append(host)
    for h in cands[:8]:
        final,t=get("https://"+h+"/")
        if not t: continue
        flat=re.sub(r"<[^>]+>"," ",H.unescape(t))
        if name in flat:
            return code,pref,name,pop,re.sub(r"^https?://","",final).split("/")[0]
    return code,pref,name,pop,None
rows=[l.rstrip("\n").split("\t") for l in io.open(sys.argv[1],encoding="utf-8") if l.strip()]
out=[]
with cf.ThreadPoolExecutor(max_workers=6) as ex:
    for code,pref,name,pop,host in ex.map(try_one,rows):
        if host: out.append(f"{code}\t{pref}\t{name}\t{pop}\t{host}"); print(f"○ {name} {host}",flush=True)
        else: print(f"× {name} 当たらず",flush=True)
io.open(sys.argv[2],"w",encoding="utf-8",newline="\n").write("\n".join(out)+"\n")
print(f"見つかった {len(out)}/{len(rows)}")
