export function AuthorProfile({ 
  author = "Venkata Narayana", 
  role = "Student: still learning, working, and blogging",
  age = 20,
}: { 
  author?: string; 
  role?: string;
  age?: number | string;
}) {
  return (
    <div className="group relative flex flex-col sm:flex-row items-center sm:items-start gap-6 p-8 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow duration-300 my-14 text-center sm:text-left overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-500/5 dark:to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative w-24 h-24 rounded-full flex-shrink-0 bg-gray-100 dark:bg-zinc-800 border-2 border-transparent group-hover:border-[var(--color-accent)] transition-colors duration-300 flex items-center justify-center overflow-hidden z-10">
        <span className="font-serif text-2xl font-bold text-[var(--color-accent)] group-hover:opacity-0 transition-opacity duration-300">
          {author?.split(" ").map(n => n[0]).join("").substring(0, 2) || "VN"}
        </span>
        
        <img
          src="/profile.jpg"
          alt={author}
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-110 group-hover:scale-100"
        />
      </div>

      <div className="relative z-10 flex flex-col justify-center min-h-[6rem]">
        <div className="flex items-center justify-center sm:justify-start gap-3 mb-1">
          <h3 className="font-sans text-2xl text-[var(--color-fg)] font-bold tracking-tight">{author}</h3>
          <span className="px-2 py-0.5 rounded-full bg-[var(--color-accent-muted)] text-[var(--color-accent)] text-xs font-medium">
            Age {age}
          </span>
        </div>
        
        <p className="font-sans text-sm text-[var(--color-accent)] font-semibold tracking-wide mb-3 uppercase">
          {role}
        </p>
        
        <p className="font-sans text-[var(--color-fg-muted)] text-sm leading-relaxed max-w-lg">
          Data science student passionate about programming, web development, and building useful projects.
        </p>
      </div>
    </div>
  );
}