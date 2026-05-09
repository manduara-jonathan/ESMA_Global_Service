import { NextResponse } from "next/server"
import { getContactMessages } from "@/lib/store"
import { checkAuth } from "@/lib/api-auth"
import type { ApiResponse, ContactMessage } from "@/lib/types"

// GET /api/admin/messages - Get all messages
export async function GET(request: Request) {
  const auth = await checkAuth(request)
  if (!auth.authenticated) {
    return auth.response
  }

  try {
    const messages = getContactMessages()
    return NextResponse.json<ApiResponse<{ messages: ContactMessage[] }>>({
      success: true,
      data: { messages },
    })
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Erreur lors de la recuperation des messages" },
      { status: 500 }
    )
  }
}
