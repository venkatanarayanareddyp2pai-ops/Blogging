"use client";

import { useState, useMemo } from "react";
import { Post } from "@/lib/db";
import { Search } from "lucide-react";
import Link from "next/link";

export function BlogFilter({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    return [...new Set(posts.flatMap(p => p.tags || []))];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(query.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(query.toLowerCase());
      const matchesTag = selectedTag ? (post.tags || []).includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [posts, query, selectedTag]);

  return (
    <div>
      <div className="mt-4 mb-10 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setSelectedTag(null)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              selectedTag === null 
                ? 'border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent-muted)]' 
                : 'border-[var(--color-border)] text-[var(--color-fg-muted)] hover:border-[var(--color-fg)]'
            }`}
          >
            All
          </button>
          {allTags.map(tag => (
            <button 
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                selectedTag === tag 
                  ? 'border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent-muted)]' 
                  : 'border-[var(--color-border)] text-[var(--color-fg-muted)] hover:border-[var(--color-fg)]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-muted)]" size={14} />
          <input 
            type="text" 
            placeholder="Search articles..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border border-[var(--color-border)] rounded-md py-2 pl-9 pr-3 text-sm bg-[var(--color-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition"
          />
        </div>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="space-y-1">
          {filteredPosts.map(post => {
            const date = new Date(post.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" });
            return (
              <Link 
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group block py-3 -mx-3 px-3 rounded-lg hover:bg-[var(--color-surface)] transition-colors"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-medium group-hover:text-[var(--color-accent)] transition-colors">{post.title}</span>
                  <span className="text-xs text-[var(--color-fg-muted)] flex-shrink-0">{date}</span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="py-10 text-center text-sm text-[var(--color-fg-muted)]">No articles match your search.</p>
      )}
    </div>
  );
}
