import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "single-parent-advantages",
    citySlug: "hekinan",
    title: "ひとり親家庭の保活有利性【碧南市での加点と優遇内容】",
    description: "ひとり親世帯は選考でどう扱われるのか。碧南市の基準表で確かめたいこと。",
    category: "single-parent",
    categoryColor: "purple",
    image: "https://images.unsplash.com/photo-1564629238-27cffbabd5f1?w=800&h=400&fit=crop",
    content: "<h2>碧南市のひとり親優遇</h2><p>ひとり親世帯を調整指数で加点する自治体は多く、碧南市の扱いと点数は市の基準表で確かめてください。</p><h3>加点の見方</h3><p>ひとり親の加点は、父母の点数を合わせたあとに足す調整指数として書かれていることが多いです。</p><h3>あわせて見る項目</h3><ul><li>生活保護世帯の加点</li><li>祖父母と同居している場合の扱い</li></ul><h3>入園の容易性</h3><p>基本の点数が並んだときに、ひとり親の加点で順位が前になることがあります。</p>",
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
    content: "<h2>新城市のひとり親書類</h2><p>奥三河の新城市でのひとり親申込には特定の書類が必須です。</p><h3>必須書類</h3><ul><li>戸籍謄本など、ひとり親であることがわかる書類</li><li>児童扶養手当の証書（受給している場合）</li><li>市が指定する申立書（様式がある場合）</li></ul><p>何を出すかは新城市の申込案内で確かめてください。</p><h3>提出タイミング</h3><p>申込時に全て揃っていることが重要。</p><h3>取得期間</h3><p>戸籍は本籍地が遠いと郵送で日数がかかります。早めに取り寄せましょう。</p>",
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
    content: "<h2>津島市での親権確認</h2><p>津島市に限らず、ひとり親として申し込むときは戸籍などで世帯の状況を確かめられます。</p><h3>必要書類</h3><ul><li>戸籍謄本（親権者の記載があるもの）</li><li>離婚が成立していない場合は、別居や調停中を示す書類</li></ul><p>何を出すかは津島市の申込案内で確かめてください。</p><h3>虚偽申告の厳格化</h3><p>実態と違う申告は内定の取り消しにつながります。</p><h3>相談</h3><p>事前に津島市役所で親権確認の相談をしてください。</p>",
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
    content: "<h2>愛西市のひとり親所得基準</h2><p>蓮根産地の愛西市では、ひとり親世帯の調整指数は+15点で、所得による差はありません（愛西市利用基準表・令和8年度）。所得が関係するのは保育料のほうです。</p><h3>児童扶養手当との関係</h3><p>児童扶養手当には所得制限がありますが、保育の点数とは別の制度です。手当を受けていなくてもひとり親の加点は付きます。</p><h3>所得証明</h3><ul><li>所得証明書</li><li>課税証明書</li><li>源泉徴収票</li></ul><h3>加点の恩恵</h3><p>生活保護世帯はさらに+5点です。所得そのもので加点が変わることはありません。</p>",
    publishedAt: "2026-06-01",
    popularity: 42
  },
  {
    slug: "single-parent-childcare",
    citySlug: "kiyosu",
    title: "ひとり親の保育時間の扱い【清須市での勤務時間カウント】",
    description: "織田信長ゆかりの清須市。ひとり親の基本指数は就労時間でどう決まるか。",
    category: "single-parent",
    categoryColor: "purple",
    image: "https://images.unsplash.com/photo-1552521516-97e5c766a6fe?w=800&h=400&fit=crop",
    content: "<h2>清須市のひとり親就労評価</h2><p>清洲城がある清須市では、ひとり親世帯はその保護者1人の基本指数がそのまま世帯の基本指数になります。就労の日数・時間が指数を決めます。</p><h3>就労の下限</h3><p>清須市の入園基準指数表では、月60時間以上の就労が最も低い行（10点）です。月20日以上かつ1日8時間以上なら20点です。</p><h3>不規則就労の場合</h3><p>飲食店やアルバイトなど不規則就労でも認定されます。</p><h3>書類準備</h3><p>就労証明書に時間数の詳細記載が不可欠です。</p>",
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
    content: "<h2>岩倉市のひとり親支援サポート</h2><p>五条川沿いの岩倉市の選考基準指数表では、母子・父子世帯（死別・離婚・行方不明等）の調整点数は+3点です。</p><h3>祖父母の手助けと点数</h3><p>祖父母の手助けで加点になる項目はありません。送迎を頼める人がいるかは、希望園の順位を決めるときの材料にしてください。</p><h3>ファミサポ活用</h3><p>送迎や急な残業のときは、ファミリー・サポート・センターがあれば利用できます。岩倉市の窓口は市のサイトで確かめてください。</p><h3>相談窓口</h3><p>ひとり親の相談は市の子育ての担当課へ。</p>",
    publishedAt: "2026-06-01",
    popularity: 38
  },
  {
    slug: "single-parent-fukui",
    citySlug: "sakai-fukui",
    title: "ひとり親世帯の保活【坂井市で確かめたいこと】",
    description: "福井県坂井市。ひとり親世帯が選考でどう扱われるか、あわせて使える支援は何か。",
    category: "single-parent",
    categoryColor: "purple",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=400&fit=crop",
    content: "<h2>坂井市のひとり親世帯の保活</h2><p>ひとり親世帯を調整指数で加点する自治体は多く、坂井市の扱いと点数は市の基準表で確かめてください。基準は県ではなく市が決めています。</p><h3>あわせて確かめたい支援</h3><ul><li>保育料（ひとり親世帯の軽減があるか）</li><li>子どもの医療費助成</li><li>児童扶養手当（国の制度。所得制限あり）</li></ul><h3>相談先</h3><p>保育の申込は市の保育の担当課、手当や助成は市の子育ての担当課へ。</p>",
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
    content: "<h2>小浜市での虚偽申告リスク</h2><p>鯖街道がある小浜市に限らず、ひとり親の申告は戸籍や住民票で確かめられます。</p><h3>虚偽申告のリスク</h3><ul><li>内定の取り消し</li><li>入園後に発覚した場合の退園</li></ul><h3>事実確認方法</h3><p>戸籍・住民票の記載と、必要に応じて聞き取りで確かめられます。</p><h3>正直な申告</h3><p>不明な点があれば市役所に相談してください。</p>",
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
    content: "<h2>大野市での再婚と手続き</h2><p>奥越の大野市でも、再婚するとひとり親としての扱いは終わります。</p><h3>手続きのタイミング</h3><p>婚姻届を出したら、市の保育の担当課にも世帯の変更を届け出ます。</p><h3>保育料への影響</h3><p>世帯の市民税額で再計算されます。上がることが多いです。</p><h3>入園への影響</h3><p>在園中の子はそのまま通えますが、配偶者にも就労などの事由が必要になります。新規申込ではひとり親の加点が無くなります。</p>",
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
    content: "<h2>日高市のひとり親緊急支援</h2><p>埼玉県日高市でも、急に保育が必要になったときに使える制度があります。何があるかは市のサイトで確かめてください。</p><h3>緊急一時保育</h3><p>病気や事故で急に保育が必要になった場合、一時保育で対応。</p><h3>料金</h3><p>一時保育の料金や減免の有無は自治体と園で違います。日高市の案内で確かめてください。</p><h3>相談窓口</h3><p>市の子育ての担当課へ。夜間や休日の相談先は市のサイトで確かめてください。</p>",
    publishedAt: "2026-06-01",
    popularity: 37
  }
];

registerArticles(articles);
