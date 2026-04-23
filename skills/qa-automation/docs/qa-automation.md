# QA Automation

## Description

Skill d'automatisation de tests end-to-end avec Playwright et TypeScript, basé sur une architecture 3 couches stricte (spec → steps → POM) avec injection de dépendances par fixtures et données de test externalisées (JDD entrants/sortants).

Ce skill guide l'agent dans la création, la modification et le débogage de tests automatisés en suivant les conventions d'architecture établies. Il est générique et applicable à tout projet Playwright utilisant cette architecture.

## Cas d'usage

- Créer un nouveau test automatisé pour une fonctionnalité
- Ajouter un Page Object (POM) pour une nouvelle page/composant
- Écrire des Steps (étapes) encapsulant la logique métier
- Câbler les fixtures d'injection de dépendances pour un nouveau module
- Créer ou modifier les jeux de données de test (JDD)
- Déboguer un test qui échoue ou qui est instable (flaky)
- Configurer l'intégration CI/CD (Jenkins, GitHub Actions)

## Déclenchement

Le skill s'active quand l'utilisateur :
- Demande de « créer un test Playwright » ou « automatiser un scénario »
- Veut « ajouter un page object » ou « créer une page POM »
- Mentionne « fixture », « steps », « étapes de test »
- Demande de « déboguer un test » ou « corriger un test flaky »
- Veut « câbler un nouveau module » dans les fixtures
- Parle de « JDD », « données de test », « entrants/sortants »

## Fonctionnement

### Architecture 3 couches

```
tests/**/*.spec.ts          ← Couche 1 : Specs (orchestration uniquement)
src/utils/fixtures/*.ts     ← Injection de dépendances
src/steps/**/*.ts           ← Couche 2 : Steps (logique métier, pas de locators)
src/pages/**/*.ts           ← Couche 3 : POM (locators + interactions UI)
fixtures/jdd/*.json         ← Données de test (entrants/sortants)
```

### Workflow en 6 étapes

1. **Découvrir** — Explorer le code existant (fixtures, steps, pages, enums, types)
2. **Identifier la couche** — Déterminer quel fichier modifier selon la tâche
3. **Implémenter** — Suivre les règles strictes de chaque couche
4. **Câbler les fixtures** — Enregistrer les nouvelles pages/steps dans les fixtures
5. **Écrire le spec** — Orchestrer avec tags, annotations et données JDD
6. **Vérifier** — Exécuter, vérifier le rapport Allure, valider les assertions

### Règles d'or

1. `new PageX()` et `new StepsX()` — **UNIQUEMENT dans les fichiers fixture**
2. **Locators** — UNIQUEMENT dans le POM (Couche 3)
3. **Logique métier** — UNIQUEMENT dans les Steps (Couche 2)
4. **Specs** — orchestration uniquement, pas de logique
5. **JDD** — externaliser TOUTES les données de test
6. **Typage strict** — interfaces TypeScript pour les JDD, jamais `any`

## Configuration par défaut

| Paramètre | Valeur |
|---|---|
| Framework | Playwright + TypeScript |
| Pattern | Page Object Model + Component Object Model |
| Injection | Fixtures Playwright (test.extend) |
| Données | JDD JSON (entrants/sortants) |
| Rapports | Allure + JUnit (Xray) + HTML |
| Stratégie de locators | Accessibilité d'abord (getByRole > getByLabel > CSS) |

## Exemples

### Spec (Couche 1)
```typescript
import { test } from "../../src/utils/fixtures/module.fixtures";
import * as jdd from "../../fixtures/jdd/PRODUCT-MODULE-001.json";

test("XRAY-NNN TC_PRODUCT_MODULE_Test", {
  tag: "@XRAY-NNN",
  annotation: [{ type: "test_key", description: "XRAY-NNN" }],
}, async ({ etapesFeature }) => {
  await etapesFeature.navigateToFeature();
  await etapesFeature.createItem(jdd.entrants, jdd.sortants);
});
```

### POM (Couche 3)
```typescript
export class PageFeature extends BasePage {
  get submitButton() { return this.page.getByRole("button", { name: "Valider" }); }
  inputByLabel(label: string) { return this.page.getByLabel(label); }
}
```

## Intégration

- Le skill `manual-test-designer` génère des cas de test CSV → ce skill les automatise
- Les résultats sont exportés vers Xray via JUnit XML (`results/junit/results.xml`)

## Version

2.0.0
