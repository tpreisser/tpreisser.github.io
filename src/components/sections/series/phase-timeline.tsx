"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import type { Episode, Series } from "@/types/content";
import { formatEpisodeNumber } from "@/lib/utils";

export function PhaseTimeline({
  series,
  episodes,
}: Readonly<{
  series: Series;
  episodes: Episode[];
}>) {
  return (
    <section className="site-container section-space grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--accent-oak)]">
          Season arc
        </span>
        <h2 className="mt-5 font-display text-[clamp(2.4rem,4vw,4rem)] leading-[0.92] tracking-[-0.05em] text-[color:var(--text-primary)]">
          The whole season moves in one deliberate line.
        </h2>
        <p className="mt-5 max-w-md text-lg leading-8 text-[color:var(--text-secondary)]">
          Every phase carries its own questions, but the path stays clear:
          Scripture, the fall, redemption, life together, and the hope still to
          come.
        </p>
        <div className="surface-card mt-8 p-6">
          <svg
            viewBox="0 0 320 360"
            className="w-full"
            fill="none"
            stroke="currentColor"
          >
            <motion.path
              d="M160 330V70"
              stroke="url(#trunk)"
              strokeWidth="8"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            {series.phases.map((phase, index) => (
              <motion.path
                key={phase.number}
                d={`M160 ${100 + index * 46} C ${210 + index * 8} ${92 + index * 46}, ${240 + index * 6} ${86 + index * 46}, ${280 - index * 4} ${70 + index * 46}`}
                stroke="url(#branch)"
                strokeWidth="5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: 0.16 * index, duration: 0.8, ease: "easeOut" }}
              />
            ))}
            <defs>
              <linearGradient id="trunk" x1="160" y1="70" x2="160" y2="330">
                <stop stopColor="#8A9BAE" />
                <stop offset="1" stopColor="#C4843E" />
              </linearGradient>
              <linearGradient id="branch" x1="160" y1="70" x2="280" y2="250">
                <stop stopColor="#B8C5D4" />
                <stop offset="1" stopColor="#D4A054" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="space-y-6">
        {series.phases.map((phase) => {
          const phaseEpisodes = episodes.filter((episode) =>
            phase.episodeIds.includes(episode.id),
          );

          return (
            <article key={phase.number} className="surface-card p-7 sm:p-8">
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.24em] text-[color:var(--accent-oak)]">
                Phase {phase.number}
              </span>
              <h3 className="mt-4 font-display text-[2rem] leading-[0.98] tracking-[-0.04em] text-[color:var(--text-primary)]">
                {phase.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-[color:var(--text-secondary)]">
                {phase.description}
              </p>

              <div className="mt-6 grid gap-3">
                {phaseEpisodes.map((episode) => (
                  <Link
                    key={episode.id}
                    href={`/episodes/${episode.slug}`}
                    className="card-lift rounded-[1.3rem] border border-[color:var(--border-default)] bg-[color:color-mix(in_srgb,var(--bg-secondary)_70%,transparent)] px-5 py-4"
                  >
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[color:var(--accent-iron-light)]">
                      Episode {formatEpisodeNumber(episode.number)}
                    </span>
                    <h4 className="mt-2 font-display text-[1.35rem] leading-[1.05] tracking-[-0.03em] text-[color:var(--text-primary)]">
                      {episode.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
