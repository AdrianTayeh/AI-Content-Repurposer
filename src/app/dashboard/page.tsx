"use client";
import { useState } from "react";
import { Generation } from "./types";
import { GenerationList } from "./GenerationList";
import { GenerationDetails } from "./GenerationDetails";

export default function DashboardPage() {
  const [selected, setSelected] = useState<Generation | null>(null);
  const [, setDetailsOpen] = useState(false);

  const handleOpen = (generation: Generation) => {
    setSelected(generation);
    setDetailsOpen(true);
  };

  return (
    <main className="container mx-auto py-8">
      <GenerationList onOpen={handleOpen} />
      {selected && (
        <GenerationDetails
          generation={selected}
          onBack={() => setSelected(null)}
        />
      )}
    </main>
  );
}
