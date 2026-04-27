# Architecture Guide — 3-Layer Playwright Framework

## Layer Overview

Every project follows this strict separation:

```
tests/**/*.spec.ts          ← Layer 1: Specs (orchestration ONLY)
    ↓ imports fixture
src/utils/fixtures/*.ts     ← Fixture DI layer (wiring ONLY)
    ↓ injects into
src/steps/**/*.ts           ← Layer 2: Steps (business logic, NO locators)
    ↓ calls methods on
src/pages/**/*.ts           ← Layer 3: POM (locators + UI actions ONLY)
    ↑ reads
fixtures/jdd/*.json         ← Test data: entrants / sortants
```

---

## Layer 1 — Spec Files

**Location**: `tests/[module]/*.spec.ts`

**Rules**:
- Import `test` from the **module fixture**, never from `@playwright/test` directly
- Import JDD data as `* as jdd`
- Orchestration only — call step methods, never interact with the page directly
- Each test has: Xray tag, `test_key` + `test_summary` annotations
- Describe blocks use suite tags: `@regression`, `@smoke`, `@featureTag`

```typescript
import { test } from "../../src/utils/fixtures/module.fixtures";
import * as jdd from "../../fixtures/jdd/PRODUCT-MODULE-001.json";

test.describe("Feature — Description", { tag: ["@regression", "@feature"] }, () => {
  test(
    "XRAY-KEY-NNN TC_PRODUCT_MODULE_Test_name",
    {
      tag: "@XRAY-KEY-NNN",
      annotation: [
        { type: "test_key", description: "XRAY-KEY-NNN" },
        { type: "test_summary", description: "TC_PRODUCT_MODULE_Test_name" },
      ],
    },
    async ({ etapesFeature }) => {
      await etapesFeature.navigateToFeature();
      await etapesFeature.performAction(jdd.entrants, jdd.sortants);
    }
  );
});
```

**What NEVER belongs in a spec**:
- `page.locator(...)` — use step methods
- `await page.click(...)` — use step methods
- Hard-coded strings — use JDD `sortants`
- Business logic or conditionals — move to steps
- `new PageX(page)` — only in fixtures

---

## Layer 2 — Steps Files

**Location**: `src/steps/[module]/[feature]/EtapesFeature.ts`

**Rules**:
- Receives page objects via constructor injection (from fixtures)
- Contains business logic and test flow orchestration
- NEVER contains locators or direct `page.locator()` calls
- Uses `logger` for Allure step reporting
- Methods accept `entrants` (inputs) and `sortants` (expected outputs)

```typescript
import { logger } from "@utils/Logger";

export class EtapesFeature {
  constructor(
    private readonly navigation: Navigation,
    private readonly pageFeature: PageFeature
  ) {}

  async navigateToFeature(): Promise<void> {
    await this.navigation.navigateToHome();
    await this.navigation.goToSubMenu(
      EntryPoint.MODULE_NAME,
      SubMenuItem.FEATURE_NAME,
      ContextSelection.CONTEXT_NAME
    );
  }

  async createItem(entrants: FeatureEntrants, sortants: FeatureSortants): Promise<void> {
    logger.step(`Creating item: "${entrants.field}"`);
    await this.pageFeature.fillForm(entrants);
    await this.pageFeature.submitForm();
    await this.pageFeature.verifyCreation(sortants);
    logger.success(`Item created: "${entrants.field}"`);
  }
}
```

**What NEVER belongs in steps**:
- `this.page.locator(...)` — delegate to POM
- CSS selectors or XPath — delegate to POM
- Direct Playwright API calls — delegate to POM

---

## Layer 3 — Page Objects (POM)

**Location**: `src/pages/[module]/PageFeature.ts`

**Rules**:
- Extends `BasePage` (shared base with common utilities)
- Locators defined as **getters** (simple) or **methods** (parameterized)
- Contains ONLY UI interaction logic (click, fill, select, assert visibility)
- Uses accessibility-first locator strategy (see [locator-strategy.md](locator-strategy.md))
- Never contains business flow logic — that belongs in steps

```typescript
import { BasePage, HeaderAction } from "../core/BasePage";
import type { FeatureEntrants, FeatureSortants } from "@types";

export class PageFeature extends BasePage {
  // Simple locators as getters
  get addButton() { return this.page.getByRole("button", { name: "Add" }); }
  get formTitle() { return this.page.getByRole("heading", { level: 2 }); }

  // Parameterized locators as methods
  inputByLabel(label: string) {
    return this.page.getByLabel(label);
  }

  // UI interaction methods
  async fillForm(entrants: FeatureEntrants): Promise<void> {
    await this.inputByLabel("Label").fill(entrants.label);
    await this.setToggleByLabel(entrants.toggleValue, "Toggle field");
    await this.searchAndSelect("Category", entrants.category);
    await this.headerActionBtn(HeaderAction.SUIVANT).click();
  }

  async submitForm(): Promise<void> {
    await this.headerActionBtn(HeaderAction.VALIDER).click();
    await this.waitForLoaderToFinish(this.internalProgressBar);
  }

  async verifyCreation(sortants: FeatureSortants): Promise<void> {
    await expect(this.formTitle).toContainText(sortants.successTitle);
  }
}
```

---

## BasePage — Common Utilities

Every POM extends `BasePage` which provides:

