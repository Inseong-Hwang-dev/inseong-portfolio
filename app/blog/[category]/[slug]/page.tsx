import BlogShell from "@/components/blog/BlogShell";
import MdxContent from "@/components/blog/MdxContent";
import ContrastAwareScope from "@/components/ContrastAwareScope";
import {
  AUTHOR_NAME,
  CATEGORY_META,
  formatPostDate,
  getAllPostParams,
  getPost,
  isBlogCategory,
  SITE_URL,
  type BlogCategory
} from "@/lib/blog";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

export function generateStaticParams() {
  return getAllPostParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: raw, slug } = await params;
  if (!isBlogCategory(raw)) return {};

  const post = getPost(raw, slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: AUTHOR_NAME }],
    alternates: {
      canonical: post.href
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: post.href,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [AUTHOR_NAME],
      tags: post.tags
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description
    }
  };
}

export default async function PostPage({ params }: Props) {
  const { category: raw, slug } = await params;
  if (!isBlogCategory(raw)) notFound();

  const category = raw as BlogCategory;
  const post = getPost(category, slug);
  if (!post) notFound();

  const categoryMeta = CATEGORY_META[category];
  const absoluteUrl = `${SITE_URL}${post.href}`;

  const blogPostingLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: {
      "@type": "Person",
      name: AUTHOR_NAME
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl
    },
    url: absoluteUrl,
    keywords: post.tags?.join(", ")
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryMeta.label,
        item: `${SITE_URL}/blog/${category}`
      },
      {
        "@type": "ListItem",
        position: 4,
        name: post.title,
        item: absoluteUrl
      }
    ]
  };

  return (
    <BlogShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([blogPostingLd, breadcrumbLd])
        }}
      />
      <main className="relative mx-auto min-h-screen max-w-[var(--spacing-container-max)] px-margin-mobile pb-section-gap pt-32 md:px-gutter">
        <ContrastAwareScope className="mx-auto max-w-3xl">
          <article>
            <nav
              aria-label="Breadcrumb"
              className="mb-stack-md flex flex-wrap items-center gap-2 font-mono text-label-mono text-accent-neon-cyan/60"
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
              <Link
                href={`/blog/${category}`}
                className="transition hover:text-accent-neon-cyan"
              >
                {categoryMeta.label.toUpperCase()}
              </Link>
              <span className="material-symbols-outlined text-[14px]" aria-hidden>
                chevron_right
              </span>
              <span className="truncate text-accent-neon-cyan">POST</span>
            </nav>

            <header className="mb-stack-lg border-b border-border-subtle pb-stack-lg">
              <p className="mb-stack-md font-mono text-[11px] uppercase tracking-wider text-accent-neon-cyan">
                <Link
                  href={`/blog/${category}`}
                  className="transition hover:text-primary"
                >
                  {categoryMeta.label}
                </Link>
              </p>
              <h1 className="mb-stack-md font-[family-name:var(--font-display)] text-display-xl-mobile font-extrabold tracking-[-0.02em] text-on-surface md:text-headline-lg md:tracking-tight">
                {post.title}
              </h1>
              <p className="mb-stack-md text-body-lg leading-relaxed text-on-surface-variant">
                {post.description}
              </p>
              <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-on-surface-variant/70">
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                <span aria-hidden>·</span>
                <span>{post.readingTimeMinutes} min read</span>
                {post.updated ? (
                  <>
                    <span aria-hidden>·</span>
                    <span>
                      Updated{" "}
                      <time dateTime={post.updated}>
                        {formatPostDate(post.updated)}
                      </time>
                    </span>
                  </>
                ) : null}
              </div>
              {post.tags && post.tags.length > 0 ? (
                <div className="mt-stack-md flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-border-subtle bg-accent-neon-cyan/5 px-2 py-1 font-mono text-[11px] text-accent-neon-cyan"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </header>

            <MdxContent source={post.content} />

            <footer className="mt-stack-lg border-t border-border-subtle pt-stack-lg">
              <Link
                href={`/blog/${category}`}
                className="inline-flex items-center gap-2 font-mono text-caption uppercase tracking-wider text-accent-neon-cyan transition hover:text-primary"
              >
                <span
                  className="material-symbols-outlined text-[16px]"
                  aria-hidden
                >
                  arrow_back
                </span>
                Back to {categoryMeta.label}
              </Link>
            </footer>
          </article>
        </ContrastAwareScope>
      </main>
    </BlogShell>
  );
}
