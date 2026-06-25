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
    content: "<h2>碧南市の働く母親支援</h2><p>碧南市は工業都市で働く母親が多く、支援が充実しています。</p><h3>フルタイム勤務の優遇</h3><p>両親ともフルタイムで64点の高い点数が期待できます。</p><h3>園の営業時間</h3><p>7:30開始、18:30までの延長保育が標準。</p><h3>短時間勤務への対応</h3><p>育児短時間勤務制度を利用しても就労継続として認定されます。</p>",
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
    content: "<h2>新城市での勤務形態変更</h2><p>奥三河の新城市では、パート就職から始める母親も多いです。</p><h3>段階的なキャリア変化</h3><p>パート→正社員への転換は加点対象になる場合があります。</p><h3>申込時の注意</h3><p>勤務形態変更の予定は就労証明書に記載することが重要。</p><h3>内定後の変更</h3><p>内定後に勤務形態が変わった場合は報告義務があります。</p>",
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
    content: "<h2>津島市の育休中申込</h2><p>待機児童が多い津島市では、育休中の早期申込が重要です。</p><h3>申込時期</h3><p>出産予定日の1ヶ月前から申し込み可能です。</p><h3>復職予定日の設定</h3><p>復職予定日を正確に設定することで加点の対象に。</p><h3>育休給付金と就労認定</h3><p>育休中でも収入がある場合は認定されます。</p>",
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
    content: "<h2>愛西市のシフト勤務対応</h2><p>蓮根産地の愛西市は飲食業やサービス業が多く、シフト勤務者が多いです。</p><h3>書類準備</h3><p>シフト勤務の場合、月のシフト表の提出が必須。</p><h3>平均就労時間の計算</h3><p>月120時間以上の平均就労が条件。</p><h3>延長保育の必要性</h3><p>不規則なため、延長保育の利用頻度が高くなります。</p>",
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
    content: "<h2>清須市の病児保育制度</h2><p>清洲城がある清須市では、病児保育が充実しています。</p><h3>病児保育施設</h3><p>市内に3カ所の病児保育室があります。</p><h3>利用条件</h3><ul><li>認可保育園に在園</li><li>医師の診断あり</li><li>仕事の都合</li></ul><h3>予約方法</h3><p>前日までの予約が必要。月額料金で利用可能。</p>",
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
    content: "<h2>岩倉市の転職・転勤対応</h2><p>五条川沿いの岩倉市でも転職や転勤が多い地域です。</p><h3>転職時の対応</h3><p>転職予定でも、契約内定書で就労認定されます。</p><h3>勤務地変更時</h3><p>新しい勤務地を記載した就労証明書の提出。</p><h3>調整指数への影響</h3><p>転勤により自宅から園までの距離が大きく変わる場合は相談が必要。</p>",
    publishedAt: "2026-06-01",
    popularity: 37
  },
  {
    slug: "working-mothers-telecommute",
    citySlug: "sakai-fukui",
    title: "テレワーク・在宅勤務の認定【坂井市でのリモートワーク保活】",
    description: "福井県坂井市。テレワークは保活で認定されるのか。在宅勤務者の注意点。",
    category: "working-mothers",
    categoryColor: "purple",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=400&fit=crop",
    content: "<h2>坂井市のテレワーク認定</h2><p>福井県坂井市でも、テレワークの認定基準は曖昧です。</p><h3>テレワークは認定される？</h3><p>完全テレワークは認定されないことが多いです。</p><h3>条件付き認定</h3><p>月1〜2日の出社がある場合は認定される可能性があります。</p><h3>相談の重要性</h3><p>テレワーク申し込みは市役所に事前相談が必須。</p>",
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
    content: "<h2>大野市の母親支援制度</h2><p>山越前の大野市でも、働く母親のメンタルサポートが進展中。</p><h3>子育て支援ホットライン</h3><p>仕事と育児の悩みを相談できる24時間ホットライン。</p><h3>親の学習教室</h3><p>月2回の子育て講座で、育児と仕事の両立をサポート。</p><h3>経済的支援</h3><p>保育料減免など金銭的サポートも充実。</p>",
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
    content: "<h2>日高市での出産タイミング</h2><p>埼玉県日高市では、出産時期によって保活の難易度が大きく変わります。</p><h3>誕生月による待機児童人数</h3><p>1〜2月生まれは待機児童が多く、11〜12月生まれは少ない傾向。</p><h3>計画的な出産</h3><p>待機児童が少ない月出産の計画も一つの戦略です。</p><h3>復職タイミング</h3><p>出産月により育休期間が変わり、復職タイミングが異なります。</p>",
    publishedAt: "2026-06-01",
    popularity: 36
  }
];

registerArticles(articles);
