"use client";

import { useState } from "react";
import { signUp, signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    const { error } = await signUp.email({ name, email, password });

    if (error) {
      setError(error.message ?? "Something went wrong");
      return;
    }
    router.push("/dashboard");
  }

  async function handleGoogle() {
    await signIn.social({ provider: "google", callbackURL: "/dashboard" });
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6">
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input name="name" type="text" placeholder="Name" required />
        <Input name="email" type="email" placeholder="Email" required  />
        <Input name="password" type="password" placeholder="Password" required  />

        

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button type="submit">Sign Up</Button>
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