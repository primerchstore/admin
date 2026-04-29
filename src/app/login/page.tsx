"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { Alert01FreeIcons, Login } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const { data, error } = await authClient.signIn.email({
      email: fd.get("email") as string,
      password: fd.get("password") as string,
    });

    if (error) {
      setError(error.message ?? "Login failed");
      return;
    }

    // @ts-ignore
    if (data?.user?.role !== "ADMIN") {
      setError("Access denied. Admin only.");
      await authClient.signOut();
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <div className="h-dvh w-full flex justify-center items-center">
      <form onSubmit={handleSubmit} className="w-full max-w-95">
        <FieldGroup>
          <FieldSet>
            <FieldLegend className="text-center">Login to PRIMERCH</FieldLegend>
            <FieldDescription className="text-center">
              Admin filed only
            </FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                  Email
                </FieldLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="admin@example.com"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                  Password
                </FieldLabel>
                <Input
                  name="password"
                  type="password"
                  placeholder="*******"
                  required
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          {error && (
            <FieldSet>
              <Alert variant="destructive">
                <HugeiconsIcon icon={Alert01FreeIcons} />
                <AlertTitle>Login Failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </FieldSet>
          )}
          <Field orientation="vertical">
            <Button type="submit">
              {" "}
              <HugeiconsIcon icon={Login} /> Login
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
