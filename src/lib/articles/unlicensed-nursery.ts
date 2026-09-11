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
    content: "<h2>認可外保育施設の定義</h2><p>碧南市で認可外保育施設を使うときに知っておきたい基本です。市内にどんな施設があるかは市や県が公表する一覧で確かめてください。</p><h3>認可外とは</h3><p>都道府県の認可を受けていない保育施設。届出制度のもとで運営。</p><h3>認可園との違い</h3><ul><li>保育士の資格基準が異なる</li><li>営業時間が長い（夜間・早朝対応）</li><li>保育料は園が決める（無償化の対象になる場合がある）</li></ul><h3>選択の理由</h3><p>待機児童の受け皿、夜勤対応など、認可園では対応できない保育ニーズに対応。</p>",
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
    content: "<h2>新城市の認可外園の質評価</h2><p>認可外保育施設は園ごとの差が大きいので、見学で確かめることが大切です。</p><h3>質の良い園の特徴</h3><ul><li>保育士が充分に配置されている</li><li>遊び場が清潔で広い</li><li>親への連絡が丁寧</li><li>定期的な情報公開</li></ul><h3>園見学時のチェック項目</h3><ul><li>[ ] 保育室の清潔さ</li><li>[ ] おもちゃの数と状態</li><li>[ ] 保育士の雰囲気</li><li>[ ] 給食メニュー</li></ul><h3>経営安定性</h3><p>園の経営年数と親の満足度を確認することが重要。</p>",
    publishedAt: "2026-06-01",
    popularity: 46
  },
  {
    slug: "unlicensed-nursery-cost",
    citySlug: "tsushima",
    title: "認可外保育料と実際の費用【津島市で見比べるときの項目】",
    description: "津島市の認可外園の保育料。認可園との料金比較と隠れた費用。",
    category: "unlicensed-nursery",
    categoryColor: "amber",
    image: "https://images.unsplash.com/photo-1610647752706-d53f3b16df95?w=800&h=400&fit=crop",
    content: "<h2>津島市の認可外保育料</h2><p>認可外保育施設の保育料は園が決めるため、津島市でも園ごとに違います。ここに金額は書きません。</p><h3>見比べる項目</h3><ul><li>月額保育料（年齢と利用時間で変わる）</li><li>延長料金の単位</li><li>無償化の対象施設かどうか（対象なら3〜5歳は月3.7万円、0〜2歳の非課税世帯は月4.2万円まで補助）</li></ul><h3>月額以外の費用</h3><ul><li>入園料</li><li>給食費・おやつ代</li><li>おむつ・寝具などの実費</li></ul><h3>公開情報の確認</h3><p>料金表は園に直接もらってください。無償化の対象かどうかは市の一覧で確かめられます。</p>",
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
    content: "<h2>愛西市の夜間保育対応園</h2><p>蓮根産地の愛西市でも、早朝や夜間、休日の勤務がある家庭は認可園の開所時間だけでは足りないことがあります。</p><h3>確かめる項目</h3><ul><li>開所時間と延長の上限</li><li>休日保育の有無</li><li>夜間の受け入れがあるか</li></ul><h3>利用料金</h3><p>夜間や休日は別料金になるのが一般的です。単価は園ごとに違います。</p><h3>対応園の見つけ方</h3><p>愛知県と市が公表する認可外保育施設の一覧で開所時間を確かめ、園に直接問い合わせてください。</p>",
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
    content: "<h2>清須市の認可外補助制度</h2><p>清洲城がある清須市でも、国の幼児教育・保育の無償化により、認可外保育施設の利用料が一定額まで補助されます。市独自の上乗せがあるかは市のサイトで確かめてください。</p><h3>無償化の対象</h3><ul><li>3〜5歳児：月3.7万円まで</li><li>0〜2歳児：住民税非課税世帯に限り月4.2万円まで</li><li>保育の必要性の認定を市から受けていること</li></ul><h3>対象施設</h3><p>都道府県に届出があり、国の指導監督基準を満たす施設が対象です。市が一覧を公表しています。</p><h3>申請手続き</h3><p>先に市で「保育の必要性」の認定を受け、利用後に領収書などを添えて市に請求します。締切は市の案内で確かめてください。</p>",
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
    content: "<h2>岩倉市の認可外園安全確認</h2><p>五条川沿いの岩倉市でも、認可外園の安全管理は親の責任で確認が必須。</p><h3>確認項目</h3><ul><li>[ ] 保育施設として届出されているか</li><li>[ ] 定期的な防火訓練の実施</li><li>[ ] 緊急連絡体制の確認</li><li>[ ] 保育士の資格確認</li><li>[ ] 感染症対策マニュアル</li></ul><h3>安全基準</h3><p>認可外保育施設にも国の指導監督基準があり、都道府県が立入調査をします。基準を満たしているかの証明書を園に確かめてください。</p><h3>問題時の相談先</h3><p>岩倉市保育課または愛知県庁への報告・相談が可能。</p>",
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
    content: "<h2>坂井市での待機児童対応</h2><p>福井県坂井市でも、認可園に入れるまでのあいだ認可外保育施設を使う家庭があります。</p><h3>利用パターン</h3><ul><li>認可園内定まで認可外園で対応</li><li>兄弟が別園の場合、下の子を認可外園で</li></ul><h3>費用負担</h3><p>通常、両園の料金を両方支払うことになります。</p><h3>転園時の注意</h3><p>認可園内定後の転園は、認可外園への事前連絡が重要。</p><h3>選べる施設の数</h3><p>認可外保育施設の数は地域で大きく違います。坂井市内と近隣の施設は県が公表する一覧で確かめてください。</p>",
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
    content: "<h2>小浜市での認可外園の信頼性確認</h2><p>鯖街道がある小浜市でも、認可外保育施設は見学と聞き取りで確かめるのが基本です。</p><h3>信頼性の確認方法</h3><ul><li>既に利用している親からの口コミ</li><li>SNS上のレビュー確認</li><li>園のウェブサイト・ブログの更新状況</li><li>園見学での親の雰囲気</li></ul><h3>赤信号の兆候</h3><ul><li>不明確な料金体系</li><li>親の参観拒否</li><li>離職率の高い保育士</li><li>給食メニューの貧弱さ</li></ul><h3>契約書確認</h3><p>契約書に保育内容・利用料金・トラブル時の対応が明記されているか確認。</p>",
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
    content: "<h2>福井県の認可外園規制</h2><p>奥越の大野市の認可外保育施設も、児童福祉法にもとづく福井県の指導監督を受けます。</p><h3>届出</h3><p>認可外保育施設は原則としてすべて都道府県への届出が必要です（一部の例外を除く）。届出済みの施設は県が一覧を公表しています。</p><h3>監視体制</h3><ul><li>国の指導監督基準にもとづく立入調査</li><li>基準を満たす施設への証明書の交付</li><li>利用者からの相談への対応</li></ul><h3>問題園への対応</h3><p>改善の指導や勧告が行われ、従わない場合は事業停止や施設閉鎖の命令もあります。</p><h3>相談先</h3><p>大野市役所保育課または福井県庁への相談が可能。</p>",
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
    content: "<h2>日高市での認可外→認可園転園</h2><p>埼玉県日高市での転園は、子どもの心理的準備が重要。</p><h3>転園手続き</h3><ul><li>認可園の内定を確認</li><li>認可外園に退園の予定を伝える（契約で決めた期限までに）</li><li>認可園への提出書類準備</li></ul><h3>子どもの適応支援</h3><ul><li>事前に新しい園を見学</li><li>保育の流れを本人に説明</li><li>友達との別れの準備</li></ul><h3>親の心情</h3><p>認可外園での信頼関係が築かれている場合、親も寂しさを感じることがあります。丁寧な引き継ぎが重要。</p>",
    publishedAt: "2026-06-01",
    popularity: 36
  }
];

registerArticles(articles);
