import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import GoogleConsent from "@/components/GoogleConsent";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClientShellTop, ClientShellBottom } from "@/components/ClientShell";
import LeaderboardAd from "@/components/ads/LeaderboardAd";

// AdSense Publisher ID
const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID || "ca-pub-XXXXXXXXXXXXXXXX";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

// PWA Viewport configuration
export const viewport: Viewport = {
  themeColor: "#1a1a2e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rehabnearbyme.com"),
  title: "Rehab Near Me - Find Addiction Treatment Centers in the USA",
  description: "Find drug and alcohol rehabilitation centers near you. Search by state, city, or zip code. Get info on inpatient, outpatient, and detox programs across the United States.",
  keywords: "rehab near me, addiction treatment, drug rehab, alcohol rehab, detox centers, inpatient rehab, outpatient treatment, substance abuse, recovery centers, USA",
  authors: [{ name: "Rehab Near Me" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Rehab Near Me",
  },
  formatDetection: {
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.rehabnearbyme.com",
    title: "Rehab Near Me - Find Addiction Treatment Centers in the USA",
    description: "Find drug and alcohol rehabilitation centers near you across the United States.",
    siteName: "Rehab Near Me",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rehab Near Me - Find Addiction Treatment Centers in the USA",
    description: "Find drug and alcohol rehabilitation centers near you across the United States.",
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
  alternates: {
    canonical: "https://www.rehabnearbyme.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* PWA Icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />

        {/* Google AdSense - Deferred loading for better performance */}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ClientShellTop />
        <GoogleConsent />
        <Header />

        <main className="min-h-screen">
          {children}
        </main>

        {/* Pre-footer ad */}
        <LeaderboardAd className="mt-12" />

        <Footer />

        {/* Non-critical UI elements - lazy loaded */}
        <ClientShellBottom />
        <Analytics />
      </body>
    </html>
  );
}
