import { NextResponse } from "next/server"
import { getBookings } from "@/lib/store"
import { checkAuth } from "@/lib/api-auth"
import type { ApiResponse, BookingRequest } from "@/lib/types"

// GET /api/admin/bookings - Get all bookings
export async function GET(request: Request) {
  const auth = await checkAuth(request)
  if (!auth.authenticated) {
    return auth.response
  }

  try {
    const bookings = getBookings()
    return NextResponse.json<ApiResponse<{ bookings: BookingRequest[] }>>({
      success: true,
      data: { bookings },
    })
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Erreur lors de la recuperation des reservations" },
      { status: 500 }
    )
  }
}
