import { NextResponse } from "next/server"
import { updateContactMessageStatus, deleteContactMessage } from "@/lib/store"
import { checkAuth } from "@/lib/api-auth"
import type { ApiResponse, ContactMessage } from "@/lib/types"

// PATCH /api/admin/messages/[id] - Update message status
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await checkAuth(request)
  if (!auth.authenticated) {
    return auth.response
  }

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

    const message = await updateContactMessageStatus(id, status as ContactMessage["status"])

    if (!message) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Message non trouve" },
        { status: 404 }
      )
    }

    return NextResponse.json<ApiResponse<{ message: ContactMessage }>>({
      success: true,
      data: { message },
    })
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Erreur lors de la mise a jour" },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/messages/[id] - Delete message
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await checkAuth(request)
  if (!auth.authenticated) {
    return auth.response
  }

  try {
    const { id } = await params
    const success = await deleteContactMessage(id)

    if (!success) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Message non trouve" },
        { status: 404 }
      )
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      message: "Message supprime avec succes",
    })
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Erreur lors de la suppression" },
      { status: 500 }
    )
  }
}
