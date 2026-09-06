import type { Article } from "./types";
import { registerArticles } from "./index";

const susonoArticles: Article[] = [
  {
    slug: "nursery-fees",
    citySlug: "susono",
    title: "裾野市の保育料はいくら？　上限額と決まり方",
    description:
      "裾野市の認可保育施設の保育料について、0〜2歳児クラスの上限額と決まり方を、市が公表している保育料表をもとに紹介します。",
    category: "お金の話",
    categoryColor: "rose",
    content: `<h2>3歳児クラス以上は保育料が無料</h2>
<p>2019年10月からの幼児教育・保育の無償化により、<span class="highlight">3歳児クラス以上</span>の保育料は無料です。ただし給食費（主食費・副食費）は別に必要です。</p>
<h2>0〜2歳児クラスの保育料の決まり方</h2>
<p>裾野市の認可保育施設の保育料は、<span class="highlight">世帯の住民税額</span>と<span class="highlight">保育を利用する時間（保育標準時間・保育短時間）</span>で決まる階層表になっています。所得が高いほど階層が上がり、保育料も上がります。</p>
<h2>裾野市でいちばん高い階層はいくら？</h2>
<p>裾野市が公表している保育料表では、0〜2歳児クラス・保育標準時間のいちばん高い階層で<span class="highlight">月額53,000円</span>です。ここが上限で、これを超えることはありません。</p>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育料は毎年9月に切り替わります。4月分から8月分は前年度の住民税額、9月分から翌年3月分は当年度の住民税額で決まる自治体が多いため、9月に金額が変わることがあります。</p>
</div>
<h2>きょうだいがいる世帯の軽減</h2>
<p>裾野市は次のように案内しています。</p>
<blockquote><p>多子軽減（小学校未就学児童の最年長児を第1子とし、、第2子は半額、第3子以降は0円となります）が採用されます。</p></blockquote>
<div class="info-box">
<p><strong>出典</strong></p>
<p>上記の金額は裾野市が公表している保育料表によります。階層ごとの正確な金額は<a href="https://www.city.susono.shizuoka.jp/kosodate/2/10/7416.html" target="_blank" rel="noopener">裾野市の保育料表</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-09-06",
    popularity: 42,
  },
];

registerArticles(susonoArticles);
