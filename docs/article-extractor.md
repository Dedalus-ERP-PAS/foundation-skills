# Article Extractor

Extraction de contenu propre d'articles web (blogs, tutoriels, actualités) sans publicités, navigation ou éléments perturbateurs.

## Utilisation

Demandez simplement à l'assistant d'extraire un article :

```
Extrais cet article : https://example.com/blog/mon-article
```

```
Télécharge le contenu de https://example.com/tutoriel
```

```
Sauvegarde ce blog post en texte : [URL]
```

## Prérequis

L'un des outils suivants doit être installé (par ordre de préférence) :

### Option 1 : reader (Recommandé)

```bash
npm install -g @mozilla/readability-cli
# ou
npm install -g reader-cli
```

### Option 2 : trafilatura

```bash
pip3 install trafilatura
```

### Option 3 : Fallback

Si aucun outil n'est installé, une extraction basique avec curl sera utilisée (moins précise).

## Fonctionnalités

- Extraction du contenu principal de l'article
- Suppression automatique des publicités et navigation
- Nettoyage des popups et formulaires newsletter
- Sauvegarde avec le titre de l'article comme nom de fichier
- Prévisualisation du contenu extrait

## Ce qui est supprimé

- Menus de navigation
- Publicités et contenus promotionnels
- Formulaires d'inscription newsletter
- Barres latérales d'articles connexes
- Sections de commentaires
- Boutons de partage social
- Notices de cookies

## Exemples

### Extraction simple

```
Utilisateur : Extrais https://blog.example.com/article-interessant

Assistant : 
✓ Extrait : Article Intéressant sur le Sujet
✓ Sauvegardé : Article Intéressant sur le Sujet.txt

Prévisualisation (10 premières lignes) :
[contenu de l'article...]
```

### Extraction d'un tutoriel

```
Utilisateur : Télécharge ce tutoriel en texte : https://docs.example.com/guide

Assistant :
✓ Extrait : Guide Complet - Documentation
✓ Sauvegardé : Guide Complet - Documentation.txt
```

## Limitations

- Les articles protégés par paywall ne peuvent pas être extraits
- Les sites avec beaucoup de JavaScript peuvent poser problème
- Certaines mises en page complexes peuvent affecter la qualité d'extraction
