"use client";

import {
  getBgShadowEnabled,
  hydrateBgShadowPreference,
  setBgShadowEnabled,
  subscribeBgShadow
} from "@/lib/bgShadowPreference";
import { useEffect, useState } from "react";

export default function BgShadowToggle({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    hydrateBgShadowPreference();
    setEnabled(getBgShadowEnabled());
    setMounted(true);
    return subscribeBgShadow(setEnabled);
  }, []);

  return (
    <button
      type="button"
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border-subtle bg-surface-glass text-on-surface-variant transition hover:border-accent-neon-cyan/40 hover:text-accent-neon-cyan ${className}`}
      aria-label={
        mounted
          ? enabled
            ? "Turn off background shadows"
            : "Turn on background shadows"
          : "Toggle background shadows"
      }
      aria-pressed={mounted ? enabled : undefined}
      title={enabled ? "Background shadows on" : "Background shadows off"}
      onClick={() => setBgShadowEnabled(!enabled)}
    >
      <span className="material-symbols-outlined text-[1.25rem]" aria-hidden>
        {!mounted ? "blur_on" : enabled ? "blur_on" : "blur_off"}
      </span>
    </button>
  );
}
