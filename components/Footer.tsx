import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-16">
      <div className="max-w-5xl mx-auto px-5 py-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-[var(--color-fg-muted)]">
        <p>~Venkata Narayana</p>
        <div className="flex gap-5">
          <a href="https://github.com/venkatanarayanareddyp2pai-ops" className="hover:text-[var(--color-fg)] transition-colors">GitHub</a>
          <a href="#" className="hover:text-[var(--color-fg)] transition-colors">LinkedIn</a>
          <Link href="/admin/login" className="hover:text-[var(--color-fg)] transition-colors">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
