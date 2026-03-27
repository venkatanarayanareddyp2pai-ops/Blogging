import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Venkata Narayana",
  description: "Frontend developer at P2Pai, based in India.",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-5 py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-8">About</h1>

      <div className="text-[var(--color-fg-muted)] leading-[1.8] space-y-4">
        <p>
          I'm <strong className="text-[var(--color-fg)] font-medium">Venkata Narayana</strong>,
          frontend developer at <strong className="text-[var(--color-fg)] font-medium">P2Pai</strong>.
        </p>
        <p>
          I work with React, Next.js, and TypeScript. I care about clean code,
          fast interfaces, and details that make products feel right.
        </p>
        <p>
          This blog is where I write about what I build and what I learn.
        </p>
      </div>


      <div className="mt-8 pt-8 border-t border-[var(--color-border)]">
        <h2 className="text-sm font-medium mb-4">Connect</h2>
        <div className="flex gap-5 text-sm text-[var(--color-fg-muted)]">
          <a href="#" className="hover:text-[var(--color-fg)] transition-colors underline underline-offset-4 decoration-[var(--color-border)]">GitHub</a>
          <a href="#" className="hover:text-[var(--color-fg)] transition-colors underline underline-offset-4 decoration-[var(--color-border)]">LinkedIn</a>
          <a href="#" className="hover:text-[var(--color-fg)] transition-colors underline underline-offset-4 decoration-[var(--color-border)]">Email</a>
        </div>
      </div>
    </div>
  );
}
