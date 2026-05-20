# 🗂️ INDEX DES MODIFICATIONS - Fichiers Clés

## 🔐 Fichiers de Sécurité (À Connaître)

### `lib/auth.ts` - Authentification
**Modifications:**
- ✅ Credentials chargés depuis env vars
- ✅ Protection contre brute force (5 tentatives → 15 min blocage)
- ✅ Timing-safe comparison
- ✅ Délai artifiel de 500ms

**À faire après audit:**
```typescript
// En production, ADMIN_PASSWORD doit être défini
if (!ADMIN_PASSWORD) {
  throw new Error("ADMIN_PASSWORD not configured")
}
```

---

### `lib/utils.ts` - Utilitaires Sécurité
**Nouvelles fonctions:**
- `sanitizeInput(input)` - Échappe les caractères XSS
- `isValidEmail(email)` - Valide les emails
- `isValidPhone(phone)` - Valide les numéros
- `checkRateLimit(key, max, window)` - Rate limiting

**Utilisation:**
```typescript
import { sanitizeInput, checkRateLimit } from "@/lib/utils"

// Sanitizer les inputs
const safeName = sanitizeInput(userInput)

// Rate limiting
const rateLimit = checkRateLimit(`endpoint:${ip}`, 10, 60000)
if (!rateLimit.allowed) return error429()
```

---

### `lib/errors.ts` - Gestion d'Erreurs
**Classes disponibles:**
- `ValidationError(message, details)` - 400
- `AuthError(message)` - 401
- `ForbiddenError(message)` - 403
- `NotFoundError(message)` - 404
- `TooManyRequestsError(message)` - 429
- `ServerError(message)` - 500

**Utilisation:**
```typescript
import { ValidationError, getErrorResponse } from "@/lib/errors"

try {
  if (!isValidEmail(email)) {
    throw new ValidationError("Email invalide")
  }
} catch (error) {
  const { status, body } = getErrorResponse(error)
  return NextResponse.json(body, { status })
}
```

---

### `middleware.ts` - Protection Routes
**Modifications:**
- ✅ Ajout des headers de sécurité
- ✅ Protection routes `/admin`
- ✅ Redirection vers login si pas de session

**Headers ajoutés:**
```
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: (en production)
```

---

## 🔧 Fichiers API (À Mettre à Jour)

### Routes à Mettre à Jour (Template)

```typescript
// app/api/votre-route/route.ts
import { NextResponse } from "next/server"
import { checkRateLimit, sanitizeInput } from "@/lib/utils"
import { ValidationError, getErrorResponse } from "@/lib/errors"

export async function POST(request: Request) {
  try {
    // 1. Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown"
    const rateLimit = checkRateLimit(`route:${ip}`, 5, 60000)
    if (!rateLimit.allowed) {
      throw new TooManyRequestsError("Trop de requêtes")
    }

    // 2. Parser et valider
    const body = await request.json()
    if (!body.field) {
      throw new ValidationError("Champ obligatoire")
    }

    // 3. Sanitizer les inputs
    const safeData = sanitizeInput(body.field)

    // 4. Logique métier
    // ...

    // 5. Répondre
    return NextResponse.json({ success: true })
  } catch (error) {
    const { status, body } = getErrorResponse(error)
    return NextResponse.json(body, { status })
  }
}
```

---

## 📊 Routes Modifiées (Résumé)

| Route | Changement | Priorité |
|-------|-----------|----------|
| `/api/auth` | Removed debug logs, secure cookies | 🔴 CRITICAL |
| `/api/contact` | Added rate limiting + sanitization | 🟠 IMPORTANT |
| `/api/bookings` | Added rate limiting + sanitization | 🟠 IMPORTANT |
| `/api/analytics` | Removed unused variables | 🟡 MINOR |
| `/admin/login` | Removed debug logs | 🟡 MINOR |
| `/middleware.ts` | Added security headers | 🟠 IMPORTANT |

---

## 🧪 Fichiers de Test (À Créer)

