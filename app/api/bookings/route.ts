import { NextResponse } from "next/server"
import { getBookings, createBooking } from "@/lib/store"
import { sendAdminNotification } from "@/lib/email"
import { sanitizeInput, isValidEmail, checkRateLimit } from "@/lib/utils"
import type { ApiResponse, BookingRequest } from "@/lib/types"

export async function GET() {
  try {
    const bookings = await getBookings()
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
    // Rate limiting: 5 requests per minute per IP
    const ip = request.headers.get("x-forwarded-for") || "unknown"
    const rateLimit = checkRateLimit(`booking:${ip}`, 5, 60000)
    
    if (!rateLimit.allowed) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Trop de requêtes. Veuillez patienter." },
        { status: 429 }
      )
    }

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

    if (!isValidEmail(customerEmail)) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Adresse email invalide" },
        { status: 400 }
      )
    }

    // Sanitize all inputs to prevent XSS
    const booking = await createBooking({
      service: sanitizeInput(service),
      customerName: sanitizeInput(customerName),
      customerEmail: sanitizeInput(customerEmail),
      customerPhone: customerPhone ? sanitizeInput(customerPhone) : "",
      date: sanitizeInput(date),
      details: details ? sanitizeInput(details) : "",
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
