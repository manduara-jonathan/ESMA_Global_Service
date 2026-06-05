import { NextResponse } from "next/server"
import { sendReplyEmail } from "@/lib/email"
import { getContactMessageById, updateContactMessageStatus } from "@/lib/store"
import { sanitizeInput } from "@/lib/utils"
import { checkAuth } from "@/lib/api-auth"
import type { ApiResponse } from "@/lib/types"

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Check authentication
  const auth = await checkAuth(request)
  if (!auth.authenticated) {
    return auth.response
  }

  try {
    const { id } = await params
    const body = await request.json()
    const { subject, message: replyMessage } = body

    if (!replyMessage || replyMessage.trim() === "") {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Le message de reponse est requis" },
        { status: 400 }
      )
    }

    // Get the original message
    const originalMessage = await getContactMessageById(id)
    
    if (!originalMessage) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Message non trouve" },
        { status: 404 }
      )
    }

    // Send the reply email
    const emailResult = await sendReplyEmail(
      originalMessage.email,
      `${originalMessage.firstName} ${originalMessage.lastName}`,
      subject || `Re: ${originalMessage.service} - ESMA GLOBAL SERVICE`,
      sanitizeInput(replyMessage),
      originalMessage.message
    )

    if (!emailResult.success) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: emailResult.error || "Erreur lors de l'envoi de l'email" },
        { status: 500 }
      )
    }

    // Update the message status to "replied"
    await updateContactMessageStatus(id, "replied")

    return NextResponse.json<ApiResponse>({
      success: true,
      message: "Reponse envoyee avec succes",
    })
  } catch (error) {
    console.error("Error sending reply:", error)
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Erreur lors de l'envoi de la reponse" },
      { status: 500 }
    )
  }
}
