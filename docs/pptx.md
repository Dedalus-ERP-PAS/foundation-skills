# pptx

Création et manipulation de présentations PowerPoint (.pptx) avec support de templates, design avancé et génération HTML-to-PPTX.

## Quand utiliser ce skill

Utilisez ce skill pour :
- Créer des présentations PowerPoint depuis zéro
- Modifier des présentations existantes avec template
- Générer des présentations à partir de HTML
- Appliquer un design professionnel (palettes, typographie, layouts)
- Créer des thumbnails de présentations

## Deux workflows disponibles

### 1. Sans template (HTML → PPTX)

Création libre à partir de HTML — idéal pour des présentations entièrement nouvelles.

```bash
node scripts/html2pptx.js input.html output.pptx
```

### 2. Avec template (Inventory → Replace → Rearrange)

Modification de templates existants — idéal pour respecter une charte graphique.

```bash
# 1. Analyser le template
python scripts/inventory.py template.pptx

# 2. Remplacer le contenu
python scripts/replace.py template.pptx output.pptx --data data.json

# 3. Réorganiser les slides
python scripts/rearrange.py input.pptx output.pptx --order "1,3,2,5"
```

## Design et mise en forme

Le skill inclut des guidelines de design :
- **16 palettes de couleurs** prédéfinies pour différents contextes
- **Typographie** adaptée aux présentations professionnelles
- **Layouts** optimisés (deux colonnes préféré au stacking)
- **Géométrie, bordures, arrière-plans** configurables
- **Graphiques et diagrammes** intégrés

## Thumbnails

Génération d'une mosaïque visuelle de la présentation :

```bash
python scripts/thumbnail.py presentation.pptx --cols 4 --output thumbnails.png
```

## Lecture d'une présentation existante

```bash
python -m markitdown fichier.pptx
```

## Exemples d'utilisation

```
@workspace avec pptx, crée une présentation de 10 slides sur [sujet]
@workspace avec pptx, modifie ce template avec les données du JSON
@workspace avec pptx, génère des thumbnails de cette présentation
```

## Démarrage rapide

```bash
npx skills add Dedalus-ERP-PAS/foundation-skills --skill pptx -g -y
```

## Ressources

- [SKILL.md complet](../skills/pptx/SKILL.md) — Guide détaillé avec palettes de couleurs et options visuelles
