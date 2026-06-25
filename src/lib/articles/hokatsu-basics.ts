import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-basics-what-is",
    citySlug: "hekinan",
    title: "保活とは？保育園入園に向けた活動の全体像【碧南市の例】",
    description: "保活（ほかつ）の定義と全体像。保育園探しから入園までの基本知識を碧南市の事例で解説。",
    category: "hokatsu-basics",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1503454537688-e6ba411b2c16?w=800&h=400&fit=crop",
    content: "<h2>保活とは</h2><p>保活は保育園への入園活動全般を指す造語です。碧南市の工業都市では、多くの親が保活に取り組みます。</p><h3>保活の三段階</h3><ul><li>情報収集：市内の保育園情報の収集</li><li>申込：必要書類の準備と申し込み</li><li>通園：内定後の手続きと通園開始</li></ul><h3>成功のポイント</h3><p>早期からの準備と複数園への申込が鍵です。</p>",
    publishedAt: "2026-06-01",
    popularity: 51
  },
  {
    slug: "hokatsu-basics-types",
    citySlug: "shinshiro",
    title: "保育園の種類と違い【認可・認可外・地域型保育】",
    description: "認可保育園と認可外保育施設の違い。新城市での園選びの基礎知識。",
    category: "hokatsu-basics",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1596452713008-91cabc1a17d7?w=800&h=400&fit=crop",
    content: "<h2>保育園の3つの種類</h2><p>新城市の奥三河でも、園の種類を理解することは重要です。</p><h3>認可保育園</h3><p>市町村が管轄し、保育の質が一定基準以上。待機児童も発生しやすい。</p><h3>認可外保育施設</h3><p>独立した運営ですが、認可園より営業時間が長いことも。</p><h3>小規模保育事業・家庭的保育</h3><p>少人数で運営される地域型保育も増加中です。</p>",
    publishedAt: "2026-06-01",
    popularity: 49
  },
  {
    slug: "hokatsu-basics-points",
    citySlug: "tsushima",
    title: "保活の入園点数制度を理解する【津島市編】",
    description: "保活で最も重要な入園点数。両親の仕事の種類・時間で点数が決まる仕組み。",
    category: "hokatsu-basics",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop",
    content: "<h2>保活の入園点数とは</h2><p>津島市の待機児童対策の中核が点数制度です。</p><h3>点数の基本</h3><p>両親の就労状況で基本点が決定します。通常は0点〜100点。</p><h3>加点のポイント</h3><ul><li>祖父母と同居していない</li><li>保育の必要性が高い</li><li>兄姉が同じ園に在園</li></ul><h3>点数の活用</h3><p>複数園への申し込みの際に点数を比較することが重要です。</p>",
    publishedAt: "2026-06-01",
    popularity: 47
  },
  {
    slug: "hokatsu-basics-documents",
    citySlug: "aisai",
    title: "保活に必要な書類とその準備方法【愛西市版】",
    description: "保活の申込に必要な全書類リスト。蓮根産地の愛西市での準備のポイント。",
    category: "hokatsu-basics",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1634375066335-6f20e5a87d37?w=800&h=400&fit=crop",
    content: "<h2>保活の必要書類一覧</h2><p>愛西市での申込には以下の書類が必須です。</p><h3>基本書類</h3><ul><li>保育施設利用申請書</li><li>就労証明書（両親分）</li><li>住民票抄本</li><li>健康診断書</li></ul><h3>追加書類</h3><p>就労形態によって異なります。個別相談が推奨されます。</p><h3>準備期間</h3><p>最低3ヶ月前からの準備が理想的です。</p>",
    publishedAt: "2026-06-01",
    popularity: 44
  },
  {
    slug: "hokatsu-basics-nursery-school",
    citySlug: "kiyosu",
    title: "保育園と幼稚園の違い【清須市の視点】",
    description: "保育園と幼稚園の根本的な違い。清須市で最適な選択をするための知識。",
    category: "hokatsu-basics",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?w=800&h=400&fit=crop",
    content: "<h2>保育園と幼稚園</h2><p>織田信長ゆかりの清須市でも、両者の選択に悩む親は多いです。</p><h3>保育園</h3><p>厚生労働省管轄。保育が中心で、0歳から利用可能。</p><h3>幼稚園</h3><p>文部科学省管轄。教育が中心で、3歳以上が対象。</p><h3>選択のポイント</h3><p>両親の就労時間と本人の教育方針で決定します。</p>",
    publishedAt: "2026-06-01",
    popularity: 42
  },
  {
    slug: "hokatsu-basics-age-groups",
    citySlug: "iwakura",
    title: "0歳児保育から幼児保育へ【岩倉市での成長段階】",
    description: "保育園内での年齢別クラス構成。五条川の桜で有名な岩倉市での成長過程。",
    category: "hokatsu-basics",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=400&fit=crop",
    content: "<h2>年齢別クラス構成</h2><p>岩倉市の保育園では、0歳から5歳まで段階的に成長します。</p><h3>0〜1歳児</h3><p>手厚い保育が必要。保育者比率が高い。</p><h3>2〜3歳児</h3><p>トイレトレーニングが始まる時期。</p><h3>4〜5歳児</h3><p>社会性と学習準備が中心。幼稚園への橋渡し。</p>",
    publishedAt: "2026-06-01",
    popularity: 40
  },
  {
    slug: "hokatsu-basics-fukui-system",
    citySlug: "sakai-fukui",
    title: "福井県の保活制度【坂井市・東尋坊エリア】",
    description: "福井県特有の保活制度。愛知県との違いを理解して坂井市での申込を成功させる。",
    category: "hokatsu-basics",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=400&fit=crop",
    content: "<h2>福井県の保活の特色</h2><p>坂井市は福井県。愛知県とは制度が異なります。</p><h3>福井県の申込方法</h3><p>県内統一の様式を使用。加点の計算方法も異なります。</p><h3>二次募集の時期</h3><p>福井県は3月の二次募集が重要です。</p><h3>相談窓口</h3><p>坂井市役所こども育成部での相談が推奨されます。</p>",
    publishedAt: "2026-06-01",
    popularity: 38
  },
  {
    slug: "hokatsu-basics-young-mothers",
    citySlug: "obama",
    title: "若い親向けの保活基礎知識【小浜市での安心確認】",
    description: "保活初心者向けの基礎。若狭塗箸で有名な小浜市でのステップバイステップガイド。",
    category: "hokatsu-basics",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1586337108541-7d0f50888acd?w=800&h=400&fit=crop",
    content: "<h2>初めての保活ガイド</h2><p>小浜市での保活が初めての親向けの基本ガイド。</p><h3>ステップ1：情報収集</h3><p>市役所のウェブサイトで情報を集めます。</p><h3>ステップ2：園見学</h3><p>5〜10園の見学を目指します。</p><h3>ステップ3：書類作成</h3><p>就労証明書など必要書類を揃えます。</p>",
    publishedAt: "2026-06-01",
    popularity: 35
  },
  {
    slug: "hokatsu-basics-working-parent",
    citySlug: "ono-fukui",
    title: "共働き家庭の保活ポイント【大野市での実践的なアドバイス】",
    description: "両親が働いている家庭の保活。天空の城がある大野市での時間調整と園選び。",
    category: "hokatsu-basics",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1572365992253-3cb3e56dd362?w=800&h=400&fit=crop",
    content: "<h2>共働きの保活戦略</h2><p>大野市の山間部では、共働きの方が圧倒的多数です。</p><h3>点数優遇</h3><p>共働き世帯は基本点が高く有利です。</p><h3>園の営業時間</h3><p>両親の就労時間に合わせた園選びが重要。延長保育の有無も確認します。</p><h3>祖父母との連携</h3><p>送迎の補助に祖父母を含めた計画を立てます。</p>",
    publishedAt: "2026-06-01",
    popularity: 37
  },
  {
    slug: "hokatsu-basics-single-income",
    citySlug: "hidaka",
    title: "片働き・単発勤務での保活【日高市での加点戦略】",
    description: "片働きや単発勤務での保活ポイント。曼珠沙華で有名な日高市での工夫。",
    category: "hokatsu-basics",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1594521802212-f90ffc8f4f2e?w=800&h=400&fit=crop",
    content: "<h2>片働き世帯の保活</h2><p>日高市では片働き世帯も多く、独自の戦略が必要です。</p><h3>基本点の確認</h3><p>片働き世帯は基本点が低めですが、加点で補えます。</p><h3>加点対象の確認</h3><ul><li>在宅フリーランスは加点対象外？</li><li>親の教育活動は？</li><li>療育手帳保持者は？</li></ul><h3>複数園への申込</h3><p>加点がない場合は10園以上への申込も検討します。</p>",
    publishedAt: "2026-06-01",
    popularity: 38
  }
];

registerArticles(articles);
