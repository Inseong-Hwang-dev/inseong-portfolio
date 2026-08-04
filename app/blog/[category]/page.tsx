import BlogShell from "@/components/blog/BlogShell";
import PostCard from "@/components/blog/PostCard";
import {
  CATEGORY_META,
  getAllCategoryParams,
  getPostsByCategory,
  isBlogCategory,
  type BlogCategory
} from "@/lib/blog";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return getAllCategoryParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: raw } = await params;
  if (!isBlogCategory(raw)) return {};

  const meta = CATEGORY_META[raw];
  const title = meta.label;
  const description = meta.description;

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${raw}`
    },
    openGraph: {
      title: `${title} | Justin`,
      description,
      url: `/blog/${raw}`,
      type: "website"
    }
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: raw } = await params;
  if (!isBlogCategory(raw)) notFound();

  const category = raw as BlogCategory;
  const meta = CATEGORY_META[category];
  const posts = getPostsByCategory(category);

  return (
    <BlogShell>
      <main className="relative mx-auto min-h-screen max-w-[var(--spacing-container-max)] px-margin-mobile pb-section-gap pt-32 md:px-gutter">
        <header className="mb-stack-lg max-w-3xl">
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
            <Link
              href="/blog"
              className="transition hover:text-accent-neon-cyan"
            >
              BLOG
            </Link>
            <span className="material-symbols-outlined text-[14px]" aria-hidden>
              chevron_right
            </span>
            <span className="text-accent-neon-cyan">
              {meta.label.toUpperCase()}
            </span>
          </nav>
          <div className="mb-stack-md flex h-12 w-12 items-center justify-center rounded-lg border border-border-subtle bg-surface-container text-accent-neon-cyan">
            <span className="material-symbols-outlined" aria-hidden>
              {meta.icon}
            </span>
          </div>
          <h1 className="mb-stack-md font-[family-name:var(--font-display)] text-display-xl-mobile font-extrabold tracking-[-0.02em] text-on-surface md:text-headline-lg md:tracking-tight">
            {meta.label}
          </h1>
          <p className="max-w-2xl font-[family-name:var(--font-body)] text-body-lg leading-relaxed text-on-surface-variant">
            {meta.description}
          </p>
        </header>

        <section aria-labelledby="posts-heading" className="space-y-stack-md">
          <div className="mb-stack-md flex items-center justify-between">
            <h2
              id="posts-heading"
              className="font-[family-name:var(--font-display)] text-headline-md text-on-surface"
            >
              Posts
              <span className="ml-3 font-mono text-label-mono text-on-surface-variant/50">
                {posts.length}
              </span>
            </h2>
            <div className="mx-stack-lg h-px flex-1 bg-border-subtle" />
          </div>

          {posts.length > 0 ? (
            <ul className="space-y-stack-md">
              {posts.map((post) => (
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
                edit_note
              </span>
              <p className="font-mono text-label-mono uppercase tracking-widest text-on-surface-variant">
                Coming soon
              </p>
              <p className="mt-2 text-caption text-on-surface-variant">
                No posts in this category yet.
              </p>
            </div>
          )}
        </section>
      </main>
    </BlogShell>
  );
}
