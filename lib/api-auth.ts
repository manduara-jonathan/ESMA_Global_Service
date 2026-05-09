import { NextResponse } from "next/server"
import { validateSession } from "@/lib/auth"
import type { ApiResponse } from "@/lib/types"

// Helper function to extract token from cookie header
function getTokenFromCookie(request: Request): string | undefined {
  const cookieHeader = request.headers.get("cookie")
  if (!cookieHeader) return undefined
  
  // Parse cookie header to find admin_token
  const cookies = cookieHeader.split(';')
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=')
    if (name === 'admin_token') {
      return value
    }
  }
  return undefined
}

// Helper function to check auth on admin API routes
export async function checkAuth(request: Request): Promise<{ authenticated: true; token: string } | { authenticated: false; response: NextResponse }> {
  const token = getTokenFromCookie(request)

  if (!token) {
    return {
      authenticated: false,
      response: NextResponse.json<ApiResponse>(
        { success: false, error: "Authentification requise" },
        { status: 401 }
      ),
    }
  }

  const result = await validateSession(token)

  if (!result.valid) {
    const response = NextResponse.json<ApiResponse>(
      { success: false, error: result.error },
      { status: 401 }
    )
    response.cookies.set({
      name: "admin_token",
      value: "",
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    })
    return { authenticated: false, response }
  }

  return { authenticated: true, token }
}
