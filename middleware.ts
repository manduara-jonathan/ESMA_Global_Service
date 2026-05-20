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

// Middleware adds security headers to all admin routes
// Session validation is handled by the admin layout component for better reliability
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionId = request.cookies.get(SESSION_COOKIE_NAME)?.value

  // Create base response with security headers
  const response = NextResponse.next()
  addSecurityHeaders(response)

  // Login page: redirect to dashboard if already has session cookie
  // This prevents showing login to already authenticated users
  if (pathname === "/admin/login" && sessionId) {
    const adminUrl = new URL("/admin", request.url)
    const redirect = NextResponse.redirect(adminUrl)
    addSecurityHeaders(redirect)
    return redirect
  }

  // For all other admin routes, just add security headers
  // The admin layout will verify authentication client-side
  return response
}

// Configure which routes the middleware runs on
export const config = {
  matcher: ["/admin/:path*"],
}
