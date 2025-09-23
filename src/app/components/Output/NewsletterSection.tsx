import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Mail } from "lucide-react";
import { toast } from "sonner";

export function NewsletterSection({
  newsletter,
}: {
  newsletter:
    | {
        title?: string;
        intro?: string;
        body?: string;
        cta?: string;
      }
    | undefined;
}) {
  if (!newsletter) return null;
  const newsletterText = [
    newsletter.title,
    newsletter.intro,
    newsletter.body,
    newsletter.cta,
  ]
    .filter(Boolean)
    .join("\n\n");
  const copyToClipboard = () => {
    navigator.clipboard.writeText(newsletterText);
    toast.success("Copied newsletter to clipboard!");
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-purple-600" />
          Newsletter Draft
        </CardTitle>
        <CardDescription>
          Email-ready content for your subscribers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-4 bg-muted rounded-lg max-h-80 overflow-y-auto">
          <pre className="text-sm whitespace-pre-wrap font-sans">{newsletterText}</pre>
        </div>
        <div className="flex gap-2 mt-4 pt-4 border-t">
          <Button variant="outline" size="sm" onClick={copyToClipboard} className="gap-2">
            <Copy className="h-4 w-4" />
            Copy
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
