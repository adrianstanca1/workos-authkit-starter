import { handleAuth } from "@workos-inc/authkit-nextjs";

const baseURL =
  process.env.NEXT_PUBLIC_APP_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

export const GET = handleAuth({
  returnPathname: "/dashboard",
  ...(baseURL ? { baseURL } : {}),
});
