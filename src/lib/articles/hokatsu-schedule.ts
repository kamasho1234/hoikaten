import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule-hekinan-jan",
    citySlug: "hekinan",
    title: "碧南市の保活スケジュール【申込期限の確かめ方】",
    description: "碧南市で4月入園を目指すときの大まかな流れ。日付は市の案内で確かめる前提で、何をいつ始めるかを整理します。",
    category: "hokatsu-schedule",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1564629238-27cffbabd5f1?w=800&h=400&fit=crop",
    content: "<h2>碧南市保活スケジュール</h2><p>碧南市は愛知県西三河の製造業のまちです。4月入園の一次申込は多くの自治体で秋から冬にかけて受け付けますが、碧南市の日程は年度ごとに市が公表します。</p><h3>申込期限</h3><p>ここに日付は書きません。市の申込案内で一次・二次の締切を確かめてください。</p><h3>必要書類</h3><ul><li>入園申請書</li><li>就労証明書</li><li>住民票抄本</li></ul><h3>通知時期</h3><p>一次の結果は年明けから2月ごろに通知する自治体が多いですが、碧南市の時期は申込案内で確かめてください。</p>",
    publishedAt: "2026-06-01",
    popularity: 42
  },
  {
    slug: "hokatsu-schedule-shinshiro-sep",
    citySlug: "shinshiro",
    title: "新城市保活スケジュール：奥三河での入園計画",
    description: "新城市の保育園入園申込から内定まで。奥三河特有の保活流れと準備時間を解説します。",
    category: "hokatsu-schedule",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&h=400&fit=crop",
    content: "<h2>新城市の保活タイムライン</h2><p>新城市は長篠の戦いで有名な奥三河地域にあります。</p><h3>事前準備</h3><p>夏から秋にかけて園を見学し、就労証明書を勤務先に依頼しておくと、受付が始まってから慌てません。</p><h3>申込受付期間</h3><p>4月入園の一次申込は秋から冬にかけて受け付ける自治体が多いですが、新城市の日程は年度ごとに市が公表します。ここに日付は書きません。</p><h3>書類準備のポイント</h3><p>勤務地が市外でも、必要なのは就労証明書です。通勤の証明を別に求めるかは市の申込案内で確かめてください。</p>",
    publishedAt: "2026-06-01",
    popularity: 38
  },
  {
    slug: "hokatsu-schedule-tsushima-wait",
    citySlug: "tsushima",
    title: "津島市の保活：希望園をどう並べるか",
    description: "津島市で希望園を複数書くときの考え方と、申込の時期。",
    category: "hokatsu-schedule",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1610647752706-d53f3b16df95?w=800&h=400&fit=crop",
    content: "<h2>津島市の保活</h2><p>津島神社と天王祭で有名な津島市は、名古屋方面へ通勤する家庭も多いまちです。空きの状況は園と年齢で違うので、市が公表する空き状況を見てから希望園を決めましょう。</p><h3>希望園は複数書く</h3><p>希望できる園の数は市の申込書で決まっています。上限まで書いておくと、第1希望が埋まっていても内定の可能性が残ります。</p><h3>時期</h3><p>4月入園の一次申込は秋から冬にかけて受け付ける自治体が多いですが、津島市の日程は年度ごとに市が公表します。</p>",
    publishedAt: "2026-06-01",
    popularity: 45
  },
  {
    slug: "hokatsu-schedule-aisai-lottery",
    citySlug: "aisai",
    title: "愛西市の保活：蓮根産地の保育園事情",
    description: "愛西市の保育園申込の流れ。同じ点数で並んだときの決め方は市の基準表で確かめます。",
    category: "hokatsu-schedule",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1606159376253-59a8b81ddb00?w=800&h=400&fit=crop",
    content: "<h3>愛西市の保活カレンダー</h3><p>蓮根の大産地である愛西市では、地元農業と連携した食育が保育園の特徴です。</p><h3>点数が並んだとき</h3><p>愛西市は父母の基準指数を合算し（各10点・世帯20点が上限）、そこに調整指数を足し引きして順位を決めます。同点のときの決め方は市の利用基準表の注記で確かめてください。</p><h3>申込から内定まで</h3><p>一次申込から結果の通知までは数か月かかるのが一般的です。愛西市の日程は年度ごとに市が公表します。</p>",
    publishedAt: "2026-06-01",
    popularity: 40
  },
  {
    slug: "hokatsu-schedule-kiyosu-early",
    citySlug: "kiyosu",
    title: "清須市保活：織田信長ゆかりの地での保育園申込の流れ",
    description: "清須市は清洲城と織田信長で有名。申込の流れと、早く動く意味を整理します。",
    category: "hokatsu-schedule",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1552521516-97e5c766a6fe?w=800&h=400&fit=crop",
    content: "<h2>清須市の保活の流れ</h2><p>清洲城がある清須市は、織田信長ゆかりの地として知られています。</p><h3>園の情報を集める</h3><p>市が公表する園の一覧と空き状況を見て、通勤経路に合う園を見学しておきましょう。</p><h3>申込スケジュール</h3><p>申込の早さで加点する項目は清須市の入園基準指数表にありません。早く動く意味は、就労証明書などの書類を期限までにそろえることにあります。日程は年度ごとに市が公表します。</p>",
    publishedAt: "2026-06-01",
    popularity: 43
  },
  {
    slug: "hokatsu-schedule-iwakura-priority",
    citySlug: "iwakura",
    title: "岩倉市保活：五条川の桜で有名なエリアの入園事情",
    description: "岩倉市の保活でのポイント。五条川沿いの環境と保育園の立地条件について。",
    category: "hokatsu-schedule",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=400&fit=crop",
    content: "<h2>岩倉市での保活ポイント</h2><p>五条川の桜で有名な岩倉市。春の環境は子どもたちの成長に最適です。</p><h3>保育園の立地条件</h3><p>五条川沿いの公園散歩が充実している保育園が多いです。</p><h3>申込から内定までの期間</h3><p>一次申込から結果の通知までは数か月かかるのが一般的です。岩倉市の日程は年度ごとに市が公表します。</p>",
    publishedAt: "2026-06-01",
    popularity: 39
  },
  {
    slug: "hokatsu-schedule-sakai-fukui-transit",
    citySlug: "sakai-fukui",
    title: "坂井市保活：福井県東尋坊・丸岡城エリアの保育事情",
    description: "坂井市の保活スケジュール。観光地として有名なエリアでの保育園申込の流れ。",
    category: "hokatsu-schedule",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=400&fit=crop",
    content: "<h2>坂井市の保活ガイド</h2><p>東尋坊や丸岡城がある坂井市。観光地としての知名度は高いですが、保活情報は限定的です。</p><h3>申込の流れ</h3><p>市の様式で申し込み、定員を超えた園は坂井市の基準表で順位を決めます。日程は年度ごとに市が公表します。</p><h3>書類準備</h3><p>様式は坂井市のものを使います。転入前の自治体の様式は使えません。</p>",
    publishedAt: "2026-06-01",
    popularity: 36
  },
  {
    slug: "hokatsu-schedule-obama-maritime",
    citySlug: "obama",
    title: "小浜市保活：若狭塗箸と鯖街道の町での入園方針",
    description: "小浜市の保育園入園申込。若狭塗箸の職人技が生きた保育環境。",
    category: "hokatsu-schedule",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1586337108541-7d0f50888acd?w=800&h=400&fit=crop",
    content: "<h2>小浜市での保活</h2><p>若狭塗箸と鯖街道で有名な小浜市。園ごとの特色は見学で確かめましょう。</p><h3>地域の特色</h3><p>日本遺産の認定地として、文化体験が豊富です。</p><h3>保活の流れ</h3><p>4月入園の一次申込は秋から冬にかけて受け付ける自治体が多いですが、小浜市の日程は年度ごとに市が公表します。</p>",
    publishedAt: "2026-06-01",
    popularity: 34
  },
  {
    slug: "hokatsu-schedule-ono-fukui-castle",
    citySlug: "ono-fukui",
    title: "大野市保活：天空の城越前大野城がそびえるエリア",
    description: "大野市の保育園申込スケジュール。天空の城で有名な奥越での保活。",
    category: "hokatsu-schedule",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1572365992253-3cb3e56dd362?w=800&h=400&fit=crop",
    content: "<h2>大野市保活ガイド</h2><p>天空の城越前大野城で知られる大野市。山間部での保活特有の課題があります。</p><h3>交通アクセス</h3><p>保育園までの送迎ルートの確認が重要です。</p><h3>申込期間</h3><p>4月入園の一次申込は秋から冬にかけて受け付ける自治体が多いですが、大野市の日程は年度ごとに市が公表します。ここに日付は書きません。</p>",
    publishedAt: "2026-06-01",
    popularity: 33
  },
  {
    slug: "hokatsu-schedule-hidaka-saitama-spring",
    citySlug: "hidaka",
    title: "日高市保活：巾着田の曼珠沙華が咲くエリアでの保育園申込",
    description: "日高市の保活。曼珠沙華で有名な巾着田がある埼玉県日高市での保育園入園申込について。",
    category: "hokatsu-schedule",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1594521802212-f90ffc8f4f2e?w=800&h=400&fit=crop",
    content: "<h2>日高市保活スケジュール</h2><p>埼玉県日高市は巾着田の曼珠沙華で秋に有名です。自然豊かなエリアでの保活です。</p><h3>埼玉県の特色</h3><p>東京への通勤者が多いため、通園路の選択が重要です。</p><h3>申込から内定まで</h3><p>一次申込から結果の通知までは数か月かかるのが一般的です。日高市の日程は年度ごとに市が公表します。</p>",
    publishedAt: "2026-06-01",
    popularity: 37
  }
];

registerArticles(articles);
