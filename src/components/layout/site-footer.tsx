import Link from "next/link";

import { NewsletterForm } from "@/components/ui/newsletter-form";
import { Logo } from "@/components/ui/logo";
import { PlatformIcon } from "@/components/ui/platform-icon";
import { siteConfig } from "@/lib/site";

const footerSocials = ["YouTube", "Spotify", "Apple Podcasts", "Instagram"] as const;

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-[color:var(--border-default)] pt-24">
      <div className="absolute inset-x-0 top-0 h-px bg-[image:linear-gradient(90deg,transparent,var(--accent-iron),var(--accent-oak),transparent)]" />
      <div className="site-container grid gap-12 pb-12 lg:grid-cols-[1.3fr_0.8fr_0.8fr]">
        <div className="space-y-6">
          <Logo withTagline />
          <p className="max-w-xl text-lg leading-8 text-[color:var(--text-secondary)]">
            A faith-forward podcast for people asking hard questions without
            settling for easy answers.
          </p>
          <div className="surface-card p-6">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-[color:var(--accent-oak)]">
              Stay close
            </span>
            <p className="mt-3 text-base leading-7 text-[color:var(--text-secondary)]">
              Never miss an episode, a resource drop, or what comes next.
            </p>
            <div className="mt-5">
              <NewsletterForm compact buttonLabel="Join" successLabel="You are on the list." />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[color:var(--text-primary)]">
            Navigate
          </h3>
          <div className="mt-5 flex flex-col gap-3">
            {[...siteConfig.navigation, { label: "Subscribe", href: "/subscribe" }].map(
              (item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-base text-[color:var(--text-secondary)] transition-colors duration-300 hover:text-[color:var(--text-primary)]"
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>
        </div>

        <div>
          <h3 className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[color:var(--text-primary)]">
            Connect
          </h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {footerSocials.map((label) => {
              const social = siteConfig.socials.find((item) => item.label === label);

              if (!social) {
                return null;
              }

              return (
                <a
                  key={label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--border-default)] text-[color:var(--accent-iron)] transition-[color,border-color,box-shadow] duration-300 hover:border-[color:rgba(196,132,62,0.34)] hover:text-[color:var(--accent-oak)] hover:shadow-[var(--shadow-glow)]"
                >
                  <span className="sr-only">{label}</span>
                  <PlatformIcon platform={label} />
                </a>
              );
            })}
          </div>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-6 inline-flex text-base text-[color:var(--text-secondary)] transition-colors duration-300 hover:text-[color:var(--text-primary)]"
          >
            {siteConfig.email}
          </a>
        </div>
      </div>
      <div className="site-container flex flex-col gap-3 border-t border-[color:var(--border-default)] py-6 text-sm text-[color:var(--text-tertiary)] sm:flex-row sm:items-center sm:justify-between">
        <p>Built with conviction in Hays, Kansas.</p>
        <p>© {new Date().getFullYear()} The Iron & Oak Podcast</p>
      </div>
    </footer>
  );
}
