import { getPosts } from "@/lib/db";
import { HomeHero, PostGrid } from "@/components/HomeComponents";

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <div className="max-w-5xl mx-auto px-5">
      <HomeHero />
      
      <section className="pb-20">
        {posts.length > 0 && (
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-[var(--color-border)]">
            <h2 className="text-sm font-semibold tracking-wide">Latest Articles</h2>
            <a href="/blog" className="text-xs text-[var(--color-accent)] hover:underline">View all →</a>
          </div>
        )}
        <PostGrid posts={posts.slice(0, 6)} />
      </section>
    </div>
  );
}
