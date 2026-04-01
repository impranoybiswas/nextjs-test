"use client";

import { toast } from "sonner";
import { signIn } from "@/lib/auth-client";

export default function GoogleSignInButton() {
  const handleGoogle = async () => {
    const { error } = await signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
    if (error) {
      toast.error("Sign in failed: " + error.message);
      return;
    }
    toast.success("Signed in successfully!");
  };
  return (
    <button onClick={handleGoogle} className="btn btn-natural">
      Continue with Google
    </button>
  );
}
