"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";

export default function SignInPage() {

  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    const { error } = await signIn.email({
      email,
      password,
      callbackURL: "/dashboard",
    });

    if (error) {
      setError(error.message ?? "Invalid credentials");
    }
  }

  async function handleGoogle() {
    await signIn.social({ provider: "google", callbackURL: "/dashboard" });
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6">
      <h1 className="text-2xl font-bold mb-6">Sign In</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="email" type="email" placeholder="Email" required className="border p-2 rounded" />
        <input name="password" type="password" placeholder="Password" required className="border p-2 rounded" />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button type="submit" className="bg-black text-white py-2 rounded">
          Sign In
        </button>
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