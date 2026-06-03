import type { Metadata } from "next";
import { Cormorant_Garamond, Hanken_Grotesk, Playfair_Display, Bodoni_Moda } from "next/font/google";
import "@/styles/globals.css";

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

export const metadata: Metadata = {
  title: {
    default: "J Eleven Media | East Tennessee Web Design",
    template: "%s | J Eleven Media",
  },
  description:
    "J Eleven Media is a web design studio serving Lenoir City, Loudon, Knoxville, and East Tennessee. We build custom websites, offer maintenance plans, domain management, and advanced local SEO.",
  keywords: [
    "web design Lenoir City TN",
    "web design Knoxville TN",
    "web design East Tennessee",
    "Loudon County web design",
    "small business website Tennessee",
    "local SEO East Tennessee",
    "website maintenance Lenoir City",
    "affordable web design Tennessee",
    "J Eleven Media",
  ],
  authors: [{ name: "J Eleven Media", url: "https://www.jelevenmedia.com" }],
  creator: "J Eleven Media",
  metadataBase: new URL("https://www.jelevenmedia.com"),
  alternates: { canonical: "/" },
  icons: {
    icon: "/transparent.png",
    apple: "/transparent.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.jelevenmedia.com",
    siteName: "J Eleven Media",
    title: "J Eleven Media | East Tennessee Web Design",
    description:
      "Custom websites, maintenance plans, and local SEO for small businesses in Lenoir City, Knoxville, and East Tennessee.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "J Eleven Media — Web Design Studio in Lenoir City, TN",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "J Eleven Media | East Tennessee Web Design",
    description:
      "Custom websites and local SEO for small businesses across East Tennessee.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bodoni.variable} ${cormorant.variable} ${hanken.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
