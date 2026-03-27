"use client";

import { useState } from "react";

export function Newsletter() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 1000);
  };

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border-dim)] p-10 md:p-14 my-16 rounded-lg text-center relative overflow-hidden">
      <h3 className="font-playfair text-2xl md:text-3xl text-[var(--color-cream)] mb-3">Get new articles in your inbox</h3>
      <p className="font-lora text-[var(--color-muted)] text-sm max-w-md mx-auto mb-8">
        I send out an email when I publish something new. No spam, unsubscribe anytime.
      </p>
      
      {status === "success" ? (
        <p className="font-dmsans text-[var(--color-gold)] text-sm font-medium animate-fade-in">
          You're in! Thanks for subscribing.
        </p>
      ) : (
        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="your@email.com" 
            className="flex-1 bg-[var(--color-dark)] border border-[var(--color-border-dim)] rounded-md px-4 py-3 font-dmsans text-sm text-[var(--color-cream)] placeholder-[var(--color-muted)] focus:outline-none focus:border-[var(--color-gold)] transition-colors"
            required
            disabled={status === "submitting"}
          />
          <button 
            disabled={status === "submitting"}
            className="bg-[var(--color-cream)] text-[var(--color-dark)] font-dmsans text-sm font-medium px-6 py-3 rounded-md hover:opacity-85 transition-opacity whitespace-nowrap disabled:opacity-50"
          >
            {status === "submitting" ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      )}
    </div>
  );
}
