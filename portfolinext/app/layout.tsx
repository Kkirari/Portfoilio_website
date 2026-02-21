import type { Metadata } from "next";
import { Bai_Jamjuree, Playfair_Display } from "next/font/google";
import "./globals.css";
import "./v2.css";

const baiJamjuree = Bai_Jamjuree({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--body-font",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--serif-font",
});

export const metadata: Metadata = {
  title: "Portfolio - Kissanaphong",
  description: "Portfolio website of Kissanaphong Yaset",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${baiJamjuree.variable} ${playfair.variable}`}>
        {children}
      </body>
    </html>
  );
}
