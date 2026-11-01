import type { Metadata } from "next";
import { Shantell_Sans, Caveat, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, themeBootScript } from "@/components/sketch/ThemeProvider";
import { SoundProvider } from "@/components/sketch/SoundProvider";
import LayoutChrome from "@/components/layout/LayoutChrome";

const shantell = Shantell_Sans({
  subsets: ["latin"],
  variable: "--font-shantell",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
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
    "https://www.linkedin.com/in/sourav-suman-dev",
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
      data-theme="paper"
      className={`${shantell.variable} ${caveat.variable} ${jetbrains.variable} h-full scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="min-h-full flex flex-col antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <SoundProvider>
            <LayoutChrome>{children}</LayoutChrome>
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
