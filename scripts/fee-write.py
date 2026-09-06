# 確かめられた保育料の事実から、お金の記事を書き足す。
#
# 記事に書くのは、公式資料から読み取って照合できたものだけ。
#   - 3歳以上は無償（国の制度。全国共通）
#   - 0〜2歳は住民税で決まる（国の制度。全国共通）
#   - **この自治体の上限額**（公式の保育料表から読み、資料の文字と照合済み）
#   - **多子軽減**（公式ページの文をそのまま引く。読めた自治体だけ）
#   - 出典のURL
#
# 世帯年収別の目安表は書かない。自治体が公表していない推計値になるため。
import io
import json
import os
import re
import sys

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = r"C:/Users/kamas/projects/webapps/hoikuen-simulator"
TODAY = "2026-09-06"


def esc(s):
    return s.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")


def build(d):
    name = d["name"]
    limit = d["limit"]
    url = d["url"]
    tashi = d.get("tashi")

    if limit == 0:
        # 全階層0円の自治体がある（国立市。東京都の第1子無償化に市が上乗せし、
        # 市内在住の子ども全員の保育料を無償にしている）。
        # 「上限額」の話が成り立たないので、別の文にする
        parts = [
            "<h2>認可保育施設の保育料は0円</h2>",
            f"<p>{name}は、認可保育所・認定こども園・地域型保育事業に通う"
            "<span class=\"highlight\">市内在住のすべての子どもの保育料を無償</span>にしています。"
            "0歳児クラスから2歳児クラスも含めて、階層に関わらず月額0円です。</p>",
            "<h2>それでも階層は決まる</h2>",
            f"<p>保育料が0円でも、{name}は世帯の住民税額による階層区分を定めています。"
            "入園選考の優先順位、給食費（副食費）の免除、延長保育料の決定に使われるためです。"
            "申込みのときは、これまでどおり住民税額の確認が必要です。</p>",
            '<div class="point-box">',
            "<p><strong>ポイント</strong></p>",
            "<p>無償になるのは保育料だけです。教材費・行事費・延長保育料は"
            "これまでどおり負担があります。給食費も、免除の対象にならない世帯は必要です。</p>",
            "</div>",
            '<div class="info-box">',
            "<p><strong>出典</strong></p>",
            f'<p>上記は{name}が公表している利用者負担額表によります。'
            f'最新の内容は<a href="{url}" target="_blank" rel="noopener">'
            f"{name}の利用者負担額表</a>をご確認ください。</p>",
            "</div>",
        ]
        content = "\n".join(parts)
        return f"""  {{
    slug: "nursery-fees",
    citySlug: "{d['slug']}",
    title: "{name}の保育料はいくら？　0〜2歳も無償",
    description:
      "{name}の認可保育施設の保育料について、市内在住の子どもが無償になる範囲と、それでも階層が決まる理由を、市が公表している利用者負担額表をもとに紹介します。",
    category: "お金の話",
    categoryColor: "rose",
    content: `{content}`,
    publishedAt: "{TODAY}",
    popularity: 42,
  }},
"""

    parts = [
        "<h2>3歳児クラス以上は保育料が無料</h2>",
        "<p>2019年10月からの幼児教育・保育の無償化により、"
        f"<span class=\"highlight\">3歳児クラス以上</span>の保育料は無料です。"
        "ただし給食費（主食費・副食費）は別に必要です。</p>",
        "<h2>0〜2歳児クラスの保育料の決まり方</h2>",
        f"<p>{name}の認可保育施設の保育料は、"
        "<span class=\"highlight\">世帯の住民税額</span>と"
        "<span class=\"highlight\">保育を利用する時間（保育標準時間・保育短時間）</span>"
        "で決まる階層表になっています。所得が高いほど階層が上がり、保育料も上がります。</p>",
        f"<h2>{name}でいちばん高い階層はいくら？</h2>",
        f"<p>{name}が公表している保育料表では、0〜2歳児クラス・保育標準時間の"
        f"いちばん高い階層で<span class=\"highlight\">月額{limit:,}円</span>です。"
        "ここが上限で、これを超えることはありません。</p>",
        '<div class="point-box">',
        "<p><strong>ポイント</strong></p>",
        "<p>保育料は毎年9月に切り替わります。4月分から8月分は前年度の住民税額、"
        "9月分から翌年3月分は当年度の住民税額で決まる自治体が多いため、"
        "9月に金額が変わることがあります。</p>",
        "</div>",
    ]
    if tashi:
        parts += [
            "<h2>きょうだいがいる世帯の軽減</h2>",
            f"<p>{name}は次のように案内しています。</p>",
            f"<blockquote><p>{esc(tashi)}</p></blockquote>",
        ]
    parts += [
        '<div class="info-box">',
        "<p><strong>出典</strong></p>",
        f'<p>上記の金額は{name}が公表している保育料表によります。'
        f'階層ごとの正確な金額は<a href="{url}" target="_blank" rel="noopener">'
        f"{name}の保育料表</a>をご確認ください。</p>",
        "</div>",
    ]
    content = "\n".join(parts)

    return f"""  {{
    slug: "nursery-fees",
    citySlug: "{d['slug']}",
    title: "{name}の保育料はいくら？　上限額と決まり方",
    description:
      "{name}の認可保育施設の保育料について、0〜2歳児クラスの上限額と決まり方を、市が公表している保育料表をもとに紹介します。",
    category: "お金の話",
    categoryColor: "rose",
    content: `{content}`,
    publishedAt: "{TODAY}",
    popularity: 42,
  }},
"""


def main():
    src = sys.argv[1]
    rows = [json.loads(l) for l in io.open(src, encoding="utf-8") if l.strip()]
    added, skipped = 0, []
    for d in rows:
        path = os.path.join(ROOT, "src/lib/articles", f"{d['slug']}.ts")
        if not os.path.exists(path):
            skipped.append((d["name"], "記事ファイルが無い"))
            continue
        s = io.open(path, encoding="utf-8").read()
        if 'slug: "nursery-fees"' in s or 'category: "お金' in s:
            skipped.append((d["name"], "すでにお金の記事がある"))
            continue
        # 配列の閉じ「];」の直前に足す
        # 配列の変数名が articles ではない自治体がある（袋井市の fukuroiArticles など）
        m = re.search(r"\n\];\s*\n\s*registerArticles\([A-Za-z0-9_]+\);\s*$", s)
        if not m:
            skipped.append((d["name"], "記事ファイルの形が想定と違う"))
            continue
        s = s[: m.start()] + "\n" + build(d) + s[m.start() + 1 :]
        io.open(path, "w", encoding="utf-8", newline="\n").write(s)
        added += 1
        print(f"○ {d['name']} 月額{d['limit']:,}円", flush=True)
    for n, w in skipped:
        print(f"× {n} {w}")
    print(f"書き足した {added}件 / 飛ばした {len(skipped)}件")


if __name__ == "__main__":
    main()
