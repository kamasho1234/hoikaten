import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "point-system-calculation",
    citySlug: "hekinan",
    title: "保育園入園の点数計算方法【碧南市40点制詳解】",
    description: "碧南市の40点制点数システムの詳細。両親の就労形態から加点まで完全ガイド。",
    category: "point-system",
    categoryColor: "blue",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    content: "<h2>碧南市の40点制とは</h2><p>碧南市は全国的にも珍しい40点制を採用しています。</p><h3>基本点の構成</h3><ul><li>フルタイム勤務：28点</li><li>パートタイム：20点</li><li>無職：0点</li></ul><h3>加点制度</h3><p>基本点に加えて最大12点の加点が可能。</p><h3>満点でも落ちる理由</h3><p>40点の家庭が複数いる場合はカード抽選になります。</p>",
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
    content: "<h2>新城市の合算ルール</h2><p>奥三河の新城市では、両親の点数を合算します。</p><h3>合算方法</h3><p>親Aの点数と親Bの点数を足し合わせたものが世帯の総合点になります。</p><h3>満点の目安</h3><p>両親ともフルタイムなら64点（親32点×2）が目安。</p><h3>一方が無職の場合</h3><p>保育の必要性が低いと判定され、加点の対象が限定されます。</p>",
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
    content: "<h2>津島市のひとり親加点</h2><p>待機児童が多い津島市はひとり親家庭に対して加点を行います。</p><h3>加点ポイント</h3><p>通常の世帯より8点の加点が認められます。</p><h3>手続き</h3><p>児童扶養手当受給証など、証明書類の提出が必要です。</p><h3>点数の有効性</h3><p>ひとり親加点は滑り止め園の確保に特に有効です。</p>",
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
    content: "<h2>愛西市の祖父母同居減点</h2><p>蓮根産地の愛西市では、祖父母と同居していると減点される場合があります。</p><h3>減点の理由</h3><p>祖父母がいると保育の必要性が低いと判定されるためです。</p><h3>減点額</h3><p>通常は4〜6点の減点。</p><h3>回避方法</h3><p>別生計であることを証明する書類の提出で回避できることもあります。</p>",
    publishedAt: "2026-06-01",
    popularity: 44
  },
  {
    slug: "point-system-newborn",
    citySlug: "kiyosu",
    title: "新生児保育の加点制度【清須市での優遇】",
    description: "0歳児から保育が必要な場合の加点。織田信長ゆかりの清須市での制度。",
    category: "point-system",
    categoryColor: "blue",
    image: "https://images.unsplash.com/photo-1460925895917-aae19106c1f3?w=800&h=400&fit=crop",
    content: "<h2>清須市の新生児加点</h2><p>0歳児からの保育は最優先とみなされ、加点の対象になります。</p><h3>加点の対象</h3><p>妊娠中から出生後3ヶ月までの申込が加点対象。</p><h3>加点額</h3><p>通常2点の加点。</p><h3>書類</h3><p>母子手帳のコピーで証明します。</p>",
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
    content: "<h2>岩倉市の障害児加点</h2><p>療育手帳の保持者は保活でも優遇されます。</p><h3>加点ポイント</h3><p>療育手帳A判定で6点、B判定で4点の加点。</p><h3>提出書類</h3><p>療育手帳原本の提示が必要。</p><h3>入園後のサポート</h3><p>加配保育者の配置が検討されます。</p>",
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
    content: "<h2>坂井市の兄弟姉妹加点</h2><p>福井県では兄弟姉妹が同じ園に在園している場合加点があります。</p><h3>加点額</h3><p>通常は3点。兄弟姉妹全員入園希望の場合はさらに加点。</p><h3>対象園</h3><p>同一法人運営の複数園でも加点対象になることがあります。</p><h3>書類</h3><p>上の子の在園証明書が必要です。</p>",
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
    content: "<h2>小浜市の自営業者評価</h2><p>若狭塗箸などの伝統工芸で自営業者が多い小浜市。</p><h3>点数のつけ方</h3><p>所得税申告書や営業開始届で就労を証明します。</p><h3>営業時間の扱い</h3><p>営業時間が不規則な場合、就労時間が不明瞭として減点される場合も。</p><h3>書類準備</h3><p>過去2年分の確定申告書を準備します。</p>",
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
    content: "<h2>大野市の必要性度評価</h2><p>山越前の大野市では、保育の必要性が最大3点の加点に。</p><h3>評価基準</h3><ul><li>就労時間が長い</li><li>祖父母との距離が遠い</li><li>兄弟が多い</li></ul><h3>加点の申請</h3><p>理由書を提出して個別判定されます。</p><h3>実績</h3><p>評価が公開されていないため、市役所への相談が重要です。</p>",
    publishedAt: "2026-06-01",
    popularity: 36
  },
  {
    slug: "point-system-cutoff",
    citySlug: "hidaka",
    title: "点数と合格ラインの現実【日高市での当選点数推移】",
    description: "日高市での過去の合格点数。毎年変わる当選ラインと申込戦略。",
    category: "point-system",
    categoryColor: "blue",
    image: "https://images.unsplash.com/photo-1594521802212-f90ffc8f4f2e?w=800&h=400&fit=crop",
    content: "<h2>日高市の合格点数推移</h2><p>曼珠沙華で有名な日高市でも、毎年合格点が変わります。</p><h3>過去3年の傾向</h3><ul><li>2023年度：32点以上で大半合格</li><li>2024年度：34点以上が目安</li><li>2025年度：36点以上が安全圏</li></ul><h3>戦略的申込</h3><p>確実な滑り止め園は25点以上の世帯でも可能性があります。</p><h3>情報入手</h3><p>市役所が公開する合格点数データを確認してください。</p>",
    publishedAt: "2026-06-01",
    popularity: 38
  }
];

registerArticles(articles);
