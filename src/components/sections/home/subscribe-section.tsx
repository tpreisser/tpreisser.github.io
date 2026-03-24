import { BrandEmblem } from "@/components/ui/brand-emblem";
import { NewsletterForm } from "@/components/ui/newsletter-form";
import { PlatformIcon } from "@/components/ui/platform-icon";
import { siteConfig } from "@/lib/site";

const homePlatforms = siteConfig.socials.filter(
  (platform) =>
    platform.label === "YouTube" ||
    platform.label === "Spotify" ||
    platform.label === "Apple Podcasts" ||
    platform.label === "Instagram",
);

export function SubscribeSection() {
  return (
    <section className="site-container section-space">
      <div className="relative overflow-hidden rounded-[2.4rem] border border-[color:rgba(255,255,255,0.08)] bg-[linear-gradient(140deg,rgba(19,25,33,0.96),rgba(13,18,24,0.96)_48%,rgba(36,26,18,0.88)_100%)] px-8 py-12 shadow-[0_32px_90px_rgba(0,0,0,0.28)] sm:px-12 sm:py-14">
        <div className="absolute inset-0 material-iron opacity-30" />
        <div className="absolute inset-0 material-oak opacity-18" />
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.12),transparent)] lg:block" />

        <div className="relative z-10 grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="max-w-xl">
            <div className="flex items-center gap-4">
              <BrandEmblem className="h-16 w-16" />
              <span className="font-mono text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--accent-oak)]">
                Never Miss an Episode
              </span>
            </div>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,4vw,4.6rem)] leading-[0.92] tracking-[-0.05em] text-[color:var(--text-primary)]">
              Stay close to the conversations that matter.
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-8 text-[color:var(--text-secondary)]">
              Episode drops, reading notes, and the next hard question all in one place.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {homePlatforms.map((platform) => (
                <a
                  key={platform.label}
                  href={platform.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-full border border-[color:rgba(255,255,255,0.08)] bg-[color:rgba(255,255,255,0.04)] px-4 py-3 text-sm text-[color:var(--text-secondary)] transition-colors duration-300 hover:border-[color:rgba(196,132,62,0.3)] hover:text-[color:var(--text-primary)]"
                >
                  <PlatformIcon platform={platform.label} className="h-4 w-4" />
                  {platform.label}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:pl-10">
            <div className="forged-plaque forged-plaque--iron p-6 sm:p-8">
              <span className="font-mono text-[0.64rem] uppercase tracking-[0.22em] text-[color:var(--accent-oak-light)]">
                Join the List
              </span>
              <p className="mt-4 max-w-2xl font-display text-[1.85rem] leading-[1.02] tracking-[-0.04em] text-[color:var(--text-primary)]">
                One note when the next episode lands. No clutter. No filler.
              </p>
              <div className="mt-8 max-w-2xl">
                <NewsletterForm
                  placeholder="Enter your email"
                  buttonLabel="Join the List"
                  successLabel="You are on the list."
                />
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div>
                  <p className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-[color:var(--accent-oak)]">
                    Episode Drops
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--text-secondary)]">
                    Know when the next conversation goes live.
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-[color:var(--accent-oak)]">
                    Resources
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--text-secondary)]">
                    Get notes and links that deepen the episode.
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-[color:var(--accent-oak)]">
                    Behind The Scenes
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--text-secondary)]">
                    Follow the ideas shaping what comes next.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
