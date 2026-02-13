import { NextResponse } from "next/server"
import { getServices } from "@/lib/store"
import type { ApiResponse, Service } from "@/lib/types"

export async function GET() {
  try {
    const services = getServices()
    return NextResponse.json<ApiResponse<Service[]>>({
      success: true,
      data: services,
    })
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Erreur lors de la recuperation des services" },
      { status: 500 }
    )
  }
}
