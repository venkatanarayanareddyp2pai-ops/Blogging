import { submitPostAction } from "@/app/actions";

export default function CreatePostPage() {
  return (
    <div className="max-w-xl animate-fade-in">
      <h1 className="text-2xl font-bold tracking-tight mb-8">New Article</h1>
      
      <form action={submitPostAction} className="space-y-6">
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

        <button type="submit" className="bg-[var(--color-fg)] text-[var(--color-bg)] text-sm px-5 py-2.5 rounded-md hover:opacity-90 transition-opacity">
          Publish
        </button>
      </form>
    </div>
  );
}
