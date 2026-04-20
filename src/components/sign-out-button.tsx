"use client";

import { useAuth } from "@workos-inc/authkit-nextjs/components";

export function SignOutButton() {
  const { signOut } = useAuth();

  return (
    <button
      type="button"
      className="mt-4 w-full rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
      onClick={() => void signOut()}
    >
      Sign out
    </button>
  );
}
