"use client";

import { motion } from "framer-motion";
import { useDeferredValue, useState } from "react";

import { EpisodeCard } from "@/components/ui/episode-card";
import { phaseTitles } from "@/data/content";
import type { Episode } from "@/types/content";

export function EpisodeExplorer({
  episodes,
}: Readonly<{
  episodes: Episode[];
}>) {
  const [query, setQuery] = useState("");
  const [phase, setPhase] = useState<string>("all");
  const deferredQuery = useDeferredValue(query);

  const filtered = episodes.filter((episode) => {
    const matchesPhase = phase === "all" || episode.phase.toString() === phase;
    const haystack = `${episode.title} ${episode.subtitle} ${episode.description} ${episode.questionsAddressed.join(" ")}`.toLowerCase();
    const matchesQuery = haystack.includes(deferredQuery.trim().toLowerCase());

    return matchesPhase && matchesQuery;
  });

  return (
    <section className="site-container section-space">
      <div className="surface-card overflow-hidden p-6 sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,132,62,0.1),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(138,155,174,0.12),transparent_34%)]" />
        <div className="relative grid gap-4 lg:grid-cols-[1fr_0.32fr]">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by topic, episode title, or question"
            className="glass-tile min-h-14 rounded-full px-6 text-base text-[color:var(--text-primary)] outline-none transition-colors placeholder:text-[color:var(--text-tertiary)] focus:border-[color:var(--accent-oak)]"
          />
          <select
            value={phase}
            onChange={(event) => setPhase(event.target.value)}
            className="glass-tile min-h-14 rounded-full px-6 text-base text-[color:var(--text-primary)] outline-none transition-colors focus:border-[color:var(--accent-oak)]"
          >
            <option value="all">All phases</option>
            {Object.entries(phaseTitles).map(([number, title]) => (
              <option key={number} value={number}>
                Phase {number}: {title}
              </option>
            ))}
          </select>
        </div>
        <div className="relative mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm leading-7 text-[color:var(--text-secondary)]">
            Showing {filtered.length} of {episodes.length} episodes.
          </p>
          <span className="rounded-full border border-[color:var(--border-default)] px-3 py-2 font-mono text-[0.64rem] uppercase tracking-[0.18em] text-[color:var(--accent-iron-light)]">
            Season One Library
          </span>
        </div>
      </div>

      <div
        key={`${phase}-${deferredQuery}`}
        className="mt-8 grid gap-6 lg:grid-cols-2 xl:grid-cols-3"
      >
        {filtered.map((episode, index) => (
          <motion.div
            key={episode.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36, delay: index * 0.03 }}
          >
            <EpisodeCard episode={episode} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
