"use client";
import { useState } from "react";
import * as mammoth from "mammoth";
import { Button } from "@/components//ui/button";
import { Textarea } from "@/components//ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components//ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components//ui/tabs";
import { Upload, FileText, Sparkles } from "lucide-react";

interface ContentInputProps {
  onGenerate: (content: string) => void;
}

export function ContentEditor({ onGenerate }: ContentInputProps) {
  const [content, setContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const ext = file.name.split(".").pop()?.toLowerCase();
    if (ext === "txt" || ext === "md") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setContent(text);
      };
      reader.readAsText(file);
    } else if (ext === "docx") {
      // Use mammoth to parse docx to text
      const arrayBuffer = await file.arrayBuffer();
      const { value } = await mammoth.extractRawText({ arrayBuffer });
      setContent(value);
    } else {
      alert("Unsupported file type. Please upload a .txt, .md, or .docx file.");
    }
  };

  const handleGenerate = async () => {
    if (!content.trim()) return;
    setIsGenerating(true);
    try {
      await onGenerate(content);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 bg-muted/30">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-medium mb-4">Upload Your Content</h2>
          <p className="text-muted-foreground">
            Paste your text directly or upload a file to get started
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Content Input
            </CardTitle>
            <CardDescription>
              Add your blog post, article, or notes here. The AI will analyze
              and repurpose your content.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="paste" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="paste">Paste Text</TabsTrigger>
                <TabsTrigger value="upload">Upload File</TabsTrigger>
              </TabsList>

              <TabsContent value="paste" className="space-y-4">
                <Textarea
                  placeholder="Paste your content here... (blog post, article, notes, etc.)"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[300px] resize-none"
                />
              </TabsContent>

              <TabsContent value="upload" className="space-y-4">
                <div className="relative border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                  <Upload className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4 pointer-events-none" />
                  <div className="space-y-2 pointer-events-none">
                    <p className="text-sm text-muted-foreground">
                      Drag and drop your file here, or <span className="underline">click to browse</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supports .txt, .md, .docx files
                    </p>
                  </div>
                  <input
                    type="file"
                    accept=".txt,.md,.docx"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    tabIndex={0}
                    aria-label="Upload file"
                  />
                </div>
                {content && (
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[200px] resize-none"
                  />
                )}
              </TabsContent>
            </Tabs>

            <div className="flex justify-between items-center mt-6 pt-6 border-t">
              <div className="text-sm text-muted-foreground">
                {content.length} characters
              </div>
              <Button
                onClick={handleGenerate}
                disabled={!content.trim() || isGenerating}
                className="gap-2"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate Content
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
