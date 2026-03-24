import { Button } from "@/components/ui/button";
import { FadeInView } from "@/components/ui/fade-in-view";
import { SectionHeading } from "@/components/ui/section-heading";
import { seriesList } from "@/data/content";

const conceptSentences = [
  "Two men from the Kansas plains sit down to wrestle with the questions that keep people up at night.",
  "Not to lecture. Not to perform.",
  "To dig into Scripture, doubt, and the tension between what we were taught and what we actually believe.",
  "Iron & Oak is a place where faith gets pressure-tested and Christ remains the answer.",
];

export function ConceptSection() {
  const season = seriesList[0];

  return (
    <section className="site-container section-space">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="max-w-2xl">
          <SectionHeading
            eyebrow="Forged In The Open"
            title="This show does not drift. It starts at first things and keeps moving."
            description="The season is deliberate: start with the trustworthiness of Scripture, walk through the fracture of sin, confront redemption, and keep going until hope is no longer abstract."
          />
          <FadeInView delay={0.14} className="mt-8 flex flex-wrap gap-3">
            <Button href={`/series/${season.slug}`}>See the season arc</Button>
            <Button href="/questions" variant="ghost">
              Explore the hard questions
            </Button>
          </FadeInView>
        </div>

        <div className="relative">
          <div className="absolute left-4 top-2 bottom-2 w-px bg-[linear-gradient(180deg,rgba(138,155,174,0.12),rgba(196,132,62,0.58),rgba(138,155,174,0.12))]" />
          <div className="space-y-8">
            {conceptSentences.map((sentence, index) => (
              <FadeInView key={sentence} delay={0.08 * index} className="relative pl-14">
                <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--border-default)] bg-[color:var(--bg-secondary)] font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[color:var(--accent-oak)]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <p className="max-w-3xl font-display text-[clamp(1.55rem,2.7vw,2.8rem)] leading-[1.08] tracking-[-0.05em] text-[color:var(--text-primary)]">
                  {sentence}
                </p>
              </FadeInView>
            ))}
          </div>

          <FadeInView delay={0.38} className="mt-10 grid gap-3 sm:grid-cols-3">
            {season.phases.map((phase) => (
              <div
                key={phase.number}
                className="rounded-[1.35rem] border border-[color:var(--border-default)] bg-[color:color-mix(in_srgb,var(--bg-secondary)_78%,transparent)] px-4 py-4"
              >
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[color:var(--accent-oak)]">
                  Phase {phase.number}
                </p>
                <p className="mt-3 font-display text-[1.25rem] leading-[1.02] tracking-[-0.04em] text-[color:var(--text-primary)]">
                  {phase.title}
                </p>
              </div>
            ))}
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
