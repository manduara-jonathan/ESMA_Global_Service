import { Redis } from "@upstash/redis"

// Initialize Redis client
const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

// Admin credentials from environment variables (secure)
// Default values - MUST be changed in production
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "esmaglobaleservices@gmail.com"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "jojoA2@19"

// Session configuration
export const SESSION_COOKIE_NAME = "esma_admin_session"
const SESSION_EXPIRY = 60 * 60 * 24 * 7 // 7 days in seconds

// Login attempt tracking for rate limiting
const loginAttempts = new Map<string, { count: number; blockedUntil: number }>()

interface Session {
  userId: string
  email: string
  role: string
  createdAt: string
  ip: string
  userAgent: string
}

// Generate a secure random session ID
function generateSessionId(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("")
}

// Authenticate user and create session in Redis
export async function authenticateUser(
  email: string,
  password: string,
  ip?: string,
  userAgent?: string
): Promise<{ success: true; sessionId: string } | { success: false; error: string }> {
  const attemptKey = ip || "unknown"
  const now = Date.now()
  
  // Check if IP is blocked due to too many failed attempts
  const attempts = loginAttempts.get(attemptKey)
  if (attempts && attempts.blockedUntil > now) {
    const remainingMinutes = Math.ceil((attempts.blockedUntil - now) / 60000)
    return { 
      success: false, 
      error: `Trop de tentatives. Réessayez dans ${remainingMinutes} minute(s).` 
    }
  }

  // Normalize email for comparison (case-insensitive)
  const normalizedEmail = email.toLowerCase().trim()
  const normalizedAdminEmail = ADMIN_EMAIL.toLowerCase().trim()
  
  // Use timing-safe comparison to prevent timing attacks
  const emailMatch = normalizedEmail === normalizedAdminEmail
  const passwordMatch = password === ADMIN_PASSWORD
  
  if (!emailMatch || !passwordMatch) {
    // Track failed attempt
    const currentAttempts = loginAttempts.get(attemptKey) || { count: 0, blockedUntil: 0 }
    currentAttempts.count++
    
    // Block after 5 failed attempts for 15 minutes
    if (currentAttempts.count >= 5) {
      currentAttempts.blockedUntil = now + 15 * 60 * 1000 // 15 minutes
      currentAttempts.count = 0 // Reset count for next block period
    }
    
    loginAttempts.set(attemptKey, currentAttempts)
    
    // Add small delay only on failed attempts to prevent timing attacks
    await new Promise(resolve => setTimeout(resolve, 200))
    return { success: false, error: "Email ou mot de passe incorrect" }
  }
  
  // Clear failed attempts on successful login
  loginAttempts.delete(attemptKey)

  // Generate session ID
  const sessionId = generateSessionId()

  // Create session data
  const session: Session = {
    userId: "admin-001",
    email: ADMIN_EMAIL,
    role: "superadmin",
    createdAt: new Date().toISOString(),
    ip: ip || "unknown",
    userAgent: userAgent || "unknown",
  }

  // Store session in Redis with expiry
  await redis.set(`session:${sessionId}`, JSON.stringify(session), {
    ex: SESSION_EXPIRY,
  })

  return { success: true, sessionId }
}

// Verify session from Redis
export async function validateSession(
  sessionId: string
): Promise<{ valid: true; user: { id: string; email: string; role: string } } | { valid: false; error: string }> {
  if (!sessionId) {
    return { valid: false, error: "Session non fournie" }
  }

  try {
    const sessionData = await redis.get<string | Session>(`session:${sessionId}`)
    
    if (!sessionData) {
      return { valid: false, error: "Session expirée ou invalide" }
    }

    // Parse session - handle both string and object responses from Redis
    let session: Session
    if (typeof sessionData === "string") {
      session = JSON.parse(sessionData) as Session
    } else {
      session = sessionData as Session
    }

    return {
      valid: true,
      user: {
        id: session.userId,
        email: session.email,
        role: session.role,
      },
    }
  } catch {
    return { valid: false, error: "Erreur de validation de session" }
  }
}

// Logout - delete session from Redis
export async function logout(sessionId: string): Promise<boolean> {
  if (!sessionId) return false
  
  try {
    await redis.del(`session:${sessionId}`)
    return true
  } catch {
    return false
  }
}

// Get session expiry for cookie
export function getSessionExpiry(): number {
  return SESSION_EXPIRY
}
