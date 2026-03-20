# Présentations PowerPoint (pptx)

Création et manipulation de présentations PowerPoint (.pptx) avec templates, design avancé et génération HTML vers PPTX.

## Contexte

Ce skill permet de créer, modifier et exporter des présentations PowerPoint. Il propose deux workflows : création libre ou modification de templates existants.

## Cas d'utilisation

- **Créer** des présentations depuis zéro
- **Modifier** des présentations existantes avec template
- **Générer** des présentations à partir de HTML
- **Appliquer** un design professionnel (palettes, typographie)
- **Créer des thumbnails** pour aperçu visuel

## Deux workflows

```mermaid
graph LR
    A[Besoin] -->|Sans template| B[HTML vers PPTX]
    A -->|Avec template| C[Inventory]
    C --> D[Replace]
    D --> E[Rearrange]
```

- **Sans template** : création libre à partir de HTML, idéal pour du contenu nouveau.
- **Avec template** : modification d'un fichier existant, idéal pour respecter une charte graphique.

### Sans template (section technique)

```bash
node scripts/html2pptx.js input.html output.pptx
```

### Avec template (section technique)

```bash
python scripts/inventory.py template.pptx
python scripts/replace.py template.pptx out.pptx --data data.json
python scripts/rearrange.py in.pptx out.pptx --order "1,3,2,5"
```

## Design et mise en forme

- **16 palettes de couleurs** prédéfinies
- **Typographie** adaptée aux présentations professionnelles
- **Layouts** optimisés (deux colonnes préféré au stacking)
- **Graphiques et diagrammes** intégrés

## Commandes utiles (section technique)

| Action | Commande |
|--------|----------|
| **Thumbnails** | `python scripts/thumbnail.py fichier.pptx --cols 4` |
| **Lecture** | `python -m markitdown fichier.pptx` |

## Utilisation

```
@workspace avec pptx, créez une présentation de 10 slides sur [sujet]
@workspace avec pptx, modifiez ce template avec les données du JSON
@workspace avec pptx, générez des thumbnails de cette présentation
```

## Démarrage rapide

```bash
npx skills add Dedalus-ERP-PAS/foundation-skills --skill pptx -g -y
```

## Ressources

- [SKILL.md complet](../skills/pptx/SKILL.md) — Guide détaillé avec palettes et options visuelles
