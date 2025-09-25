import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, FileText, Share2, Trash2, Eye, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Generation } from "./types";
import React from "react";

interface GenerationCardProps {
  generation: Generation;
  onView: (generation: Generation) => void;
}

export function GenerationCard({ generation, onView }: GenerationCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <CardTitle className="text-lg leading-tight">
              {truncateText(generation.originalContent, 40)}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {formatDate(generation.createdAt)}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView(generation)}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {truncateText(generation.originalContent, 120)}
        </p>
        <Separator />
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Generated Content:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">
              Summary
            </Badge>
            <Badge variant="outline" className="text-xs">
              Tweet Thread ({generation.outputs.tweetThread.length})
            </Badge>
            <Badge variant="outline" className="text-xs">
              LinkedIn Post
            </Badge>
            <Badge variant="outline" className="text-xs">
              Newsletter
            </Badge>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {generation.outputs.hashtags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {generation.outputs.hashtags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{generation.outputs.hashtags.length - 3} more
              </Badge>
            )}
          </div>
        </div>
        <Button onClick={() => onView(generation)} className="w-full" size="sm">
          <Eye className="h-4 w-4 mr-2" />
          View Generation
        </Button>
      </CardContent>
    </Card>
  );
}
