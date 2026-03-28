"use client";

import { useActionState } from "react";
import { updatePostAction } from "@/app/actions";
import { Post } from "@/lib/db";

export default function EditPostForm({ post }: { post: Post }) {
  const [state, formAction, isPending] = useActionState(async (_prevState: unknown, formData: FormData) => {
    try {
      await updatePostAction(formData);
      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }, { success: false });

  return (
    <div className="max-w-xl animate-fade-in">
      <h1 className="text-2xl font-bold tracking-tight mb-8">Edit Article</h1>

      {state.error && (
        <div className="mb-6 p-4 rounded-md bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20">
          <p className="text-sm text-red-600 dark:text-red-400 font-medium">{state.error}</p>
        </div>
      )}

      {state.success && (
        <div className="mb-6 p-4 rounded-md bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20">
          <p className="text-sm text-green-600 dark:text-green-400 font-medium">Article saved successfully!</p>
        </div>
      )}

      <form action={formAction} className="space-y-6">
        <input type="hidden" name="id" value={post.id} />

        <div>
          <label className="text-sm text-[var(--color-fg-muted)] mb-1.5 block">Title</label>
          <input
            name="title"
            type="text"
            required
            defaultValue={post.title}
            className="w-full border border-[var(--color-border)] rounded-md px-3 py-2.5 text-sm bg-[var(--color-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="text-sm text-[var(--color-fg-muted)] mb-1.5 block">Tags</label>
          <input
            name="tags"
            type="text"
            defaultValue={(post.tags || []).join(", ")}
            className="w-full border border-[var(--color-border)] rounded-md px-3 py-2.5 text-sm bg-[var(--color-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition"
            placeholder="react, css, nextjs"
          />
          <p className="text-xs text-[var(--color-fg-muted)] mt-1.5">Separate tags with commas</p>
        </div>

        <div>
          <label className="text-sm text-[var(--color-fg-muted)] mb-1.5 block">Cover image</label>
          <div className="relative border border-dashed border-[var(--color-border)] rounded-md p-4 text-center cursor-pointer hover:border-[var(--color-accent)] transition-colors">
            <input type="file" name="coverFile" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <span className="text-sm text-[var(--color-fg-muted)]">{post.coverImage ? "Replace image" : "Upload image"}</span>
          </div>
          {post.coverImage && (
            <p className="text-xs text-[var(--color-fg-muted)] mt-1.5">Current: {post.coverImage}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-[var(--color-fg-muted)] mb-1.5 block">Content (Markdown)</label>
          <textarea
            name="content"
            required
            defaultValue={post.content}
            rows={16}
            className="w-full border border-[var(--color-border)] rounded-md px-3 py-2.5 text-sm bg-[var(--color-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition resize-y font-mono leading-relaxed"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-[var(--color-fg)] text-[var(--color-bg)] text-sm px-5 py-2.5 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  );
}
