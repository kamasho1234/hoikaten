import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "nerima",
    title: "練馬区の保活、いつから始める？スケジュール完全ガイド",
    description:
      "練馬区の認可保育園の申込時期・選考の流れ・内定通知時期をわかりやすく解説。令和8年度4月入園のスケジュールを中心にまとめました。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>練馬区の4月入園は、<strong>一次選考</strong>と<strong>二次選考</strong>の2回に分かれています。早めにスケジュールを把握して動き出すのが保活成功のカギです。</p>

<h3>一次選考</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込期間</td><td>令和7年10月上旬〜11月下旬</td></tr>
<tr><td>結果通知</td><td>令和8年1月下旬〜2月上旬</td></tr>
</table>

<h3>二次選考</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込期間</td><td>令和8年1月下旬〜2月上旬</td></tr>
<tr><td>結果通知</td><td>令和8年3月上旬</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>一次で不承諾だった方は自動的に二次選考の対象になります。希望園の追加・変更は別途手続きが必要です。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜5月：情報収集スタート</strong>
<p>練馬区は「保育利用のご案内」を毎年発行しています。前年度版でも大まかな流れは掴めます。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に電話して見学を予約しましょう。練馬区にはLINE保活支援サービスもあります。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>10月〜11月：申込書類の準備・提出</strong>
<p>就労証明書などの書類を揃えて提出します。練馬区は電子申請にも対応しています。</p>
</div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.nerima.tokyo.jp/kosodatekyoiku/kodomo/hoiku/hoikuen/nyuuen/moushikomi/siori-sisetu.html" target="_blank" rel="noopener">練馬区公式サイト「保育利用のご案内」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "nerima",
    title: "練馬区の入園点数のしくみ　保育指数と調整指数をやさしく解説",
    description:
      "練馬区の保育園入園選考で使われる「保育指数」と「調整指数」の仕組みを、初めての方にもわかるように解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>点数ってなに？</h2>
<p>練馬区の保育園入園は「先着順」ではなく「点数（指数）」の高い順に内定が決まります。正式には「保育指数」と呼びます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 ＝ 保育指数（父＋母）＋ 調整指数</p>
</div>

<h2>保育指数とは？</h2>
<p>父母それぞれの「保育が必要な理由」を点数化したものです。1人あたり最大<span class="highlight">40点</span>で、父母合計の最大は<span class="highlight">80点</span>。</p>
<p>最も多い「就労」の場合、月20日以上・1日8時間以上で満点の40点になります。</p>

<table>
<tr><th>勤務日数・時間</th><th>指数</th></tr>
<tr><td>月20日以上・8時間以上</td><td>40</td></tr>
<tr><td>月20日以上・7時間以上</td><td>37</td></tr>
<tr><td>月16〜19日・8時間以上</td><td>37</td></tr>
<tr><td>月20日以上・6時間以上</td><td>34</td></tr>
<tr><td>月12〜15日・8時間以上</td><td>34</td></tr>
</table>

<h2>調整指数とは？</h2>
<p>世帯の特別な事情に応じて加減される点数です。加算は<span class="highlight">22項目</span>、減算は<span class="highlight">5項目</span>あります。</p>

