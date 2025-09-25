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
    const fullName = session.user.name || "User";
    const firstName = fullName.split(" ")[0];
    const initials = fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    return (
      <div className="flex items-center gap-2 px-2">
        <Avatar>
          <AvatarImage src={session.user.image || undefined} alt={firstName} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <span>Hi, {firstName}!</span>
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
