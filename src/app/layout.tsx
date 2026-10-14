import type { Metadata, Viewport } from "next";
import Script from "next/script";

import "./globals.css";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://tylerpreisser.com/#person",
      name: "Tyler Preisser",
      givenName: "Tyler",
      familyName: "Preisser",
      jobTitle: "Chief Product Officer",
      url: "https://tylerpreisser.com",
      image: "https://tylerpreisser.com/assets/tyler-headshot-cutout.png",
      email: "mailto:tylerpreisser@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hays",
        addressRegion: "KS",
        addressCountry: "US",
      },
      worksFor: {
        "@type": "Organization",
        "@id": "https://tylerpreisser.com/#rsquaredai",
        name: "R Squared AI",
        url: "https://rsquaredai.com",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Fort Hays State University",
        url: "https://www.fhsu.edu",
      },
      knowsAbout: [
        "Artificial Intelligence",
        "Agentic AI",
        "Automation Systems",
        "Machine Learning",
        "Product Strategy",
        "Operations Optimization",
        "Sales Intelligence",
        "Revenue Operations",
        "Engineering Design",
        "Entrepreneurship",
      ],
      sameAs: [
        "https://www.linkedin.com/in/tyler-preisser-803605233/",
        "https://github.com/tpreisser",
      ],
    },
    {
      "@type": "Organization",
      "@id": "https://tylerpreisser.com/#rsquaredai",
      name: "R Squared AI",
      url: "https://rsquaredai.com",
      description:
        "AI consulting and integration firm building production-grade agentic AI solutions for businesses.",
      founder: [
        { "@type": "Person", name: "Rich Rivara" },
        { "@type": "Person", name: "Will Godfrey" },
        { "@type": "Person", "@id": "https://tylerpreisser.com/#person" },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://tylerpreisser.com/#website",
      url: "https://tylerpreisser.com",
      name: "Tyler Preisser",
      publisher: { "@id": "https://tylerpreisser.com/#person" },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://tylerpreisser.com"),
  title: "Tyler Preisser - Chief Product Officer | AI Systems & Automation",
  description:
    "Tyler Preisser is the Chief Product Officer at R Squared AI, building production-grade AI agents, automation systems, and operational tools. Based in Hays, Kansas.",
  openGraph: {
    siteName: "Tyler Preisser",
    type: "website",
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
        <Script
          src="/assets/icon-cloud.js"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
