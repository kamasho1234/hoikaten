"use client";

import { RandomAd } from "./random-ad";

export function FullScreenAd({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-3xl leading-none hover:opacity-80"
          aria-label="閉じる"
        >
          ×
        </button>
        <RandomAd />
      </div>
    </div>
  );
}
