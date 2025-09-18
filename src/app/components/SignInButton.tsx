"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SignInButton() {
  const router = useRouter();
  return (
    <Button variant="outline" onClick={() => router.push("/login")}>Sign in</Button>
  );
}
