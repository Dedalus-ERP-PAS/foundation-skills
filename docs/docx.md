# Documents Word (docx)

Manipulation de documents Word (.docx) : lecture, création, édition et suivi des modifications.

## Contexte

Ce skill permet à l'agent de travailler avec des fichiers Word. Il couvre la lecture, la création et l'édition. Il inclut le **redlining** (suivi des modifications, ou "tracked changes"), utilisé pour la révision collaborative.

## Opérations disponibles

| Opération | Outil | Commande |
|-----------|-------|----------|
| **Lire** | pandoc | `pandoc --track-changes=all fichier.docx -o output.md` |
| **Créer** | docx-js (JavaScript) | Via l'API `Document`, `Packer`, `Paragraph` |
| **Éditer** | python-docx (Python) | Décompresser, modifier le XML, recompresser |
| **Redlining** | pandoc / python-docx | Tracked changes pour révision |

## Créer un document (section technique)

```javascript
const { Document, Packer, Paragraph } = require('docx')
const doc = new Document({
  sections: [{ children: [new Paragraph("Contenu")] }]
})
Packer.toBuffer(doc).then(buf =>
  fs.writeFileSync("output.docx", buf)
)
```

## Éditer un document (section technique)

Le format `.docx` est une archive ZIP contenant du XML. Le workflow d'édition :

1. **Décompresser** le fichier .docx
2. **Modifier** les fichiers XML internes
3. **Recompresser** en .docx

## Redlining

Le **redlining** (suivi des modifications, ou "tracked changes") marque les insertions et suppressions. Il est utile pour la révision collaborative de documents.
