# 📚 GUIDE DE DÉVELOPPEMENT - MEILLEURES PRATIQUES

## 🔐 Sécurité

### Jamais Faire ❌
```typescript
// ❌ MAUVAIS: Credentials en dur dans le code
const ADMIN_PASSWORD = "monMotDePasse123"

// ❌ MAUVAIS: Pas de sanitisation des inputs
const message = userInput // Risque XSS

// ❌ MAUVAIS: Cookies non sécurisés
response.cookies.set({ secure: false })

// ❌ MAUVAIS: Pas de rate limiting
export async function POST(request: Request) {
  // Pas de protection contre les abus
}
```

### Toujours Faire ✅
```typescript
// ✅ BON: Credentials dans les env vars
const password = process.env.ADMIN_PASSWORD

// ✅ BON: Sanitisation des inputs
import { sanitizeInput } from "@/lib/utils"
const safeName = sanitizeInput(userName)

// ✅ BON: Cookies sécurisés en production
response.cookies.set({
  secure: process.env.NODE_ENV === "production",
  httpOnly: true,
  sameSite: "lax",
})

// ✅ BON: Rate limiting sur les endpoints publics
import { checkRateLimit } from "@/lib/utils"
const ip = request.headers.get("x-forwarded-for") || "unknown"
const rateLimit = checkRateLimit(`endpoint:${ip}`, 10, 60000)
if (!rateLimit.allowed) return error429()
```

### Validation des Inputs
```typescript
// ✅ Toujours valider avant d'utiliser
import { isValidEmail, isValidPhone, sanitizeInput } from "@/lib/utils"

if (!isValidEmail(email)) {
  throw new ValidationError("Email invalide")
}

const safeName = sanitizeInput(firstName)
```

### Gestion des Erreurs
```typescript
// ✅ Utiliser les classes d'erreur
import {
  ValidationError,
  AuthError,
  NotFoundError,
} from "@/lib/errors"

if (!data) {
  throw new NotFoundError("Ressource introuvable")
}

// ✅ Dans les routes API
export async function POST(request: Request) {
  try {
    // logique...
  } catch (error) {
    const { status, body } = getErrorResponse(error)
    return NextResponse.json(body, { status })
  }
}
```

---

## 📝 Validation et Types

### Types pour les Données
```typescript
// ✅ BON: Définir les types clairement
interface ContactMessage {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  service: string
  message: string
  createdAt: Date
}

// ✅ BON: Utiliser les types pour les réponses API
interface ApiResponse<T = void> {
  success: boolean
  message?: string
  error?: string
  data?: T
}
```

### Validation des Données
```typescript
// ✅ BON: Valider les données à l'entrée
export async function POST(request: Request) {
  const body = await request.json()

  if (!body.email) {
    throw new ValidationError("Email obligatoire")
  }

  if (!isValidEmail(body.email)) {
    throw new ValidationError("Email invalide")
  }

  // Utiliser les données validées
}
```

---

## 🎯 Patterns et Structures

### Routes API
```typescript
// ✅ BON: Structure cohérente
import { NextResponse } from "next/server"
import { ValidationError } from "@/lib/errors"
import { getErrorResponse } from "@/lib/errors"

export async function GET(request: Request) {
  try {
    // 1. Valider les paramètres
    // 2. Vérifier l'authentification si nécessaire
    // 3. Récupérer les données
    // 4. Retourner la réponse

    return NextResponse.json({ success: true, data })
  } catch (error) {
    const { status, body } = getErrorResponse(error)
    return NextResponse.json(body, { status })
  }
}

export async function POST(request: Request) {
  try {
    // 1. Vérifier le rate limiting
    // 2. Parser la requête
    // 3. Valider les inputs
    // 4. Faire la logique métier
    // 5. Retourner la réponse

    return NextResponse.json({ success: true })
  } catch (error) {
    const { status, body } = getErrorResponse(error)
    return NextResponse.json(body, { status })
  }
}
```

