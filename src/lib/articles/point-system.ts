import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "point-system-calculation",
    citySlug: "hekinan",
    title: "保育園入園の点数計算方法【碧南市で基準表を読む】",
    description: "碧南市の点数はどう決まるのか。市の基準表を読むときの順番。",
    category: "point-system",
    categoryColor: "blue",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    content: "<h2>碧南市の点数の決まり方</h2><p>点数の満点や刻みは自治体ごとに違います。碧南市の数字はここには書かず、市が公表する利用調整の基準表で確かめてください。</p><h3>基準表を読む順番</h3><ul><li>父母それぞれの「保育を必要とする事由」と、就労なら日数・時間の行</li><li>父母の点数の合わせ方（合算か、低いほうか、平均か）</li><li>調整の項目（ひとり親、きょうだい、祖父母の同居など）</li></ul><h3>加点と減点</h3><p>調整の項目には加点だけでなく減点もあります。該当するものをすべて拾ってください。</p><h3>同点のとき</h3><p>同じ点数が並んだときの優先順位も基準表に書かれていることが多いです。抽選かどうかも含めて確かめましょう。</p>",
    publishedAt: "2026-06-01",
    popularity: 53
  },
  {
    slug: "point-system-both-parents",
    citySlug: "shinshiro",
    title: "両親共働きの点数合算方法【新城市のルール】",
    description: "新城市での両親の点数の合算。それぞれのポイントが組み合わさる仕組み。",
    category: "point-system",
    categoryColor: "blue",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    content: "<h2>新城市の合算ルール</h2><p>父母の点数の合わせ方は自治体で違い、合算する市、低いほうを採る市、平均を採る市があります。奥三河の新城市がどれかは市の基準表の注記で確かめてください。</p><h3>合算する市の場合</h3><p>父の点数と母の点数を足したものが世帯の基本の点数になります。</p><h3>満点の目安</h3><p>満点は自治体で違います。新城市の1人分の満点と世帯の上限は市の基準表で確かめてください。</p><h3>一方が無職の場合</h3><p>働いていない側に求職中・就学・疾病などの事由が無いと、その分の点数は付きません。</p>",
    publishedAt: "2026-06-01",
    popularity: 48
  },
  {
    slug: "point-system-single-parent",
    citySlug: "tsushima",
    title: "ひとり親家庭の加点制度【津島市での優遇内容】",
    description: "ひとり親家庭の保活有利性。津島市でのひとり親加点の詳細。",
    category: "point-system",
    categoryColor: "blue",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=400&fit=crop",
    content: "<h2>津島市のひとり親加点</h2><p>ひとり親世帯を調整指数で加点する自治体は多く、津島市の扱いと点数は市の基準表で確かめてください。</p><h3>加点の大きさ</h3><p>自治体によって数点のところから、就労の満点に近い大きさのところまで幅があります。</p><h3>手続き</h3><p>児童扶養手当受給証など、証明書類の提出が必要です。</p><h3>点数の有効性</h3><p>ひとり親の加点は基本指数が並ぶ場面で効きます。希望園は上限まで書いておきましょう。</p>",
    publishedAt: "2026-06-01",
    popularity: 46
  },
  {
    slug: "point-system-grandparent",
    citySlug: "aisai",
    title: "祖父母同居の減点を回避【愛西市での工夫】",
    description: "愛西市で祖父母と同居している場合の減点。その仕組みと回避方法。",
    category: "point-system",
    categoryColor: "blue",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    content: "<h2>愛西市の祖父母同居減点</h2><p>蓮根産地の愛西市では、同居の祖父母（65歳未満）が自宅で保育できる場合、調整指数が-2点になります（愛西市利用基準表・令和8年度）。</p><h3>減点の理由</h3><p>祖父母がいると保育の必要性が低いと判定されるためです。</p><h3>減点額</h3><p>-2点です。65歳以上の祖父母や、就労・疾病などで保育できない祖父母は対象になりません。</p><h3>回避方法</h3><p>祖父母が働いている、通院しているなど保育できない事情があるときは、それを示す書類を添えて申告します。</p>",
    publishedAt: "2026-06-01",
    popularity: 44
  },
  {
    slug: "point-system-newborn",
    citySlug: "kiyosu",
    title: "出産前後の保育と点数【清須市での扱い】",
    description: "出産の前後で上の子の保育が必要なときの点数。織田信長ゆかりの清須市の基準指数表から。",
    category: "point-system",
    categoryColor: "blue",
    image: "https://images.unsplash.com/photo-1460925895917-aae19106c1f3?w=800&h=400&fit=crop",
    content: "<h2>清須市の出産の点数</h2><p>清須市の入園基準指数表では、出産の前後で保育が必要な場合（産前3か月の月初から産後2か月の月末まで）の基本指数は16点です。新生児だから加点、という項目はありません。</p><h3>使える場面</h3><p>上の子を産前産後に預けたいときの事由です。期間が終わると就労などの別の事由に切り替える必要があります。</p><h3>父母の合わせ方</h3><p>清須市は父母それぞれの基本指数の低いほうを採るので、もう一方の保護者の指数も関係します。</p><h3>書類</h3><p>母子健康手帳の写しなど、出産予定日がわかるものを求められます。</p>",
    publishedAt: "2026-06-01",
    popularity: 41
  },
  {
    slug: "point-system-disability",
    citySlug: "iwakura",
    title: "障害児・療育手帳保持者の加点【岩倉市の福祉制度】",
    description: "障害がある児童や療育手帳保持者の加点。五条川沿いの岩倉市での支援。",
    category: "point-system",
    categoryColor: "blue",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop",
    content: "<h2>岩倉市の障害児加点</h2><p>岩倉市の選考基準指数表では、保護者の障害は基本指数、申請児童の障害は調整点数に入ります。</p><h3>点数</h3><p>保護者が身体1・2級／療育A／精神1級なら10点、身体3級／療育B／精神2級なら9点、身体4〜6級／療育C／精神3級なら7点。申請児童が障害者手帳等を持っている場合は調整点数+1点です。</p><h3>提出書類</h3><p>手帳の写しか原本の提示を求められます。</p><h3>入園後のサポート</h3><p>加配保育者の配置が検討されます。</p>",
    publishedAt: "2026-06-01",
    popularity: 39
  },
  {
    slug: "point-system-sibling",
    citySlug: "sakai-fukui",
    title: "兄弟姉妹在園の加点制度【坂井市での優遇】",
    description: "上の子が同じ保育園に在園している場合の加点。福井県坂井市での制度。",
    category: "point-system",
    categoryColor: "blue",
    image: "https://images.unsplash.com/photo-1516321318423-f06f70e504b9?w=800&h=400&fit=crop",
    content: "<h2>坂井市の兄弟姉妹加点</h2><p>きょうだいが同じ園に在園している場合に加点する自治体は多く、坂井市の扱いと点数は市の基準表で確かめてください。</p><h3>加点の大きさ</h3><p>自治体によって1点程度から数点まで幅があります。在園中だけでなく同時申込も対象にする市もあります。</p><h3>対象園</h3><p>同じ園に限るか、同一法人の別園も含むかは自治体で違います。</p><h3>書類</h3><p>上の子の在園証明書が必要です。</p>",
    publishedAt: "2026-06-01",
    popularity: 37
  },
  {
    slug: "point-system-self-employed",
    citySlug: "obama",
    title: "フリーランス・自営業の点数評価【小浜市での基準】",
    description: "フリーランスや自営業の保活点数。若狭塗箸職人など自営業者が多い小浜市での評価。",
    category: "point-system",
    categoryColor: "blue",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop",
    content: "<h2>小浜市の自営業者評価</h2><p>若狭塗箸などの伝統工芸で自営業者が多い小浜市。</p><h3>点数のつけ方</h3><p>所得税申告書や営業開始届で就労を証明します。</p><h3>営業時間の扱い</h3><p>自営の中心者か協力者かで点数を分ける自治体が多く、協力者は低くなります。小浜市の刻みは市の基準表で確かめてください。</p><h3>書類準備</h3><p>前年の確定申告書の写しや開業届など、事業と就労時間を示す書類を求められます。何年分かは市の案内で確かめてください。</p>",
    publishedAt: "2026-06-01",
    popularity: 35
  },
  {
    slug: "point-system-nursery-priority",
    citySlug: "ono-fukui",
    title: "保育の必要性度による優先順位【大野市での加点システム】",
    description: "保育の必要性の高さが点数に反映される仕組み。天空の城がある大野市での制度。",
    category: "point-system",
    categoryColor: "blue",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=400&fit=crop",
    content: "<h2>大野市の必要性度評価</h2><p>奥越の大野市でも、選考は「保育の必要性」を点数にした基準表で行います。数字は市の基準表で確かめてください。</p><h3>点数になる項目としてよくあるもの</h3><ul><li>就労の日数・時間</li><li>ひとり親、生活保護などの世帯の状況</li><li>きょうだいの在園</li></ul><h3>個別の事情</h3><p>基準表に無い事情は点数になりません。緊急性が高い場合の扱いは市に相談してください。</p><h3>確かめ方</h3><p>基準表が公表されていない場合は、市の保育の担当課に自分の世帯がどの行に当たるかを聞くのが確実です。</p>",
    publishedAt: "2026-06-01",
    popularity: 36
  },
  {
    slug: "point-system-cutoff",
    citySlug: "hidaka",
    title: "点数と内定ラインの考え方【日高市で確かめたいこと】",
    description: "内定した世帯の点数は公表されているのか。日高市で申し込む前の確かめ方。",
    category: "point-system",
    categoryColor: "blue",
    image: "https://images.unsplash.com/photo-1594521802212-f90ffc8f4f2e?w=800&h=400&fit=crop",
    content: "<h2>内定ラインは公表されているのか</h2><p>曼珠沙華で有名な日高市で、園ごと・年齢ごとの内定最低点が公表されているかは市のサイトで確かめてください。公表していない自治体も多く、ここに数字は書きません。</p><h3>ラインは毎年動く</h3><p>同じ園でも年齢と年度で申込数が変わるため、去年の数字はあくまで目安です。</p><h3>申込の考え方</h3><p>自分の点数を基準表で出したうえで、空きが出やすい園も希望に含めておくと内定の可能性が残ります。</p><h3>情報の取り方</h3><p>市が公表する空き状況と、窓口での相談が確実です。</p>",
    publishedAt: "2026-06-01",
    popularity: 38
  }
];

registerArticles(articles);
