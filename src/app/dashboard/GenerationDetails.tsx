import React from "react";
import { Generation } from "./types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";

interface GenerationDetailsProps {
  generation: Generation | null;
  open: boolean;
  onClose: () => void;
}

export function GenerationDetails({ generation, open, onClose }: GenerationDetailsProps) {
  if (!generation) return null;
  const { outputs } = generation;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Generation Details</DialogTitle>
          <DialogDescription>
            Created: {new Date(generation.createdAt).toLocaleString()}
          </DialogDescription>
        </DialogHeader>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Original Content</h3>
          <p className="text-muted-foreground whitespace-pre-line">{generation.originalContent}</p>
        </div>
        <Separator />
        <div className="my-4">
          <h3 className="font-semibold mb-2">Summary</h3>
          <ul className="list-disc pl-5 space-y-1">
            {outputs.summary.map((point: string, i: number) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
        <Separator />
        <div className="my-4">
          <h3 className="font-semibold mb-2">Tweet Thread</h3>
          <ul className="space-y-1">
            {outputs.tweetThread.map((tweet, i) => (
              <li key={i} className="border rounded p-2 bg-muted text-sm">{tweet}</li>
            ))}
          </ul>
        </div>
        <Separator />
        <div className="my-4">
          <h3 className="font-semibold mb-2">LinkedIn Post</h3>
          <p className="whitespace-pre-line">{outputs.linkedinPost}</p>
        </div>
        <Separator />
        <div className="my-4">
          <h3 className="font-semibold mb-2">Newsletter</h3>
          <div className="space-y-1">
            {outputs.newsletter.title && <div><span className="font-medium">Title:</span> {outputs.newsletter.title}</div>}
            {outputs.newsletter.intro && <div><span className="font-medium">Intro:</span> {outputs.newsletter.intro}</div>}
            {outputs.newsletter.body && <div><span className="font-medium">Body:</span> {outputs.newsletter.body}</div>}
            {outputs.newsletter.cta && <div><span className="font-medium">CTA:</span> {outputs.newsletter.cta}</div>}
          </div>
        </div>
        <Separator />
        <div className="my-4">
          <h3 className="font-semibold mb-2">Hashtags</h3>
          <div className="flex flex-wrap gap-2">
            {outputs.hashtags.map((tag, i) => (
              <Badge key={i} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </div>
        <DialogClose asChild>
          <Button variant="outline" className="mt-4 w-full">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
