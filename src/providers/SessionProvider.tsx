"use client";

import { useSession } from "@/lib/auth-client";
import type { UserRole } from "@/lib/auth";
import { SessionContext } from "@/contexts/session-context";

export function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = useSession();

  const user = session?.user
    ? {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: (session.user.role as UserRole) ?? "user",
      }
    : null;

  return (
    <SessionContext.Provider
      value={{
        user,
        isPending,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}