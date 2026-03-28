import { getPosts } from "@/lib/db";
import { deletePostAction } from "@/app/actions";
import Link from "next/link";
import { Edit2, ExternalLink, FileText, Trash2, Plus } from "lucide-react";

export default async function AdminDashboard() {
  const posts = await getPosts();
  
  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
          <p className="text-[var(--color-fg-muted)]">Manage your articles and content.</p>
        </div>
        <Link href="/admin/create" className="inline-flex items-center gap-2 text-sm font-medium bg-[var(--color-fg)] text-[var(--color-bg)] px-5 py-2.5 rounded-lg hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-black/5">
          <Plus className="w-4 h-4" />
          New Article
        </Link>
      </div>

      <div className="mb-6 flex items-center justify-between border-b border-[var(--color-border)] pb-4">
        <h2 className="font-semibold flex items-center gap-2">
          <FileText className="w-5 h-5 text-[var(--color-fg-muted)]" />
          All Posts <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-fg-muted)] font-mono">{posts.length}</span>
        </h2>
      </div>

      {posts.length === 0 ? (
        <div className="border border-dashed border-[var(--color-border)] rounded-xl p-12 text-center bg-[var(--color-surface)]/30">
          <FileText className="w-10 h-10 text-[var(--color-border)] mx-auto mb-4" />
          <h3 className="font-medium mb-1">No articles yet</h3>
          <p className="text-sm text-[var(--color-fg-muted)] mb-6">Get started by creating your first post.</p>
          <Link href="/admin/create" className="text-sm font-medium text-[var(--color-accent)] hover:underline">
            Write an article →
          </Link>
        </div>
      ) : (
        <div className="grid gap-3">
          {posts.map((post) => (
            <div key={post.id} className="group relative bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl p-5 hover:border-[var(--color-fg-muted)]/30 hover:shadow-sm transition-all focus-within:border-[var(--color-accent)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <Link href={`/blog/${post.slug}`} className="font-semibold text-lg truncate hover:text-[var(--color-accent)] transition-colors inline-block" target="_blank">
                      {post.title}
                    </Link>
                    <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer" className="text-[var(--color-border)] hover:text-[var(--color-fg-muted)]">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-fg-muted)]">
                    <time dateTime={post.date} className="font-mono text-[11px] uppercase tracking-wider">
                      {new Date(post.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                    </time>
                    <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
                    <div className="flex gap-1.5 flex-wrap">
                      {(post.tags || []).map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-[2px] rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <Link href={`/admin/edit/${post.id}`} className="p-2 text-[var(--color-fg-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-surface)] rounded-md transition-colors" aria-label="Edit">
                    <Edit2 className="w-4 h-4" />
                  </Link>
                  <form action={deletePostAction.bind(null, post.id)}>
                    <button type="submit" className="p-2 text-[var(--color-fg-muted)] hover:text-red-500 hover:bg-red-500/10 rounded-md transition-colors" aria-label="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
