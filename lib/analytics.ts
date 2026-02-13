import type { AnalyticsData, PageView, VisitorSession } from "./types"

// In-memory analytics store for real-time tracking
// In production, this would be a database like Redis or PostgreSQL

const pageViews: PageView[] = []
const sessions: Map<string, VisitorSession> = new Map()
const hourlyStats: Map<number, number> = new Map()

// Track a new page view
export function trackPageView(
  path: string,
  referrer?: string,
  userAgent?: string,
  ip?: string
): PageView {
  const pageView: PageView = {
    id: generateId(),
    path,
    referrer: referrer || "direct",
    timestamp: Date.now(),
    userAgent: userAgent || "unknown",
    ip: ip || "unknown",
    sessionId: getSessionId(ip || "unknown"),
  }

  pageViews.push(pageView)

  // Update hourly stats
  const hour = Math.floor(Date.now() / (1000 * 60 * 60))
  hourlyStats.set(hour, (hourlyStats.get(hour) || 0) + 1)

  // Clean old data (keep last 24 hours for real-time, 30 days for analytics)
  cleanupOldData()

  return pageView
}

// Track visitor session
export function trackSession(
  sessionId: string,
  startTime: number,
  pageViews: number = 1
): void {
  sessions.set(sessionId, {
    id: sessionId,
    startTime,
    lastActivity: Date.now(),
    pageViews,
    duration: 0,
  })
}

// Update session activity
export function updateSession(sessionId: string): void {
  const session = sessions.get(sessionId)
  if (session) {
    session.lastActivity = Date.now()
    session.pageViews++
    session.duration = Math.floor((session.lastActivity - session.startTime) / 1000)
    sessions.set(sessionId, session)
  }
}

// Get active sessions (active in last 5 minutes)
export function getActiveSessions(): number {
  const fiveMinutesAgo = Date.now() - 5 * 60 * 1000
  let count = 0
  sessions.forEach((session) => {
    if (session.lastActivity > fiveMinutesAgo) {
      count++
    }
  })
  return count
}

// Get total visits (unique sessions today)
export function getTotalVisits(): number {
  const today = new Date().setHours(0, 0, 0, 0)
  const todaySessions = new Set<string>()

  pageViews.forEach((view) => {
    if (view.timestamp >= today) {
      todaySessions.add(view.sessionId)
    }
  })

  return todaySessions.size
}

// Get total page views
export function getTotalPageViews(): number {
  const today = new Date().setHours(0, 0, 0, 0)
  return pageViews.filter((view) => view.timestamp >= today).length
}

// Get average session duration
export function getAverageSessionDuration(): number {
  const today = new Date().setHours(0, 0, 0, 0)
  let totalDuration = 0
  let sessionCount = 0

  sessions.forEach((session) => {
    if (session.startTime >= today) {
      totalDuration += session.duration
      sessionCount++
    }
  })

  return sessionCount > 0 ? Math.floor(totalDuration / sessionCount) : 0
}

// Get bounce rate
export function getBounceRate(): number {
  const today = new Date().setHours(0, 0, 0, 0)
  let singlePageSessions = 0
  let totalSessions = 0

  sessions.forEach((session) => {
    if (session.startTime >= today) {
      totalSessions++
      if (session.pageViews === 1) {
        singlePageSessions++
      }
    }
  })

  return totalSessions > 0 ? Math.floor((singlePageSessions / totalSessions) * 100) : 0
}

// Get hourly traffic data (last 24 hours)
export function getHourlyTraffic(): number[] {
  const currentHour = Math.floor(Date.now() / (1000 * 60 * 60))
  const data: number[] = []

  for (let i = 23; i >= 0; i--) {
    const hour = currentHour - i
    data.push(hourlyStats.get(hour) || 0)
  }

  return data
}

// Get top pages
export function getTopPages(): { path: string; views: number }[] {
  const today = new Date().setHours(0, 0, 0, 0)
  const pageCounts: Map<string, number> = new Map()

  pageViews.forEach((view) => {
    if (view.timestamp >= today) {
      pageCounts.set(view.path, (pageCounts.get(view.path) || 0) + 1)
    }
  })

  return Array.from(pageCounts.entries())
    .map(([path, views]) => ({ path, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10)
}

// Get recent activity
export function getRecentActivity(): {
  action: string
  page: string
  time: string
}[] {
  const recent = pageViews
    .slice(-20)
    .reverse()
    .map((view) => ({
      action: getActionType(view.path),
      page: view.path,
      time: formatTime(view.timestamp),
    }))

  return recent
}

// Get full analytics data
export function getAnalyticsData(): AnalyticsData {
  const avgDuration = getAverageSessionDuration()

  return {
    activeUsers: getActiveSessions(),
    totalVisits: getTotalVisits(),
    pageViews: getTotalPageViews(),
    avgSessionDuration: formatDuration(avgDuration),
    bounceRate: getBounceRate(),
    hourlyTraffic: getHourlyTraffic(),
    topPages: getTopPages(),
    recentActivity: getRecentActivity(),
  }
}

// Helper functions
function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

function getSessionId(ip: string): string {
  return `session_${ip.replace(/\./g, "_")}_${Math.floor(Date.now() / (1000 * 60 * 30))}`
}

function getActionType(path: string): string {
  if (path.includes("contact")) return "Formulaire contact"
  if (path.includes("services")) return "Visite service"
  if (path.includes("booking")) return "Reservation"
  if (path.includes("admin")) return "Connexion admin"
  return "Page vue"
}

function formatTime(timestamp: number): string {
  const diff = Date.now() - timestamp
  const minutes = Math.floor(diff / 60000)

  if (minutes < 1) return "A l'instant"
  if (minutes < 60) return `Il y a ${minutes}min`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `Il y a ${hours}h`
  return `Il y a ${Math.floor(hours / 24)}j`
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}m ${secs}s`
}

function cleanupOldData(): void {
  const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000

  // Remove old page views (keep last 24 hours for real-time)
  while (pageViews.length > 0 && pageViews[0].timestamp < oneDayAgo) {
    pageViews.shift()
  }

  // Remove old sessions
  sessions.forEach((session, id) => {
    if (session.lastActivity < thirtyDaysAgo) {
      sessions.delete(id)
    }
  })

  // Remove old hourly stats
  const currentHour = Math.floor(Date.now() / (1000 * 60 * 60))
  hourlyStats.forEach((_, hour) => {
    if (hour < currentHour - 48) {
      hourlyStats.delete(hour)
    }
  })
}
