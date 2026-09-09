import { NextResponse } from "next/server"
import { checkAuth } from "@/lib/api-auth"
import { changeAdminPassword } from "@/lib/auth"
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

    if (newPassword.length < 8) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Le mot de passe doit faire au moins 8 caracteres" },
        { status: 400 }
      )
    }

    const changed = await changeAdminPassword(oldPassword, newPassword)
    if (!changed) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Le mot de passe actuel est incorrect" },
        { status: 400 }
      )
    }

    return NextResponse.json<ApiResponse>({ success: true, data: { message: "Mot de passe modifie" } })
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Erreur lors du changement de mot de passe" },
      { status: 500 }
    )
  }
}
