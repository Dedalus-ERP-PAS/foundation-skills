# Guide d'utilisation des skills

Ce guide détaille l'utilisation de chaque skill disponible dans le repository.

## Table des matières

- [changelog-generator](#changelog-generator)
- [create-design-system-rules](#create-design-system-rules)
- [docx](#docx)
- [frontend-design](#frontend-design)
- [mcp-builder](#mcp-builder)
- [pdf](#pdf)
- [playwright-skill](#playwright-skill)
- [postgres](#postgres)
- [pptx](#pptx)
- [react-best-practices](#react-best-practices)
- [webapp-testing](#webapp-testing)
- [web-design-guidelines](#web-design-guidelines)
- [xlsx](#xlsx)

---

## changelog-generator

Génère des changelogs à partir de l'historique git. Demandez simplement :

```
Crée un changelog depuis le dernier release
Génère les notes de version pour les commits de la semaine
```

**Fonctionnalités :**

- Analyse des commits git
- Génération automatique de notes de version
- Support des formats conventionnels (Conventional Commits)

---

## create-design-system-rules

Génère des règles de design system personnalisées pour les workflows Figma-to-code.

**Prérequis :** Serveur MCP Figma connecté.

```
Crée des règles de design system pour mon projet React
Configure les règles Figma pour mon application Vue
Génère les guidelines de design system pour notre monorepo
```

**Workflow :**

1. Exécution de l'outil `create_design_system_rules` via le serveur MCP Figma
2. Analyse de la codebase (composants, styling, tokens)
3. Génération des règles personnalisées
4. Sauvegarde dans `CLAUDE.md` à la racine du projet
5. Validation et itération

**Ce que le skill génère :**

- Règles d'organisation des composants
- Règles de styling et tokens
- Règles d'intégration Figma MCP
- Règles de gestion des assets
- Conventions spécifiques au projet

---

## docx

Manipulation de documents Word (.docx).

### Lire un document

```bash
pandoc --track-changes=all fichier.docx -o output.md
```

### Créer un document

Utilise `docx-js` pour générer des documents via JavaScript :

```javascript
const { Document, Packer, Paragraph } = require('docx')

const doc = new Document({
  sections: [{
    children: [
      new Paragraph("Hello World")
    ]
  }]
})

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("output.docx", buffer)
})
```

### Éditer un document

Workflow unpack/edit/pack avec la librairie Document Python :

1. Décompresser le .docx (archive ZIP)
2. Modifier les fichiers XML
3. Recompresser

### Redlining

Ajout de tracked changes pour révision de documents. Permet de marquer les insertions/suppressions pour révision ultérieure.

---

## frontend-design

Création d'interfaces web distinctives et professionnelles.

```
Crée une landing page moderne pour [produit]
Génère un composant React pour [fonctionnalité]
Design un dashboard avec un style [minimaliste/maximalist/etc.]
```

**Le skill applique automatiquement :**

- Typographie distinctive (évite les polices génériques)
- Palettes de couleurs cohérentes
- Animations et micro-interactions
- Compositions spatiales créatives
- Textures et effets visuels

**Directions esthétiques supportées :**

- Brutalement minimal
- Maximalist chaos
- Retro-futuristic
- Luxury/refined
- Playful/toy-like
- Editorial/magazine
- Art deco/geometric
- Et plus...

---

## mcp-builder

Guide pour créer des serveurs MCP (Model Context Protocol).

**Workflow de création :**

1. **Recherche et planification**
   - Analyse de l'API cible
   - Lecture de la documentation MCP

2. **Implémentation**
   - TypeScript recommandé (meilleur support)
   - Python également supporté

3. **Tests**
   - Utilisation de MCP Inspector
   - Tests des tools et resources

4. **Évaluations**
   - Création de cas de test
   - Validation du comportement

**Ressources de référence :**

- `reference/mcp_best_practices.md` - Bonnes pratiques
- `reference/node_mcp_server.md` - Guide TypeScript
- `reference/python_mcp_server.md` - Guide Python
- `reference/evaluation.md` - Guide d'évaluation

---

## pdf

Manipulation de PDF avec Python.

### Extraction de texte

```python
from pypdf import PdfReader, PdfWriter

reader = PdfReader("document.pdf")
text = reader.pages[0].extract_text()
```

### Extraction de tableaux

```python
import pdfplumber

with pdfplumber.open("document.pdf") as pdf:
    page = pdf.pages[0]
    tables = page.extract_tables()
```

### Création de PDF

```python
from reportlab.pdfgen import canvas

c = canvas.Canvas("output.pdf")
c.drawString(100, 750, "Hello World")
c.save()
```

### Formulaires PDF

Voir `forms.md` pour le remplissage de formulaires PDF interactifs.

**Scripts disponibles :**

- `check_fillable_fields.py` - Vérifier les champs de formulaire
- `fill_fillable_fields.py` - Remplir les champs
- `extract_form_field_info.py` - Extraire les informations des champs
- `convert_pdf_to_images.py` - Convertir en images

---

## playwright-skill

Automatisation navigateur avec Playwright.

### Script de base

Scripts écrits dans `/tmp/playwright-test-*.js` :

```javascript
const { chromium } = require('playwright')

const browser = await chromium.launch({ headless: false })
const page = await browser.newPage()
await page.goto('http://localhost:3000')
await page.screenshot({ path: '/tmp/screenshot.png' })
await browser.close()
```

### Interactions

```javascript
// Clic
await page.click('button#submit')

// Saisie
await page.fill('input[name="email"]', 'test@example.com')

// Attente
await page.waitForSelector('.result')

// Navigation
await page.goto('https://example.com')
```

### Bonnes pratiques

- Toujours fermer le navigateur après utilisation
- Utiliser des sélecteurs robustes (data-testid, aria-label)
- Attendre les éléments avant d'interagir

---

## postgres

Requêtes SQL lecture seule sur PostgreSQL.

### Commandes

```bash
# Lister les bases configurées
python3 scripts/query.py --list

# Exécuter une requête
python3 scripts/query.py --db production --query "SELECT * FROM users LIMIT 10"

# Voir le schéma
python3 scripts/query.py --db production --schema
```

### Configuration

Créer `connections.json` à partir de `connections.example.json` :

```json
{
  "production": {
    "host": "localhost",
    "port": 5432,
    "database": "mydb",
    "user": "readonly_user",
    "password": "secret"
  }
}
```

**Important :** Protéger le fichier avec `chmod 600 connections.json`.

### Sécurité

- Requêtes en lecture seule uniquement
- Pas de modifications de données
- Utiliser un utilisateur avec permissions limitées

---

## pptx

Manipulation de présentations PowerPoint.

### Lire une présentation

```bash
python -m markitdown fichier.pptx
```

### Créer sans template (html2pptx)

Workflow HTML → PPTX pour créer des présentations à partir de HTML :

```bash
node scripts/html2pptx.js input.html output.pptx
```

### Créer avec template

Workflow rearrange/inventory/replace pour modifier des templates existants :

1. **Inventory** : Analyser le template
   ```bash
   python scripts/inventory.py template.pptx
   ```

2. **Replace** : Remplacer le contenu
   ```bash
   python scripts/replace.py template.pptx output.pptx --data data.json
   ```

3. **Rearrange** : Réorganiser les slides
   ```bash
   python scripts/rearrange.py input.pptx output.pptx --order "1,3,2,5"
   ```

### Thumbnails

```bash
python scripts/thumbnail.py presentation.pptx --cols 4 --output thumbnails.png
```

---

## react-best-practices

Guidelines de performance React/Next.js.

### Priorités d'optimisation

1. **Éliminer les waterfalls**

   ```javascript
   // ❌ Séquentiel
   const user = await getUser()
   const posts = await getPosts(user.id)

   // ✅ Parallèle
   const [user, posts] = await Promise.all([
     getUser(),
     getPosts(userId)
   ])
   ```

2. **Optimiser le bundle**
   - Imports dynamiques pour le code splitting
   - Éviter les barrel files (`index.ts` qui réexportent tout)
   - Analyser le bundle avec `@next/bundle-analyzer`

3. **Performance serveur**
   - Utiliser `React.cache()` pour déduplication
   - Minimiser la sérialisation des données
   - Préférer les Server Components

4. **Optimisation re-renders**
   - `React.memo()` pour composants coûteux
   - Dépendances primitives dans les hooks
   - Éviter les objets inline dans les props

---

## webapp-testing

Tests d'applications web avec Playwright Python.

### Avec gestion du serveur

```bash
python scripts/with_server.py --server "npm run dev" --port 5173 -- python test.py
```

### Pattern reconnaissance-puis-action

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5173')
    
    # Attendre que la page soit stable
    page.wait_for_load_state('networkidle')
    
    # Inspecter le DOM
    content = page.content()
    
    # Effectuer des actions
    page.click('button#submit')
    
    browser.close()
```

### Exemples disponibles

- `examples/console_logging.py` - Capture des logs console
- `examples/element_discovery.py` - Découverte d'éléments
- `examples/static_html_automation.py` - Automatisation HTML statique

---

## web-design-guidelines

Audit UI contre les Web Interface Guidelines de Vercel.

```
Revois mon UI dans src/components/
Vérifie l'accessibilité de ma page
Analyse l'UX de mon formulaire d'inscription
```

**Le skill vérifie :**

- Accessibilité (WCAG)
- Cohérence visuelle
- Patterns UX standards
- Performance perçue
- Responsive design

Les guidelines sont récupérées automatiquement depuis le repo officiel Vercel.

---

## xlsx

Manipulation de fichiers Excel avec openpyxl.

### Création basique

```python
from openpyxl import Workbook

wb = Workbook()
sheet = wb.active
sheet['A1'] = 'Données'
sheet['B1'] = '=SUM(A1:A10)'  # Toujours utiliser des formules
wb.save('output.xlsx')
```

### Lecture

```python
from openpyxl import load_workbook

wb = load_workbook('fichier.xlsx')
sheet = wb.active

for row in sheet.iter_rows(values_only=True):
    print(row)
```

### Formatage

```python
from openpyxl.styles import Font, Fill, Alignment

sheet['A1'].font = Font(bold=True, size=14)
sheet['A1'].alignment = Alignment(horizontal='center')
```

### Recalcul des formules

**Important :** Après modification, utiliser `recalc.py` pour recalculer les formules :

```bash
python recalc.py fichier.xlsx
```

Sans recalcul, les formules peuvent afficher des valeurs incorrectes dans certaines applications.
