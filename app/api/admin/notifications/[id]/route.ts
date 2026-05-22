import { NextResponse } from "next/server"
import { deleteNotification } from "@/lib/store"
import { checkAuth } from "@/lib/api-auth"
import type { ApiResponse } from "@/lib/types"

// DELETE /api/admin/notifications/[id] - Delete a notification
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
    const success = await deleteNotification(id)

    if (!success) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Notification non trouvee" },
        { status: 404 }
      )
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      message: "Notification supprimee avec succes",
    })
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Erreur lors de la suppression" },
      { status: 500 }
    )
  }
}
