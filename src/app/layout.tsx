import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { withAuth } from "@workos-inc/authkit-nextjs";
import type { NoUserInfo, UserInfo } from "@workos-inc/authkit-nextjs";
import { AuthKitProvider } from "@workos-inc/authkit-nextjs/components";
import "./globals.css";

function initialAuthFromSession(
  auth: UserInfo | NoUserInfo,
): Omit<UserInfo | NoUserInfo, "accessToken"> {
  if (!auth.user) {
    return auth;
  }
  const { accessToken, ...rest } = auth;
  void accessToken;
  return rest;
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WorkOS AuthKit starter",
  description: "Next.js 16 + AuthKit (WorkOS)",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await withAuth();
  const initialAuth = initialAuthFromSession(session);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthKitProvider initialAuth={initialAuth}>{children}</AuthKitProvider>
      </body>
    </html>
  );
}
