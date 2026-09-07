export interface Service {
  id: string
  name: string
  slug: string
  description: string
  category: "voyage" | "finance" | "nettoyage" | "traiteur"
  image: string
  features: string[]
  active: boolean
}

export interface ContactMessage {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  service: string
  message: string
  status: "new" | "read" | "replied" | "archived"
  createdAt: string
}

export interface BookingRequest {
  id: string
  service: string
  customerName: string
  customerEmail: string
  customerPhone: string
  date: string
  details: string
  status: "pending" | "confirmed" | "cancelled" | "completed"
  createdAt: string
}

export interface Notification {
  id: string
  type: "info" | "success" | "warning" | "error"
  title: string
  message: string
  read: boolean
  link?: string
  createdAt: string
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface AnalyticsData {
  activeUsers: number
  totalVisits: number
  pageViews: number
  avgSessionDuration: string
  bounceRate: number
  hourlyTraffic: number[]
  topPages: { path: string; views: number }[]
  recentActivity: { action: string; page: string; time: string }[]
}

export interface PageView {
  id: string
  path: string
  referrer: string
  timestamp: number
  userAgent: string
  ip: string
  sessionId: string
}

export interface VisitorSession {
  id: string
  startTime: number
  lastActivity: number
  pageViews: number
  duration: number
}

export interface AdminUser {
  id: string
  username: string
  passwordHash: string
  role: "admin" | "superadmin"
  createdAt: string
  lastLogin?: string
}

export interface AdminSession {
  id: string
  userId: string
  token: string
  createdAt: string
  expiresAt: string
  ip?: string
  userAgent?: string
}

export interface SiteSettings {
  adminEmail: string
  notificationsEnabled: boolean
  autoReplyEnabled: boolean
  maintenanceMode: boolean
  colors?: Record<string, string>
  emailConfig?: {
    smtpHost: string
    smtpPort: number
    smtpUser: string
    smtpPassword: string
    fromEmail: string
    fromName: string
  }
}
