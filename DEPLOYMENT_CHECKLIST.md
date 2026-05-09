## Checklist de Déploiement - ESMA GLOBAL SERVICE

### Phase 1: Préparation (avant tout)

- [ ] Lire `MIGRATION_SUMMARY.md`
- [ ] Sauvegarder les données du store in-memory si nécessaire
- [ ] Vérifier que Supabase est accessible
- [ ] Vérifier tous les env vars sont configurés

### Phase 2: Migration Base de Données

- [ ] Exécuter migration Supabase:
  ```bash
  cd /vercel/share/v0-project
  supabase db push
  ```

- [ ] Vérifier les tables dans Supabase:
  - [ ] `contact_messages` créée
  - [ ] `bookings` créée
  - [ ] `notifications` créée
  - [ ] `site_settings` créée
  - [ ] Indexes créés
  - [ ] RLS activé

- [ ] Vérifier les données initiales:
  - [ ] Site settings par défaut insérés
  - [ ] Premier message de test possible

### Phase 3: Code et Configuration

- [ ] Vérifier les credentials:
  - [ ] `ADMIN_EMAIL=esmaglobaleservices@gmail.com`
  - [ ] `ADMIN_PASSWORD=jojoA2@19` (ou custom)

- [ ] Vérifier Supabase URL et clés:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL` défini
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` défini
  - [ ] `SUPABASE_SERVICE_ROLE_KEY` défini

- [ ] Vérifier Redis/Upstash:
  - [ ] `KV_REST_API_URL` défini
  - [ ] `KV_REST_API_TOKEN` défini

- [ ] Installer les dépendances:
  ```bash
  pnpm install
  ```

- [ ] Vérifier la compilation:
  ```bash
  pnpm build
  ```

### Phase 4: Tests Locaux

- [ ] Démarrer le serveur local:
  ```bash
  pnpm dev
  ```

- [ ] Tester la page de connexion:
  - [ ] Aller à `http://localhost:3000/admin/login`
  - [ ] Essayer connexion avec mauvais credentials → Erreur affichée
  - [ ] Connexion avec credentials corrects → Redirection `/admin`
  - [ ] Cookie `esma_admin_session` créé
  - [ ] Accessible dans Application/Cookies

- [ ] Tester le formulaire de contact:
  - [ ] Aller à `http://localhost:3000/contact`
  - [ ] Remplir et soumettre le formulaire
  - [ ] Vérifier le message dans Supabase `contact_messages`

- [ ] Tester la réservation:
  - [ ] Aller à `http://localhost:3000/services/nettoyage`
  - [ ] Remplir et soumettre une réservation
  - [ ] Vérifier dans Supabase `bookings`

- [ ] Tester le panneau admin:
  - [ ] Aller à `http://localhost:3000/admin`
  - [ ] Vérifier que les messages s'affichent
  - [ ] Vérifier que les réservations s'affichent
  - [ ] Vérifier les notifications

- [ ] Tester la déconnexion:
  - [ ] Cliquer sur "Déconnexion" dans la sidebar
  - [ ] Redirection vers `/admin/login`
  - [ ] Cookie supprimé

### Phase 5: Vérifications de Sécurité

- [ ] Vérifier les headers de sécurité:
  ```bash
  curl -I http://localhost:3000
  ```
  - [ ] `X-Frame-Options: SAMEORIGIN`
  - [ ] `X-Content-Type-Options: nosniff`
  - [ ] `X-XSS-Protection: 1; mode=block`

- [ ] Vérifier rate limiting:
  - [ ] Envoyer 5+ messages rapidement
  - [ ] 6ème devrait recevoir 429 (Too Many Requests)

- [ ] Vérifier sanitization XSS:
  - [ ] Essayer `<script>alert('xss')</script>` dans le formulaire
  - [ ] Devrait être encodé dans la DB
  - [ ] Pas d'exécution du script

- [ ] Vérifier brute force protection:
  - [ ] 5 mauvaises tentatives de login
  - [ ] 6ème devrait être bloquée 15 min

### Phase 6: Performance et Logs

- [ ] Vérifier DevTools:
  - [ ] Pas d'erreurs 404
  - [ ] Pas d'erreurs 500
  - [ ] Console sans erreurs

- [ ] Vérifier les logs Supabase:
  - [ ] Pas d'erreurs de query
  - [ ] Performance acceptable
  - [ ] Connections stables

