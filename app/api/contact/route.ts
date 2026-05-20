import { NextResponse } from "next/server"
import { getContactMessages, createContactMessage } from "@/lib/store"
import { sendAdminNotification, sendAutoReply } from "@/lib/email"
import { sanitizeInput, isValidEmail, checkRateLimit } from "@/lib/utils"
import type { ApiResponse, ContactMessage } from "@/lib/types"

export async function GET() {
  try {
    const messages = getContactMessages()
    return NextResponse.json<ApiResponse<ContactMessage[]>>({
      success: true,
      data: messages,
    })
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Erreur lors de la recuperation des messages" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    // Rate limiting: 5 requests per minute per IP
    const ip = request.headers.get("x-forwarded-for") || "unknown"
    const rateLimit = checkRateLimit(`contact:${ip}`, 5, 60000)
    
    if (!rateLimit.allowed) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Trop de requêtes. Veuillez patienter." },
        { status: 429 }
      )
    }

    const body = await request.json()

    const { firstName, lastName, email, phone, service, message } = body

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Les champs prénom, nom, email et message sont obligatoires",
        },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Adresse email invalide" },
        { status: 400 }
      )
    }

    // Sanitize all inputs to prevent XSS
    const contactMessage = createContactMessage({
      firstName: sanitizeInput(firstName),
      lastName: sanitizeInput(lastName),
      email: sanitizeInput(email),
      phone: phone ? sanitizeInput(phone) : undefined,
      service: sanitizeInput(service) || "general",
      message: sanitizeInput(message),
    })

    // Send admin notification email
    await sendAdminNotification(
      "Nouveau message de contact",
      `${firstName} ${lastName} a envoyé un message concernant: ${service || "general"}\n\n${message}`,
      `/admin/messages`
    )

    // Send auto-reply if enabled
    await sendAutoReply(email, `${firstName} ${lastName}`, service || "general")

    return NextResponse.json<ApiResponse<ContactMessage>>(
      {
        success: true,
        data: contactMessage,
        message: "Votre message a ete envoye avec succes",
      },
      { status: 201 }
    )
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Erreur lors de l'envoi du message" },
      { status: 500 }
    )
  }
}
