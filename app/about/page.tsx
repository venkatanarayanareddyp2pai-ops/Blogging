import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Venkata Narayana",
  description: "Student, developer, and Data science undergraduate",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-5 py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-8">About</h1>

      <div className="text-[var(--color-fg-muted)] leading-[1.8] space-y-4">
        <p>
          I&apos;m <strong className="text-[var(--color-fg)] font-medium">Venkata Narayana</strong>, 
          an average student who is passionate about technology and building new things. 
          I completed my SSC from <strong className="text-[var(--color-fg)] font-medium">Bhashyam High School</strong> 
          with a GPA of <strong className="text-[var(--color-fg)] font-medium">9.2</strong>.
        </p>

        <p>
          I completed my Intermediate from <strong className="text-[var(--color-fg)] font-medium">Narayana Junior College</strong> 
          with <strong className="text-[var(--color-fg)] font-medium">900 marks</strong>.
          Currently, I am pursuing my undergraduate degree at 
          <strong className="text-[var(--color-fg)] font-medium"> Sri Indu College of Engineering and Technology</strong>, 
          which is affiliated with <strong className="text-[var(--color-fg)] font-medium">JNTUH</strong>, 
          in the branch of <strong className="text-[var(--color-fg)] font-medium">Data Science</strong>.
        </p>

        <p>
          Presently, I am learning programming, web development, and data science. 
          I love building new things, working on real-world projects, and continuously improving my skills.
          This blog is where I document what I learn, what I build, and my journey as a student and developer.
        </p>
      </div>

      <div className="mt-8 pt-8 border-t border-[var(--color-border)]">
        <h2 className="text-sm font-medium mb-4">Connect</h2>
        <div className="flex gap-5 text-sm text-[var(--color-fg-muted)]">
          <a href="https://github.com/venkatanarayanareddyp2pai-ops#" className="hover:text-[var(--color-fg)] transition-colors underline underline-offset-4 decoration-[var(--color-border)]">GitHub</a>
          <a href="#" className="hover:text-[var(--color-fg)] transition-colors underline underline-offset-4 decoration-[var(--color-border)]">LinkedIn</a>
          <a href="nvnreddy9009@gmail.com" className="hover:text-[var(--color-fg)] transition-colors underline underline-offset-4 decoration-[var(--color-border)]">Email</a>
        </div>
      </div>
    </div>
  );
}