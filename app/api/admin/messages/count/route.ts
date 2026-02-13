import { NextResponse } from "next/server"
import { getUnreadMessageCount } from "@/lib/store"
import { checkAuth } from "@/lib/api-auth"
import type { ApiResponse } from "@/lib/types"

// GET /api/admin/messages/count - Get unread message count
export async function GET(request: Request) {
  const auth = await checkAuth(request)
  if (!auth.authenticated) {
    return auth.response
  }

  try {
    const count = getUnreadMessageCount()
    return NextResponse.json<ApiResponse<{ unread: number }>>({
      success: true,
      data: { unread: count },
    })
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Erreur lors de la recuperation du compte" },
      { status: 500 }
    )
  }
}
