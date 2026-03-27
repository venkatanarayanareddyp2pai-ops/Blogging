"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { Post } from "@/lib/db";
import { useRef, MouseEvent, useState, useMemo } from "react";
import { Search } from "lucide-react";

function TiltCard({ post, index }: { post: Post; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 25 });

  function handleMouse(e: MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function resetMouse() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const date = new Date(post.date);
  const formattedDate = date.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });
  const formattedTime = date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
  const wordCount = post.content.split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 + index * 0.06, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      style={{ perspective: "800px" }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={resetMouse}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <Link href={`/blog/${post.slug}`} className="group block">
          <div className="relative aspect-square rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-blue-500/5">
            {post.coverImage ? (
              <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[var(--color-surface)] via-[var(--color-border)]/20 to-[var(--color-surface)] flex items-center justify-center">
                <span className="text-5xl font-bold text-[var(--color-border)] select-none">{post.title.charAt(0)}</span>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-5 pt-16">
              <p className="text-[11px] text-white/60 font-mono mb-2 tabular-nums">
                {formattedDate} · {formattedTime}
              </p>
              <h3 className="text-white font-semibold leading-snug text-base mb-2 line-clamp-2">
                {post.title}
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                {(post.tags || []).slice(0, 3).map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 text-white/80 backdrop-blur-sm font-mono">
                    {tag}
                  </span>
                ))}
                <span className="text-[10px] text-white/50 ml-auto font-mono">{readTime} min</span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
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
        <p className="py-16 text-center text-sm text-[var(--color-fg-muted)] font-mono">// no results found</p>
      )}
    </div>
  );
}
