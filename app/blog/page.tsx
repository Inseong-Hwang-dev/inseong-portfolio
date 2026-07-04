"use client";

import BackgroundShader from "@/components/BackgroundShader";
import Link from "next/link";
import { useEffect, useRef } from "react";

const LOGO_SRC =
  "https://lh3.googleusercontent.com/aida/AP1WRLvBLc6onh8xWyYXftmBv34o0fM5ZhX2t_83OASwScVoaThlENkR2nZ-MnYvWXiBWL9bFFypbDMLV-FVmm0XNAmE22ine9hvMUrUQ5VxT8-laRJF1XMUZ6LQoG_dkKfEgpIeF84Ru90TQB1YPSxa55V09L3AFRi1JCOEj-4qIVmU6LBL6Ez5M0DDLcXJuuAD3kUFWB-bfy2GCz4iwXEk2sCzNYBMGprrqFdcL5Hs8tiitXCx-AzPEeBxWYnQ";

const categories = [
  { label: "Engineering", count: 0 },
  { label: "Design Systems", count: 0 },
  { label: "Research", count: 0 }
];

const postTags = ["System Design", "Next.js", "Performance"];

const featuredProject = {
  title: "ParkingSpace",
  image: "/images/parkingspace-cover.png",
  link: "https://parking-rent.vercel.app/"
};

function GlassCard({
  children,
  className = "",
  cardRef
}: {
  children: React.ReactNode;
  className?: string;
  cardRef?: (el: HTMLElement | null) => void;
}) {
  return (
    <article
      ref={cardRef}
      className={`glass-card glass-card--fade glass-card--hidden rounded-xl ${className}`}
    >
      {children}
    </article>
  );
}

