import { NextResponse } from "next/server"
import { updateBookingStatus } from "@/lib/store"
import type { ApiResponse, BookingRequest } from "@/lib/types"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status } = body

    if (
      !status ||
      !["pending", "confirmed", "cancelled", "completed"].includes(status)
    ) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Statut invalide" },
        { status: 400 }
      )
    }

    const updated = updateBookingStatus(id, status)

    if (!updated) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Reservation non trouvee" },
        { status: 404 }
      )
    }

    return NextResponse.json<ApiResponse<BookingRequest>>({
      success: true,
      data: updated,
      message: "Statut de la reservation mis a jour",
    })
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Erreur lors de la mise a jour" },
      { status: 500 }
    )
  }
}
