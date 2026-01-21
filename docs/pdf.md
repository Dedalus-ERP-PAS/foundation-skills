# pdf

Manipulation de PDF avec Python.

## Extraction de texte

```python
from pypdf import PdfReader, PdfWriter

reader = PdfReader("document.pdf")
text = reader.pages[0].extract_text()
```

## Extraction de tableaux

```python
import pdfplumber

with pdfplumber.open("document.pdf") as pdf:
    page = pdf.pages[0]
    tables = page.extract_tables()
```

## Création de PDF

```python
from reportlab.pdfgen import canvas

c = canvas.Canvas("output.pdf")
c.drawString(100, 750, "Hello World")
c.save()
```

## Formulaires PDF

Voir `forms.md` pour le remplissage de formulaires PDF interactifs.

## Scripts disponibles

- `check_fillable_fields.py` - Vérifier les champs de formulaire
- `fill_fillable_fields.py` - Remplir les champs
- `extract_form_field_info.py` - Extraire les informations des champs
- `convert_pdf_to_images.py` - Convertir en images
