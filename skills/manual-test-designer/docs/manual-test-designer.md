# Manual Test Designer

## Description

Skill de génération de cas de test manuels à partir de user stories, descriptions fonctionnelles ou critères d'acceptation. Produit un fichier CSV compatible Xray (Jira) et optionnellement un fichier JDD (Jeux De Données) au format JSON.

Le skill applique systématiquement les techniques de conception de tests ISTQB (Partitionnement en classes d'équivalence, Analyse des valeurs limites, Tables de décision, Transition d'états, Tests par paires) pour garantir une couverture optimale sans redondance.

## Cas d'usage

- Générer des cas de test manuels à partir d'une user story
- Créer un fichier CSV importable dans Xray
- Produire des jeux de données de test (JDD) structurés en JSON
- Concevoir des tests couvrant les cas nominaux, limites, invalides et d'erreur
- Prioriser les tests selon une analyse de risque (P0/P1/P2)

## Déclenchement

Le skill s'active quand l'utilisateur :
- Demande de « créer des cas de test » ou « générer des tests »
- Mentionne « Xray », « CSV », « import de tests »
- Veut des « scénarios de test » pour une fonctionnalité
- Demande un « jeu de données » ou « JDD » pour des tests
- Parle de « conception de tests » ou « test design »

## Fonctionnement

### Étape 1 — Analyse de l'entrée
Le skill analyse la user story ou la description fonctionnelle pour identifier les exigences testables, les champs d'entrée, les workflows et les règles métier.

### Étape 2 — Sélection des techniques
En fonction du contenu analysé, les techniques de test appropriées sont sélectionnées automatiquement (EP, BVA, Tables de décision, Transition d'états, Pairwise, Error Guessing).

### Étape 3 — Conception des cas de test
Les cas de test sont générés en couvrant : cas nominaux, valeurs limites, entrées invalides, gestion des erreurs et règles métier. Les doublons sont éliminés.

### Étape 4 — Génération du CSV
Un tableau CSV séparé par des points-virgules (`;`) est produit avec 9 colonnes : Test ID, Summary, Description, Repository, Preconditions, Test Steps, Expected Results, Priority, Labels.

### Étape 5 — Génération du JDD (optionnel)
Un fichier JSON structuré avec `metadata`, `entrants` (données d'entrée) et `sortants` (résultats attendus) est généré quand les données de test sont complexes.

## Configuration par défaut

| Paramètre | Valeur |
|---|---|
| Langue | Français |
| Séparateur CSV | `;` (point-virgule) |
| Niveaux de priorité | P0 (bloquant), P1 (fonctionnel), P2 (confort) |
| Format ID test | `TC-[MODULE]-[NNN]` |
| Chemin dépôt | `[Module]/[SousModule]/[Fonctionnalité]/` |

Tous les paramètres sont modifiables via instruction en langage naturel.

## Exemples

### Entrée (user story en français)
> En tant qu'utilisateur SRD, je veux me connecter à l'application afin d'accéder à mes fonctionnalités.

### Sortie (extrait CSV)
```csv
Test ID;Summary;Description;Repository;Preconditions;Test Steps;Expected Results;Priority;Labels
;Connexion réussie avec identifiants valides;Vérifier la connexion avec des identifiants corrects;Auth/Connexion/;"- Application accessible
- Utilisateur valide existant";"1. Ouvrir l'URL
2. Saisir identifiant et mot de passe
3. Cliquer sur Connexion";"1. Page de connexion affichée
2. Champs acceptent la saisie
3. Redirection vers la page d'accueil";High;smoke,auth,positive
```

### Sortie (extrait JDD)
```json
{
  "metadata": { "description": "JDD Auth", "version": "1.0.0" },
  "entrants": { "identifiant": "adminsrd", "motDePasse": "***" },
  "sortants": { "titrePageAccueil": "Accueil", "messageChargement": "Chargement du module en cours..." }
}
```

## Intégration

- Le CSV produit est compatible avec l'import Xray pour Jira
- Le JDD JSON suit la convention `fixtures/jdd/SRD-[MODULE]-[NNN].json` du projet
- Les cas de test générés peuvent alimenter le skill `qa-automation` pour le scaffolding de tests automatisés Playwright

## Version

1.0.0
