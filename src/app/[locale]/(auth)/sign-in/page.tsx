"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  const [error, setError] = useState("");

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    const { error } = await signIn.email({
      email,
      password,
      callbackURL: "/dashboard",
    });

    if (error) {
      toast.error("Sign in failed: " + error.message);
      setError(error.message ?? "Something went wrong");
      return;
    }

    toast.success("Signed in successfully!");
  }

  async function handleGoogle() {
    const { error } = await signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
    if (error) {
      toast.error("Sign in failed: " + error.message);
      setError(error.message ?? "Something went wrong");
      return;
    }
    toast.success("Signed in successfully!");
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6">
      <h1 className="text-2xl font-bold mb-6">Sign In</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input name="email" type="email" placeholder="Email" required />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button
          variant="link"
          onClick={() => toast("Forgot password flow not implemented")}
        >
          Forgot Password?
        </Button>

        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>

      <div className="my-4 text-center text-gray-400">or</div>

      <button
        onClick={handleGoogle}
        className="w-full border py-2 rounded flex items-center justify-center gap-2"
      >
        Continue with Google
      </button>
    </div>
  );
}
