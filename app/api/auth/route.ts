import { NextResponse } from "next/server"
import { authenticateUser, logout, validateSession } from "@/lib/auth"
import type { ApiResponse } from "@/lib/types"

// POST /api/auth/login - Authenticate user
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Nom d'utilisateur et mot de passe requis" },
        { status: 400 }
      )
    }

    // Get IP and User-Agent for session tracking
    const ip = request.headers.get("x-forwarded-for") || "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"

    const result = await authenticateUser(username, password, ip, userAgent)

    if (!result.success) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: result.error },
        { status: 401 }
      )
    }

    // Set HTTP-only cookie with token
    const response = NextResponse.json<ApiResponse>({
      success: true,
      data: { user: result.user },
      message: "Connexion reussie",
    })

    response.cookies.set({
      name: "admin_token",
      value: result.token,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60,
      path: "/",
    })

    return response
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Erreur lors de la connexion" },
      { status: 500 }
    )
  }
}

// DELETE /api/auth/logout - Logout user
export async function DELETE(request: Request) {
  try {
    const token = request.headers.get("cookie")?.match(/admin_token=([^;]+)/)?.[1]

    if (token) {
      logout(token)
    }

    const response = NextResponse.json<ApiResponse>({
      success: true,
      message: "Deconnexion reussie",
    })

    response.cookies.set({
      name: "admin_token",
      value: "",
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    })

    return response
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Erreur lors de la deconnexion" },
      { status: 500 }
    )
  }
}

// GET /api/auth/me - Get current user
export async function GET(request: Request) {
  try {
    const token = request.headers.get("cookie")?.match(/admin_token=([^;]+)/)?.[1]

    if (!token) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Non authentifie" },
        { status: 401 }
      )
    }

    const result = await validateSession(token)

    if (!result.valid) {
      const response = NextResponse.json<ApiResponse>(
        { success: false, error: result.error },
        { status: 401 }
      )

      // Clear invalid cookie
      response.cookies.set({
        name: "admin_token",
        value: "",
        httpOnly: true,
        secure: false,
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
