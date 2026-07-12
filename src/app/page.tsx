import Link from "next/link";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { SignInButton } from "@/components/sign-in-button";
import { SignOutButton } from "@/components/sign-out-button";

export default async function Home() {
  const { user } = await withAuth();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 bg-zinc-50 px-6 py-24 dark:bg-zinc-950">
      <div className="max-w-md text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          WorkOS AuthKit
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Welcome
        </h1>
        <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          Sign in with your WorkOS account. After you authenticate you will be taken
          to your dashboard.
        </p>
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
          Next.js 16 · AuthKit starter
        </p>
      </div>

      {user ? (
        <div className="rounded-2xl border border-zinc-200 bg-white px-8 py-6 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Signed in as</p>
          <p className="mt-1 font-medium text-zinc-900 dark:text-zinc-50">
            {user.email ?? user.id}
          </p>
          <Link
            href="/dashboard"
            className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-zinc-900 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            Open dashboard
          </Link>
          <SignOutButton />
        </div>
      ) : (
        <SignInButton />
      )}
    </div>
  );
}
