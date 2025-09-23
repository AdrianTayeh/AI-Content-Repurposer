import { redirect } from "next/navigation";
import { signIn, providerMap } from "auth";
import { AuthError } from "next-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";

const SIGNIN_ERROR_URL = "/error";

export default async function SignInPage(props: {
  searchParams: { callbackUrl?: string };
}) {
  const callbackUrl = props.searchParams?.callbackUrl || "/dashboard";

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
            action={async (formData) => {
              "use server";
              try {
                const email = formData.get("email") as string;
                const password = formData.get("password") as string;
                const callbackUrlValue =
                  (formData.get("callbackUrl") as string) || callbackUrl;
                const result = await signIn("credentials", {
                  email,
                  password,
                  callbackUrl: callbackUrlValue,
                  redirect: false,
                });
                if (result?.ok) {
                  return redirect(callbackUrlValue);
                }
              } catch (error) {
                if (error instanceof AuthError) {
                  return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
                }
                throw error;
              }
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
            {/* Only one callbackUrl input is needed */}
            <Button type="submit" className="w-full mt-2">
              Sign In
            </Button>
          </form>
          {/* Provider Buttons */}
          <div className="flex flex-col gap-2">
            {Object.values(providerMap).map(
              (provider: { id: string; name: string }) => (
                <form
                  key={provider.id}
                  action={async (formData) => {
                    "use server";
                    try {
                      await signIn(provider.id, {
                        redirectTo: formData.get("callbackUrl") as string,
                      });
                    } catch (error) {
                      if (error instanceof AuthError) {
                        return redirect(
                          `${SIGNIN_ERROR_URL}?error=${error.type}`
                        );
                      }
                      throw error;
                    }
                  }}
                >
                  <input type="hidden" name="callbackUrl" value={callbackUrl} />
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
