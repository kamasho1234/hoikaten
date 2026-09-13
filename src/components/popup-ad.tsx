"use client";

import { useCallback, useEffect, useState } from "react";

// 保険の無料相談（ベビープラネット）のポップアップ広告
//
// ## いつ出すか
// サイトに来てから 20秒後・1分30秒後・3分後 の3回。
// 「来てから」の起点はページ単位ではなく**サイトに着いた時刻**にしている。
// ページを移るたびに数え直すと、ページごとに3回ずつ出て煩わしいため。
// 起点と表示済みの回は sessionStorage に持ち、タブを閉じるまで引き継ぐ
// （読めない環境ではページ単位で動く）。
//
// ## 何を出すか
// 5枚の画像（public/ads/babyplanet-*.webp、800×800）から毎回ランダムに1枚。
// 押すと A8.net の広告リンクへ飛ぶ。閉じるボタンと背景クリック、Esc で閉じる。
//
// ## 広告であることを必ず出す
// 景品表示法のステルスマーケティング告示に従い、枠の中に「PR」を出し、
// リンクには rel="sponsored nofollow" を付けている（babyplanet-cta.tsx と同じ）。
//
// ## 計測用の画像について
// A8.net の 1×1 画像はインプレッションの計測用。ポップアップを出したときだけ描く。

/** A8.net の広告リンク（ポップアップ用のマテリアル） */
const POPUP_URL = "https://px.a8.net/svt/ejp?a8mat=4B1ILN+8L01AA+503M+5YZ77";
/** インプレッション計測用 */
const POPUP_PIXEL = "https://www12.a8.net/0.gif?a8mat=4B1ILN+8L01AA+503M+5YZ77";

/** サイトに来てから何秒後に出すか */
const SHOW_AFTER_SECONDS = [20, 90, 180];

const IMAGES = [1, 2, 3, 4, 5].map((n) => `/ads/babyplanet-${n}.webp`);

const STORAGE_START = "hoikaten.popupAd.start";
const STORAGE_SHOWN = "hoikaten.popupAd.shown";

/** sessionStorage は私的ブラウズなどで例外を投げることがあるので、読めなければ無いものとして扱う */
function readStorage(key: string): string | null {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string) {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // 保存できなくても表示はする
  }
}

/** サイトに着いた時刻。無ければ今を記録する */
function siteStartedAt(): number {
  const saved = Number(readStorage(STORAGE_START));
  if (Number.isFinite(saved) && saved > 0) return saved;
  const now = Date.now();
  writeStorage(STORAGE_START, String(now));
  return now;
}

/** 表示済みの回数（0〜3） */
function shownCount(): number {
  const n = Number(readStorage(STORAGE_SHOWN));
  return Number.isInteger(n) && n >= 0 ? Math.min(n, SHOW_AFTER_SECONDS.length) : 0;
}

export function PopupAd() {
  const [image, setImage] = useState<string | null>(null);

  const close = useCallback(() => setImage(null), []);

  useEffect(() => {
    // 開いている間は次の回を予約しない（閉じたときにこの effect が走り直して予約する）
    if (image) return;
    const start = siteStartedAt();
    let timer: ReturnType<typeof setTimeout> | undefined;

    const schedule = () => {
      const index = shownCount();
      if (index >= SHOW_AFTER_SECONDS.length) return;
      const dueAt = start + SHOW_AFTER_SECONDS[index] * 1000;
      timer = setTimeout(() => {
        // タブが裏にいる間にタイマーが遅れて、期限の過ぎた回が2つ以上たまることがある。
        // そのときは続けて出さず、過ぎた回をまとめて1回ぶんにする
        const now = Date.now();
        let next = index + 1;
        while (next < SHOW_AFTER_SECONDS.length && start + SHOW_AFTER_SECONDS[next] * 1000 <= now) {
          next++;
        }
        writeStorage(STORAGE_SHOWN, String(next));
        setImage(IMAGES[Math.floor(Math.random() * IMAGES.length)]);
      }, Math.max(0, dueAt - Date.now()));
    };

    schedule();
    return () => {
      if (timer !== undefined) clearTimeout(timer);
    };
    // 閉じたら次の回を予約する
  }, [image]);

  useEffect(() => {
    if (!image) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [image, close]);

  if (!image) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="広告"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      onClick={close}
    >
      <div
        className="relative w-full max-w-[400px] rounded-2xl bg-white p-2 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="absolute left-3 top-3 z-10 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white">
          PR
        </span>
        <button
          type="button"
          onClick={close}
          aria-label="閉じる"
          className="absolute -right-3 -top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-foreground shadow-md hover:bg-muted transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <a href={POPUP_URL} rel="sponsored nofollow noopener" target="_blank" className="block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt="「ママ」のための保険無料相談サービス【ベビープラネット】"
            width={800}
            height={800}
            className="block h-auto w-full rounded-xl"
          />
        </a>
        {/* インプレッション計測用（表示されない） */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={POPUP_PIXEL} alt="" width={1} height={1} className="hidden" />
      </div>
    </div>
  );
}
