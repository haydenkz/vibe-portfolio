import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hayden.ooo"),
  title: "Hayden — CS student • X.com shitposter • hayden.ooo",
  description:
    "An over-the-top, gradient-soaked, animated portfolio of Hayden: CS student, builder, and unapologetic shitposter on X.com.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hayden — CS student • builder • @haydendevs",
    description:
      "An over-the-top, gradient-soaked, animated portfolio of Hayden: CS student, builder, and unapologetic shitposter on X.com.",
    url: "/",
    siteName: "hayden.ooo",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Hayden — hayden.ooo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hayden — CS student • builder • @haydendevs",
    description:
      "An over-the-top, gradient-soaked, animated portfolio of Hayden: CS student, builder, and unapologetic shitposter on X.com.",
    site: "@haydendevs",
    creator: "@haydendevs",
    images: [
      {
        url: "/twitter-image",
        alt: "Hayden — hayden.ooo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white scroll-smooth` }>
        {children}
      </body>
    </html>
  );
}
