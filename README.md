# Foundation Skills

Repository centralisé de skills pour les assistants IA de développement (GitHub Copilot, Claude, Cursor, Windsurf...).

Les skills sont des instructions et ressources que les agents IA chargent dynamiquement pour réaliser des tâches spécialisées de manière reproductible. Ils suivent le standard ouvert [Agent Skills](https://agentskills.io).

## Table des matières

- [Guide complet d'utilisation](#guide-complet-dutilisation)
- [Installation rapide](#installation-rapide)
- [Skills disponibles](#skills-disponibles)
- [Documentation par skill](#documentation-par-skill)
- [Ressources](#ressources)
- [Licence](#licence)
 rapide
## Guide complet d'utilisation

**[📖 Guide complet : Comment utiliser les Foundation Skills](docs/comment-utiliser.md)**

Guide détaillé couvrant :
- Installation globale, sélective et locale
- Utilisation avec GitHub Copilot, Claude, Cursor, Windsurf
- Exemples concrets par cas d'usage
- Astuces et bonnes pratiques
- Dépannage des problèmes courants

## Installation

```bash
npx add-skill Dedalus-ERP-PAS/foundation-skills -g -y
```

Options avancées :

```bash
# Skills spécifiques
npx add-skill Dedalus-ERP-PAS/foundation-skills --skill frontend-design --skill react-best-practices -g

# Agents spécifiques
npx add-skill Dedalus-ERP-PAS/foundation-skills -a cursor -a github-copilot -g -y

# Lister les skills
npx add-skill Dedalus-ERP-PAS/foundation-skills --list
```

## Skills disponibles

| Skill | Description |
|-------|-------------|
| **article-extractor** | Extraction de contenu d'articles web (blogs, tutoriels) en texte propre sans publicités ni navigation |
| **backend-patterns** | Patterns d'architecture backend : API design, optimisation DB, caching, auth, rate limiting pour Node.js/Express/Next.js |
| **changelog-generator** | Génère des changelogs à partir des commits git |
| **create-design-system-rules** | Génère des règles de design system pour les workflows Figma-to-code |
| **docx** | Création, édition et analyse de documents Word (.docx) |
| **frontend-design** | Interfaces frontend de qualité production |
| **github-issues** | Gestion des issues GitHub (création, mise à jour, recherche, commentaires) |
| **gitlab-code-review** | Revue de code complète des merge requests GitLab |
| **gitlab-issue** | Gestion des issues GitLab (création, mise à jour, listing) |
| **mcp-builder** | Création de serveurs MCP (Python/TypeScript) |
| **pdf** | Manipulation de PDF : extraction, création, fusion et formulaires |
| **playwright-skill** | Tests et automatisation web avec Playwright : gestion serveurs, tests dynamiques, reconnaissance DOM, screenshots |
| **postgres** | Requêtes SQL lecture seule sur PostgreSQL |
| **pptx** | Création, édition et analyse de présentations PowerPoint (.pptx) |
| **react-best-practices** | Guidelines performance React/Next.js |
| **security-review** | Audit de sécurité : gestion secrets, validation inputs, auth, OWASP Top 10 |
| **toxic-manager-translator** | Transforme les messages émotionnels en réponses professionnelles pour gérer les managers toxiques |
| **vue-best-practices** | Best practices Vue.js 3/Nuxt - Composition API, patterns et organisation |
| **web-design-guidelines** | Audit UI, accessibilité et UX |
| **xlsx** | Création, édition et analyse de fichiers Excel avec formules et formatage |

**Note :** La table ci-dessus liste les 19 skills disponibles. Pour les détails d'installation et d'utilisation, consultez le [guide complet](docs/comment-utiliser.md).

## Documentation par skill

| Skill | Documentation |
|-------|---------------|
| article-extractor | [docs/article-extractor.md](docs/article-extractor.md) |
| backend-patterns | [docs/backend-patterns.md](docs/backend-patterns.md) |
| changelog-generator | [docs/changelog-generator.md](docs/changelog-generator.md) |
| create-design-system-rules | [docs/create-design-system-rules.md](docs/create-design-system-rules.md) |
| docx | [docs/docx.md](docs/docx.md) |
| frontend-design | [docs/frontend-design.md](docs/frontend-design.md) |
| github-issues | [docs/github-issues.md](docs/github-issues.md) |
| gitlab-code-review | [docs/gitlab-code-review.md](docs/gitlab-code-review.md) |
| gitlab-issue | [docs/gitlab-issue.md](docs/gitlab-issue.md) |
| mcp-builder | [docs/mcp-builder.md](docs/mcp-builder.md) |
| pdf | [docs/pdf.md](docs/pdf.md) |
| playwright-skill | [docs/playwright-skill.md](docs/playwright-skill.md) |
| postgres | [docs/postgres.md](docs/postgres.md) |
| pptx | [docs/pptx.md](docs/pptx.md) |
| react-best-practices | [docs/react-best-practices.md](docs/react-best-practices.md) |
| security-review | [docs/security-review.md](docs/security-review.md) |
| toxic-manager-translator | [docs/toxic-manager-translator.md](docs/toxic-manager-translator.md) |
| vue-best-practices | [docs/vue-best-practices.md](docs/vue-best-practices.md) |
| web-design-guidelines | [docs/web-design-guidelines.md](docs/web-design-guidelines.md) |
| # Documentation générale

| Guide | Description |
|-------|-------------|
| [comment-utiliser.md](docs/comment-utiliser.md) | Guide complet d'utilisation des skills |
| [coding-standards.md](docs/coding-standards.md) | Standards de code universels |

## Ressources

- **[📖 Guide complet d'utilisation](docs/comment-utiliser.md)** - Documentation détaillée
## Ressources

- [Agent Skills](https://agentskills.io) - Standard ouvert pour les skills d'agents IA
- [add-skill CLI](https://github.com/vercel-labs/add-skill) - Outil d'installation des skills

## Licence

MIT
