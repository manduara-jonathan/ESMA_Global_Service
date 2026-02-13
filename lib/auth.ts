import type { AdminUser } from "./types"
import { SignJWT, jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "mk-admin-secret-key-min-32-characters-for-hs256"
)

const TOKEN_EXPIRATION = "24h"

// Simple hash function
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + "mk-global-salt-2024")
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password)
  return passwordHash === hash
}

// Default admin user: mervrille@kembo / M@nage01++
const adminUsers: AdminUser[] = [
  {
    id: "admin-001",
    username: "mervrille@kembo",
    passwordHash: "c4d78b8ea95809bf4b56850318f2ff6661dd8a29d49c7906b05c771a6aef030e",
    role: "superadmin",
    createdAt: new Date().toISOString(),
  },
]

export async function authenticateUser(
  username: string,
  password: string,
  ip?: string,
  userAgent?: string
): Promise<{ success: true; token: string; user: Omit<AdminUser, "passwordHash"> } | { success: false; error: string }> {
  const user = adminUsers.find((u) => u.username === username)

  if (!user) {
    return { success: false, error: "Identifiants invalides" }
  }

  const isValid = await verifyPassword(password, user.passwordHash)

  if (!isValid) {
    return { success: false, error: "Identifiants invalides" }
  }

  user.lastLogin = new Date().toISOString()

  const { passwordHash: _, ...userWithoutPassword } = user

  const token = await new SignJWT({
    userId: user.id,
    username: user.username,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRATION)
    .sign(JWT_SECRET)

  return {
    success: true,
    token,
    user: userWithoutPassword,
  }
}

export async function validateSession(token: string): Promise<{ valid: true; user: Omit<AdminUser, "passwordHash"> } | { valid: false; error: string }> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)

    const user = adminUsers.find((u) => u.id === payload.userId)

    if (!user) {
      return { valid: false, error: "Utilisateur non trouve" }
    }

    const { passwordHash: _, ...userWithoutPassword } = user
    return { valid: true, user: userWithoutPassword }
  } catch (error) {
    if (error instanceof Error && error.message.includes("exp")) {
      return { valid: false, error: "Session expiree" }
    }
    return { valid: false, error: "Token invalide" }
  }
}

export function logout(token: string): boolean {
  return true
}

export async function changePassword(
  userId: string,
  oldPassword: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  const user = adminUsers.find((u) => u.id === userId)
  if (!user) {
    return { success: false, error: "Utilisateur introuvable" }
  }

  const isValid = await verifyPassword(oldPassword, user.passwordHash)
  if (!isValid) {
    return { success: false, error: "Ancien mot de passe incorrect" }
  }

  if (newPassword.length < 8) {
    return { success: false, error: "Le mot de passe doit faire au moins 8 caracteres" }
  }

  user.passwordHash = await hashPassword(newPassword)
  return { success: true }
}
