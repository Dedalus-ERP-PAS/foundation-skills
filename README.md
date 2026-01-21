# Foundation Skills

Repository centralisé de skills pour les assistants IA de développement (GitHub Copilot, Claude, Cursor, Windsurf...).

Les skills sont des instructions et ressources que les agents IA chargent dynamiquement pour réaliser des tâches spécialisées de manière reproductible. Ils suivent le standard ouvert [Agent Skills](https://agentskills.io).

## Table des matières

- [Installation](#installation)
- [Skills disponibles](#skills-disponibles)
- [Guide d'utilisation](#guide-dutilisation)
- [Ressources](#ressources)
- [Licence](#licence)

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
| **changelog-generator** | Génère des changelogs à partir des commits git |
| **create-design-system-rules** | Génère des règles de design system pour les workflows Figma-to-code |
| **docx** | Création, édition et analyse de documents Word (.docx) |
| **frontend-design** | Interfaces frontend de qualité production |
| **gitlab-code-review** | Revue de code complète des merge requests GitLab |
| **gitlab-issue** | Gestion des issues GitLab (création, mise à jour, listing) |
| **mcp-builder** | Création de serveurs MCP (Python/TypeScript) |
| **pdf** | Manipulation de PDF : extraction, création, fusion et formulaires |
| **playwright-skill** | Automatisation navigateur avec Playwright |
| **postgres** | Requêtes SQL lecture seule sur PostgreSQL |
| **pptx** | Création, édition et analyse de présentations PowerPoint (.pptx) |
| **react-best-practices** | Guidelines performance React/Next.js |
| **vue-best-practices** | Guidelines performance Vue.js 3/Nuxt |
| **webapp-testing** | Tests d'applications web avec Playwright |
| **web-design-guidelines** | Audit UI, accessibilité et UX |
| **xlsx** | Création, édition et analyse de fichiers Excel avec formules et formatage |

## Guide d'utilisation

| Skill | Documentation |
|-------|---------------|
| article-extractor | [docs/article-extractor.md](docs/article-extractor.md) |
| changelog-generator | [docs/changelog-generator.md](docs/changelog-generator.md) |
| create-design-system-rules | [docs/create-design-system-rules.md](docs/create-design-system-rules.md) |
| docx | [docs/docx.md](docs/docx.md) |
| frontend-design | [docs/frontend-design.md](docs/frontend-design.md) |
| gitlab-code-review | [docs/gitlab-code-review.md](docs/gitlab-code-review.md) |
| gitlab-issue | [docs/gitlab-issue.md](docs/gitlab-issue.md) |
| mcp-builder | [docs/mcp-builder.md](docs/mcp-builder.md) |
| pdf | [docs/pdf.md](docs/pdf.md) |
| playwright-skill | [docs/playwright-skill.md](docs/playwright-skill.md) |
| postgres | [docs/postgres.md](docs/postgres.md) |
| pptx | [docs/pptx.md](docs/pptx.md) |
| react-best-practices | [docs/react-best-practices.md](docs/react-best-practices.md) |
| vue-best-practices | [docs/vue-best-practices.md](docs/vue-best-practices.md) |
| webapp-testing | [docs/webapp-testing.md](docs/webapp-testing.md) |
| web-design-guidelines | [docs/web-design-guidelines.md](docs/web-design-guidelines.md) |
| xlsx | [docs/xlsx.md](docs/xlsx.md) |

## Ressources

- [Agent Skills](https://agentskills.io) - Standard ouvert pour les skills d'agents IA
- [add-skill CLI](https://github.com/vercel-labs/add-skill) - Outil d'installation des skills

## Licence

MIT
