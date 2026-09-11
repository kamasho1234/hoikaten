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
    content: "<h2>保活申請での住所ミス対策</h2><p>碧南市に限らず、申込書の不備で多いのが住所の記載間違いです。</p><h3>よくあるミス</h3><ul><li>番地の誤記入</li><li>新旧住所の混在</li><li>アパート名の省略</li></ul><h3>対策方法</h3><p>提出前に住民票と申込書を突き合わせるだけで防げます。</p>",
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
    content: "<h2>新城市での就労証明書の失敗</h2><p>奥三河の新城市は市外へ通勤する人も多く、勤務先とのやり取りに日数がかかると就労証明書の取得が遅れがちです。</p><h3>よくある失敗</h3><ul><li>企業印がない</li><li>署名者が異なる</li><li>発行日が古く、市が指定する期間を過ぎている</li></ul><h3>チェックリスト</h3><p>勤務先には早めに依頼し、受け取ったら企業印と記入者名をその場で確かめてください。</p>",
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
    content: "<h2>津島市での期限切れ対応</h2><p>津島市に限らず、一次の期限を1日でも過ぎると一次の選考には入れません。</p><h3>遅れた場合の対応</h3><p>二次募集で申し込むことはできますが、第一次より内定確率は低下します。</p><h3>今からできることは</h3><p>二次募集開始前に市役所に相談してください。</p>",
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
    content: "<h2>愛西市での園の選び方失敗</h2><p>蓮根産地の愛西市でも、希望園の順位の付け方で結果が変わります。</p><h3>よくある誤り</h3><ul><li>知名度だけで選ぶ</li><li>自宅から近いだけで選ぶ</li><li>親の勤務地を考慮しない</li></ul><h3>正しい選び方</h3><p>愛西市では同居のきょうだいが在籍・申込中の園に+1点が付きます。きょうだいがいる園は上位に置き、そのうえで送迎の現実性で順位を決めてください。</p>",
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
    content: "<h2>清須市パート勤務者の保活失敗例</h2><p>織田信長ゆかりの清須市でも、パート勤務の申込で起きやすい不備があります。</p><h3>よくある失敗</h3><ul><li>契約開始日が申込日以降</li><li>就労時間が市の下限（清須市の基準指数表では月60時間以上）に届かない</li><li>契約書が提出できていない</li></ul><h3>対策</h3><p>申込前に必ず契約書を用意してください。</p>",
    publishedAt: "2026-06-01",
    popularity: 39
  },
  {
    slug: "hokatsu-mistakes-health-iwakura",
    citySlug: "iwakura",
    title: "岩倉市保活：確定申告書の写しを出し忘れる",
    description: "岩倉市の保活で自営業の世帯が落としやすい書類。出せないと調整点数が-1点になります。",
    category: "hokatsu-mistakes",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop",
    content: "<h2>岩倉市の確定申告書の写し</h2><p>五条川の桜で有名な岩倉市の選考基準指数表では、自営業等で合理的な理由なく前年の確定申告書の写しを提出できないと調整点数が-1点になります。</p><h3>起きやすい失敗</h3><p>開業したばかりで申告がまだ、控えを保管していない、といった理由で出せないことがあります。</p><h3>回避策</h3><p>申告の控えは手元に残しておきましょう。無い場合は税務署で開示を受けるか、市に事情を先に伝えてください。</p>",
    publishedAt: "2026-06-01",
    popularity: 37
  },
  {
    slug: "hokatsu-mistakes-fukui-system",
    citySlug: "sakai-fukui",
    title: "坂井市保活：転入前の自治体と同じつもりで申し込む失敗",
    description: "坂井市での保活。前に住んでいた自治体のやり方を持ち込んで起きる失敗。",
    category: "hokatsu-mistakes",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1516321318423-f06f70e504b9?w=800&h=400&fit=crop",
    content: "<h2>自治体ごとに基準は違う</h2><p>利用調整の基準は市町村ごとに決めています。転入前の自治体で有利だった項目が坂井市にもあるとは限りません。</p><h3>よくある誤解</h3><ul><li>加点制度が異なる</li><li>優先順位の計算方式が違う</li><li>必要な書類が異なる</li></ul><h3>事前確認</h3><p>坂井市が公表している申込案内と基準表で必ず確かめてください。</p>",
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
    content: "<h2>小浜市の遠距離通勤対策</h2><p>鯖街道がある小浜市では、市外へ通勤する家庭もあります。</p><h3>失敗パターン</h3><p>通勤経路と反対方向の園を希望して、内定後に送迎が続かなくなることがあります。</p><h3>正しい選択</h3><p>勤務地と保育園の位置関係を地図で確認してから申し込みましょう。</p>",
    publishedAt: "2026-06-01",
    popularity: 32
  },
  {
    slug: "hokatsu-mistakes-mountain-ono",
    citySlug: "ono-fukui",
    title: "大野市保活：山間部での冬季通園の考慮漏れ",
    description: "大野市の保活。天空の城で知られる奥越は冬の気象条件が厳しい地域です。",
    category: "hokatsu-mistakes",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=400&fit=crop",
    content: "<h2>大野市での冬季通園対策</h2><p>越前大野城がある奥越では、冬場の積雪で通園に時間がかかります。</p><h3>よくある失敗</h3><ul><li>冬道の通園ルートを考慮していない</li><li>大雪のときの園の対応（開所時間の変更など）を聞いていない</li><li>スタッドレスタイヤへの対応遅れ</li></ul><h3>事前準備</h3><p>冬の実地調査を秋までに済ませてください。</p>",
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
    content: "<h2>日高市での朝の時間帯対策</h2><p>日高市は曼珠沙華で有名ですが、東京方面へ通勤する家庭では朝の時間に余裕がありません。</p><h3>失敗パターン</h3><p>朝の保育園送迎と東京通勤の時間帯が重なり、遅刻が増加します。</p><h3>解決策</h3><p>園の開所時間と延長保育の有無を確かめ、通勤経路の途中にある園を上位に置いてください。</p>",
    publishedAt: "2026-06-01",
    popularity: 36
  }
];

registerArticles(articles);
