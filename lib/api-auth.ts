import { NextResponse } from "next/server"
import { validateSession, SESSION_COOKIE_NAME } from "@/lib/auth"
import type { ApiResponse } from "@/lib/types"

// Helper function to extract session ID from cookie header
function getSessionIdFromCookie(request: Request): string | undefined {
  const cookieHeader = request.headers.get("cookie")
  if (!cookieHeader) return undefined
  
  // Parse cookie header to find session cookie
  const cookies = cookieHeader.split(';')
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=')
    if (name === SESSION_COOKIE_NAME) {
      return value
    }
  }
  return undefined
}

// Helper function to check auth on admin API routes
export async function checkAuth(request: Request): Promise<{ authenticated: true; sessionId: string } | { authenticated: false; response: NextResponse }> {
  const sessionId = getSessionIdFromCookie(request)

  if (!sessionId) {
    return {
      authenticated: false,
      response: NextResponse.json<ApiResponse>(
        { success: false, error: "Authentification requise" },
        { status: 401 }
      ),
    }
  }

  const result = await validateSession(sessionId)

  if (!result.valid) {
    const response = NextResponse.json<ApiResponse>(
      { success: false, error: result.error },
      { status: 401 }
    )
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    })
    return { authenticated: false, response }
  }

  return { authenticated: true, sessionId }
}
