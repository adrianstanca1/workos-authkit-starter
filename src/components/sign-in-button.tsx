"use client";

import { useAuth } from "@workos-inc/authkit-nextjs/components";

export function SignInButton() {
  const { user, loading, refreshAuth } = useAuth();

  if (loading) {
    return (
      <span className="text-sm text-zinc-500 dark:text-zinc-400">Checking session…</span>
    );
  }

  if (user) {
    return null;
  }

  return (
    <button
      type="button"
      className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
      onClick={() => void refreshAuth({ ensureSignedIn: true })}
    >
      Sign in with WorkOS
    </button>
  );
}
