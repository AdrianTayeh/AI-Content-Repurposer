"use client";
import { useState } from "react";
import { Generation } from "./types";
import { GenerationList } from "./GenerationList";
import { GenerationDetails } from "./GenerationDetails";

export default function DashboardPage() {
  const [selected, setSelected] = useState<Generation | null>(null);

  const handleOpen = (generation: Generation) => {
    setSelected(generation);
  };

  return (
    <main className="container mx-auto py-8">
      {selected ? (
        <GenerationDetails
          generation={selected}
          onBack={() => setSelected(null)}
        />
      ) : (
        <GenerationList onOpen={handleOpen} />
      )}
    </main>
  );
}
