"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { Post } from "@/lib/db";
import { useRef, MouseEvent } from "react";

/* ─── Animated Grid Background ─── */
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

/* ─── 3D Floating Code Block ─── */
function FloatingCodeBlock() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });

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

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 30, rotateZ: -2 }}
      animate={{ opacity: 1, y: 0, rotateZ: 0 }}
      transition={{ delay: 0.4, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative w-full max-w-sm"
    >
      <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/20 dark:shadow-black/50 ring-1 ring-white/10">
        <div className="bg-[#1e1e2e] p-5 font-mono text-[13px] leading-[1.7]" style={{ transform: "translateZ(40px)" }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-[#f38ba8]" />
            <div className="w-3 h-3 rounded-full bg-[#f9e2af]" />
            <div className="w-3 h-3 rounded-full bg-[#a6e3a1]" />
            <span className="text-[#6c7086] text-[11px] ml-auto font-sans">venkata.ts</span>
          </div>
          <div className="space-y-0.5">
            <p><span className="text-[#cba6f7]">const</span> <span className="text-[#89dceb]">developer</span> = {'{'}</p>
            <p className="pl-4"><span className="text-[#a6e3a1]">name</span>: <span className="text-[#a6e3a1]">"Venkata Narayana"</span>,</p>
            <p className="pl-4"><span className="text-[#a6e3a1]">role</span>: <span className="text-[#a6e3a1]">"Frontend Dev"</span>,</p>
            <p className="pl-4"><span className="text-[#a6e3a1]">company</span>: <span className="text-[#a6e3a1]">"P2Pai"</span>,</p>
            <p className="pl-4"><span className="text-[#a6e3a1]">passion</span>: <span className="text-[#a6e3a1]">"Building the web"</span>,</p>
            <p>{'}'};</p>
          </div>
        </div>
      </div>
      {/* Glow */}
      <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl -z-10" style={{ transform: "translateZ(-20px)" }} />
    </motion.div>
  );
}

/* ─── Hero Section ─── */
export function HomeHero() {
  return (
    <div className="relative py-16 md:py-24 overflow-hidden">
      <GridBackground />
      
      <div className="relative grid md:grid-cols-[1fr_auto] gap-12 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-5"
          >
            Venkata Narayana
            <span className="text-[var(--color-accent)]">.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-lg md:text-xl text-[var(--color-fg-muted)] mb-8"
          >
            Student Developer · Building for the web
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="flex gap-3"
          >
            <Link href="/blog" className="bg-[var(--color-fg)] text-[var(--color-bg)] text-sm font-medium px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity">
              Read Articles
            </Link>
            <Link href="/about" className="border border-[var(--color-border)] text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[var(--color-surface)] transition-colors">
              About Me
            </Link>
          </motion.div>
        </div>

        <div className="hidden md:block" style={{ perspective: "1000px" }}>
          <FloatingCodeBlock />
        </div>
      </div>
    </div>
  );
}

/* ─── 3D Tilt Card ─── */
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
      transition={{ delay: 0.1 + index * 0.08, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
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

/* ─── Post Grid ─── */
export function PostGrid({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="text-center py-16 border border-dashed border-[var(--color-border)] rounded-xl"
      >
        <p className="text-sm text-[var(--color-fg-muted)] font-mono">// no articles published yet</p>
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
