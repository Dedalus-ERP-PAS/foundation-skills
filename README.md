# Foundation Skills

Repository centralisé de skills pour les assistants IA de développement (GitHub Copilot, Claude, Cursor, Windsurf...).

Les skills sont des instructions et ressources que les agents IA chargent dynamiquement pour réaliser des tâches spécialisées de manière reproductible. Ils suivent le standard ouvert [Agent Skills](https://agentskills.io).

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

| Skill | Description | How to use |
|-------|-------------|------------|
| **article-extractor** | Extrait le contenu principal d'articles web (blogs, tutoriels) en texte propre, éliminant publicités, navigation et éléments superflus | [docs/article-extractor.md](docs/article-extractor.md) |
| **backend-patterns** | Patterns d'architecture backend : API RESTful, repository pattern, optimisation DB, caching, authentification et rate limiting pour Node.js/Express/Next.js | [docs/backend-patterns.md](docs/backend-patterns.md) |
| **changelog-generator** | Génère automatiquement des changelogs conviviaux à partir de l'historique git en catégorisant les changements (features, fixes, breaking changes) | [docs/changelog-generator.md](docs/changelog-generator.md) |
| **coding-standards** | Standards de code universels : conventions de nommage, principes SOLID, patterns TypeScript/JavaScript et règles de qualité | [docs/coding-standards.md](docs/coding-standards.md) |
| **create-design-system-rules** | Génère des règles de design system personnalisées pour automatiser les workflows Figma-to-code avec conventions et patterns cohérents | [docs/create-design-system-rules.md](docs/create-design-system-rules.md) |
| **docx** | Création, édition et analyse complètes de documents Word (.docx) : tracked changes, commentaires, formatage et extraction de texte | [docs/docx.md](docs/docx.md) |
| **frontend-design** | Création d'interfaces frontend de qualité production avec direction esthétique audacieuse, évitant les designs génériques AI | [docs/frontend-design.md](docs/frontend-design.md) |
| **github-issues** | Gestion complète des issues GitHub : création avec contexte, recherche, mise à jour, commentaires et workflows structurés | [docs/github-issues.md](docs/github-issues.md) |
| **gitlab-code-review** | Revue de code approfondie des merge requests GitLab : analyse qualité, sécurité, performance et best practices avec feedback constructif | [docs/gitlab-code-review.md](docs/gitlab-code-review.md) |
| **gitlab-issue** | Gestion des issues GitLab pour instances auto-hébergées : création, mise à jour, recherche et liaison avec merge requests | [docs/gitlab-issue.md](docs/gitlab-issue.md) |
| **mcp-builder** | Guide complet pour créer des serveurs MCP (Model Context Protocol) de qualité en Python (FastMCP) ou TypeScript (MCP SDK) | [docs/mcp-builder.md](docs/mcp-builder.md) |
| **pdf** | Manipulation complète de PDF : extraction de texte/tables, création, fusion/division, remplissage de formulaires avec Python | [docs/pdf.md](docs/pdf.md) |
| **playwright-skill** | Tests et automatisation web avec Playwright : gestion serveurs, reconnaissance DOM dynamique, screenshots, validation UX et tests responsifs | [docs/playwright-skill.md](docs/playwright-skill.md) |
| **postgres** | Exécution sécurisée de requêtes SQL lecture seule sur PostgreSQL avec support multi-bases et sélection intelligente | [docs/postgres.md](docs/postgres.md) |
| **pptx** | Création, édition et analyse de présentations PowerPoint (.pptx) : layouts, animations, speaker notes et conversion HTML-to-PPTX | [docs/pptx.md](docs/pptx.md) |
| **react-best-practices** | Guide complet React/Next.js : architecture composants, optimisation performance, patterns shadcn/ui, animations Motion et React 19+ | [docs/react-best-practices.md](docs/react-best-practices.md) |
| **security-review** | Audit de sécurité approfondi : gestion secrets, validation inputs, authentification, protection OWASP Top 10 et bonnes pratiques | [docs/security-review.md](docs/security-review.md) |
| **toxic-manager-translator** | 🎭 Transforme les messages émotionnels ou frustrés en réponses professionnelles et stratégiques pour gérer les situations difficiles au travail | [docs/toxic-manager-translator.md](docs/toxic-manager-translator.md) |
| **vue-best-practices** | Best practices Vue.js 3/Nuxt : Composition API, design composants, patterns réactivité, intégration Tailwind CSS et PrimeVue | [docs/vue-best-practices.md](docs/vue-best-practices.md) |
| **web-design-guidelines** | Audit complet UI/UX avec inspection visuelle : conformité Web Interface Guidelines, accessibilité et corrections automatiques | [docs/web-design-guidelines.md](docs/web-design-guidelines.md) |
| **xlsx** | Création, édition et analyse de fichiers Excel (.xlsx) : formules complexes, formatage professionnel, visualisation et recalcul | [docs/xlsx.md](docs/xlsx.md) |

## Ressources

- **[📖 Guide complet d'utilisation](docs/comment-utiliser.md)** - Documentation détaillée
- [Agent Skills](https://agentskills.io) - Standard ouvert pour les skills d'agents IA
- [add-skill CLI](https://github.com/vercel-labs/add-skill) - Outil d'installation des skills

## Licence

MIT
