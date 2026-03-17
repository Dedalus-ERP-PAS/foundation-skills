# pdf

Manipulation complète de documents PDF : extraction de texte et tableaux, création, fusion, découpage et remplissage de formulaires.

## Quand utiliser ce skill

Utilisez ce skill pour :
- Extraire du texte ou des tableaux depuis un PDF
- Créer de nouveaux documents PDF
- Fusionner ou découper des PDF existants
- Remplir des formulaires PDF interactifs
- Convertir des PDF en images
- Analyser des PDF scannés (OCR)

## Librairies utilisées

| Librairie | Usage principal |
|-----------|----------------|
| **pypdf** | Lecture, fusion, découpage, métadonnées |
| **pdfplumber** | Extraction de texte et tableaux (recommandé) |
| **reportlab** | Création de PDF depuis zéro |
| **pdftotext / qpdf / pdftk** | Outils en ligne de commande |

## Exemples

### Extraction de texte

```python
from pypdf import PdfReader

reader = PdfReader("document.pdf")
text = reader.pages[0].extract_text()
```

### Extraction de tableaux

```python
import pdfplumber

with pdfplumber.open("document.pdf") as pdf:
    page = pdf.pages[0]
    tables = page.extract_tables()
    for table in tables:
        for row in table:
            print(row)
```

### Création de PDF

```python
from reportlab.pdfgen import canvas

c = canvas.Canvas("output.pdf")
c.drawString(100, 750, "Hello World")
c.save()
```

## Scripts disponibles

| Script | Fonction |
|--------|----------|
| `check_fillable_fields.py` | Vérifier les champs de formulaire d'un PDF |
| `fill_fillable_fields.py` | Remplir les champs d'un formulaire |
| `extract_form_field_info.py` | Extraire les informations des champs |
| `convert_pdf_to_images.py` | Convertir les pages en images |

## Exemples d'utilisation

```
@workspace avec pdf, extrais le texte de ce document
@workspace avec pdf, fusionne ces 3 PDF en un seul
@workspace avec pdf, remplis ce formulaire avec les données du JSON
```

## Démarrage rapide

```bash
npx skills add Dedalus-ERP-PAS/foundation-skills --skill pdf -g -y
```

## Ressources

- [SKILL.md complet](../skills/pdf/SKILL.md) — Guide détaillé avec tous les workflows
