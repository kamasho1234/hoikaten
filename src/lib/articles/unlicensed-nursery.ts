import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "unlicensed-nursery-definition",
    citySlug: "hekinan",
    title: "認可外保育施設とは【碧南市での認可園との違い】",
    description: "認可保育園と認可外保育施設の定義。碧南市での認可外園の役割と特徴。",
    category: "unlicensed-nursery",
    categoryColor: "amber",
    image: "https://images.unsplash.com/photo-1564629238-27cffbabd5f1?w=800&h=400&fit=crop",
    content: "<h2>認可外保育施設の定義</h2><p>碧南市の工業都市では、多くの認可外園が営業しています。</p><h3>認可外とは</h3><p>都道府県の認可を受けていない保育施設。届出制度のもとで運営。</p><h3>認可園との違い</h3><ul><li>保育士の資格基準が異なる</li><li>営業時間が長い（夜間・早朝対応）</li><li>保育料が高い傾向</li></ul><h3>選択の理由</h3><p>待機児童の受け皿、夜勤対応など、認可園では対応できない保育ニーズに対応。</p>",
    publishedAt: "2026-06-01",
    popularity: 48
  },
  {
    slug: "unlicensed-nursery-quality",
    citySlug: "shinshiro",
    title: "認可外保育施設の質のばらつき【新城市での園選びのコツ】",
    description: "新城市での認可外園。質の良い園と悪い園の見極め方。重要な確認項目。",
    category: "unlicensed-nursery",
    categoryColor: "amber",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&h=400&fit=crop",
    content: "<h2>新城市の認可外園の質評価</h2><p>奥三河の新城市では、認可外園の質がまちまちです。</p><h3>質の良い園の特徴</h3><ul><li>保育士が充分に配置されている</li><li>遊び場が清潔で広い</li><li>親への連絡が丁寧</li><li>定期的な情報公開</li></ul><h3>園見学時のチェック項目</h3><ul><li>[ ] 保育室の清潔さ</li><li>[ ] おもちゃの数と状態</li><li>[ ] 保育士の雰囲気</li><li>[ ] 給食メニュー</li></ul><h3>経営安定性</h3><p>園の経営年数と親の満足度を確認することが重要。</p>",
    publishedAt: "2026-06-01",
    popularity: 46
  },
  {
    slug: "unlicensed-nursery-cost",
    citySlug: "tsushima",
    title: "認可外保育料と実際の費用【津島市での料金体系比較】",
    description: "津島市の認可外園の保育料。認可園との料金比較と隠れた費用。",
    category: "unlicensed-nursery",
    categoryColor: "amber",
    image: "https://images.unsplash.com/photo-1610647752706-d53f3b16df95?w=800&h=400&fit=crop",
    content: "<h2>津島市の認可外保育料</h2><p>待機児童が多い津島市は認可外園の保育料が高めです。</p><h3>平均保育料</h3><ul><li>0歳児：月額30,000円〜50,000円</li><li>1〜2歳児：月額20,000円〜40,000円</li><li>3歳児以上：月額15,000円〜30,000円</li></ul><h3>隠れた費用</h3><ul><li>入園金：5,000円〜20,000円</li><li>施設費：月額1,000円〜5,000円</li><li>給食費：月額3,000円〜8,000円</li><li>おむつ費：月額2,000円〜5,000円</li></ul><h3>公開情報の確認</h3><p>認可外園は園のウェブサイトで料金を公開しています。複数園の比較が重要。</p>",
    publishedAt: "2026-06-01",
    popularity: 44
  },
  {
    slug: "unlicensed-nursery-extended-hours",
    citySlug: "aisai",
    title: "夜間・休日保育が充実した認可外園【愛西市での営業時間】",
    description: "蓮根産地の愛西市。夜勤や休日出勤に対応できる認可外園の探し方。",
    category: "unlicensed-nursery",
    categoryColor: "amber",
    image: "https://images.unsplash.com/photo-1606159376253-59a8b81ddb00?w=800&h=400&fit=crop",
    content: "<h2>愛西市の夜間保育対応園</h2><p>蓮根産地の愛西市は農業就業者が多く、夜間保育の需要が高い。</p><h3>営業時間の例</h3><ul><li>早朝保育：6:00開始</li><li>延長保育：22:00終了</li><li>夜間保育：営業時間内24時間対応</li><li>休日保育：日祝日も営業</li></ul><h3>利用料金</h3><p>夜間料金は昼間より20〜30%高くなることが多い。</p><h3>対応園の見つけ方</h3><p>市役所の認可外園一覧から営業時間を確認。</p>",
    publishedAt: "2026-06-01",
    popularity: 41
  },
  {
    slug: "unlicensed-nursery-subsidy",
    citySlug: "kiyosu",
    title: "認可外保育料の補助制度【清須市での保育料減免】",
    description: "織田信長ゆかりの清須市。認可外園利用時の補助金制度の申請方法。",
    category: "unlicensed-nursery",
    categoryColor: "amber",
    image: "https://images.unsplash.com/photo-1552521516-97e5c766a6fe?w=800&h=400&fit=crop",
    content: "<h2>清須市の認可外補助制度</h2><p>清洲城がある清須市でも、認可外園利用者への補助制度があります。</p><h3>補助対象</h3><ul><li>待機児童登録者</li><li>3歳未満児</li><li>所得基準以下の世帯</li></ul><h3>補助額</h3><p>月額10,000円〜20,000円が一般的。</p><h3>申請手続き</h3><p>清須市役所こども課で申請。領収書の提出が必要。</p><h3>手続きの時期</h3><p>入園後、3ヶ月以内に申請することが多い。</p>",
    publishedAt: "2026-06-01",
    popularity: 39
  },
  {
    slug: "unlicensed-nursery-safety",
    citySlug: "iwakura",
    title: "認可外園の安全管理と課題【岩倉市での安全基準の確認】",
    description: "五条川の桜で有名な岩倉市。認可外園の安全管理体制とチェック項目。",
    category: "unlicensed-nursery",
    categoryColor: "amber",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=400&fit=crop",
    content: "<h2>岩倉市の認可外園安全確認</h2><p>五条川沿いの岩倉市でも、認可外園の安全管理は親の責任で確認が必須。</p><h3>確認項目</h3><ul><li>[ ] 保育施設として届出されているか</li><li>[ ] 定期的な防火訓練の実施</li><li>[ ] 緊急連絡体制の確認</li><li>[ ] 保育士の資格確認</li><li>[ ] 感染症対策マニュアル</li></ul><h3>安全基準</h3><p>認可外園は認可園より安全基準が低い傾向。親の監視が重要。</p><h3>問題時の相談先</h3><p>岩倉市保育課または愛知県庁への報告・相談が可能。</p>",
    publishedAt: "2026-06-01",
    popularity: 37
  },
  {
    slug: "unlicensed-nursery-waiting",
    citySlug: "sakai-fukui",
    title: "認可外園での待機児童対応【坂井市での一時しのぎ戦略】",
    description: "福井県坂井市。認可園の待機中に認可外園を利用する際の注意点。",
    category: "unlicensed-nursery",
    categoryColor: "amber",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=400&fit=crop",
    content: "<h2>坂井市での待機児童対応</h2><p>福井県坂井市でも、認可園の待機中に認可外園を利用する家庭が多い。</p><h3>利用パターン</h3><ul><li>認可園内定まで認可外園で対応</li><li>兄弟が別園の場合、下の子を認可外園で</li></ul><h3>費用負担</h3><p>通常、両園の料金を両方支払うことになります。</p><h3>転園時の注意</h3><p>認可園内定後の転園は、認可外園への事前連絡が重要。</p><h3>福井県の特殊性</h3><p>福井県は待機児童が少ないため、認可外園の利用率も低い。</p>",
    publishedAt: "2026-06-01",
    popularity: 35
  },
  {
    slug: "unlicensed-nursery-reliability",
    citySlug: "obama",
    title: "認可外園の信頼性を見抜く【小浜市での親の口コミ情報活用】",
    description: "若狭塗箸で有名な小浜市。認可外園の評判確認と信頼できる園の選び方。",
    category: "unlicensed-nursery",
    categoryColor: "amber",
    image: "https://images.unsplash.com/photo-1586337108541-7d0f50888acd?w=800&h=400&fit=crop",
    content: "<h2>小浜市での認可外園の信頼性確認</h2><p>鯖街道がある小浜市でも、認可外園選びは情報が限定的です。</p><h3>信頼性の確認方法</h3><ul><li>既に利用している親からの口コミ</li><li>SNS上のレビュー確認</li><li>園のウェブサイト・ブログの更新状況</li><li>園見学での親の雰囲気</li></ul><h3>赤信号の兆候</h3><ul><li>不明確な料金体系</li><li>親の参観拒否</li><li>離職率の高い保育士</li><li>給食メニューの貧弱さ</li></ul><h3>契約書確認</h3><p>契約書に保育内容・利用料金・トラブル時の対応が明記されているか確認。</p>",
    publishedAt: "2026-06-01",
    popularity: 33
  },
  {
    slug: "unlicensed-nursery-regulation",
    citySlug: "ono-fukui",
    title: "福井県の認可外保育施設の届出・監視【大野市での規制内容】",
    description: "天空の城がある大野市。福井県の認可外園に関する規制と監視体制。",
    category: "unlicensed-nursery",
    categoryColor: "amber",
    image: "https://images.unsplash.com/photo-1572365992253-3cb3e56dd362?w=800&h=400&fit=crop",
    content: "<h2>福井県の認可外園規制</h2><p>山越前の大野市も福井県の規制に従います。</p><h3>福井県での届出</h3><p>保育児童5人以上の施設は福井県に届出が必須。</p><h3>監視体制</h3><ul><li>毎年の定期立入検査</li><li>抜き打ち検査も実施</li><li>親からの相談・報告への対応</li></ul><h3>問題園への対応</h3><p>改善命令、指導、場合によっては営業停止も。</p><h3>相談先</h3><p>大野市役所保育課または福井県庁への相談が可能。</p>",
    publishedAt: "2026-06-01",
    popularity: 34
  },
  {
    slug: "unlicensed-nursery-transition",
    citySlug: "hidaka",
    title: "認可外園から認可園への転園【日高市での転園手続きと心理的準備】",
    description: "曼珠沙華で有名な日高市。認可外園から認可園への転園時の手続きと子どもの適応。",
    category: "unlicensed-nursery",
    categoryColor: "amber",
    image: "https://images.unsplash.com/photo-1594521802212-f90ffc8f4f2e?w=800&h=400&fit=crop",
    content: "<h2>日高市での認可外→認可園転園</h2><p>埼玉県日高市での転園は、子どもの心理的準備が重要。</p><h3>転園手続き</h3><ul><li>認可園の内定を確認</li><li>認可外園に転園予定日を通知（通常1ヶ月前）</li><li>認可園への提出書類準備</li></ul><h3>子どもの適応支援</h3><ul><li>事前に新しい園を見学</li><li>保育の流れを本人に説明</li><li>友達との別れの準備</li></ul><h3>親の心情</h3><p>認可外園での信頼関係が築かれている場合、親も寂しさを感じることがあります。丁寧な引き継ぎが重要。</p>",
    publishedAt: "2026-06-01",
    popularity: 36
  }
];

registerArticles(articles);
