import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteUrl } from "@/lib/site-url";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteTitle = "Hamza Bhulla | Full-Stack Developer";
const siteDescription =
  "Portfolio of Hamza Bhulla, a full-stack developer building thoughtful, responsive web products with React, TypeScript, and practical backend integrations.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F3F1E9",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: "%s | Hamza Bhulla" },
  description: siteDescription,
  applicationName: "Hamza Bhulla Portfolio",
  authors: [{ name: "Hamza Bhulla", url: siteUrl }],
  creator: "Hamza Bhulla",
  // Verification is env-only: no hardcoded token fallback. Without
  // NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION the meta tag is not rendered
  // (the smoke test skips that assertion when the var is absent).
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Hamza Bhulla",
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    images: [{
      url: "/opengraph-image",
      width: 1200,
      height: 630,
      alt: "Hamza Bhulla, Full-Stack Developer",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
