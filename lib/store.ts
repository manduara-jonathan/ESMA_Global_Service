import { createClient } from "@supabase/supabase-js"
import type { Service, ContactMessage, BookingRequest, Notification, SiteSettings } from "./types"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables")
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Services (static data - not in database yet)
const services: Service[] = [
  {
    id: "1",
    name: "Billets d'avion",
    slug: "billets-avion",
    description:
      "Vente de billets d'avion nationaux et internationaux aux meilleurs tarifs avec les principales compagnies aériennes.",
    category: "voyage",
    image: "/images/flights.jpg",
    features: [
      "Réservations de vols nationaux et internationaux",
      "Tarifs préférentiels avec les principales compagnies aériennes",
      "Assistance personnalisée pour vos voyages",
      "Gestion des modifications et annulations",
    ],
    active: true,
  },
  {
    id: "2",
    name: "Facilitation de visas",
    slug: "visas",
    description:
      "Accompagnement dans toutes les démarches administratives pour l'obtention de visas touristiques et autres.",
    category: "voyage",
    image: "/images/visas.jpg",
    features: [
      "Assistance pour la préparation du dossier",
      "Suivi personnalisé de votre demande",
      "Conseils d'experts pour maximiser vos chances",
      "Visa touristique, affaires, études",
    ],
    active: true,
  },
  {
    id: "3",
    name: "Services monnaie mobile",
    slug: "monnaie-mobile",
    description:
      "Transactions financières rapides et sécurisées via monnaie mobile pour transferts et paiements.",
    category: "finance",
    image: "/images/mobile-money.jpg",
    features: [
      "Transferts d'argent nationaux et internationaux",
      "Paiements de factures et recharges",
      "Frais compétitifs et service rapide",
      "Support multi-opérateurs",
    ],
    active: true,
  },
  {
    id: "4",
    name: "Service de nettoyage",
    slug: "nettoyage",
    description:
      "Entretien professionnel de vos locaux avec des équipements modernes et des produits écologiques.",
    category: "nettoyage",
    image: "/images/cleaning.jpg",
    features: [
      "Nettoyage régulier ou ponctuel",
      "Personnel qualifié et matériel professionnel",
      "Produits respectueux de l'environnement",
      "Devis personnalisés",
    ],
    active: true,
  },
  {
    id: "5",
    name: "Service traiteur",
    slug: "traiteur",
    description:
      "Menus variés et personnalisés pour tous vos événements avec des plats préparés par nos chefs.",
    category: "traiteur",
    image: "/images/catering.jpg",
    features: [
      "Menus adaptés à tous types d'événements",
      "Ingrédients frais et de qualité",
      "Service complet avec mise en place",
      "Options végétariennes et spécifiques",
    ],
    active: true,
  },
]

// Contact Messages - using Supabase
export async function getContactMessages(): Promise<ContactMessage[]> {
  try {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error

    return (data || []).map((msg: any) => ({
      id: msg.id.toString(),
      firstName: msg.first_name,
      lastName: msg.last_name,
      email: msg.email,
      phone: msg.phone,
      service: msg.service,
      message: msg.message,
      status: msg.status,
      createdAt: msg.created_at,
    }))
  } catch (error) {
    console.error("Error fetching contact messages:", error)
    return []
  }
}

export async function getContactMessageById(id: string): Promise<ContactMessage | null> {
  try {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .eq("id", id)
      .single()

    if (error) throw error
    if (!data) return null

    return {
      id: data.id.toString(),
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      phone: data.phone,
      service: data.service,
      message: data.message,
      status: data.status,
      createdAt: data.created_at,
    }
  } catch (error) {
    console.error("Error fetching contact message by id:", error)
    return null
  }
}

export async function createContactMessage(
  data: Omit<ContactMessage, "id" | "status" | "createdAt">
): Promise<ContactMessage> {
  try {
    const { data: result, error } = await supabase
      .from("contact_messages")
      .insert([
        {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone || null,
          service: data.service,
          message: data.message,
          status: "new",
        },
      ])
      .select()

    if (error) throw error

    const msg = result?.[0]
    if (!msg) throw new Error("Failed to create message")

    // Create notification
    await createNotification({
      type: "info",
      title: "Nouveau message de contact",
      message: `${data.firstName} ${data.lastName} a envoyé un message concernant: ${data.service}`,
      link: "/admin/messages",
    })

    return {
      id: msg.id.toString(),
      firstName: msg.first_name,
      lastName: msg.last_name,
      email: msg.email,
      phone: msg.phone,
      service: msg.service,
      message: msg.message,
      status: msg.status,
      createdAt: msg.created_at,
    }
  } catch (error) {
    console.error("Error creating contact message:", error)
    throw error
  }
}

export async function getUnreadMessageCount(): Promise<number> {
  try {
    const { count, error } = await supabase
      .from("contact_messages")
      .select("id", { count: "exact" })
      .eq("status", "new")

    if (error) throw error
    return count || 0
  } catch (error) {
    console.error("Error fetching unread message count:", error)
    return 0
  }
}

// Bookings - using Supabase
export async function getBookings(): Promise<BookingRequest[]> {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error

    return (data || []).map((booking: any) => ({
      id: booking.id.toString(),
      service: booking.service,
      customerName: booking.customer_name,
      customerEmail: booking.customer_email,
      customerPhone: booking.customer_phone,
      date: booking.booking_date,
      details: booking.details,
      status: booking.status,
      createdAt: booking.created_at,
    }))
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return []
  }
}

