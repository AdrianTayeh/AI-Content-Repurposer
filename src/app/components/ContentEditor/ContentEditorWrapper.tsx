"use client";
import { ContentEditor } from "@/app/components/ContentEditor/ContentEditor";
import { OutputCard } from "@/app/components/Output/OutputCard";
import { useOutputStore } from "@/store/outputStore";

export type ContentEditorData = {
  summary?: string[];
  tweetThread?: string[];
  linkedInPost?: string;
  newsletter?: {
    title?: string;
    intro?: string;
    body?: string;
    cta?: string;
  };
  hashtags?: string[];
  keywords?: string[];
};

export default function ContentEditorWrapper() {
  const setOutput = useOutputStore((state) => state.setOutput);
  const output = useOutputStore((state) => state.output);
  console.log(output);

  const handleGenerate = async (content: string) => {
    if (typeof content !== "string" || !content.trim()) return;
    try {
      const res = await fetch("/api/repurpose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput: content }),
      });
      const data = await res.json();
      const output = {
        summary: Array.isArray(data.summary) ? data.summary : [],
        tweetThread: Array.isArray(data.tweetThread) ? data.tweetThread : [],
        linkedInPost:
          typeof data.linkedInPost === "string" ? data.linkedInPost : "",
        newsletter:
          typeof data.newsletter === "object" && data.newsletter !== null
            ? data.newsletter
            : { title: "", intro: "", body: "", cta: "" },
        hashtags: Array.isArray(data.hashtags) ? data.hashtags : [],
        keywords: Array.isArray(data.keywords) ? data.keywords : [],
      };
      setOutput(output);
    } catch (error) {
      console.error("Failed to generate content:", error);
    }
  };

  return (
    <>
      <ContentEditor onGenerate={handleGenerate} />
      {output && <OutputCard output={output} />}
    </>
  );
}
