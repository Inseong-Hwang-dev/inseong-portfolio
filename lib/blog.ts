import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { AUTHOR_NAME, SITE_URL } from "@/lib/site";

export { AUTHOR_NAME, SITE_URL };

export const BLOG_CATEGORIES = [
  "engineering-notes",
  "ai-learning",
  "project-retrospectives"
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const CATEGORY_META: Record<
  BlogCategory,
  { label: string; description: string; icon: string }
> = {
  "engineering-notes": {
    label: "Engineering Notes",
    description:
      "A day-to-day engineering diary - what I tried, what broke, and what I learned.",
    icon: "terminal"
  },
  "ai-learning": {
    label: "AI Learning",
    description:
      "Studying AI and applying it to real development work - experiments, workflows, and lessons.",
    icon: "psychology"
  },
  "project-retrospectives": {
    label: "Project Retrospectives",
    description:
      "Longer write-ups after shipping a feature or project - decisions, trade-offs, and outcomes.",
    icon: "history_edu"
  }
};

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags?: string[];
  draft?: boolean;
};

export type PostMeta = PostFrontmatter & {
  slug: string;
  category: BlogCategory;
  readingTimeMinutes: number;
  href: string;
};

export type Post = PostMeta & {
  content: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function isBlogCategory(value: string): value is BlogCategory {
  return (BLOG_CATEGORIES as readonly string[]).includes(value);
}

function includeDrafts(): boolean {
  return process.env.NODE_ENV !== "production";
}

function readCategorySlugs(category: BlogCategory): string[] {
  const dir = path.join(CONTENT_DIR, category);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => file.replace(/\.mdx?$/, ""));
}

function parsePostFile(category: BlogCategory, slug: string): Post | null {
  const mdxPath = path.join(CONTENT_DIR, category, `${slug}.mdx`);
  const mdPath = path.join(CONTENT_DIR, category, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath)
    ? mdxPath
    : fs.existsSync(mdPath)
      ? mdPath
      : null;

  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;

  if (!frontmatter.title || !frontmatter.description || !frontmatter.date) {
    throw new Error(
      `Missing required frontmatter in ${category}/${slug}: title, description, date`
    );
  }

  if (frontmatter.draft && !includeDrafts()) {
    return null;
  }

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    date: frontmatter.date,
    updated: frontmatter.updated,
    tags: frontmatter.tags ?? [],
    draft: frontmatter.draft ?? false,
    slug,
    category,
    readingTimeMinutes: estimateReadingTime(content),
    href: `/blog/${category}/${slug}`,
    content
  };
}

function toMeta(post: Post): PostMeta {
  const { content: _content, ...meta } = post;
  return meta;
}

export function getAllPosts(): PostMeta[] {
  const posts: PostMeta[] = [];

  for (const category of BLOG_CATEGORIES) {
    for (const slug of readCategorySlugs(category)) {
      const post = parsePostFile(category, slug);
      if (post) posts.push(toMeta(post));
    }
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostsByCategory(category: BlogCategory): PostMeta[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getPost(category: BlogCategory, slug: string): Post | null {
  return parsePostFile(category, slug);
}

export function getCategoryCounts(): Record<BlogCategory, number> {
  const counts = Object.fromEntries(
    BLOG_CATEGORIES.map((c) => [c, 0])
  ) as Record<BlogCategory, number>;

  for (const post of getAllPosts()) {
    counts[post.category] += 1;
  }

  return counts;
}

export function getAllCategoryParams(): { category: BlogCategory }[] {
  return BLOG_CATEGORIES.map((category) => ({ category }));
}

export function getAllPostParams(): {
  category: BlogCategory;
  slug: string;
}[] {
  return getAllPosts().map((post) => ({
    category: post.category,
    slug: post.slug
  }));
}

export function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(new Date(date));
}
