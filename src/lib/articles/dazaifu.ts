import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "dazaifu",
    title: "太宰府市の保活スケジュール　申込から内定までの流れ",
    description:
      "太宰府市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>太宰府市の4月入園スケジュール</h2>
<p>太宰府市の認可保育園は毎年秋に翌年度4月入園の一斉申込を受付けます。子育て支援課が窓口です。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>市のホームページで保育園の一覧や空き状況を確認します。太宰府市には複数の認可保育園があります。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約しましょう。太宰府天満宮など史跡に囲まれた環境は、子育てに最適です。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：利用案内の入手・書類準備</strong>
<p>就労証明書などの必要書類を準備します。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>子育て支援課の窓口で提出します。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>太宰府市は人口約7万人で、福岡県南部に位置しています。大学街として知られ、若い世帯の流入が続いています。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.dazaifu.lg.jp/" target="_blank" rel="noopener">太宰府市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 48,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "dazaifu",
    title: "太宰府市の入園点数のしくみ　基準指数と調整指数を解説",
    description:
      "太宰府市の保育園入園選考で使われる基準指数と調整指数のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>太宰府市の選考指数とは</h2>
<p>太宰府市の認可保育園の入園選考は「基準指数＋調整指数」の合計で行われます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 = 基準指数（保護者1 + 保護者2）+ 調整指数</p>
</div>

<h2>基準指数（父母各最大20点、合計40点）</h2>
<p>就労の場合、月20日以上かつ週40時間以上で満点の20点です。保育の必要性の程度を数値化して判定されます。</p>

<h2>調整指数の代表例</h2>
<ul>
<li>ひとり親世帯：加点</li>
<li>きょうだいが在園中の施設を希望：加点</li>
<li>認可外保育施設を利用中：加点</li>
<li>育児休業から復帰予定：加点</li>
<li>生活保護世帯：加点</li>
<li>市外からの申込み：減点</li>
</ul>

