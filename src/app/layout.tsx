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
  title: "J Eleven Media — Web Design Studio",
  description: "J Eleven Media web design studio.",
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
