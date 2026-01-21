# Foundation Skills

Repository centralisé de skills pour les assistants IA de développement (GitHub Copilot, Claude, Cursor, Windsurf...).

Les skills sont des instructions et ressources que les agents IA chargent dynamiquement pour réaliser des tâches spécialisées de manière reproductible. Ils suivent le standard ouvert [Agent Skills](https://agentskills.io).

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
| **docx** | Création, édition et analyse de documents Word (.docx) |
| **frontend-design** | Interfaces frontend de qualité production |
| **mcp-builder** | Création de serveurs MCP (Python/TypeScript) |
| **playwright-skill** | Automatisation navigateur avec Playwright |
| **postgres** | Requêtes SQL lecture seule sur PostgreSQL |
| **react-best-practices** | Guidelines performance React/Next.js |
| **webapp-testing** | Tests d'applications web avec Playwright |
| **web-design-guidelines** | Audit UI, accessibilité et UX |

## Documentation

- [Installation](docs/installation.md)
- [Contribution](docs/contributing.md)
- [Référence des skills](docs/skills-reference.md)

## Ressources

- [Agent Skills](https://agentskills.io)
- [add-skill CLI](https://github.com/vercel-labs/add-skill)

## Licence

MIT
