"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export function LiteYouTube({
  videoId,
  title,
}: Readonly<{
  videoId: string | null;
  title: string;
}>) {
  useEffect(() => {
    if (!videoId) {
      return;
    }

    void import("lite-youtube-embed");
  }, [videoId]);

  if (!videoId) {
    return (
      <div className="surface-card flex min-h-[22rem] flex-col justify-between p-8 sm:p-10">
        <div>
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[color:var(--accent-oak)]">
            Episode video
          </span>
          <h3 className="mt-4 font-display text-[2rem] leading-[1.02] tracking-[-0.04em] text-[color:var(--text-primary)]">
            The full conversation will live here.
          </h3>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[color:var(--text-secondary)]">
            When the episode goes live, you will be able to watch it here and
            move straight into the discussion. Until then, the notes below show
            what the conversation is building toward.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="steel" href="/subscribe">
            Never miss an episode
          </Button>
          <Button variant="ghost" href="/episodes">
            Browse season one
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-[color:var(--border-default)] bg-[color:var(--bg-secondary)] shadow-[var(--shadow-soft)]">
      <lite-youtube
        videoid={videoId}
        playlabel={`Play ${title}`}
        params="rel=0"
      />
    </div>
  );
}