export async function createBooking(
  data: Omit<BookingRequest, "id" | "status" | "createdAt">
): Promise<BookingRequest> {
  try {
    const { data: result, error } = await supabase
      .from("bookings")
      .insert([
        {
          service: data.service,
          customer_name: data.customerName,
          customer_email: data.customerEmail,
          customer_phone: data.customerPhone || null,
          booking_date: data.date,
          details: data.details || null,
          status: "pending",
        },
      ])
      .select()

    if (error) throw error

    const booking = result?.[0]
    if (!booking) throw new Error("Failed to create booking")

    // Create notification
    await createNotification({
      type: "success",
      title: "Nouvelle réservation",
      message: `${data.customerName} a fait une réservation pour: ${data.service}`,
      link: "/admin/bookings",
    })

    return {
      id: booking.id.toString(),
      service: booking.service,
      customerName: booking.customer_name,
      customerEmail: booking.customer_email,
      customerPhone: booking.customer_phone,
      date: booking.booking_date,
      details: booking.details,
      status: booking.status,
      createdAt: booking.created_at,
    }
  } catch (error) {
    console.error("Error creating booking:", error)
    throw error
  }
}

export async function getPendingBookingCount(): Promise<number> {
  try {
    const { count, error } = await supabase
      .from("bookings")
      .select("id", { count: "exact" })
      .eq("status", "pending")

    if (error) throw error
    return count || 0
  } catch (error) {
    console.error("Error fetching pending booking count:", error)
    return 0
  }
}

// Notifications - using Supabase
export async function getNotifications(): Promise<Notification[]> {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error

    return (data || []).map((notif: any) => ({
      id: notif.id.toString(),
      type: notif.type,
      title: notif.title,
      message: notif.message,
      read: notif.is_read,
      link: notif.link,
      createdAt: notif.created_at,
    }))
  } catch (error) {
    console.error("Error fetching notifications:", error)
    return []
  }
}

export async function getUnreadNotificationCount(): Promise<number> {
  try {
    const { count, error } = await supabase
      .from("notifications")
      .select("id", { count: "exact" })
      .eq("is_read", false)

    if (error) throw error
    return count || 0
  } catch (error) {
    console.error("Error fetching unread notification count:", error)
    return 0
  }
}

export async function createNotification(
  data: Omit<Notification, "id" | "read" | "createdAt">
): Promise<Notification> {
  try {
    const { data: result, error } = await supabase
      .from("notifications")
      .insert([
        {
          type: data.type,
          title: data.title,
          message: data.message,
          link: data.link || null,
          is_read: false,
        },
      ])
      .select()

    if (error) throw error

    const notif = result?.[0]
    if (!notif) throw new Error("Failed to create notification")

    return {
      id: notif.id.toString(),
      type: notif.type,
      title: notif.title,
      message: notif.message,
      read: notif.is_read,
      link: notif.link,
      createdAt: notif.created_at,
    }
  } catch (error) {
    console.error("Error creating notification:", error)
    throw error
  }
}

// Site Settings - using Supabase
let cachedSettings: SiteSettings | null = null

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    // Return cached version if available
    if (cachedSettings) {
      return { ...cachedSettings }
    }

    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .single()

    if (error && error.code !== "PGRST116") throw error

    const settings: SiteSettings = data
      ? {
          adminEmail: data.admin_email,
          notificationsEnabled: data.notifications_enabled,
          autoReplyEnabled: data.auto_reply_enabled,
          maintenanceMode: data.maintenance_mode,
          emailConfig: data.email_config,
          colors: data.colors,
        }
      : {
          adminEmail: "esmaglobaleservices@gmail.com",
          notificationsEnabled: true,
          autoReplyEnabled: false,
          maintenanceMode: false,
        }

    cachedSettings = settings
    return { ...settings }
  } catch (error) {
    console.error("Error fetching site settings:", error)
    return {
      adminEmail: "esmaglobaleservices@gmail.com",
      notificationsEnabled: true,
      autoReplyEnabled: false,
      maintenanceMode: false,
    }
  }
}

export async function updateSiteSettings(
  settings: Partial<SiteSettings>
): Promise<SiteSettings> {
  try {
    // Invalidate cache
    cachedSettings = null

    const { data, error } = await supabase
      .from("site_settings")
      .update({
        admin_email: settings.adminEmail,
        notifications_enabled: settings.notificationsEnabled,
        auto_reply_enabled: settings.autoReplyEnabled,
        maintenance_mode: settings.maintenanceMode,
      })
      .eq("id", 1)
      .select()
      .single()

    if (error) throw error

    const updated: SiteSettings = {
      adminEmail: data.admin_email,
      notificationsEnabled: data.notifications_enabled,
      autoReplyEnabled: data.auto_reply_enabled,
      maintenanceMode: data.maintenance_mode,
      emailConfig: data.email_config,
      colors: data.colors,
    }

    cachedSettings = updated
    return { ...updated }
  } catch (error) {
    console.error("Error updating site settings:", error)
    throw error
  }
}

// Services - static for now
export function getServices(): Service[] {
  return services.filter((s) => s.active)
}

export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id)
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

export async function markAllNotificationsAsRead(): Promise<void> {
  try {
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("is_read", false)

    if (error) throw error
  } catch (error) {
    console.error("Error marking notifications as read:", error)
    throw error
  }
}
