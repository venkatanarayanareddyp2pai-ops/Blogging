"use client";
import Link from "next/link";
import { Post } from "@/lib/db";

export function BlogCard({ post }: { post: Post }) {
  const date = new Date(post.date).toLocaleDateString("en-IN", { 
    month: "short", day: "numeric", year: "numeric" 
  });
  const wordCount = post.content.split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <Link href={`/blog/${post.slug}`} className="group block py-3">
      <h3 className="font-medium group-hover:text-[var(--color-accent)] transition-colors mb-1">
        {post.title}
      </h3>
      <p className="text-sm text-[var(--color-fg-muted)] line-clamp-1 mb-2">{post.excerpt}</p>
      <div className="flex items-center gap-2 text-xs text-[var(--color-fg-muted)]">
        <span>{date}</span>
        <span>·</span>
        <span>{readTime} min</span>
        {(post.tags || []).map(tag => (
          <span key={tag} className="px-1.5 py-0.5 rounded bg-[var(--color-accent-muted)] text-[var(--color-accent)] text-[10px] font-medium">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
