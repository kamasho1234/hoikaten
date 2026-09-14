# 断片ファイルの本文に出る「数字＋単位」を facts.md の数字と突き合わせ、facts に無いものを列挙する（目視用）
#
#   python scripts/article-batch/numcheck.py <作業ディレクトリ> [batch-1.ts ...]
#
# 出てきた数字が facts の値の足し算（100+75=175 など）なら問題ない。別の制度の金額の流用はここでは拾えない
import glob
import os
import re
import sys

sys.stdout.reconfigure(encoding="utf-8")
D = sys.argv[1]
Z = str.maketrans("０１２３４５６７８９", "0123456789")
facts = open(os.path.join(D, "facts.md"), encoding="utf-8").read().translate(Z)
fnums = set(n.replace(",", "") for n in re.findall(r"\d[\d,]*", facts))
files = sys.argv[2:] or sorted(glob.glob(os.path.join(D, "batch-*.ts")))
UNIT = r"(点|円|人|時間|日|か月|ヶ月|カ月|週|歳|%|％|施設|園|本|件)"
for f in files:
    s = open(f, encoding="utf-8").read().translate(Z)
    for slug, body in re.findall(r'  \{\n    slug: "([^"]+)",(.*?)\n  \},', s, re.S):
        m = re.search(r"content: `(.*?)`,\n", body, re.S)
        text = re.sub(r"<[^>]+>", "", m.group(1)) if m else ""
        odd = []
        for num, unit in re.findall(r"(\d[\d,]*)\s*" + UNIT, text):
            n = num.replace(",", "")
            if n not in fnums and not (unit in ("歳", "日", "週", "か月", "ヶ月") and int(n) <= 31):
                odd.append(num + unit)
        if odd:
            print(f"[{os.path.basename(f)}] {slug}: " + "、".join(sorted(set(odd))))
print("done")
