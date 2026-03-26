import { NextRequest, NextResponse } from "next/server";

const routeConfig = {
  protected: ["/dashboard"],
  adminOnly: ["/admin"],
  moderatorAndAbove: ["/moderator"],
  authRoutes: ["/sign-in", "/sign-up"],
};

function getSessionCookie(request: NextRequest): string | undefined {
  // Better Auth possible cookie names
  const cookieNames = [
    "better-auth.session_token",
    "__Secure-better-auth.session_token",
    "better-auth.session",
    "__Secure-better-auth.session",
  ];

  for (const name of cookieNames) {
    const cookie = request.cookies.get(name);
    if (cookie?.value) return cookie.value;
  }

  return undefined;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionToken = getSessionCookie(request);
  const isLoggedIn = !!sessionToken;

  console.log("Session token found:", isLoggedIn, "| Path:", pathname);

  // Auth routes
  if (routeConfig.authRoutes.some((r) => pathname.startsWith(r))) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Protected routes
  if (routeConfig.protected.some((r) => pathname.startsWith(r))) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return NextResponse.next();
  }

  // Admin/Moderator routes
  const isAdminRoute = routeConfig.adminOnly.some((r) => pathname.startsWith(r));
  const isModRoute = routeConfig.moderatorAndAbove.some((r) => pathname.startsWith(r));

  if (isAdminRoute || isModRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    const sessionRes = await fetch(
      `${request.nextUrl.origin}/api/auth/get-session`,
      { headers: { cookie: request.headers.get("cookie") || "" } }
    );

    const session = await sessionRes.json();
    const role = session?.user?.role;

    if (isAdminRoute && role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (isModRoute && role !== "admin" && role !== "moderator") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};