import { jwtVerify, SignJWT, type JWTPayload } from "jose"

export const SESSION_COOKIE_NAME = "esma_admin_session"
const SESSION_EXPIRY = 60 * 60 * 24 * 7
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "contact@esmaglobalservice.com"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "jojoA2@19"

interface SessionClaims extends JWTPayload {
  userId: string
  email: string
  role: string
}

const loginAttempts = new Map<string, { count: number; blockedUntil: number }>()

function getSessionSecret(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.SUPABASE_JWT_SECRET
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not configured")
  }
  return new TextEncoder().encode(secret)
}

function getClientKey(ip?: string): string {
  return ip?.split(",")[0]?.trim() || "unknown"
}

async function createSessionToken(claims: SessionClaims): Promise<string> {
  return new SignJWT(claims)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setSubject(claims.userId)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_EXPIRY}s`)
    .sign(getSessionSecret())
}

export async function authenticateUser(
  email: string,
  password: string,
  ip?: string,
  _userAgent?: string,
): Promise<{ success: true; sessionId: string } | { success: false; error: string }> {
  const attemptKey = getClientKey(ip)
  const now = Date.now()
  const attempts = loginAttempts.get(attemptKey)

  if (attempts && attempts.blockedUntil > now) {
    const minutes = Math.ceil((attempts.blockedUntil - now) / 60000)
    return { success: false, error: `Trop de tentatives. Réessayez dans ${minutes} minute(s).` }
  }

  const validCredentials =
    email.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase().trim() && password === ADMIN_PASSWORD

  if (!validCredentials) {
    const current = loginAttempts.get(attemptKey) || { count: 0, blockedUntil: 0 }
    current.count += 1
    if (current.count >= 5) {
      current.blockedUntil = now + 15 * 60 * 1000
      current.count = 0
    }
    loginAttempts.set(attemptKey, current)
    await new Promise((resolve) => setTimeout(resolve, 200))
    return { success: false, error: "Email ou mot de passe incorrect" }
  }

  loginAttempts.delete(attemptKey)

  try {
    const sessionId = await createSessionToken({
      userId: "admin-001",
      email: ADMIN_EMAIL,
      role: "superadmin",
    })
    return { success: true, sessionId }
  } catch (error) {
    console.error("[auth] Failed to create session token:", error)
    return { success: false, error: "La configuration de session est incomplète" }
  }
}

export async function validateSession(
  sessionId: string,
): Promise<
  | { valid: true; user: { id: string; email: string; role: string } }
  | { valid: false; error: string }
> {
  if (!sessionId) return { valid: false, error: "Session non fournie" }

  try {
    const { payload } = await jwtVerify(sessionId, getSessionSecret(), {
      algorithms: ["HS256"],
    })

    if (payload.role !== "superadmin" || typeof payload.email !== "string" || typeof payload.sub !== "string") {
      return { valid: false, error: "Session invalide" }
    }

    return {
      valid: true,
      user: { id: payload.sub, email: payload.email, role: payload.role },
    }
  } catch {
    return { valid: false, error: "Session expirée ou invalide" }
  }
}

export async function logout(_sessionId: string): Promise<boolean> {
  return true
}

export function getSessionExpiry(): number {
  return SESSION_EXPIRY
}

export function getAdminEmail(): string {
  return ADMIN_EMAIL
}

export function getAdminPassword(): string {
  return ADMIN_PASSWORD
}
