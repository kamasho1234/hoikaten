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
    content: "<h2>保活とは</h2><p>保活は保育園への入園活動全般を指す造語です。製造業で働く人が多い碧南市でも、共働きの親の多くが経験します。</p><h3>保活の三段階</h3><ul><li>情報収集：市内の保育園情報の収集</li><li>申込：必要書類の準備と申し込み</li><li>通園：内定後の手続きと通園開始</li></ul><h3>成功のポイント</h3><p>早期からの準備と複数園への申込が鍵です。</p>",
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
    content: "<h2>保育園の3つの種類</h2><p>新城市の奥三河でも、園の種類を理解することは重要です。</p><h3>認可保育園</h3><p>国の基準を満たして都道府県などの認可を受けた施設。申込は市町村を通して行い、利用調整（点数による選考）があります。</p><h3>認可外保育施設</h3><p>認可を受けていない施設。園と直接契約します。開所時間が長い園もあります。</p><h3>小規模保育事業・家庭的保育</h3><p>少人数で運営される地域型保育も増加中です。</p>",
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
    content: "<h2>保活の入園点数とは</h2><p>津島市でも、申込が定員を超えた園では点数で順位を決めます。</p><h3>点数の基本</h3><p>父母それぞれの就労日数・時間などで基本の点数が決まります。満点は自治体で違い、10点、20点、100点などさまざまです。</p><h3>調整の項目としてよくあるもの</h3><ul><li>ひとり親世帯</li><li>兄姉が同じ園に在園</li><li>祖父母と同居していて保育できる（減点になることがある）</li></ul><h3>点数の活用</h3><p>津島市の基準表で自分の世帯の点数を出してから、希望園の順位を考えましょう。</p>",
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
    content: "<h2>保活の必要書類一覧</h2><p>愛西市での申込に必要な書類は市の申込案内に一覧があります。多くの自治体で共通するのは次のものです。</p><h3>基本書類</h3><ul><li>保育施設の利用申込書</li><li>就労証明書（父母それぞれ）</li><li>世帯の状況を示す書類（ひとり親、障害、介護など該当する場合）</li></ul><h3>追加書類</h3><p>就労形態によって異なります。個別相談が推奨されます。</p><h3>準備期間</h3><p>最低3ヶ月前からの準備が理想的です。</p>",
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
    content: "<h2>保育園と幼稚園</h2><p>織田信長ゆかりの清須市でも、両者の選択に悩む親は多いです。</p><h3>保育園</h3><p>児童福祉法にもとづく施設（国ではこども家庭庁の所管）。保育が中心で、0歳から利用可能。</p><h3>幼稚園</h3><p>文部科学省管轄。教育が中心で、3歳以上が対象。</p><h3>選択のポイント</h3><p>両親の就労時間と本人の教育方針で決定します。</p>",
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
    title: "坂井市の保活【東尋坊・丸岡城のあるまち】",
    description: "坂井市で保育園に申し込むときの流れ。転入前の自治体との違いに気をつけたいこと。",
    category: "hokatsu-basics",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=400&fit=crop",
    content: "<h2>坂井市の保活</h2><p>保育の申込と利用調整の基準は市町村ごとに決めています。転入前の自治体のやり方が坂井市でも同じとは限りません。</p><h3>申込の流れ</h3><p>市の様式で申し込み、定員を超えた園は市の基準表で順位を決めます。様式と基準表はどちらも坂井市が公表しているものを使ってください。</p><h3>二次募集</h3><p>一次で決まらなかった枠は二次募集に回ります。時期は年度ごとに市が案内します。</p><h3>相談窓口</h3><p>坂井市の保育の担当課に、自分の世帯がどの行に当たるかを聞くのが確実です。</p>",
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
    content: "<h2>共働きの保活戦略</h2><p>奥越の大野市でも共働きの家庭は多く、選考では就労の日数・時間が点数の中心になります。</p><h3>点数の考え方</h3><p>父母とも就労日数・時間が長いほど基本の点数が高くなります。父母の点数をどう合わせるかは市の基準表で確かめてください。</p><h3>園の営業時間</h3><p>両親の就労時間に合わせた園選びが重要。延長保育の有無も確認します。</p><h3>祖父母との連携</h3><p>送迎の補助に祖父母を含めた計画を立てます。</p>",
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
    content: "<h2>片働き世帯の保活</h2><p>日高市でも、片働きや短時間勤務の世帯が申し込むことはできます。ただし就労以外の理由（求職中、就学、疾病、介護など）に点数が付くかどうかで有利不利が変わります。</p><h3>基本点の確認</h3><p>働いていない側の保護者に「保育を必要とする事由」があるかを市の基準表で確かめてください。事由が無いと申込自体ができない自治体もあります。</p><h3>確かめたい項目</h3><ul><li>在宅の仕事は就労として認められるか</li><li>求職中の扱いと期限</li><li>保護者の障害や疾病の点数</li></ul><h3>希望園の数</h3><p>点数が低めのときは、定員に余裕のある園を含めて希望園を多めに書くのが現実的です。</p>",
    publishedAt: "2026-06-01",
    popularity: 38
  }
];

registerArticles(articles);
