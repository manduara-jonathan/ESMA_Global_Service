import { NextResponse } from "next/server"
import { getNotifications } from "@/lib/store"
import { checkAuth } from "@/lib/api-auth"
import type { ApiResponse } from "@/lib/types"

// GET /api/admin/notifications/count - Get total notifications count
export async function GET(request: Request) {
  const auth = await checkAuth(request)
  if (!auth.authenticated) {
    return auth.response
  }

  try {
    const notifications = getNotifications()
    return NextResponse.json<ApiResponse<{ total: number }>>({
      success: true,
      data: { total: notifications.length },
    })
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Erreur lors de la recuperation du compte" },
      { status: 500 }
    )
  }
}
