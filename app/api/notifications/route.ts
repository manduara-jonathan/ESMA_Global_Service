import { NextResponse } from "next/server"
import {
  getNotifications,
  getUnreadNotificationCount,
  markAllNotificationsAsRead,
} from "@/lib/store"
import type { ApiResponse, Notification } from "@/lib/types"

export async function GET() {
  try {
    const notifications = getNotifications()
    const unreadCount = getUnreadNotificationCount()

    return NextResponse.json<
      ApiResponse<{ notifications: Notification[]; unreadCount: number }>
    >({
      success: true,
      data: { notifications, unreadCount },
    })
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Erreur lors de la recuperation des notifications" },
      { status: 500 }
    )
  }
}

export async function PUT() {
  try {
    markAllNotificationsAsRead()
    return NextResponse.json<ApiResponse>({
      success: true,
      message: "Toutes les notifications ont ete marquees comme lues",
    })
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Erreur lors de la mise a jour" },
      { status: 500 }
    )
  }
}
