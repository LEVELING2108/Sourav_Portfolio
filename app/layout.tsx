import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Sourav — Full-Stack & AI/ML Engineer",
  description:
    "Portfolio of Sourav — full-stack and AI/ML engineer building production-grade software across web, ML pipelines, and applied AI.",
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
        {children}
      </body>
    </html>
  );
}
