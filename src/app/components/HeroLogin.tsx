"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroLogin() {
  const { data: session } = useSession();

  if (session) return null;

  return (
    <div className="mt-24 flex justify-center">
      <Button asChild size="lg" className="px-8">
        <Link href="/login">Log in to save your generations</Link>
      </Button>
    </div>
  );
}
