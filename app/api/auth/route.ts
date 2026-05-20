import { NextResponse } from "next/server"
import { authenticateUser, logout, validateSession, SESSION_COOKIE_NAME, getSessionExpiry } from "@/lib/auth"
import type { ApiResponse } from "@/lib/types"

// Helper to set session cookie on response
function setSessionCookie(response: NextResponse, sessionId: string): void {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: sessionId,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: getSessionExpiry(),
    path: "/",
  })
}

// POST /api/auth - Authenticate user
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Email et mot de passe requis" },
        { status: 400 }
      )
    }

    // Get IP and User-Agent for session tracking
    const ip = request.headers.get("x-forwarded-for") || "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"
    
    const result = await authenticateUser(email, password, ip, userAgent)
    console.log("[v0] POST /api/auth - Auth result:", result.success ? "success" : "failed")

    if (!result.success) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: result.error },
        { status: 401 }
      )
    }

    // Return JSON with session cookie
    const response = NextResponse.json<ApiResponse>({
      success: true,
      message: "Connexion réussie",
    })
    setSessionCookie(response, result.sessionId)

    return response
  } catch (error) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Erreur lors de la connexion" },
      { status: 500 }
    )
  }
}

// DELETE /api/auth - Logout user
export async function DELETE(request: Request) {
  try {
    const cookieHeader = request.headers.get("cookie") || ""
    const sessionIdMatch = cookieHeader.match(new RegExp(`${SESSION_COOKIE_NAME}=([^;]+)`))
    const sessionId = sessionIdMatch?.[1]

    if (sessionId) {
      await logout(sessionId)
    }

    const response = NextResponse.json<ApiResponse>({
      success: true,
      message: "Déconnexion réussie",
    })

    // Clear the session cookie
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    })

    return response
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Erreur lors de la déconnexion" },
      { status: 500 }
    )
  }
}

// GET /api/auth - Get current user
export async function GET(request: Request) {
  try {
    const cookieHeader = request.headers.get("cookie") || ""
    console.log("[v0] GET /api/auth - Cookie header:", cookieHeader ? "present" : "empty")
    
    const sessionIdMatch = cookieHeader.match(new RegExp(`${SESSION_COOKIE_NAME}=([^;]+)`))
    const sessionId = sessionIdMatch?.[1]
    
    console.log("[v0] Session ID from cookie:", sessionId ? sessionId.substring(0, 8) + "..." : "none")

    if (!sessionId) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Non authentifié" },
        { status: 401 }
      )
    }

    const result = await validateSession(sessionId)
    console.log("[v0] Session validation result:", result.valid ? "valid" : "invalid")

    if (!result.valid) {
      const response = NextResponse.json<ApiResponse>(
        { success: false, error: result.error },
        { status: 401 }
      )

      // Clear invalid cookie
      response.cookies.set({
        name: SESSION_COOKIE_NAME,
        value: "",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 0,
        path: "/",
      })

      return response
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      data: { user: result.user },
    })
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    )
  }
}