<p>代表的なものは以下の通りです。</p>
<ul>
<li>ひとり親世帯：<span class="highlight">+8点</span>（＋不存在40点）</li>
<li>未就学児3人以上：<span class="highlight">+5点</span></li>
<li>障害のあるお子さん：<span class="highlight">+12点</span></li>
<li>多胎児：<span class="highlight">+3点</span></li>
<li>認可外保育施設利用：<span class="highlight">+2〜3点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>指数表は<a href="https://www.city.nerima.tokyo.jp/kosodatekyoiku/kodomo/hoiku/hoikuen/nyuuen/moushikomi/kijyun.html" target="_blank" rel="noopener">練馬区公式サイト「保育実施基準表等」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  {
    slug: "score-up-checklist",
    citySlug: "nerima",
    title: "練馬区で点数を1点でも上げる方法　加点のチェックリスト",
    description:
      "練馬区の入園選考で調整指数の加点を最大限に活用する方法を、チェックリスト形式で解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>加点の取りこぼしをなくそう</h2>
<p>練馬区の入園選考では<span class="highlight">1点</span>の差が明暗を分けることがあります。使える加点は漏れなく活用しましょう。</p>

<h3>加点チェックリスト</h3>
<table>
<tr><th>加点項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>+8点</td><td>不存在40点と合わせて適用</td></tr>
<tr><td>未就学児3人以上</td><td>+5点</td><td>18歳未満の子が3人以上</td></tr>
<tr><td>多胎児</td><td>+3点</td><td>双子以上の申し込み</td></tr>
<tr><td>認可外保育施設利用</td><td>+2〜3点</td><td>月120時間以上利用で+2、月160時間以上で+3</td></tr>
<tr><td>育休明け復帰</td><td>+1〜2点</td><td>育児休業給付金受給中で復帰予定</td></tr>
<tr><td>障害のあるお子さん</td><td>+12点</td><td>中程度以下の障害がある場合</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>65歳未満の祖父母が同居して保育できる場合は<span class="highlight">-4点</span>の減点があります。</p>
</div>

<h2>フルタイム共働き80点がスタートライン</h2>
<p>練馬区では0歳児のボーダーが80点、1歳児が81点程度です。80点は両親フルタイムの基本ラインなので、加点があるかないかが入園の分かれ目になります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目の詳細は<a href="https://www.city.nerima.tokyo.jp/kosodatekyoiku/kodomo/hoiku/hoikuen/nyuuen/moushikomi/kijyun.html" target="_blank" rel="noopener">練馬区公式サイト「保育実施基準表等」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 100,
  },
  {
    slug: "same-score-priority",
    citySlug: "nerima",
    title: "練馬区で同点になったらどうなる？優先順位を詳しく解説",
    description:
      "練馬区の保育園入園選考で同じ点数になった場合の7つの優先順位を、わかりやすく解説します。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点のとき、どうやって決まるの？</h2>
<p>練馬区の入園選考では、保育指数＋調整指数の合計が同じ場合に<span class="highlight">7つ</span>の優先事項で判定されます。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>練馬区に在住しているか</strong>
<p>練馬区在住者が区外在住者より優先されます。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>保育指数が高い</strong>
<p>調整指数を除いた基本の保育指数が高い世帯が優先されます。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>保育料の滞納がない</strong>
<p>保育料の滞納がない世帯が優先されます。滞納があると-20点の大きな減点もあります。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>ひとり親・障害者世帯等</strong>
<p>特に配慮が必要な世帯が優先されます。</p>
</div>
</div>
<div class="step">
<div class="step-num">5</div>
<div class="step-content">
<strong>児童に障害がある</strong>
<p>障害のあるお子さんを持つ世帯が優先されます。</p>
</div>
</div>
<div class="step">
<div class="step-num">6</div>
<div class="step-content">
<strong>多子世帯</strong>
<p>子どもの数が多い世帯が優先されます。</p>
</div>
</div>
<div class="step">
<div class="step-num">7</div>
<div class="step-content">
<strong>所得が低い世帯</strong>
<p>所得が低い世帯が優先されます。</p>
</div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.nerima.tokyo.jp/kosodatekyoiku/kodomo/hoiku/hoikuen/nyuuen/moushikomi/kijyun.html" target="_blank" rel="noopener">練馬区公式サイト「保育実施基準表等」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 85,
  },
  {
    slug: "competition-reality",
    citySlug: "nerima",
    title: "80点がボーダー！練馬区の入園競争の実態",
    description:
      "練馬区の保育園入園選考におけるボーダーラインと入園競争の実態を解説します。",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>0歳児80点、1歳児81点がボーダーライン</h2>
<p>練馬区では、0歳児クラスの入園ボーダーが<span class="highlight">80点</span>、1歳児クラスが<span class="highlight">81点</span>程度と言われています。80点は両親ともにフルタイム勤務（40点×2）の基本ラインです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>1歳児は最も競争が激しい年齢です。フルタイム共働きだけでは入れないケースも多く、加点の有無が重要です。</p>
</div>

<h2>点数帯のイメージ</h2>
<table>
<tr><th>保育指数+調整指数</th><th>状況</th></tr>
<tr><td>84点以上</td><td>多くの園で入園が期待できる</td></tr>
<tr><td>81〜83点</td><td>標準的。園の選び方が重要</td></tr>
<tr><td><span class="highlight">80点</span></td><td>0歳児ぎりぎり。1歳児は厳しい</td></tr>
<tr><td>60〜79点</td><td>認可園は非常に厳しい</td></tr>
</table>

<h2>練馬区のLINE保活支援サービス</h2>
<p>練馬区は全国でも珍しい<span class="highlight">LINE保活支援サービス</span>を提供しています。保育園探し、保育指数シミュレーション、チャットボットでの質問、子育て情報の配信などが利用できます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>LINE保活支援サービスの詳細は<a href="https://www.city.nerima.tokyo.jp/kosodatekyoiku/kodomo/hoiku/line_hoiku.html" target="_blank" rel="noopener">練馬区公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 95,
  },
  {
    slug: "ochita-sentakushi",
    citySlug: "nerima",
    title: "練馬区で保育園に落ちたときの5つの選択肢",
    description:
      "練馬区の認可保育園の選考で不承諾だった場合に検討すべき5つの選択肢を紹介します。",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=400&fit=crop",
    category: "入れなかったら",
    categoryColor: "rose",
    content: `<h2>落ちても慌てないで！5つの道があります</h2>
<p>練馬区の一次選考で不承諾だった場合、まず深呼吸。次にできることを確認しましょう。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>二次選考を待つ</strong>
<p>一次で不承諾だった方は自動的に二次選考の対象になります。希望園の変更も可能です。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>認証保育所に申し込む</strong>
<p>認可外の認証保育所に直接申し込めます。認可外に預けながら翌年度に再申請すれば加点（+2〜3点）が得られます。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>小規模保育事業を探す</strong>
<p>0〜2歳児対象の小規模保育は、定員が少なく家庭的な環境で保育が行われます。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>企業主導型保育施設を利用する</strong>
<p>企業主導型の保育施設は認可外ですが、補助金制度が充実しています。</p>
</div>
</div>
<div class="step">
<div class="step-num">5</div>
<div class="step-content">
<strong>幼稚園の預かり保育を活用（3歳以上）</strong>
<p>3歳以上なら、幼稚園の預かり保育で保育園に近い時間帯で預けられる園もあります。</p>
</div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>空き状況は<a href="https://www.city.nerima.tokyo.jp/kosodatekyoiku/kodomo/hoiku/hoikuen/nyuuen/ninka-aiki.html" target="_blank" rel="noopener">練馬区公式サイト「空き状況」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },
  {
    slug: "ikukyuake-hokatsu",
    citySlug: "nerima",
    title: "育休明けの保活、練馬区で気をつけること",
    description:
      "育休中に始める練馬区の保活で、復職条件や申込時の注意点をまとめました。",
    image: "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>育休明けの加点</h2>
<p>練馬区では、育児休業給付金を受給中で入園と同時に復帰予定の場合に加点が得られます。</p>

<table>
<tr><th>対象クラス</th><th>加点</th></tr>
<tr><td>2歳児以上</td><td><span class="highlight">+2点</span></td></tr>
<tr><td>1歳児</td><td><span class="highlight">+1点</span></td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>1歳児のボーダーが81点なので、フルタイム共働き（80点）＋育休明け加点（+1点）＝81点がちょうどボーダーラインになります。</p>
</div>

<h2>復帰条件</h2>
<p>入園した月の月末までに復職する必要があります。4月入園の場合は<span class="highlight">4月30日まで</span>に勤務を開始してください。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>復職しなかった場合は退園の対象になります。復職証明書の提出を忘れずに。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.nerima.tokyo.jp/kosodatekyoiku/kodomo/hoiku/hoikuen/nyuuen/moushikomi/siori-sisetu.html" target="_blank" rel="noopener">練馬区公式サイト「保育利用のご案内」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },
  {
    slug: "jitan-kinmu-score",
    citySlug: "nerima",
    title: "時短勤務と保育園　練馬区の点数への影響は？",
    description:
      "練馬区の保育園入園選考で、時短勤務が保育指数にどう影響するかを解説します。",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>時短勤務だと点数は下がる？</h2>
<p>練馬区では、保育指数は<strong>実際の勤務時間</strong>で計算されます。時短勤務で1日6時間になった場合は、8時間の場合より点数が下がります。</p>

<table>
<tr><th>勤務パターン</th><th>保育指数</th></tr>
<tr><td>月20日以上・8時間以上</td><td><span class="highlight">40点</span></td></tr>
<tr><td>月20日以上・7時間以上8時間未満</td><td>37点</td></tr>
<tr><td>月20日以上・6時間以上7時間未満</td><td>34点</td></tr>
<tr><td>月20日以上・5時間以上6時間未満</td><td>31点</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>練馬区では時短前のフルタイム時間ではなく、実際の勤務時間で計算されるため、時短勤務の方は点数が下がります。</p>
</div>

<h2>日数が減った場合</h2>
<p>勤務日数が減ると更に影響があります。月20日以上から月16〜19日に変わると、同じ時間でも3点下がります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>入園選考時は短縮前の契約時間で申請できるかどうか、勤務先と練馬区に確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.nerima.tokyo.jp/kosodatekyoiku/kodomo/hoiku/hoikuen/nyuuen/moushikomi/kijyun.html" target="_blank" rel="noopener">練馬区公式サイト「保育実施基準表等」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 90,
  },
  {
    slug: "line-hokatsu",
    citySlug: "nerima",
    title: "練馬区のLINE保活支援サービスを活用しよう",
    description:
      "練馬区が提供するLINE保活支援サービスの使い方と便利な機能を紹介します。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>練馬区のLINE保活支援サービスとは</h2>
<p>練馬区は全国でも珍しい<span class="highlight">LINE保活支援サービス</span>を提供しています。LINEアプリから簡単にアクセスでき、保活に必要な情報をまとめて取得できます。</p>

<h3>主な機能</h3>
<ul>
<li><strong>保育園探し</strong>：自宅近くの保育園を地図上で検索</li>
<li><strong>保育指数シミュレーション</strong>：自分の指数を概算で計算</li>
<li><strong>チャットボット</strong>：よくある質問に自動回答</li>
<li><strong>子育て情報配信</strong>：保活に役立つ最新情報をお届け</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>LINEで「練馬区 保活」と検索するか、練馬区の公式サイトからQRコードを読み取って友だち追加してください。</p>
</div>

<h2>こんな場面で便利</h2>
<ul>
<li>近所にどんな保育園があるか知りたいとき</li>
<li>自分の点数がだいたい何点か知りたいとき</li>
<li>申込期限や必要書類を確認したいとき</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.nerima.tokyo.jp/kosodatekyoiku/kodomo/hoiku/line_hoiku.html" target="_blank" rel="noopener">練馬区公式サイト「LINE保活支援サービス」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 70,
  },
  {
    slug: "hokatsu-mistakes",
    citySlug: "nerima",
    title: "練馬区の保活でよくある失敗と対策5選",
    description:
      "練馬区の保活で初めてのママがやりがちな失敗パターンと、その対策をまとめました。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>失敗1：保育指数を正確に把握していない</h2>
<p>練馬区の入園選考では保育指数＋調整指数の合計で選考されます。自分の点数を正確に把握していないと、対策が立てられません。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>練馬区の保育実施基準表で自分の指数を正確に計算しましょう。LINE保活支援サービスのシミュレーション機能も便利です。</p>
</div>

<h2>失敗2：希望園を少なく書く</h2>
<p>練馬区でも希望園を複数記入できます。通える範囲の園はできるだけ多く書くのが鉄則です。</p>

<h2>失敗3：加点の取りこぼし</h2>
<p>認可外保育施設の利用で<span class="highlight">+2〜3点</span>の加点が得られることを知らないケースも。調整指数は全<span class="highlight">27項目</span>あるので、漏れなくチェックしましょう。</p>

<h2>失敗4：見学をしない</h2>
<p>見学なしで申し込んで、入園後に「イメージと違った」と後悔するケースも。必ず見学してから希望順位を決めましょう。</p>

<h2>失敗5：書類の不備で受理されない</h2>
<p>就労証明書の記入漏れは最もよくあるミスです。提出前にダブルチェックしてください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>必要書類は<a href="https://www.city.nerima.tokyo.jp/kosodatekyoiku/kodomo/hoiku/hoikuen/nyuuen/moushikomi/chuui-jikou.html" target="_blank" rel="noopener">練馬区公式サイト「申込み時の注意事項」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },
];

registerArticles(articles);
