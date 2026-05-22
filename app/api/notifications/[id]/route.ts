import { NextResponse } from "next/server"
import { markNotificationAsRead } from "@/lib/store"
import type { ApiResponse, Notification } from "@/lib/types"

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const updated = await markNotificationAsRead(id)

    if (!updated) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Notification non trouvee" },
        { status: 404 }
      )
    }

    return NextResponse.json<ApiResponse<Notification>>({
      success: true,
      data: updated,
      message: "Notification marquee comme lue",
    })
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Erreur lors de la mise a jour" },
      { status: 500 }
    )
  }
}
