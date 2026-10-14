import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import CommandPalette from "@/components/layout/CommandPalette";

// NOTE: next/font/google fetches font files at build time, which requires
// outbound network access to Google Fonts. Uncomment this block when running
// locally (it just works there) — it self-hosts the fonts for you, no <link>
// tags needed. Then swap the className below to use the variables.
//
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-loaded",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans-loaded",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://souravsuman.dev";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Sourav Suman — Full-Stack & AI/ML Engineer",
    template: "%s | Sourav Suman",
  },
  description:
    "Portfolio of Sourav Suman — full-stack and AI/ML engineer (BVDU Pune × IIT Madras Data Science) building resilient distributed systems and applied AI.",
  keywords: [
    "Sourav Suman",
    "Full-Stack Engineer",
    "AI/ML Engineer",
    "IIT Madras",
    "Next.js",
    "Python",
    "Distributed Systems",
    "Laya",
    "Machine Learning",
  ],
  authors: [{ name: "Sourav Suman" }],
  creator: "Sourav Suman",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: "Sourav Suman — Full-Stack & AI/ML Engineer",
    description:
      "Production-grade distributed systems, real-time ML pipelines, and upstream open-source AI tooling.",
    siteName: "Sourav Suman Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sourav Suman — Full-Stack & AI/ML Engineer",
    description:
      "Production-grade distributed systems, real-time ML pipelines, and upstream open-source AI tooling.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sourav Suman",
  url: baseUrl,
  sameAs: [
    "https://github.com/LEVELING2108",
  ],
  jobTitle: "Full-Stack & AI/ML Engineer",
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "IIT Madras",
    },
    {
      "@type": "EducationalOrganization",
      name: "Bharati Vidyapeeth Deemed University, Pune",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${inter.variable} h-full scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-ink text-paper antialiased"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Nav />
        {children}
        <Footer />
        <CommandPalette />
      </body>
    </html>
  );
}
