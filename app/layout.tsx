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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3033"),
  title: "AddInsight - IT, AI & US Market Information Hub",
  description: "Real-time insights for IT backend information, AI research, and US stock market data",
  openGraph: {
    title: "AddInsight - IT, AI & US Market Information Hub",
    description: "Real-time insights for IT Backend · AI Research · US Stock Market",
    siteName: "AddInsight",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AddInsight - IT, AI & US Market Information Hub",
    description: "Real-time insights for IT Backend · AI Research · US Stock Market",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