<div class="info-box">
<p><strong>参考値について</strong></p>
<p>本シミュレーターは福岡県内の近隣自治体の基準を参考値として使用しています。実際の基準は必ず太宰府市子育て支援課で確認してください。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 58,
  },
  {
    slug: "score-up-tips",
    citySlug: "dazaifu",
    title: "太宰府市で入園点数を上げるコツ　加点を最大化する方法",
    description:
      "太宰府市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基準指数40点は出発点</h2>
<p>太宰府市ではフルタイム共働き世帯は基準指数40点で横並びです。差がつくのは調整指数です。</p>

<h2>加点を最大化するチェックリスト</h2>
<ul>
<li>ひとり親世帯であることをしっかり申告する</li>
<li>きょうだいが在園中なら該当施設を希望する</li>
<li>認可外保育施設の利用を検討する</li>
<li>育児休業からの復帰時期を合わせられないか検討する</li>
<li>該当する全ての加点要件を確認する</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>調整指数の加点は自分の状況を正確に申告することで初めて得られます。書類漏れがないよう注意しましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 52,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "dazaifu",
    title: "太宰府市の同点時の優先順位　点数が同じ場合どうなる？",
    description:
      "太宰府市の保育園入園選考で指数が同点になった場合の優先順位のルールを解説します。",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の優先順位</h2>
<p>太宰府市では選考指数が同点の場合、複数の優先要素が考慮されます。</p>

<h3>主な優先要素</h3>
<ul>
<li>太宰府市在住者が優先</li>
<li>保育の必要性が高い世帯</li>
<li>きょうだいの在園状況</li>
<li>世帯の経済状況</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>同点勝負では市内在住が有利になります。正確な申告と書類準備が合否を分けることもあります。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 43,
  },
  {
    slug: "part-time-work-score",
    citySlug: "dazaifu",
    title: "太宰府市のパート・時短勤務の点数　何時間で何点？",
    description:
      "太宰府市の保育園入園で、パートや時短勤務の場合にもらえる基準指数を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>パート・時短勤務の基準指数</h2>
<p>太宰府市では勤務日数と週あたりの勤務時間の組み合わせで基準指数が決まります。</p>

<h2>パートで入園するには</h2>
<p>週4日・1日6時間のパートなら月16日以上かつ週24時間以上となり、基準指数が得られます。フルタイム20点との差を調整指数で埋める戦略が必要です。</p>

<h3>重要ポイント</h3>
<ul>
<li>入園要件は月48時間以上の就労</li>
<li>休憩時間を含み、通勤時間は含まない</li>
<li>勤務日数と勤務時間の両方をチェック</li>
<li>就労証明書は正確に記入する</li>
</ul>`,
    publishedAt: "2026-04-26",
    popularity: 48,
  },
  {
    slug: "single-parent-score",
    citySlug: "dazaifu",
    title: "太宰府市のひとり親世帯の加点　基準指数との組み合わせ",
    description:
      "太宰府市の保育園入園でひとり親世帯が受ける加点と、効果的な活用方法を解説します。",
    image: "https://images.unsplash.com/photo-1506216613332-2bab299ebd7d?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>ひとり親世帯の加点</h2>
<p>太宰府市ではひとり親世帯に対して調整指数で加点があります。これは大きなアドバンテージになります。</p>

<h2>ひとり親で有利になる理由</h2>
<ul>
<li>保育の必要性が高いと判定されるため</li>
<li>経済的支援の観点から優先される傾向</li>
<li>両親からの支援が期待できない状況への配慮</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親であることを証明する書類（戸籍謄本等）は漏れなく提出しましょう。申告漏れは加点を受けられません。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 46,
  },
  {
    slug: "parental-leave-timing",
    citySlug: "dazaifu",
    title: "太宰府市で育児休業明けの入園　タイミングと加点の活用法",
    description:
      "太宰府市の保育園入園で、育児休業からの復帰時期を合わせるための戦略を解説します。",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>育児休業明けの加点戦略</h2>
<p>太宰府市では育児休業を取得し、入園月に復帰する場合に加点があります。この加点をうまく活用することが重要です。</p>

<h2>タイミングの考え方</h2>
<ul>
<li>育児休業を1年以上取得できれば、復帰時期の調整が可能</li>
<li>人気園を狙う場合は早めの復帰を検討</li>
<li>会社の了解を得たうえで入園月を計画する</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>復帰予定日の書類は重要です。入園月に実際に復帰できるよう、会社との調整を早めに済ませましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 45,
  },
  {
    slug: "nursery-wait-time",
    citySlug: "dazaifu",
    title: "太宰府市の待機児童　いつ入園できるの？",
    description:
      "太宰府市の待機児童の状況と、入園しやすい時期・クラスについてまとめました。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>太宰府市の待機児童状況</h2>
<p>太宰府市は福岡県内の他市に比べて待機児童の状況は異なります。最新の情報を必ず確認しましょう。</p>

<h2>入園しやすい時期</h2>
<ul>
<li>0歳児クラス：比較的入りやすい傾向</li>
<li>1歳児クラス：競争が激しい</li>
<li>3歳以上：入園枠が拡大</li>
<li>途中入所：4月以降に枠が出ることもある</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>待機児童の状況は年によって変わります。太宰府市子育て支援課で最新情報を確認してください。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 38,
  },
  {
    slug: "application-checklist",
    citySlug: "dazaifu",
    title: "太宰府市の保育園申込　書類チェックリスト",
    description:
      "太宰府市の保育園申込に必要な書類をまとめ、漏れのないようチェックリストを用意しました。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "不承諾対策",
    categoryColor: "rose",
    content: `<h2>申込書類の必須チェックリスト</h2>

<table>
<tr><th>書類名</th><th>提出</th><th>確認</th></tr>
<tr><td>支給認定申請書</td><td>必須</td><td>記入漏れなし</td></tr>
<tr><td>保育園入園申込書</td><td>必須</td><td>希望園の順位を確認</td></tr>
<tr><td>就労証明書</td><td>必須</td><td>勤務日数・時間の正確性</td></tr>
<tr><td>戸籍謄本</td><td>状況により</td><td>親の名前・続柄が正確</td></tr>
<tr><td>健康保険証写し</td><td>必須</td><td>有効期限の確認</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>書類不備は加点を受けられず、入園難易度が上がります。提出前に必ずダブルチェックしましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 42,
  },
  {
    slug: "unlicensed-nursery",
    citySlug: "dazaifu",
    title: "太宰府市の認可外保育施設　加点と活用方法",
    description:
      "太宰府市で認可外保育施設を利用する際の加点条件と、効果的な活用方法を解説します。",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外保育施設利用による加点</h2>
<p>太宰府市では認可外保育施設に月ぎめで預けている場合、調整指数で加点が得られます。</p>

<h2>加点を受けるための条件</h2>
<ul>
<li>認可外保育施設に月ぎめで預けていること</li>
<li>一時保育のみの利用は対象外</li>
<li>施設が届出済みであることを確認</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>40点同士の勝負で数点の加点は大きな差になります。認可外保育施設の費用負担と天秤にかけて判断しましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 43,
  },
];

registerArticles(articles);
