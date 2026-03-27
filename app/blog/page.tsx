import { getPosts } from "@/lib/db";
import { BlogArticlesGrid } from "@/components/BlogGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles — Venkata Narayana",
  description: "All articles on frontend development and design.",
};

export default async function BlogListingPage() {
  const posts = await getPosts();

  return (
    <div className="max-w-5xl mx-auto px-5 py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Articles</h1>
      <BlogArticlesGrid posts={posts} />
    </div>
  );
}
