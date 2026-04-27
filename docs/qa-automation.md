# qa-automation

Skill d'automatisation de tests **end-to-end** avec **Playwright** et **TypeScript**, basé sur une architecture 3 couches stricte (Spec → Steps → POM) avec injection de dépendances par fixtures et données de test externalisées (JDD entrants/sortants).

## Pourquoi ce skill

- **Architecture disciplinée** — Séparation stricte des responsabilités : aucun locator dans les specs, aucune logique métier dans les POM
- **Maintenabilité maximale** — Les données de test sont externalisées dans des fichiers JSON typés ; aucune chaîne de caractères codée en dur dans les tests
- **Traçabilité Xray** — Chaque test porte ses annotations `test_key` et `test_summary` pour la remontée automatique dans Jira/Xray
- **Intégration continue** — Configuration CI/CD ready avec tags (`@smoke`, `@regression`, `@wip`) et rapports Allure + JUnit

## Quand utiliser ce skill

- Créer un nouveau test automatisé pour une fonctionnalité
- Ajouter un Page Object Model (POM) pour une nouvelle page ou composant
- Écrire des Steps encapsulant la logique métier d'un flux
- Câbler les fixtures d'injection de dépendances pour un nouveau module
- Créer ou modifier des jeux de données de test (JDD JSON)
- Déboguer un test qui échoue ou qui est instable (flaky)
- Mettre en place la stratégie de tags pour CI/CD

## Architecture 3 couches

```
tests/**/*.spec.ts          ← Couche 1 : Specs (orchestration UNIQUEMENT)
    ↓ importe fixture
src/utils/fixtures/*.ts     ← Injection de dépendances (câblage UNIQUEMENT)
    ↓ injecte
src/steps/**/*.ts           ← Couche 2 : Steps (logique métier, PAS de locators)
    ↓ appelle méthodes de
src/pages/**/*.ts           ← Couche 3 : POM (locators + interactions UI UNIQUEMENT)
    ↑ lit
fixtures/jdd/*.json         ← Données de test : entrants (inputs) / sortants (attendus)
```

### Règles d'or

| Règle | Description |
|-------|-------------|
| **Instanciation** | `new PageX()` et `new StepsX()` — UNIQUEMENT dans les fichiers fixture |
| **Locators** | UNIQUEMENT dans le POM (Couche 3), jamais dans specs ni steps |
| **Logique métier** | UNIQUEMENT dans les Steps (Couche 2), jamais dans les specs |
| **Specs** | Orchestration uniquement — appel de méthodes steps, pas d'interaction page directe |
| **JDD** | Externaliser TOUTES les données de test ; aucune chaîne codée en dur |
| **Typage** | Interfaces TypeScript pour les JDD, jamais `any` |

## Workflow en 6 étapes

| Étape | Action |
|-------|--------|
| 1. Découvrir | Explorer le codebase : fixtures, steps, pages, enums, types, `conf.json` |
| 2. Identifier la couche | Déterminer quel fichier créer/modifier selon la tâche |
| 3. Implémenter | Suivre les règles strictes de la couche concernée |
| 4. Câbler les fixtures | Enregistrer les nouvelles pages/steps dans le fichier fixture du module |
| 5. Écrire le spec | Orchestrer avec tags Xray, annotations et import JDD |
| 6. Vérifier | Exécuter `npx playwright test`, contrôler le rapport Allure, valider les assertions |

## Correspondance tâche ↔ couche

| Tâche | Couche | Pattern de fichier |
|-------|--------|--------------------|
| Nouvelle interaction UI | POM | `src/pages/[module]/PageFeature.ts` |
| Nouveau flux métier | Steps | `src/steps/[module]/EtapesFeature.ts` |
| Nouveau scénario de test | Spec | `tests/[module]/feature.spec.ts` |
| Nouvelles données de test | JDD | `fixtures/jdd/[PRODUIT]-[MODULE]-[NNN].json` |
| Câblage d'un nouveau module | Fixture | `src/utils/fixtures/[module].fixtures.ts` |

## Exemples de code

### Spec (Couche 1) — Orchestration uniquement

```typescript
import { test } from "../../src/utils/fixtures/module.fixtures";
import * as jdd from "../../fixtures/jdd/PRODUCT-MODULE-001.json";

test.describe("Fiches plat — Création", { tag: ["@regression", "@fichesPlatModule"] }, () => {
  test(
    "ERPPASTEST-001 TC_SRD_FP_Creation_libelle_nominal",
    {
      tag: "@ERPPASTEST-001",
      annotation: [
        { type: "test_key", description: "ERPPASTEST-001" },
        { type: "test_summary", description: "TC_SRD_FP_Creation_libelle_nominal" },
      ],
    },
    async ({ etapesFichesPlatCreation }) => {
      await etapesFichesPlatCreation.navigateToFichesPlat();
      await etapesFichesPlatCreation.creerFicheNewPlat(jdd.entrants, jdd.sortants);
    }
  );
});
```

### Steps (Couche 2) — Logique métier, pas de locators

