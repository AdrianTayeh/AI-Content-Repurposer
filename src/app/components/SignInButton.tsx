"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SignInButton() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") return null;
  if (session?.user) {
    const name = session.user.name || session.user.email || "User";
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    return (
      <div className="flex items-center gap-2 px-2">
        <Avatar>
          <AvatarImage src={session.user.image || undefined} alt={name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <span>Hi, {name}!</span>
        <Button variant="default" onClick={() => signOut()}>
          Sign out
        </Button>
      </div>
    );
  }
  return (
    <Button variant="default" onClick={() => router.push("/login")}>
      Sign in
    </Button>
  );
}
