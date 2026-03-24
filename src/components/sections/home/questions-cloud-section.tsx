import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { QuestionCloud } from "@/components/sections/home/question-cloud";
import type { Question } from "@/types/content";

export function QuestionsCloudSection({
  questions,
}: Readonly<{
  questions: Question[];
}>) {
  return (
    <section className="site-container section-space">
      <SectionHeading
        eyebrow="The Questions"
        title="The questions people are actually asking."
        description="These are the kinds of questions that send people searching at midnight, circling back after church, or texting a friend because they do not know who else to ask."
      />
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/questions">Browse all questions</Button>
        <Button href="/series/foundations-of-the-faith" variant="ghost">
          View the season map
        </Button>
      </div>
      <div className="mt-12">
        <QuestionCloud questions={questions} />
      </div>
    </section>
  );
}
