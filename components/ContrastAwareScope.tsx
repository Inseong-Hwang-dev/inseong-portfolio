"use client";

import { sampleBgLuma, subscribeBgFrame } from "@/lib/bgLuminance";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

/** Block-level prose + page chrome — no need to wrap each MDX node. */
export const DEFAULT_CONTRAST_SELECTOR = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "li",
  "blockquote",
  "td",
  "th",
  "pre"
].join(", ");

type ContrastAwareScopeProps = {
  children: React.ReactNode;
  className?: string;
  /** CSS selector for elements that flip colour under dark bg patches. */
  selector?: string;
  threshold?: number;
};

/**
 * Auto-applies contrast-aware classes to matching text blocks inside the scope.
 * Use once around a blog article / page — no per-element wrappers or MDX edits.
 */
export default function ContrastAwareScope({
  children,
  className = "",
  selector = DEFAULT_CONTRAST_SELECTOR,
  threshold = 0.52
}: ContrastAwareScopeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef(new WeakMap<HTMLElement, boolean>());
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const clearEl = (el: HTMLElement) => {
      stateRef.current.set(el, false);
      el.classList.remove("contrast-aware--on-dark");
      el.dataset.onDark = "false";
    };

    const prepare = (el: HTMLElement) => {
      el.classList.add("contrast-aware", "contrast-aware--text");
      if (!el.dataset.onDark) el.dataset.onDark = "false";
    };

    const collect = () => {
      const list = Array.from(root.querySelectorAll<HTMLElement>(selector));
      list.forEach(prepare);
      return list;
    };

    let targets = collect();

    if (!isLight) {
      targets.forEach(clearEl);
      return;
    }

    const mo = new MutationObserver(() => {
      targets = collect();
    });
    mo.observe(root, { childList: true, subtree: true });

    let raf = 0;
    let pending = false;

    const unsubscribe = subscribeBgFrame((timeSec, isDarkTheme) => {
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(() => {
        pending = false;

        if (isDarkTheme) {
          targets.forEach(clearEl);
          return;
        }

        for (const el of targets) {
          const rect = el.getBoundingClientRect();
          if (rect.bottom < 0 || rect.top > window.innerHeight) {
            if (stateRef.current.get(el)) clearEl(el);
            continue;
          }

          // Skip tiny / invisible nodes
          if (rect.width < 2 || rect.height < 2) continue;

          const points = [
            [0.5, 0.5],
            [0.2, 0.4],
            [0.8, 0.6]
          ] as const;

          let total = 0;
          for (const [nx, ny] of points) {
            total += sampleBgLuma(
              rect.left + rect.width * nx,
              rect.top + rect.height * ny,
              timeSec,
              false
            );
          }

          const next = total / points.length < threshold;
          if (next === stateRef.current.get(el)) continue;

          stateRef.current.set(el, next);
          el.classList.toggle("contrast-aware--on-dark", next);
          el.dataset.onDark = next ? "true" : "false";
        }
      });
    });

    return () => {
      unsubscribe();
      cancelAnimationFrame(raf);
      mo.disconnect();
      targets.forEach(clearEl);
    };
  }, [isLight, selector, threshold]);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
