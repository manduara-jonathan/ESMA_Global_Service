import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// NOTE: Cannot import from @/lib/auth in Edge Runtime - must keep in sync manually
const SESSION_COOKIE_NAME = "esma_admin_session"

// Security headers to apply to all responses
function addSecurityHeaders(response: NextResponse): void {
  response.headers.set("X-Frame-Options", "SAMEORIGIN")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")

  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    )
  }
}

// Middleware to protect admin routes
// NOTE: Middleware runs on Edge Runtime and cannot call Redis directly.
// We only check cookie existence here. Full session validation happens in API routes.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionId = request.cookies.get(SESSION_COOKIE_NAME)?.value

  // Create base response with security headers
  const response = NextResponse.next()
  addSecurityHeaders(response)

  // Protect admin routes (except login page)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    if (!sessionId) {
      const loginUrl = new URL("/admin/login", request.url)
      const redirect = NextResponse.redirect(loginUrl)
      addSecurityHeaders(redirect)
      return redirect
    }
    // Cookie exists - allow through. API routes will validate session in Redis.
    return response
  }

  // Login page: redirect to dashboard if already has session cookie
  if (pathname === "/admin/login" && sessionId) {
    const adminUrl = new URL("/admin", request.url)
    const redirect = NextResponse.redirect(adminUrl)
    addSecurityHeaders(redirect)
    return redirect
  }

  return response
}

// Configure which routes the middleware runs on
export const config = {
  matcher: ["/admin/:path*"],
}