- [ ] Tester sur mobile:
  - [ ] `/admin` sidebar fonctionne
  - [ ] Menu mobile s'affiche
  - [ ] Login responsive

### Phase 7: Images et Branding

- [ ] Vérifier images nettoyage:
  - [ ] `public/images/cleaning.jpg` - Personne noire visible
  - [ ] `public/images/cleaning-detail.jpg` - Détail visible
  - [ ] Pas d'erreur 404

- [ ] Vérifier branding:
  - [ ] "ESMA GLOBAL SERVICE" partout
  - [ ] Pas de "MK GLOBAL SERVICE"
  - [ ] Palette de couleurs correcte

- [ ] Vérifier coordonnées:
  - [ ] Email: `esmaglobaleservices@gmail.com`
  - [ ] WhatsApp link fonctionne

### Phase 8: Production Readiness

- [ ] Vérifier NODE_ENV:
  - [ ] `NODE_ENV=production` en prod
  - [ ] Cookies `secure: true`
  - [ ] Logs minimisés

- [ ] Backup Supabase:
  - [ ] Backup automatique configuré
  - [ ] Rétention suffisante

- [ ] Monitoring:
  - [ ] Sentry configuré (si utilisé)
  - [ ] Logs centralisés (si utilisé)

- [ ] Documentation mise à jour:
  - [ ] Tous les .md files à jour
  - [ ] README reflète nouvelle architecture
  - [ ] MIGRATION_SUMMARY.md complete

### Phase 9: Déploiement

- [ ] Review final du code:
  ```bash
  git status
  ```

- [ ] Vérifier aucun secret exposé:
  - [ ] Pas de credentials en dur
  - [ ] Pas de API keys en clair
  - [ ] Env vars utilisées partout

- [ ] Commit et push:
  ```bash
  git add -A
  git commit -m "feat: migrate to Supabase and rebrand to ESMA"
  git push origin main
  ```

- [ ] Déploiement Vercel:
  - [ ] Trigger build
  - [ ] Vérifier build logs
  - [ ] Vérifier aucune erreur

- [ ] Vérifier sur production:
  - [ ] Site accessible
  - [ ] Login fonctionne
  - [ ] Formulaires fonctionnent
  - [ ] Admin dashboard fonctionne

### Phase 10: Post-Déploiement

- [ ] Monitorer les erreurs 24h:
  - [ ] Pas d'erreurs 500
  - [ ] Performance acceptable
  - [ ] Rate limiting fonctionne

- [ ] Vérifier les logs:
  - [ ] Supabase: queries normales
  - [ ] Vercel: pas d'erreurs
  - [ ] Sentry: pas de crashes (si utilisé)

- [ ] Notifier l'équipe:
  - [ ] ESMA rebrand completé
  - [ ] Supabase migré
  - [ ] Images mises à jour
  - [ ] Authentification OK

- [ ] Clôturer les issues:
  - [ ] Ajouter commentaire "Done"
  - [ ] Fermer les PRs

### Rollback Plan (si problème)

Si des issues critiques:

1. **Database issue:**
   ```bash
   # Restaurer à partir du backup Supabase
   supabase db reset
   supabase db push # Remettre schema
   ```

2. **Auth issue:**
   - Vérifier env vars
   - Vérifier credentials dans auth.ts
   - Vérifier session dans Redis

3. **Deployment issue:**
   - Reverter dernier commit:
     ```bash
     git revert HEAD
     git push
     ```
   - Vercel redéploiera automatiquement

### Checklist de Sécurité Finale

- [ ] Credentials NOT en dur ✅
- [ ] Env vars utilisés ✅
- [ ] HTTPS forcé en prod ✅
- [ ] Cookies secure ✅
- [ ] XSS protection ✅
- [ ] Rate limiting ✅
- [ ] Brute force protection ✅
- [ ] Headers sécurité ✅
- [ ] RLS Supabase ✅
- [ ] Pas de debug logs ✅

---

**À Faire Maintenant:**
1. [ ] Exécuter la migration Supabase (`supabase db push`)
2. [ ] Tester localement completement
3. [ ] Déployer sur staging
4. [ ] Tester sur staging
5. [ ] Déployer en production

**Durée Estimée:** 2-3 heures (incluant tests)
**Responsable:** DevOps / Tech Lead
**Date Cible:** Aujourd'hui ou demain
