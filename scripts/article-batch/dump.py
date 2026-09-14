import re,sys,html
sys.stdout.reconfigure(encoding="utf-8")
s=open(sys.argv[1],encoding="utf-8").read()
for slug,body in re.findall(r'  \{\n    slug: "([^"]+)",(.*?)\n  \},',s,re.S):
    t=re.search(r'title: "([^"]*)"',body).group(1); cat=re.search(r'category: "([^"]*)"',body).group(1)
    c=re.search(r"content: `(.*?)`,\n",body,re.S).group(1)
    c=re.sub(r"<h2>","\n## ",c); c=re.sub(r"<h3>","\n### ",c); c=re.sub(r'<div class="(point-box|info-box|warn-box)">',r"\n[\1] ",c)
    c=re.sub(r"<a href=\"([^\"]+)\"[^>]*>",r"<\1|",c).replace("</a>",">")
    c=re.sub(r"</(td|th)>"," | ",c); c=re.sub(r"</tr>","\n",c); c=re.sub(r"<(li)>","- ",c); c=re.sub(r"<[^>]+>","",c)
    c=re.sub(r"\n\s*\n+","\n",c)
    print(f"\n======== {slug} [{cat}] {t}\n{html.unescape(c).strip()}")
