import { Sparkles } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import SignInButton from "./SignInButton";

export default function Navbar() {
  return (
    <>
      <header className="flex h-16 w-full shrink-0 items-center px-4 md:px-6 justify-between">
        <div className="flex items-center gap-2">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">ContentAI</span>
          </Link>
        </div>

        <div className="flex gap-2">
          <SignInButton />
        </div>
      </header>
      <Separator />
    </>
  );
}