### Composants React
```typescript
// ✅ BON: Composants bien typés
interface ContactFormProps {
  onSuccess?: () => void
  initialService?: string
}

export function ContactForm({
  onSuccess,
  initialService,
}: ContactFormProps) {
  // Composant
}

// ✅ BON: Gestion des erreurs dans les formulaires
const [error, setError] = useState<string | null>(null)
const [loading, setLoading] = useState(false)

const handleSubmit = async (data: FormData) => {
  setLoading(true)
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      const errorData = await res.json()
      setError(errorData.error || "Erreur inconnue")
      return
    }

    onSuccess?.()
  } catch (err) {
    setError("Erreur de connexion")
  } finally {
    setLoading(false)
  }
}
```

---

## 🧹 Code Quality

### Imports
```typescript
// ✅ BON: Imports organisés
import { useState, useCallback } from "react"
import { NextResponse } from "next/server"

import { sanitizeInput, checkRateLimit } from "@/lib/utils"
import { ValidationError } from "@/lib/errors"
import type { ContactMessage } from "@/lib/types"

// ❌ MAUVAIS: Imports inutilisés
import { functionNotUsed } from "@/lib/utils"
```

### Nommage
```typescript
// ✅ BON: Noms clairs et explicites
const isUserAuthenticated = !!sessionId
const getContactsByService = (service: string) => { }
const validateEmailFormat = (email: string): boolean => { }

// ❌ MAUVAIS: Noms ambigus
const check = !!sessionId
const get = (service) => { }
const validate = (email) => { }
```

### Fonctions
```typescript
// ✅ BON: Fonctions petites et focalisées
export function sanitizeInput(input: string): string {
  if (!input) return ""
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim()
}

// ✅ BON: Documenter les fonctions critiques
/**
 * Vérifie le rate limiting pour un utilisateur
 * @param key - Clé unique (ex: IP ou user ID)
 * @param maxRequests - Nombre max de requêtes
 * @param windowMs - Fenêtre de temps en ms
 * @returns {{allowed: boolean, remaining: number}}
 */
export function checkRateLimit(
  key: string,
  maxRequests: number = 10,
  windowMs: number = 60000
): { allowed: boolean; remaining: number }
```

---

## 🚀 Performance

### Images
```typescript
// ✅ BON: Utiliser next/image
import Image from "next/image"

<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={400}
  height={300}
  priority={false}
/>
```

### Composants
```typescript
// ✅ BON: Lazy load les composants lourds
import dynamic from "next/dynamic"

const HeavyComponent = dynamic(
  () => import("@/components/heavy"),
  { loading: () => <LoadingSpinner /> }
)
```

### Requêtes
```typescript
// ✅ BON: Cacher les données moins critiques
const { data, isLoading, error } = useSWR(
  "/api/data",
  fetcher,
  { revalidateOnFocus: false } // Ne pas revalider au focus
)
```

---

## 🧪 Testing

### Avant de commiter
```bash
# ✅ Vérifier les types
pnpm tsc --noEmit

# ✅ Linter le code
pnpm lint

# ✅ Formater le code
pnpm format

# ✅ Tester
pnpm test
```

### Exemples de tests
```typescript
// ✅ Test unitaire
describe("sanitizeInput", () => {
  test("échappe les caractères spéciaux", () => {
    expect(sanitizeInput("<script>")).toBe("&lt;script&gt;")
    expect(sanitizeInput("test&test")).toBe("test&amp;test")
  })
})

// ✅ Test d'intégrité
describe("POST /api/contact", () => {
  test("rejette les inputs invalides", async () => {
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({ email: "invalid" }),
    })
    expect(res.status).toBe(400)
  })
})
```

---

## 📋 Checklist avant de Merger

- [ ] TypeScript compile sans erreurs
- [ ] Pas d'imports inutilisés
- [ ] Pas de console.log en production
- [ ] Les credentials ne sont pas en dur
- [ ] Les inputs sont validés et sanitizés
- [ ] Les erreurs sont gérées correctement
- [ ] Les tests passent
- [ ] Le code est formaté (prettier)
- [ ] La documentation est à jour
- [ ] Les types sont bien définis

---

## 🔗 Ressources

- [OWASP Top 10](https://owasp.org/Top10/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [Next.js Security Best Practices](https://nextjs.org/docs/guides/security)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
