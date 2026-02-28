import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  const protectedRoutes = [
    "/analytics",
    "/catering-packages",
    "/consumables",
    "/customers",
    "/dashboard",
    "/equipment",
    "/events",
    "/maintenance",
    "/payments",
    "/reports",
    "/reservations",
    "/stock_levels",
    "/users",
    "/add-ons",
  ];
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (request.nextUrl.pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (request.nextUrl.pathname === "/") {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
