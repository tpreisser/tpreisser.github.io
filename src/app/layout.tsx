import type { Metadata, Viewport } from "next";
import Script from "next/script";

import "./globals.css";

export const metadata: Metadata = {
  title: "Tyler Preisser - AI Product & Automation Systems",
  description:
    "Tyler Preisser builds AI agents, automation systems, and product workflows through R Squared AI and Preisser Solutions.",
  icons: {
    icon: "/tyler-favicon.png",
    shortcut: "/tyler-favicon.png",
    apple: "/tyler-favicon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="darkreader-lock" />
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          href="/assets/index-BcRptNKY.css"
        />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Script
          src="/assets/index-B3e8QT6n.js"
          strategy="afterInteractive"
          type="module"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
