# pptx

Manipulation de présentations PowerPoint.

## Lire une présentation

```bash
python -m markitdown fichier.pptx
```

## Créer sans template (html2pptx)

Workflow HTML → PPTX pour créer des présentations à partir de HTML :

```bash
node scripts/html2pptx.js input.html output.pptx
```

## Créer avec template

Workflow rearrange/inventory/replace pour modifier des templates existants :

### 1. Inventory - Analyser le template

```bash
python scripts/inventory.py template.pptx
```

### 2. Replace - Remplacer le contenu

```bash
python scripts/replace.py template.pptx output.pptx --data data.json
```

### 3. Rearrange - Réorganiser les slides

```bash
python scripts/rearrange.py input.pptx output.pptx --order "1,3,2,5"
```

## Thumbnails

```bash
python scripts/thumbnail.py presentation.pptx --cols 4 --output thumbnails.png
```
