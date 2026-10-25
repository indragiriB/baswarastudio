import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — Baswara Studio` : "Baswara Studio — Photography in Surakarta";
  }, [title]);
}

/** Kembali ke atas saat pindah halaman, kecuali ada #hash. */
export function useScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);
}

export function useBodyLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}
