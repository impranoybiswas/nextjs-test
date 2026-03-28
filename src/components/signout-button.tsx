"use client";

import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
          router.refresh(); // session cache clear করতে
        },
      },
    });
  }

  return (
    <Button
      size="default"
      variant="default"
      className="bg-red-500"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}
