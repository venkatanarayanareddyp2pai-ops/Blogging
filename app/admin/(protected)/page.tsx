import { getPosts } from "@/lib/db";
import { deletePostAction } from "@/app/actions";
import Link from "next/link";

export default async function AdminDashboard() {
  const posts = await getPosts();
  
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <Link href="/admin/create" className="text-sm bg-[var(--color-fg)] text-[var(--color-bg)] px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
          New article
        </Link>
      </div>
      
      <p className="text-sm text-[var(--color-fg-muted)] mb-8 font-mono">{posts.length} article{posts.length !== 1 ? 's' : ''}</p>

      {posts.length === 0 ? (
        <p className="text-[var(--color-fg-muted)] text-sm py-10 text-center font-mono">// nothing here yet</p>
      ) : (
        <div className="border border-[var(--color-border)] rounded-lg overflow-hidden">
          {posts.map((post, i) => (
            <div key={post.id} className={`flex items-center justify-between px-4 py-3 text-sm ${i !== posts.length - 1 ? 'border-b border-[var(--color-border)]' : ''} hover:bg-[var(--color-surface)] transition-colors`}>
              <div className="min-w-0 flex-1 mr-4">
                <p className="font-medium truncate">{post.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-[var(--color-fg-muted)] font-mono">
                    {new Date(post.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  {(post.tags || []).map(tag => (
                    <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-accent-muted)] text-[var(--color-accent)] font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <Link href={`/admin/edit/${post.id}`} className="text-xs text-[var(--color-accent)] hover:underline">Edit</Link>
                <form action={deletePostAction.bind(null, post.id)}>
                  <button type="submit" className="text-xs text-red-500 hover:underline">Delete</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
