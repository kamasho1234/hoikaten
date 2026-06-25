import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "single-parent-advantages",
    citySlug: "hekinan",
    title: "ひとり親家庭の保活有利性【碧南市での加点と優遇内容】",
    description: "ひとり親家庭は保活で圧倒的に有利。碧南市での加点内容と優遇制度の詳細。",
    category: "single-parent",
    categoryColor: "purple",
    image: "https://images.unsplash.com/photo-1564629238-27cffbabd5f1?w=800&h=400&fit=crop",
    content: "<h2>碧南市のひとり親優遇</h2><p>碧南市ではひとり親家庭に対して優遇制度が充実しています。</p><h3>点数加点</h3><p>ひとり親世帯は8点の基本加点があります。</p><h3>その他の加点</h3><ul><li>児童扶養手当受給で2点</li><li>生活保護受給で3点</li></ul><h3>入園の容易性</h3><p>同じ点数の世帯より調整指数で優遇されることも多いです。</p>",
    publishedAt: "2026-06-01",
    popularity: 50
  },
  {
    slug: "single-parent-documents",
    citySlug: "shinshiro",
    title: "ひとり親が用意すべき書類【新城市での必須書類チェック】",
    description: "新城市でのひとり親申込に必要な書類。児童扶養手当受給証など提出順序も重要。",
    category: "single-parent",
    categoryColor: "purple",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&h=400&fit=crop",
    content: "<h2>新城市のひとり親書類</h2><p>奥三河の新城市でのひとり親申込には特定の書類が必須です。</p><h3>必須書類</h3><ul><li>児童扶養手当受給証（最重要）</li><li>養育者認定書</li><li>離婚成立証明書</li><li>親権者証明</li></ul><h3>提出タイミング</h3><p>申込時に全て揃っていることが重要。</p><h3>取得期間</h3><p>市役所で手続きに1週間程度必要です。</p>",
    publishedAt: "2026-06-01",
    popularity: 46
  },
  {
    slug: "single-parent-custody",
    citySlug: "tsushima",
    title: "親権・養育権の確認【津島市での法的書類準備】",
    description: "津島市でのひとり親申込時の親権確認。戸籍抄本などの法的証拠が必要です。",
    category: "single-parent",
    categoryColor: "purple",
    image: "https://images.unsplash.com/photo-1610647752706-d53f3b16df95?w=800&h=400&fit=crop",
    content: "<h2>津島市での親権確認</h2><p>待機児童が多い津島市では、親権の正式確認が厳格です。</p><h3>必要書類</h3><ul><li>戸籍謄本（親権者表記）</li><li>離婚届受理証明書</li><li>家庭裁判所の判決文</li></ul><h3>虚偽申告の厳格化</h3><p>親権のない者が申し込むと不利になります。</p><h3>相談</h3><p>事前に津島市役所で親権確認の相談をしてください。</p>",
    publishedAt: "2026-06-01",
    popularity: 44
  },
  {
    slug: "single-parent-income",
    citySlug: "aisai",
    title: "ひとり親の収入基準と認定【愛西市での所得判定】",
    description: "蓮根産地の愛西市。ひとり親の収入がどの程度あるかで保活が変わります。",
    category: "single-parent",
    categoryColor: "purple",
    image: "https://images.unsplash.com/photo-1606159376253-59a8b81ddb00?w=800&h=400&fit=crop",
    content: "<h2>愛西市のひとり親所得基準</h2><p>蓮根産地の愛西市では、ひとり親の所得で認定が変わります。</p><h3>加点対象所得</h3><p>年収360万円以下が児童扶養手当の受給対象。</p><h3>所得証明</h3><ul><li>所得証明書</li><li>課税証明書</li><li>源泉徴収票</li></ul><h3>加点の恩恵</h3><p>低所得ほど加点が大きくなります。</p>",
    publishedAt: "2026-06-01",
    popularity: 42
  },
  {
    slug: "single-parent-childcare",
    citySlug: "kiyosu",
    title: "ひとり親の保育時間の扱い【清須市での勤務時間カウント】",
    description: "織田信長ゆかりの清須市。ひとり親の就労時間が他世帯より厳しく見られることもあります。",
    category: "single-parent",
    categoryColor: "purple",
    image: "https://images.unsplash.com/photo-1552521516-97e5c766a6fe?w=800&h=400&fit=crop",
    content: "<h2>清須市のひとり親就労評価</h2><p>清洲城がある清須市では、ひとり親の就労状況を慎重に評価します。</p><h3>就労認定基準</h3><p>月120時間以上の就労が保育の必要性の条件。</p><h3>不規則就労の場合</h3><p>飲食店やアルバイトなど不規則就労でも認定されます。</p><h3>書類準備</h3><p>就労証明書に時間数の詳細記載が不可欠です。</p>",
    publishedAt: "2026-06-01",
    popularity: 40
  },
  {
    slug: "single-parent-support-network",
    citySlug: "iwakura",
    title: "ひとり親の祖父母サポート活用【岩倉市での支援ネットワーク】",
    description: "五条川の桜で有名な岩倉市。ひとり親の保活を支援する祖父母サポート制度。",
    category: "single-parent",
    categoryColor: "purple",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=400&fit=crop",
    content: "<h2>岩倉市のひとり親支援サポート</h2><p>五条川沿いの岩倉市では、ひとり親の支援制度が充実しています。</p><h3>祖父母サポート</h3><p>祖父母が週2日以上のサポートをすると加点の対象に。</p><h3>ファミサポ活用</h3><p>ファミリーサポートセンターの利用で保育補助が可能。</p><h3>相談窓口</h3><p>岩倉市福祉課でひとり親向け相談を月2回開催。</p>",
    publishedAt: "2026-06-01",
    popularity: 38
  },
  {
    slug: "single-parent-fukui",
    citySlug: "sakai-fukui",
    title: "福井県のひとり親優遇制度【坂井市での充実した支援】",
    description: "福井県坂井市。福井県はひとり親に対して充実した支援制度があります。",
    category: "single-parent",
    categoryColor: "purple",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=400&fit=crop",
    content: "<h2>福井県のひとり親支援</h2><p>坂井市がある福井県は全国的にもひとり親支援が充実しています。</p><h3>保活での優遇</h3><p>福井県全体で統一したひとり親加点制度があります。</p><h3>その他の支援</h3><ul><li>保育料減免</li><li>医療費助成</li><li>教育支援</li></ul><h3>福井県の優位性</h3><p>ひとり親には愛知県より福井県が有利な場合が多いです。</p>",
    publishedAt: "2026-06-01",
    popularity: 36
  },
  {
    slug: "single-parent-alibi",
    citySlug: "obama",
    title: "ひとり親申告時の注意点【小浜市での虚偽申告厳禁】",
    description: "若狭塗箸で有名な小浜市。ひとり親申告の虚偽申告は重大なトラブルに。",
    category: "single-parent",
    categoryColor: "purple",
    image: "https://images.unsplash.com/photo-1586337108541-7d0f50888acd?w=800&h=400&fit=crop",
    content: "<h2>小浜市での虚偽申告リスク</h2><p>鯖街道がある小浜市での申告は厳格に審査されます。</p><h3>虚偽申告のリスク</h3><ul><li>内定取り消し</li><li>罰金・違約金</li><li>次年度申込拒否</li></ul><h3>事実確認方法</h3><p>戸籍や家庭裁判所に直接照会がされます。</p><h3>正直な申告</h3><p>不明な点があれば市役所に相談してください。</p>",
    publishedAt: "2026-06-01",
    popularity: 34
  },
  {
    slug: "single-parent-second-marriage",
    citySlug: "ono-fukui",
    title: "再婚時のひとり親申告終了【大野市での手続き変更】",
    description: "天空の城がある大野市。再婚する場合のひとり親申告の終了手続きと新たな申告。",
    category: "single-parent",
    categoryColor: "purple",
    image: "https://images.unsplash.com/photo-1572365992253-3cb3e56dd362?w=800&h=400&fit=crop",
    content: "<h2>大野市での再婚と手続き</h2><p>山越前の大野市でも、再婚時のひとり親認定は終了します。</p><h3>手続きのタイミング</h3><p>再婚届提出と同時に、保育園にも報告が必要です。</p><h3>保育料への影響</h3><p>世帯収入で再計算されます。増額になることがほとんどです。</p><h3>入園への影響</h3><p>既に入園済みなら、再婚後も在園は継続。新規申込は不利になります。</p>",
    publishedAt: "2026-06-01",
    popularity: 35
  },
  {
    slug: "single-parent-emergency",
    citySlug: "hidaka",
    title: "ひとり親緊急支援制度【日高市での一時保育・応援】",
    description: "曼珠沙華で有名な日高市。ひとり親向けの緊急支援制度と一時保育の活用。",
    category: "single-parent",
    categoryColor: "purple",
    image: "https://images.unsplash.com/photo-1594521802212-f90ffc8f4f2e?w=800&h=400&fit=crop",
    content: "<h2>日高市のひとり親緊急支援</h2><p>埼玉県日高市は、ひとり親向けの緊急支援が充実しています。</p><h3>緊急一時保育</h3><p>病気や事故で急に保育が必要になった場合、一時保育で対応。</p><h3>料金減免</h3><p>ひとり親の場合、一時保育料が50%減免されます。</p><h3>相談窓口</h3><p>日高市福祉事務所での24時間相談体制。</p>",
    publishedAt: "2026-06-01",
    popularity: 37
  }
];

registerArticles(articles);
