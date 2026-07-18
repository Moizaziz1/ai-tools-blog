import type { Metadata } from "next";
import { DM_Serif_Display, Inter, DM_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";
import StructuredData from "@/components/StructuredData";
import { ThemeProvider } from "@/lib/theme";
import Analytics from "@/components/Analytics";

const SITE_URL = "https://aitoolshub.com";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-serif",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-mono",
});

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
        url: `${SITE_URL}/og-image.svg`,
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
    images: [`${SITE_URL}/og-image.svg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

const ADSENSE_PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_ID || "";
const ENABLE_ADSENSE = !!ADSENSE_PUB_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${dmSerif.variable} ${inter.variable} ${dmMono.variable}`}>
      <head>
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
        <Analytics />
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
