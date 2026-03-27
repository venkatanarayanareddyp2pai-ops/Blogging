export function AuthorProfile({ author = "Venkata Narayana", role = "Frontend Developer at P2Pai" }: { author?: string, role?: string }) {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 py-10 border-t border-[var(--color-border-dim)] my-14 text-center sm:text-left">
      <div className="w-16 h-16 rounded-full flex-shrink-0 bg-[var(--color-surface)] border border-[var(--color-border-dim)] flex items-center justify-center">
        <span className="font-playfair text-xl font-bold text-[var(--color-gold)]">VN</span>
      </div>
      <div>
        <p className="font-dmsans text-xs text-[var(--color-gold)] font-semibold tracking-wide mb-1">{role}</p>
        <h3 className="font-playfair text-xl text-[var(--color-cream)] font-bold mb-2">{author}</h3>
        <p className="font-lora text-[var(--color-muted)] text-sm leading-relaxed max-w-lg">
          I'm a frontend developer based in India, currently working at P2Pai. I write 
          about what I learn — React, Next.js, CSS, design systems, and building 
          products that people actually enjoy using.
        </p>
      </div>
    </div>
  );
}
