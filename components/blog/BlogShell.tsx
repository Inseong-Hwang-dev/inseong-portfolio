import BackgroundShader from "@/components/BackgroundShader";
import ContrastAware from "@/components/ContrastAware";
import SiteLogo from "@/components/SiteLogo";
import BgShadowToggle from "@/components/theme/BgShadowToggle";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { SOCIAL_LINKS } from "@/lib/site";
import Link from "next/link";

const pillLinkClass =
  "rounded-full bg-primary px-6 py-2 font-bold text-on-primary shadow-lg shadow-primary/20 transition hover:scale-105";

export default function BlogShell({
  children
}: {
  children: React.ReactNode;
  active?: "home" | "blog";
}) {
  return (
    <div className="min-h-screen text-on-surface">
      <BackgroundShader />

      <header className="fixed top-0 z-50 h-16 w-full border-b border-border-subtle bg-surface-glass shadow-sm backdrop-blur-md">
        {/* Same 5-column desktop grid as home so Home/Blog pills share one slot */}
        <div className="mx-auto grid h-full max-w-[var(--spacing-container-max)] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-margin-mobile md:grid-cols-[auto_minmax(0,1fr)_auto_auto_auto] md:gap-4 md:px-gutter">
          <ContrastAware
            as="a"
            href="/"
            className="flex items-center gap-stack-md rounded-lg transition hover:scale-105"
          >
            <SiteLogo />
          </ContrastAware>

          <div className="hidden min-w-0 items-center justify-end gap-stack-lg md:flex">
            <Link
              href="/#contact"
              className="nav-link shrink-0 font-[family-name:var(--font-body)] text-body-md text-on-surface-variant transition-colors duration-300 hover:text-primary"
            >
              Get in Touch
            </Link>
          </div>

          <Link
            href="/"
            className={`hidden md:inline-flex ${pillLinkClass}`}
          >
            Home
          </Link>
          <BgShadowToggle className="hidden md:inline-flex" />
          <ThemeToggle className="hidden md:inline-flex" />

          <div className="col-start-3 flex items-center justify-end gap-2 md:hidden">
            <Link href="/" className={`${pillLinkClass} px-4 py-1.5 text-sm`}>
              Home
            </Link>
            <BgShadowToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {children}

      <footer className="w-full border-t border-border-subtle bg-background-obsidian py-stack-lg">
        <div className="mx-auto flex max-w-[var(--spacing-container-max)] flex-col items-center justify-between gap-stack-md px-margin-mobile md:flex-row md:px-gutter">
          <ContrastAware className="flex flex-col items-center rounded-lg md:items-start">
            <span className="site-logo__name mb-2 font-[family-name:var(--font-display)] text-headline-md text-primary">
              Justin.
            </span>
            <p className="font-[family-name:var(--font-body)] text-caption text-on-surface-variant opacity-80">
              © {new Date().getFullYear()} DevPortfolio. Built with precision.
            </p>
          </ContrastAware>
          <div className="flex gap-8">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noreferrer"
              className="font-[family-name:var(--font-body)] text-caption text-on-surface-variant transition hover:text-accent-neon-cyan"
            >
              GitHub
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
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
            <a
              href="/rss.xml"
              className="font-[family-name:var(--font-body)] text-caption text-on-surface-variant transition hover:text-accent-neon-cyan"
            >
              RSS
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