export default function BlogPage() {
  const cardRefs = useRef<Set<HTMLElement>>(new Set());

  const registerCard = (el: HTMLElement | null) => {
    if (el) cardRefs.current.add(el);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("glass-card--hidden");
            entry.target.classList.add("glass-card--visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    cardRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen text-on-surface">
      <BackgroundShader />

      <header className="fixed top-0 z-50 h-16 w-full border-b border-border-subtle bg-surface-glass shadow-sm backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-[var(--spacing-container-max)] items-center justify-between px-margin-mobile md:px-gutter">
          <Link
            href="/"
            className="flex items-center gap-stack-md transition hover:scale-105"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LOGO_SRC}
              alt="Inseong Developer Logo"
              className="h-10 w-auto rounded-md"
            />
          </Link>

          <nav className="hidden items-center gap-stack-lg md:flex">
            <Link
              href="/"
              className="nav-link font-[family-name:var(--font-body)] text-body-md text-on-surface-variant transition-colors duration-300 hover:text-primary"
            >
              Home
            </Link>
            <span className="border-b-2 border-accent-neon-cyan pb-1 font-bold text-accent-neon-cyan">
              Blog
            </span>
          </nav>

          <Link
            href="/#contact"
            className="rounded-lg bg-accent-neon-cyan px-stack-md py-stack-sm font-bold text-background-obsidian shadow-[0_0_15px_rgba(0,225,255,0.4)] transition hover:scale-105 active:scale-95"
          >
            Get in Touch
          </Link>
        </div>
      </header>

      <main className="relative mx-auto min-h-screen max-w-[var(--spacing-container-max)] px-margin-mobile pb-section-gap pt-32 md:px-gutter">
        <header className="mb-stack-lg max-w-3xl">
          <nav className="mb-stack-md flex items-center gap-2 font-mono text-label-mono text-accent-neon-cyan/60">
            <Link href="/" className="transition hover:text-accent-neon-cyan">
              HOME
            </Link>
            <span className="material-symbols-outlined text-[14px]">
              chevron_right
            </span>
            <span className="text-accent-neon-cyan">BLOG</span>
          </nav>
          <h1 className="mb-stack-md font-[family-name:var(--font-display)] text-display-xl-mobile font-extrabold tracking-[-0.02em] text-on-surface md:text-headline-lg md:tracking-tight">
            Notes on learning &amp; research
          </h1>
          <p className="max-w-2xl font-[family-name:var(--font-body)] text-body-lg leading-relaxed text-on-surface-variant">
            This is where I write down what I learn, how I approach problems, and
            the trade-offs I discover along the way. Over time, it becomes a
            personal growth log I can revisit and refine.
          </p>
        </header>

        <div className="mt-stack-lg grid grid-cols-1 gap-stack-lg md:grid-cols-12">
          <section className="space-y-stack-md md:col-span-8">
            <div className="mb-stack-md flex items-center justify-between">
              <h2 className="font-[family-name:var(--font-display)] text-headline-md text-on-surface">
                Recent Posts
              </h2>
              <div className="mx-stack-lg h-px flex-1 bg-border-subtle" />
            </div>

            <GlassCard
              cardRef={registerCard}
              className="group relative overflow-hidden p-stack-lg"
            >
              <div className="absolute right-0 top-0 p-stack-md">
                <span className="inline-flex items-center gap-1 rounded-full border border-accent-neon-cyan/30 bg-accent-neon-cyan/10 px-3 py-1 font-mono text-[10px] text-accent-neon-cyan">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-neon-cyan" />
                  IN PROGRESS
                </span>
              </div>
              <div className="flex flex-col gap-stack-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border-subtle bg-surface-container text-accent-neon-cyan transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined">
                    sync_saved_locally
                  </span>
                </div>
                <div>
                  <h3 className="mb-2 font-[family-name:var(--font-display)] text-headline-md text-on-surface">
                    Still being updated
                  </h3>
                  <p className="mb-6 leading-relaxed text-on-surface-variant">
                    I&apos;m currently porting over my research notes and
                    technical breakdowns from my local obsidian vault. Check back
                    soon for deep dives into distributed systems, UI
                    performance, and modern CSS architectures.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {postTags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-border-subtle bg-accent-neon-cyan/5 px-2 py-1 font-mono text-[11px] text-accent-neon-cyan"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-accent-neon-cyan/5 blur-[80px]" />
            </GlassCard>

            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border-subtle p-24 text-center opacity-50 grayscale transition-all hover:grayscale-0 hover:opacity-100">
              <span className="material-symbols-outlined mb-stack-md text-[48px] text-on-surface-variant">
                hourglass_empty
              </span>
              <p className="font-mono text-label-mono uppercase tracking-widest text-on-surface-variant">
                Queue Empty
              </p>
              <p className="mt-2 text-caption text-on-surface-variant">
                More insights loading into the nexus...
              </p>
            </div>
          </section>

          <aside className="space-y-stack-md md:col-span-4">
            <GlassCard
              cardRef={registerCard}
              className="flex flex-col gap-stack-md p-stack-lg"
            >
              <h4 className="font-mono text-label-mono uppercase text-accent-neon-cyan">
                Newsletter
              </h4>
              <p className="text-caption text-on-surface-variant">
                Get notified when new research notes are published. No spam,
                just technical depth.
              </p>
              <div className="relative">
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full border-b border-border-subtle bg-transparent px-0 py-3 text-body-md outline-none transition-colors placeholder:text-on-surface-variant/30 focus:border-accent-neon-cyan"
                />
                <button
                  type="button"
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-accent-neon-cyan transition hover:scale-110"
                  aria-label="Subscribe"
                >
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </GlassCard>

            <GlassCard cardRef={registerCard} className="p-stack-lg">
              <h4 className="mb-stack-md font-mono text-label-mono uppercase text-accent-neon-cyan">
                Categories
              </h4>
              <ul className="space-y-3">
                {categories.map((cat) => (
                  <li key={cat.label}>
                    <span className="flex items-center justify-between">
                      <span className="text-on-surface-variant transition-colors hover:text-accent-neon-cyan">
                        {cat.label}
                      </span>
                      <span className="font-mono text-caption text-on-surface-variant/40">
                        {cat.count}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </GlassCard>

            <GlassCard
              cardRef={registerCard}
              className="group overflow-hidden p-0"
            >
              <div className="relative h-40 overflow-hidden bg-surface-container">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-obsidian to-transparent" />
              </div>
              <div className="p-stack-lg">
                <h4 className="mb-1 font-mono text-label-mono uppercase text-accent-neon-cyan">
                  Latest Project
                </h4>
                <p className="mb-4 font-bold text-body-md">
                  {featuredProject.title}
                </p>
                <a
                  href={featuredProject.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-caption text-on-surface transition-colors hover:text-accent-neon-cyan"
                >
                  VIEW CASE STUDY
                  <span className="material-symbols-outlined text-[16px]">
                    open_in_new
                  </span>
                </a>
              </div>
            </GlassCard>
          </aside>
        </div>
      </main>

      <footer className="w-full border-t border-border-subtle bg-background-obsidian py-stack-lg">
        <div className="mx-auto flex max-w-[var(--spacing-container-max)] flex-col items-center justify-between gap-stack-md px-margin-mobile md:flex-row md:px-gutter">
          <div className="flex flex-col items-center md:items-start">
            <span className="mb-2 font-[family-name:var(--font-display)] text-headline-md text-primary">
              Inseong.
            </span>
            <p className="font-[family-name:var(--font-body)] text-caption text-on-surface-variant opacity-80">
              © {new Date().getFullYear()} DevPortfolio. Built with precision.
            </p>
          </div>
          <div className="flex gap-8">
            <a
              href="https://github.com/Inseong-Hwang-dev"
              target="_blank"
              rel="noreferrer"
              className="font-[family-name:var(--font-body)] text-caption text-on-surface-variant transition hover:text-accent-neon-cyan"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/inseong-hwang-b888872b7/"
              target="_blank"
              rel="noreferrer"
              className="font-[family-name:var(--font-body)] text-caption text-on-surface-variant transition hover:text-accent-neon-cyan"
            >
              LinkedIn
            </a>
            <Link
              href="/blog"
              className="font-[family-name:var(--font-body)] text-caption text-on-surface-variant transition hover:text-accent-neon-cyan"
            >
              Blog
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
