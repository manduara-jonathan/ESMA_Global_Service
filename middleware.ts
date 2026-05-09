import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const SESSION_COOKIE_NAME = "esma_admin_session"

// Middleware to protect admin routes
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionId = request.cookies.get(SESSION_COOKIE_NAME)?.value

  console.log("[v0] Middleware - Path:", pathname, "Session:", sessionId ? "exists" : "none")

  // Only protect admin routes except login
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    if (!sessionId) {
      console.log("[v0] No session, redirecting to login")
      const loginUrl = new URL("/admin/login", request.url)
      return NextResponse.redirect(loginUrl)
    }

    console.log("[v0] Session exists, allowing access")
    return NextResponse.next()
  }

  // Redirect logged-in users away from login page
  if (pathname === "/admin/login") {
    if (sessionId) {
      console.log("[v0] Already logged in, redirecting to admin")
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
