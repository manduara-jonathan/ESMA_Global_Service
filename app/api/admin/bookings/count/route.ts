import { NextResponse } from "next/server"
import { getPendingBookingCount } from "@/lib/store"
import { checkAuth } from "@/lib/api-auth"
import type { ApiResponse } from "@/lib/types"

// GET /api/admin/bookings/count - Get pending booking count
export async function GET(request: Request) {
  const auth = await checkAuth(request)
  if (!auth.authenticated) {
    return auth.response
  }

  try {
    const count = getPendingBookingCount()
    return NextResponse.json<ApiResponse<{ pending: number }>>({
      success: true,
      data: { pending: count },
    })
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Erreur lors de la recuperation du compte" },
      { status: 500 }
    )
  }
}
