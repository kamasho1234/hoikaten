import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "adjustment-index-definition",
    citySlug: "hekinan",
    title: "調整指数とは？保活での本当の順位を理解する【碧南市編】",
    description: "保活での調整指数の定義。点数以上に重要な調整指数の仕組みを碧南市の例で解説。",
    category: "adjustment-index",
    categoryColor: "blue",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    content: "<h2>調整指数とは</h2><p>碧南市の保活では、同じ点数の家庭を区別するために調整指数を使用します。</p><h3>調整指数の役割</h3><p>点数は同じでも調整指数により順位が決まります。</p><h3>計算方法</h3><p>住所・勤務地・通園ルート・申込順序など複数の要因で計算されます。</p><h3>点数より重要</h3><p>実は調整指数が最終順位を左右することが多いです。</p>",
    publishedAt: "2026-06-01",
    popularity: 52
  },
  {
    slug: "adjustment-index-proximity",
    citySlug: "shinshiro",
    title: "調整指数と自宅からの距離【新城市での距離による優遇】",
    description: "自宅から保育園までの距離が調整指数に与える影響。奥三河新城市での計算方法。",
    category: "adjustment-index",
    categoryColor: "blue",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    content: "<h2>新城市の距離による調整</h2><p>奥三河の新城市では、通園距離が調整指数に影響します。</p><h3>距離優遇の仕組み</h3><p>自宅から保育園が近いほど調整指数が高くなります。</p><h3>計算基準</h3><p>通常は直線距離で1km以内が優遇の対象。</p><h3>複雑な地形への対応</h3><p>山越前の複雑な地形では実際の通園時間も考慮されます。</p>",
    publishedAt: "2026-06-01",
    popularity: 47
  },
  {
    slug: "adjustment-index-workplace",
    citySlug: "tsushima",
    title: "勤務地による調整指数の変動【津島市での計算】",
    description: "両親の勤務地が調整指数に与える影響。津島市での複数勤務地の取扱い。",
    category: "adjustment-index",
    categoryColor: "blue",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=400&fit=crop",
    content: "<h2>津島市の勤務地による調整</h2><p>待機児童が多い津島市では、勤務地も調整指数に含まれます。</p><h3>優遇される勤務地</h3><p>津島市内の勤務地が最優遇。次に愛知県内となります。</p><h3>複数勤務地の場合</h3><p>最も時間が長い勤務地で評価されます。</p><h3>届出の重要性</h3><p>勤務地の詳細な届出が調整指数に直結します。</p>",
    publishedAt: "2026-06-01",
    popularity: 45
  },
  {
    slug: "adjustment-index-sibling-priority",
    citySlug: "aisai",
    title: "兄弟姉妹の園在籍による調整指数加点【愛西市での処遇】",
    description: "上の子が同じ園に在籍している場合の調整指数。蓮根産地愛西市での家族優遇。",
    category: "adjustment-index",
    categoryColor: "blue",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    content: "<h2>愛西市の兄弟姉妹調整</h2><p>蓮根産地の愛西市では、兄弟姉妹の在籍が調整指数に加点されます。</p><h3>加点ポイント</h3><p>上の子が在籍していると調整指数が5〜10加点される場合があります。</p><h3>複数園への同時申込</h3><p>兄弟で異なる園に申し込んだ場合の調整も複雑です。</p><h3>事前相談</h3><p>複雑な場合は市役所に個別相談することが推奨されます。</p>",
    publishedAt: "2026-06-01",
    popularity: 43
  },
  {
    slug: "adjustment-index-application-order",
    citySlug: "kiyosu",
    title: "申込順序による調整指数【清須市での先着優遇制度】",
    description: "申込が早い家庭の調整指数優遇。織田信長ゆかりの清須市での順序制度。",
    category: "adjustment-index",
    categoryColor: "blue",
    image: "https://images.unsplash.com/photo-1460925895917-aae19106c1f3?w=800&h=400&fit=crop",
    content: "<h2>清須市の申込順序制度</h2><p>清洲城がある清須市では、早期申込が調整指数に反映されます。</p><h3>優遇の度合い</h3><p>申込期限の1ヶ月前までに申し込むと調整指数が加点される仕組み。</p><h3>加点額</h3><p>早期申込で通常2〜3点の加点。</p><h3>戦略的申込</h3><p>11月初旬の申込を目指すことで調整指数を確保できます。</p>",
    publishedAt: "2026-06-01",
    popularity: 40
  },
  {
    slug: "adjustment-index-extended-hours",
    citySlug: "iwakura",
    title: "延長保育の利用状況による調整指数【岩倉市での評価】",
    description: "長時間の延長保育が必要な世帯の調整指数。五条川の桜で有名な岩倉市での優遇。",
    category: "adjustment-index",
    categoryColor: "blue",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop",
    content: "<h2>岩倉市の延長保育調整</h2><p>五条川沿いの岩倉市では、延長保育の必要性が調整指数に反映されます。</p><h3>評価基準</h3><p>1日の就労時間が8時間以上の世帯は調整指数が高くなります。</p><h3>書類提出</h3><p>就労証明書に勤務時間の詳細記載が重要です。</p><h3>加点効果</h3><p>延長保育が必須の世帯は3〜5点の加点が見込めます。</p>",
    publishedAt: "2026-06-01",
    popularity: 38
  },
  {
    slug: "adjustment-index-fukui-system",
    citySlug: "sakai-fukui",
    title: "福井県の調整指数制度【坂井市での複雑な計算】",
    description: "福井県特有の調整指数の計算方法。愛知県とは異なる坂井市での優先順位決定方式。",
    category: "adjustment-index",
    categoryColor: "blue",
    image: "https://images.unsplash.com/photo-1516321318423-f06f70e504b9?w=800&h=400&fit=crop",
    content: "<h2>福井県坂井市の調整指数</h2><p>坂井市は福井県のため、県独自の調整指数システムを使用します。</p><h3>計算要素</h3><ul><li>自宅から園までの距離</li><li>勤務地</li><li>兄弟姉妹の在籍状況</li><li>申込日順</li></ul><h3>複雑性</h3><p>福井県の調整指数は愛知県より複雑な場合があります。</p><h3>相談</h3><p>坂井市役所の保育課への個別相談が必須です。</p>",
    publishedAt: "2026-06-01",
    popularity: 36
  },
  {
    slug: "adjustment-index-maritime-distance",
    citySlug: "obama",
    title: "遠距離地域での調整指数特例【小浜市での距離優遇】",
    description: "海沿いの小浜市。遠距離でも調整指数が優遇される制度と計算方法。",
    category: "adjustment-index",
    categoryColor: "blue",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop",
    content: "<h2>小浜市の遠距離優遇制度</h2><p>若狭塗箸で有名な小浜市は遠距離通勤が多いため、特別な調整指数制度があります。</p><h3>優遇制度</h3><p>市外の勤務地でも通勤時間が長い場合は加点対象。</p><h3>計算方法</h3><p>自宅から勤務地経由で保育園までの距離で評価。</p><h3>書類準備</h3><p>通勤ルートの地図添付が有効です。</p>",
    publishedAt: "2026-06-01",
    popularity: 34
  },
  {
    slug: "adjustment-index-mountain-road",
    citySlug: "ono-fukui",
    title: "山間部での調整指数計算【大野市での複雑な地理対応】",
    description: "天空の城がある大野市。山越前の複雑な地形での調整指数計算の工夫。",
    category: "adjustment-index",
    categoryColor: "blue",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=400&fit=crop",
    content: "<h2>大野市の山越前地形対応</h2><p>天空の城で有名な山越前の大野市では、調整指数も地形に配慮されます。</p><h3>特殊性</h3><p>直線距離では計算できない山越えルートが多い。</p><h3>対応方法</h3><p>市役所が認識している主要な通園ルートで調整指数が決定。</p><h3>相談ポイント</h3><p>事前にルート確認をして市役所と協議することが重要です。</p>",
    publishedAt: "2026-06-01",
    popularity: 35
  },
  {
    slug: "adjustment-index-station-proximity",
    citySlug: "hidaka",
    title: "駅からの距離による調整指数【日高市での都市型調整】",
    description: "埼玉県日高市。駅からの近さが調整指数に影響する都市型システム。",
    category: "adjustment-index",
    categoryColor: "blue",
    image: "https://images.unsplash.com/photo-1594521802212-f90ffc8f4f2e?w=800&h=400&fit=crop",
    content: "<h2>日高市の駅近優遇</h2><p>曼珠沙華で有名な日高市は東京への通勤圏。駅からの近さが調整指数に影響します。</p><h3>優遇基準</h3><p>駅から徒歩圏内（約800m以内）が優遇対象。</p><h3>駅の指定</h3><p>JR成田線の駅が基準になることが多いです。</p><h3>通勤への配慮</h3><p>東京への通勤時間も調整指数に反映される場合があります。</p>",
    publishedAt: "2026-06-01",
    popularity: 37
  }
];

registerArticles(articles);
