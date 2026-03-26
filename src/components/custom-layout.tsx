import { SessionProvider } from "@/app/providers/session-provider";

export default function CustomLayout ({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
