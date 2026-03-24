import { Button } from "@/components/ui/button";

export function ComingSoonPanel({
  title,
  description,
}: Readonly<{
  title: string;
  description: string;
}>) {
  return (
    <section className="site-container section-space">
      <div className="surface-card overflow-hidden px-8 py-14 sm:px-12 sm:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(196,132,62,0.14),transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(138,155,174,0.18),transparent_28%)]" />
        <div className="relative max-w-3xl">
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--accent-oak)]">
            Coming soon
          </span>
          <h2 className="mt-5 font-display text-[clamp(2.4rem,4vw,4.2rem)] leading-[0.92] tracking-[-0.05em] text-[color:var(--text-primary)]">
            {title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-[color:var(--text-secondary)]">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/subscribe">Get notified</Button>
            <Button href="/" variant="ghost">
              Back home
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
