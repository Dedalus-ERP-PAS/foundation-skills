# Hexagone Web Feature Extractor

Explore **n'importe quel** espace Hexagone Web via Claude in Chrome. Capture chaque page/onglet et produit un document Markdown (.md) orienté PO (Product Owner) avec descriptions fonctionnelles et captures d'écran.

## Cas d'usage

- Documenter un espace fonctionnel Hexagone Web (tout espace, pas uniquement Structures / Nomenclatures)
- Produire une fiche produit ou documentation client depuis les écrans
- Capturer les pages et onglets d'un module pour audit fonctionnel

## Prérequis

- **Claude in Chrome** activé et connecté
- Accès réseau au serveur Hexagone Web (URL interne type `https://wsXXXXXX.dedalus.lan:PORT/hexagone-XX/vue/login`)
- Certificat SSL (Secure Sockets Layer) accepté si auto-signé
- Node.js installé (aucune dépendance externe nécessaire)

## Workflow

```
1. CONNEXION     → Se connecter à Hexagone Web via Chrome
2. NAVIGATION    → Accéder à l'espace cible
3. DÉCOUVERTE    → Lister toutes les pages/menus du sidebar
4. EXPLORATION   → Parcourir chaque page, capturer screenshots + texte
5. TRANSFERT     → Transférer les screenshots vers le conteneur (avec vérification)
6. GÉNÉRATION    → Produire le document Markdown avec captures embarquées (avec validation JSON)
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
- **Une section par feature** : titre, description fonctionnelle, screenshot(s) en image Markdown, liste numérotée des fonctionnalités clés, valeur métier

## Dépendances

- Scripts inclus : `generate-md.js`, `screenshot-server.js`, `screenshot-bridge.md`
- Aucune dépendance npm (utilise uniquement les modules natifs Node.js)
- Données d'exemple : `reference/default-structures-nomenclatures.json`

## Liens

- [SKILL.md](../skills/hexagone-web-feature-extractor/SKILL.md)
- [Hexagone Frontend](hexagone-frontend.md) — composants frontend Hexagone
- [Hexagone Web Services](hexagone-swdoc.md) — documentation des web services Hexagone
