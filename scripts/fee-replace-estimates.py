# 「世帯年収別の目安」を載せている保育料の記事を、公式の保育料表の額に差し替える。
#
# 以前に作られた保育料の記事には、自治体が公表していない
# **世帯年収別の目安表**が載っていた（11自治体がまったく同じ表だった）。
# 出典も無く、どこから来た数字か辿れない。
#
# 公式の保育料表から額を読めた自治体は本文ごと差し替える。
# 読めなかった自治体は `--strip` で目安表だけを外し、制度の説明に留める。
#
#   python scripts/fee-replace-estimates.py fee_ok.jsonl        額のある自治体を差し替え
#   python scripts/fee-replace-estimates.py --strip slug slug…  目安表を外す
import importlib.util
import io
import json
import os
import re
import sys

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

spec = importlib.util.spec_from_file_location(
    "feewrite", os.path.join(ROOT, "scripts", "fee-write.py")
)
fw = importlib.util.module_from_spec(spec)
spec.loader.exec_module(fw)


def article_span(s):
    """お金の記事の { … }, の範囲を返す。

    記事の書き方は2通りある。
      1. 複数行に分けて書いてあるもの（閉じは「\\n  },」）
      2. 1行に詰めて書いてあるもの（桐生市など。閉じは「 },」で行末）
    """
    i = s.find('slug: "nursery-fees"')
    if i < 0:
        return None
    start = s.rfind("{", 0, i)
    line_end = s.find("\n", i)
    # 1行に詰めた形かどうかは、その行の中で括弧が閉じるかで見る
    if line_end > 0 and s[i:line_end].rstrip().endswith("},"):
        return start, line_end
    j = s.find("\n  },", i)
    if j < 0:
        return None
    return start, j + len("\n  },")


def replace(d):
    path = os.path.join(ROOT, "src/lib/articles", f"{d['slug']}.ts")
    s = io.open(path, encoding="utf-8").read()
    span = article_span(s)
    if not span:
        return False, "記事の形が想定と違う"
    start, end = span
    body = fw.build(d).rstrip("\n")
    io.open(path, "w", encoding="utf-8", newline="\n").write(
        s[:start] + body.lstrip()[: len(body.lstrip())] + s[end:]
    )
    return True, ""


# 目安表と、その見出しだけを外す。
# 見出しが <h2> のものと <h3> のものがあり、「年収目安」と書くものもある
ESTIMATE = re.compile(
    r"<h[23]>[^<]*(?:世帯年収別|年収別|年収目安)[^<]*</h[23]>\s*"
    r"(?:<p>[^<]*</p>\s*)?<table>[\s\S]*?</table>"
)

# タイトルにも「世帯年収別の目安」と入っている。中身を変えるので直す
TITLE = re.compile(r'(title:\s*")([^"]*?)　?世帯年収別の目安(")')


def strip(slug):
    path = os.path.join(ROOT, "src/lib/articles", f"{slug}.ts")
    s = io.open(path, encoding="utf-8").read()
    n = len(ESTIMATE.findall(s))
    if n == 0:
        return False, "目安表が見つからない"
    s = ESTIMATE.sub(
        "<h2>0〜2歳児クラスの保育料の決まり方</h2>"
        "<p>保育料は世帯の住民税額で決まる階層表になっています。"
        "階層ごとの金額は自治体が公表している保育料表をご確認ください。</p>",
        s,
    )
    s = TITLE.sub(r"\1\2の決まり方\3", s)
    io.open(path, "w", encoding="utf-8", newline="\n").write(s)
    return True, f"目安表{n}件を外した"


def main():
    if sys.argv[1] == "--strip":
        for slug in sys.argv[2:]:
            ok, why = strip(slug)
            print(("○ " if ok else "× ") + slug + " " + why)
        return
    rows = [json.loads(l) for l in io.open(sys.argv[1], encoding="utf-8") if l.strip()]
    done = 0
    for d in rows:
        ok, why = replace(d)
        if ok:
            done += 1
            print(f"○ {d['name']} 月額{d['limit']:,}円に差し替え")
        else:
            print(f"× {d['name']} {why}")
    print(f"差し替えた {done}/{len(rows)}件")


if __name__ == "__main__":
    main()
