import { SessionProvider } from "@/app/providers/session-provider";
import { Toaster } from "./ui/sonner";

export default function CustomLayout ({ children }: { children: React.ReactNode }) {
  return <SessionProvider><Toaster />{children}</SessionProvider>;
}
