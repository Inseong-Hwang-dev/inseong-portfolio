"use client";

import { sampleBgLuma, subscribeBgFrame } from "@/lib/bgLuminance";
import { useTheme } from "next-themes";
import {
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type ElementType
} from "react";

type ContrastAwareProps<T extends ElementType = "div"> = {
  as?: T;
  children?: React.ReactNode;
  /** Luma below this switches to light text (0–1). */
  threshold?: number;
  className?: string;
  /** Extra callback ref (e.g. GlassCard scroll observer). */
  elementRef?: (el: HTMLElement | null) => void;
} & Omit<
  ComponentPropsWithoutRef<T>,
  "as" | "children" | "className" | "ref"
>;

/**
 * Toggles contrast via DOM classList only — never React state —
 * so we don't clobber imperative classes like glass-card--visible.
 */
export default function ContrastAware<T extends ElementType = "div">({
  as,
  className = "",
  children,
  threshold = 0.52,
  elementRef,
  ...rest
}: ContrastAwareProps<T>) {
  const Tag = (as || "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const onDarkRef = useRef(false);
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  useEffect(() => {
    const clear = () => {
      const el = ref.current;
      if (!el) return;
      onDarkRef.current = false;
      el.classList.remove("contrast-aware--on-dark");
      el.dataset.onDark = "false";
    };

    if (!isLight) {
      clear();
      return;
    }

    let raf = 0;
    let pending = false;

    const evaluate = (timeSec: number, isDarkTheme: boolean) => {
      if (isDarkTheme || pending) return;
      pending = true;
      raf = requestAnimationFrame(() => {
        pending = false;
        const el = ref.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          if (onDarkRef.current) {
            onDarkRef.current = false;
            el.classList.remove("contrast-aware--on-dark");
            el.dataset.onDark = "false";
          }
          return;
        }

        const points = [
          [0.5, 0.5],
          [0.25, 0.35],
          [0.75, 0.65]
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
        if (next === onDarkRef.current) return;

        onDarkRef.current = next;
        el.classList.toggle("contrast-aware--on-dark", next);
        el.dataset.onDark = next ? "true" : "false";
      });
    };

    const unsubscribe = subscribeBgFrame(evaluate);
    return () => {
      unsubscribe();
      cancelAnimationFrame(raf);
      clear();
    };
  }, [isLight, threshold]);

  const setRef = (el: HTMLElement | null) => {
    ref.current = el;
    elementRef?.(el);
  };

  return (
    <Tag
      ref={setRef}
      data-on-dark="false"
      className={`contrast-aware ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
