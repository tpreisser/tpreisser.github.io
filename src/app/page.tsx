import type { Metadata } from "next";

import { TylerSiteShell } from "@/components/tyler-site-shell";

export const metadata: Metadata = {
  title: "Tyler Preisser - Chief Product Officer | AI Systems & Automation",
  description:
    "Tyler Preisser is the Chief Product Officer at R Squared AI, building production-grade AI agents, automation systems, and operational tools. Based in Hays, Kansas.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Tyler Preisser - Chief Product Officer | AI Systems & Automation",
    description:
      "CPO at R Squared AI. Building production AI agents that run real operations end to end — shipped in weeks, not quarters.",
    url: "https://tylerpreisser.com/",
    images: [
      {
        url: "/og-home.png",
        width: 1200,
        height: 630,
        alt: "Tyler Preisser - Chief Product Officer at R Squared AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tyler Preisser - Chief Product Officer | AI Systems & Automation",
    description:
      "CPO at R Squared AI. Building AI agents, automation systems, and operational tools.",
    images: ["/og-home.png"],
  },
};

export default function HomePage() {
  return (
    <>
      <div className="seo-fallback">
        <h1>Tyler Preisser — Chief Product Officer at R Squared AI</h1>
        <p>
          Tyler Preisser is the Chief Product Officer at R Squared AI, an AI
          consulting and integration firm that builds production-grade agentic AI
          solutions for businesses. He brings a mind that can build AI for any
          scenario — custom agentic solutions, back-office automation, and
          production systems that run real operations end to end.
        </p>
        <h2>What Tyler Does</h2>
        <p>
          At R Squared AI, Tyler focuses on making sure what gets built is what
          the next generation of business actually needs. The company was
          co-founded with Rich Rivara (CEO) and Will Godfrey (CTO) and builds
          AI agents and automation systems for PE portfolio companies, financial
          services, and insurance clients.
        </p>
        <p>
          Through Preisser Solutions, Tyler built automated back-office systems
          that ran entire workflows end to end for businesses — proving AI
          could do it better, faster, and cheaper.
        </p>
        <h2>Background</h2>
        <p>
          Tyler&apos;s path runs from farm operations and construction management
          through engineering design, direct sales, social media audiences of
          hundreds of thousands, and inventions taken to market — including an
          automated drone sprayer docking system and a hydroelectric livestock
          water purification device.
        </p>
        <h2>Skills &amp; Expertise</h2>
        <ul>
          <li>AI Systems &amp; Agentic Solutions</li>
          <li>Operations &amp; Process Automation</li>
          <li>Engineering &amp; Invention</li>
          <li>Product Strategy</li>
          <li>Sales &amp; Client Discovery</li>
          <li>Media &amp; Audience Growth</li>
          <li>Entrepreneurship</li>
        </ul>
        <h2>Education</h2>
        <p>
          Fort Hays State University — BS Engineering Design &amp; Technology
          (2021–2025)
        </p>
        <h2>Connect</h2>
        <nav>
          <a href="https://www.linkedin.com/in/tyler-preisser-803605233/">
            LinkedIn
          </a>{" "}
          | <a href="https://github.com/tpreisser">GitHub</a> |{" "}
          <a href="mailto:tylerpreisser@gmail.com">Email</a> |{" "}
          <a href="/projects/">Projects</a> |{" "}
          <a href="/resume/">Resume</a> |{" "}
          <a href="/Resume_Tyler_Preisser.pdf">Download Resume (PDF)</a>
        </nav>
      </div>
      <TylerSiteShell />
    </>
  );
}
