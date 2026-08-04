import {
  BLOG_CATEGORIES,
  getAllPosts,
  SITE_URL
} from "@/lib/blog";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const lastPostDate =
    posts[0] != null ? new Date(posts[0].updated ?? posts[0].date) : new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: lastPostDate,
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: lastPostDate,
      changeFrequency: "weekly",
      priority: 0.9
    },
    ...BLOG_CATEGORIES.map((category) => ({
      url: `${SITE_URL}/blog/${category}`,
      lastModified: lastPostDate,
      changeFrequency: "weekly" as const,
      priority: 0.8
    }))
  ];

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}${post.href}`,
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "monthly",
    priority: 0.7
  }));

  return [...staticEntries, ...postEntries];
}
