# Article Extractor

Extraction de contenu propre d'articles web, sans publicités ni navigation.

## Contexte

Les articles web contiennent des éléments parasites (pubs, menus, popups). Ce skill extrait uniquement le contenu utile. Il sauvegarde le résultat en texte brut.

## Utilisation

- `Extrais cet article : https://example.com/blog/mon-article`
- `Télécharge le contenu de https://example.com/tutoriel`
- `Sauvegarde ce blog post en texte : [URL]`

## Fonctionnalités

- **Extraction du contenu principal** de l'article
- **Suppression automatique** des publicités, navigation et popups
- **Sauvegarde** avec le titre de l'article comme nom de fichier
- **Prévisualisation** du contenu extrait

## Éléments supprimés

| Élément | Exemple |
|---------|---------|
| Navigation | Menus, barres latérales |
| Publicités | Bannières, contenus promotionnels |
| Formulaires | Inscription newsletter, popups |
| Social | Boutons de partage, commentaires |
| Divers | Notices de cookies |

## Prérequis (section technique)

L'un des outils suivants doit être installé (par ordre de préférence) :

| Outil | Installation | Note |
|-------|-------------|------|
| **reader** (recommandé) | `npm install -g @mozilla/readability-cli` | Meilleure qualité |
| **trafilatura** | `pip3 install trafilatura` | Alternative Python |
| **curl** (fallback) | Aucune installation | Moins précis |

## Exemple

```
Vous : Extrais https://blog.example.com/article
Agent : Extrait et sauvegarde "Article - Titre.txt"
```

## Limitations

- Les articles protégés par **paywall** ne peuvent pas être extraits
- Les sites avec beaucoup de **JavaScript** peuvent poser problème
- Certaines mises en page complexes affectent la qualité
