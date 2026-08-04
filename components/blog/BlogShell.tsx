import BackgroundShader from "@/components/BackgroundShader";
import ContrastAware from "@/components/ContrastAware";
import SiteLogo from "@/components/SiteLogo";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { SOCIAL_LINKS } from "@/lib/site";
import Link from "next/link";

export default function BlogShell({
  children,
  active = "blog"
}: {
  children: React.ReactNode;
  active?: "home" | "blog";
}) {
  return (
    <div className="min-h-screen text-on-surface">
      <BackgroundShader />

      <header className="fixed top-0 z-50 h-16 w-full border-b border-border-subtle bg-surface-glass shadow-sm backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-[var(--spacing-container-max)] items-center justify-between px-margin-mobile md:px-gutter">
          <ContrastAware
            as="a"
            href="/"
            className="flex items-center gap-stack-md rounded-lg transition hover:scale-105"
          >
            <SiteLogo />
          </ContrastAware>

          <nav className="hidden items-center gap-stack-lg md:flex">
            {active === "home" ? (
              <span className="border-b-2 border-accent-neon-cyan pb-1 font-bold text-accent-neon-cyan">
                Home
              </span>
            ) : (
              <Link
                href="/"
                className="nav-link font-[family-name:var(--font-body)] text-body-md text-on-surface-variant transition-colors duration-300 hover:text-primary"
              >
                Home
              </Link>
            )}
            {active === "blog" ? (
              <span className="border-b-2 border-accent-neon-cyan pb-1 font-bold text-accent-neon-cyan">
                Blog
              </span>
            ) : (
              <Link
                href="/blog"
                className="nav-link font-[family-name:var(--font-body)] text-body-md text-on-surface-variant transition-colors duration-300 hover:text-primary"
              >
                Blog
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-stack-md">
            <ThemeToggle />
            <Link
              href="/#contact"
              className="rounded-lg bg-accent-neon-cyan px-stack-md py-stack-sm font-bold text-on-primary shadow-[var(--cta-glow)] transition hover:scale-105 active:scale-95"
            >
              Get in Touch
            </Link>
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
