# Documentation (docs)

Ce skill automatise la génération et la mise à jour de la documentation projet. Il produit un README.md en français, orienté **PO (Product Owner)**, avec des diagrammes Mermaid.

## Utilisation

Demandez simplement :

- `Crée le readme du projet`
- `Mets à jour le readme`
- `Génère la documentation`
- `/docs`

## Fonctionnalités

### Génération de fichiers

- **README.md** — Complet, en français, orienté PO, avec diagrammes Mermaid
- **CLAUDE.md** — Instructions pour Claude Code (généré si absent)
- **AGENT.md** — Instructions pour agents autonomes (généré si absent)
- **Table des matières** automatique avec liens vers la documentation technique

### Revue de la documentation

- **Relecture qualité** de chaque fichier `docs/*.md` (français, concision, lisibilité)
- **Détection de documentation manquante** par analyse croisée du code

### Modes de fonctionnement

| Mode | Comportement |
|------|-------------|
| **Création** | Génère les fichiers depuis zéro |
| **Mise à jour** | Préserve les sections personnalisées |

## Fichiers générés

| Fichier | Contenu | Langue |
|---------|---------|--------|
| `README.md` | Présentation projet, diagrammes Mermaid | Français |
| `CLAUDE.md` | Instructions pour Claude Code | Anglais |
| `AGENT.md` | Instructions pour agents autonomes | Anglais |

## Installation

```bash
npx skills add Dedalus-ERP-PAS/foundation-skills --skill docs -g -y
```

## Bonnes pratiques

- Relancez ce skill après chaque changement majeur d'architecture
- Vérifiez que le README.md reflète l'état actuel du projet
- Les sections personnalisées sont préservées lors des mises à jour
