import type { Metadata } from "next";

import { TylerSiteShell } from "@/components/tyler-site-shell";

export const metadata: Metadata = {
  title: "Projects — Tyler Preisser | AI, Automation & Engineering Portfolio",
  description:
    "Explore Tyler Preisser's portfolio: R Squared AI, Preisser Solutions, BIA hydroelectric system, SkySprayers drone, Wife Supply Co, and more.",
  alternates: { canonical: "/projects/" },
  openGraph: {
    title: "Projects — Tyler Preisser",
    description:
      "12+ projects spanning AI systems, automation, engineering, media, and entrepreneurship.",
    url: "https://tylerpreisser.com/projects/",
    images: [
      {
        url: "/og-projects.png",
        width: 1200,
        height: 630,
        alt: "Tyler Preisser — Projects Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects — Tyler Preisser",
    description:
      "12+ projects spanning AI systems, automation, engineering, media, and entrepreneurship.",
    images: ["/og-projects.png"],
  },
};

export default function ProjectsPage() {
  return (
    <>
      <div className="seo-fallback">
        <h1>Projects — Tyler Preisser</h1>
        <p>
          A portfolio of ventures, client systems, engineering projects, and
          media work built by Tyler Preisser.
        </p>
        <ul>
          <li>
            <strong>R Squared AI</strong> — A $1M+ revenue AI consulting and
            integration firm co-founded with Rich Rivara and Will Godfrey.
            Builds agentic AI solutions for businesses.
          </li>
          <li>
            <strong>Preisser Solutions</strong> — Owner-operated automation
            company that turns operational chaos into streamlined systems.
          </li>
          <li>
            <strong>BIA</strong> — Hydroelectric animal-saving water filtration
            system designed to protect livestock from waterborne bacteria using
            power generated from pre-existing water pressure.
          </li>
          <li>
            <strong>SkySprayers</strong> — Autonomous agricultural spray-drone
            docking station with CAD drawings and full-size prototype.
          </li>
          <li>
            <strong>Wife Supply Co.</strong> — AI-powered gifting platform that
            synthesizes partner preferences to surface perfect gift ideas.
          </li>
          <li>
            <strong>Yard Inventory Systems</strong> — Live oil field parts and
            equipment tracking system for energy sector operations teams.
          </li>
          <li>
            <strong>Agentic Back Office Automations</strong> — Automated manual
            business processes making operations dramatically more efficient.
          </li>
          <li>
            <strong>The Iron and Oak Podcast</strong> — Protestant Christian
            ministry podcast co-founded with Lincoln Myers.
          </li>
          <li>
            <strong>Preisser Media</strong> — 300,000+ followers, 30M+ views
            across TikTok, Instagram, Facebook, YouTube, and Snapchat.
          </li>
          <li>
            <strong>CarBubble</strong> — Collapsible protective vehicle shelter
            taken from idea through multiple working prototypes.
          </li>
          <li>
            <strong>Whole Home CAD Design</strong> — Full residential
            construction designs with innovative layouts.
          </li>
          <li>
            <strong>Custom Jewelry Design</strong> — Bespoke engagement rings
            and fine jewelry designed in Autodesk Inventor and SOLIDWORKS.
          </li>
          <li>
            <strong>AI Submission Engine (Insurance)</strong> — Production
            document-extraction system for a large enterprise insurance
            brokerage that classifies broker submission packets and
            auto-populates Salesforce, with dual-model validation and a
            Salesforce-to-Majesco integration (via R Squared AI).
          </li>
          <li>
            <strong>Forge</strong> — Autonomous, OpenClaw-native pipeline that
            researches a business, studies the best sites in its industry, then
            builds and deploys a premium custom website end to end (Preisser
            Solutions).
          </li>
          <li>
            <strong>Query Dominance Agent System</strong> — A 10-agent, 6-phase
            system that predicts every query a prospect might run, audits who
            wins it across Google and AI search, and outputs an executable
            90-day plan to take the top result (Preisser Solutions).
          </li>
          <li>
            <strong>Alpha Matrix</strong> — A 6-agent stock-analysis system
            (Scanner, Sentiment, Quant, Pattern Matcher, Conviction Scorer,
            Portfolio Strategist) where each agent self-evolves via “soul files”
            tuned by prediction accuracy.
          </li>
          <li>
            <strong>Customer Reactivation Engine</strong> — Used AI to clean
            years of scattered dispatch data into clean segments for a regional
            home-services company, then built the schedule and targeted
            messaging that re-engaged dormant customers — reactivating 60%+ of
            them within six weeks and lifting booking conversion 45%+ (Preisser
            Solutions).
          </li>
          <li>
            <strong>Agentic Operations Automation (Oil &amp; Gas)</strong> —
            Built in-house as VP of Operations: agentic systems for invoice
            processing, vendor insurance verification, POI certifications, and
            payment automation (HG Oil).
          </li>
        </ul>
        <nav>
          <a href="/">Home</a> | <a href="/resume/">Resume</a> |{" "}
          <a href="mailto:tylerpreisser@gmail.com">Contact Tyler</a>
        </nav>
      </div>
      <TylerSiteShell />
    </>
  );
}
