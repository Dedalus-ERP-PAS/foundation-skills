# Code Patterns & Examples

## Pattern: Multi-Step Form (Wizard)

For forms with multiple volets/steps navigated via "Suivant"/"Valider" buttons.

**POM (Layer 3)**:
```typescript
async fillWizardStep1(entrants: Step1Data): Promise<void> {
  await this.inputByLabel("Libellé").fill(entrants.label);
  await this.setToggleByLabel(entrants.isTemplate, "Template");
  await this.searchAndSelect("Category", entrants.category);
  await this.headerActionBtn(HeaderAction.SUIVANT).click();
}

async fillWizardStep2(entrants: Step2Data): Promise<void> {
  await this.setToggleByLabel(false, "Select all");
  for (const item of entrants.selections) {
    await this.searchAndSelect("Items", item);
  }
  await this.headerActionBtn(HeaderAction.SUIVANT).click();
}

async submitWizard(): Promise<void> {
  await this.headerActionBtn(HeaderAction.VALIDER).click();
  await this.waitForLoaderToFinish(this.internalProgressBar);
}
```

**Steps (Layer 2)**:
```typescript
async createItemViaWizard(entrants: ItemEntrants, sortants: ItemSortants): Promise<void> {
  logger.step(`Creating: "${entrants.step1.label}"`);
  await this.pageFeature.openCreationForm(sortants.addButtonText);
  await this.pageFeature.fillWizardStep1(entrants.step1);
  await this.pageFeature.fillWizardStep2(entrants.step2);
  await this.pageFeature.submitWizard();
  await this.pageFeature.verifyItemCreated(sortants);
  logger.success(`Created: "${entrants.step1.label}"`);
}
```

---

## Pattern: Search & Select (Proxy Selector)

For fields with a search input that filters and selects from a dropdown.

```typescript
// Single value
async searchAndSelect(section: string, value: string): Promise<void> {
  const searchInput = this.getSearchInputBySection(section);
  await searchInput.fill(value);
  await this.getSearchValue(value).click();
  await searchInput.clear();
}

// Multiple values
async searchAndSelectMultiple(section: string, values: string[]): Promise<void> {
  for (const value of values) {
    await this.searchAndSelect(section, value);
  }
}
```

---

## Pattern: Filter Panel Dropdown

```typescript
async filterBy(filterName: string, value: string): Promise<void> {
  await this.dropdownArrow(filterName).click();
  await this.dropdownSearchInput(filterName).fill(value);
  await this.dropdownOption(filterName, value).click();
  // Close dropdown overlay
  await this.page.locator(".extendedPanel").dblclick();
}
```

---

## Pattern: Navigation to a Module Feature

**Steps (Layer 2)** — always uses enums discovered from the project's components:

```typescript
async navigateToFeature(): Promise<void> {
  await this.navigation.navigateToHome();
  await this.navigation.goToSubMenu(
    EntryPoint.MODULE_NAME,       // from ActionBar.ts enum
    SubMenuItem.FEATURE_NAME,     // from SideBar.ts enum
    ContextSelection.CONTEXT      // from SideBar.ts enum (optional)
  );
}
```

**Important**: Read the project's `ActionBar.ts` and `SideBar.ts` to discover available `EntryPoint`, `SubMenuItem`, and `ContextSelection` enum values.

---

## Pattern: CRUD with In-Test Cleanup

Always clean up test data in the **same test** to avoid orphan data if subsequent tests fail:

```typescript
async ({ etapesFeature }) => {
  // Create
  await etapesFeature.navigateToFeature();
  await etapesFeature.createItem(jdd.entrants, jdd.sortants);

  // Verify
  await etapesFeature.verifyItemDetails(jdd.entrants);

  // Cleanup in same test — NOT in afterEach
  await etapesFeature.deleteItem(jdd.entrants.identifier);
}
```

**Exception**: Use `test.afterEach` only when a test specifically validates deletion behavior.

---

## Pattern: Assert Detail Panel

After creating or selecting an item, verify all expected values are displayed:

```typescript
async verifyItemDetails(entrants: ItemEntrants, sortants: ItemSortants): Promise<void> {
  const panel = this.detailsPanel;
  await expect(panel).toContainText(entrants.label);
  await expect(panel).toContainText(entrants.category);
  await expect(panel).toContainText(sortants.statusLabel);
}
```

---

## Pattern: Allure/Xray Reporting

### Test Naming & Annotations (mandatory)

```typescript
test(
  "XRAY-KEY-NNN TC_PRODUCT_MODULE_Description",
  {
    tag: "@XRAY-KEY-NNN",
    annotation: [
      { type: "test_key", description: "XRAY-KEY-NNN" },
      { type: "test_summary", description: "TC_PRODUCT_MODULE_Description" },
    ],
  },
  async ({ etapesFeature }) => { /* ... */ }
);
```

### Suite Tags

```typescript
test.describe("Feature", { tag: ["@regression", "@moduleName"] }, () => {
  // All tests in this describe inherit the tags
});
```

### Tag Conventions

| Tag | Purpose | When to use |
|---|---|---|
| `@smoke` | Critical path tests | Login, core navigation, main happy path |
| `@regression` | Full regression suite | All stable functional tests |
| `@XRAY-KEY-NNN` | Xray traceability | Every test linked to a test case |
| `@moduleName` | Module grouping | All tests in a module |

### Logger for Allure Steps

```typescript
import { logger } from "@utils/Logger";

logger.step("Navigating to feature");     // Creates Allure step
logger.action("Clicking submit button");  // Sub-action within step
logger.info("Item count: 5");             // Informational log
logger.success("Item created");           // Green success marker
logger.warn("Slow response detected");    // Warning marker
logger.error("Unexpected state");         // Error marker
```

---

## Anti-Patterns

| Wrong | Correct | Why |
|---|---|---|
| `new PageFeature(page)` in spec | Only in fixture file | Breaks DI pattern, hard to maintain |
| Locators in steps files | Locators only in POM | Steps should be UI-agnostic |
| `import { test } from "@playwright/test"` in feature spec | Import from module fixture | Misses fixture injection |
| Hard-coded strings in spec | Use JDD `sortants` values | Breaks data-driven approach |
| `page.locator(".btn").click()` in spec | Call `etapes.doAction()` | Violates layer separation |
| Business logic in spec body | Delegate to steps methods | Specs are orchestration only |
| `any` for JDD data | Typed interfaces | Catches errors at compile time |
| `page.waitForTimeout(1000)` | `waitForLoaderToFinish()` or auto-wait | Flaky, wastes time |
| Cleanup in `afterEach` | Cleanup in same test body | Avoids orphan data on failure |
| Relative imports `../../../` | Path aliases `@pages/`, `@steps/` | Brittle, hard to refactor |
