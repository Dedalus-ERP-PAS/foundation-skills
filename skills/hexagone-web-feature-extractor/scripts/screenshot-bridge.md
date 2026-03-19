# Screenshot Bridge : Transfert Chrome → Conteneur

## Principe

Les screenshots pris via `Claude in Chrome:computer(action="screenshot")` sont stockés en mémoire par l'extension Chrome avec un ID (ex: `ss_49478g4in`). Pour les embarquer dans un document Word, il faut les transférer vers le filesystem du conteneur.

## Étapes

### 1. Lancer le serveur de réception

```bash
node /path/to/skill/scripts/screenshot-server.js
```

Cela démarre un serveur HTTP sur le port 8765 qui :
- Sert une page `bridge.html` avec un file input
- Accepte les uploads POST sur `/upload` 
- Sauvegarde les fichiers dans `/home/claude/screenshots/`

### 2. Naviguer vers la page bridge

```
tabs_create_mcp()  → obtenir bridgeTabId
navigate(tabId=bridgeTabId, url="http://localhost:8765/bridge.html")
```

### 3. Trouver le file input

```
find(query="file input", tabId=bridgeTabId)  → obtenir le ref
```

### 4. Pour chaque screenshot

```
// Définir le nom du fichier via JavaScript
javascript_tool(tabId=bridgeTabId, text=`
  document.getElementById('filename').value = 'page-01-tableau-de-bord.jpg';
`)

// Uploader le screenshot
upload_image(imageId="ss_XXXXX", tabId=bridgeTabId, ref="ref_XX")

// Attendre le traitement
wait(2)

// Vérifier le résultat
javascript_tool(tabId=bridgeTabId, text=`document.getElementById('status').textContent`)
```

### 5. Vérifier les fichiers

```bash
ls -la /home/claude/screenshots/
```

## Alternative : Mode dégradé (sans bridge)

Si le bridge ne fonctionne pas, deux alternatives :

### A. Placeholders dans le document
Le script DOCX génère des encadrés gris avec le texte descriptif de chaque capture. L'utilisateur insère ensuite les screenshots manuellement.

### B. Export depuis le navigateur
L'utilisateur peut faire clic-droit > "Enregistrer l'image" sur chaque screenshot visible dans la conversation Claude, puis les insérer dans le document.
