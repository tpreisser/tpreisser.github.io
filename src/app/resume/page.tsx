import type { Metadata } from "next";

import { TylerSiteShell } from "@/components/tyler-site-shell";

export const metadata: Metadata = {
  title: "Resume — Tyler Preisser | CPO at R Squared AI",
  description:
    "Tyler Preisser's professional resume. Chief Product Officer at R Squared AI. Fort Hays State University BS Engineering Design & Technology 2025. AI systems, automation, and product strategy.",
  alternates: { canonical: "/resume/" },
  openGraph: {
    title: "Resume — Tyler Preisser",
    description:
      "Professional resume: AI systems, automation, product strategy, operations, and engineering experience.",
    url: "https://tylerpreisser.com/resume/",
    images: [
      {
        url: "/og-resume.png",
        width: 1200,
        height: 630,
        alt: "Tyler Preisser — Professional Resume",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume — Tyler Preisser | CPO at R Squared AI",
    description:
      "Professional resume: AI systems, automation, product strategy, and operations.",
    images: ["/og-resume.png"],
  },
};

export default function ResumePage() {
  return (
    <>
      <div className="seo-fallback">
        <h1>Resume — Tyler Preisser</h1>
        <p>Chief Product Officer, Inventor &amp; Builder</p>
        <h2>Summary</h2>
        <p>
          Tyler Preisser is the Chief Product Officer at R Squared AI, where he
          focuses on making sure what gets built is what the next generation of
          business actually needs. He brings a mind that can build AI for any
          scenario — custom agentic solutions, back-office automation, and
          production-grade systems that run real operations end to end.
        </p>
        <h2>Experience</h2>
        <ul>
          <li>R Squared AI — Chief Product Officer (Jun 2025 – Present)</li>
          <li>Preisser Solutions — Owner/Operator (Apr 2025 – Present)</li>
          <li>Preisser Media — Founder (Feb 2014 – Feb 2026)</li>
          <li>Bird Dog Aviation — Student Pilot (Feb 2025 – Aug 2025)</li>
          <li>HG Oil — VP Operations / Solutions Engineer (Feb 2025 – Aug 2025)</li>
          <li>Hansen Hall FHSU — Resident Leader (Aug 2021 – Aug 2025)</li>
          <li>Verizon — Technology Sales Representative (Mar 2024 – May 2025)</li>
          <li>Collegiate Entrepreneurs&apos; Organization — Treasurer (Aug 2024 – Mar 2025)</li>
          <li>Truss Craft Structural Components — Truss Design Intern (May 2024 – Aug 2024)</li>
          <li>Preisser Farms — Farm Hand (Jun 2021 – Aug 2023)</li>
          <li>TNM Constructors LLC — Skilled Laborer (May 2013 – Aug 2022)</li>
          <li>College Works Painting — Door to Door Salesperson (Mar 2022 – Jun 2022)</li>
          <li>Applebee&apos;s — Server (Jan 2020 – May 2020)</li>
        </ul>
        <h2>Education</h2>
        <ul>
          <li>Fort Hays State University — BS Engineering Design &amp; Technology (2021–2025)</li>
          <li>Buhler High School — High School Diploma (2016–2021)</li>
        </ul>
        <h2>Achievements</h2>
        <ul>
          <li>World CEO Competition Finalist — Collegiate Entrepreneurs&apos; Organization</li>
          <li>Honorary Award, Faulkner Challenge 2023 — FHSU</li>
          <li>Epic Challenge 3rd Place — FHSU (Nov 2023)</li>
          <li>Tenaska Pitch Competition — University of Nebraska-Lincoln (Mar 2023)</li>
          <li>1st Place Sigma Nu Tau Entrepreneurship Competition — Jun 2022</li>
          <li>UMKC BLOCH Entrepreneurship Competition Best Venture — May 2022</li>
          <li>2nd Place Faulkner Challenge 2022 — SkySprayers</li>
          <li>2nd Place Kansas Startup Entrepreneurship Competition 2021 — SkySprayers</li>
          <li>4 Years Hansen Hall Honors Entrepreneurship Hall — FHSU</li>
        </ul>
        <nav>
          <a href="/">Home</a> | <a href="/projects/">Projects</a> |{" "}
          <a href="/Resume_Tyler_Preisser.pdf">Download Resume (PDF)</a> |{" "}
          <a href="mailto:tylerpreisser@gmail.com">Contact Tyler</a>
        </nav>
      </div>
      <TylerSiteShell />
    </>
  );
}
