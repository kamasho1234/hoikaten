import type { Article } from "./types";
import { registerArticles } from "./index";

const misatomiyagiArticles: Article[] = [
  {
    slug: "misato-miyagi-guide",
    citySlug: "misato-miyagi",
    title: "美里町の保活ガイド｜sum方式と日数×時間グリッド評価の基本",
    description:
      "宮城県美里町の保育所入所選考はsum方式を採用。父母の基準指数を合計し、調整指数を加えた合計点で優先順位を決定します。",
    image:
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>美里町の保育所入所選考制度</h2>
<p>宮城県遠田郡美里町の保育所入所選考は<span class="highlight">sum方式（合計方式）</span>を採用しています。父母それぞれの基準指数を合計し、調整指数を加えた合計点で優先順位を決定します。各保護者の基準指数上限は10点で、世帯の合計基準指数の最大は20点です。</p>

<h3>選考の基本的な流れ</h3>
<ul>
<li>保護者ごとに「保育が必要な理由」を確認し、基準指数を算定</li>
<li>父の基準指数＋母の基準指数を合計</li>
<li>ひとり親・生活保護・保育士等の状況により調整指数を加減</li>
<li>合計指数が高い世帯から順に内定</li>
</ul>

<h3>就労評価の特徴</h3>
<p>美里町の就労評価は<span class="highlight">週の就労日数×1日の就労時間</span>の組み合わせで点数が決まります。最高点は週5日/月20日以上・1日8時間以上で10点です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>美里町では居宅外就労（会社勤め等）と居宅内就労（自営業・農業等）が同じ点数体系です。就労形態による不利はありません。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.town.misato.miyagi.jp/" target="_blank" rel="noopener">美里町公式サイト</a>の子育て・保育に関するページをご確認ください。</p>
</div>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "misato-miyagi-employment",
    citySlug: "misato-miyagi",
    title: "美里町の就労点数｜週5日×8時間以上で最高10点",
    description:
      "美里町の保育所入所選考における就労の基準指数を解説。週の就労日数と1日の就労時間の組み合わせで点数が決まります。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "就労",
    categoryColor: "blue",
    content: `<h2>美里町の就労基準指数</h2>
<p>美里町では就労状況を<span class="highlight">週の就労日数×1日の就労時間</span>のグリッドで評価します。日数区分は週5日（月20日以上）・週4日（月16日以上）・週3日（月12日以上）の3段階、時間区分は8時間以上・7〜8時間未満・6〜7時間未満・4〜6時間未満の4段階です。</p>

<h3>就労基準指数一覧</h3>
<table>
<thead><tr><th>就労日数</th><th>1日の時間</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>週5日/月20日以上</td><td>8時間以上</td><td>10点</td></tr>
<tr><td>週5日/月20日以上</td><td>7〜8時間未満</td><td>9点</td></tr>
<tr><td>週5日/月20日以上</td><td>6〜7時間未満</td><td>8点</td></tr>
<tr><td>週5日/月20日以上</td><td>4〜6時間未満</td><td>7点</td></tr>
<tr><td>週4日/月16日以上</td><td>8時間以上</td><td>8点</td></tr>
<tr><td>週4日/月16日以上</td><td>7〜8時間未満</td><td>7点</td></tr>
<tr><td>週4日/月16日以上</td><td>6〜7時間未満</td><td>6点</td></tr>
<tr><td>週4日/月16日以上</td><td>4〜6時間未満</td><td>5点</td></tr>
<tr><td>週3日/月12日以上</td><td>8時間以上</td><td>6点</td></tr>
<tr><td>週3日/月12日以上</td><td>7〜8時間未満</td><td>5点</td></tr>
<tr><td>週3日/月12日以上</td><td>6〜7時間未満</td><td>4点</td></tr>
<tr><td>週3日/月12日以上</td><td>4〜6時間未満</td><td>3点</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>週4日・1日8時間（月16日以上・8h）の就労でも8点が取得できます。フルタイム月20日と比べて2点差ですが、週4日勤務でも高い指数が確保できます。</p>
</div>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "misato-miyagi-home-employment",
    citySlug: "misato-miyagi",
    title: "美里町は居宅外・居宅内就労で同点｜自営業・農業も同じ評価",
    description:
      "美里町の保育所選考では居宅外就労（外勤）と居宅内就労（自営・農業等）が同一の点数体系。内職のみ別区分（最高4点）です。",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=400&fit=crop",
    category: "就労",
    categoryColor: "blue",
    content: `<h2>居宅外就労と居宅内就労の違い</h2>
<p>美里町では<span class="highlight">居宅外就労（会社勤め・自営業の外勤等）と居宅内就労（自宅での自営・農業等）が同一の点数体系</span>です。就労形態による不公平がない制度設計となっています。</p>

<h3>内職・内勤（その他）は別区分</h3>
<p>ただし、内職や内勤（その他）は別の区分となり、点数が低く設定されています。</p>

<table>
<thead><tr><th>就労の種類</th><th>条件</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>内職・内勤（その他）</td><td>週4日以上・日中週30時間以上</td><td>4点</td></tr>
<tr><td>内職・内勤（その他）</td><td>週3日以上・日中週12時間以上</td><td>3点</td></tr>
</tbody>
</table>

<h3>就労区分の整理</h3>
<ul>
<li><strong>居宅外就労</strong>：通勤して働く（会社員・パート・自営業主等）→ 日数×時間グリッドで最高10点</li>
<li><strong>居宅内就労</strong>：自宅で働く（農業・自宅での自営業等）→ 同じグリッドで最高10点</li>
<li><strong>内職・内勤等</strong>：在宅の内職・家事手伝い等 → 最高4点</li>
</ul>

<div class="info-box">
<p><strong>確認事項</strong></p>
<p>就労形態の判断に迷う場合は、美里町の子育て担当窓口にご相談ください。</p>
</div>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "misato-miyagi-adjustment",
    citySlug: "misato-miyagi",
    title: "美里町の調整指数一覧｜ひとり親+15・生活保護+15",
    description:
      "美里町の保育所選考における調整指数を解説。ひとり親世帯・生活保護世帯は基準指数に+15の大きな加点があります。",
    image:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=400&fit=crop",
    category: "調整指数",
    categoryColor: "amber",
    content: `<h2>美里町の調整指数</h2>
<p>美里町では基準指数の合計に、世帯の状況に応じた<span class="highlight">調整指数</span>を加減算します。</p>

<h3>プラス調整指数</h3>
<table>
<thead><tr><th>状況</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>ひとり親世帯・父母不在世帯</td><td>+15</td></tr>
<tr><td>生活保護世帯</td><td>+15</td></tr>
<tr><td>虐待・DVなど社会的養護が必要</td><td>+15</td></tr>
<tr><td>保護者が教育職員（保育士等）</td><td>+3</td></tr>
<tr><td>生計中心者が失業</td><td>+3</td></tr>
<tr><td>きょうだいが別施設で在籍・申込中</td><td>+2</td></tr>
<tr><td>申請する子どもが障害を有している</td><td>+2</td></tr>
<tr><td>小規模保育卒園後の連携施設希望</td><td>+2</td></tr>
<tr><td>育児休業明けの復職に伴う申込</td><td>+1</td></tr>
<tr><td>きょうだいと同一施設希望・現利用施設希望</td><td>+1</td></tr>
<tr><td>放課後児童指導員</td><td>+1</td></tr>
</tbody>
</table>

<h3>マイナス調整指数</h3>
<table>
<thead><tr><th>状況</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>保育料等3か月以上滞納</td><td>-5</td></tr>
<tr><td>同居祖父母等が無職・求職中</td><td>-3</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親世帯は+15点と大きな加点があります。基準指数（最大20点）と合算すると実質的に非常に高い合計指数になります。</p>
</div>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "misato-miyagi-single-parent",
    citySlug: "misato-miyagi",
    title: "美里町のひとり親世帯の保活｜+15点の大幅加点で入所しやすい",
    description:
      "美里町ではひとり親世帯に調整指数+15点が加算。就労の基準指数と合わせると非常に高い合計点となり、保育所入所が有利になります。",
    image:
      "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&h=400&fit=crop",
    category: "ひとり親",
    categoryColor: "purple",
    content: `<h2>美里町のひとり親世帯の優先措置</h2>
<p>美里町では<span class="highlight">ひとり親世帯（または父母が不在の世帯）に調整指数+15点</span>が加算されます。これは非常に大きな加点です。</p>

<h3>ひとり親+就労の合計点の例</h3>
<table>
<thead><tr><th>状況</th><th>点数</th></tr></thead>
<tbody>
<tr><td>就労（週5日・8時間以上）</td><td>10点</td></tr>
<tr><td>ひとり親加算</td><td>+15点</td></tr>
<tr><td>合計</td><td>25点</td></tr>
</tbody>
</table>

<h3>対象となる世帯</h3>
<ul>
<li>離婚・死別などによるひとり親世帯</li>
<li>離婚調停中の世帯（市区町村により異なる場合あり）</li>
<li>父母が不在の世帯（祖父母が養育者等）</li>
</ul>

<div class="info-box">
<p><strong>確認が必要な事項</strong></p>
<p>ひとり親世帯の認定条件については美里町の担当窓口でご確認ください。離婚調停中の場合は申立書等の書類が必要になる場合があります。</p>
</div>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "misato-miyagi-illness-disability",
    citySlug: "misato-miyagi",
    title: "美里町の疾病・障害・介護の点数｜入院・重度障害で最高10点",
    description:
      "美里町の保育所選考における疾病・障害・介護の基準指数を解説。1か月以上の入院や重度障害では10点が取得できます。",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop",
    category: "特別事由",
    categoryColor: "rose",
    content: `<h2>美里町の疾病・障害・介護の基準指数</h2>
<p>美里町では就労以外にも、疾病・障害・介護等の理由で保育を必要とする場合に基準指数が与えられます。</p>

<h3>疾病・負傷の基準指数</h3>
<table>
<thead><tr><th>状況</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>1か月以上の入院 / 常時臥床</td><td>10点</td></tr>
<tr><td>その他の療養・長期加療中</td><td>5点</td></tr>
</tbody>
</table>

<h3>障害の基準指数</h3>
<table>
<thead><tr><th>障害の程度</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>身体1・2級 / 療育手帳A / 精神1・2級</td><td>10点</td></tr>
<tr><td>身体3級等</td><td>7点</td></tr>
</tbody>
</table>

<h3>介護・看護の基準指数</h3>
<table>
<thead><tr><th>状況</th><th>基準指数</th></tr></thead>
<tbody>
<tr><td>全介護が必要な状態の家族の介護</td><td>9点</td></tr>
<tr><td>その他の介護・看護</td><td>5点</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>疾病・障害の程度証明には医師の診断書や障害者手帳が必要です。申請前に窓口で必要書類を確認してください。</p>
</div>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "misato-miyagi-nursery-worker",
    citySlug: "misato-miyagi",
    title: "美里町の保育士・教育職員加点｜+3点の調整指数",
    description:
      "美里町では保護者が保育士・教育職員の場合に調整指数+3点が加算。放課後児童指導員は+1点です。",
    image:
      "https://images.unsplash.com/photo-1567302851521-89e05c2d2b38?w=800&h=400&fit=crop",
    category: "調整指数",
    categoryColor: "amber",
    content: `<h2>美里町の保育士・教育職員への加点</h2>
<p>美里町では<span class="highlight">保護者が保育士や教育職員の場合、調整指数+3点</span>が加算されます。これは保育人材の就労を支援する措置です。</p>

<h3>対象職種と調整指数</h3>
<table>
<thead><tr><th>職種</th><th>調整指数</th></tr></thead>
<tbody>
<tr><td>保育士、幼稚園教諭等の教育職員</td><td>+3点</td></tr>
<tr><td>放課後児童指導員</td><td>+1点</td></tr>
</tbody>
</table>

<h3>適用の条件</h3>
<ul>
<li>保育士・幼稚園教諭等の有資格者であること</li>
<li>現に就労していること</li>
<li>美里町内外を問わず対象になる場合あり（窓口確認推奨）</li>
</ul>

<div class="info-box">
<p><strong>申請時の注意</strong></p>
<p>資格証明書や雇用証明書の提出が必要です。美里町担当窓口でご確認ください。</p>
</div>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "misato-miyagi-grandparent",
    citySlug: "misato-miyagi",
    title: "美里町の同居祖父母の減点｜無職・求職中は-3点",
    description:
      "美里町では同居する祖父母等が無職・求職中の場合、保育を担える状況とみなされ-3点の減点があります。",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=400&fit=crop",
    category: "調整指数",
    categoryColor: "amber",
    content: `<h2>美里町の同居祖父母による減点</h2>
<p>美里町では<span class="highlight">同居する祖父母等が無職または求職中の場合、-3点の調整指数</span>が適用されます。これは、祖父母が保育を担える状況にあるとみなされるためです。</p>

<h3>減点が適用される条件</h3>
<ul>
<li>同居している祖父母等が無職であること</li>
<li>同居している祖父母等が求職中であること</li>
</ul>

<h3>減点が適用されない場合</h3>
<ul>
<li>祖父母等が就労中の場合</li>
<li>祖父母等が疾病・障害等で保育が困難な場合</li>
<li>祖父母等が介護・看護を行っている場合</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>祖父母が保育可能かどうかは申告に基づき判断されます。就労等の理由がある場合は証明書類の提出で減点を回避できる場合があります。</p>
</div>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "misato-miyagi-small-scale",
    citySlug: "misato-miyagi",
    title: "美里町の小規模保育卒園後の優先加点｜連携施設への移行",
    description:
      "美里町では小規模保育等を卒園し、連携施設を第一希望にした場合に+2点の調整指数が加算されます。",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&h=400&fit=crop",
    category: "調整指数",
    categoryColor: "amber",
    content: `<h2>美里町の小規模保育卒園後の加点</h2>
<p>美里町では<span class="highlight">小規模保育事業等を卒園し、連携施設を第一希望とした場合に+2点</span>の調整指数が加算されます。</p>

<h3>加点の対象</h3>
<ul>
<li>小規模保育事業（定員19人以下の保育施設等）を卒園予定</li>
<li>卒園後の受け入れ先として連携施設を第一希望に申請</li>
</ul>

<h3>小規模保育とは</h3>
<p>主に0〜2歳児を対象とした小規模な保育施設です。3歳以上になると小規模保育を卒園し、通常の認可保育所等への転所が必要になります。この移行時の不安を解消するための優先措置です。</p>

<div class="info-box">
<p><strong>確認事項</strong></p>
<p>加点の対象となる施設や手続きについては、美里町の担当窓口でご確認ください。</p>
</div>`,
    publishedAt: "2026-06-26",
  },
  {
    slug: "misato-miyagi-hokatsu-tips",
    citySlug: "misato-miyagi",
    title: "美里町の保活のポイント｜指数を上げるための実践的な対策",
    description:
      "美里町で保育所入所を有利にするためのポイントを解説。就労時間の増加、兄弟施設の活用、保育料の納付など実践的な対策をまとめました。",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>美里町で保活を有利に進めるポイント</h2>
<p>美里町の保育所入所選考では指数（点数）が高い世帯が優先されます。指数を上げるための実践的な対策をまとめます。</p>

<h3>1. 就労時間を増やす</h3>
<p>就労の基準指数は日数×時間グリッドで決まります。たとえば週4日勤務でも1日8時間以上であれば8点が取得できます。フルタイム（週5日・8時間以上）の10点と比べて2点差です。</p>

<h3>2. 両親ともに就労する</h3>
<p>sum方式では父母の基準指数を合計するため、両親がともに就労することで合計点を最大化できます。一方が求職中（3点）でも合計点は下がりません。</p>

<h3>3. 兄弟施設を第一希望にする</h3>
<p>きょうだいが在籍する施設を第一希望にすると+1点の調整指数が加算されます。同一施設の利用は送迎の面でも合理的です。</p>

<h3>4. 保育料を滞納しない</h3>
<p>保育料等の3か月以上の滞納は-5点という大きな減点につながります。現在利用中の施設がある場合は必ず期日内に納付してください。</p>

<h3>5. 育児休業明けの申込</h3>
<p>育児休業明けの復職に伴う申込は+1点の調整指数があります。育休明けの申込予定がある場合は積極的に活用しましょう。</p>

<div class="point-box">
<p><strong>まとめ</strong></p>
<p>美里町の保活では、就労時間の確保と保育料の適切な納付が最重要です。ひとり親・生活保護世帯には大きな加点があります。自分の状況に合わせてシミュレーターで点数を確認してみてください。</p>
</div>`,
    publishedAt: "2026-06-26",
  },
];

registerArticles(misatomiyagiArticles);
