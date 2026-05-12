import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "edogawa",
    title: "江戸川区の保活、いつから始める？スケジュール完全ガイド",
    description:
      "江戸川区の認可保育園の申込時期・選考の流れ・内定通知時期をわかりやすく解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>江戸川区の4月入園は、<strong>一次利用調整</strong>と<strong>二次利用調整</strong>の2回に分かれています。</p>

<h3>一次利用調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込期間</td><td>令和7年10月上旬〜11月中旬</td></tr>
<tr><td>結果通知</td><td>令和8年1月下旬〜2月上旬</td></tr>
</table>

<h3>二次利用調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込期間</td><td>令和8年1月下旬〜2月中旬</td></tr>
<tr><td>結果通知</td><td>令和8年3月上旬</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>江戸川区では「認可保育施設入園のご案内」が毎年発行されます。最新の利用調整指数表も掲載されているので必ず入手しましょう。</p>
</div>

<h2>保育園見学は早めに</h2>
<p>6月〜9月に見学を済ませておくのがおすすめです。江戸川区は保育園の数が多いエリアです。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.edogawa.tokyo.jp/e048/qa/kosodate/kosodate/hoiku/moushikomi/riyochosei/riyochoseikihon.html" target="_blank" rel="noopener">江戸川区公式サイト「利用調整の基本」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "edogawa",
    title: "江戸川区の入園点数のしくみ　基準指数と調整指数をやさしく解説",
    description:
      "江戸川区の保育園入園選考で使われる「基準指数」と「調整指数」の仕組みを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>点数ってなに？</h2>
<p>江戸川区の保育園入園は「基準指数」と「調整指数」の合計で選考されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>世帯の合計指数 ＝ 父の基準指数（上限50）＋ 母の基準指数（上限50）＋ 調整指数</p>
</div>

<h2>基準指数とは？</h2>
<p>父母それぞれの「保育が必要な理由」を点数化したものです。1人あたり最大<span class="highlight">50点</span>で、父母合計の最大は<span class="highlight">100点</span>。</p>
<p>居宅外労働で月20日以上・7時間以上勤務なら満点の50点です。</p>

<table>
<tr><th>勤務状況</th><th>基準指数</th></tr>
<tr><td>居宅外・月20日以上・7時間以上</td><td>50</td></tr>
<tr><td>居宅外・月20日以上・5〜7時間</td><td>45</td></tr>
<tr><td>居宅内・月20日以上・7時間以上</td><td>45</td></tr>
<tr><td>居宅外・月16日以上・7時間以上</td><td>40</td></tr>
<tr><td>居宅外・月20日以上・4〜5時間</td><td>40</td></tr>
</table>

<h2>居宅外と居宅内の違い</h2>
<p>江戸川区では<span class="highlight">居宅外労働</span>と<span class="highlight">居宅内労働</span>で基準指数が異なります。在宅勤務の場合は居宅内に分類され、同じ勤務時間でも<span class="highlight">5点低く</span>なります。</p>

