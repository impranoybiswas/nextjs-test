"use client";


import { createContext, useContext } from "react";
import { useSession } from "@/lib/auth-client";
import type { UserRole } from "@/lib/auth";

type SessionContextType = {
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  } | null;
  isPending: boolean;
};

const SessionContext = createContext<SessionContextType>({
  user: null,
  isPending: true,
});

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();

  return (
    <SessionContext.Provider
      value={{
        user: session?.user
          ? {
              id: session.user.id,
              name: session.user.name,
              email: session.user.email,
              role: (session.user.role as UserRole) ?? "user",
            }
          : null,
        isPending,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export const useSessionContext = () => useContext(SessionContext);