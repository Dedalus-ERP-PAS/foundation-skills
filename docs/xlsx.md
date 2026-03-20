# Fichiers Excel (xlsx)

Création, édition et analyse de fichiers Excel (.xlsx) avec formules, formatage et conventions de **modélisation** financière.

## Contexte

Ce skill permet à l'agent de manipuler des fichiers Excel. Il applique les conventions de modélisation financière (code couleur, formules obligatoires, recalcul systématique).

## Cas d'utilisation

- **Créer** des fichiers Excel avec formules et formatage
- **Lire et analyser** des données depuis un fichier existant
- **Modifier** en préservant les formules
- **Appliquer** les conventions de modélisation financière

## Règles fondamentales

| Règle | Description |
|-------|-------------|
| **Zéro erreur de formule** | Toutes les formules doivent être valides |
| **Formules, pas de valeurs en dur** | Toujours utiliser des formules pour les calculs |
| **Recalcul obligatoire** | Lancer `recalc.py` après chaque modification |

## Code couleur (convention financière)

| Couleur | Signification |
|---------|---------------|
| **Bleu** | Inputs (données saisies) |
| **Noir** | Formules (calculées) |
| **Vert** | Liens internes (entre onglets) |
| **Rouge** | Liens externes (entre fichiers) |
| **Jaune** | Points d'attention |

## Exemples (section technique)

### Création

```python
from openpyxl import Workbook
wb = Workbook()
sheet = wb.active
sheet['A1'] = 'Données'
sheet['B1'] = '=SUM(A1:A10)'
wb.save('output.xlsx')
```

### Lecture

```python
from openpyxl import load_workbook
wb = load_workbook('fichier.xlsx')
for row in wb.active.iter_rows(values_only=True):
    print(row)
```

## Recalcul des formules

Après toute modification, le recalcul est **obligatoire** :

```bash
python recalc.py fichier.xlsx
```

Sans recalcul, les formules affichent des valeurs incorrectes dans Excel ou LibreOffice.

## Formatage des nombres

| Type | Format | Exemple |
|------|--------|---------|
| Monétaire | `#,##0` | 1 234 567 |
| Pourcentage | `0.0%` | 12.5% |
| Années | Sans séparateur de milliers | 2026 |

## Utilisation

```
@workspace avec xlsx, créez un tableau de bord financier avec formules
@workspace avec xlsx, analysez les données de ce fichier Excel
@workspace avec xlsx, ajoutez une colonne calculée à ce classeur
```

## Démarrage rapide

```bash
npx skills add Dedalus-ERP-PAS/foundation-skills --skill xlsx -g -y
```

## Ressources

- [SKILL.md complet](../skills/xlsx/SKILL.md) — Guide détaillé avec conventions de formatage
