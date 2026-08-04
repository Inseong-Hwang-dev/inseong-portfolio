import ContrastAware from "@/components/ContrastAware";
import {
  CATEGORY_META,
  formatPostDate,
  type PostMeta
} from "@/lib/blog";

export default function PostCard({ post }: { post: PostMeta }) {
  const category = CATEGORY_META[post.category];

  return (
    <ContrastAware
      as="a"
      href={post.href}
      className="glass-card group block rounded-xl p-stack-lg transition hover:no-underline"
    >
      <div className="mb-3 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-accent-neon-cyan/70">
        <span>{category.label}</span>
        <span className="text-on-surface-variant/40">·</span>
        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        <span className="text-on-surface-variant/40">·</span>
        <span className="text-on-surface-variant/60">
          {post.readingTimeMinutes} min read
        </span>
      </div>
      <h3 className="mb-2 font-[family-name:var(--font-display)] text-headline-md text-on-surface transition-colors group-hover:text-accent-neon-cyan">
        {post.title}
      </h3>
      <p className="leading-relaxed text-on-surface-variant">
        {post.description}
      </p>
      {post.tags && post.tags.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
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
    </ContrastAware>
  );
}
