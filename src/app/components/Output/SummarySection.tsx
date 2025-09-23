import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, List } from "lucide-react";
import { toast } from "sonner";

export function SummarySection({ summary }: { summary: string[] | undefined }) {
  if (!summary || summary.length === 0) return null;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary.join("\n• "));
    toast.success("Copied summary to clipboard!");
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <List className="h-5 w-5 text-blue-600" />
          Key Points Summary
        </CardTitle>
        <CardDescription>
          Main insights distilled into bullet points
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {summary.map((point, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-medium flex-shrink-0 mt-0.5">
                {index + 1}
              </span>
              <span className="text-sm">{point}</span>
            </li>
          ))}
        </ul>
        <div className="flex gap-2 mt-6 pt-4 border-t">
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
