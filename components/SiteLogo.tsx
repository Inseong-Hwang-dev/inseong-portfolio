"use client";

import { useId } from "react";

type SiteLogoProps = {
  className?: string;
  /** Hide the wordmark (icon-only). */
  markOnly?: boolean;
};

/**
 * Brand mark + wordmark. Colours come from theme tokens so light/dark both read.
 * Wrap with ContrastAware when the mark sits over the WebGL backdrop.
 */
export default function SiteLogo({
  className = "",
  markOnly = false
}: SiteLogoProps) {
  const reactId = useId().replace(/:/g, "");
  const tileGrad = `logo-tile-${reactId}`;
  const rimGrad = `logo-rim-${reactId}`;
  const blink = `logo-blink-${reactId}`;

  return (
    <span
      className={`inline-flex items-center gap-2.5 ${className}`}
      aria-label="Justin"
    >
      <svg
        viewBox="0 0 40 40"
        className="h-10 w-10 shrink-0"
        aria-hidden
      >
        <defs>
          <linearGradient
            id={tileGrad}
            x1="6"
            y1="2"
            x2="34"
            y2="38"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#152536" />
            <stop offset="1" stopColor="#0a1320" />
          </linearGradient>
          <linearGradient
            id={rimGrad}
            x1="8"
            y1="4"
            x2="32"
            y2="36"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#5af0ff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#2d5bff" stopOpacity="0.35" />
          </linearGradient>
          <style>{`
            @keyframes ${blink} {
              0%, 45% { opacity: 1; }
              50%, 95% { opacity: 0.15; }
              100% { opacity: 1; }
            }
            .${blink} {
              animation: ${blink} 1.25s steps(1, end) infinite;
            }
          `}</style>
        </defs>

        {/* Obsidian tile + cyan/electric rim */}
        <rect width="40" height="40" rx="10" fill={`url(#${tileGrad})`} />
        <rect
          x="1.5"
          y="1.5"
          width="37"
          height="37"
          rx="8.5"
          fill="none"
          stroke={`url(#${rimGrad})`}
          strokeWidth="1.75"
        />

        {/* Terminal chrome — slightly lifted panel */}
        <rect x="7.5" y="9" width="25" height="22" rx="4" fill="#07101c" />
        <rect
          x="7.5"
          y="9"
          width="25"
          height="22"
          rx="4"
          fill="none"
          stroke="rgba(90, 240, 255, 0.22)"
          strokeWidth="1"
        />
        <rect x="7.5" y="9" width="25" height="6" rx="4" fill="#101c2c" />
        <rect x="7.5" y="12" width="25" height="3" fill="#101c2c" />

        {/* Window controls */}
        <circle cx="11.6" cy="12" r="1.15" fill="#ff6b7a" />
        <circle cx="15.2" cy="12" r="1.15" fill="#ffd166" />
        <circle cx="18.8" cy="12" r="1.15" fill="#4ade80" />

        {/* Prompt lines */}
        <rect x="11" y="18.2" width="8.5" height="1.7" rx="0.85" fill="#5af0ff" opacity="0.95" />
        <rect x="11" y="22" width="14" height="1.7" rx="0.85" fill="#7dd3fc" opacity="0.4" />
        <rect x="11" y="25.8" width="5.5" height="1.7" rx="0.85" fill="#7dd3fc" opacity="0.28" />

        {/* Blinking block cursor */}
        <rect
          className={blink}
          x="21.2"
          y="17.6"
          width="2.4"
          height="3"
          rx="0.45"
          fill="#e8fbff"
        />
      </svg>
      {!markOnly && (
        <span className="site-logo__wordmark font-[family-name:var(--font-display)] text-[1.35rem] font-extrabold tracking-[-0.03em] text-primary">
          Justin.
        </span>
      )}
    </span>
  );
}
