# Foundation Skills

Repository centralisé de skills pour les assistants IA de développement (GitHub Copilot, Claude, Cursor, Windsurf...).

Les skills sont des instructions et ressources que les agents IA chargent dynamiquement pour réaliser des tâches spécialisées de manière reproductible. Ils suivent le standard ouvert [Agent Skills](https://agentskills.io).

## Table des matières

- [Installation](#installation)
- [Skills disponibles](#skills-disponibles)
- [Documentation](#documentation)
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
| **changelog-generator** | Génère des changelogs à partir des commits git |
| **create-design-system-rules** | Génère des règles de design system pour les workflows Figma-to-code |
| **docx** | Création, édition et analyse de documents Word (.docx) |
| **frontend-design** | Interfaces frontend de qualité production |
| **mcp-builder** | Création de serveurs MCP (Python/TypeScript) |
| **pdf** | Manipulation de PDF : extraction, création, fusion et formulaires |
| **playwright-skill** | Automatisation navigateur avec Playwright |
| **postgres** | Requêtes SQL lecture seule sur PostgreSQL |
| **pptx** | Création, édition et analyse de présentations PowerPoint (.pptx) |
| **react-best-practices** | Guidelines performance React/Next.js |
| **webapp-testing** | Tests d'applications web avec Playwright |
| **web-design-guidelines** | Audit UI, accessibilité et UX |
| **xlsx** | Création, édition et analyse de fichiers Excel avec formules et formatage |

## Documentation

| Document | Description |
|----------|-------------|
| [Guide d'utilisation](docs/usage.md) | Utilisation détaillée de chaque skill avec exemples |
| [Installation](docs/installation.md) | Guide d'installation complet |
| [Contribution](docs/contributing.md) | Comment contribuer au projet |
| [Référence des skills](docs/skills-reference.md) | Documentation technique des skills |

## Ressources

- [Agent Skills](https://agentskills.io) - Standard ouvert pour les skills d'agents IA
- [add-skill CLI](https://github.com/vercel-labs/add-skill) - Outil d'installation des skills

## Licence

MIT
