import { NextResponse } from "next/server"
import { getServiceBySlug } from "@/lib/store"
import type { ApiResponse, Service } from "@/lib/types"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const service = getServiceBySlug(slug)

    if (!service) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Service non trouve" },
        { status: 404 }
      )
    }

    return NextResponse.json<ApiResponse<Service>>({
      success: true,
      data: service,
    })
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Erreur lors de la recuperation du service" },
      { status: 500 }
    )
  }
}
