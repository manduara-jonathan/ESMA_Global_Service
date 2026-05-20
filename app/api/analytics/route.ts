import { NextResponse } from "next/server"
import { getAnalyticsData, trackPageView } from "@/lib/analytics"
import { checkAuth } from "@/lib/api-auth"
import type { ApiResponse, AnalyticsData } from "@/lib/types"

// GET /api/analytics - Get all analytics data (protected)
export async function GET(request: Request) {
  const auth = await checkAuth(request)
  if (!auth.authenticated) {
    return auth.response
  }

  try {
    const data = getAnalyticsData()

    return NextResponse.json<ApiResponse<AnalyticsData>>({
      success: true,
      data,
    })
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Erreur lors de la recuperation des analytics" },
      { status: 500 }
    )
  }
}

// POST /api/analytics/track - Track a new page view (public)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { path, referrer, userAgent } = body

    // Get IP from headers
    const ip = request.headers.get("x-forwarded-for") || "unknown"

    trackPageView(path, referrer, userAgent, ip)

    return NextResponse.json<ApiResponse>({
      success: true,
      message: "Page vue enregistree",
    })
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Erreur lors du tracking" },
      { status: 500 }
    )
  }
}
