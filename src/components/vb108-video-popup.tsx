"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// VULKIT VB108 の動画ポップアップ広告
//
// ## いつ出すか
// サイトに来てから 10秒後・60秒後・120秒後、以後 60秒ごと（180秒・240秒…）。
// 起点はページ単位ではなく**サイトに着いた時刻**。ページを移るたびに数え直すと
// ページごとに出て煩わしいため。起点と表示済みの回は sessionStorage に持ち、
// タブを閉じるまで引き継ぐ（読めない環境ではページ単位で動く）。
// 開いている間は次の回を数えず、閉じてから次の予定時刻を待つ。
//
// ## 閉じ方
// 出てから 3秒は閉じられない。3秒たつと × ボタンが出て、× ・背景クリック・Esc で閉じる。
//
// ## 何を出すか
// public/media/vb108-*.mp4（480×854・24fps・音声なし・各1.4〜2.5MB）から毎回ランダムに1本。
// 直前に出した動画は sessionStorage に持ち、同じ動画が2回続けて出ないようにする。
// 自動再生はミュートでないとブラウザが止めるので、音声は最初から外してある。
// **置き場所と名前に ads / banner / popup を入れない**（広告ブロッカーが止める）。
// 読み込みに失敗したときは閉じる（その回は表示済みとして数える）。
//
// ## 広告であることを出す
// 枠の中に「PR」を出し、リンクには rel="sponsored" を付ける。

const LINK_URL = "https://vulkit.kamacrafy.com/VB108";

const VIDEOS = [1, 2, 3, 4].map((n) => ({
  src: `/media/vb108-${n}.mp4`,
  poster: `/media/vb108-${n}.webp`,
}));

/** 何秒後に閉じるボタンを出すか */
const CLOSABLE_AFTER_MS = 3000;

/** n 回目（0始まり）を出す時刻（サイトに来てからの秒数）。10, 60, 120, 180, 240… */
function dueSeconds(n: number): number {
  return n === 0 ? 10 : 60 * n;
}

const STORAGE_START = "hoikaten.vb108.start";
const STORAGE_SHOWN = "hoikaten.vb108.shown";
const STORAGE_LAST = "hoikaten.vb108.last";

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

/** 表示済みの回数 */
function shownCount(): number {
  const n = Number(readStorage(STORAGE_SHOWN));
  return Number.isInteger(n) && n >= 0 ? n : 0;
}

/** ランダムに1本選ぶ。直前に出した動画は除く */
function pickVideo(): number {
  const last = Number(readStorage(STORAGE_LAST));
  const choices = VIDEOS.map((_, i) => i).filter((i) => i !== last);
  return choices[Math.floor(Math.random() * choices.length)];
}

export function Vb108VideoPopup() {
  /** 出している動画の番号。null のときは閉じている */
  const [videoIndex, setVideoIndex] = useState<number | null>(null);
  const [closable, setClosable] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const open = videoIndex !== null;

  const close = useCallback(() => {
    setVideoIndex(null);
    setClosable(false);
  }, []);

  const tryClose = useCallback(() => {
    if (closable) close();
  }, [closable, close]);

  // 次の回を予約する。開いている間は予約しない（閉じるとこの effect が走り直す）
  useEffect(() => {
    if (open) return;
    const start = siteStartedAt();
    const index = shownCount();
    const timer = setTimeout(() => {
      // タブが裏にいる間にタイマーが遅れて、過ぎた回が2つ以上たまることがある。
      // そのときは続けて出さず、過ぎた回をまとめて1回ぶんにする
      const now = Date.now();
      let next = index + 1;
      while (start + dueSeconds(next) * 1000 <= now) next++;
      writeStorage(STORAGE_SHOWN, String(next));
      setClosable(false);
      const picked = pickVideo();
      writeStorage(STORAGE_LAST, String(picked));
      setVideoIndex(picked);
    }, Math.max(0, start + dueSeconds(index) * 1000 - Date.now()));
    return () => clearTimeout(timer);
  }, [open]);

  // 出てから3秒たったら閉じられるようにする
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => setClosable(true), CLOSABLE_AFTER_MS);
    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (closable) closeButtonRef.current?.focus();
  }, [closable]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") tryClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, tryClose]);

  if (videoIndex === null) return null;
  const video = VIDEOS[videoIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="広告"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      onClick={tryClose}
    >
      <div
        className="relative w-full max-w-[min(320px,calc((100dvh-6rem)*9/16))] rounded-2xl bg-white p-2 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="absolute left-4 top-4 z-10 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white">
          PR
        </span>
        {closable && (
          <button
            ref={closeButtonRef}
            type="button"
            onClick={close}
            aria-label="閉じる"
            className="absolute -right-3 -top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-foreground shadow-md hover:bg-muted transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        )}
        <a href={LINK_URL} rel="sponsored noopener" target="_blank" className="block">
          <video
            key={video.src}
            src={video.src}
            poster={video.poster}
            width={480}
            height={854}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onError={close}
            className="block aspect-[9/16] h-auto w-full rounded-xl bg-black object-cover"
          />
          <span className="mt-2 block rounded-xl bg-primary py-2.5 text-center text-sm font-bold text-primary-foreground">
            VULKIT VB108 を見る
          </span>
        </a>
      </div>
    </div>
  );
}
