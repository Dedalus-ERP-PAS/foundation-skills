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
| **pdf** | Manipulation de PDF : extraction, création, fusion et formulaires |
| **playwright-skill** | Automatisation navigateur avec Playwright |
| **postgres** | Requêtes SQL lecture seule sur PostgreSQL |
| **pptx** | Création, édition et analyse de présentations PowerPoint (.pptx) |
| **react-best-practices** | Guidelines performance React/Next.js |
| **webapp-testing** | Tests d'applications web avec Playwright |
| **web-design-guidelines** | Audit UI, accessibilité et UX |
| **xlsx** | Création, édition et analyse de fichiers Excel avec formules et formatage |

## Comment utiliser chaque skill

### changelog-generator

Génère des changelogs à partir de l'historique git. Demandez simplement :

```
Crée un changelog depuis le dernier release
Génère les notes de version pour les commits de la semaine
```

### docx

Manipulation de documents Word (.docx) :

- **Lire** : `pandoc --track-changes=all fichier.docx -o output.md`
- **Créer** : Utilise docx-js pour générer des documents via JavaScript
- **Éditer** : Workflow unpack/edit/pack avec la librairie Document Python
- **Redlining** : Ajout de tracked changes pour révision de documents

### frontend-design

Création d'interfaces web distinctives et professionnelles. Demandez simplement :

```
Crée une landing page moderne pour [produit]
Génère un composant React pour [fonctionnalité]
```

Le skill applique automatiquement des principes de design avancés (typographie, couleurs, animations).

### mcp-builder

Guide pour créer des serveurs MCP (Model Context Protocol) :

1. Recherche et planification (API, documentation MCP)
2. Implémentation (TypeScript recommandé)
3. Tests avec MCP Inspector
4. Création d'évaluations

### pdf

Manipulation de PDF avec Python :

```python
from pypdf import PdfReader, PdfWriter
reader = PdfReader("document.pdf")
text = reader.pages[0].extract_text()
```

- **Extraction** : pypdf, pdfplumber pour texte et tableaux
- **Création** : reportlab
- **Formulaires** : Voir forms.md pour le remplissage

### playwright-skill

Automatisation navigateur. Scripts écrits dans `/tmp/playwright-test-*.js` :

```javascript
const { chromium } = require('playwright')
const browser = await chromium.launch({ headless: false })
const page = await browser.newPage()
await page.goto('http://localhost:3000')
await page.screenshot({ path: '/tmp/screenshot.png' })
```

### postgres

Requêtes SQL lecture seule sur PostgreSQL :

```bash
# Lister les bases configurées
python3 scripts/query.py --list

# Exécuter une requête
python3 scripts/query.py --db production --query "SELECT * FROM users LIMIT 10"

# Voir le schéma
python3 scripts/query.py --db production --schema
```

Configuration dans `connections.json` (chmod 600).

### pptx

Manipulation de présentations PowerPoint :

- **Lire** : `python -m markitdown fichier.pptx`
- **Créer sans template** : Workflow html2pptx (HTML → PPTX)
- **Créer avec template** : Workflow rearrange/inventory/replace
- **Thumbnails** : `python scripts/thumbnail.py presentation.pptx --cols 4`

### react-best-practices

Guidelines de performance React/Next.js. Priorités :

1. **Éliminer les waterfalls** : `Promise.all()` pour requêtes parallèles
2. **Optimiser le bundle** : Imports dynamiques, éviter les barrel files
3. **Performance serveur** : `React.cache()`, sérialisation minimale
4. **Optimisation re-renders** : `memo()`, dépendances primitives

### webapp-testing

Tests d'applications web avec Playwright Python :

```bash
# Avec gestion du serveur
python scripts/with_server.py --server "npm run dev" --port 5173 -- python test.py
```

Pattern reconnaissance-puis-action : attendre `networkidle` avant d'inspecter le DOM.

### web-design-guidelines

Audit UI contre les Web Interface Guidelines de Vercel :

```
Revois mon UI dans src/components/
Vérifie l'accessibilité de ma page
```

Les guidelines sont récupérées automatiquement depuis le repo officiel.

### xlsx

Manipulation de fichiers Excel :

```python
from openpyxl import Workbook
wb = Workbook()
sheet = wb.active
sheet['A1'] = 'Données'
sheet['B1'] = '=SUM(A1:A10)'  # Toujours utiliser des formules
wb.save('output.xlsx')
```

**Important** : Utiliser `recalc.py` pour recalculer les formules après modification.

## Documentation

- [Installation](docs/installation.md)
- [Contribution](docs/contributing.md)
- [Référence des skills](docs/skills-reference.md)

## Ressources

- [Agent Skills](https://agentskills.io)
- [add-skill CLI](https://github.com/vercel-labs/add-skill)

## Licence

MIT
