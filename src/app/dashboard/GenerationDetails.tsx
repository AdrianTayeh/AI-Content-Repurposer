import React from "react";
import { Generation } from "./types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Copy, Hash } from "lucide-react";
import { toast } from "sonner";

interface GenerationDetailsProps {
  generation: Generation | null;
  open: boolean;
  onClose: () => void;
}

export function GenerationDetails({
  generation,
  open,
  onClose,
}: GenerationDetailsProps) {
  if (!generation) return null;
  const { outputs } = generation;

  const handleCopy = (content: string, type: string) => {
    navigator.clipboard.writeText(content);
    toast.success(`${type} copied to clipboard!`);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderTweetThread = (tweets: string[]) => (
    <div className="space-y-3">
      {tweets.map((tweet, index) => (
        <div key={index} className="border rounded-lg p-4 bg-muted/20">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  Tweet {index + 1}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {tweet.length} characters
                </span>
              </div>
              <p className="text-sm">{tweet}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(tweet, `Tweet ${index + 1}`)}
              className="ml-2"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      <Button
        onClick={() => handleCopy(tweets.join("\n\n"), "Tweet Thread")}
        className="w-full"
        variant="outline"
      >
        <Copy className="h-4 w-4 mr-2" />
        Copy Entire Thread
      </Button>
    </div>
  );

  const renderContentSection = (
    title: string,
    content: string | string[],
    description?: string
  ) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            handleCopy(
              Array.isArray(content) ? content.join("\n") : content,
              title
            )
          }
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy
        </Button>
      </div>
      <Card>
        <CardContent className="p-6">
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {Array.isArray(content)
              ? content.map((line, i) => <div key={i}>{line}</div>)
              : content}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Generation Details</DialogTitle>
          <DialogDescription>
            Created: {formatDate(generation.createdAt)}
          </DialogDescription>
        </DialogHeader>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Original Content</h3>
          <p className="text-muted-foreground whitespace-pre-line">
            {generation.originalContent}
          </p>
        </div>
        <Tabs defaultValue="summary" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
            <TabsTrigger value="metadata">Metadata</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-6">
            {renderContentSection(
              "Key Points Summary",
              outputs.summary,
              "Condensed version highlighting the main points"
            )}
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Twitter Thread</h3>
                {renderTweetThread(outputs.tweetThread)}
              </div>
              <Separator />
              {renderContentSection(
                "LinkedIn Post",
                outputs.linkedinPost,
                "Professional post optimized for LinkedIn engagement"
              )}
            </div>
          </TabsContent>

          <TabsContent value="newsletter" className="space-y-6">
            {renderContentSection(
              "Newsletter Draft",
              [
                outputs.newsletter.title,
                outputs.newsletter.intro,
                outputs.newsletter.body,
                outputs.newsletter.cta,
              ]
                .filter(Boolean)
                .join("\n\n"),
              "Email newsletter content ready for your subscribers"
            )}
          </TabsContent>

          <TabsContent value="metadata" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Hash className="h-5 w-5" />
                    Hashtags
                  </CardTitle>
                  <CardDescription>
                    Suggested hashtags for social media reach
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {outputs.hashtags.map((tag, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => handleCopy(tag, "Hashtag")}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 w-full"
                    onClick={() =>
                      handleCopy(outputs.hashtags.join(" "), "All Hashtags")
                    }
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy All Hashtags
                  </Button>
                </CardContent>
              </Card>

              {/* Add more metadata sections here if needed */}
            </div>
          </TabsContent>
        </Tabs>
        <DialogClose asChild>
          <Button variant="outline" className="mt-4 w-full">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
