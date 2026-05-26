import { getSiteSettings } from "./store"

interface EmailData {
  to: string
  subject: string
  html: string
  text?: string
}

// Simple email sending function using fetch to an external service
// In production, you would use a proper email service like SendGrid, AWS SES, etc.
export async function sendEmail(data: EmailData): Promise<{ success: boolean; error?: string }> {
  try {
    const settings = await getSiteSettings()
    
    // If email config is not set up, return success (for demo)
    if (!settings.emailConfig) {
      console.log("[Email] No email config, skipping actual send")
      return { success: true }
    }

    // Here you would integrate with your email provider
    // Example with a generic SMTP or email API
    const { smtpHost, smtpPort, smtpUser, smtpPassword, fromEmail, fromName } = settings.emailConfig

    // For demo purposes, we'll just silently process the email
    // In production, uncomment and implement actual email sending:
    // const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     personalizations: [{ to: [{ email: data.to }] }],
    //     from: { email: fromEmail, name: fromName },
    //     subject: data.subject,
    //     content: [
    //       { type: 'text/plain', value: data.text || '' },
    //       { type: 'text/html', value: data.html },
    //     ],
    //   }),
    // })

    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to send email" }
  }
}

// Send notification email to admin
export async function sendAdminNotification(
  title: string,
  message: string,
  link?: string
): Promise<{ success: boolean; error?: string }> {
  const settings = await getSiteSettings()
  
  if (!settings.notificationsEnabled) {
    return { success: true, error: "Notifications are disabled" }
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; border-bottom: 2px solid #f97316; padding-bottom: 10px;">
        ${title}
      </h2>
      <p style="color: #666; font-size: 16px; line-height: 1.5;">
        ${message}
      </p>
      ${link ? `
        <div style="margin-top: 20px;">
          <a href="${link}" 
            style="background-color: #f97316; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 5px; display: inline-block;">
            Voir les details
          </a>
        </div>
      ` : ''}
      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
      <p style="color: #999; font-size: 12px;">
        Cet email a été envoyé par ESMA GLOBAL SERVICE Admin
      </p>
    </div>
  `

  return sendEmail({
    to: settings.adminEmail,
    subject: `[ESMA Global] ${title}`,
    html,
    text: `${title}\n\n${message}\n${link ? `\nLien: ${link}` : ''}`,
  })
}

// Send auto-reply to contact form submitter
export async function sendAutoReply(
  to: string,
  name: string,
  service: string
): Promise<{ success: boolean; error?: string }> {
  const settings = await getSiteSettings()
  
  if (!settings.autoReplyEnabled) {
    return { success: true, error: "Auto-reply is disabled" }
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Merci de nous avoir contacté!</h2>
      <p style="color: #666; font-size: 16px; line-height: 1.5;">
        Bonjour ${name},
      </p>
      <p style="color: #666; font-size: 16px; line-height: 1.5;">
        Nous avons bien reçu votre message concernant <strong>${service}</strong>.
        Notre équipe vous répondra dans les plus brefs délais.
      </p>
      <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="color: #666; margin: 0;">
          <strong>ESMA GLOBAL SERVICE</strong><br>
          Email: esmaglobaleservices@gmail.com<br>
          Téléphone: +243 000 000 000
        </p>
      </div>
    </div>
  `

  return sendEmail({
    to,
    subject: "Confirmation de reception - ESMA GLOBAL SERVICE",
    html,
    text: `Bonjour ${name},\n\nNous avons bien reçu votre message concernant ${service}. Notre équipe vous répondra dans les plus brefs délais.\n\nESMA GLOBAL SERVICE`,
  })
}

// Send reply email to a contact message
export async function sendReplyEmail(
  to: string,
  recipientName: string,
  subject: string,
  replyMessage: string,
  originalMessage?: string
): Promise<{ success: boolean; error?: string }> {
  const settings = await getSiteSettings()

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; border-bottom: 2px solid #f97316; padding-bottom: 10px;">
        Reponse de ESMA GLOBAL SERVICE
      </h2>
      <p style="color: #666; font-size: 16px; line-height: 1.5;">
        Bonjour ${recipientName},
      </p>
      <div style="color: #333; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">
        ${replyMessage}
      </div>
      ${originalMessage ? `
        <div style="margin-top: 30px; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #f97316; border-radius: 4px;">
          <p style="color: #999; font-size: 12px; margin: 0 0 10px 0;">Votre message original:</p>
          <p style="color: #666; font-size: 14px; margin: 0; white-space: pre-wrap;">${originalMessage}</p>
        </div>
      ` : ''}
      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
      <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px;">
        <p style="color: #666; margin: 0;">
          <strong>ESMA GLOBAL SERVICE</strong><br>
          Email: esmaglobaleservices@gmail.com<br>
          Telephone: +243 000 000 000
        </p>
      </div>
    </div>
  `

  return sendEmail({
    to,
    subject: subject || "Re: Votre demande - ESMA GLOBAL SERVICE",
    html,
    text: `Bonjour ${recipientName},\n\n${replyMessage}\n\n${originalMessage ? `---\nVotre message original:\n${originalMessage}\n---\n` : ''}\nESMA GLOBAL SERVICE\nEmail: esmaglobaleservices@gmail.com`,
  })
}
