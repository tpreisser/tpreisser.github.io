import { FadeInView } from "@/components/ui/fade-in-view";
import { TextReveal } from "@/components/ui/text-reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: Readonly<{
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}>) {
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <FadeInView>
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--accent-oak)]">
            {eyebrow}
          </span>
        </FadeInView>
      ) : null}
      <TextReveal className="font-display text-[clamp(2.2rem,4vw,4rem)] leading-[0.94] tracking-[-0.04em] text-[color:var(--text-primary)]">
        {title}
      </TextReveal>
      {description ? (
        <FadeInView delay={0.12}>
          <p className="text-lg leading-8 text-[color:var(--text-secondary)]">
            {description}
          </p>
        </FadeInView>
      ) : null}
    </div>
  );
}
