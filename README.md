# WorkOS AuthKit + Next.js 16 starter

Next.js App Router (`src/app`), **AuthKit** (`@workos-inc/authkit-nextjs`), and **`src/proxy.ts`** (Next 16 convention — must sit next to `src/app/`, not the repo root).

## Prerequisites

In the [WorkOS Dashboard](https://dashboard.workos.com):

1. Create or select a project and copy **API key** and **Client ID**.
2. Set **Redirect URI** to: `http://localhost:3050/auth/callback` (must match `NEXT_PUBLIC_WORKOS_REDIRECT_URI` in `.env.local`). This repo pins `npm run dev` to **port 3050** so it does not fight with OrbStack/Docker or other apps that often bind **3000**.
3. For `signOut()` to work, set a **default Logout URI** under Redirects (e.g. `http://localhost:3050`).

## Setup

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

| Variable | Notes |
| -------- | ----- |
| `WORKOS_API_KEY` | `sk_test_...` |
| `WORKOS_CLIENT_ID` | `client_...` |
| `WORKOS_COOKIE_PASSWORD` | At least 32 characters (`openssl rand -base64 24`) |
| `NEXT_PUBLIC_WORKOS_REDIRECT_URI` | Must match the dashboard redirect URI |
| `NEXT_PUBLIC_APP_URL` | Optional. Set when the app is behind a reverse proxy or you need stable OAuth redirect hosts; passed to `handleAuth` as `baseURL`. On Vercel, `VERCEL_URL` is used automatically if this is unset. |

After a successful login, the callback sends users to **`/dashboard`** (`returnPathname` in `auth/callback/route.ts`). Change that path there if you prefer landing on `/`.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3050](http://localhost:3050). Use **Sign in with WorkOS** (client `refreshAuth` — no `getSignInUrl()` in Server Components).

### Linting and types

Next.js **16** no longer includes the `next lint` CLI command. Use **`npm run lint`** (ESLint). For TypeScript only: **`npm run typecheck`**.

Production server (after `npm run build`): **`npm run start`** — also listens on **port 3050**, matching dev and the redirect URI.

Quality gate (lint + types + production build):

```bash
npm run verify
```

On GitHub, **`.github/workflows/ci.yml`** runs the same `npm run verify` job on pushes and pull requests to `main` / `master` (with placeholder WorkOS env vars so the build can complete without secrets).

## Project layout

| Path | Role |
| ---- | ---- |
| `src/proxy.ts` | `authkitProxy()` + matcher (excludes static assets) |
| `src/app/auth/callback/route.ts` | OAuth callback — `handleAuth({ returnPathname: '/dashboard' })` + optional `baseURL` |
| `src/app/layout.tsx` | `AuthKitProvider` wrapper (required) |
| `src/components/sign-in-button.tsx` | Client sign-in |
| `src/components/sign-out-button.tsx` | Client sign-out |
| `src/app/dashboard/page.tsx` | Example protected page — `withAuth({ ensureSignedIn: true })` |

## Learn more

- [AuthKit Next.js SDK (README)](https://github.com/workos/authkit-nextjs)
- [Next.js Documentation](https://nextjs.org/docs)
