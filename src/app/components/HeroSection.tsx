import { Upload, Mail, Hash, MessageSquare, Share2 } from "lucide-react";
import { HeroLogin } from "./HeroLogin";

export default function HeroSection() {
  return (
    <section className="px-4 flex justify-center items-center min-h-[calc(100vh-5rem)] pb-24">
      <div className="container max-w-4xl text-center">
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">
          Turn One Piece of Content Into{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Five Different Formats
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Upload your blog post, article, or notes and instantly get summaries,
          tweet threads, LinkedIn posts, newsletters, and relevant hashtags.
          Save hours of content creation.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm text-muted-foreground">
              Upload Content
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MessageSquare className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-sm text-muted-foreground">Tweet Threads</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Share2 className="h-8 w-8 text-blue-500 mb-2" />
            <span className="text-sm text-muted-foreground">
              LinkedIn Posts
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Mail className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm text-muted-foreground">Newsletters</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Hash className="h-8 w-8 text-orange-600 mb-2" />
            <span className="text-sm text-muted-foreground">Hashtags</span>
          </div>
        </div>
        <HeroLogin />
      </div>
    </section>
  );
}
