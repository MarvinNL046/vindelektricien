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
  themeColor: "#1e3a8a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vindelektricien.nl"),
  title: "VindElektricien.nl - Vind een Elektricien bij jou in de Buurt",
  description: "Vind snel een betrouwbare elektricien in jouw regio. Zoek op stad, provincie of postcode. Vergelijk elektriciens voor storingen, installaties, laadpalen en meer.",
  keywords: "elektricien, elektricien bij mij in de buurt, elektricien zoeken, storingsdienst, laadpaal installatie, meterkast, zonnepanelen, elektrische installatie, Nederland",
  authors: [{ name: "VindElektricien.nl" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "VindElektricien",
  },
  formatDetection: {
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://www.vindelektricien.nl",
    title: "VindElektricien.nl - Vind een Elektricien bij jou in de Buurt",
    description: "Vind snel een betrouwbare elektricien in jouw regio. Vergelijk elektriciens voor alle elektrische werkzaamheden.",
    siteName: "VindElektricien.nl",
  },
  twitter: {
    card: "summary_large_image",
    title: "VindElektricien.nl - Vind een Elektricien bij jou in de Buurt",
    description: "Vind snel een betrouwbare elektricien in jouw regio. Vergelijk elektriciens voor alle elektrische werkzaamheden.",
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
    canonical: "https://www.vindelektricien.nl",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
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
