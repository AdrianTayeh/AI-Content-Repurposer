import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Hash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export function HashtagsSection({
  hashtags,
}: {
  hashtags: string[] | undefined;
}) {
  if (!hashtags || hashtags.length === 0) return null;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(hashtags.join(" "));
    toast.success("Copied hashtags to clipboard!");
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Hash className="h-5 w-5 text-orange-600" />
          Suggested Hashtags
        </CardTitle>
        <CardDescription>
          Relevant hashtags to boost discoverability
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {hashtags.map((hashtag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="cursor-pointer hover:bg-secondary/80"
            >
              {hashtag}
            </Badge>
          ))}
        </div>
        <Separator className="my-4" />
        <div className="text-sm text-muted-foreground mb-4">
          Copy individual hashtags or the full set
        </div>
        <div className="flex gap-2">
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
