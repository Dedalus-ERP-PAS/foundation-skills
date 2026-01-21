# Référence des Skills

Documentation détaillée de chaque skill disponible dans le repository.

---

## frontend-design

**Description :** Création d'interfaces frontend distinctives et de qualité production.

**Déclencheurs :**
- "Crée un composant React"
- "Design une landing page"
- "Améliore le style de ce composant"
- "Crée un dashboard"

**Ce que fait ce skill :**
- Guide la création d'interfaces visuellement distinctives
- Évite les patterns génériques "AI slop"
- Propose des directions esthétiques audacieuses
- Inclut des guidelines pour typographie, couleurs, animations

**Exemple d'utilisation :**
```
Crée une page de login avec un design brutaliste moderne
```

---

## webapp-testing

**Description :** Tests d'applications web avec Playwright.

**Déclencheurs :**
- "Teste cette page web"
- "Vérifie le formulaire de login"
- "Prends une capture d'écran"
- "Teste le responsive"

**Ce que fait ce skill :**
- Fournit des patterns Playwright pour l'automatisation
- Inclut un script `with_server.py` pour gérer les serveurs de dev
- Guide l'approche "reconnaissance puis action"

**Scripts disponibles :**
```bash
# Démarrer un serveur et exécuter un test
python scripts/with_server.py --server "npm run dev" --port 5173 -- python mon_test.py
```

**Exemples inclus :**
- `console_logging.py` - Capture des logs console
- `element_discovery.py` - Découverte d'éléments sur une page
- `static_html_automation.py` - Automatisation de fichiers HTML locaux

---

## postgres

**Description :** Requêtes SQL en lecture seule sur PostgreSQL.

**Déclencheurs :**
- "Requête la base de données"
- "Montre les tables"
- "Sélectionne les utilisateurs"
- "Explore le schéma"

**Ce que fait ce skill :**
- Exécute des requêtes SELECT uniquement (sécurité)
- Supporte plusieurs bases de données configurées
- Bloque les opérations d'écriture

**Configuration requise :**

Créez `~/.config/claude/postgres-connections.json` :
```json
{
  "databases": [
    {
      "name": "production",
      "description": "Base principale - utilisateurs, commandes",
      "host": "db.example.com",
      "port": 5432,
      "database": "app_prod",
      "user": "readonly_user",
      "password": "votre-mot-de-passe",
      "sslmode": "require"
    }
  ]
}
```

**Commandes :**
```bash
# Lister les bases configurées
python scripts/query.py --list

# Lister les tables
python scripts/query.py --db production --tables

# Exécuter une requête
python scripts/query.py --db production --query "SELECT * FROM users LIMIT 10"
```

---

## changelog-generator

**Description :** Génération de changelogs à partir de l'historique git.

**Déclencheurs :**
- "Crée un changelog"
- "Génère les release notes"
- "Résume les commits de la semaine"
- "Notes de version pour v2.0"

**Ce que fait ce skill :**
- Analyse l'historique git
- Catégorise les commits (features, fixes, etc.)
- Transforme le jargon technique en langage utilisateur
- Formate en markdown propre

**Exemple d'utilisation :**
```
Crée un changelog pour les commits depuis le tag v1.5.0
```

**Sortie exemple :**
```markdown
# Updates - v1.6.0

## ✨ Nouvelles fonctionnalités
- **Workspaces d'équipe** : Créez des espaces séparés pour vos projets

## 🔧 Améliorations
- **Sync plus rapide** : Synchronisation 2x plus rapide

## 🐛 Corrections
- Correction du bug d'upload d'images
```

---

## mcp-builder

**Description :** Guide de création de serveurs MCP (Model Context Protocol).

**Déclencheurs :**
- "Crée un serveur MCP"
- "Intègre cette API avec MCP"
- "Build un MCP pour Slack"

**Ce que fait ce skill :**
- Guide les 4 phases de développement MCP
- Fournit des patterns TypeScript et Python
- Inclut des best practices et checklists

**Documentation de référence :**
- `reference/mcp_best_practices.md` - Guidelines universelles
- `reference/node_mcp_server.md` - Guide TypeScript
- `reference/python_mcp_server.md` - Guide Python
- `reference/evaluation.md` - Création d'évaluations

---

## playwright-skill

**Description :** Automatisation complète de navigateur avec Playwright.

**Déclencheurs :**
- "Automatise ce site"
- "Test end-to-end"
- "Remplis ce formulaire"
- "Vérifie les liens cassés"

**Ce que fait ce skill :**
- Patterns Playwright JavaScript complets
- Détection automatique des serveurs de dev
- Scripts dans `/tmp` (pas de pollution du projet)

**Patterns inclus :**
- Test responsive (desktop, tablet, mobile)
- Login flows
- Formulaires
- Vérification de liens
- Screenshots

---

## react-best-practices

**Description :** Guidelines d'optimisation React/Next.js de Vercel Engineering.

**Déclencheurs :**
- "Optimise ce composant React"
- "Review le code React"
- "Améliore les performances"
- "Refacto ce composant Next.js"

**Ce que fait ce skill :**
- 45+ règles d'optimisation classées par impact
- Patterns pour éliminer les waterfalls
- Optimisation de la taille des bundles
- Memo, lazy loading, parallel fetching

**Catégories de règles :**

| Priorité | Catégorie | Impact |
|----------|-----------|--------|
| 1 | Éliminer les waterfalls | CRITICAL |
| 2 | Optimisation bundle | CRITICAL |
| 3 | Performance serveur | HIGH |
| 4 | Data fetching client | MEDIUM-HIGH |
| 5 | Re-render optimization | MEDIUM |

---

## web-design-guidelines

**Description :** Audit de code UI selon les Web Interface Guidelines.

**Déclencheurs :**
- "Review mon UI"
- "Vérifie l'accessibilité"
- "Audit le design"
- "Check les best practices UX"

**Ce que fait ce skill :**
- Fetch les dernières guidelines depuis le repo Vercel
- Vérifie 100+ règles (accessibilité, performance, UX)
- Output au format `file:line`

**Catégories vérifiées :**
- Accessibilité (aria-labels, HTML sémantique, keyboard)
- Focus states
- Formulaires
- Animations
- Typographie
- Images
- Performance
- Dark mode
- Touch/mobile
- i18n

---

## Tableau récapitulatif

| Skill | Type | Scripts | Cas d'usage principal |
|-------|------|---------|----------------------|
| frontend-design | Guidelines | Non | Création d'interfaces |
| webapp-testing | Toolkit | Oui | Tests Playwright |
| postgres | Toolkit | Oui | Requêtes SQL |
| changelog-generator | Guidelines | Non | Release notes |
| mcp-builder | Reference | Non | Développement MCP |
| playwright-skill | Guidelines | Non | Automatisation browser |
| react-best-practices | Guidelines | Non | Optimisation React |
| web-design-guidelines | Guidelines | Non | Audit UI/UX |
