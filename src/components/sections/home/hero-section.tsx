"use client";

import Link from "next/link";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { NewsletterForm } from "@/components/ui/newsletter-form";
import { seriesList } from "@/data/content";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

const heroStats = ["12 Episodes", "5 Phases", "100+ Questions"];

const meshOrbs = [
  "top-[6%] left-[3%] h-72 w-72 bg-[rgba(40,49,61,0.92)]",
  "top-[8%] right-[5%] h-96 w-96 bg-[rgba(196,132,62,0.18)]",
  "bottom-[2%] left-[18%] h-[26rem] w-[26rem] bg-[rgba(104,129,149,0.18)]",
  "bottom-[10%] right-[10%] h-[22rem] w-[22rem] bg-[rgba(196,132,62,0.14)]",
  "top-[34%] left-[40%] h-72 w-72 bg-[rgba(14,18,24,0.84)]",
];

const emberField = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  left: `${8 + ((index * 13) % 78)}%`,
  size: `${4 + (index % 4)}px`,
  duration: `${4.4 + (index % 6) * 0.45}s`,
  delay: `${(index % 8) * 0.28}s`,
}));

const seasonPhaseNodes = [
  { number: "01", title: "Scripture", top: "18%", left: "58%" },
  { number: "02", title: "The Fall", top: "30%", left: "73%" },
  { number: "03", title: "Redemption", top: "46%", left: "68%" },
  { number: "04", title: "Church", top: "63%", left: "56%" },
  { number: "05", title: "Hope", top: "77%", left: "42%" },
];

