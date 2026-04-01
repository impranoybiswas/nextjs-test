"use client";

import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();

  async function handleLogout() {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
          router.refresh(); // for session cache clear
        },
      },
    });
  }

  return (
    <button
      className="btn bg-red-400 text-white hover:bg-red-500"
      onClick={handleLogout}
    >
      Sign Out
    </button>
  );
}
