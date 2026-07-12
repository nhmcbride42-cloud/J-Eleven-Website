import type { Metadata } from "next";
import { Cormorant_Garamond, Hanken_Grotesk, Playfair_Display, Bodoni_Moda } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-bodoni-moda",
  display: "swap",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant-garamond",
  display: "swap",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair-display",
  display: "swap",
});
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-hanken-grotesk",
  display: "swap",
});

const SITE_URL = "https://www.jelevenmedia.com";

export const metadata: Metadata = {
  title: {
    default: "J Eleven Media | East Tennessee Web Design",
    template: "%s | J Eleven Media",
  },
  description:
    "J Eleven Media is a web design studio serving Lenoir City, Loudon, Knoxville, and East Tennessee. We build custom websites, offer maintenance plans, domain management, and advanced local SEO.",
  authors: [{ name: "J Eleven Media", url: SITE_URL }],
  creator: "J Eleven Media",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  icons: {
    icon: "/transparent.png",
    apple: "/transparent.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "J Eleven Media",
    title: "J Eleven Media | East Tennessee Web Design",
    description:
      "Custom websites, maintenance plans, and local SEO for small businesses in Lenoir City, Knoxville, and East Tennessee.",
  },
  twitter: {
    card: "summary_large_image",
    title: "J Eleven Media | East Tennessee Web Design",
    description:
      "Custom websites and local SEO for small businesses across East Tennessee.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "J Eleven Media",
  image: `${SITE_URL}/opengraph-image`,
  url: SITE_URL,
  telephone: "+1-865-684-0526",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lenoir City",
    addressRegion: "TN",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 35.7929,
    longitude: -84.2527,
  },
  areaServed: [
    { "@type": "City", name: "Lenoir City" },
    { "@type": "City", name: "Loudon" },
    { "@type": "City", name: "Knoxville" },
    { "@type": "State", name: "Tennessee" },
  ],
  founder: [
    { "@type": "Person", name: "Hayden McBride" },
    { "@type": "Person", name: "Olivia McBride" },
  ],
  sameAs: [
    "https://www.facebook.com/profile.php?id=61585042963260",
    "https://www.instagram.com/jelevenmedia/",
  ],
  description:
    "J Eleven Media is a web design studio serving Lenoir City, Loudon, Knoxville, and East Tennessee, offering custom websites, hosting, maintenance, and local SEO.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bodoni.variable} ${cormorant.variable} ${hanken.variable} ${playfair.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#e7e4dd" />
        <meta name="geo.region" content="US-TN" />
        <meta name="geo.placename" content="Lenoir City, Tennessee" />
        <meta name="geo.position" content="35.7929;-84.2527" />
        <meta name="ICBM" content="35.7929, -84.2527" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
