import { NextResponse } from "next/server"
import { changePassword } from "@/lib/auth"
import { checkAuth } from "@/lib/api-auth"
import type { ApiResponse } from "@/lib/types"

// PUT /api/auth/password - Change admin password
export async function PUT(request: Request) {
  const auth = await checkAuth(request)
  if (!auth.authenticated) {
    return auth.response
  }

  try {
    const body = await request.json()
    const { oldPassword, newPassword } = body

    if (!oldPassword || !newPassword) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Mots de passe manquants" },
        { status: 400 }
      )
    }

    // Get user from token - we need to parse the token to get userId
    const token = request.headers.get("cookie")?.match(/admin_token=([^;]+)/)?.[1]
    if (!token) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Token invalide" },
        { status: 401 }
      )
    }

    // For now, we use a fixed user ID since we only have one admin
    // In a multi-user system, you'd extract the userId from the token
    const result = await changePassword("admin-001", oldPassword, newPassword)

    if (!result.success) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      message: "Mot de passe change avec succes",
    })
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Erreur lors du changement de mot de passe" },
      { status: 500 }
    )
  }
}
