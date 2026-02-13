import type { Service, ContactMessage, BookingRequest, Notification, SiteSettings } from "./types"

// In-memory store for demo purposes
// In production, replace with a real database

const services: Service[] = [
  {
    id: "1",
    name: "Billets d'avion",
    slug: "billets-avion",
    description:
      "Vente de billets d'avion nationaux et internationaux aux meilleurs tarifs avec les principales compagnies aeriennes.",
    category: "voyage",
    image: "/images/flights.jpg",
    features: [
      "Reservations de vols nationaux et internationaux",
      "Tarifs preferentiels avec les principales compagnies aeriennes",
      "Assistance personnalisee pour vos voyages",
      "Gestion des modifications et annulations",
    ],
    active: true,
  },
  {
    id: "2",
    name: "Facilitation de visas",
    slug: "visas",
    description:
      "Accompagnement dans toutes les demarches administratives pour l'obtention de visas touristiques et autres.",
    category: "voyage",
    image: "/images/visas.jpg",
    features: [
      "Assistance pour la preparation du dossier",
      "Suivi personnalise de votre demande",
      "Conseils d'experts pour maximiser vos chances",
      "Visa touristique, affaires, etudes",
    ],
    active: true,
  },
  {
    id: "3",
    name: "Services monnaie mobile",
    slug: "monnaie-mobile",
    description:
      "Transactions financieres rapides et securisees via monnaie mobile pour transferts et paiements.",
    category: "finance",
    image: "/images/mobile-money.jpg",
    features: [
      "Transferts d'argent nationaux et internationaux",
      "Paiements de factures et recharges",
      "Frais competitifs et service rapide",
      "Support multi-operateurs",
    ],
    active: true,
  },
  {
    id: "4",
    name: "Service de nettoyage",
    slug: "nettoyage",
    description:
      "Entretien professionnel de vos locaux avec des equipements modernes et des produits ecologiques.",
    category: "nettoyage",
    image: "/images/cleaning.jpg",
    features: [
      "Nettoyage regulier ou ponctuel",
      "Personnel qualifie et materiel professionnel",
      "Produits respectueux de l'environnement",
      "Devis personnalises",
    ],
    active: true,
  },
  {
    id: "5",
    name: "Service traiteur",
    slug: "traiteur",
    description:
      "Menus varies et personnalises pour tous vos evenements avec des plats prepares par nos chefs.",
    category: "traiteur",
    image: "/images/catering.jpg",
    features: [
      "Menus adaptes a tous types d'evenements",
      "Ingredients frais et de qualite",
      "Service complet avec mise en place",
      "Options vegetariennes et specifiques",
    ],
    active: true,
  },
]

const contactMessages: ContactMessage[] = []
const bookings: BookingRequest[] = []
const notifications: Notification[] = [
  {
    id: "1",
    type: "info",
    title: "Bienvenue sur MK GLOBAL SERVICE",
    message: "Decouvrez tous nos services et n'hesitez pas a nous contacter pour toute question.",
    read: false,
    link: "/services",
    createdAt: new Date().toISOString(),
  },
]

let nextId = 100

function generateId(): string {
  nextId++
  return nextId.toString()
}

// Services
export function getServices(): Service[] {
  return services.filter((s) => s.active)
}

export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id)
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

// Contact Messages
export function getContactMessages(): ContactMessage[] {
  return [...contactMessages].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export function createContactMessage(
  data: Omit<ContactMessage, "id" | "status" | "createdAt">
): ContactMessage {
  const message: ContactMessage = {
    ...data,
    id: generateId(),
    status: "new",
    createdAt: new Date().toISOString(),
  }
  contactMessages.push(message)

  // Auto-create notification for new contact message
  createNotification({
    type: "info",
    title: "Nouveau message de contact",
    message: `${data.firstName} ${data.lastName} a envoye un message concernant: ${data.service}`,
    link: "/admin/messages",
  })

  return message
}

export function updateContactMessageStatus(
  id: string,
  status: ContactMessage["status"]
): ContactMessage | undefined {
  const msg = contactMessages.find((m) => m.id === id)
  if (msg) {
    msg.status = status
  }
  return msg
}

export function deleteContactMessage(id: string): boolean {
  const index = contactMessages.findIndex((m) => m.id === id)
  if (index !== -1) {
    contactMessages.splice(index, 1)
    return true
  }
  return false
}

export function getUnreadMessageCount(): number {
  return contactMessages.filter((m) => m.status === "new").length
}

// Bookings
export function getBookings(): BookingRequest[] {
  return [...bookings].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export function createBooking(
  data: Omit<BookingRequest, "id" | "status" | "createdAt">
): BookingRequest {
  const booking: BookingRequest = {
    ...data,
    id: generateId(),
    status: "pending",
    createdAt: new Date().toISOString(),
  }
  bookings.push(booking)

  createNotification({
    type: "success",
    title: "Nouvelle reservation",
    message: `${data.customerName} a fait une reservation pour: ${data.service}`,
    link: "/admin/bookings",
  })

  return booking
}

export function updateBookingStatus(
  id: string,
  status: BookingRequest["status"]
): BookingRequest | undefined {
  const booking = bookings.find((b) => b.id === id)
  if (booking) {
    booking.status = status
  }
  return booking
}

export function deleteBooking(id: string): boolean {
  const index = bookings.findIndex((b) => b.id === id)
  if (index !== -1) {
    bookings.splice(index, 1)
    return true
  }
  return false
}

export function getPendingBookingCount(): number {
  return bookings.filter((b) => b.status === "pending").length
}

// Notifications
export function getNotifications(): Notification[] {
  return [...notifications].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export function getUnreadNotificationCount(): number {
  return notifications.filter((n) => !n.read).length
}

export function createNotification(
  data: Omit<Notification, "id" | "read" | "createdAt">
): Notification {
  const notification: Notification = {
    ...data,
    id: generateId(),
    read: false,
    createdAt: new Date().toISOString(),
  }
  notifications.push(notification)
  return notification
}

export function markNotificationAsRead(id: string): Notification | undefined {
  const notif = notifications.find((n) => n.id === id)
  if (notif) {
    notif.read = true
  }
  return notif
}

export function markAllNotificationsAsRead(): void {
  for (const n of notifications) {
    n.read = true
  }
}

export function deleteNotification(id: string): boolean {
  const index = notifications.findIndex((n) => n.id === id)
  if (index !== -1) {
    notifications.splice(index, 1)
    return true
  }
  return false
}

// Site Settings
let siteSettings: SiteSettings = {
  adminEmail: "admin@mkglobalservice.com",
  notificationsEnabled: true,
  autoReplyEnabled: false,
  maintenanceMode: false,
}

export function getSiteSettings(): SiteSettings {
  return { ...siteSettings }
}

export function updateSiteSettings(settings: Partial<SiteSettings>): SiteSettings {
  siteSettings = { ...siteSettings, ...settings }
  return { ...siteSettings }
}

export function updateEmailConfig(config: SiteSettings["emailConfig"]): SiteSettings {
  siteSettings.emailConfig = config
  return { ...siteSettings }
}
