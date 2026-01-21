# xlsx

Manipulation de fichiers Excel avec openpyxl.

## Création basique

```python
from openpyxl import Workbook

wb = Workbook()
sheet = wb.active
sheet['A1'] = 'Données'
sheet['B1'] = '=SUM(A1:A10)'  # Toujours utiliser des formules
wb.save('output.xlsx')
```

## Lecture

```python
from openpyxl import load_workbook

wb = load_workbook('fichier.xlsx')
sheet = wb.active

for row in sheet.iter_rows(values_only=True):
    print(row)
```

## Formatage

```python
from openpyxl.styles import Font, Fill, Alignment

sheet['A1'].font = Font(bold=True, size=14)
sheet['A1'].alignment = Alignment(horizontal='center')
```

## Recalcul des formules

**Important :** Après modification, utiliser `recalc.py` pour recalculer les formules :

```bash
python recalc.py fichier.xlsx
```

Sans recalcul, les formules peuvent afficher des valeurs incorrectes dans certaines applications.
