import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule-hekinan-jan",
    citySlug: "hekinan",
    title: "碧南市の保活スケジュール完全ガイド【2026年1月申込期限】",
    description: "碧南市での認可保育園入園に向けた申込期限、必要書類の準備、面接日程などのスケジュールを詳しく解説します。",
    category: "hokatsu-schedule",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1564629238-27cffbabd5f1?w=800&h=400&fit=crop",
    content: "<h2>碧南市保活スケジュール</h2><p>碧南市は愛知県三河地方の工業都市です。認可保育園の入園申込は例年12月に開始されます。</p><h3>申込期限</h3><p>1月末日が一般的な申込期限となっています。</p><h3>必要書類</h3><ul><li>入園申請書</li><li>就労証明書</li><li>住民票抄本</li></ul><h3>通知時期</h3><p>2月中旬から下旬に結果が通知されます。</p>",
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
    content: "<h2>新城市の保活タイムライン</h2><p>新城市は長篠の戦いで有名な奥三河地域にあります。</p><h3>事前準備期間</h3><p>9月から10月にかけて市役所の相談会が開催されます。</p><h3>申込受付期間</h3><p>11月から12月中旬までが申込受付期間です。</p><h3>書類準備のポイント</h3><p>勤務地が市外の場合は交通証明も必要になることがあります。</p>",
    publishedAt: "2026-06-01",
    popularity: 38
  },
  {
    slug: "hokatsu-schedule-tsushima-wait",
    citySlug: "tsushima",
    title: "津島市の保活：待機児童が多い時期への対応",
    description: "津島市は待機児童が多いエリア。複数園への申込とスケジュール管理が重要です。",
    category: "hokatsu-schedule",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1610647752706-d53f3b16df95?w=800&h=400&fit=crop",
    content: "<h2>津島市の待機児童対策</h2><p>津島神社と天王祭で有名な津島市は、都市部への通勤者が多く待機児童が発生しやすい地域です。</p><h3>複数園への申込戦略</h3><p>第1希望から第5希望まで複数園に申し込むことが強く推奨されます。</p><h3>待機児童解消の動き</h3><p>2026年も新規保育園の整備が進行中です。</p>",
    publishedAt: "2026-06-01",
    popularity: 45
  },
  {
    slug: "hokatsu-schedule-aisai-lotterу",
    citySlug: "aisai",
    title: "愛西市の保活：蓮根産地の保育園事情",
    description: "愛西市の保育園申込とカード抽選制度について。蓮根産地の食農体験も特徴です。",
    category: "hokatsu-schedule",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1606159376253-59a8b81ddb00?w=800&h=400&fit=crop",
    content: "<h3>愛西市の保活カレンダー</h3><p>蓮根の大産地である愛西市では、地元農業と連携した食育が保育園の特徴です。</p><h3>カード抽選制度</h3><p>複数希望者が多い場合はカード抽選で決定されることがあります。</p><h3>申込から内定まで</h3><p>約3ヶ月のスケジュールで進行します。</p>",
    publishedAt: "2026-06-01",
    popularity: 40
  },
  {
    slug: "hokatsu-schedule-kiyosu-early",
    citySlug: "kiyosu",
    title: "清須市保活：織田信長ゆかりの地での保育園申込",
    description: "清須市は清洲城と織田信長で有名。駅前再開発地域の保活事情を解説します。",
    category: "hokatsu-schedule",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1552521516-97e5c766a6fe?w=800&h=400&fit=crop",
    content: "<h2>清須市の早期申込のメリット</h2><p>清洲城がある清須市は、織田信長ゆかりの地として知られています。</p><h3>駅前再開発での新園</h3><p>近年、駅前再開発地域に新しい保育園が次々と開園しています。</p><h3>申込スケジュール</h3><p>早期申込で加点される制度があります。</p>",
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
    content: "<h2>岩倉市での保活ポイント</h2><p>五条川の桜で有名な岩倉市。春の環境は子どもたちの成長に最適です。</p><h3>保育園の立地条件</h3><p>五条川沿いの公園散歩が充実している保育園が多いです。</p><h3>申込から内定までの期間</h3><p>通常は8週間程度です。</p>",
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
    content: "<h2>坂井市の保活ガイド</h2><p>東尋坊や丸岡城がある坂井市。観光地としての知名度は高いですが、保活情報は限定的です。</p><h3>福井県の入園方針</h3><p>愛知県との制度が異なります。事前の確認が重要です。</p><h3>書類準備</h3><p>福井県特有の様式があります。</p>",
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
    content: "<h2>小浜市での保活</h2><p>若狭塗箸と鯖街道で有名な小浜市。伝統工芸を体験できる保育園もあります。</p><h3>地域の特色</h3><p>日本遺産の認定地として、文化体験が豊富です。</p><h3>保活の流れ</h3><p>福井県の標準的なスケジュールに沿って進みます。</p>",
    publishedAt: "2026-06-01",
    popularity: 34
  },
  {
    slug: "hokatsu-schedule-ono-fukui-castle",
    citySlug: "ono-fukui",
    title: "大野市保活：天空の城越前大野城がそびえるエリア",
    description: "大野市の保育園申込スケジュール。雲の上の城で有名な山越前地方での保活。",
    category: "hokatsu-schedule",
    categoryColor: "green",
    image: "https://images.unsplash.com/photo-1572365992253-3cb3e56dd362?w=800&h=400&fit=crop",
    content: "<h2>大野市保活ガイド</h2><p>天空の城越前大野城で知られる大野市。山間部での保活特有の課題があります。</p><h3>交通アクセス</h3><p>保育園までの送迎ルートの確認が重要です。</p><h3>申込期間</h3><p>12月から1月が申込期間です。</p>",
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
    content: "<h2>日高市保活スケジュール</h2><p>埼玉県日高市は巾着田の曼珠沙華で秋に有名です。自然豊かなエリアでの保活です。</p><h3>埼玉県の特色</h3><p>東京への通勤者が多いため、通園路の選択が重要です。</p><h3>申込から内定まで</h3><p>6週間程度で結果が通知されます。</p>",
    publishedAt: "2026-06-01",
    popularity: 37
  }
];

registerArticles(articles);
