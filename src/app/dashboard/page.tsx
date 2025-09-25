"use client";
import { useState } from "react";
import { Generation } from "./types";
import { GenerationList } from "./GenerationList";
import { GenerationDetails } from "./GenerationDetails";

export default function DashboardPage() {
  const [selected, setSelected] = useState<Generation | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleOpen = (generation: Generation) => {
    setSelected(generation);
    setDetailsOpen(true);
  };
  const handleClose = () => {
    setDetailsOpen(false);
    setSelected(null);
  };

  return (
    <main className="container mx-auto py-8">
      <GenerationList onOpen={handleOpen} />
      <GenerationDetails generation={selected} open={detailsOpen} onClose={handleClose} />
    </main>
  );
}
