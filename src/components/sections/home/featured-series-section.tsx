import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { HorizontalEpisodeGallery } from "@/components/sections/home/horizontal-episode-gallery";
import type { Episode, Series } from "@/types/content";

export function FeaturedSeriesSection({
  series,
  episodes,
}: Readonly<{
  series: Series;
  episodes: Episode[];
}>) {
  return (
    <section className="section-space">
      <div className="site-container">
        <SectionHeading
          eyebrow="Season One"
          title="Twelve conversations. One deliberate arc."
          description="Start anywhere, but know the whole season is built to carry you from first questions to final hope."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={`/series/${series.slug}`}>Open series map</Button>
          <Button href="/episodes" variant="ghost">
            Browse all episodes
          </Button>
        </div>
        <div className="relative mt-12 overflow-hidden rounded-[2.4rem] border border-[color:rgba(255,255,255,0.08)] bg-[linear-gradient(180deg,rgba(15,20,27,0.94),rgba(13,18,24,0.98))] px-6 py-8 shadow-[0_30px_90px_rgba(0,0,0,0.24)] sm:px-8 sm:py-10 lg:px-10">
          <div className="absolute inset-0 material-iron opacity-34" />
          <div className="absolute inset-0 material-oak opacity-18" />
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:120px_120px]" />
          <div className="relative">
            <HorizontalEpisodeGallery items={episodes} />
          </div>
        </div>
      </div>
    </section>
  );
}
