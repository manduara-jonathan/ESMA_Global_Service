import { NextResponse } from "next/server"
import { getContactMessages, createContactMessage } from "@/lib/store"
import { sendAdminNotification, sendAutoReply } from "@/lib/email"
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
    const body = await request.json()

    const { firstName, lastName, email, phone, service, message } = body

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Les champs prenom, nom, email et message sont obligatoires",
        },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Adresse email invalide" },
        { status: 400 }
      )
    }

    const contactMessage = createContactMessage({
      firstName,
      lastName,
      email,
      phone: phone || undefined,
      service: service || "general",
      message,
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
