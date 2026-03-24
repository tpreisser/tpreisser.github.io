import { Button } from "@/components/ui/button";
import { FadeInView } from "@/components/ui/fade-in-view";
import { SectionHeading } from "@/components/ui/section-heading";

export function PageHeader({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
}: Readonly<{
  eyebrow: string;
  title: string;
  description: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
}>) {
  return (
    <section className="site-container pt-12">
      <div className="surface-card overflow-hidden px-8 py-14 sm:px-12 sm:py-[4.5rem]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(196,132,62,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(138,155,174,0.14),transparent_34%)]" />
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        {primaryAction || secondaryAction ? (
          <FadeInView delay={0.18} className="mt-8 flex flex-wrap gap-3">
            {primaryAction ? <Button href={primaryAction.href}>{primaryAction.label}</Button> : null}
            {secondaryAction ? (
              <Button href={secondaryAction.href} variant="ghost">
                {secondaryAction.label}
              </Button>
            ) : null}
          </FadeInView>
        ) : null}
      </div>
    </section>
  );
}
