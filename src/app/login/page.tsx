"use client";
import { signIn, providerMap } from "auth";
import { useState, useTransition, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Sign in to ContentAI
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {/* Credentials Form */}
          <form
            className="flex flex-col gap-4"
            onSubmit={async (e) => {
              e.preventDefault();
              setError("");
              const formData = new FormData(e.currentTarget);
              const email = formData.get("email") as string;
              const password = formData.get("password") as string;
              const callbackUrlValue =
                (formData.get("callbackUrl") as string) || callbackUrl;
              startTransition(async () => {
                const result = await signIn("credentials", {
                  email,
                  password,
                  callbackUrl: callbackUrlValue,
                  redirect: false,
                });
                if (result?.ok) {
                  router.replace(callbackUrlValue);
                } else if (result?.error) {
                  setError("Invalid email or password");
                } else {
                  setError("Login failed. Please try again.");
                }
              });
            }}
          >
            <input type="hidden" name="callbackUrl" value={callbackUrl} />
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                name="password"
                id="password"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            {/* Only one callbackUrl input is needed */}
            <Button
              type="submit"
              className="w-full mt-2"
              disabled={isPending}
            >
              {isPending ? "Signing In..." : "Sign In"}
            </Button>
          </form>
          {/* Provider Buttons */}
          <div className="flex flex-col gap-2">
            {Object.values(providerMap).map(
              (provider: { id: string; name: string }) => (
                <form
                  key={provider.id}
                  onSubmit={async (e) => {
                    e.preventDefault();
                    await signIn(provider.id, {
                      callbackUrl,
                    });
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
              )
            )}
          </div>
          <div className="flex flex-col gap-2 pt-4">
            <span className="text-center text-sm text-muted-foreground">
              Don&#39;t have an account?
            </span>
            <Button asChild variant="secondary" className="w-full">
              <Link href="/register">Sign up</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}
