import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export function TweetThreadSection({
  tweetThread,
}: {
  tweetThread: string[] | undefined;
}) {
  if (!tweetThread || tweetThread.length === 0) return null;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(tweetThread.join("\n\n"));
    toast.success("Copied tweet thread to clipboard!");
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-sky-500" />
          Twitter Thread
        </CardTitle>
        <CardDescription>
          {tweetThread.length} tweets ready to post
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {tweetThread.map((tweet, index) => (
            <div key={index} className="p-3 bg-muted rounded-lg">
              <p className="text-sm">{tweet}</p>
              <div className="text-xs text-muted-foreground mt-2">
                {tweet.length}/280 characters
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-4 pt-4 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="gap-2"
          >
            <Copy className="h-4 w-4" />
            Copy All
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
