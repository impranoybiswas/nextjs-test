import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const routeConfig = {
  protected: ["/dashboard"],
  adminOnly: ["/admin"],
  moderatorAndAbove: ["/moderator"],
  authRoutes: ["/sign-in", "/sign-up"],
};

function getSessionCookie(request: NextRequest): string | undefined {
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

const intlMiddleware = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  // locale prefix ছাড়া actual pathname বের করো
  // e.g. /en/dashboard → /dashboard, /bn/sign-in → /sign-in
  const pathnameWithoutLocale = routing.locales.reduce(
    (acc, locale) =>
      acc.startsWith(`/${locale}/`)
        ? acc.slice(`/${locale}`.length)
        : acc === `/${locale}`
        ? "/"
        : acc,
    pathname
  );

  const sessionToken = getSessionCookie(request);
  const isLoggedIn = !!sessionToken;

  console.log("Auth check:", { pathname, pathnameWithoutLocale, isLoggedIn });

  /**
   * AUTH ROUTES (sign-in, sign-up)
   * logged in হলে → dashboard এ পাঠাও
   */
  if (routeConfig.authRoutes.some((r) => pathnameWithoutLocale.startsWith(r))) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard", origin));
    }
    // intl middleware চালাও
    return intlMiddleware(request);
  }

  /**
   * PROTECTED ROUTES (dashboard)
   * logged in না হলে → sign-in এ পাঠাও
   */
  if (routeConfig.protected.some((r) => pathnameWithoutLocale.startsWith(r))) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/sign-in", origin));
    }
    return intlMiddleware(request);
  }

  /**
   * ADMIN / MODERATOR ROUTES
   */
  const isAdminRoute = routeConfig.adminOnly.some((r) =>
    pathnameWithoutLocale.startsWith(r)
  );
  const isModRoute = routeConfig.moderatorAndAbove.some((r) =>
    pathnameWithoutLocale.startsWith(r)
  );

  if (isAdminRoute || isModRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/sign-in", origin));
    }

    try {
      const sessionRes = await fetch(`${origin}/api/auth/get-session`, {
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      });

      if (!sessionRes.ok) {
        return NextResponse.redirect(new URL("/sign-in", origin));
      }

      const session = await sessionRes.json();
      const role = session?.user?.role;

      if (isAdminRoute && role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", origin));
      }

      if (isModRoute && role !== "admin" && role !== "moderator") {
        return NextResponse.redirect(new URL("/dashboard", origin));
      }
    } catch (error) {
      console.error("Session fetch error:", error);
      return NextResponse.redirect(new URL("/sign-in", origin));
    }

    return intlMiddleware(request);
  }

  // বাকি সব route এ intl middleware চালাও
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};