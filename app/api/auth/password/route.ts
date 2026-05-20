import { NextResponse } from "next/server"
import { checkAuth } from "@/lib/api-auth"
import type { ApiResponse } from "@/lib/types"

// PUT /api/auth/password - Change admin password
// Note: This is a placeholder. In a production environment,
// you would store admin credentials in a database (not hardcoded).
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

    // In this version, credentials are hardcoded.
    // To change the password, update lib/auth.ts directly.
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Le changement de mot de passe n'est pas disponible dans cette version." },
      { status: 400 }
    )
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Erreur lors du changement de mot de passe" },
      { status: 500 }
    )
  }
}
