# docx

Manipulation de documents Word (.docx).

## Lire un document

```bash
pandoc --track-changes=all fichier.docx -o output.md
```

## Créer un document

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

## Éditer un document

Workflow unpack/edit/pack avec la librairie Document Python :

1. Décompresser le .docx (archive ZIP)
2. Modifier les fichiers XML
3. Recompresser

## Redlining

Ajout de tracked changes pour révision de documents. Permet de marquer les insertions/suppressions pour révision ultérieure.
