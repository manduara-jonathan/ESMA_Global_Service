import { NextResponse } from "next/server"
import { getNotifications, createNotification } from "@/lib/store"
import { checkAuth } from "@/lib/api-auth"
import type { ApiResponse, Notification } from "@/lib/types"

// GET /api/admin/notifications - Get all notifications for admin
export async function GET(request: Request) {
  const auth = await checkAuth(request)
  if (!auth.authenticated) {
    return auth.response
  }

  try {
    const notifications = await getNotifications()
    return NextResponse.json<ApiResponse<{ notifications: Notification[] }>>({
      success: true,
      data: { notifications },
    })
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Erreur lors de la recuperation des notifications" },
      { status: 500 }
    )
  }
}

// POST /api/admin/notifications - Create new notification
export async function POST(request: Request) {
  const auth = await checkAuth(request)
  if (!auth.authenticated) {
    return auth.response
  }

  try {
    const body = await request.json()
    const { title, message, type, link } = body

    if (!title || !message || !type) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Titre, message et type sont requis" },
        { status: 400 }
      )
    }

    const notification = await createNotification({
      type,
      title,
      message,
      link,
    })

    return NextResponse.json<ApiResponse<{ notification: Notification }>>({
      success: true,
      data: { notification },
      message: "Notification creee avec succes",
    })
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Erreur lors de la creation de la notification" },
      { status: 500 }
    )
  }
}
