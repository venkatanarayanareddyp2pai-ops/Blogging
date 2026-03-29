"use client";

import { submitPostAction } from "@/app/actions";
import { useActionState } from "react";

export default function CreatePostForm() {
  const [state, formAction, isPending] = useActionState(async (_prevState: unknown, formData: FormData) => {
    try {
      await submitPostAction(formData);
      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }, { success: false });

  return (
    <div className="max-w-xl animate-fade-in">
      <h1 className="text-2xl font-bold tracking-tight mb-8">New Article</h1>
      
      {state.error && (
        <div className="mb-6 p-4 rounded-md bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20">
          <p className="text-sm text-red-600 dark:text-red-400 font-medium">{state.error}</p>
        </div>
      )}

      {state.success && (
        <div className="mb-6 p-4 rounded-md bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20">
          <p className="text-sm text-green-600 dark:text-green-400 font-medium">Article published successfully!</p>
        </div>
      )}
      
      <form action={formAction} className="space-y-6">
        <div>
          <label className="text-sm text-[var(--color-fg-muted)] mb-1.5 block">Title</label>
          <input 
            name="title" type="text" required
            className="w-full border border-[var(--color-border)] rounded-md px-3 py-2.5 text-sm bg-[var(--color-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition"
            placeholder="Article title"
          />
        </div>

        <div>
          <label className="text-sm text-[var(--color-fg-muted)] mb-1.5 block">Tags</label>
          <input 
            name="tags" type="text"
            className="w-full border border-[var(--color-border)] rounded-md px-3 py-2.5 text-sm bg-[var(--color-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition"
            placeholder="react, css, nextjs (comma separated)"
          />
          <p className="text-xs text-[var(--color-fg-muted)] mt-1.5">Separate tags with commas</p>
        </div>

        <div>
          <label className="text-sm text-[var(--color-fg-muted)] mb-1.5 block">Cover image</label>
          <div className="relative border border-dashed border-[var(--color-border)] rounded-md p-4 text-center cursor-pointer hover:border-[var(--color-accent)] transition-colors">
            <input type="file" name="coverFile" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <span className="text-sm text-[var(--color-fg-muted)]">Click to upload an image</span>
          </div>
        </div>

        <div>
          <label className="text-sm text-[var(--color-fg-muted)] mb-1.5 block">Content (Markdown)</label>
          <textarea 
            name="content" required rows={16}
            className="w-full border border-[var(--color-border)] rounded-md px-3 py-2.5 text-sm bg-[var(--color-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition resize-y font-mono leading-relaxed"
            placeholder="Write your article in markdown..."
          />
        </div>

        <button type="submit" disabled={isPending} className="bg-[var(--color-fg)] text-[var(--color-bg)] text-sm px-5 py-2.5 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
          {isPending ? "Publishing..." : "Publish"}
        </button>
      </form>
    </div>
  );
}