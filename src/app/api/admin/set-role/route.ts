import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // শুধু admin role change করতে পারবে
  if (!session || session.user.role !== "admin") {
    return Response.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { userId, role } = await req.json();

  await auth.api.setRole({
    body: { userId, role },
    headers: await headers(),
  });

  return Response.json({ success: true });
}