import type { Metadata } from "next";
import Link from "next/link";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { SignOutButton } from "@/components/sign-out-button";

export const metadata: Metadata = {
  title: "Dashboard · WorkOS AuthKit starter",
  description: "Example route protected with ensureSignedIn",
};

export default async function DashboardPage() {
  const { user } = await withAuth({ ensureSignedIn: true });

  return (
    <div className="flex min-h-full flex-1 flex-col gap-8 bg-zinc-50 px-6 py-16 dark:bg-zinc-950">
      <div className="mx-auto w-full max-w-lg">
        <Link
          href="/"
          className="text-sm font-medium text-zinc-600 underline-offset-4 hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          ← Home
        </Link>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Dashboard
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          This route uses{" "}
          <code className="rounded bg-zinc-200 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
            {`withAuth({ ensureSignedIn: true })`}
          </code>
          . Unauthenticated visitors are redirected to AuthKit.
        </p>
        <div className="mt-8 rounded-2xl border border-zinc-200 bg-white px-6 py-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Signed in as</p>
          <p className="mt-1 font-medium text-zinc-900 dark:text-zinc-50">
            {user.email ?? user.id}
          </p>
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
