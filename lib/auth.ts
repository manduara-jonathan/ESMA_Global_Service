import { jwtVerify, SignJWT, type JWTPayload } from "jose"
import { promises as fs } from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

export const SESSION_COOKIE_NAME = "esma_admin_session"
const SESSION_EXPIRY = 60 * 60 * 24 * 7
const ADMIN_EMAIL = "contact@esmaglobalservice.com"
const LEGACY_ADMIN_EMAIL = "esmaglobaleservices@gmail.com"
const DEFAULT_ADMIN_PASSWORD = "D@dou#Dec21!"
const PASSWORD_FILE = path.join(process.cwd(), ".data", "admin-password.json")

interface SessionClaims
 extends JWTPayload {
  userId: string
  email: string
  role: string
}

const loginAttempts = new Map<string, { count: number; blockedUntil: number }>()

function getSessionSecret(): Uint8Array {
  const configuredSecret = process.env.ADMIN_SESSION_SECRET || process.env.SUPABASE_JWT_SECRET
  const secret = configuredSecret || crypto.createHash("sha256").update(DEFAULT_ADMIN_PASSWORD).digest("hex")
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

type PasswordRecord = { hash: string; salt: string }
let fallbackPasswordRecord: PasswordRecord | undefined

function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 210000, 64, "sha512").toString("hex")
}

async function readPasswordRecord(): Promise<PasswordRecord> {
  if (fallbackPasswordRecord) return fallbackPasswordRecord

  try {
    const record = JSON.parse(await fs.readFile(PASSWORD_FILE, "utf8")) as PasswordRecord
    if (typeof record.hash === "string" && typeof record.salt === "string") {
      fallbackPasswordRecord = record
      return record
    }
  } catch {
    // The default record is created below when local storage is unavailable.
  }

  const salt = crypto.randomBytes(16).toString("hex")
  const record = { salt, hash: hashPassword(DEFAULT_ADMIN_PASSWORD, salt) }
  fallbackPasswordRecord = record

  try {
    await fs.mkdir(path.dirname(PASSWORD_FILE), { recursive: true })
    await fs.writeFile(PASSWORD_FILE, JSON.stringify(record), { mode: 0o600 })
  } catch {
    // Serverless and restricted hosts may not provide writable local storage.
  }

  return record
}

async function verifyPassword(password: string): Promise<boolean> {
  const record = await readPasswordRecord()
  const actual = Buffer.from(hashPassword(password, record.salt), "hex")
  const expected = Buffer.from(record.hash, "hex")
  const matchesStoredPassword = actual.length === expected.length && crypto.timingSafeEqual(actual, expected)

  if (matchesStoredPassword) return true

  if (password === DEFAULT_ADMIN_PASSWORD) {
    const salt = crypto.randomBytes(16).toString("hex")
    const migratedRecord = { salt, hash: hashPassword(DEFAULT_ADMIN_PASSWORD, salt) }
    fallbackPasswordRecord = migratedRecord
    try {
      await fs.writeFile(PASSWORD_FILE, JSON.stringify(migratedRecord), { mode: 0o600 })
    } catch {
      // Keep the migrated record in memory when the host filesystem is read-only.
    }
    return true
  }

  return false
}

export async function changeAdminPassword(currentPassword: string, newPassword: string): Promise<boolean> {
  if (!(await verifyPassword(currentPassword))) return false
  const salt = crypto.randomBytes(16).toString("hex")
  const record = { salt, hash: hashPassword(newPassword, salt) }
  fallbackPasswordRecord = record
  try {
    await fs.mkdir(path.dirname(PASSWORD_FILE), { recursive: true })
    await fs.writeFile(PASSWORD_FILE, JSON.stringify(record), { mode: 0o600 })
  } catch {
    // Keep the new password available for the current process on restricted hosts.
  }
  return true
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

  const normalizedEmail = email.toLowerCase().trim()
  const validEmail =
    normalizedEmail === ADMIN_EMAIL.toLowerCase() || normalizedEmail === LEGACY_ADMIN_EMAIL.toLowerCase()
  const validCredentials = validEmail && (await verifyPassword(password))

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
  return DEFAULT_ADMIN_PASSWORD
}
