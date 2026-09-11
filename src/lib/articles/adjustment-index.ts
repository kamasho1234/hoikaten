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
    content: "<h2>調整指数とは</h2><p>碧南市の保活では、基本の点数（基本指数）に、世帯の状況に応じた調整指数を足し引きして順位を決めます。</p><h3>調整指数の役割</h3><p>基本指数が同じでも、調整指数の差で順位が変わります。</p><h3>計算方法</h3><p>ひとり親、きょうだいの在園、祖父母の同居など、どの項目が何点かは市が公表する基準表に書かれています。</p><h3>点数より重要</h3><p>基本指数が並びやすい共働き世帯では、調整指数が最終順位を左右することがあります。</p>",
    publishedAt: "2026-06-01",
    popularity: 52
  },
  {
    slug: "adjustment-index-proximity",
    citySlug: "shinshiro",
    title: "調整指数と自宅からの距離【新城市で確かめたいこと】",
    description: "自宅から保育園までの距離は調整指数に入るのか。奥三河・新城市で申し込む前に確かめたいこと。",
    category: "adjustment-index",
    categoryColor: "blue",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    content: "<h2>新城市の距離による調整</h2><p>奥三河の新城市は面積が広く、通園距離が長くなりがちです。距離が選考に関係するのかは、市の基準表で確かめる必要があります。</p><h3>多くの自治体での扱い</h3><p>自宅からの距離そのものを点数にする自治体は多くありません。希望園の順位を決めるときの材料と考えるのが安全です。</p><h3>確かめ方</h3><p>市が公表している利用調整の基準表に、距離や通園時間の項目があるかを見てください。無ければ点数には影響しません。</p><h3>山あいの地域で</h3><p>冬の通園時間は地図上の距離より長くなります。実際に朝の時間帯に走ってみてから希望順を決めると安心です。</p>",
    publishedAt: "2026-06-01",
    popularity: 47
  },
  {
    slug: "adjustment-index-workplace",
    citySlug: "tsushima",
    title: "勤務地と調整指数【津島市で確かめたいこと】",
    description: "両親の勤務地は調整指数に関係するのか。津島市で申し込む前に確かめたいこと。",
    category: "adjustment-index",
    categoryColor: "blue",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=400&fit=crop",
    content: "<h2>津島市の勤務地による調整</h2><p>名古屋方面へ通勤する家庭が多い津島市では、勤務地と園の位置関係が気になります。ただし勤務地そのものを点数にする自治体は少なく、津島市の扱いは市の基準表で確かめてください。</p><h3>点数に関係するのは就労の時間</h3><p>基本指数を決めるのは勤務地ではなく、月の就労日数と1日の就労時間です。就労証明書の時間欄が正しいかを先に確かめましょう。</p><h3>複数の勤務先がある場合</h3><p>就労証明書は勤務先ごとに必要です。合算して評価するかどうかは市に確認してください。</p><h3>勤務地が役に立つ場面</h3><p>点数ではなく、送迎の現実性です。通勤経路の途中にある園を希望順の上位に置くと、内定後の生活が楽になります。</p>",
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
    content: "<h2>愛西市の兄弟姉妹調整</h2><p>蓮根産地の愛西市では、同居のきょうだいが同じ保育所等に在籍しているか、同時に入所申込をしていると調整指数が+1点になります（愛西市利用基準表・令和8年度）。</p><h3>加点は小さいが差はつく</h3><p>+1点は小さく見えますが、基本指数が並ぶ共働き世帯どうしでは、この1点で順位が入れ替わります。</p><h3>複数園への同時申込</h3><p>兄弟で異なる園に申し込んだ場合の調整も複雑です。</p><h3>事前相談</h3><p>複雑な場合は市役所に個別相談することが推奨されます。</p>",
    publishedAt: "2026-06-01",
    popularity: 43
  },
  {
    slug: "adjustment-index-application-order",
    citySlug: "kiyosu",
    title: "申込の早さは点数になるのか【清須市での考え方】",
    description: "申込が早いと有利になるのか。織田信長ゆかりの清須市で、期限までに何を済ませておくか。",
    category: "adjustment-index",
    categoryColor: "blue",
    image: "https://images.unsplash.com/photo-1460925895917-aae19106c1f3?w=800&h=400&fit=crop",
    content: "<h2>申込の早さは点数にならない</h2><p>清洲城がある清須市の入園基準指数表に、申込の早さで加点する項目はありません。期限内に出せば、初日でも最終日でも同じ扱いです。</p><h3>早く動く意味は別にある</h3><p>就労証明書は勤務先に書いてもらうため日数がかかります。早く動く価値は加点ではなく、書類の不備をなくす時間を確保できることにあります。</p><h3>清須市の指数の決まり方</h3><p>基本指数は父母それぞれ算出し、低いほうを世帯の基本指数とします。そこに調整指数を足し引きします。</p><h3>確かめ方</h3><p>市の「保育園等入園基準指数表」で、自分の世帯がどの行に当たるかを見ておきましょう。</p>",
    publishedAt: "2026-06-01",
    popularity: 40
  },
  {
    slug: "adjustment-index-extended-hours",
    citySlug: "iwakura",
    title: "就労時間と入園指数の関係【岩倉市での評価】",
    description: "就労時間の長さが入園指数にどう反映されるか。五条川の桜で有名な岩倉市の基準表から。",
    category: "adjustment-index",
    categoryColor: "blue",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop",
    content: "<h2>岩倉市では就労時間が入園指数を決める</h2><p>五条川沿いの岩倉市の選考基準指数表では、外勤の就労中で1日8時間以上かつ月20日以上が10点、1日6〜8時間かつ月20日以上が9点、1日4〜6時間かつ月20日以上が7点です。延長保育の利用そのものは点数になりません。</p><h3>父母の平均で決まる</h3><p>岩倉市は父母それぞれの指数を足して2で割った値を世帯の基本指数にします。片方の時間が短いと世帯の指数も下がります。</p><h3>書類提出</h3><p>就労証明書の就労時間・日数の欄が指数に直結します。休憩を含むかどうかなど、書き方は市の様式の注意書きに従ってください。</p><h3>延長保育は別に申し込む</h3><p>延長保育の利用は入園が決まったあとの手続きです。必要な人は園ごとの延長時間を先に確かめておきましょう。</p>",
    publishedAt: "2026-06-01",
    popularity: 38
  },
  {
    slug: "adjustment-index-fukui-system",
    citySlug: "sakai-fukui",
    title: "坂井市の調整指数【申し込む前に確かめたいこと】",
    description: "坂井市で入園の優先順位はどう決まるのか。市の基準表で見るべき項目。",
    category: "adjustment-index",
    categoryColor: "blue",
    image: "https://images.unsplash.com/photo-1516321318423-f06f70e504b9?w=800&h=400&fit=crop",
    content: "<h2>坂井市の調整指数</h2><p>利用調整の基準は都道府県ではなく市町村ごとに決めています。坂井市の基準は坂井市が公表する資料で確かめてください。</p><h3>基準表でよく見る項目</h3><ul><li>父母それぞれの就労日数・時間</li><li>ひとり親かどうか</li><li>きょうだいが同じ園に在園しているか</li><li>祖父母と同居しているか</li></ul><h3>父母の点数の合わせ方</h3><p>合算する自治体、低いほうを採る自治体、平均を採る自治体があります。基準表の注記に書かれていることが多いので、ここを先に読みましょう。</p><h3>相談</h3><p>読み取れないときは坂井市の保育の担当課に、自分の世帯がどの行に当たるかを聞くのが確実です。</p>",
    publishedAt: "2026-06-01",
    popularity: 36
  },
  {
    slug: "adjustment-index-maritime-distance",
    citySlug: "obama",
    title: "遠距離通勤と入園の優先順位【小浜市で確かめたいこと】",
    description: "海沿いの小浜市。市外への通勤が長い家庭は選考で何を確かめておくべきか。",
    category: "adjustment-index",
    categoryColor: "blue",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop",
    content: "<h2>小浜市と遠距離通勤</h2><p>若狭塗箸で有名な小浜市は、市外へ通勤する家庭も少なくありません。通勤の長さが点数になるかは市の基準表で確かめてください。多くの自治体では点数にしていません。</p><h3>点数に反映されるのは就労時間</h3><p>通勤時間は就労時間に含めないのが一般的です。就労証明書の時間欄は勤務先の記載どおりになります。</p><h3>希望園の決め方</h3><p>通勤経路の途中にある園、延長保育が長い園を希望順の上位に置くと、内定後の送迎が現実的になります。</p><h3>書類準備</h3><p>勤務地が市外のときは、就労証明書の勤務地欄が正確かを確かめてから提出しましょう。</p>",
    publishedAt: "2026-06-01",
    popularity: 34
  },
  {
    slug: "adjustment-index-mountain-road",
    citySlug: "ono-fukui",
    title: "山間部の通園と入園の優先順位【大野市で確かめたいこと】",
    description: "天空の城がある大野市。奥越の地形で通園ルートをどう考え、選考で何を確かめるか。",
    category: "adjustment-index",
    categoryColor: "blue",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=400&fit=crop",
    content: "<h2>大野市の地形と通園</h2><p>天空の城で知られる奥越の大野市では、地図上の距離と実際の通園時間が大きくずれることがあります。通園距離が点数になるかは市の基準表で確かめてください。</p><h3>選考で見られるのは世帯の状況</h3><p>一般に点数を決めるのは就労の日数・時間、ひとり親かどうか、きょうだいの在園などで、通園ルートは点数になりません。</p><h3>希望順の決め方</h3><p>冬の朝に実際のルートを走ってみてから希望順を決めると、内定後に困りません。</p><h3>相談</h3><p>基準表の読み方がわからないときは、市の保育の担当課に自分の世帯がどの行に当たるかを聞くのが確実です。</p>",
    publishedAt: "2026-06-01",
    popularity: 35
  },
  {
    slug: "adjustment-index-station-proximity",
    citySlug: "hidaka",
    title: "駅からの距離と園選び【日高市で確かめたいこと】",
    description: "埼玉県日高市。駅からの近さは点数になるのか、園選びでどう使うか。",
    category: "adjustment-index",
    categoryColor: "blue",
    image: "https://images.unsplash.com/photo-1594521802212-f90ffc8f4f2e?w=800&h=400&fit=crop",
    content: "<h2>駅からの距離は点数になるのか</h2><p>曼珠沙華で有名な日高市は東京方面への通勤圏です。ただし駅からの近さを点数にする自治体はまれで、日高市の扱いは市の基準表で確かめてください。</p><h3>点数を決めるもの</h3><p>一般に点数を決めるのは就労の日数・時間、ひとり親かどうか、きょうだいの在園などです。</p><h3>駅近を活かすのは希望順</h3><p>JR川越線・八高線や西武線の駅に近い園を希望順の上位に置くと、朝の送迎と通勤がつながります。</p><h3>通勤時間の扱い</h3><p>通勤時間は就労時間に含めないのが一般的です。就労証明書の時間欄は勤務先の記載どおりになります。</p>",
    publishedAt: "2026-06-01",
    popularity: 37
  }
];

registerArticles(articles);
