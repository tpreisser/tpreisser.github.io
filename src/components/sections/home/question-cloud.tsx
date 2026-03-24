"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

import { BrandEmblem } from "@/components/ui/brand-emblem";
import type { Question } from "@/types/content";

const positions = [
  { left: "7%", top: "18%" },
  { left: "25%", top: "6%" },
  { left: "45%", top: "12%" },
  { left: "64%", top: "7%" },
  { left: "81%", top: "18%" },
  { left: "14%", top: "34%" },
  { left: "34%", top: "30%" },
  { left: "55%", top: "28%" },
  { left: "76%", top: "35%" },
  { left: "9%", top: "56%" },
  { left: "29%", top: "52%" },
  { left: "50%", top: "50%" },
  { left: "70%", top: "54%" },
  { left: "86%", top: "61%" },
  { left: "20%", top: "74%" },
];

export function QuestionCloud({
  questions,
}: Readonly<{
  questions: Question[];
}>) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative min-h-[48rem] overflow-hidden rounded-[2.2rem] border border-[color:rgba(255,255,255,0.06)] bg-[linear-gradient(180deg,rgba(18,24,31,0.82),rgba(12,16,22,0.94))] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.24)] sm:p-8">
      <div className="absolute inset-0 material-iron opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(196,132,62,0.14),transparent_26%),radial-gradient(circle_at_bottom,_rgba(138,155,174,0.14),transparent_30%)]" />

      <svg
        viewBox="0 0 1200 900"
        className="absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="question-branch" x1="240" y1="120" x2="860" y2="760">
            <stop stopColor="rgba(138,155,174,0.4)" />
            <stop offset="0.45" stopColor="rgba(196,132,62,0.65)" />
            <stop offset="1" stopColor="rgba(138,155,174,0.25)" />
          </linearGradient>
        </defs>
        <path d="M590 830V430" stroke="url(#question-branch)" strokeWidth="14" strokeLinecap="round" />
        <path d="M590 450C530 380 450 330 336 278" stroke="url(#question-branch)" strokeWidth="10" strokeLinecap="round" />
        <path d="M590 490C520 470 430 468 300 498" stroke="url(#question-branch)" strokeWidth="9" strokeLinecap="round" />
        <path d="M590 420C650 356 746 300 866 242" stroke="url(#question-branch)" strokeWidth="10" strokeLinecap="round" />
        <path d="M590 500C666 500 762 530 888 618" stroke="url(#question-branch)" strokeWidth="9" strokeLinecap="round" />
        <path d="M590 602C528 636 470 694 404 790" stroke="url(#question-branch)" strokeWidth="9" strokeLinecap="round" />
      </svg>

      {questions.map((question, index) => {
        const position = positions[index % positions.length];

        return (
          <motion.div
            key={question.id}
            className="absolute max-w-[16rem]"
            style={position}
            animate={{
              y: [0, -10 - (index % 4), 0],
              rotate: [index % 2 === 0 ? -2 : 1, index % 2 === 0 ? 1 : -1, index % 2 === 0 ? -2 : 1],
            }}
            transition={{
              duration: 7 + (index % 4),
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: index * 0.08,
            }}
          >
            <Link
              href={`/questions/${question.slug}`}
              onMouseEnter={() => setHovered(question.id)}
              onMouseLeave={() => setHovered(null)}
              className="question-leaf group block px-4 py-4 text-sm leading-6 text-[color:var(--text-secondary)] transition-[transform,border-color,opacity] duration-300 hover:border-[color:rgba(196,132,62,0.44)] hover:text-[color:var(--text-primary)]"
              style={{
                opacity: hovered && hovered !== question.id ? 0.22 : 1,
                transform: hovered === question.id ? "scale(1.06)" : undefined,
              }}
            >
              <span className="block font-mono text-[0.58rem] uppercase tracking-[0.24em] text-[color:var(--accent-oak)]">
                Phase {question.phase}
              </span>
              <span className="mt-2 block font-display text-[1.05rem] leading-[1.14] tracking-[-0.03em] italic text-[color:var(--text-primary)]">
                {question.questionText}
              </span>
            </Link>
          </motion.div>
        );
      })}

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-4">
        <BrandEmblem className="h-16 w-16" />
        <p className="max-w-xs text-center font-mono text-[0.62rem] uppercase tracking-[0.24em] text-[color:var(--text-tertiary)]">
          The canopy is built from the questions themselves.
        </p>
      </div>
    </div>
  );
}
