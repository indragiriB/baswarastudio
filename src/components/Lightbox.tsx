import { useCallback, useEffect, useRef } from "react";
import type { Photo } from "../data/site";
import { useBodyLock } from "../hooks";

interface Props {
  photos: Photo[];
  index: number;
  onIndexChange: (next: number) => void;
  onClose: () => void;
}

export default function Lightbox({ photos, index, onIndexChange, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const total = photos.length;
  const photo = photos[index];
  useBodyLock(true);

  const go = useCallback(
    (d: number) => onIndexChange((index + d + total) % total),
    [index, total, onIndexChange],
  );

  useEffect(() => closeRef.current?.focus(), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  useEffect(() => {
    [1, -1].forEach((d) => {
      new Image().src = photos[(index + d + total) % total].src;
    });
  }, [index, photos, total]);

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      }}
    >
      <div className="lightbox__bar">
        <span className="lightbox__count">
          Frame {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <button ref={closeRef} type="button" className="lightbox__text-btn" onClick={onClose}>
          Close
        </button>
      </div>

      <figure className="lightbox__figure">
        <img key={photo.src} src={photo.src} alt={photo.alt} />
      </figure>

      <div className="lightbox__nav">
        <button type="button" className="lightbox__text-btn" onClick={() => go(-1)}>
          Previous
        </button>
        <button type="button" className="lightbox__text-btn" onClick={() => go(1)}>
          Next
        </button>
      </div>
    </div>
  );
}
