# Security Documentation - ESMA GLOBAL SERVICE Admin

## Overview
Ce document decrit le systeme de securite mis en place pour proteger l'interface d'administration.

## Fonctionnalites de securite

### 1. Authentification par session
- **Token securise**: Chaque session utilise un token aleatoire de 64 caracteres hexadecimaux
- **Cookie HTTP-only**: Le token est stocke dans un cookie inaccessible par JavaScript
- **SameSite Strict**: Protection contre les attaques CSRF
- **Expiration**: Les sessions expirent apres 24 heures d'inactivite

### 2. Hachage des mots de passe
- **Algorithme**: SHA-256 avec salt unique
- **Salt**: `esma-global-salt-2024`
- **Note**: En production, remplacer par bcrypt ou Argon2

### 3. Protection des routes

#### Middleware (middleware.ts)
- Redirection automatique vers `/admin/login` si non authentifie
- Redirection vers `/admin` si deja connecte sur la page de login
- Protection de toutes les routes `/admin/*` sauf `/admin/login`

#### API Routes
Toutes les API admin verifient l'authentification via `checkAuth()`:
- `/api/admin/messages/*` - Messages de contact
- `/api/admin/bookings/*` - Reservations
- `/api/admin/notifications/*` - Notifications
- `/api/analytics` - Statistiques

### 4. Identifiants par defaut
```
Email: esmaglobaleservices@gmail.com
Password: jojoA2@19
```

### 5. Gestion des sessions
- Nettoyage automatique des sessions expirees
- Deconnexion possible via le bouton dans le sidebar
- Invalidation immediate du token cote serveur lors de la deconnexion

## Structure des fichiers securite

```
lib/
  auth.ts           # Logique d'authentification (hash, sessions)
  api-auth.ts       # Helper pour proteger les API routes
  types.ts          # Types AdminUser et AdminSession

app/
  admin/
    login/
      page.tsx     # Page de connexion
    layout.tsx     # Layout avec bouton deconnexion
  api/
    auth/
      route.ts     # API login/logout/me

middleware.ts      # Protection des routes admin
```

## Flux d'authentification

1. **Login**:
   ```
   POST /api/auth (username, password)
   -> Verification du hash
   -> Creation session + token
   -> Set cookie HTTP-only
   -> Redirect /admin
   ```

2. **Verification**:
   ```
   Middleware: Check cookie admin_token
   API Route: validateSession(token)
   -> Return 401 si invalide
   ```

3. **Logout**:
   ```
   DELETE /api/auth
   -> Suppression session
   -> Clear cookie
   -> Redirect /admin/login
   ```

## Recommandations de production

1. **Base de donnees**: Remplacer le store in-memory par:
   - Redis pour les sessions
   - PostgreSQL pour les utilisateurs

2. **Mot de passe**: Utiliser bcrypt ou Argon2 au lieu de SHA-256

3. **HTTPS**: Forcer HTTPS en production

4. **Rate limiting**: Ajouter un rate limit sur /api/auth pour prevenir les attaques par force brute

5. **2FA**: Ajouter une authentification a deux facteurs pour plus de securite

6. **Logs**: Logger toutes les tentatives de connexion (reussies et echouees)

7. **IP Whitelist**: Restreindre l'acces admin a certaines IP si possible

## Tester la securite

1. Acceder a `/admin` sans etre connecte -> doit rediriger vers login
2. Essayer un mot de passe incorrect -> erreur "Identifiants invalides"
3. Se connecter avec les bons identifiants -> acces admin
4. Cliquer sur "Deconnexion" -> retour au login
5. Essayer d'acceder a une API admin sans cookie -> 401 Unauthorized
