import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: 'tono-hoiku-nyusho-guide',
    citySlug: 'tono',
    title: '遠野市の保育施設利用調整ガイド｜保育指数の仕組みと申込み手順',
    description: '岩手県遠野市の認可保育施設への利用申込み手順と保育指数（就労形態別・疾病・障害・介護等）の仕組みを解説します。常勤・パート・自営・農業など多様な就労形態に対応した基準があります。',
    category: '入所ガイド',
    categoryColor: 'blue',
    publishedAt: '2026-06-27',
    popularity: 56,
    content: `
      <h2>遠野市の保育施設利用調整について</h2>
      <p>遠野市では、認可保育施設（保育所・認定こども園等）への利用申込みが定員を超える場合、「遠野市保育所等の利用に関する事務取扱要綱」に基づき、保育指数が高い世帯から優先的に利用できます。</p>

      <h2>申込み手順</h2>
      <ol>
        <li>遠野市子ども・子育て支援担当窓口で相談・申請書類を入手</li>
        <li>必要書類（就労証明書・医師診断書等）を準備</li>
        <li>申込み期間内に書類を提出</li>
        <li>利用調整（入所選考）の結果通知を受け取る</li>
        <li>利用承諾後、施設と利用契約を締結</li>
      </ol>

      <h2>保育指数（選考）の仕組み</h2>
      <p>合計指数 ＝ 父の基準指数 ＋ 母の基準指数 ＋ 調整指数（加算 - 減算）</p>
      <p>父・母それぞれの就労状況・疾病・障害等の基準指数を合算し、世帯の特殊事情（加算・減算）を加減算した合計が高い世帯が優先されます。</p>
      <p>遠野市の特徴として、常勤・パート・自営・農業・内職など多様な就労形態ごとに細かな基準が設けられています。</p>

      <h2>よくある質問</h2>
      <h3>Q: 就労形態によって指数が変わりますか？</h3>
      <p>A: はい。常勤（外勤）・パート（1日7時間以上）・自営（居宅外）主は最高の9点です。農業・自営の協力者は点数が異なります。</p>

      <h3>Q: 農業に従事している場合はどうなりますか？</h3>
      <p>A: 農業の主たる従事者は8点、協力者は6点が基準指数として設定されています。</p>
    `,
  },
  {
    slug: 'tono-hoiku-chosei-index',
    citySlug: 'tono',
    title: '遠野市の保育施設保育指数一覧（就労・疾病・障害・介護等）',
    description: '遠野市の保育施設利用調整に使用する基準指数（常勤・パート・自営・農業・内職・疾病・障害・介護・求職等）と調整指数（ひとり親・保育士・生活保護・育休明け・同居祖父母等）の全一覧です。',
    category: '指数・点数',
    categoryColor: 'amber',
    publishedAt: '2026-06-27',
    popularity: 60,
    content: `
      <h2>遠野市の保育指数について</h2>
      <p>遠野市の保育施設利用調整は「遠野市保育所等の利用に関する事務取扱要綱」に基づきます。</p>

      <h2>基準指数（父・母それぞれに適用）</h2>

      <h3>就労</h3>
      <table>
        <thead><tr><th>就労形態</th><th>条件</th><th>基準指数</th></tr></thead>
        <tbody>
          <tr><td>常勤（外勤）</td><td>-</td><td>9点</td></tr>
          <tr><td>パート等</td><td>1日7時間以上</td><td>9点</td></tr>
          <tr><td>パート等</td><td>1日5〜7時間未満</td><td>7点</td></tr>
          <tr><td>パート等</td><td>1日5時間未満</td><td>6点</td></tr>
          <tr><td>自営（居宅外）主</td><td>-</td><td>9点</td></tr>
          <tr><td>自営（居宅外）協力者</td><td>-</td><td>8点</td></tr>
          <tr><td>自営（家庭内）主</td><td>-</td><td>9点</td></tr>
          <tr><td>自営（家庭内）協力者</td><td>-</td><td>7点</td></tr>
          <tr><td>農業主</td><td>-</td><td>8点</td></tr>
          <tr><td>農業協力者</td><td>-</td><td>6点</td></tr>
          <tr><td>内職</td><td>1日5時間以上</td><td>6点</td></tr>
          <tr><td>内職</td><td>1日5時間未満</td><td>5点</td></tr>
        </tbody>
      </table>

      <h3>出産</h3>
      <table>
        <thead><tr><th>事由</th><th>基準指数</th></tr></thead>
        <tbody>
          <tr><td>出産前後3ヶ月以内</td><td>9点</td></tr>
        </tbody>
      </table>

      <h3>疾病</h3>
      <table>
        <thead><tr><th>区分</th><th>基準指数</th></tr></thead>
        <tbody>
          <tr><td>入院（1ヶ月以上見込み）</td><td>10点</td></tr>
          <tr><td>常時病臥</td><td>10点</td></tr>
          <tr><td>常時安静</td><td>8点</td></tr>
          <tr><td>一般療養</td><td>6点</td></tr>
          <tr><td>定期通院等</td><td>4点</td></tr>
        </tbody>
      </table>

      <h3>障害</h3>
      <table>
        <thead><tr><th>区分</th><th>基準指数</th></tr></thead>
        <tbody>
          <tr><td>手帳1〜2級相当</td><td>10点</td></tr>
          <tr><td>手帳3級相当</td><td>7点</td></tr>
          <tr><td>手帳4級以下</td><td>5点</td></tr>
        </tbody>
      </table>

      <h3>介護・看護</h3>
      <table>
        <thead><tr><th>区分</th><th>基準指数</th></tr></thead>
        <tbody>
          <tr><td>入院付添</td><td>10点</td></tr>
          <tr><td>心身障害者介護</td><td>10点</td></tr>
          <tr><td>寝たきり高齢者介護</td><td>10点</td></tr>
          <tr><td>居宅内介護</td><td>6点</td></tr>
        </tbody>
      </table>

      <h3>その他の事由</h3>
      <table>
        <thead><tr><th>事由</th><th>基準指数</th></tr></thead>
        <tbody>
          <tr><td>災害復旧中</td><td>10点</td></tr>
          <tr><td>就学（在学中）</td><td>7点</td></tr>
          <tr><td>求職活動（就労先確定）</td><td>6点</td></tr>
          <tr><td>求職活動中</td><td>4点</td></tr>
        </tbody>
      </table>

      <h2>調整指数（世帯加算）</h2>
      <table>
        <thead><tr><th>区分</th><th>調整指数</th></tr></thead>
        <tbody>
          <tr><td>ひとり親世帯</td><td>+10点</td></tr>
          <tr><td>生活保護受給世帯</td><td>+5点</td></tr>
          <tr><td>生計中心者が失業中</td><td>+5点</td></tr>
          <tr><td>保育士等の子ども</td><td>+7点</td></tr>
          <tr><td>子どもに障害あり</td><td>+2点</td></tr>
          <tr><td>兄弟姉妹が入所済み</td><td>+2点</td></tr>
          <tr><td>小規模保育卒園児</td><td>+2点</td></tr>
          <tr><td>育児休業明けの復職</td><td>+4点</td></tr>
          <tr><td>兄弟姉妹と同時申込</td><td>+1点</td></tr>
        </tbody>
      </table>

      <h2>調整指数（減算）</h2>
      <table>
        <thead><tr><th>区分</th><th>調整指数</th></tr></thead>
        <tbody>
          <tr><td>65歳未満の同居祖父母が就労していない</td><td>-2点</td></tr>
          <tr><td>月15〜19日の就労</td><td>-1点</td></tr>
          <tr><td>月15日未満の就労</td><td>-2点</td></tr>
        </tbody>
      </table>
    `,
  },
  {
    slug: 'tono-hoiku-keisan-example',
    citySlug: 'tono',
    title: '遠野市の保育指数の計算例｜農業・自営・ひとり親ケース',
    description: '遠野市の保育施設利用調整指数の計算例を紹介します。農業・自営業など遠野市特有の就労形態を含む具体的なシナリオで合計指数を算出します。',
    category: '計算例',
    categoryColor: 'green',
    publishedAt: '2026-06-27',
    popularity: 53,
    content: `
      <h2>遠野市の保育指数の計算方法</h2>
      <p>合計指数 ＝ 父の基準指数 ＋ 母の基準指数 ＋ 調整指数（加算 - 減算）</p>

      <h2>計算例1：共働き（父：常勤、母：パート1日7時間以上）</h2>
      <ul>
        <li>父：常勤（外勤） → <strong>9点</strong></li>
        <li>母：パート等（1日7時間以上） → <strong>9点</strong></li>
        <li>調整指数：特殊事情なし → <strong>0点</strong></li>
        <li><strong>合計：18点</strong></li>
      </ul>

      <h2>計算例2：農家世帯（父：農業主、母：農業協力者）</h2>
      <ul>
        <li>父：農業主 → <strong>8点</strong></li>
        <li>母：農業協力者 → <strong>6点</strong></li>
        <li>調整指数：特殊事情なし → <strong>0点</strong></li>
        <li><strong>合計：14点</strong></li>
      </ul>

      <h2>計算例3：ひとり親世帯（母：常勤外勤）</h2>
      <ul>
        <li>母：常勤（外勤） → <strong>9点</strong></li>
        <li>父：不在 → <strong>0点</strong></li>
        <li>調整指数：ひとり親世帯 → <strong>+10点</strong></li>
        <li><strong>合計：19点</strong></li>
      </ul>

      <h2>計算例4：自営業（父：居宅外主、母：居宅内協力者）・育休明け復職</h2>
      <ul>
        <li>父：自営（居宅外）主 → <strong>9点</strong></li>
        <li>母：自営（家庭内）協力者 → <strong>7点</strong></li>
        <li>調整指数：育児休業明けの復職 → <strong>+4点</strong></li>
        <li><strong>合計：20点</strong></li>
      </ul>

      <h2>注意事項</h2>
      <p>本シミュレーターの結果はあくまで参考値です。詳細は遠野市子ども・子育て支援担当窓口にご確認ください。</p>
    `,
  },
  {
    slug: 'tono-hoiku-faq',
    citySlug: 'tono',
    title: '遠野市の保育施設利用調整FAQ｜農業・自営業の指数はどうなる？',
    description: '遠野市の保育施設利用調整（入所選考）に関するよくある質問をまとめました。農業・自営業など遠野市特有の就労形態に対応した基準指数や調整指数についての疑問点を解消します。',
    category: 'FAQ',
    categoryColor: 'teal',
    publishedAt: '2026-06-27',
    popularity: 50,
    content: `
      <h2>遠野市の保育施設利用調整に関するよくある質問</h2>

      <h3>Q1: 農業に従事している場合の指数はどうなりますか？</h3>
      <p>A: 農業の主たる従事者は8点、協力者（手伝い）は6点が基準指数として設定されています。ただし、月15日未満の農業従事は-2点の減算、月15〜19日は-1点の減算があります。</p>

      <h3>Q2: 自営業（家庭内）の場合はどうなりますか？</h3>
      <p>A: 自営業（家庭内）の主たる従事者は9点、協力者は7点です。居宅外の自営業と比べて協力者の点数が1点低い設定です。</p>

      <h3>Q3: 月の就労日数が少ない場合は影響がありますか？</h3>
      <p>A: 月15〜19日の就労は-1点、月15日未満の就労は-2点の調整減算があります。</p>

      <h3>Q4: ひとり親世帯の加算はどのくらいですか？</h3>
      <p>A: ひとり親世帯には+10点の大きな加算があります。これにより、常勤の母（9点）＋0点（父不在）＋10点（ひとり親加算）= 19点となります。</p>

      <h3>Q5: 保育士の子どもは有利になりますか？</h3>
      <p>A: 保育士等が勤務する保育施設の職員の子どもには+7点の加算があります。</p>

      <h3>Q6: 問い合わせ先はどこですか？</h3>
      <p>A: 遠野市子ども・子育て支援担当窓口にお問い合わせください。</p>
    `,
  },
];

registerArticles(articles);
