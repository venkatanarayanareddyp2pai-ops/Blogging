import Link from "next/link";
import { logoutAction } from "@/app/actions";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto px-5 py-12 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-10">
      <aside className="border-b md:border-b-0 md:border-r border-[var(--color-border)] pb-4 md:pb-0 md:pr-8">
        <h2 className="font-bold text-sm mb-5">Admin</h2>
        <nav className="flex md:flex-col gap-3 text-sm">
          <Link href="/admin" className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors">Dashboard</Link>
          <Link href="/admin/create" className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors">New Article</Link>
          <div className="hidden md:block my-3 border-b border-[var(--color-border)]" />
          <Link href="/" className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors hidden md:block">← Site</Link>
          <form action={logoutAction}>
            <button type="submit" className="text-red-500 hover:text-red-400 transition-colors text-sm">Log out</button>
          </form>
        </nav>
      </aside>
      <main>{children}</main>
    </div>
  );
}
