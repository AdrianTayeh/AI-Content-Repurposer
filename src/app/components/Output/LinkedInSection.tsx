import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Share2 } from "lucide-react";
import { toast } from "sonner";

export function LinkedInSection({
  linkedInPost,
}: {
  linkedInPost: string | undefined;
}) {
  if (!linkedInPost) return null;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(linkedInPost);
    toast.success("Copied LinkedIn post to clipboard!");
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="h-5 w-5 text-blue-600" />
          LinkedIn Post
        </CardTitle>
        <CardDescription>Professional post ready for LinkedIn</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-4 bg-muted rounded-lg max-h-80 overflow-y-auto">
          <pre className="text-sm whitespace-pre-wrap font-sans">
            {linkedInPost}
          </pre>
        </div>
        <div className="flex gap-2 mt-4 pt-4 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="gap-2"
          >
            <Copy className="h-4 w-4" />
            Copy
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
