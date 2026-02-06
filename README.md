# Foundation Skills

Repository centralisé de skills pour les assistants IA de développement (GitHub Copilot, Claude, Cursor, Windsurf...) destiné aux équipes de développement ERP-PAS.

Les skills sont des instructions et ressources que les agents IA chargent dynamiquement pour réaliser des tâches spécialisées de manière reproductible. Ils suivent le standard ouvert [Agent Skills](https://agentskills.io).

## Prérequis

### VSCode

Pour utiliser les skills dans VSCode, vous devez activer l'option **"Use Agent skills"** dans les paramètres :

1. Ouvrez les paramètres VSCode (`Ctrl+,` ou `Cmd+,`)
2. Recherchez "Use Agent skills"
3. Cochez l'option pour activer les skills

Sans cette activation, les skills ne seront pas chargés par l'agent GitHub Copilot.

## Installation et mise à jour

Pour installer ou mettre à jour les skills vers la dernière version :

```bash
npx add-skill Dedalus-ERP-PAS/foundation-skills -g -y
```

## Skills disponibles

### Skills de développement

| Skill | Description | How to use |
|-------|-------------|------------|
| **backend-patterns** | Patterns d'architecture backend : API RESTful, repository pattern, optimisation DB, caching, authentification et rate limiting pour Node.js/Express/Next.js | [backend-patterns.md](docs/backend-patterns.md) |
| **changelog-generator** | Génère automatiquement des changelogs conviviaux à partir de l'historique git en catégorisant les changements (features, fixes, breaking changes) | [changelog-generator.md](docs/changelog-generator.md) |
| **coding-standards** | Standards de code universels : conventions de nommage, principes SOLID, patterns TypeScript/JavaScript et règles de qualité | [coding-standards.md](docs/coding-standards.md) |
| **create-design-system-rules** | Génère des règles de design system personnalisées pour automatiser les workflows Figma-to-code avec conventions et patterns cohérents | [create-design-system-rules.md](docs/create-design-system-rules.md) |
| **frontend-design** | Création d'interfaces frontend de qualité production avec direction esthétique audacieuse, évitant les designs génériques AI | [frontend-design.md](docs/frontend-design.md) |
| **github-issues** | Gestion complète des issues GitHub : création avec contexte, recherche, mise à jour, commentaires et workflows structurés | [github-issues.md](docs/github-issues.md) |
| **hl7-pam-parser** | Parse et explique les messages HL7 v2.5 IHE PAM (Patient Administration Management) : segments MSH/EVN/PID/PV1, validation structure, ADT events | [hl7-pam-parser.md](docs/hl7-pam-parser.md) |
| **hpk-parser** | Parse et explique les messages HPK (format propriétaire santé français) : identité/mouvements/couverture avec validation et explications détaillées | [hpk-parser.md](docs/hpk-parser.md) |
| **gitlab-code-review** | Revue de code approfondie des merge requests GitLab : analyse qualité, sécurité, performance et best practices avec feedback constructif | [gitlab-code-review.md](docs/gitlab-code-review.md) |
| **gitlab-issue** | Gestion des issues GitLab pour instances auto-hébergées : création, mise à jour, recherche et liaison avec merge requests | [gitlab-issue.md](docs/gitlab-issue.md) |
| **mcp-builder** | Guide complet pour créer des serveurs MCP (Model Context Protocol) de qualité en Python (FastMCP) ou TypeScript (MCP SDK) | [mcp-builder.md](docs/mcp-builder.md) |
| **playwright-skill** | Tests et automatisation web avec Playwright : gestion serveurs, reconnaissance DOM dynamique, screenshots, validation UX et tests responsifs | [playwright-skill.md](docs/playwright-skill.md) |
| **postgres** | Exécution sécurisée de requêtes SQL lecture seule sur PostgreSQL avec support multi-bases et sélection intelligente | [postgres.md](docs/postgres.md) |
| **react-best-practices** | Guide complet React/Next.js : architecture composants, optimisation performance, patterns shadcn/ui, animations Motion et React 19+ | [react-best-practices.md](docs/react-best-practices.md) |
| **security-review** | Audit de sécurité approfondi : gestion secrets, validation inputs, authentification, protection OWASP Top 10 et bonnes pratiques | [security-review.md](docs/security-review.md) |
| **vue-best-practices** | Best practices Vue.js 3/Nuxt : Composition API, design composants, patterns réactivité, intégration Tailwind CSS et PrimeVue | [vue-best-practices.md](docs/vue-best-practices.md) |
| **web-design-guidelines** | Audit complet UI/UX avec inspection visuelle : conformité Web Interface Guidelines, accessibilité et corrections automatiques | [web-design-guidelines.md](docs/web-design-guidelines.md) |

### Skills de traitement de contenu et documents

| Skill | Description | How to use |
|-------|-------------|------------|
| **article-extractor** | Extrait le contenu principal d'articles web (blogs, tutoriels) en texte propre, éliminant publicités, navigation et éléments superflus | [article-extractor.md](docs/article-extractor.md) |
| **docx** | Création, édition et analyse complètes de documents Word (.docx) : tracked changes, commentaires, formatage et extraction de texte | [docx.md](docs/docx.md) |
| **pdf** | Manipulation complète de PDF : extraction de texte/tables, création, fusion/division, remplissage de formulaires avec Python | [pdf.md](docs/pdf.md) |
| **pptx** | Création, édition et analyse de présentations PowerPoint (.pptx) : layouts, animations, speaker notes et conversion HTML-to-PPTX | [pptx.md](docs/pptx.md) |
| **readme** | Génère ou met à jour un README.md en français orienté Product Owner avec diagrammes Mermaid, et génère CLAUDE.md/AGENT.md si absents | [readme.md](docs/readme.md) |
| **toxic-manager-translator** | 🎭 Transforme les messages émotionnels ou frustrés en réponses professionnelles et stratégiques pour gérer les situations difficiles au travail | [toxic-manager-translator.md](docs/toxic-manager-translator.md) |
| **xlsx** | Création, édition et analyse de fichiers Excel (.xlsx) : formules complexes, formatage professionnel, visualisation et recalcul | [xlsx.md](docs/xlsx.md) |

## Ressources

- **[📖 Guide complet d'utilisation](docs/comment-utiliser.md)** - Documentation détaillée
- [Agent Skills](https://agentskills.io) - Standard ouvert pour les skills d'agents IA
- [add-skill CLI](https://github.com/vercel-labs/add-skill) - Outil d'installation des skills

## Licence

MIT
