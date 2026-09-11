import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "documents-checklist-basics",
    citySlug: "hekinan",
    title: "保活書類チェックリスト完全版【碧南市申込の全工程】",
    description: "碧南市での保活申込に必要な全書類をリストアップ。チェックリスト形式で漏らしない。",
    category: "documents-checklist",
    categoryColor: "rose",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    content: "<h2>碧南市の保活書類チェックリスト</h2><p>碧南市での申込に必要な書類は、市が配る申込案内に一覧があります。ここでは多くの自治体で共通して求められるものを挙げます。</p><h3>基本書類</h3><ul><li>[ ] 保育施設利用申請書</li><li>[ ] 住民票抄本（3ヶ月以内）</li><li>[ ] ひとり親を示す書類（該当する場合）</li></ul><h3>就労関連</h3><ul><li>[ ] 親Aの就労証明書</li><li>[ ] 親Bの就労証明書</li><li>[ ] 自営業の場合は確定申告書の写しなど</li></ul><h3>その他</h3><ul><li>[ ] 児童の健康状態を書く票（市の様式があれば）</li><li>[ ] 母子健康手帳（提示を求められることがある）</li></ul><p>何が必要かは世帯の状況で変わります。最終確認は碧南市の申込案内で。</p>",
    publishedAt: "2026-06-01",
    popularity: 51
  },
  {
    slug: "documents-checklist-employment",
    citySlug: "shinshiro",
    title: "就労証明書の書き方ガイド【新城市での企業記入部分の確認】",
    description: "新城市での就労証明書作成。企業記入欄の記入漏れを防ぐための確認ポイント。",
    category: "documents-checklist",
    categoryColor: "rose",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&h=400&fit=crop",
    content: "<h2>新城市の就労証明書チェック</h2><p>奥三河の新城市でも、就労証明書の不備は差し戻しの原因になります。勤務先に書いてもらったら、受け取った時点で次の項目を見てください。</p><h3>企業記入欄のチェック</h3><ul><li>[ ] 企業の正式名称が正確</li><li>[ ] 部署名が記載されている</li><li>[ ] 就職日が正確</li><li>[ ] 企業印が押印されている</li></ul><h3>労働時間の記載</h3><ul><li>[ ] 月当たりの標準就労時間</li><li>[ ] 残業時間</li><li>[ ] 休出頻度</li></ul><h3>よくある誤り</h3><p>企業印なし、記入者名なしは差し戻しになります。父母それぞれ1通ずつ必要なので、必要な枚数を先に確かめてください。</p>",
    publishedAt: "2026-06-01",
    popularity: 47
  },
  {
    slug: "documents-checklist-health",
    citySlug: "tsushima",
    title: "児童の健康状態の書類【津島市で確かめたいこと】",
    description: "津島市の申込で児童の健康状態はどう伝えるのか。健康診断書が要るかどうかの確かめ方。",
    category: "documents-checklist",
    categoryColor: "rose",
    image: "https://images.unsplash.com/photo-1610647752706-d53f3b16df95?w=800&h=400&fit=crop",
    content: "<h2>健康診断書は要るのか</h2><p>申込時に医師の健康診断書を求める自治体は少なく、多くは保護者が記入する健康状態の票で済みます。津島市で何が要るかは市の申込案内で確かめてください。</p><h3>保護者が書く票でよく聞かれること</h3><ul><li>[ ] 既往歴・アレルギー</li><li>[ ] 予防接種の状況</li><li>[ ] かかりつけ医</li></ul><h3>医師の書類が要る場面</h3><ul><li>[ ] 医療的ケアや配慮が必要なとき</li><li>[ ] 保護者の疾病を申込理由にするとき（診断書）</li></ul><h3>有効期限</h3><p>診断書を求められる場合は発行からの期限が決まっていることがあります。取得の時期は申込案内の指定に合わせてください。</p>",
    publishedAt: "2026-06-01",
    popularity: 45
  },
  {
    slug: "documents-checklist-residential",
    citySlug: "aisai",
    title: "住民票・戸籍書類の取得と記載確認【愛西市での準備】",
    description: "蓮根産地の愛西市。住民票と戸籍の書類取得時期と記載事項の確認方法。",
    category: "documents-checklist",
    categoryColor: "rose",
    image: "https://images.unsplash.com/photo-1606159376253-59a8b81ddb00?w=800&h=400&fit=crop",
    content: "<h2>愛西市の住民票・戸籍チェック</h2><p>蓮根産地の愛西市では、同居の祖父母（65歳未満）が自宅で保育できると調整指数が-2点、同居のきょうだいの在園は+1点です（愛西市利用基準表・令和8年度）。世帯の構成は住民票で確かめられるので、記載が実態と合っているかを見ておきましょう。</p><h3>住民票の確認項目</h3><ul><li>[ ] 親の住所が完全記載</li><li>[ ] 児童の住所が完全記載</li><li>[ ] 発行日が3ヶ月以内</li><li>[ ] 続柄が正確に記載</li></ul><h3>戸籍謄本が必要な場合</h3><ul><li>[ ] 離婚歴がある</li><li>[ ] 再婚している</li><li>[ ] 親権が不明確</li></ul><h3>取得期間</h3><p>住民票は窓口やコンビニ交付ですぐ取れますが、戸籍は本籍地が遠いと郵送で日数がかかります。余裕を持って手続きを始めましょう。</p>",
    publishedAt: "2026-06-01",
    popularity: 42
  },
  {
    slug: "documents-checklist-income",
    citySlug: "kiyosu",
    title: "所得・課税関連書類チェック【清須市での経済状況確認】",
    description: "織田信長ゆかりの清須市。所得証明書や課税証明書の取得と確認ポイント。",
    category: "documents-checklist",
    categoryColor: "rose",
    image: "https://images.unsplash.com/photo-1552521516-97e5c766a6fe?w=800&h=400&fit=crop",
    content: "<h2>清須市の所得書類チェック</h2><p>清洲城がある清須市の入園基準指数表に、所得で加点する項目はありません。所得の書類は保育料の決定に使われます。</p><h3>所得証明書チェック</h3><ul><li>[ ] 発行年度が申込年度と一致</li><li>[ ] 親Aの所得が正確</li><li>[ ] 親Bの所得が正確</li><li>[ ] 発行元の証明印がある</li></ul><h3>課税証明書チェック</h3><ul><li>[ ] 前年度分の書類</li><li>[ ] 市民税額が記載</li><li>[ ] 発行元の証明印がある</li></ul><h3>取得タイミング</h3><p>どの年度の課税証明が要るかは申込時期で変わります。清須市の申込案内で指定された年度のものを用意してください。転入して間もない場合は前住所地の証明が要ることがあります。</p>",
    publishedAt: "2026-06-01",
    popularity: 40
  },
  {
    slug: "documents-checklist-special-needs",
    citySlug: "iwakura",
    title: "障害児・療育対象者の追加書類【岩倉市での福祉手帳の提出】",
    description: "五条川の桜で有名な岩倉市。療育手帳などの福祉関連書類の準備と提出時期。",
    category: "documents-checklist",
    categoryColor: "rose",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=400&fit=crop",
    content: "<h2>岩倉市の障害児関連書類</h2><p>五条川沿いの岩倉市では、申請児童が障害者手帳等を持っていると調整点数が+1点です（岩倉市保育園入園選考基準指数表）。手帳の写しなどで示せるよう準備しておきましょう。</p><h3>必須書類</h3><ul><li>[ ] 障害者手帳・療育手帳（写しか原本の提示）</li><li>[ ] 医師の診断書や意見書（求められた場合）</li></ul><h3>保護者の障害は基本指数に</h3><ul><li>[ ] 保護者が身体1・2級／療育A／精神1級なら10点、身体3級／療育B／精神2級なら9点、身体4〜6級／療育C／精神3級なら7点（同表）</li></ul><h3>提出時期</h3><p>申込書と一緒に出します。受け入れ体制の相談が必要な場合は、申込前に市の担当課に伝えておくと手続きが進みやすくなります。</p>",
    publishedAt: "2026-06-01",
    popularity: 38
  },
  {
    slug: "documents-checklist-fukui-specific",
    citySlug: "sakai-fukui",
    title: "坂井市の申込書類【市の様式を使う】",
    description: "福井県坂井市。申込に使う様式はどこで手に入れ、何に気をつけるか。",
    category: "documents-checklist",
    categoryColor: "rose",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=400&fit=crop",
    content: "<h2>坂井市の申込書類</h2><p>申込の様式は市町村ごとに決めています。転入前の自治体で使った様式は使えないので、坂井市の様式をそろえてください。</p><h3>そろえる書類</h3><ul><li>[ ] 坂井市の利用申込書（支給認定の申請を兼ねることが多い）</li><li>[ ] 就労証明書（父母それぞれ）。国の標準様式に沿った市の様式</li><li>[ ] 世帯の状況を示す書類（ひとり親、障害、介護など該当する場合）</li></ul><h3>注意点</h3><p>様式は年度で変わることがあります。市のサイトから最新版を取るか、窓口でもらってください。</p><h3>相談先</h3><p>不明な点は坂井市の保育の担当課に直接相談。</p>",
    publishedAt: "2026-06-01",
    popularity: 36
  },
  {
    slug: "documents-checklist-digital",
    citySlug: "obama",
    title: "マイナンバーカードでの手続き【小浜市での行政手続きのデジタル化】",
    description: "若狭塗箸で有名な小浜市。マイナンバーカード提示での書類取得が可能に。",
    category: "documents-checklist",
    categoryColor: "rose",
    image: "https://images.unsplash.com/photo-1586337108541-7d0f50888acd?w=800&h=400&fit=crop",
    content: "<h2>小浜市のデジタル化対応</h2><p>鯖街道がある小浜市でも、マイナンバーカードがあると住民票などの取得が楽になります。</p><h3>マイナンバーカードでの取得</h3><ul><li>[ ] マイナンバーカードの有効期限確認</li><li>[ ] 4ケタの暗証番号確認</li><li>[ ] コンビニ交付に対応しているか（市のサイトで確認）</li></ul><h3>メリット</h3><p>対応している自治体なら、市役所の開庁時間外でもコンビニで住民票や課税証明書が取れます。</p><h3>申込そのものは</h3><p>保育の申込を電子申請で受け付けるかは自治体で違います。小浜市の受付方法は市の申込案内で確かめてください。</p>",
    publishedAt: "2026-06-01",
    popularity: 34
  },
  {
    slug: "documents-checklist-translation",
    citySlug: "ono-fukui",
    title: "外国人世帯の書類翻訳【大野市での言語対応】",
    description: "天空の城がある大野市。外国籍親の書類翻訳と認定方法。",
    category: "documents-checklist",
    categoryColor: "rose",
    image: "https://images.unsplash.com/photo-1572365992253-3cb3e56dd362?w=800&h=400&fit=crop",
    content: "<h2>大野市の外国人世帯対応</h2><p>奥越の大野市でも、外国語で書かれた就労証明書などは日本語訳を求められることがあります。</p><h3>翻訳対象書類</h3><ul><li>[ ] 就労証明書（英語など）</li><li>[ ] 戸籍・住民票（英訳版）</li><li>[ ] 健康診断書（翻訳版）</li></ul><h3>翻訳の形式</h3><p>翻訳者の氏名を書いた訳文を添える形が一般的です。公的な認証まで求めるかは自治体で違うので、先に市に聞いてください。</p><h3>相談窓口</h3><p>市の保育の担当課へ。多言語の相談窓口があるかは市のサイトで確かめてください。</p>",
    publishedAt: "2026-06-01",
    popularity: 35
  },
  {
    slug: "documents-checklist-submission",
    citySlug: "hidaka",
    title: "書類提出のスケジュール管理【日高市での期限の確かめ方】",
    description: "曼珠沙華で有名な日高市。書類提出の完全スケジュール管理とトラブル防止。",
    category: "documents-checklist",
    categoryColor: "rose",
    image: "https://images.unsplash.com/photo-1594521802212-f90ffc8f4f2e?w=800&h=400&fit=crop",
    content: "<h2>日高市の書類提出スケジュール</h2><p>埼玉県日高市の申込期限は年度ごとに市が公表します。ここに日付は書きません。市の申込案内で確かめて、次の欄を自分で埋めてください。</p><h3>自分で埋める期限</h3><ul><li>[ ] 一次申込の締切：＿月＿日</li><li>[ ] 不足書類の提出期限：＿月＿日</li><li>[ ] 二次申込の締切：＿月＿日</li></ul><h3>郵送するとき</h3><p>郵送を受け付けるかどうか、必着か消印有効かは申込案内に書かれています。記録が残る方法で送ると安心です。</p><h3>窓口に出すとき</h3><p>受付時間と場所を確かめてから行きましょう。書類が足りないとその場で受け付けてもらえないことがあります。</p>",
    publishedAt: "2026-06-01",
    popularity: 37
  }
];

registerArticles(articles);
