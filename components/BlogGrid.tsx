"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Post } from "@/lib/db";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import Image from "next/image";

function TiltCard({ post, index }: { post: Post; index: number }) {
  const date = new Date(post.date);
  const formattedDate = date.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });
  const formattedTime = date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
  const wordCount = post.content.split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 + index * 0.05, duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group block"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-square rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm hover:shadow-lg transition-shadow duration-300">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-[var(--color-bg)] flex items-center justify-center">
              <span className="text-5xl font-bold text-[var(--color-fg-muted)] select-none">{post.title.charAt(0)}</span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-700/40 to-transparent p-5 flex flex-col justify-end">
            <p className="text-[11px] text-slate-100/80 font-mono mb-2 tabular-nums">
              {formattedDate} · {formattedTime}
            </p>
            <h3 className="text-white font-semibold leading-snug text-base mb-2 line-clamp-2">
              {post.title}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              {(post.tags || []).slice(0, 3).map(tag => (
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white/90 backdrop-blur-sm font-mono">
                  {tag}
                </span>
              ))}
              <span className="text-[10px] text-slate-100/70 ml-auto font-mono">{readTime} min</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function BlogArticlesGrid({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => [...new Set(posts.flatMap(p => p.tags || []))], [posts]);

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
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-10">
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setSelectedTag(null)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors font-mono ${
              selectedTag === null ? 'border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent-muted)]' : 'border-[var(--color-border)] text-[var(--color-fg-muted)]'
            }`}
          >
            all
          </button>
          {allTags.map(tag => (
            <button 
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors font-mono ${
                selectedTag === tag ? 'border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent-muted)]' : 'border-[var(--color-border)] text-[var(--color-fg-muted)]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-56">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-muted)]" size={14} />
          <input 
            type="text" placeholder="Search..." value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border border-[var(--color-border)] rounded-md py-2 pl-9 pr-3 text-sm bg-[var(--color-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition font-mono"
          />
        </div>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, i) => (
            <TiltCard key={post.id} post={post} index={i} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-sm text-[var(--color-fg-muted)] font-mono">No results found</p>
      )}
    </div>
  );
}
