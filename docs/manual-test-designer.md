# manual-test-designer

Génère des cas de test manuels structurés et prêts à importer dans **Xray** (format CSV), ainsi que des jeux de données de test (fichiers JDD JSON), à partir d'user stories, de descriptions de fonctionnalités ou de critères d'acceptation.

## Pourquoi ce skill

- **Gain de temps** — Transforme des user stories en jeux de tests complets en quelques minutes
- **Qualité garantie** — Applique systématiquement les techniques de conception de tests (EP, BVA, Decision Tables, State Transition, Pairwise, Error Guessing)
- **Zéro redondance** — Déduplique agressivement : un cas de test par classe d'équivalence, pas de variantes inutiles
- **Prêt pour l'automation** — Les JDD générés sont directement réutilisables par le skill `qa-automation` pour scaffolder des tests Playwright

## Quand utiliser ce skill

- Rédiger les cas de test d'une nouvelle fonctionnalité avant le développement
- Créer un fichier CSV à importer dans Xray/Jira
- Générer des données de test structurées (fichiers JDD JSON)
- Préparer les scénarios de recette fonctionnelle
- Assurer la couverture des cas nominaux, limites, erreurs et règles métier

## Workflow en 5 étapes

| Étape | Action |
|-------|--------|
| 1. Analyser | Lire l'user story, identifier les exigences testables, les champs de saisie et les règles métier |
| 2. Sélectionner | Choisir les techniques de conception selon le type d'entrées détectées |
| 3. Concevoir | Générer les cas de test (nominal, limite, invalide, erreur, règle métier) sans doublons |
| 4. Générer le CSV | Produire le fichier CSV en 9 colonnes, séparateur `;`, prêt pour Xray |
| 5. Générer le JDD | (optionnel) Créer le fichier JSON `fixtures/jdd/` avec entrants et sortants |

## Techniques de conception appliquées

| Technique | Déclencheur |
|-----------|-------------|
| **Equivalence Partitioning (EP)** | Tout champ de saisie (texte, dropdown, toggle) |
| **Boundary Value Analysis (BVA)** | Champs numériques, longueurs de chaînes, dates, listes |
| **Decision Tables** | Combinaisons de conditions → résultats différents |
| **State Transition** | Formulaires multi-étapes, changements de statut, workflows |
| **Pairwise Testing** | 3+ paramètres indépendants avec plusieurs valeurs |
| **Error Guessing** | Toujours — complète les techniques formelles |

## Format de sortie

### CSV Xray (9 colonnes)

```
Test ID;Summary;Description;Repository;Preconditions;Test Steps;Expected Results;Priority;Labels
```

| Colonne | Description |
|---------|-------------|
| `Test ID` | Laisser vide pour les nouveaux tests (Xray assigne la clé à l'import) |
| `Summary` | Titre concis : `[Action principale] — [contexte/variante]` |
| `Description` | Description fonctionnelle courte (1-3 phrases) |
| `Repository` | Chemin hiérarchique : `Module/SousModule/Fonctionnalité/` |
| `Preconditions` | Liste à puces (`- `) des pré-requis avant exécution |
| `Test Steps` | Étapes numérotées avec verbe d'action et données concrètes |
| `Expected Results` | Résultats numérotés, observables, spécifiques |
| `Priority` | `High` (P0) / `Medium` (P1) / `Low` (P2) |
| `Labels` | Tags CSV : `smoke,auth,positive` ou `regression,negative` |

### Niveaux de priorité

| Priorité | Usage |
|----------|-------|
| **P0 — High** | Chemin bloquant. Si ce test échoue, la fonctionnalité est inutilisable. Smoke tests, règles métier critiques. |
| **P1 — Medium** | Fonctionnel cœur. Scénarios de régression, gestion des erreurs principales, validations clés. |
| **P2 — Low** | Cas limites, validations cosmétiques, fonctionnalités de confort, exploration des frontières. |

### JDD JSON (optionnel)

Fichier structuré externalisant les données d'entrée (`entrants`) et les résultats attendus (`sortants`) :

```json
{
  "metadata": {
    "description": "Jeu de données pour les cas de test de la fonctionnalité X",
    "version": "1.0.0",
    "lastUpdated": "2026-04-23"
  },
  "entrants": {
    "champLibelle": "Curry de poulet au lait de coco",
    "famillePlat": "VVPO",
    "destinations": ["CHBA", "CHU"]
  },
  "sortants": {
    "texteFormCreation": "Création d'une fiche plat",
    "messageErreurLibelleVide": "Le champ Libellé est obligatoire",
    "texteBtnAjouter": "Ajouter un plat"
  }
}
```

## Paramètres par défaut (modifiables)

| Paramètre | Valeur par défaut |
|-----------|-------------------|
| Langue du contenu | Français |
| Séparateur CSV | `;` (point-virgule) |
| Format ID de test | `TC-[MODULE]-[NNN]` |
| Format nom de test | `TC_[PRODUIT]_[MODULE]_[FEATURE]_[ID]_[NOM]` |
| Chemin JDD | `fixtures/jdd/[PRODUIT]-[MODULE]-[NNN].json` |

## Contenu du skill

| Fichier | Description |
|---------|-------------|
| `SKILL.md` | Instructions principales — workflow en 5 étapes |
| `reference/csv-format-guide.md` | Spécification complète des 9 colonnes CSV + règles de rédaction |
| `reference/test-design-techniques.md` | Quand et comment appliquer EP, BVA, Decision Tables, State Transition, Pairwise, Error Guessing |
| `reference/jdd-generation.md` | Guide de génération des fichiers JDD JSON (entrants/sortants, nommage, mapping) |
| `reference/examples.md` | Exemples complets de CSV et JDD pour différents types de fonctionnalités |

## Intégration avec qa-automation

Le CSV généré par ce skill (et les fichiers JDD JSON) servent de base d'entrée pour le skill **`qa-automation`** :

```
manual-test-designer  ──►  CSV Xray + JDD JSON  ──►  qa-automation
   (conception manuelle)     (données structurées)     (automatisation Playwright)
```

Les fichiers JDD générés respectent exactement le format `entrants/sortants` attendu par l'architecture 3 couches du skill `qa-automation`.

## Installation

```bash
npx skills add Dedalus-ERP-PAS/foundation-skills --skill manual-test-designer -g -y
```

## Utilisation

Fournissez une user story, une description de fonctionnalité ou des critères d'acceptation :

> « Génère les cas de test pour la fonctionnalité de création d'une fiche plat. Un plat a un libellé (obligatoire, max 100 chars), une famille (dropdown obligatoire), et une liste de destinations (multi-sélection, au moins une requise). »

L'agent :
1. Identifie les exigences testables et les règles de validation
2. Applique EP, BVA et Decision Tables sur les champs concernés
3. Génère un CSV à 9 colonnes prêt pour import Xray
4. Propose optionnellement un fichier JDD JSON associé