export function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const season = seriesList[0];

  useGSAP(
    () => {
      if (
        !labelRef.current ||
        !headlineRef.current ||
        !subtitleRef.current ||
        !ctasRef.current ||
        !newsletterRef.current ||
        !statsRef.current ||
        !visualRef.current
      ) {
        return;
      }

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const split = new SplitText(headlineRef.current, {
        type: "lines",
        mask: "lines",
      });

      const timeline = gsap.timeline();

      gsap.set(
        [
          labelRef.current,
          subtitleRef.current,
          ctasRef.current.children,
          newsletterRef.current,
          statsRef.current.children,
          visualRef.current,
        ],
        {
          opacity: 0,
          y: 22,
        },
      );

      timeline
        .to(labelRef.current, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" })
        .from(
          split.lines,
          {
            opacity: 0,
            y: 42,
            duration: 0.82,
            stagger: 0.1,
            ease: "power3.out",
          },
          0.12,
        )
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.45 }, 0.72)
        .to(ctasRef.current.children, { opacity: 1, y: 0, duration: 0.42, stagger: 0.07 }, 0.92)
        .to(newsletterRef.current, { opacity: 1, y: 0, duration: 0.5 }, 1.02)
        .to(statsRef.current.children, { opacity: 1, y: 0, duration: 0.36, stagger: 0.06 }, 1.14)
        .to(visualRef.current, { opacity: 1, y: 0, duration: 0.72, ease: "power3.out" }, 0.38);

      return () => {
        split.revert();
        timeline.kill();
      };
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="site-container py-4">
      <div className="hero-shell relative overflow-hidden px-8 py-10 sm:px-12 lg:px-16 lg:py-14">
        <div className="absolute inset-0 overflow-hidden">
          {meshOrbs.map((orb, index) => (
            <span
              key={orb}
              className={`hero-orb absolute rounded-full blur-3xl ${orb}`}
              style={{ animationDelay: `${index * 2.2}s` }}
            />
          ))}
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),transparent_28%,rgba(255,255,255,0.02)_72%,transparent)]" />
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:120px_120px]" />
        </div>

        <div className="relative z-10 grid min-h-[calc(100vh-7rem)] items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="max-w-3xl">
            <div className="mb-8">
              <Logo />
            </div>
            <p
              ref={labelRef}
              className="font-mono text-[0.74rem] uppercase tracking-[0.34em] text-[color:var(--accent-oak)]"
            >
              Faith-forward podcast from Hays, Kansas
            </p>

            <h1
              ref={headlineRef}
              className="mt-6 font-display text-[clamp(3.1rem,8vw,6.8rem)] leading-[0.84] tracking-[-0.06em] text-[color:var(--text-primary)]"
            >
              Where iron sharpens iron and deep roots hold.
            </h1>

            <p
              ref={subtitleRef}
              className="mt-6 max-w-2xl text-xl leading-9 text-[color:var(--text-secondary)]"
            >
              Hard questions. Honest faith. No easy answers.
            </p>

            <div ref={ctasRef} className="mt-10 flex flex-wrap gap-3">
              <Button href="/episodes" size="lg">
                Watch Episodes
              </Button>
              <Button href="/about" size="lg" variant="ghost">
                About the Show
              </Button>
            </div>

            <div ref={newsletterRef} className="mt-10 max-w-2xl">
              <NewsletterForm
                placeholder="Enter your email"
                buttonLabel="Join the List"
                successLabel="You are on the list."
              />
            </div>

            <div ref={statsRef} className="mt-8 grid gap-3 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div
                  key={stat}
                  className="rounded-[1.35rem] border border-[color:rgba(255,255,255,0.08)] bg-[color:rgba(255,255,255,0.03)] px-4 py-4 backdrop-blur-sm"
                >
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[color:var(--accent-oak)]">
                    {stat}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            ref={visualRef}
            className="relative min-h-[34rem] overflow-hidden rounded-[2rem] border border-[color:rgba(255,255,255,0.08)] bg-[linear-gradient(165deg,rgba(16,21,28,0.95),rgba(19,26,34,0.86)_42%,rgba(36,28,21,0.72)_100%)] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.32)] sm:p-8"
          >
            <div className="absolute inset-0 material-iron opacity-50" />
            <div className="absolute inset-0 material-oak opacity-30" />
            <div className="absolute -left-12 bottom-0 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(196,132,62,0.34),transparent_68%)] blur-3xl" />
            <div className="absolute right-[-2rem] top-[-1rem] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(138,155,174,0.3),transparent_66%)] blur-3xl" />

            {emberField.map((ember) => (
              <span
                key={ember.id}
                aria-hidden="true"
                className="ember-particle"
                style={{
                  left: ember.left,
                  width: ember.size,
                  height: ember.size,
                  animationDuration: ember.duration,
                  animationDelay: ember.delay,
                }}
              />
            ))}

            <svg
              viewBox="0 0 560 620"
              className="absolute inset-0 h-full w-full"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="hero-trunk" x1="278" y1="74" x2="278" y2="560">
                  <stop stopColor="#cfd9e4" />
                  <stop offset="0.4" stopColor="#7f94a8" />
                  <stop offset="1" stopColor="#3b4958" />
                </linearGradient>
                <linearGradient id="hero-branch" x1="210" y1="140" x2="456" y2="426">
                  <stop stopColor="#f0c792" />
                  <stop offset="0.35" stopColor="#c4843e" />
                  <stop offset="1" stopColor="#5d7690" />
                </linearGradient>
              </defs>

              <path
                d="M278 542V148"
                stroke="url(#hero-trunk)"
                strokeWidth="18"
                strokeLinecap="round"
                opacity="0.95"
              />
              <path
                d="M278 188C312 162 348 150 386 138"
                stroke="url(#hero-branch)"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M278 246C338 218 386 212 442 214"
                stroke="url(#hero-branch)"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M278 320C332 310 380 324 426 352"
                stroke="url(#hero-branch)"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M278 404C316 414 350 440 388 486"
                stroke="url(#hero-branch)"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M278 476C300 494 318 516 336 546"
                stroke="url(#hero-branch)"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <circle
                cx="278"
                cy="128"
                r="54"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="2"
              />
              <circle
                cx="278"
                cy="128"
                r="42"
                stroke="rgba(196,132,62,0.55)"
                strokeWidth="2"
                strokeDasharray="8 8"
              />
            </svg>

            <div className="absolute inset-0">
              {seasonPhaseNodes.map((node, index) => (
                <Link
                  key={node.number}
                  href={`/series/${season.slug}`}
                  className="card-lift absolute z-10 block max-w-[10.5rem] rounded-[1.1rem] border border-[color:rgba(255,255,255,0.08)] bg-[color:rgba(10,14,19,0.58)] px-4 py-3 backdrop-blur-md transition-colors duration-300 hover:border-[color:rgba(196,132,62,0.42)]"
                  style={{
                    top: node.top,
                    left: node.left,
                    transform: `translate(-50%, -50%) rotate(${index % 2 === 0 ? -3 : 2}deg)`,
                  }}
                >
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-[color:var(--accent-oak)]">
                    {node.number}
                  </span>
                  <strong className="mt-2 block font-display text-[1.18rem] leading-[1.02] tracking-[-0.04em] text-[color:var(--text-primary)]">
                    {node.title}
                  </strong>
                </Link>
              ))}
            </div>

            <div className="absolute bottom-6 left-6 right-6 z-10 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[1.6rem] border border-[color:rgba(255,255,255,0.08)] bg-[color:rgba(12,16,22,0.66)] p-5 backdrop-blur-md">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[color:var(--accent-oak)]">
                  Season One
                </span>
                <h2 className="mt-3 font-display text-[1.9rem] leading-[0.98] tracking-[-0.05em] text-[color:var(--text-primary)]">
                  {season.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[color:var(--text-secondary)]">
                  From Scripture to hope, the season grows like one connected root system.
                </p>
              </div>

              <div className="rounded-[1.6rem] border border-[color:rgba(255,255,255,0.08)] bg-[linear-gradient(180deg,rgba(196,132,62,0.16),rgba(12,16,22,0.48))] p-5 backdrop-blur-md">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[color:var(--accent-iron-light)]">
                  In the room
                </span>
                <p className="mt-3 font-display text-[1.45rem] leading-[1.08] tracking-[-0.04em] text-[color:var(--text-primary)]">
                  Faith is tested here, not decorated.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 text-[color:var(--text-tertiary)]">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.26em]">Scroll</span>
          <span className="scroll-indicator flex h-7 w-7 items-center justify-center rounded-full border border-[color:rgba(255,255,255,0.08)]">
            <span className="h-2 w-2 rotate-45 border-b border-r border-current" />
          </span>
        </div>
      </div>
    </section>
  );
}
