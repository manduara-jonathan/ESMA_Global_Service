import { NextResponse } from "next/server"
import { getBookings, createBooking } from "@/lib/store"
import { sendAdminNotification } from "@/lib/email"
import type { ApiResponse, BookingRequest } from "@/lib/types"

export async function GET() {
  try {
    const bookings = getBookings()
    return NextResponse.json<ApiResponse<BookingRequest[]>>({
      success: true,
      data: bookings,
    })
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Erreur lors de la recuperation des reservations" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { service, customerName, customerEmail, customerPhone, date, details } = body

    if (!service || !customerName || !customerEmail || !date) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Les champs service, nom, email et date sont obligatoires",
        },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(customerEmail)) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Adresse email invalide" },
        { status: 400 }
      )
    }

    const booking = createBooking({
      service,
      customerName,
      customerEmail,
      customerPhone: customerPhone || "",
      date,
      details: details || "",
    })

    // Send admin notification email
    await sendAdminNotification(
      "Nouvelle reservation",
      `${customerName} a fait une reservation pour: ${service}\n\nDate: ${date}\nEmail: ${customerEmail}\n${details ? `Details: ${details}` : ""}`,
      `/admin/bookings`
    )

    return NextResponse.json<ApiResponse<BookingRequest>>(
      {
        success: true,
        data: booking,
        message: "Votre reservation a ete creee avec succes",
      },
      { status: 201 }
    )
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Erreur lors de la creation de la reservation" },
      { status: 500 }
    )
  }
}
