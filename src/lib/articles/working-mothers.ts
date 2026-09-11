import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "working-mothers-fulltime",
    citySlug: "hekinan",
    title: "働く母親向け保活ガイド【碧南市でのフルタイム勤務対応】",
    description: "フルタイム勤務の母親が保活で有利な理由。碧南市での共働き支援制度。",
    category: "working-mothers",
    categoryColor: "purple",
    image: "https://images.unsplash.com/photo-1564629238-27cffbabd5f1?w=800&h=400&fit=crop",
    content: "<h2>碧南市の働く母親支援</h2><p>製造業で働く人が多い碧南市でも、共働きの家庭が多く申し込みます。</p><h3>フルタイム勤務の点数</h3><p>父母ともフルタイムなら基本の点数は満点近くになります。満点の数字は市の基準表で確かめてください。</p><h3>園の開所時間</h3><p>開所時間と延長保育の上限は園ごとに違います。市の園一覧で確かめてから希望順を決めましょう。</p><h3>短時間勤務への対応</h3><p>育児短時間勤務制度を利用しても就労継続として認定されます。</p>",
    publishedAt: "2026-06-01",
    popularity: 49
  },
  {
    slug: "working-mothers-parttime",
    citySlug: "shinshiro",
    title: "パートタイム勤務からフルタイムへ【新城市での勤務形態変更時の対応】",
    description: "新城市でのパートからフルタイムへの転換。保活申込中の勤務形態変更の影響。",
    category: "working-mothers",
    categoryColor: "purple",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&h=400&fit=crop",
    content: "<h2>新城市での勤務形態変更</h2><p>奥三河の新城市では、パート就職から始める母親も多いです。</p><h3>段階的なキャリア変化</h3><p>点数は雇用形態ではなく就労の日数・時間で決まります。正社員になって時間が増えれば、その分の行に上がります。</p><h3>申込時の注意</h3><p>勤務形態変更の予定は就労証明書に記載することが重要。</p><h3>内定後の変更</h3><p>内定後に勤務形態が変わった場合は報告義務があります。</p>",
    publishedAt: "2026-06-01",
    popularity: 46
  },
  {
    slug: "working-mothers-maternity",
    citySlug: "tsushima",
    title: "育児休暇中の保活と復職準備【津島市での産後申込】",
    description: "津島市での育児休暇中の保活申込。復職日の設定と書類准備が重要です。",
    category: "working-mothers",
    categoryColor: "purple",
    image: "https://images.unsplash.com/photo-1610647752706-d53f3b16df95?w=800&h=400&fit=crop",
    content: "<h2>津島市の育休中申込</h2><p>津島市でも、育休中に4月入園の申込をする家庭は多いです。</p><h3>申込時期</h3><p>4月入園の一次申込は秋から冬にかけて受け付ける自治体が多いですが、津島市の日程と、生まれる前の子を申し込めるかは市の申込案内で確かめてください。</p><h3>復職予定日の設定</h3><p>育休明けの入園は復職予定日を書いて申し込みます。入園月のうちに復職することが条件になるのが一般的です。</p><h3>育休中の扱い</h3><p>育休中は「就労（育休中）」として扱われ、復職後の勤務条件で点数を見ます。就労証明書に復職予定日と復職後の勤務時間を書いてもらってください。</p>",
    publishedAt: "2026-06-01",
    popularity: 44
  },
  {
    slug: "working-mothers-shift",
    citySlug: "aisai",
    title: "シフト勤務の母親の保活【愛西市での不規則就労対応】",
    description: "蓮根産地の愛西市。飲食店やサービス業など不規則なシフト勤務での保活。",
    category: "working-mothers",
    categoryColor: "purple",
    image: "https://images.unsplash.com/photo-1606159376253-59a8b81ddb00?w=800&h=400&fit=crop",
    content: "<h2>愛西市のシフト勤務対応</h2><p>蓮根産地の愛西市でも、シフト勤務の家庭は就労証明書の書き方に気をつけてください。</p><h3>書類準備</h3><p>就労証明書には月の平均的な就労日数と1日の時間を書いてもらいます。シフト表の添付を求めるかは市の案内で確かめてください。</p><h3>点数の行</h3><p>愛西市の利用基準表では、月20日以上かつ1日8時間以上が10点、月15日以上かつ1日6〜8時間未満が7点、月15日未満かつ1日8時間未満が4点というように、日数と時間の組み合わせで決まります。</p><h3>延長保育の必要性</h3><p>不規則なため、延長保育の利用頻度が高くなります。</p>",
    publishedAt: "2026-06-01",
    popularity: 41
  },
  {
    slug: "working-mothers-nursery-sick",
    citySlug: "kiyosu",
    title: "子どもの病気と仕事の両立【清須市での病児保育活用】",
    description: "織田信長ゆかりの清須市。子どもが病気になった時の母親の仕事との両立支援。",
    category: "working-mothers",
    categoryColor: "purple",
    image: "https://images.unsplash.com/photo-1552521516-97e5c766a6fe?w=800&h=400&fit=crop",
    content: "<h2>清須市の病児保育制度</h2><p>清洲城がある清須市で病児・病後児保育を使えるかは、市のサイトで施設と利用条件を確かめてください。</p><h3>病児保育施設</h3><p>施設の数や場所は市が公表しています。事前登録が要ることが多いので、入園が決まったら早めに登録しておきましょう。</p><h3>利用条件</h3><ul><li>市内在住など、施設が定める条件</li><li>医師の診断あり</li><li>仕事の都合</li></ul><h3>予約方法</h3><p>予約の方法と締切、料金は施設ごとに違います。</p>",
    publishedAt: "2026-06-01",
    popularity: 39
  },
  {
    slug: "working-mothers-transfer",
    citySlug: "iwakura",
    title: "異動・転勤時の保活対応【岩倉市での転職・転勤時の書類】",
    description: "五条川の桜で有名な岩倉市。母親の転職や転勤が決まった場合の保活への影響。",
    category: "working-mothers",
    categoryColor: "purple",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=400&fit=crop",
    content: "<h2>岩倉市の転職・転勤対応</h2><p>五条川沿いの岩倉市でも、申込後に勤務先や勤務地が変わることはあります。</p><h3>転職時の対応</h3><p>岩倉市の選考基準指数表では「就労予定」は「就労中」より1点低く扱われます（例：1日8時間以上かつ月20日以上で就労中10点、就労予定9点）。内定通知書などで予定を示します。</p><h3>勤務地変更時</h3><p>新しい勤務地を記載した就労証明書の提出。</p><h3>調整指数への影響</h3><p>勤務地の変更そのものは点数に影響しません。送迎が続けられるかで希望園を見直してください。</p>",
    publishedAt: "2026-06-01",
    popularity: 37
  },
  {
    slug: "working-mothers-telecommute",
    citySlug: "sakai-fukui",
    title: "テレワーク・在宅勤務の認定【坂井市でのリモートワーク保活】",
    description: "福井県坂井市。在宅勤務は就労として扱われるのか。就労証明書で気をつけたいこと。",
    category: "working-mothers",
    categoryColor: "purple",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=400&fit=crop",
    content: "<h2>坂井市のテレワーク認定</h2><p>福井県坂井市でも、雇用されて在宅で働く場合は就労として扱われるのが一般的です。居宅内の労働も就労の事由に含まれます。</p><h3>点数は同じか</h3><p>自治体によっては居宅内労働を居宅外より低い点数にしている基準表があります。坂井市の扱いは市の基準表で確かめてください。</p><h3>就労証明書の書き方</h3><p>勤務先に在宅勤務であることと就労時間を書いてもらいます。フリーランスの場合は開業届や請負契約などで示します。</p><h3>相談の重要性</h3><p>テレワーク申し込みは市役所に事前相談が必須。</p>",
    publishedAt: "2026-06-01",
    popularity: 35
  },
  {
    slug: "working-mothers-career",
    citySlug: "obama",
    title: "キャリアと育児の両立戦略【小浜市での長期的なキャリアプラン】",
    description: "若狭塗箸で有名な小浜市。保活を通じた母親のキャリア継続戦略。",
    category: "working-mothers",
    categoryColor: "purple",
    image: "https://images.unsplash.com/photo-1586337108541-7d0f50888acd?w=800&h=400&fit=crop",
    content: "<h2>小浜市でのキャリア継続戦略</h2><p>鯖街道がある小浜市でも、母親のキャリア継続は課題です。</p><h3>保活の長期計画</h3><p>保育園在園の3〜5年が、キャリアの重要な時期。</p><h3>昇進と保育園</h3><p>昇進に伴う転勤も保育園申込中に起こります。</p><h3>相談窓口</h3><p>会社と保育園の両方に早期相談が重要です。</p>",
    publishedAt: "2026-06-01",
    popularity: 33
  },
  {
    slug: "working-mothers-support",
    citySlug: "ono-fukui",
    title: "働く母親への心理的サポート【大野市での子育て支援体制】",
    description: "天空の城がある大野市。働く母親の心理的負担に対する福祉的支援。",
    category: "working-mothers",
    categoryColor: "purple",
    image: "https://images.unsplash.com/photo-1572365992253-3cb3e56dd362?w=800&h=400&fit=crop",
    content: "<h2>大野市の母親支援制度</h2><p>奥越の大野市で使える相談先や支援は、市のサイトで確かめてください。ここでは多くの自治体にある窓口を挙げます。</p><h3>子育ての相談窓口</h3><p>市の子育て世代包括支援センターや保健センターで、育児の悩みを相談できます。</p><h3>子育て支援センター</h3><p>親子で集まれる場や講座を開いている自治体が多いです。</p><h3>経済的支援</h3><p>保育料の軽減や医療費助成の内容は自治体で違います。市の案内で確かめてください。</p>",
    publishedAt: "2026-06-01",
    popularity: 34
  },
  {
    slug: "working-mothers-timing",
    citySlug: "hidaka",
    title: "働く母親の出産タイミング【日高市での計画的な子育て】",
    description: "曼珠沙華で有名な日高市。出産のタイミングが保活に大きく影響する仕組み。",
    category: "working-mothers",
    categoryColor: "purple",
    image: "https://images.unsplash.com/photo-1594521802212-f90ffc8f4f2e?w=800&h=400&fit=crop",
    content: "<h2>日高市での出産タイミング</h2><p>埼玉県日高市に限らず、生まれた月によって申し込める入園月と年齢クラスが変わります。</p><h3>生まれ月と申込</h3><p>4月入園の申込は秋から冬なので、その後に生まれた子は0歳4月入園の申込に間に合わないことがあります。生まれる前の子を申し込めるかは市の案内で確かめてください。</p><h3>計画的な出産</h3><p>待機児童が少ない月出産の計画も一つの戦略です。</p><h3>復職タイミング</h3><p>出産月により育休期間が変わり、復職タイミングが異なります。</p>",
    publishedAt: "2026-06-01",
    popularity: 36
  }
];

registerArticles(articles);
