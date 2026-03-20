# Hexagone Web Feature Extractor

Ce skill explore **n'importe quel** espace Hexagone Web via **Playwright** (navigateur headless). Il capture chaque page/onglet et produit un document **Markdown** (.md) orienté **PO (Product Owner)** avec descriptions fonctionnelles et captures d'écran.

## Cas d'usage

- Documenter un espace fonctionnel Hexagone Web (tout espace, pas uniquement Structures / Nomenclatures)
- Produire une fiche produit ou documentation client depuis les écrans
- Capturer les pages et onglets d'un module pour audit fonctionnel

## Prérequis

- **Node.js** installé
- **Playwright** installé (`npm install playwright`)
- Accès réseau au serveur Hexagone Web (URL interne type `https://wsXXXXXX.dedalus.lan:PORT/hexagone-XX/vue/login`)
- Certificat **SSL (Secure Sockets Layer)** accepté si auto-signé

## Workflow

```
1. CONNEXION     → Se connecter à Hexagone Web via Playwright
2. NAVIGATION    → Accéder à l'espace cible
3. DÉCOUVERTE    → Lister toutes les pages/menus du sidebar
4. EXPLORATION   → Parcourir chaque page, capturer screenshots + texte
5. GÉNÉRATION    → Produire le document Markdown avec captures embarquées
```

## Paramètres d'entrée

| Paramètre | Description | Exemple |
|-----------|-------------|---------|
| URL de login | URL complète de la page de connexion | `https://ws123456.dedalus.lan:8443/hexagone-01/vue/login` |
| Nom utilisateur | Code utilisateur Hexagone | `ADMIN` |
| Mot de passe | Mot de passe Hexagone | — |
| Espace cible | Nom exact de l'espace à explorer | `STRUCTURES / NOMENCLATURES` |

## Document généré

Le skill produit un fichier `.md` structuré :

- **Titre et sous-titre** avec nom de l'espace et date
- **Sommaire** avec liens internes
- **Une section par feature** : titre, description fonctionnelle, screenshots embarqués, fonctionnalités clés, valeur métier

## Dépendances

- Scripts inclus : `generate-md.js`, `screenshot-server.js`, `screenshot-bridge.md`
- **Playwright** pour la navigation headless
- Données d'exemple : `reference/default-structures-nomenclatures.json`

## Liens

- [SKILL.md](../skills/hexagone-web-feature-extractor/SKILL.md)
- [Hexagone Frontend](hexagone-frontend.md) — composants frontend Hexagone
- [Hexagone Web Services](hexagone-swdoc.md) — documentation des web services Hexagone
