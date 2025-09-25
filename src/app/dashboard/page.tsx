
"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Generation } from "./types";
import { GenerationList } from "./GenerationList";
import { GenerationDetails } from "./GenerationDetails";

export default function DashboardPage() {
  const [selected, setSelected] = useState<Generation | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return null;
  }

  if (!session) {
    return null;
  }

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
