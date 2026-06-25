import type { Article } from "./types";
import { registerArticles } from "./index";

const musashimurayamaArticles: Article[] = [
  {
    slug: "musashimurayama-guide",
    citySlug: "musashimurayama",
    title: "武蔵村山市の保活ガイド｜50点制と保育従事者加点の特徴",
    description:
      "武蔵村山市の保育園入園選考で使われる基準指数システムを解説。合計方式（父最大50点＋母最大50点＋調整指数）の仕組みと保育従事者+15の特徴をまとめました。",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>武蔵村山市の保育園入園制度</h2>
<p>武蔵村山市の保育園入園選考は<span class="highlight">基準指数の合計方式</span>を採用しています。父母それぞれの基準指数を合計し、調整指数を加算して世帯の選考点を決定します。</p>

<h3>点数の構成</h3>
<p>父母各最大<strong>50点</strong>、合計で最大100点の基準指数に調整指数を加えて選考されます。</p>

<h3>武蔵村山市の特徴</h3>
<ul>
<li>就労は週5日×1日8時間以上で最大50点</li>
<li>保育従事者として就労する場合の加点が<strong>+15</strong>と全国でもトップクラス</li>
<li>連携施設への進学で+20の大きな加点</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>武蔵村山市は保育従事者への加点が+15と非常に手厚いのが特徴です。保育士資格を持って保育施設で働いている方には有利な制度設計です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.musashimurayama.lg.jp/" target="_blank" rel="noopener">武蔵村山市公式サイト</a>の保育所等利用調整ページをご確認ください。</p>
</div>`,
    publishedAt: "2026-06-09",
    popularity: 75,
  },

  {
    slug: "musashimurayama-scoring-system",
    citySlug: "musashimurayama",
    title: "武蔵村山市の基準指数システム徹底解説｜就労5段階評価",
    description:
      "武蔵村山市の保育園入園で使われる基準指数システムを解説。週5日の就労時間別5段階評価、疾病・障害等の点数を詳しくまとめました。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>基準指数の計算方法</h2>
<p><strong>選考指数 = 父の基準指数 + 母の基準指数 + 調整指数</strong></p>

<h3>就労の基準指数（5段階）</h3>
<table>
<tr><th>就労状況</th><th>基準指数</th></tr>
<tr><td>週5日以上・1日8時間以上</td><td>50点</td></tr>
<tr><td>週5日以上・1日7時間以上8時間未満</td><td>45点</td></tr>
<tr><td>週5日以上・1日6時間以上7時間未満</td><td>40点</td></tr>
<tr><td>週5日以上・1日4時間以上6時間未満</td><td>35点</td></tr>
<tr><td>その他月48時間以上就労</td><td>15点</td></tr>
</table>

<h3>その他の基準指数</h3>
<table>
<tr><th>区分</th><th>基準指数</th></tr>
<tr><td>常時病臥・1か月以上入院</td><td>50点</td></tr>
<tr><td>障害1・2級</td><td>50点</td></tr>
<tr><td>障害3・4級</td><td>35点</td></tr>
<tr><td>要介護3〜5の方の介護</td><td>50点</td></tr>
<tr><td>通院付添の介護（週5日以上）</td><td>40点</td></tr>
<tr><td>妊娠・出産</td><td>35点</td></tr>
<tr><td>就学（月48h以上）</td><td>35点</td></tr>
<tr><td>災害復旧</td><td>50点</td></tr>
<tr><td>求職（就労内定あり）</td><td>10点</td></tr>
<tr><td>求職（日中外出して活動）</td><td>5点</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>武蔵村山市は求職活動の点数が10点・5点と低めです。求職中の場合は内定をもらってから申し込むと点数が上がります。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労は週5日以上が基本条件です。週4日以下の場合は「その他月48時間以上」の15点となり、大きく点数が下がります。週5日以上の勤務形態を確保することが重要です。</p>
</div>`,
    publishedAt: "2026-06-09",
    popularity: 85,
  },

  {
    slug: "musashimurayama-adjustment-items",
    citySlug: "musashimurayama",
    title: "武蔵村山市の調整指数一覧｜保育従事者+15が最大の加点",
    description:
      "武蔵村山市の保育園選考で使われる調整指数を一覧でまとめました。保育従事者+15、ひとり親+10、きょうだい加点など全項目を確認できます。",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>調整指数の一覧</h2>
<table>
<tr><th>項目</th><th>加点</th></tr>
<tr><td>保育従事者として就労</td><td>+15</td></tr>
<tr><td>ひとり親世帯</td><td>+10</td></tr>
<tr><td>失業で速やかな就労が必要</td><td>+10</td></tr>
<tr><td>育児休業後の復職予定</td><td>+5</td></tr>
<tr><td>同時申込3人以上（多胎児+5）</td><td>+4</td></tr>
<tr><td>同時申込2人（多胎児+4）</td><td>+3</td></tr>
<tr><td>地域型保育事業在園</td><td>+3</td></tr>
<tr><td>きょうだい同園在園</td><td>+2</td></tr>
<tr><td>連携施設への進学</td><td>+20</td></tr>
<tr><td>同居保護者が無職・求職中</td><td>-5</td></tr>
<tr><td>育児休業延長希望</td><td>-100</td></tr>
</table>

<h3>保育従事者加点+15の活用</h3>
<p>武蔵村山市最大の特徴は<strong>保育従事者として就労する場合の+15加点</strong>です。保育士・保育教諭として保育施設で勤務している方は、フルタイム勤務（50+50=100）に+15が加算され、115点になります。</p>

<h3>育児休業延長希望で-100</h3>
<p>育児休業の延長を目的とした申し込みの場合は-100点となり、事実上不承諾となります。実際に入園する意思がある場合に申し込みましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育士資格を持っている方は武蔵村山市での保活が非常に有利です。他の自治体では保育従事者加点は+2〜3点程度のところが多い中、+15は破格の優遇措置です。</p>
</div>`,
    publishedAt: "2026-06-09",
    popularity: 88,
  },

  {
    slug: "musashimurayama-employment-points",
    citySlug: "musashimurayama",
    title: "武蔵村山市の就労点数計算｜週5日勤務で最大50点",
    description:
      "武蔵村山市の保育園入園で就労による基準指数を解説。週5日以上の勤務時間別5段階と、週4日以下の場合の扱いをまとめました。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>就労の基準指数</h2>
<p>武蔵村山市では週の勤務日数と1日の就労時間で基準指数が決まります。</p>

<h3>週5日以上勤務の場合</h3>
<table>
<tr><th>1日の就労時間</th><th>基準指数</th></tr>
<tr><td>8時間以上</td><td>50点</td></tr>
<tr><td>7時間以上8時間未満</td><td>45点</td></tr>
<tr><td>6時間以上7時間未満</td><td>40点</td></tr>
<tr><td>4時間以上6時間未満</td><td>35点</td></tr>
</table>

<h3>週4日以下・その他の場合</h3>
<p>月48時間以上就労であれば<strong>15点</strong>が付与されます。週5日未満でも月48時間以上であれば対象になります。</p>

<h2>両親フルタイムの場合</h2>
<p>50 + 50 = <strong>100点</strong>。ここに調整指数が加算されます。</p>

<h2>注意点</h2>
<p>武蔵村山市は「週5日以上」が高得点の条件です。週4日の場合は15点となり、35点以上の差がつきます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>週4日勤務（月128時間程度）でも「週5日以上」の条件を満たさないと15点になります。可能であれば週5日の勤務形態を確保しましょう。</p>
</div>`,
    publishedAt: "2026-06-09",
    popularity: 80,
  },

  {
    slug: "musashimurayama-schedule-timeline",
    citySlug: "musashimurayama",
    title: "武蔵村山市の保育園入園スケジュール｜申込から入園まで",
    description:
      "武蔵村山市の保育園入園の流れをスケジュール形式で解説。一次申込から入園までのタイムラインをまとめました。",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>武蔵村山市の入園スケジュール</h2>

<h3>4月入園の場合</h3>
<table>
<tr><th>時期</th><th>手続き内容</th></tr>
<tr><td>9月下旬</td><td>入所案内の配布開始</td></tr>
<tr><td>10月中旬〜11月上旬</td><td>一次申込期間</td></tr>
<tr><td>1月下旬</td><td>選考結果通知</td></tr>
<tr><td>3月</td><td>入所前面接・健康診断</td></tr>
<tr><td>4月1日</td><td>入園</td></tr>
</table>

<h2>必要書類</h2>
<ul>
<li>入所申込書</li>
<li>就労証明書（両親分）</li>
<li>保育が必要な事由の証明書類</li>
<li>調整指数に該当する証明書類</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新のスケジュールは<a href="https://www.city.musashimurayama.lg.jp/" target="_blank" rel="noopener">武蔵村山市公式サイト</a>で確認してください。</p>
</div>`,
    publishedAt: "2026-06-09",
    popularity: 72,
  },

  {
    slug: "musashimurayama-strategy-tips",
    citySlug: "musashimurayama",
    title: "武蔵村山市の保活攻略法｜保育士資格が最強の武器に",
    description:
      "武蔵村山市で保育園入園を成功させるための戦略。保育従事者加点+15の活用方法、週5日勤務の確保、園選びのコツをまとめました。",
    image:
      "https://images.unsplash.com/photo-1473649085228-583485e6e4d7?w=800&h=400&fit=crop",
    category: "保活のコツ",
    categoryColor: "amber",
    content: `<h2>武蔵村山市の保活戦略</h2>

<h3>戦略1：保育従事者加点を活用</h3>
<p>保育士資格を持ち保育施設で勤務している場合、<strong>+15の加点</strong>が得られます。これは全国でもトップクラスの優遇措置です。</p>

<h3>戦略2：週5日勤務を確保</h3>
<p>週5日以上の勤務で35〜50点が得られますが、週4日以下だと15点に急落します。可能であれば週5日の勤務形態を確保しましょう。</p>

<h3>戦略3：地域型保育からの進学</h3>
<p>地域型保育事業（小規模保育等）から連携施設への進学は+20加点されます。まず小規模保育に入園し、その後連携施設へ進学するルートも有効です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育従事者でない場合も、両親フルタイム（100点）+ ひとり親（+10）や育休復帰（+5）を組み合わせることで高い点数を確保できます。</p>
</div>`,
    publishedAt: "2026-06-09",
    popularity: 78,
  },

  {
    slug: "musashimurayama-nearby-comparison",
    citySlug: "musashimurayama",
    title: "武蔵村山市と周辺自治体の保活比較｜東大和市・瑞穂町との違い",
    description:
      "武蔵村山市と周辺自治体の保活事情を比較。東大和市、瑞穂町との点数制の違いと入園難易度をまとめました。",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
    category: "保活のコツ",
    categoryColor: "amber",
    content: `<h2>武蔵村山市周辺の保活比較</h2>
<p>武蔵村山市は東京都の北西部に位置し、東大和市と隣接しています。</p>

<h3>武蔵村山市の特徴</h3>
<ul>
<li>保育従事者加点+15が全国トップクラス</li>
<li>就労は週5日以上が高得点の条件</li>
<li>自然豊かで保育環境が良好</li>
</ul>

<h3>東大和市との比較</h3>
<p>東大和市は同じく片親最大50点ですが、就労の判定が月間時間数（7段階）で、武蔵村山市は日×時間（5段階）と異なります。東大和市は育休復帰+10が大きく、武蔵村山市は保育従事者+15が大きいという違いがあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>武蔵村山市は鉄道駅がない唯一の東京都市部自治体です。そのため保育園の競争率は比較的穏やかで、入園しやすい傾向にあります。</p>
</div>`,
    publishedAt: "2026-06-09",
    popularity: 68,
  },

  {
    slug: "musashimurayama-faq",
    citySlug: "musashimurayama",
    title: "武蔵村山市の保活Q&A｜よくある質問と回答",
    description:
      "武蔵村山市の保育園入園に関するよくある質問をまとめました。点数計算、調整指数、申し込み手続きについての疑問を解決します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "よくある質問",
    categoryColor: "rose",
    content: `<h2>点数計算に関する質問</h2>

<h3>Q：週4日のフルタイム勤務です。何点になりますか？</h3>
<p><strong>A:</strong> 週4日の場合は「その他月48時間以上就労」の15点となります。週5日以上が高得点の条件ですので、可能であれば勤務日数を増やすことを検討してください。</p>

<h3>Q：保育士として働いています。加点はありますか？</h3>
<p><strong>A:</strong> はい、保育従事者として就労する場合は+15の調整指数が加算されます。これは全国でもトップクラスの優遇措置です。</p>

<h3>Q：育児休業の延長を希望した場合はどうなりますか？</h3>
<p><strong>A:</strong> 育児休業延長目的の申し込みは-100点となり、事実上不承諾になります。実際に入園する意思がある場合に申し込んでください。</p>

<h2>調整指数に関する質問</h2>

<h3>Q：地域型保育事業からの進学で加点はありますか？</h3>
<p><strong>A:</strong> 連携施設への進学は+20の加点があります。地域型保育事業在園中の場合は+3です。</p>

<h3>Q：同居の祖父母が無職の場合、減点されますか？</h3>
<p><strong>A:</strong> 同居保護者（父母）が無職・求職中の場合は-5の減点があります。祖父母についてはケースによりますので市役所にご確認ください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>その他の質問は、武蔵村山市子ども育成課保育・幼稚園係（042-565-1111 内線184）にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-06-09",
    popularity: 92,
  },

  {
    slug: "musashimurayama-trends-2026",
    citySlug: "musashimurayama",
    title: "武蔵村山市の保活トレンド2026｜最新動向と変化",
    description:
      "武蔵村山市の保活事情の最新トレンド。保育施設の整備状況、入園難易度の変化など2026年の保活事情をまとめました。",
    image:
      "https://images.unsplash.com/photo-1473649085228-583485e6e4d7?w=800&h=400&fit=crop",
    category: "保活のコツ",
    categoryColor: "amber",
    content: `<h2>2026年の武蔵村山市保活事情</h2>
<p>武蔵村山市は都心から離れた立地で保育園の競争率は比較的穏やかです。</p>

<h3>入園のポイント</h3>
<ul>
<li>両親フルタイム勤務であれば100点を確保可能</li>
<li>保育士資格がある場合は+15で115点</li>
<li>地域型保育からの進学ルートも有効</li>
</ul>

<h3>今後の見通し</h3>
<p>武蔵村山市は人口が緩やかに減少しており、保育需要も落ち着く傾向にあります。ただし一部の人気園は引き続き競争率が高いため、複数園の希望が重要です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の情報は<a href="https://www.city.musashimurayama.lg.jp/" target="_blank" rel="noopener">武蔵村山市公式サイト</a>で確認してください。</p>
</div>`,
    publishedAt: "2026-06-09",
    popularity: 55,
  },
];

registerArticles(musashimurayamaArticles);
