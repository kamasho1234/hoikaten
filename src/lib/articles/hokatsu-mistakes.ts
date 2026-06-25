import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-mistakes-address-hekinan",
    citySlug: "hekinan",
    title: "碧南市の保活で多い失敗：申請書住所の間違い",
    description: "碧南市の保活申込で最も多い失敗事例。住所記載ミスで不利になるケースとその対策方法。",
    category: "hokatsu-mistakes",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    content: "<h2>保活申請での住所ミス対策</h2><p>碧南市での保活申込で最も多いのが住所の記載間違いです。</p><h3>よくあるミス</h3><ul><li>番地の誤記入</li><li>新旧住所の混在</li><li>アパート名の省略</li></ul><h3>対策方法</h3><p>住民票と申請書を3回以上照合することで防止できます。</p>",
    publishedAt: "2026-06-01",
    popularity: 48
  },
  {
    slug: "hokatsu-mistakes-documents-shinshiro",
    citySlug: "shinshiro",
    title: "新城市保活：就労証明書の落とし穴",
    description: "新城市の保活申込で失敗しやすい就労証明書。企業印漏れや期限切れに注意。",
    category: "hokatsu-mistakes",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    content: "<h2>新城市での就労証明書の失敗</h2><p>奥三河の新城市では、企業から遠い方が多いため就労証明書の取得が遅れやすいです。</p><h3>よくある失敗</h3><ul><li>企業印がない</li><li>署名者が異なる</li><li>期限が1ヶ月以上前</li></ul><h3>チェックリスト</h3><p>企業に3週間前から依頼を始めることが重要です。</p>",
    publishedAt: "2026-06-01",
    popularity: 46
  },
  {
    slug: "hokatsu-mistakes-deadline-tsushima",
    citySlug: "tsushima",
    title: "津島市の保活：申込期限を過ぎてしまった場合の対応",
    description: "津島市で申込期限を逃した場合。二次募集での対応と追加申込のタイミング。",
    category: "hokatsu-mistakes",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=400&fit=crop",
    content: "<h2>津島市での期限切れ対応</h2><p>待機児童が多い津島市では、期限に1日遅れるだけで大きな影響があります。</p><h3>遅れた場合の対応</h3><p>二次募集で申し込むことはできますが、第一次より内定確率は低下します。</p><h3>今からできることは</h3><p>二次募集開始前に市役所に相談してください。</p>",
    publishedAt: "2026-06-01",
    popularity: 44
  },
  {
    slug: "hokatsu-mistakes-ranking-aisai",
    citySlug: "aisai",
    title: "愛西市保活の失敗：園の優先順位つけの誤り",
    description: "愛西市の保活で希望園の順位をつける際の判断ミス。点数が上がる園の選び方。",
    category: "hokatsu-mistakes",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    content: "<h2>愛西市での園の選び方失敗</h2><p>蓮根産地の愛西市では、多数の保育園があり優先順位の付け方が重要です。</p><h3>よくある誤り</h3><ul><li>知名度だけで選ぶ</li><li>自宅から近いだけで選ぶ</li><li>親の勤務地を考慮しない</li></ul><h3>正しい選び方</h3><p>点数加算の有無を確認してから順位を決めてください。</p>",
    publishedAt: "2026-06-01",
    popularity: 41
  },
  {
    slug: "hokatsu-mistakes-part-time-kiyosu",
    citySlug: "kiyosu",
    title: "清須市保活：パート社員の就職予定申告での失敗",
    description: "清須市の保活でパート勤務者が失敗しやすいポイント。契約書の提出時期が重要。",
    category: "hokatsu-mistakes",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1460925895917-aae19106c1f3?w=800&h=400&fit=crop",
    content: "<h2>清須市パート勤務者の保活失敗例</h2><p>織田信長ゆかりの清須市では、パート勤務者が増加しており失敗事例も増えています。</p><h3>よくある失敗</h3><ul><li>契約開始日が申込日以降</li><li>時間数が基準以下</li><li>契約書が提出できていない</li></ul><h3>対策</h3><p>申込前に必ず契約書を用意してください。</p>",
    publishedAt: "2026-06-01",
    popularity: 39
  },
  {
    slug: "hokatsu-mistakes-health-iwakura",
    citySlug: "iwakura",
    title: "岩倉市保活：健康診断証明書の有効期限ミス",
    description: "岩倉市の保活で子どもの健康診断証明書の期限切れ。入園直前の医師確認の重要性。",
    category: "hokatsu-mistakes",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop",
    content: "<h2>岩倉市の健康診断証明書</h2><p>五条川の桜で有名な岩倉市でも、健康診断書の期限切れは珍しくない失敗です。</p><h3>有効期限の確認</h3><p>通常は3ヶ月以内の診断書が必要です。</p><h3>トラブル回避策</h3><p>申込の2週間前に健診を完了させてください。</p>",
    publishedAt: "2026-06-01",
    popularity: 37
  },
  {
    slug: "hokatsu-mistakes-fukui-system",
    citySlug: "sakai-fukui",
    title: "坂井市保活：福井県と愛知県の制度違いでの失敗",
    description: "坂井市での保活。福井県固有の制度を理解していないことによる失敗事例。",
    category: "hokatsu-mistakes",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1516321318423-f06f70e504b9?w=800&h=400&fit=crop",
    content: "<h2>福井県制度への誤解</h2><p>坂井市は福井県。愛知県からの転入者が制度を勘違いすることが多いです。</p><h3>よくある誤解</h3><ul><li>加点制度が異なる</li><li>優先順位の計算方式が違う</li><li>必要な書類が異なる</li></ul><h3>事前確認</h3><p>福井県庁のウェブサイトで必ず最新情報を確認してください。</p>",
    publishedAt: "2026-06-01",
    popularity: 35
  },
  {
    slug: "hokatsu-mistakes-commute-obama",
    citySlug: "obama",
    title: "小浜市保活：遠距離通勤での優先順位の誤り",
    description: "小浜市での保活。若狭地方は通勤圏が広いため、通勤時間を考慮した園選びが重要。",
    category: "hokatsu-mistakes",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop",
    content: "<h2>小浜市の遠距離通勤対策</h2><p>鯖街道がある小浜市は遠距離通勤者が多い地域です。</p><h3>失敗パターン</h3><p>自宅から遠い園を選んで通園が困難になるケースが多発します。</p><h3>正しい選択</h3><p>勤務地と保育園の位置関係を地図で確認してから申し込みましょう。</p>",
    publishedAt: "2026-06-01",
    popularity: 32
  },
  {
    slug: "hokatsu-mistakes-mountain-ono",
    citySlug: "ono-fukui",
    title: "大野市保活：山間部での冬季通園の考慮漏れ",
    description: "大野市の保活。天空の城を持つ山越前は冬の気象条件が厳しい地域です。",
    category: "hokatsu-mistakes",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=400&fit=crop",
    content: "<h2>大野市での冬季通園対策</h2><p>越前大野城がある山越前では、冬場の気象が非常に厳しいです。</p><h3>よくある失敗</h3><ul><li>冬道の通園ルートを考慮していない</li><li>雪による休園期間の把握不足</li><li>スタッドレスタイヤへの対応遅れ</li></ul><h3>事前準備</h3><p>冬の実地調査を秋までに済ませてください。</p>",
    publishedAt: "2026-06-01",
    popularity: 33
  },
  {
    slug: "hokatsu-mistakes-rush-hidaka",
    citySlug: "hidaka",
    title: "日高市保活：東京への通勤時間との折り合い",
    description: "日高市の保活。埼玉県でありながら東京通勤圏のため、朝の送迎時間が課題。",
    category: "hokatsu-mistakes",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    content: "<h2>日高市での朝の時間帯対策</h2><p>日高市は曼珠沙華で有名ですが、東京への通勤圏で時間が極めてタイトです。</p><h3>失敗パターン</h3><p>朝の保育園送迎と東京通勤の時間帯が重なり、遅刻が増加します。</p><h3>解決策</h3><p>遅延保育の有無を確認し、駅近くの園を優先的に検討してください。</p>",
    publishedAt: "2026-06-01",
    popularity: 36
  }
];

registerArticles(articles);
