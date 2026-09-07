import { NextResponse } from "next/server"
import { getSiteSettings, updateSiteSettings } from "@/lib/store"
import { checkAuth } from "@/lib/api-auth"
import type { ApiResponse, SiteSettings } from "@/lib/types"

// GET /api/admin/settings - Get site settings
export async function GET(request: Request) {
  const auth = await checkAuth(request)
  if (!auth.authenticated) {
    return auth.response
  }

  try {
    const settings = await getSiteSettings()
    return NextResponse.json<ApiResponse<SiteSettings>>({
      success: true,
      data: settings,
    })
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Erreur lors de la recuperation des parametres" },
      { status: 500 }
    )
  }
}

// PUT /api/admin/settings - Update site settings
export async function PUT(request: Request) {
  const auth = await checkAuth(request)
  if (!auth.authenticated) {
    return auth.response
  }

  try {
    const body = await request.json()
    const settings = await updateSiteSettings(body)
    return NextResponse.json<ApiResponse<SiteSettings>>({
      success: true,
      data: settings,
      message: "Parametres mis a jour avec succes",
    })
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Erreur lors de la mise a jour des parametres" },
      { status: 500 }
    )
  }
}