```typescript
// Waiting
waitForWebSocketIdle(idleTime?, maxTimeout?)     // After navigation
waitForLoaderToFinish(loader: Locator)            // After saves
waitForLoaderDuringAction(action, loader)         // Wrap async action
checkPageCompletelyLoaded()                       // Full page ready

// Navigation
navigateTo(url: string)
goto() / reload() / goBack() / goForward()
getCurrentUrl() / getTitle()

// Form helpers
setToggleByLabel(shouldBeChecked: boolean, label: string)
headerActionBtn(action: HeaderAction): Locator    // "Suivant", "Valider"
confirmDeletion(action: "Continuer" | "Abandonner")

// DOM utilities
getText(locator) / getValue(locator) / getInnerText(locator)

// Storage
setLocalStorage(key, value) / getLocalStorage(key) / clearLocalStorage()

// Debug
takeScreenshot(name: string)
handleDialog(action: "accept" | "dismiss", promptText?: string)

// Allure
step(message: string) / log(message: string)

// Common locators (project-specific, check BasePage for actual selectors)
internalProgressBar / confirmationModal / moduleLoading / dataLoading
```

**Important**: BasePage locators (progress bars, modals, loaders) are project-specific. Always read the project's `BasePage.ts` to discover available selectors and methods.

---

## Fixture Composition {#fixture-composition}

Fixtures wire pages and steps together using Playwright's dependency injection.

### Base: `commons.fixtures.ts`

Provides core fixtures available to all modules:

```typescript
import { test as base, expect } from "@playwright/test";
import { PageConnexion } from "@pages/auth/PageConnexion";
import { Navigation } from "@pages/core/components/ActionBar";
import { SideBar } from "@pages/core/components/SideBar";
import { CommonSteps } from "@steps/CommonSteps";

// Internal pages (prefixed _, not accessible in specs)
interface _CorePageFixtures {
  _pageConnexion: PageConnexion;
  _navigation: Navigation;
  _sideBar: SideBar;
}

// Public steps (accessible in specs via async ({ commonSteps }) => {})
export interface CoreStepFixtures {
  commonSteps: CommonSteps;
}

export const test = base.extend<_CorePageFixtures & CoreStepFixtures>({
  _pageConnexion: async ({ page }, use) => { await use(new PageConnexion(page)); },
  _navigation: async ({ page }, use) => { await use(new Navigation(page)); },
  _sideBar: async ({ page }, use) => { await use(new SideBar(page)); },
  commonSteps: async ({ _pageConnexion, _navigation, _sideBar }, use) => {
    await use(new CommonSteps(_pageConnexion, _navigation, _sideBar));
  },
});
export { expect };
```

### Module: `[module].fixtures.ts`

Extends commons with module-specific pages and steps:

```typescript
import { test as baseTest, expect } from "./commons.fixtures";
import { PageFeature } from "@pages/module/PageFeature";
import { EtapesFeature } from "@steps/module/feature/EtapesFeature";

// Internal pages (wiring only)
interface _ModulePageFixtures {
  pageFeature: PageFeature;
}

// Public steps (exposed to specs)
export interface ModuleStepFixtures {
  etapesFeature: EtapesFeature;
}

export const test = baseTest.extend<_ModulePageFixtures & ModuleStepFixtures>({
  pageFeature: async ({ page }, use) => { await use(new PageFeature(page)); },
  etapesFeature: async ({ _navigation, pageFeature }, use) => {
    await use(new EtapesFeature(_navigation, pageFeature));
  },
});
export { expect };
```

### Convention: Private vs Public Fixtures

| Prefix | Visibility | Purpose |
|---|---|---|
| `_` prefix (`_navigation`) | Internal only | Injected into steps, NOT accessible in spec body |
| No prefix (`commonSteps`) | Public | Accessible in `async ({ commonSteps }) => {}` |

**Composition chain**: `commons.fixtures` → `module.fixtures` → spec imports from module fixture.

---

## Environment Configuration

### `fixtures/conf.json`

```json
{
  "environments": {
    "dev": {
      "baseUrl": "https://dev.example.com",
      "defaultPage": "https://dev.example.com/app#home",
      "modulePage": "https://dev.example.com/app#module"
    },
    "staging": { "..." : "..." },
    "production": { "..." : "..." }
  }
}
```

### Environment Resolution

```typescript
// Resolution order: TEST_ENV > ENVIRONMENT > default fallback
// Local: set in .env file → TEST_ENV=dev
// CI: set via pipeline variable → -e TEST_ENV=staging

getEnvUrl("defaultPage")   // → resolves to current env's defaultPage URL
getEnvUrl("modulePage")    // → resolves to current env's modulePage URL
```

**Important**: Always read the project's `framework.config.ts` and `conf.json` to discover available environment keys and URL patterns.

---

## Path Aliases

All projects use TypeScript path aliases (from `tsconfig.json`):

```typescript
"@pages/*"    → "src/pages/*"
"@steps/*"    → "src/steps/*"
"@utils/*"    → "src/utils/*"
"@fixtures/*" → "src/utils/fixtures/*"  // or "fixtures/*" depending on project
```

**Always use aliases** in imports — never use brittle relative paths like `../../../src/pages/`.

---

## Project Discovery Checklist

When working on a new project for the first time, explore these files to understand the conventions:

```
[ ] fixtures/conf.json               → Environment URLs and keys
[ ] src/config/framework.config.ts   → Env resolution logic, URL helpers
[ ] src/pages/core/BasePage.ts       → Available base methods and locators
[ ] src/pages/core/components/       → Navigation, sidebar, action bar enums
[ ] src/types/                       → TypeScript interfaces, navigation config
[ ] src/utils/fixtures/              → Existing fixture composition
[ ] src/steps/CommonSteps.ts         → Shared step methods (login, logout)
[ ] playwright.config.ts             → Projects, reporters, timeouts, retries
[ ] tsconfig.json                    → Path aliases
```
