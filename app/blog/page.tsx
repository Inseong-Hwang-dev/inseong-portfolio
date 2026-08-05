import BlogShell from "@/components/blog/BlogShell";
import PostCard from "@/components/blog/PostCard";
import ContrastAware from "@/components/ContrastAware";
import {
  BLOG_CATEGORIES,
  CATEGORY_META,
  getAllPosts,
  getCategoryCounts
} from "@/lib/blog";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Engineering notes, AI learning logs, and project retrospectives - a public diary of learning and shipping.",
  alternates: {
    canonical: "/blog",
    types: {
      "application/rss+xml": "/rss.xml"
    }
  },
  openGraph: {
    title: "Blog | Justin",
    description:
      "Engineering notes, AI learning logs, and project retrospectives by Justin.",
    url: "/blog",
    type: "website"
  }
};

export default function BlogPage() {
  const posts = getAllPosts();
  const counts = getCategoryCounts();
  const recent = posts.slice(0, 5);

  return (
    <BlogShell>
      <main className="relative mx-auto min-h-screen max-w-[var(--spacing-container-max)] px-margin-mobile pb-section-gap pt-32 md:px-gutter">
        <ContrastAware className="contrast-aware--text mb-stack-lg max-w-3xl">
          <nav
            aria-label="Breadcrumb"
            className="mb-stack-md flex items-center gap-2 font-mono text-label-mono text-accent-neon-cyan/60"
          >
            <Link href="/" className="transition hover:text-accent-neon-cyan">
              HOME
            </Link>
            <span className="material-symbols-outlined text-[14px]" aria-hidden>
              chevron_right
            </span>
            <span className="text-accent-neon-cyan">BLOG</span>
          </nav>
          <h1 className="mb-stack-md font-[family-name:var(--font-display)] text-display-xl-mobile font-extrabold tracking-[-0.02em] text-on-surface md:text-headline-lg md:tracking-tight">
            Notes on building &amp; learning
          </h1>
          <p className="max-w-2xl font-[family-name:var(--font-body)] text-body-lg leading-relaxed text-on-surface-variant">
            Three tracks: a day-to-day engineering diary, AI study applied to
            real work, and longer retrospectives after shipping.
          </p>
        </ContrastAware>

        <section aria-labelledby="categories-heading" className="mb-stack-lg">
          <ContrastAware className="contrast-aware--text mb-stack-md flex items-center justify-between">
            <h2
              id="categories-heading"
              className="font-[family-name:var(--font-display)] text-headline-md text-on-surface"
            >
              Categories
            </h2>
            <div className="mx-stack-lg h-px flex-1 bg-border-subtle" />
          </ContrastAware>
          <div className="grid grid-cols-1 gap-stack-md md:grid-cols-3">
            {BLOG_CATEGORIES.map((slug) => {
              const meta = CATEGORY_META[slug];
              return (
                <ContrastAware
                  key={slug}
                  as="a"
                  href={`/blog/${slug}`}
                  className="glass-card group flex flex-col rounded-xl p-stack-lg transition hover:no-underline"
                >
                  <div className="mb-stack-md flex h-12 w-12 items-center justify-center rounded-lg border border-border-subtle bg-surface-container text-accent-neon-cyan transition-transform group-hover:scale-110">
                    <span className="material-symbols-outlined" aria-hidden>
                      {meta.icon}
                    </span>
                  </div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <h3 className="font-[family-name:var(--font-display)] text-body-lg font-bold text-on-surface group-hover:text-accent-neon-cyan">
                      {meta.label}
                    </h3>
                    <span className="font-mono text-caption text-on-surface-variant/50">
                      {counts[slug]}
                    </span>
                  </div>
                  <p className="text-caption leading-relaxed text-on-surface-variant">
                    {meta.description}
                  </p>
                </ContrastAware>
              );
            })}
          </div>
        </section>

        <section
          aria-labelledby="recent-heading"
          className="space-y-stack-md"
        >
          <ContrastAware className="contrast-aware--text mb-stack-md flex items-center justify-between">
            <h2
              id="recent-heading"
              className="font-[family-name:var(--font-display)] text-headline-md text-on-surface"
            >
              Recent Posts
            </h2>
            <div className="mx-stack-lg h-px flex-1 bg-border-subtle" />
          </ContrastAware>

          {recent.length > 0 ? (
            <ul className="space-y-stack-md">
              {recent.map((post) => (
                <li key={post.href}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border-subtle p-16 text-center">
              <span
                className="material-symbols-outlined mb-stack-md text-[48px] text-on-surface-variant"
                aria-hidden
              >
                hourglass_empty
              </span>
              <p className="font-mono text-label-mono uppercase tracking-widest text-on-surface-variant">
                No posts yet
              </p>
            </div>
          )}
        </section>
      </main>
    </BlogShell>
  );
}