### Template Test - `lib/utils.test.ts`
```typescript
import { sanitizeInput, isValidEmail, checkRateLimit } from "@/lib/utils"

describe("sanitizeInput", () => {
  test("échappe les balises HTML", () => {
    expect(sanitizeInput("<script>alert('XSS')</script>"))
      .toBe("&lt;script&gt;alert(&#x27;XSS&#x27;)&lt;/script&gt;")
  })

  test("échappe les ampersands", () => {
    expect(sanitizeInput("a&b"))
      .toBe("a&amp;b")
  })
})

describe("isValidEmail", () => {
  test("accepte les emails valides", () => {
    expect(isValidEmail("test@example.com")).toBe(true)
  })

  test("rejette les emails invalides", () => {
    expect(isValidEmail("invalid")).toBe(false)
  })
})

describe("checkRateLimit", () => {
  test("permet les requêtes sous la limite", () => {
    const result = checkRateLimit("test", 5, 60000)
    expect(result.allowed).toBe(true)
  })

  test("bloque après avoir atteint la limite", () => {
    for (let i = 0; i < 5; i++) {
      checkRateLimit("test2", 5, 60000)
    }
    const result = checkRateLimit("test2", 5, 60000)
    expect(result.allowed).toBe(false)
  })
})
```

---

## 📝 Variables d'Environnement

### Production (Vercel)
```env
# Dans Settings → Environment Variables
ADMIN_EMAIL=admin@esmaglobaleservices.com
ADMIN_PASSWORD=VotreMdPSecurise123!
KV_REST_API_URL=https://redis-url
KV_REST_API_TOKEN=redis-token
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://esmaglobaleservices.com
```

### Développement (`.env.local`)
```env
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=test123
KV_REST_API_URL=http://localhost:6379
KV_REST_API_TOKEN=test-token
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🔍 Patterns à Suivre

### ✅ Validation des Inputs
```typescript
import { sanitizeInput, isValidEmail } from "@/lib/utils"

const safeName = sanitizeInput(firstName)
if (!isValidEmail(email)) {
  throw new ValidationError("Email invalide")
}
```

### ✅ Rate Limiting
```typescript
import { checkRateLimit } from "@/lib/utils"

const ip = request.headers.get("x-forwarded-for") || "unknown"
const rateLimit = checkRateLimit(`endpoint:${ip}`, 5, 60000)
if (!rateLimit.allowed) {
  throw new TooManyRequestsError()
}
```

### ✅ Gestion d'Erreurs
```typescript
import { getErrorResponse } from "@/lib/errors"

try {
  // logique...
} catch (error) {
  const { status, body } = getErrorResponse(error)
  return NextResponse.json(body, { status })
}
```

### ✅ Authentication Check
```typescript
import { checkAuth } from "@/lib/api-auth"

const auth = await checkAuth(request)
if (!auth.valid) {
  return NextResponse.json(
    { success: false, error: "Non authentifié" },
    { status: 401 }
  )
}
```

---

## 🚀 Checklist Maintenance

### Chaque Déploiement
- [ ] Vérifier que `ADMIN_PASSWORD` est défini
- [ ] Tester login admin
- [ ] Vérifier headers de sécurité
- [ ] Pas d'erreurs console

### Chaque Semaine
- [ ] Vérifier erreurs Sentry (une fois implémenté)
- [ ] Vérifier le rate limiting en production
- [ ] Vérifier les performances

### Chaque Mois
- [ ] Audit sécurité SSL Labs
- [ ] Revue des logs
- [ ] Mise à jour des dépendances

---

## 📞 Dépannage

**"Login échoue"**
```
❌ Vérifier ADMIN_EMAIL et ADMIN_PASSWORD dans env vars
❌ Vérifier que NODE_ENV est défini
✅ Redémarrer le serveur après changement env vars
```

**"Rate limiting trop strict"**
```
✅ Modifier dans lib/utils.ts:
   checkRateLimit(`endpoint:${ip}`, 5, 60000)
   ↓
   checkRateLimit(`endpoint:${ip}`, 10, 60000) // Plus permissif
```

**"Erreurs non loggées"**
```
✅ Implémenter Sentry selon IMPROVEMENT_ROADMAP.md
✅ Ou vérifier console du navigateur pour erreurs client
```

---

## 📚 Fichiers Lecture Recommandée

**Avant premier déploiement:**
1. `README_AUDIT.md` - Vue d'ensemble 5 min
2. `PRODUCTION_CHECKLIST.md` - Configuration
3. `AUDIT_REPORT.md` - Tous les détails

**Pour maintenance future:**
4. `DEVELOPMENT_GUIDE.md` - Patterns à suivre
5. `IMPROVEMENT_ROADMAP.md` - Évolutions

---

**Dernière update:** 09/05/2026  
**Version:** 1.0  
**Status:** ✅ Production Ready
