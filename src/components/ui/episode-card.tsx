import Link from "next/link";

import type { Episode } from "@/types/content";
import { formatEpisodeNumber } from "@/lib/utils";

export function EpisodeCard({
  episode,
  featured = false,
}: Readonly<{
  episode: Episode;
  featured?: boolean;
}>) {
  return (
    <Link
      href={`/episodes/${episode.slug}`}
      className={`surface-card group card-lift flex flex-col justify-between gap-8 overflow-hidden p-7 ${featured ? "min-h-[25rem] min-w-[20rem]" : "min-h-[22rem]"}`}
    >
      <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,_rgba(196,132,62,0.16),transparent_70%)] opacity-80" />
      <div className="flex items-start justify-between gap-6">
        <div>
          <span className="font-mono text-[3.4rem] leading-none tracking-[-0.08em] text-[color:var(--accent-oak)]">
            {formatEpisodeNumber(episode.number)}
          </span>
          <h3 className="mt-5 font-display text-[1.9rem] leading-[0.98] tracking-[-0.04em] text-[color:var(--text-primary)]">
            {episode.title}
          </h3>
          <p className="mt-4 max-w-md text-base leading-7 text-[color:var(--text-secondary)]">
            {episode.subtitle}
          </p>
        </div>
        <span className="rounded-full border border-[color:var(--border-default)] px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[color:var(--accent-iron-light)]">
          Phase {episode.phase}
        </span>
      </div>
      <div className="flex flex-col gap-6">
        <p className="text-base leading-7 text-[color:var(--text-secondary)]">
          {episode.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {episode.questionsAddressed.slice(0, 3).map((question) => (
            <span
              key={question}
              className="rounded-full border border-[color:var(--border-default)] px-3 py-2 text-xs leading-5 text-[color:var(--text-secondary)]"
            >
              {question}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