```typescript
export class EtapesFichesPlatCreation {
  constructor(
    private readonly navigation: Navigation,
    private readonly pageFichesPlatCreation: PageFichesPlatCreation
  ) {}

  async creerFicheNewPlat(entrants: FPEntrants, sortants: FPSortants): Promise<void> {
    logger.step(`Création fiche plat : "${entrants.volet1.libelle}"`);
    await this.pageFichesPlatCreation.ouvrirFormulaireCreation(sortants.texteBtnAjoutPlat);
    await this.pageFichesPlatCreation.remplirVolet1(entrants.volet1);
    await this.pageFichesPlatCreation.remplirVolet2(entrants.volet2);
    await this.pageFichesPlatCreation.valider();
    await this.pageFichesPlatCreation.verifierCreation(sortants);
    logger.success(`Fiche plat créée : "${entrants.volet1.libelle}"`);
  }
}
```

### JDD JSON — Données externalisées (entrants/sortants)

```json
{
  "metadata": {
    "description": "Création d'une fiche plat nominale — volets 1 et 2",
    "version": "1.0.0",
    "lastUpdated": "2026-04-23"
  },
  "entrants": {
    "volet1": {
      "libelle": "Curry de poulet au lait de coco",
      "famillePlat": "VVPO",
      "sousFamille": "Viande - volaille"
    },
    "volet2": {
      "destinations": ["CHBA", "CHU", "Cité ADM"]
    }
  },
  "sortants": {
    "texteBtnAjoutPlat": "Ajouter un plat",
    "texteFormCreationFP": "Création d'une fiche plat",
    "messageFicheCreee": "Fiche plat créée avec succès"
  }
}
```

## Stratégie de locators

| Priorité | Méthode | Exemple |
|----------|---------|---------|
| 1 (préféré) | `getByRole` | `page.getByRole('button', { name: 'Valider' })` |
| 2 | `getByLabel` | `page.getByLabel('Libellé')` |
| 3 | `getByTestId` | `page.getByTestId('submit-btn')` |
| 4 (dernier recours) | CSS sémantique | `page.locator('[data-module="fiches-plat"]')` |
| À éviter | CSS fragile | `page.locator('.btn-primary:nth-child(3)')` |

## Stratégie de tags

| Tag | Usage | Quand exécuté |
|-----|-------|---------------|
| `@smoke` | Chemin critique, must-pass | Chaque pipeline |
| `@regression` | Couverture régression complète | Nuit / release |
| `@moduleName` | Regroupement par module | Exécutions ciblées |
| `@XRAY-KEY-NNN` | Traçabilité Xray | Test individuel |
| `@wip` | Travail en cours | Exclu du CI |

```bash
# Exécution par tag
npx playwright test --grep @smoke
npx playwright test --grep @regression
npx playwright test --grep @ERPPASTEST-001
```

## Checklist nouveau test

```
[ ] 1. Créer le JDD            fixtures/jdd/[PRODUIT]-[MODULE]-NNN.json
[ ] 2. Créer les types TS      src/types/[feature].types.ts (interfaces entrants/sortants)
[ ] 3. Créer le POM            src/pages/[module]/PageFeature.ts (extends BasePage)
[ ] 4. Exporter depuis index   src/pages/[module]/index.ts
[ ] 5. Créer les Steps         src/steps/[module]/[feature]/EtapesFeature.ts
[ ] 6. Exporter depuis index   src/steps/index.ts
[ ] 7. Créer/màj la fixture    src/utils/fixtures/[module].fixtures.ts
[ ] 8. Exporter depuis index   src/utils/fixtures/index.ts
[ ] 9. Créer le spec           tests/[module]/feature.spec.ts
[ ] 10. Exécuter et vérifier   npx playwright test tests/[module]/feature.spec.ts
```

## Contenu du skill

| Fichier | Description |
|---------|-------------|
| `SKILL.md` | Instructions principales — workflow et règles d'or |
| `reference/architecture.md` | Guide complet des 3 couches, fixtures, configuration d'environnement |
| `reference/patterns.md` | Patterns réutilisables : wizard multi-étapes, search & select, filtres, CRUD |
| `reference/locator-strategy.md` | Stratégie accessibilité-first, locators personnalisés, attentes et stabilité |
| `reference/test-data.md` | Structure JDD : entrants/sortants, typage, nommage, nettoyage |
| `reference/checklist.md` | Checklist nouvelle feature, stratégie de tags, débogage, CI/CD |

## Intégration avec manual-test-designer

Le skill **`manual-test-designer`** génère des cas de test manuels (CSV Xray) et des fichiers JDD JSON. Ces fichiers servent de base d'entrée pour `qa-automation` :

```
manual-test-designer  ──►  CSV Xray + JDD JSON  ──►  qa-automation
   (conception manuelle)     (données structurées)     (automatisation Playwright)
```

Les fichiers JDD produits par `manual-test-designer` respectent exactement le format `entrants/sortants` consommé par ce skill.

## Installation

```bash
npx skills add Dedalus-ERP-PAS/foundation-skills --skill qa-automation -g -y
```

## Utilisation

Demandez à votre agent IA d'automatiser un scénario de test :

> « Crée un test Playwright pour la création d'une fiche plat. Utilise le JDD `fixtures/jdd/SRD-FP-001.json` et suit l'architecture 3 couches du projet. »

L'agent :
1. Explore le codebase pour comprendre les fixtures, steps et pages existants
2. Identifie les couches à créer ou modifier
3. Génère le POM, les Steps, la fixture et le spec en respectant les règles d'or
4. Câble l'injection de dépendances
5. Fournit la commande d'exécution et les tags appropriés
