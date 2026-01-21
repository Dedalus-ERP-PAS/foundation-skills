# Foundation Skills

Un repository centralisé de Skills pour les assistants IA de développement. Ces skills étendent les capacités de GitHub Copilot, Claude, Cursor et autres agents IA supportant le standard [Agent Skills](https://agentskills.io).

## Qu'est-ce qu'un Agent Skill ?

Les skills sont des dossiers contenant des instructions, scripts et ressources que les agents IA chargent dynamiquement pour réaliser des tâches spécialisées. Ils enseignent aux assistants IA comment accomplir des tâches spécifiques de manière reproductible.

Les skills suivent la spécification ouverte [Agent Skills](https://agentskills.io), ce qui signifie qu'ils fonctionnent sur plusieurs plateformes :
- GitHub Copilot (VS Code, CLI, coding agent)
- Claude Code
- Claude.ai
- Cursor
- Windsurf
- Et plus de 10 autres agents

## Skills disponibles

| Skill | Description |
|-------|-------------|
| **frontend-design** | Création d'interfaces frontend distinctives et de qualité production |
| **webapp-testing** | Toolkit de tests d'applications web avec Playwright |
| **postgres** | Exécution de requêtes SQL en lecture seule sur PostgreSQL |
| **changelog-generator** | Transformation des commits git en changelogs user-friendly |
| **mcp-builder** | Guide de création de serveurs MCP (Model Context Protocol) |
| **playwright-skill** | Automatisation complète de navigateur avec Playwright |
| **react-best-practices** | Guidelines d'optimisation React et Next.js |
| **web-design-guidelines** | Audit de code UI selon les best practices web |

## Installation

### Via add-skill (Recommandé)

Installez les skills sur n'importe quel agent supporté avec [add-skill](https://github.com/vercel-labs/add-skill) :

```bash
# Installer tous les skills globalement
npx add-skill foundation/foundation-skills -g -y

# Installer des skills spécifiques
npx add-skill foundation/foundation-skills --skill frontend-design --skill react-best-practices -g

# Installer pour des agents spécifiques
npx add-skill foundation/foundation-skills -a cursor -a github-copilot -g -y

# Lister les skills disponibles
npx add-skill foundation/foundation-skills --list
```

### Installation manuelle

Copiez les dossiers de skills vers l'emplacement approprié pour votre agent :

| Agent | Chemin projet | Chemin global |
|-------|---------------|---------------|
| GitHub Copilot | `.github/skills/` | `~/.copilot/skills/` |
| Claude Code | `.claude/skills/` | `~/.claude/skills/` |
| Cursor | `.cursor/skills/` | `~/.cursor/skills/` |

## Structure d'un skill

Chaque skill suit cette structure :

```
skill-name/
├── SKILL.md           # Obligatoire : Instructions et métadonnées
├── scripts/           # Optionnel : Scripts exécutables
├── examples/          # Optionnel : Exemples d'utilisation
└── reference/         # Optionnel : Documentation additionnelle
```

### Format du SKILL.md

```markdown
---
name: skill-name
description: Description claire de ce que fait le skill et quand l'utiliser.
---

# Titre du Skill

Instructions que l'IA doit suivre quand ce skill est actif...
```

## Utilisation

Une fois installés, les skills s'activent automatiquement selon vos prompts. Par exemple :

- "Crée un composant React" → Active `react-best-practices`
- "Teste cette page web" → Active `webapp-testing` ou `playwright-skill`
- "Requête la base de données" → Active `postgres`
- "Crée un changelog" → Active `changelog-generator`
- "Build un serveur MCP" → Active `mcp-builder`

## Contribuer

Pour ajouter ou modifier des skills :

1. Créez un nouveau dossier dans `skills/` avec le nom du skill
2. Ajoutez un fichier `SKILL.md` avec le frontmatter YAML (`name` et `description` obligatoires)
3. Ajoutez les scripts, exemples ou références nécessaires
4. Soumettez une merge request

Voir [docs/contributing.md](docs/contributing.md) pour le guide complet.

## Mise à jour des skills

Pour obtenir les dernières versions :

```bash
# Relancer add-skill pour mettre à jour
npx add-skill foundation/foundation-skills -g -y
```

## Documentation

- [Guide d'installation](docs/installation.md)
- [Guide de contribution](docs/contributing.md)
- [Référence des skills](docs/skills-reference.md)

## Ressources externes

- [Spécification Agent Skills](https://agentskills.io)
- [Repository Skills Anthropic](https://github.com/anthropics/skills)
- [Vercel Agent Skills](https://github.com/vercel-labs/agent-skills)
- [CLI add-skill](https://github.com/vercel-labs/add-skill)
- [Documentation VS Code Agent Skills](https://code.visualstudio.com/docs/copilot/customization/agent-skills)

## Licence

MIT
