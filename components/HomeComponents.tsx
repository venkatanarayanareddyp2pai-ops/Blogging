"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Post } from "@/lib/db";

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(var(--color-fg) 1px, transparent 1px), linear-gradient(90deg, var(--color-fg) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-bg)]" />
    </div>
  );
}

function HomeProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ delay: 0.2, duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative w-full max-w-[340px] mx-auto group perspective-[1000px]"
    >
      {/* Outer subtle glow/border effect */}
      <div className="absolute -inset-[1px] bg-gradient-to-b from-[var(--color-border)] to-transparent rounded-[2rem] opacity-50 dark:opacity-20 pointer-events-none" />
      
      <div className="relative rounded-[2rem] overflow-hidden bg-[var(--color-bg)] border border-[var(--color-border)] shadow-2xl dark:shadow-none hover:border-gray-300 dark:hover:border-zinc-700 transition-colors duration-500">
        
        <div className="h-36 w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-900 relative overflow-hidden group/banner">
          <img 
            src="/profile.jpg" 
            alt="Profile cover"
            className="w-full h-full object-cover transition-transform duration-700 group-hover/banner:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
            <span className="text-[10px] text-[var(--color-fg-muted)] font-mono tracking-widest uppercase">/public/file.svg</span>
          </div>
        </div>

        <div className="absolute top-[5rem] left-6 w-[72px] h-[72px] rounded-full bg-[var(--color-bg)] p-1 border border-[var(--color-border)] shadow-lg shadow-black/5">
          <div className="w-full h-full rounded-full bg-[var(--color-surface)] flex items-center justify-center">
             <span className="font-serif text-xl font-bold text-[var(--color-fg)]">VN</span>
          </div>
        </div>

        {/* Profile Info */}
        <div className="px-7 pt-12 pb-7">
          <div className="flex items-center justify-between mb-1.5 gap-3">
            <h2 className="text-xl font-bold tracking-tight text-[var(--color-fg)]">Venkata Narayana Reddy</h2>
            <div className="px-2 py-0.5 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-fg-muted)] text-[10px] font-mono font-bold tracking-wider">
              Student& Developer
            </div>
          </div>
          
          <p className="text-sm font-medium text-[var(--color-fg-muted)] mb-5 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent)]"></span>
            </span>
            <span>Status:Not Ready</span>
          </p>
          
          <p className="text-[13px] text-[var(--color-fg-muted)] leading-relaxed mb-6 font-medium">
            Currently focused on learning, working on real-world projects, and documenting the journey through code and writing.
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <a href="/about" className="flex-1 text-center text-[13px] font-semibold bg-[var(--color-fg)] text-[var(--color-bg)] py-2.5 rounded-xl hover:opacity-90 transition-all active:scale-[0.98]">
              Read My Journey
            </a>
            <a href="https://github.com/venkatanarayanareddyp2pai-ops" target="_blank" rel="noreferrer" className="flex items-center justify-center border border-[var(--color-border)] py-2.5 px-4 rounded-xl hover:bg-[var(--color-surface)] text-[var(--color-fg)] transition-all active:scale-[0.98]" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function HomeHero() {
  return (
    <div className="relative py-12 sm:py-16 md:py-24 overflow-hidden">
      <GridBackground />
      
      <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-4 sm:mb-5"
          >
            Venkata Narayana
            <span className="text-[var(--color-accent)]">.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-base sm:text-lg md:text-xl text-[var(--color-fg-muted)] mb-6 sm:mb-8"
          >
            A passionate student and developer, dedicated to learning, building real-world projects, and sharing knowledge through writing. 
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="flex gap-3 flex-wrap"
          >
            <Link href="/blog" className="bg-[var(--color-fg)] text-[var(--color-bg)] text-sm font-medium px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity">
              Read Articles
            </Link>
            <Link href="/about" className="border border-[var(--color-border)] text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[var(--color-surface)] transition-colors">
              About Me
            </Link>
          </motion.div>
        </div>

        <div className="w-full md:w-auto max-w-sm">
          <HomeProfileCard />
        </div>
      </div>
    </div>
  );
}

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
      transition={{ delay: 0.1 + index * 0.06, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group block"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-square rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm hover:shadow-lg transition-shadow duration-300">
          {post.coverImage ? (
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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

export function PostGrid({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="text-center py-16 border border-dashed border-[var(--color-border)] rounded-xl"
      >
        <p className="text-sm text-[var(--color-fg-muted)] font-mono">No articles published yet</p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, i) => (
        <TiltCard key={post.id} post={post} index={i} />
      ))}
    </div>
  );
}
