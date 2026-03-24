import Link from "next/link";

import { formatEpisodeNumber } from "@/lib/utils";
import type { Episode } from "@/types/content";

function plaqueVariant(phase: number) {
  return phase === 1 || phase === 3 || phase === 5 ? "forged-plaque--iron" : "forged-plaque--oak";
}

export function HorizontalEpisodeGallery({
  items,
}: Readonly<{
  items: Episode[];
}>) {
  return (
    <div className="relative">
      <div className="absolute left-5 top-0 bottom-0 w-px bg-[linear-gradient(180deg,rgba(138,155,174,0.18),rgba(196,132,62,0.72),rgba(138,155,174,0.18))] lg:left-1/2 lg:-translate-x-1/2" />
      <div className="space-y-8 lg:space-y-10">
        {items.map((episode, index) => {
          const phaseChanged = index === 0 || items[index - 1]?.phase !== episode.phase;
          const alignRight = index % 2 === 1;

          return (
            <div key={episode.id} className="relative">
              {phaseChanged ? (
                <div className="mb-5 pl-14 lg:mb-0 lg:absolute lg:left-1/2 lg:top-0 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:pl-0">
                  <div className="rounded-full border border-[color:rgba(255,255,255,0.08)] bg-[color:var(--bg-primary)] px-4 py-2 shadow-[0_14px_36px_rgba(0,0,0,0.18)] backdrop-blur-md">
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[color:var(--accent-oak)]">
                      Phase {episode.phase}
                    </span>
                  </div>
                </div>
              ) : null}

              <div className="grid gap-4 lg:grid-cols-[1fr_6rem_1fr] lg:items-center">
                <div
                  className={`${alignRight ? "lg:col-start-3" : "lg:col-start-1"} pl-14 lg:pl-0`}
                >
                  <Link
                    href={`/episodes/${episode.slug}`}
                    className={`forged-plaque ${plaqueVariant(episode.phase)} group block p-6 sm:p-7`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[color:var(--accent-oak-light)]">
                          Episode {formatEpisodeNumber(episode.number)}
                        </span>
                        <h3 className="mt-4 max-w-xl font-display text-[clamp(1.9rem,3vw,2.8rem)] leading-[0.96] tracking-[-0.05em] text-[color:var(--text-primary)]">
                          {episode.title}
                        </h3>
                      </div>
                      <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
                        {episode.phaseTitle}
                      </span>
                    </div>

                    <p className="mt-5 max-w-xl text-base leading-7 text-[color:var(--text-secondary)]">
                      {episode.subtitle}
                    </p>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-[color:var(--text-secondary)]">
                      {episode.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {episode.questionsAddressed.slice(0, 2).map((question) => (
                        <span
                          key={question}
                          className="question-leaf px-3 py-2 text-xs leading-5 text-[color:var(--text-primary)]"
                        >
                          {question}
                        </span>
                      ))}
                    </div>
                  </Link>
                </div>

                <div className="absolute left-0 top-8 lg:static">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[color:rgba(255,255,255,0.1)] bg-[linear-gradient(145deg,rgba(15,20,27,0.96),rgba(31,40,52,0.84))] shadow-[0_12px_28px_rgba(0,0,0,0.24)] lg:mx-auto lg:h-14 lg:w-14">
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[color:var(--accent-oak)] lg:text-[0.68rem]">
                      {formatEpisodeNumber(episode.number)}
                    </span>
                  </div>
                </div>

                <div className="hidden lg:block">
                  <div
                    className={`h-px w-full bg-[linear-gradient(90deg,rgba(196,132,62,0.08),rgba(196,132,62,0.48),rgba(138,155,174,0.1))] ${
                      alignRight ? "origin-left" : "origin-right"
                    }`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
