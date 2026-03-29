import { getPostBySlug, getPosts } from "@/lib/db";
import { notFound } from "next/navigation";
import { MDXRenderer } from "@/components/MDXRenderer";
import { ReadingProgress } from "@/components/ReadingProgress";
import Link from "next/link";
import type { Metadata } from "next";
import { AuthorProfile } from "@/components/AuthorProfile";
import Image from "next/image";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} — Venkata Narayana`,
    description: post.excerpt,
  };
}

export default async function SinglePostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getPosts();
  const relatedPosts = allPosts.filter(p => p.id !== post.id).slice(0, 3);
  
  const wordCount = post.content.split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));
  const date = new Date(post.date).toLocaleDateString("en-IN", { 
    month: "long", day: "numeric", year: "numeric" 
  });

  return (
    <>
      <ReadingProgress />
      <article className="max-w-2xl mx-auto px-5 py-16">
        <header className="mb-10">
          <Link href="/blog" className="text-sm text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors mb-6 inline-block">
            ← Back to articles
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-[var(--color-fg-muted)] mb-4">
            <span>{post.author}</span>
            <span>·</span>
            <time dateTime={post.date}>{date}</time>
            <span>·</span>
            <span>{readTime} min read</span>
          </div>
          {(post.tags || []).length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-[var(--color-accent-muted)] text-[var(--color-accent)] font-medium">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {post.coverImage && (
          <div className="rounded-lg overflow-hidden mb-10 border border-[var(--color-border)] relative aspect-video">
            <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
          </div>
        )}

        <div className="font-serif">
          <MDXRenderer content={post.content} />
        </div>

        <AuthorProfile author={post.author} />

        {relatedPosts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
            <h3 className="text-sm font-medium mb-4">More articles</h3>
            <div className="space-y-2">
              {relatedPosts.map(rp => (
                <Link 
                  key={rp.id} 
                  href={`/blog/${rp.slug}`}
                  className="block py-2 text-[var(--color-fg-muted)] hover:text-[var(--color-accent)] transition-colors"
                >
                  {rp.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
}
