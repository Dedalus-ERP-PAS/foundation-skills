# Documentation Foundation Skills

Index de toute la documentation disponible pour les Foundation Skills.

## 📚 Guides généraux

| Document | Description |
|----------|-------------|
| [comment-utiliser.md](comment-utiliser.md) | **Guide complet** - Installation, utilisation avec différents agents, exemples, dépannage |
| [coding-standards.md](coding-standards.md) | Standards de code universels pour TypeScript/JavaScript |

## 🎯 Documentation par skill

### Backend & APIs

| Skill | Documentation |
|-------|---------------|
| [backend-patterns](backend-patterns.md) | Patterns d'architecture backend, API design, DB, caching, auth |
| [postgres](postgres.md) | Requêtes SQL lecture seule sur PostgreSQL |

### Frontend

| Skill | Documentation |
|-------|---------------|
| [react-best-practices](react-best-practices.md) | Guidelines performance React/Next.js |
| [vue-best-practices](vue-best-practices.md) | Best practices Vue.js 3/Nuxt |
| [frontend-design](frontend-design.md) | Interfaces frontend de qualité production |
| [web-design-guidelines](web-design-guidelines.md) | Audit UI, accessibilité et UX |

### Sécurité & Qualité

| Skill | Documentation |
|-------|---------------|
| [security-review](security-review.md) | Audit de sécurité et OWASP Top 10 |
| [coding-standards](coding-standards.md) | Standards de code |

### Automatisation & Tests

| Skill | Documentation |
|-------|---------------|
| [playwright-skill](playwright-skill.md) | Automatisation navigateur avec Playwright |
| [webapp-testing](webapp-testing.md) | Tests d'applications web |

### Documents Office

| Skill | Documentation |
|-------|---------------|
| [docx](docx.md) | Documents Word (.docx) |
| [pptx](pptx.md) | Présentations PowerPoint (.pptx) |
| [xlsx](xlsx.md) | Fichiers Excel avec formules |
| [pdf](pdf.md) | Manipulation de PDF |

### Gestion de projet

| Skill | Documentation |
|-------|---------------|
| [github-issues](github-issues.md) | Gestion des issues GitHub |
| [gitlab-issue](gitlab-issue.md) | Gestion des issues GitLab |
| [gitlab-code-review](gitlab-code-review.md) | Code review GitLab |
| [changelog-generator](changelog-generator.md) | Génération de changelogs |

### Outils spécialisés

| Skill | Documentation |
|-------|---------------|
| [mcp-builder](mcp-builder.md) | Création de serveurs MCP |
| [article-extractor](article-extractor.md) | Extraction d'articles web |
| [create-design-system-rules](create-design-system-rules.md) | Génération de règles de design system |
| [toxic-manager-translator](toxic-manager-translator.md) | Communication professionnelle |

## 🚀 Démarrage rapide

### 1. Installation

```bash
# Tous les skills
npx add-skill Dedalus-ERP-PAS/foundation-skills -g -y

# Skill spécifique
npx add-skill Dedalus-ERP-PAS/foundation-skills --skill backend-patterns -g -y
```

### 2. Utilisation de base

```
# Dans GitHub Copilot, Claude, Cursor ou Windsurf
@workspace avec backend-patterns, crée une API REST pour les users
```

### 3. Consulter le guide complet

[📖 Guide complet d'utilisation](comment-utiliser.md)

## 📊 Skills par cas d'usage

### Développement Backend
- backend-patterns
- postgres
- security-review
- coding-standards

### Développement Frontend
- react-best-practices / vue-best-practices
- frontend-design
- web-design-guidelines

### Fullstack
- backend-patterns
- react-best-practices
- security-review
- postgres

### Automatisation
- playwright-skill
- webapp-testing

### Documentation
- docx
- pptx
- xlsx
- pdf

### DevOps & Gestion
- github-issues / gitlab-issue
- gitlab-code-review
- changelog-generator

## 🔍 Recherche par technologie

### Node.js / Express / Next.js
- backend-patterns
- coding-standards
- security-review

### React / Next.js
- react-best-practices
- frontend-design
- web-design-guidelines

### Vue.js / Nuxt
- vue-best-practices
- frontend-design
- web-design-guidelines

### PostgreSQL
- postgres
- backend-patterns (transactions, optimization)

### TypeScript / JavaScript
- coding-standards
- backend-patterns
- react-best-practices

### Python
- postgres (scripts)
- playwright-skill
- webapp-testing
- xlsx (recalc)

## 📖 Patterns courants

### Créer une API complète

Skills à utiliser :
1. backend-patterns - Architecture et patterns
2. security-review - Sécurité
3. postgres - Base de données
4. coding-standards - Qualité du code

### Créer une application web

Skills à utiliser :
1. react-best-practices ou vue-best-practices
2. frontend-design - UI/UX
3. backend-patterns - API
4. security-review - Sécurité
5. webapp-testing - Tests

### Automatiser des tâches

Skills à utiliser :
1. playwright-skill - Automatisation navigateur
2. webapp-testing - Tests
3. docx/xlsx/pdf - Génération de rapports

### Gestion de projet

Skills à utiliser :
1. github-issues ou gitlab-issue
2. gitlab-code-review
3. changelog-generator

## 💡 Bonnes pratiques

1. **Mentionner explicitement le skill** dans vos prompts
2. **Combiner plusieurs skills** pour des tâches complexes
3. **Commencer simple** puis itérer
4. **Consulter la doc** du skill avant utilisation
5. **Utiliser le guide complet** pour l'installation et le dépannage

## 🆘 Support

- Issues : [foundation-skills/issues](https://github.com/Dedalus-ERP-PAS/foundation-skills/issues)
- Guide : [comment-utiliser.md](comment-utiliser.md)
- Standard : [agentskills.io](https://agentskills.io)

## 📝 Licence

MIT
