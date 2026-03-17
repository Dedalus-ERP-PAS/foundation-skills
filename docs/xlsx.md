# xlsx

Création, édition et analyse de fichiers Excel (.xlsx) avec support complet des formules, formatage et conventions de modélisation financière.

## Quand utiliser ce skill

Utilisez ce skill pour :
- Créer des fichiers Excel avec formules et formatage
- Lire et analyser des données depuis un fichier Excel
- Modifier des fichiers existants en préservant les formules
- Appliquer des conventions de modélisation financière
- Recalculer les formules après modification

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

## Exemples

### Création

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
from openpyxl.styles import Font, Alignment

sheet['A1'].font = Font(bold=True, size=14)
sheet['A1'].alignment = Alignment(horizontal='center')
```

## Recalcul des formules

Après toute modification, il est **obligatoire** de recalculer les formules :

```bash
python recalc.py fichier.xlsx
```

Sans recalcul, les formules peuvent afficher des valeurs incorrectes dans certaines applications (Excel, LibreOffice).

## Formatage des nombres

| Type | Format | Exemple |
|------|--------|---------|
| Monétaire | `#,##0` | 1 234 567 |
| Pourcentage | `0.0%` | 12.5% |
| Années | Sans séparateur de milliers | 2026 |

## Exemples d'utilisation

```
@workspace avec xlsx, crée un tableau de bord financier avec formules
@workspace avec xlsx, analyse les données de ce fichier Excel
@workspace avec xlsx, ajoute une colonne calculée à ce classeur
```

## Démarrage rapide

```bash
npx skills add Dedalus-ERP-PAS/foundation-skills --skill xlsx -g -y
```

## Ressources

- [SKILL.md complet](../skills/xlsx/SKILL.md) — Guide détaillé avec conventions de formatage
