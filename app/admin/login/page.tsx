"use client";

import { useActionState, useEffect } from "react";
import { authenticateAction } from "@/app/actions";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(async (_prevState: unknown, formData: FormData) => {
    return await authenticateAction(formData);
  }, { success: false });

  useEffect(() => {
    if (state.success) {
      router.push("/admin");
      router.refresh();
    }
  }, [state, router]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold tracking-tight mb-1">Admin</h1>
        <p className="text-sm text-[var(--color-fg-muted)] mb-8">Sign in to manage articles</p>
        
        {state.error && (
          <p className="text-sm text-red-500 mb-5 p-3 rounded-md bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20">
            {state.error}
          </p>
        )}

        <form action={formAction} className="space-y-4">
          <div>
            <label className="text-sm text-[var(--color-fg-muted)] mb-1.5 block">Username</label>
            <input name="username" type="text" required
              className="w-full border border-[var(--color-border)] rounded-md px-3 py-2.5 text-sm bg-[var(--color-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="text-sm text-[var(--color-fg-muted)] mb-1.5 block">Password</label>
            <input name="password" type="password" required
              className="w-full border border-[var(--color-border)] rounded-md px-3 py-2.5 text-sm bg-[var(--color-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition"
            />
          </div>
          <button type="submit" disabled={isPending || state.success}
            className="w-full bg-[var(--color-fg)] text-[var(--color-bg)] text-sm px-5 py-2.5 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
          >
            {isPending ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
