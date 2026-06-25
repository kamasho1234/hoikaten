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
    content: "<h2>碧南市の保活書類チェックリスト</h2><p>碧南市での申込に必要な全書類を網羅したチェックリスト。</p><h3>基本書類</h3><ul><li>[ ] 保育施設利用申請書</li><li>[ ] 住民票抄本（3ヶ月以内）</li><li>[ ] 戸籍謄本（離別の場合）</li></ul><h3>就労関連</h3><ul><li>[ ] 親Aの就労証明書</li><li>[ ] 親Bの就労証明書</li><li>[ ] 勤務地の地図</li></ul><h3>健康関連</h3><ul><li>[ ] 健康診断書（児童）</li><li>[ ] 母子手帳のコピー</li></ul>",
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
    content: "<h2>新城市の就労証明書チェック</h2><p>奥三河の新城市では、企業の記入ミスが非常に多い。</p><h3>企業記入欄のチェック</h3><ul><li>[ ] 企業の正式名称が正確</li><li>[ ] 部署名が記載されている</li><li>[ ] 就職日が正確</li><li>[ ] 企業印が押印されている</li></ul><h3>労働時間の記載</h3><ul><li>[ ] 月当たりの標準就労時間</li><li>[ ] 残業時間</li><li>[ ] 休出頻度</li></ul><h3>よくある誤り</h3><p>企業印なし、署名なしが頻発します。事前に枚数を確認してください。</p>",
    publishedAt: "2026-06-01",
    popularity: 47
  },
  {
    slug: "documents-checklist-health",
    citySlug: "tsushima",
    title: "児童の健康診断書チェック【津島市での医学的確認事項】",
    description: "津島市での児童健康診断書。医師の署名や予防接種欄の確認が重要です。",
    category: "documents-checklist",
    categoryColor: "rose",
    image: "https://images.unsplash.com/photo-1610647752706-d53f3b16df95?w=800&h=400&fit=crop",
    content: "<h2>津島市の児童健康診断書チェック</h2><p>待機児童が多い津島市では、健康診断書の厳密確認が行われます。</p><h3>医師署名欄</h3><ul><li>[ ] 医師の直署がある</li><li>[ ] 医師印が押印されている</li><li>[ ] 医院の印鑑がある</li></ul><h3>健康記録欄</h3><ul><li>[ ] 身長・体重が記載</li><li>[ ] 予防接種歴が記載</li><li>[ ] 感染症歴が記載</li></ul><h3>期限確認</h3><p>3ヶ月以内の診断書が必須。期限切れは受け付けられません。</p>",
    publishedAt: "2026-06-01",
    popularity: 45
  },
  {
    slug: "documents-checklist-residential",
    citySlug: "aisai",
    title: "住民票・戸籍書類の取得と記載確認【愛西市での法務局提出】",
    description: "蓮根産地の愛西市。住民票と戸籍の書類取得時期と記載事項の確認方法。",
    category: "documents-checklist",
    categoryColor: "rose",
    image: "https://images.unsplash.com/photo-1606159376253-59a8b81ddb00?w=800&h=400&fit=crop",
    content: "<h2>愛西市の住民票・戸籍チェック</h2><p>蓮根産地の愛西市では、住民票の記載内容が保活点数に影響。</p><h3>住民票の確認項目</h3><ul><li>[ ] 親の住所が完全記載</li><li>[ ] 児童の住所が完全記載</li><li>[ ] 発行日が3ヶ月以内</li><li>[ ] 続柄が正確に記載</li></ul><h3>戸籍謄本が必要な場合</h3><ul><li>[ ] 離婚歴がある</li><li>[ ] 再婚している</li><li>[ ] 親権が不明確</li></ul><h3>取得期間</h3><p>書類取得に1週間かかるため、申込予定日の3週間前から手続き開始。</p>",
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
    content: "<h2>清須市の所得書類チェック</h2><p>清洲城がある清須市では、所得に基づく加点があります。</p><h3>所得証明書チェック</h3><ul><li>[ ] 発行年度が申込年度と一致</li><li>[ ] 親Aの所得が正確</li><li>[ ] 親Bの所得が正確</li><li>[ ] 市長の印鑑がある</li></ul><h3>課税証明書チェック</h3><ul><li>[ ] 前年度分の書類</li><li>[ ] 市民税額が記載</li><li>[ ] 市長の印鑑がある</li></ul><h3>取得タイミング</h3><p>1月から2月の申込では前々年度の書類になります。十分確認してください。</p>",
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
    content: "<h2>岩倉市の障害児関連書類</h2><p>五条川沿いの岩倉市でも、障害児対応の書類準備が重要。</p><h3>必須書類</h3><ul><li>[ ] 療育手帳（原本確認）</li><li>[ ] 医学診断書</li><li>[ ] 特別支援教室の診断書</li></ul><h3>加点対象の確認</h3><ul><li>[ ] 療育手帳のランク確認（A/B判定）</li><li>[ ] 要配慮児かどうか</li></ul><h3>提出時期</h3><p>手帳取得後、速やかに市役所に提出。加点対象かどうかの判定が重要。</p>",
    publishedAt: "2026-06-01",
    popularity: 38
  },
  {
    slug: "documents-checklist-fukui-specific",
    citySlug: "sakai-fukui",
    title: "福井県特有の書類様式【坂井市での県統一書類確認】",
    description: "福井県坂井市。福井県特有の書類様式と愛知県の書類との違いの確認。",
    category: "documents-checklist",
    categoryColor: "rose",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=400&fit=crop",
    content: "<h2>福井県坂井市の書類様式</h2><p>福井県坂井市では愛知県と全く異なる様式を使用します。</p><h3>福井県統一書類</h3><ul><li>[ ] 福井県様式の申請書</li><li>[ ] 福井県様式の就労証明書</li><li>[ ] 福井県統一の健康診断書</li></ul><h3>注意点</h3><p>愛知県の書類は受け付けられません。福井県庁ウェブサイトから最新様式をダウンロード。</p><h3>相談先</h3><p>不明な点は坂井市こども育成部に直接相談。</p>",
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
    content: "<h2>小浜市のデジタル化対応</h2><p>鯖街道がある小浜市もマイナンバーカード対応が進展中。</p><h3>マイナンバーカードでの取得</h3><ul><li>[ ] マイナンバーカードの有効期限確認</li><li>[ ] 4ケタの暗証番号確認</li><li>[ ] コンビニ受付で住民票取得可能</li></ul><h3>メリット</h3><p>市役所に行かずにコンビニで24時間住民票が取得できます。</p><h3>書類取得方法</h3><p>マイナポータル経由でも取得可能。</p>",
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
    content: "<h2>大野市の外国人世帯対応</h2><p>山越前の大野市でも外国籍親が増加中。書類翻訳が必須。</p><h3>翻訳対象書類</h3><ul><li>[ ] 就労証明書（英語など）</li><li>[ ] 戸籍・住民票（英訳版）</li><li>[ ] 健康診断書（翻訳版）</li></ul><h3>翻訳認定</h3><p>翻訳者の署名と公印が必要。大学の翻訳センターの利用推奨。</p><h3>相談窓口</h3><p>大野市役所の多言語対応窓口で相談可能。</p>",
    publishedAt: "2026-06-01",
    popularity: 35
  },
  {
    slug: "documents-checklist-submission",
    citySlug: "hidaka",
    title: "書類提出のスケジュール管理【日高市での提出期限・郵送方法】",
    description: "曼珠沙華で有名な日高市。書類提出の完全スケジュール管理とトラブル防止。",
    category: "documents-checklist",
    categoryColor: "rose",
    image: "https://images.unsplash.com/photo-1594521802212-f90ffc8f4f2e?w=800&h=400&fit=crop",
    content: "<h2>日高市の書類提出スケジュール</h2><p>埼玉県日高市の書類提出には厳密なスケジュール管理が必須。</p><h3>提出期限</h3><ul><li>[ ] 一次申込期限：1月31日（必着）</li><li>[ ] 追加書類締切：2月7日（必着）</li><li>[ ] 二次申込期限：3月20日</li></ul><h3>郵送方法</h3><p>簡易書留での郵送が推奨。配達証明で到着確認が可能。</p><h3>直接提出</h3><p>市役所での直接提出も可能。土日開庁日に対応。</p>",
    publishedAt: "2026-06-01",
    popularity: 37
  }
];

registerArticles(articles);
