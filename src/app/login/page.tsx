"use client";
import React, { useEffect, useState } from "react";
import { signIn, getProviders } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Providers = Record<string, { id: string; name: string }>;

function SignInForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [providers, setProviders] = useState<Providers | null>(null);
  useEffect(() => {
    getProviders().then(setProviders);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Sign in to ContentAI
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            {providers &&
              Object.values(providers)
                .filter((provider) => provider.id !== "credentials")
                .map((provider) => (
                  <form
                    key={provider.id}
                    onSubmit={async (e) => {
                      e.preventDefault();
                      await signIn(provider.id, { callbackUrl });
                    }}
                  >
                    <input
                      type="hidden"
                      name="callbackUrl"
                      value={callbackUrl}
                    />
                    <Button type="submit" variant="outline" className="w-full">
                      Sign in with {provider.name}
                    </Button>
                  </form>
                ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SignInPage() {
  return <SignInForm />;
}
