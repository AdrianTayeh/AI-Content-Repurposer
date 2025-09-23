import { SummarySection } from "./SummarySection";
import { TweetThreadSection } from "./TweetThreadSection";
import { LinkedInSection } from "./LinkedInSection";
import { NewsletterSection } from "./NewsletterSection";
import { HashtagsSection } from "./HashtagsSection";
import { ContentEditorData } from "../ContentEditor/ContentEditorWrapper";

interface OutputCardProps {
  output: ContentEditorData;
}
export function OutputCard({ output }: OutputCardProps) {
  return (
    <section className="py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="mb-10">
          <SummarySection summary={output.summary} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TweetThreadSection tweetThread={output.tweetThread} />
          <LinkedInSection linkedInPost={output.linkedInPost} />
          <NewsletterSection newsletter={output.newsletter} />
          <HashtagsSection hashtags={output.hashtags} />
        </div>
      </div>
    </section>
  );
}
