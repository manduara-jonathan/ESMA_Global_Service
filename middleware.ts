import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Middleware to protect admin routes
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect admin routes except login
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get("admin_token")?.value

    if (!token) {
      // Redirect to login if no token
      const loginUrl = new URL("/admin/login", request.url)
      return NextResponse.redirect(loginUrl)
    }

    // Token exists, let the request through
    // The API routes will validate the token
    return NextResponse.next()
  }

  // Redirect logged-in users away from login page
  if (pathname === "/admin/login") {
    const token = request.cookies.get("admin_token")?.value
    if (token) {
      // Redirect to admin dashboard if already logged in
      const adminUrl = new URL("/admin", request.url)
      return NextResponse.redirect(adminUrl)
    }
  }

  return NextResponse.next()
}

// Configure which routes the middleware runs on
export const config = {
  matcher: ["/admin/:path*"],
}
