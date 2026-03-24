"use client";

import { useRef } from "react";

import { gsap, SplitText, useGSAP } from "@/lib/gsap";

export function ScriptureReveal({
  verse,
}: Readonly<{
  verse: string;
}>) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (
        !ref.current ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const split = new SplitText(ref.current, {
        type: "chars",
        charsClass: "scripture-char",
      });

      gsap.from(split.chars, {
        opacity: 0,
        y: 3,
        stagger: 0.02,
        duration: 0.45,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      });

      return () => {
        split.revert();
      };
    },
    { scope: ref },
  );

  return (
    <div className="surface-card p-8 sm:p-10">
      <span className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[color:var(--accent-oak)]">
        Scripture to hold onto
      </span>
      <p
        ref={ref}
        className="mt-5 font-display text-[clamp(1.55rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.03em] text-[color:var(--text-primary)]"
      >
        {verse}
      </p>
    </div>
  );
}
