import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteUrl } from "@/lib/site-url";
import { socialLinks } from "@/lib/social-links";

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
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: { default: siteTitle, template: "%s | Hamza Bhulla" },
  description: siteDescription,
  applicationName: "Hamza Bhulla Portfolio",
  keywords: [
    "Hamza Bhulla",
    "full-stack developer",
    "React developer",
    "TypeScript developer",
    "web developer portfolio",
    "remote web developer",
    "Supabase developer",
    "PostgreSQL",
    "Node.js and Express",
    "Stripe integrations",
    "WebRTC",
    "Progressive web apps",
  ],
  authors: [{ name: "Hamza Bhulla", ...(siteUrl ? { url: siteUrl } : {}) }],
  creator: "Hamza Bhulla",
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ??
      "4xlcfy30PHZqClqqKCJymsXmDYVnIKrSZGYcpiDe928",
  },
  alternates: siteUrl ? { canonical: "/" } : undefined,
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
    ...(siteUrl ? {
      url: siteUrl,
      images: [{
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Hamza Bhulla — Full-Stack Developer",
      }],
    } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    ...(siteUrl ? { images: ["/opengraph-image"] } : {}),
  },
};

const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "heyhamza.dev@gmail.com";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  ...(siteUrl ? { url: siteUrl } : {}),
  mainEntity: {
    "@type": "Person",
    name: "Hamza Bhulla",
    jobTitle: "Full-Stack Developer",
    description: siteDescription,
    ...(siteUrl ? { url: siteUrl } : {}),
    email: contactEmail,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressRegion: "Punjab",
      addressCountry: "PK",
    },
    nationality: {
      "@type": "Country",
      name: "Pakistan",
    },
    knowsAbout: [
      "React",
      "TypeScript",
      "JavaScript",
      "TanStack Start",
      "Responsive web development",
      "Full-stack web applications",
      "REST APIs",
      "Node.js and Express",
      "Supabase Auth and Realtime",
      "PostgreSQL and Row Level Security",
      "Web Crypto API and AES-GCM group-message encryption",
      "Stripe payments and webhooks",
      "WebRTC",
      "Web Push notifications",
      "Progressive web apps and service workers",
      "Offline-first browser applications",
      "Automated tests with Vitest and Testing Library",
    ],
    sameAs: socialLinks.map((link) => link.href),
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const personJsonLd = JSON.stringify(personSchema).replace(/</g, "\\u003c");

  return (
    <html lang="en">
      <body className={inter.variable}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: personJsonLd }}
        />
        {children}
      </body>
    </html>
  );
}
