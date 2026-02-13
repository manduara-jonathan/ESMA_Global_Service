import { NextResponse } from "next/server"
import { updateContactMessageStatus } from "@/lib/store"
import type { ApiResponse, ContactMessage } from "@/lib/types"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status } = body

    if (!status || !["new", "read", "replied", "archived"].includes(status)) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Statut invalide" },
        { status: 400 }
      )
    }

    const updated = updateContactMessageStatus(id, status)

    if (!updated) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Message non trouve" },
        { status: 404 }
      )
    }

    return NextResponse.json<ApiResponse<ContactMessage>>({
      success: true,
      data: updated,
      message: "Statut du message mis a jour",
    })
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Erreur lors de la mise a jour" },
      { status: 500 }
    )
  }
}
