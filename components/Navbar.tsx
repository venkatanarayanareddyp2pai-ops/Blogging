"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  
  const links = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Articles" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
        <nav className="flex items-center gap-6 text-sm">
          {links.map(l => (
            <Link 
              key={l.href} 
              href={l.href} 
              className={`transition-colors ${
                pathname === l.href 
                  ? 'text-[var(--color-fg)] font-medium' 
                  : 'text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
