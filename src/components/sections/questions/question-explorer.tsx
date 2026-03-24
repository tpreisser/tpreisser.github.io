"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useDeferredValue, useState } from "react";

import { phaseTitles } from "@/data/content";
import type { Question } from "@/types/content";

export function QuestionExplorer({
  questions,
}: Readonly<{
  questions: Question[];
}>) {
  const [query, setQuery] = useState("");
  const [phase, setPhase] = useState<string>("all");
  const [episodeId, setEpisodeId] = useState<string>("all");
  const deferredQuery = useDeferredValue(query);
  const episodeOptions = Array.from(
    new Map(
      questions.map((question) => [
        question.episodeId,
        {
          id: question.episodeId,
          number: question.episodeNumber,
          title: question.episodeTitle,
        },
      ]),
    ).values(),
  ).sort((left, right) => left.number - right.number);

  const filtered = questions.filter((question) => {
    const matchesPhase = phase === "all" || question.phase.toString() === phase;
    const matchesEpisode = episodeId === "all" || question.episodeId === episodeId;
    const haystack = `${question.questionText} ${question.episodeTitle}`.toLowerCase();
    const matchesQuery = haystack.includes(deferredQuery.trim().toLowerCase());

    return matchesPhase && matchesEpisode && matchesQuery;
  });

  return (
    <section className="site-container section-space">
      <div className="surface-card overflow-hidden p-6 sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,132,62,0.1),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(138,155,174,0.12),transparent_34%)]" />
        <div className="relative grid gap-4 xl:grid-cols-[1fr_0.3fr_0.42fr]">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by question, topic, or exact wording"
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
          <select
            value={episodeId}
            onChange={(event) => setEpisodeId(event.target.value)}
            className="glass-tile min-h-14 rounded-full px-6 text-base text-[color:var(--text-primary)] outline-none transition-colors focus:border-[color:var(--accent-oak)]"
          >
            <option value="all">All episodes</option>
            {episodeOptions.map((episode) => (
              <option key={episode.id} value={episode.id}>
                Episode {episode.number}: {episode.title}
              </option>
            ))}
          </select>
        </div>
        <div className="relative mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm leading-7 text-[color:var(--text-secondary)]">
            Showing {filtered.length} of {questions.length} questions.
          </p>
          <span className="rounded-full border border-[color:var(--border-default)] px-3 py-2 font-mono text-[0.64rem] uppercase tracking-[0.18em] text-[color:var(--accent-iron-light)]">
            Real Questions, Real Conversations
          </span>
        </div>
      </div>

      <div key={`${phase}-${episodeId}-${deferredQuery}`} className="mt-8 grid gap-4">
        {filtered.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.34, delay: index * 0.025 }}
          >
            <Link
              href={`/questions/${question.slug}`}
              className="surface-card card-lift block overflow-hidden p-6 sm:p-7"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-[0.64rem] uppercase tracking-[0.22em] text-[color:var(--accent-oak)]">
                  Phase {question.phase}
                </span>
                <span className="rounded-full border border-[color:var(--border-default)] px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[color:var(--accent-iron-light)]">
                  Episode {question.episodeNumber}
                </span>
              </div>
              <h3 className="mt-4 font-display text-[1.8rem] leading-[1.06] tracking-[-0.04em] text-[color:var(--text-primary)] italic">
                {question.questionText}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[color:var(--text-secondary)]">
                Answered in {question.episodeTitle}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
