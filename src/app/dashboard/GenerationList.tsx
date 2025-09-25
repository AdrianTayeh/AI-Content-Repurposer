import React, { useEffect, useState } from "react";
import { Generation } from "./types";
import { GenerationCard } from "./GenerationCard";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface GenerationListProps {
  onOpen: (generation: Generation) => void;
}

export function GenerationList({ onOpen }: GenerationListProps) {
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGenerations() {
      setLoading(true);
      const res = await fetch("/api/repurpose");
      if (res.ok) {
        const data = await res.json();
        setGenerations(data);
      }
      setLoading(false);
    }
    fetchGenerations();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (generations.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No generations yet</h3>
        <p className="text-muted-foreground mb-4">
          Start creating content to see your generations here
        </p>
        <Button asChild>
          <Link href="/">Create Your First Generation</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Your Content Generations</h1>
          <p className="text-muted-foreground mt-2">
            Manage and revisit your AI-generated content
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          {generations.length} generations
        </Badge>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {generations.map((generation) => (
          <GenerationCard
            key={generation.id}
            generation={generation}
            onView={onOpen}
          />
        ))}
      </div>
    </>
  );
}