<h2>調整指数とは？</h2>
<p>加算<span class="highlight">12項目</span>、減算<span class="highlight">2項目</span>とシンプルです。</p>
<ul>
<li>ひとり親世帯：不存在<span class="highlight">+50点</span>＋調整<span class="highlight">+10点</span></li>
<li>生活保護世帯：<span class="highlight">+10点</span></li>
<li>きょうだい在園（同一園希望）：<span class="highlight">+6点</span></li>
<li>認可外利用：<span class="highlight">+1点</span></li>
<li>育休明け：<span class="highlight">+1点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>指数表は<a href="https://www.city.edogawa.tokyo.jp/e048/qa/kosodate/kosodate/hoiku/moushikomi/riyochosei/riyochoseikihon.html" target="_blank" rel="noopener">江戸川区公式サイト「利用調整の基本」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  {
    slug: "score-up-checklist",
    citySlug: "edogawa",
    title: "江戸川区で点数を1点でも上げる方法　加点のチェックリスト",
    description:
      "江戸川区の入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>加点の取りこぼしをなくそう</h2>
<p>江戸川区の調整指数はシンプルですが、<span class="highlight">きょうだい加点（+6点）</span>が非常に大きいのが特徴です。</p>

<h3>加点チェックリスト</h3>
<table>
<tr><th>加点項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>+60点</td><td>不存在50点＋調整10点</td></tr>
<tr><td>生活保護世帯</td><td>+10点</td><td>生活保護受給中</td></tr>
<tr><td>きょうだい在園（同一園）</td><td>+6点</td><td>希望する園にきょうだいが在園中</td></tr>
<tr><td>未就学児3人以上</td><td>+1点</td><td>未就学児が3人以上</td></tr>
<tr><td>認可外利用</td><td>+1点</td><td>月ぎめで認可外に預けている</td></tr>
<tr><td>育休明け</td><td>+1点</td><td>入園月に復職予定</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>60歳未満の同居祖父母が無職の場合は<span class="highlight">-6点</span>の大きな減点があります。</p>
</div>

<h2>きょうだい加点が最大のポイント</h2>
<p>江戸川区では<span class="highlight">きょうだい加点（+6点）</span>が非常に大きく、第2子以降の入園で圧倒的に有利になります。きょうだいが在園中の園を第一希望にすることが重要です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目の詳細は<a href="https://www.city.edogawa.tokyo.jp/e048/qa/kosodate/kosodate/hoiku/moushikomi/riyochosei/riyochoseikihon.html" target="_blank" rel="noopener">江戸川区公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 100,
  },
  {
    slug: "kyogai-kyonai",
    citySlug: "edogawa",
    title: "居宅外と居宅内の違い　江戸川区で在宅勤務だと不利？",
    description:
      "江戸川区では居宅外労働と居宅内労働で基準指数が異なります。在宅勤務の方への影響を解説します。",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>居宅外と居宅内で5点の差</h2>
<p>江戸川区では、勤務場所によって基準指数が異なります。在宅勤務（居宅内労働）の場合、同じ勤務時間でも居宅外より<span class="highlight">5点低く</span>なります。</p>

<table>
<tr><th>勤務場所</th><th>月20日以上・7時間以上</th></tr>
<tr><td>居宅外</td><td><span class="highlight">50点</span></td></tr>
<tr><td>居宅内</td><td>45点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>夫婦ともに在宅勤務の場合、居宅外の夫婦と比べて<span class="highlight">10点</span>の差がつく可能性があります。</p>
</div>

<h2>ハイブリッド勤務の場合は？</h2>
<p>週の一部が出社、一部が在宅の場合は、勤務実態に応じて判断されます。主に出社している場合は居宅外として扱われることが多いですが、詳細は江戸川区に確認してください。</p>

<h2>在宅勤務でも加点で補う</h2>
<p>居宅内労働で5点不利になっても、きょうだい加点（+6点）があれば逆転できます。認可外利用（+1点）や育休明け（+1点）も活用しましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>居宅外・居宅内の判定基準は<a href="https://www.city.edogawa.tokyo.jp/e048/qa/kosodate/kosodate/hoiku/moushikomi/riyochosei/riyochoseikihon.html" target="_blank" rel="noopener">江戸川区公式サイト「利用調整の基本」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 90,
  },
  {
    slug: "same-score-priority",
    citySlug: "edogawa",
    title: "江戸川区で同点になったらどうなる？優先順位を解説",
    description:
      "江戸川区の保育園入園選考で同じ点数になった場合の判定方法を解説します。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点のとき、どうやって決まるの？</h2>
<p>江戸川区では、世帯の合計指数が同じ場合は<span class="highlight">総合的に判断</span>されます。他の区のように明確な優先順位リストが公開されていないのが特徴です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>「保護者の状況、経済状況、家庭環境等を総合的に判断」と公式に記載されています。</p>
</div>

<h2>判断の傾向</h2>
<p>江戸川区の公式情報によると、同一指数の場合は以下のような傾向があります。</p>

<ul>
<li><strong>就労実績が確実にある</strong>世帯が優先される傾向</li>
<li><strong>収入が低い</strong>世帯が優先される傾向（ただし一律ではない）</li>
<li><strong>きょうだい在園</strong>がある世帯への配慮</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>「収入が低い世帯が一律に有利になることはありません」と明記されています。あくまで総合的な判断です。</p>
</div>

<h2>対策</h2>
<p>同点の場合に備えて、加点を1つでも多く積んでおくことが最も確実な対策です。きょうだい加点（+6点）は特に効果が大きいです。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.edogawa.tokyo.jp/e048/qa/kosodate/kosodate/hoiku/moushikomi/riyochosei/sonota.html" target="_blank" rel="noopener">江戸川区公式サイト「その他」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 85,
  },
  {
    slug: "competition-reality",
    citySlug: "edogawa",
    title: "100点がボーダー！江戸川区の入園競争の実態",
    description:
      "江戸川区の保育園入園選考におけるボーダーラインと入園競争の実態を解説します。",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>フルタイム共働き100点が基本ライン</h2>
<p>江戸川区では、父母ともに居宅外フルタイム勤務（月20日以上・7時間以上）の場合、基準指数は<span class="highlight">50点＋50点＝100点</span>になります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>江戸川区は東京23区の中でも保育園の整備が進んでいるエリアですが、人気園では100点でも入れないことがあります。</p>
</div>

<h2>点数帯のイメージ</h2>
<table>
<tr><th>合計指数</th><th>状況</th></tr>
<tr><td>106点以上</td><td>きょうだい加点あり。多くの園で有利</td></tr>
<tr><td>100〜105点</td><td>フルタイム共働き。標準的</td></tr>
<tr><td>80〜99点</td><td>パートタイム等。厳しい園もある</td></tr>
<tr><td>50〜79点</td><td>認可園は厳しい</td></tr>
</table>

<h2>きょうだい加点で大きく有利に</h2>
<p>江戸川区のきょうだい加点は<span class="highlight">+6点</span>と大きく、100点→106点になれば多くの園で入園が期待できます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.edogawa.tokyo.jp/e048/qa/kosodate/kosodate/hoiku/moushikomi/riyochosei/riyochoseikihon.html" target="_blank" rel="noopener">江戸川区公式サイト「利用調整の基本」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 95,
  },
  {
    slug: "ochita-sentakushi",
    citySlug: "edogawa",
    title: "江戸川区で保育園に落ちたときの5つの選択肢",
    description:
      "江戸川区の認可保育園の選考で不承諾だった場合に検討すべき選択肢を紹介します。",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=400&fit=crop",
    category: "入れなかったら",
    categoryColor: "rose",
    content: `<h2>5つの選択肢</h2>

<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>二次利用調整を待つ</strong><p>一次で不承諾の方は二次の対象になります。希望園の変更も可能です。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>認証保育所に申し込む</strong><p>認可外に預けると翌年度に加点（+1点）が得られます。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>小規模保育を利用する</strong><p>0〜2歳児対象の施設で、認可園より入りやすい場合があります。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>企業主導型保育施設を利用する</strong><p>認可外ですが保育料が比較的抑えられた施設もあります。</p></div>
</div>
<div class="step">
<div class="step-num">5</div>
<div class="step-content"><strong>幼稚園の預かり保育（3歳以上）</strong><p>江戸川区は幼稚園も充実しています。預かり保育で長時間対応の園もあります。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>江戸川区は子育て支援が充実しており、認可外保育施設への補助金制度もあります。区の窓口に相談してみましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>空き状況は江戸川区公式サイトで確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },
  {
    slug: "ikukyuake-hokatsu",
    citySlug: "edogawa",
    title: "育休明けの保活、江戸川区で気をつけること",
    description:
      "育休中に始める江戸川区の保活で、復職条件や申込時の注意点をまとめました。",
    image: "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>育休明けの加点</h2>
<p>江戸川区では、育休明けで入園月に復職予定の場合に調整指数として<span class="highlight">+1点</span>が加算されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>江戸川区の育休明け加点は+1点と控えめですが、フルタイム共働き100点に+1点で101点になるだけでも競争では有利になります。</p>
</div>

<h2>育児休業中の注意点</h2>
<p>育休中でも「復職後の勤務条件」で基準指数が計算されます。フルタイム復帰予定なら<span class="highlight">50点</span>が適用されます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>育休延長を繰り返して3歳以上になると、入園の優先度が下がる場合があります。復帰時期は計画的に検討しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>育休中の扱いについては<a href="https://www.city.edogawa.tokyo.jp/e048/qa/kosodate/kosodate/hoiku/moushikomi/riyochosei/ikujikyugyo.html" target="_blank" rel="noopener">江戸川区公式サイト「育児休業」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },
  {
    slug: "sohubo-genten",
    citySlug: "edogawa",
    title: "祖父母同居で-6点！江戸川区の減点に要注意",
    description:
      "江戸川区では60歳未満の無職祖父母が同居していると大きな減点があります。その条件と対策を解説します。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>-6点の減点とは</h2>
<p>江戸川区では、<span class="highlight">60歳未満の同居祖父母が無職</span>の場合に調整指数として<span class="highlight">-6点</span>の減点があります。これは東京23区の中でも大きな減点です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>フルタイム共働き100点から-6点されると94点になり、入園は非常に厳しくなります。</p>
</div>

<h2>減点の条件</h2>
<ul>
<li>同居していること（住民票が同一世帯）</li>
<li>60歳未満であること</li>
<li>就労や疾病等の理由がなく、保育が可能な状態であること</li>
</ul>

<h2>減点を回避するには</h2>
<p>以下の場合は減点の対象になりません。</p>
<ul>
<li>祖父母が60歳以上の場合</li>
<li>祖父母が就労している場合（月48時間以上等）</li>
<li>祖父母が疾病・障害等で保育ができない場合</li>
<li>同居していない（住民票が別世帯）場合</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>祖父母が短時間でもパート等で働いている場合は減点の対象外になる可能性があります。詳しくは江戸川区に確認してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.edogawa.tokyo.jp/e048/qa/kosodate/kosodate/hoiku/moushikomi/riyochosei/riyochoseikihon.html" target="_blank" rel="noopener">江戸川区公式サイト「利用調整の基本」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 70,
  },
  {
    slug: "hokatsu-mistakes",
    citySlug: "edogawa",
    title: "江戸川区の保活でよくある失敗と対策5選",
    description:
      "江戸川区の保活で初めてのママがやりがちな失敗パターンと対策をまとめました。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>失敗1：居宅外と居宅内の違いを知らない</h2>
<p>在宅勤務（居宅内労働）の場合、居宅外と比べて<span class="highlight">5点低く</span>なります。この差を知らずに100点あると思い込むのは危険です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>在宅勤務の場合は45点×2＝90点になる可能性があります。居宅外勤務への切り替えが可能か検討しましょう。</p>
</div>

<h2>失敗2：祖父母同居の減点を知らない</h2>
<p>60歳未満の無職祖父母が同居していると<span class="highlight">-6点</span>の減点があります。該当しないか必ず確認してください。</p>

<h2>失敗3：きょうだい加点を活かさない</h2>
<p>江戸川区のきょうだい加点は<span class="highlight">+6点</span>と大きいですが、希望園にきょうだいが在園していないと適用されません。きょうだいが通っている園を希望に入れましょう。</p>

<h2>失敗4：希望園を少なく書く</h2>
<p>通える範囲の園はできるだけ多く書くのが鉄則です。</p>

<h2>失敗5：就労証明書の不備</h2>
<p>勤務時間・日数・勤務場所（居宅外/居宅内）の記載が不正確だと、正しい基準指数が適用されません。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.edogawa.tokyo.jp/e048/qa/kosodate/kosodate/hoiku/moushikomi/riyochosei/riyochoseikihon.html" target="_blank" rel="noopener">江戸川区公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },
  {
    slug: "hoikuryo-keisan",
    citySlug: "edogawa",
    title: "江戸川区の保育料計算【令和8年度版】年収別シミュレーション・早見表",
    description:
      "江戸川区の認可保育園の保育料を年収・子ども数別に詳しく解説。区民税所得割額に基づく階層区分早見表、無償化（3歳〜）の対象確認、副食費・第2子以降の減免制度まで。令和8年度対応。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "amber",
    content: `<h2>江戸川区の保育料はどうやって決まる？</h2>
<p>江戸川区の認可保育園の保育料（利用者負担額）は、<strong>世帯の区民税所得割額</strong>によって決まります。東京都の基準に基づき階層区分が設定されており、所得が高いほど保育料も高くなる応能負担方式です。</p>

<h2>年齢ごとの基本ルール</h2>
<table>
<tr><th>年齢</th><th>保育料</th><th>注意点</th></tr>
<tr><td>0〜2歳児</td><td>有料（階層区分による）</td><td>世帯の所得割額で決定</td></tr>
<tr><td>3〜5歳児</td><td>無償（月額上限あり）</td><td>幼児教育・保育の無償化対象</td></tr>
</table>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3歳以上は保育料が無償化されますが、<span class="highlight">副食費（給食の食材費）は別途負担</span>が必要です。低所得世帯や第3子以降は免除される場合があります。</p>
</div>

<h2>保育料の階層区分（0〜2歳の目安）</h2>
<table>
<tr><th>区民税所得割額（世帯合計）</th><th>保育料目安（月額・0歳）</th></tr>
<tr><td>非課税世帯</td><td>無料</td></tr>
<tr><td>〜約5万円</td><td>6,000〜9,000円</td></tr>
<tr><td>〜約10万円</td><td>12,000〜19,000円</td></tr>
<tr><td>〜約20万円</td><td>25,000〜38,000円</td></tr>
<tr><td>〜約30万円</td><td>42,000〜52,000円</td></tr>
<tr><td>30万円超</td><td>58,000〜77,000円</td></tr>
</table>
<p class="text-xs text-muted-foreground">※上記は目安です。詳細は江戸川区の公式保育料表をご確認ください。</p>

<h2>多子世帯・ひとり親世帯の軽減</h2>
<ul>
<li><strong>第2子</strong>：同一世帯で保育所等を利用中の場合、半額</li>
<li><strong>第3子以降</strong>：無料</li>
<li><strong>ひとり親世帯・生活保護世帯</strong>：最低階層として算定（大幅減額）</li>
</ul>

<h2>副食費について（3歳以上）</h2>
<p>3歳以上は保育料が無償化されますが、副食費（おかず代）は月額4,500円程度の実費負担があります。以下の場合は免除されます。</p>
<ul>
<li>年収360万円未満相当の世帯</li>
<li>第3子以降の子ども</li>
</ul>

<h2>保育料の確認方法</h2>
<p>毎年6月ごろ、前年度の区民税額が確定した後に保育料が決定・通知されます。入園前に目安を知りたい場合は江戸川区担当課にお問い合わせください。</p>
<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の保育料表は江戸川区公式サイトからご確認ください。</p>
</div>`,
    publishedAt: "2026-05-13",
    popularity: 42,
  },
  {
    slug: "shokuhi-jippi",
    citySlug: "edogawa",
    title: "江戸川区の保育園の給食費（副食費）はいくら？【令和8年度版】免除条件と金額",
    description:
      "江戸川区の保育園の給食費（副食費）は月いくら？所得・子ども数による副食費免除の条件と申請方法、保育料無償化の範囲と実費負担の全額をわかりやすく解説。令和8年度対応。",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "amber",
    content: `<h2>江戸川区の副食費とは？</h2>
<p>2019年10月の幼児教育・保育無償化により、<strong>3歳以上の保育料は無料</strong>になりました。ただし、給食の<strong>副食費（おかず代）は実費負担</strong>が残ります。江戸川区では副食費として月額4,500円程度が別途かかります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3歳以上でも副食費は無償化の対象外です。ただし、低所得世帯・第3子以降は免除制度があります。</p>
</div>

<h2>副食費の月額目安</h2>
<table>
<tr><th>年齢</th><th>副食費（月額目安）</th></tr>
<tr><td>3〜5歳児</td><td>約4,500円</td></tr>
<tr><td>0〜2歳児</td><td>保育料に含む（副食費別途なし）</td></tr>
</table>
<p class="text-xs text-muted-foreground">※金額は目安です。詳細は江戸川区公式サイトでご確認ください。</p>

<h2>副食費が免除される条件</h2>
<table>
<tr><th>免除条件</th><th>内容</th></tr>
<tr><td>年収360万円未満相当の世帯</td><td>区民税所得割額が一定以下の世帯は副食費が免除</td></tr>
<tr><td>第3子以降の子ども</td><td>小学3年生以下のきょうだいが2人以上いる場合、3人目以降は免除</td></tr>
<tr><td>生活保護世帯</td><td>副食費の負担なし</td></tr>
</table>

<h2>保育料無償化の対象範囲</h2>
<ul>
<li>無償化対象：<strong>保育料（基本利用料）</strong>のみ — 3歳〜5歳</li>
<li>実費負担が残るもの：副食費（おかず代）・主食費（ご飯代）・行事費・通園バス代など</li>
</ul>

<h2>副食費の支払い方法</h2>
<p>副食費は園から直接請求されます。毎月口座引き落としまたは現金納付が一般的です。免除に該当する場合は入園時や毎年6月ごろに申請手続きが必要です。江戸川区担当課に確認してください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の副食費・実費負担の詳細は江戸川区公式サイトからご確認ください。</p>
</div>`,
    publishedAt: "2026-05-13",
    popularity: 40,
  },
];

registerArticles(articles);
