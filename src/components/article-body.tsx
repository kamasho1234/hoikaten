import { RandomTextAd } from "./random-text-ad";

// 記事本文の prose スタイル（記事ページ間で共通）
const PROSE_CLASS = `
  prose prose-sm sm:prose-base max-w-none
  prose-headings:font-bold prose-headings:text-foreground
  prose-h2:text-lg prose-h2:mt-12 prose-h2:mb-5 prose-h2:pb-2 prose-h2:border-b prose-h2:border-border
  prose-h3:text-base prose-h3:mt-6 prose-h3:mb-3
  prose-p:text-foreground/85 prose-p:leading-[1.8]
  prose-li:text-foreground/85 prose-li:leading-[1.8]
  prose-strong:text-foreground prose-strong:font-semibold
  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
  prose-blockquote:border-l-4 prose-blockquote:border-primary/30 prose-blockquote:bg-primary/5 prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:my-6
  prose-table:text-sm prose-table:my-6 [&_table]:block [&_table]:overflow-x-auto
  prose-th:bg-muted/60 prose-th:px-4 prose-th:py-2.5 prose-th:text-left prose-th:font-medium
  prose-td:px-4 prose-td:py-2.5 prose-td:border-b prose-td:border-border
  prose-ul:my-4 prose-ol:my-4
  [&_.point-box]:bg-amber-50 [&_.point-box]:border [&_.point-box]:border-amber-200 [&_.point-box]:rounded-xl [&_.point-box]:p-5 [&_.point-box]:my-6
  [&_.point-box_p]:text-amber-900 [&_.point-box_p]:text-sm [&_.point-box_p]:m-0
  [&_.info-box]:bg-blue-50 [&_.info-box]:border [&_.info-box]:border-blue-200 [&_.info-box]:rounded-xl [&_.info-box]:p-5 [&_.info-box]:my-6
  [&_.info-box_p]:text-blue-900 [&_.info-box_p]:text-sm [&_.info-box_p]:m-0
  [&_.warn-box]:bg-red-50 [&_.warn-box]:border [&_.warn-box]:border-red-200 [&_.warn-box]:rounded-xl [&_.warn-box]:p-5 [&_.warn-box]:my-6
  [&_.warn-box_p]:text-red-900 [&_.warn-box_p]:text-sm [&_.warn-box_p]:m-0
  [&_.step]:flex [&_.step]:gap-4 [&_.step]:my-4
  [&_.step-num]:flex-shrink-0 [&_.step-num]:w-8 [&_.step-num]:h-8 [&_.step-num]:rounded-full [&_.step-num]:bg-primary [&_.step-num]:text-primary-foreground [&_.step-num]:flex [&_.step-num]:items-center [&_.step-num]:justify-center [&_.step-num]:text-sm [&_.step-num]:font-bold
  [&_.step-content]:flex-1 [&_.step-content]:pt-1
  [&_.highlight]:bg-yellow-100 [&_.highlight]:px-1 [&_.highlight]:rounded
`;

// 本文を中盤の <h2> 見出し境界で2分割する。見出しが少なく分割できない場合は全体を前半に返す。
function splitAtMiddleHeading(html: string): [string, string] {
  const parts = html.split(/(?=<h2)/);
  if (parts.length < 3) return [html, ""];
  const mid = Math.ceil(parts.length / 2);
  return [parts.slice(0, mid).join(""), parts.slice(mid).join("")];
}

export function ArticleBody({ html }: { html: string }) {
  const [first, second] = splitAtMiddleHeading(html);

  return (
    <article>
      <div className={PROSE_CLASS} dangerouslySetInnerHTML={{ __html: first }} />
      {second && (
        <>
          {/* 記事中盤のテキスト広告 */}
          <RandomTextAd />
          <div className={PROSE_CLASS} dangerouslySetInnerHTML={{ __html: second }} />
        </>
      )}
    </article>
  );
}
