import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";
import StructuredData from "@/components/StructuredData";
import { ThemeProvider } from "@/lib/theme";

const SITE_URL = "https://aitoolshub.com";

export const metadata: Metadata = {
  title: {
    default: "AIToolsHub — Honest Reviews of AI Tools",
    template: "%s | AIToolsHub",
  },
  description:
    "Honest, human-written reviews of ChatGPT, Claude, Midjourney, Cursor, and every AI tool that matters. No hype — real experience from daily users.",
  keywords: [
    "AI tools review", "ChatGPT review", "Midjourney review", "Claude AI review",
    "best AI tools 2026", "AI writing tools", "AI coding tools", "AI image generation",
    "AI video tools", "AI productivity tools", "AI chatbot comparison",
  ],
  authors: [{ name: "AIToolsHub Editorial Team" }],
  creator: "AIToolsHub",
  publisher: "AIToolsHub",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "AIToolsHub",
    title: "AIToolsHub — Honest Reviews of AI Tools",
    description: "Real reviews from real users on every AI tool that matters.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "AIToolsHub — Honest AI Tool Reviews",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@aitoolshub",
    creator: "@aitoolshub",
    title: "AIToolsHub — Honest Reviews of AI Tools",
    description: "Real reviews from real users on every AI tool that matters.",
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

const ADSENSE_PUB_ID = "ca-pub-XXXXXXXXXXXXXXXX";
const ENABLE_ADSENSE = false;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="alternate" type="application/rss+xml" title="AIToolsHub RSS Feed" href="/feed.xml" />
        <meta name="theme-color" content="#6c3ce9" />
        {ENABLE_ADSENSE && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`}
            crossOrigin="anonymous"
          />
        )}
        <StructuredData type="website" />
      </head>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <ThemeProvider>
          <Header />
          <main style={{ flex: 1 }}>{children}</main>
          <NewsletterSection />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
