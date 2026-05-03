import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, DM_Serif_Display } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import AnalyticsScripts from "@/components/AnalyticsScripts";
import "./globals.css";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ibrat Generator",
    url: "https://ibratgenerator.com",
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Brat Generator",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    url: "https://ibratgenerator.com",
    description:
      "Create brat-style text, images, memes, and profile pictures instantly with this free online generator.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  },
];

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ibratgenerator.com"),
  title: {
    default: "Free Brat Generator",
    template: "%s | Ibrat Generator",
  },
  description: "Create Brat-style text, images, and graphics online. Free Brat generator for memes, captions, and social media.",
  openGraph: {
    siteName: "Free Brat Generator",
    title: "Free Brat Generator",
    description: "Free brat generator to create brat text, memes, images, and profile pictures. No signup. No watermark. Works on mobile and desktop.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
  verification: {
    google: "Udx1enXz-U1mTcBhnvsLB49_SMuif2lfkYmMvdL3-7M",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="p:domain_verify" content="a5fad79f5206533009b21255aa5b5b60" />
        <meta name="google-adsense-account" content="ca-pub-4083132987699578" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <Script
          id="schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AnalyticsScripts />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dmSerif.variable} flex min-h-screen flex-col antialiased`}
        suppressHydrationWarning
      >
        <Header />
        <main className="mx-auto flex-1 w-full max-w-screen-2xl px-4 sm:px-6">
          {children}
        </main>
        <Footer />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
