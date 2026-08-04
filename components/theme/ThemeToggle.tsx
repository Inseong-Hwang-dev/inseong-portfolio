"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border-subtle bg-surface-glass text-on-surface-variant transition hover:border-accent-neon-cyan/40 hover:text-accent-neon-cyan ${className}`}
      aria-label={
        mounted
          ? isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
          : "Toggle color theme"
      }
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <span className="material-symbols-outlined text-[1.25rem]" aria-hidden>
        {!mounted ? "contrast" : isDark ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}
