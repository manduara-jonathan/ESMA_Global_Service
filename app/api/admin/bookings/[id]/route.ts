import { NextResponse } from "next/server"
import { updateBookingStatus, deleteBooking } from "@/lib/store"
import { checkAuth } from "@/lib/api-auth"
import type { ApiResponse, BookingRequest } from "@/lib/types"

// PATCH /api/admin/bookings/[id] - Update booking status
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const auth = await checkAuth(request)
  if (!auth.authenticated) {
    return auth.response
  }

  try {
    const { id } = params
    const body = await request.json()
    const { status } = body

    if (!status || !["pending", "confirmed", "cancelled", "completed"].includes(status)) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Statut invalide" },
        { status: 400 }
      )
    }

    const booking = updateBookingStatus(id, status as BookingRequest["status"])

    if (!booking) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Reservation non trouvee" },
        { status: 404 }
      )
    }

    return NextResponse.json<ApiResponse<{ booking: BookingRequest }>>({
      success: true,
      data: { booking },
    })
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Erreur lors de la mise a jour" },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/bookings/[id] - Delete booking
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const auth = await checkAuth(request)
  if (!auth.authenticated) {
    return auth.response
  }

  try {
    const { id } = params
    const success = deleteBooking(id)

    if (!success) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Reservation non trouvee" },
        { status: 404 }
      )
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      message: "Reservation supprimee avec succes",
    })
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Erreur lors de la suppression" },
      { status: 500 }
    )
  }
}
