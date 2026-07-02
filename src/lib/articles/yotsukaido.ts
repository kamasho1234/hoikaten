import type { Article } from "./types";
import { registerArticles } from "./index";

const yotsukaidoArticles: Article[] = [
  {
    slug: "yotsukaido-guide",
    citySlug: "yotsukaido",
    title: "四街道市の保育所点数（利用調整基準）完全ガイド｜月間就労時間・調整点数を解説",
    description:
      "千葉県四街道市の保育所利用調整は父母合算（sum方式）。就労は月間時間で判定し月160時間以上で最大30点。虐待・DV対応+100点、ひとり親+40点など調整点数も詳しく解説します。",
    image:
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>四街道市の保育所利用調整制度</h2>
<p>千葉県四街道市の保育所利用調整は<span class="highlight">sum方式（父母合算）</span>を採用しています。父・母それぞれの基準点数を合算し、調整点数を加えた合計点で優先順位を決定します。</p>

<h3>四街道市の利用調整の特徴</h3>
<p>四街道市では就労を<strong>月間の総労働時間</strong>で評価します。月64時間以上の就労が基準点数の対象となり、月160時間以上（フルタイム相当）で最大30点が取得できます。</p>

<h3>利用調整の基本的な流れ</h3>
<ul>
<li>父・母それぞれの保育が必要な事由を確認し、基準点数を算定</li>
<li>父・母の基準点数を合算（sum方式）</li>
<li>調整点数（加点・減点）を加算</li>
<li>合計点数が高い世帯から順に内定</li>
</ul>

<h3>基準点数の主な区分</h3>
<table>
<thead><tr><th>事由</th><th>最高点</th></tr></thead>
<tbody>
<tr><td>就労（月160時間以上）</td><td>30点</td></tr>
<tr><td>出産（産前8週〜産後8週）</td><td>30点</td></tr>
<tr><td>長期入院（1ヶ月以上）または常時病臥</td><td>35点</td></tr>
<tr><td>重度介護・在宅介護（要介護認定者）</td><td>30点</td></tr>
<tr><td>身体障害者手帳1・2級等</td><td>30点</td></tr>
<tr><td>災害復旧</td><td>35点</td></tr>
<tr><td>就学・職業訓練（月160時間以上）</td><td>30点</td></tr>
<tr><td>育児休業中</td><td>16点</td></tr>
</tbody>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www1.g-reiki.net/yotsukaido/reiki_honbun/g029RG00000860.html" target="_blank" rel="noopener">四街道市保育所等における保育に関する規則</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-29",
  },
  {
    slug: "yotsukaido-employment",
    citySlug: "yotsukaido",
    title: "四街道市の保育所点数｜就労・就学の基準点数一覧（月間時間別）",
    description:
      "四街道市の就労・就学による基準点数を解説します。月160時間以上で30点、月140〜160時間未満で28点、月64時間未満は求職活動扱い（5〜10点）。求職活動・内職の取り扱いも説明。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "就労",
    categoryColor: "blue",
    content: `<h2>四街道市の就労・就学基準点数</h2>
<p>四街道市の就労は<strong>月間の総労働時間</strong>で基準点数が決まります。月64時間未満の就労は「求職活動」として扱われます。</p>

<h3>就労（雇用・自営業）の基準点数</h3>
<table>
<thead><tr><th>月間就労時間</th><th>基準点数</th></tr></thead>
<tbody>
<tr><td>月160時間以上</td><td>30点</td></tr>
<tr><td>月140〜160時間未満</td><td>28点</td></tr>
<tr><td>月120〜140時間未満</td><td>26点</td></tr>
<tr><td>月100〜120時間未満</td><td>24点</td></tr>
<tr><td>月80〜100時間未満</td><td>22点</td></tr>
<tr><td>月64〜80時間未満</td><td>20点</td></tr>
<tr><td>月64時間未満（内職・短時間就労含む）</td><td>10点（求職活動扱い）</td></tr>
<tr><td>求職活動のみ（就労なし）</td><td>5点</td></tr>
</tbody>
</table>

<h3>就学・職業訓練の基準点数</h3>
<table>
<thead><tr><th>月間就学時間</th><th>基準点数</th></tr></thead>
<tbody>
<tr><td>月160時間以上</td><td>30点</td></tr>
<tr><td>月140〜160時間未満</td><td>28点</td></tr>
<tr><td>月120〜140時間未満</td><td>26点</td></tr>
<tr><td>月100〜120時間未満</td><td>24点</td></tr>
<tr><td>月80〜100時間未満</td><td>22点</td></tr>
<tr><td>月64〜80時間未満</td><td>20点</td></tr>
<tr><td>就学予定</td><td>15点</td></tr>
</tbody>
</table>

<h3>育児休業中</h3>
<p>育児休業取得中の場合は<strong>16点</strong>が基準点数となります。産前産後休業明け・育休明けに職場復帰予定の場合は、調整点数でさらに加算されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>四街道市はsum方式（父母合算）のため、両親それぞれの就労時間が高いほど有利です。両親とも月160時間以上就労の場合、基準点数合計60点となります。</p>
</div>`,
    publishedAt: "2026-06-29",
  },
  {
    slug: "yotsukaido-other-reasons",
    citySlug: "yotsukaido",
    title: "四街道市の保育所点数｜疾病・障害・出産・介護・災害復旧の基準点数一覧",
    description:
      "四街道市の就労以外の保育必要理由（疾病・障害・出産・介護・災害復旧）の基準点数を解説します。長期入院・災害復旧は35点、重度介護・身体障害1-2級・出産は30点。",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop",
    category: "疾病・障害・その他",
    categoryColor: "rose",
    content: `<h2>四街道市の就労以外の基準点数</h2>

<h3>傷病・障害による基準点数</h3>
<table>
<thead><tr><th>状況</th><th>基準点数</th></tr></thead>
<tbody>
<tr><td>長期入院（1ヶ月以上）または常時病臥</td><td>35点</td></tr>
<tr><td>身体障害者手帳1・2級等（最重度）</td><td>30点</td></tr>
<tr><td>身体障害者手帳3級等（中度）</td><td>25点</td></tr>
<tr><td>週1回以上の通院加療</td><td>20点</td></tr>
<tr><td>その他保育困難な疾病等</td><td>10点</td></tr>
</tbody>
</table>

<h3>介護・看護による基準点数</h3>
<table>
<thead><tr><th>状況</th><th>基準点数</th></tr></thead>
<tbody>
<tr><td>重度障害者介護または要介護認定者の在宅介護</td><td>30点</td></tr>
<tr><td>入院患者の付添看護</td><td>25点</td></tr>
<tr><td>その他の介護・看護</td><td>10点</td></tr>
</tbody>
</table>

<h3>その他の基準点数</h3>
<table>
<thead><tr><th>事由</th><th>基準点数</th></tr></thead>
<tbody>
<tr><td>出産（産前8週〜産後8週）</td><td>30点</td></tr>
<tr><td>災害復旧（居宅の復旧作業）</td><td>35点</td></tr>
</tbody>
</table>`,
    publishedAt: "2026-06-29",
  },
  {
    slug: "yotsukaido-adjustment",
    citySlug: "yotsukaido",
    title: "四街道市の保育所点数｜調整点数（加点・減点）一覧",
    description:
      "四街道市の保育利用調整における調整点数を解説します。虐待・DV+100点・ひとり親+40点・小規模卒所+40点・保育士就労+40点・別居中+30点、保育料6ヶ月滞納-30点など。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "調整指数",
    categoryColor: "amber",
    content: `<h2>四街道市の調整点数（加点・減点）一覧</h2>

<h3>加点項目</h3>
<table>
<thead><tr><th>状況</th><th>加点</th></tr></thead>
<tbody>
<tr><td>児童虐待・DVの危険性がある</td><td>+100点</td></tr>
<tr><td>ひとり親家庭</td><td>+40点</td></tr>
<tr><td>小規模保育等を卒所（修了）後の入所希望</td><td>+40点</td></tr>
<tr><td>父または母が保育士資格を有し市内保育施設に就労</td><td>+40点</td></tr>
<tr><td>離婚調停中等で別居</td><td>+30点</td></tr>
<tr><td>生計中心者が失業中で求職活動中</td><td>+30点</td></tr>
<tr><td>生活保護受給世帯</td><td>+20点</td></tr>
<tr><td>義務教育修了前の子どもが3人以上</td><td>+10点</td></tr>
<tr><td>退所から1年以内に育休明けで職場復帰予定</td><td>+8点</td></tr>
<tr><td>産休・育休明けに職場復帰予定（上記以外）</td><td>+4点</td></tr>
<tr><td>認可外保育施設を現在利用中</td><td>+4点</td></tr>
<tr><td>入所希望児童が障害児</td><td>+3点</td></tr>
<tr><td>兄弟姉妹が在籍している施設への同一施設入所希望</td><td>+2点</td></tr>
<tr><td>兄弟姉妹を同時に申込</td><td>+2点</td></tr>
<tr><td>配偶者が単身赴任中</td><td>+2点</td></tr>
<tr><td>週5日以上就労している保護者（人数×1点）</td><td>+1〜2点</td></tr>
</tbody>
</table>

<h3>減点項目</h3>
<table>
<thead><tr><th>状況</th><th>減点</th></tr></thead>
<tbody>
<tr><td>保育料を6ヶ月以上滞納</td><td>-30点</td></tr>
<tr><td>市外の保育所等（広域入所）希望</td><td>-20点</td></tr>
<tr><td>65歳未満の同居祖父母等が無職・専業主婦（1人につき）</td><td>-5点</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>四街道市は調整点数のスケールが大きいのが特徴です。虐待・DV対応は+100点と最優先で扱われます。ひとり親・小規模保育卒所・保育士就労はいずれも+40点の大きな加算があります。</p>
</div>`,
    publishedAt: "2026-06-29",
  },
  {
    slug: "yotsukaido-hokatsu-tips",
    citySlug: "yotsukaido",
    title: "四街道市の保活で点数を上げるコツ｜月間労働時間と調整点数の活用",
    description:
      "四街道市の保育所入所を有利にするポイントを解説します。sum方式なので両親とも月160時間以上就労で合計60点。ひとり親+40点、小規模保育卒所+40点など大型加算の活用法を紹介します。",
    image:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?w=800&h=400&fit=crop",
    category: "保活のコツ",
    categoryColor: "green",
    content: `<h2>四街道市の保活で点数を上げるコツ</h2>

<h3>1. sum方式を意識する — 両親の就労時間を最大化</h3>
<p>四街道市はsum方式（父母合算）のため、<strong>両親それぞれの就労時間を高める</strong>ことが有効です。両親とも月160時間以上就労であれば基準点数の合計は60点になります。</p>

<h3>2. 月160時間（フルタイム）で最高30点</h3>
<p>月160時間は週5日・1日8時間の勤務に相当します。月140〜160時間（28点）・月120〜140時間（26点）と、20時間ごとに2点ずつ変わります。勤務時間帯の記録を正確に申告することが重要です。</p>

<h3>3. 保育料の未納に注意する</h3>
<p>保育料を6ヶ月以上滞納している場合、-30点という大きな減点になります。滞納がある場合は市の窓口に早めに相談してください。</p>

<h3>4. 小規模保育からの進級を有利に使う</h3>
<p>小規模保育・家庭的保育等を修了（卒所）後に認可保育所への入所を希望する場合、+40点の大きな加算があります。0〜2歳時に小規模保育を利用していた場合は積極的に申告しましょう。</p>

<h3>5. 育休明けの加算を確認する</h3>
<p>産休・育休明けに復帰予定の場合は+4点、一度退所して1年以内の育休明け復帰の場合は+8点が加算されます。復帰予定日を証明できる書類を準備しておきましょう。</p>

<h3>6. 祖父母の就労状況を確認する</h3>
<p>65歳未満の同居祖父母が就労していない場合、1人につき-5点の減点になります。祖父母が就労中であれば問題ありませんが、専業主婦（夫）の場合は減点を考慮した点数計算が必要です。</p>

<div class="info-box">
<p><strong>申込・相談窓口</strong></p>
<p>詳細は四街道市の子育て・保育担当窓口にお問い合わせください。詳細は<a href="https://www1.g-reiki.net/yotsukaido/reiki_honbun/g029RG00000860.html" target="_blank" rel="noopener">四街道市保育所等における保育に関する規則</a>をご参照ください。</p>
</div>`,
    publishedAt: "2026-06-29",
  },
];

registerArticles(yotsukaidoArticles);
