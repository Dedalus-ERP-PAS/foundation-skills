# Test Data (JDD) — Structure & Management

## What is JDD?

**JDD** = Jeux De Données (test data files). They externalize ALL test input and expected output data from test code, making tests data-driven and maintainable.

**Location**: `fixtures/jdd/`

---

## JSON Structure

Every JDD file has three sections:

```json
{
  "metadata": {
    "description": "Functional description of this test data set",
    "version": "1.0.0",
    "lastUpdated": "YYYY-MM-DD"
  },
  "entrants": {
    // Inputs — what the test types, selects, toggles in the UI
  },
  "sortants": {
    // Expected outputs — what the test asserts/verifies in the UI
  }
}
```

### `entrants` — Input Data

Everything the test **enters** into the UI: text fields, selections, toggles, dates.

```json
{
  "entrants": {
    "step1": {
      "label": "Product name",
      "isActive": true,
      "category": "Category A",
      "subCategory": "Sub B"
    },
    "step2": {
      "targets": ["Target 1", "Target 2", "Target 3"]
    },
    "step3": {
      "options": ["Option A", "Option C"],
      "quantity": 5
    }
  }
}
```

### `sortants` — Expected Output

Everything the test **verifies**: button labels, form titles, success messages, error texts.

```json
{
  "sortants": {
    "addButtonText": "Add item",
    "formTitle": "Create new item",
    "successMessage": "Item created successfully",
    "errorMessages": {
      "labelRequired": "The label field is required",
      "duplicateLabel": "An item with this name already exists"
    }
  }
}
```

---

## File Naming Convention

```
[PRODUCT]-[MODULE_CODE]-[NNN].json
```

| Part | Description | Examples |
|---|---|---|
| `PRODUCT` | Product/project prefix | `APP`, `ERP`, `CRM` |
| `MODULE_CODE` | Short module identifier | `FP` (feature), `NAV` (navigation), `AUTH` (auth) |
| `NNN` | Sequential number, zero-padded | `001`, `002`, `010` |

**Examples**: `APP-FP-001.json`, `ERP-AUTH-001.json`, `CRM-USERS-003.json`

**Shared data file**: `[PRODUCT]-Commun.json` — credentials, common texts, shared references.

---

## TypeScript Interfaces for JDD

**Always** type your JDD data. Avoid `any`.

### Define interfaces in `src/types/`

```typescript
// src/types/feature.types.ts
export interface FeatureStep1Entrants {
  label: string;
  isActive: boolean;
  category: string;
  subCategory: string;
}

export interface FeatureStep2Entrants {
  targets: string[];
}

export interface FeatureEntrants {
  step1: FeatureStep1Entrants;
  step2: FeatureStep2Entrants;
}

export interface FeatureSortants {
  addButtonText: string;
  formTitle: string;
  successMessage: string;
  errorMessages: {
    labelRequired: string;
    duplicateLabel: string;
  };
}
```

### Use typed parameters in Steps and POM

```typescript
// Steps — typed parameters instead of any
async createItem(entrants: FeatureEntrants, sortants: FeatureSortants): Promise<void> {
  await this.pageFeature.fillStep1(entrants.step1);  // TypeScript validates
  await this.pageFeature.fillStep2(entrants.step2);
  await this.pageFeature.verify(sortants);
}

// POM — typed parameters
async fillStep1(data: FeatureStep1Entrants): Promise<void> {
  await this.inputByLabel("Label").fill(data.label);       // TS autocompletes
  await this.setToggleByLabel(data.isActive, "Active");
  await this.searchAndSelect("Category", data.category);
}
```

### Import JDD in specs

```typescript
import * as jdd from "../../fixtures/jdd/PRODUCT-MODULE-001.json";

// TypeScript infers types from JSON — jdd.entrants.step1.label is string
await etapesFeature.createItem(jdd.entrants, jdd.sortants);
```

**Note**: Enable `resolveJsonModule: true` in `tsconfig.json` for typed JSON imports.

---

## Data Type Mapping

| UI Element | JSON Type | Example |
|---|---|---|
| Text input | `string` | `"Product name"` |
| Toggle/checkbox | `boolean` | `true` |
| Single-select dropdown | `string` | `"Category A"` |
| Multi-select | `string[]` | `["A", "B", "C"]` |
| Numeric input | `number` | `42` |
| Date picker | `string` (ISO) | `"2026-04-18"` |
| File upload | `string` (path) | `"fixtures/files/test.pdf"` |

---

## Sortants Naming Conventions

Use prefixes to indicate what kind of expected value it is:

| Prefix | Meaning | Example |
|---|---|---|
| `texte*` | Expected text content | `texteFormTitle`, `texteBtnSave` |
| `message*` | Expected message | `messageErreurRequired`, `messageSucces` |
| `titre*` | Page/section title | `titrePageAccueil` |
| `label*` | Field label | `labelBoutonSuivant` |
| `count*` | Expected count | `countItems` |
| `url*` | Expected URL pattern | `urlRedirection` |

---

## Shared vs Feature-Specific Data

| File | Content | Used by |
|---|---|---|
| `PRODUCT-Commun.json` | Login credentials, common UI texts, shared references | All tests via `CommonSteps` |
| `PRODUCT-MODULE-NNN.json` | Feature-specific inputs and expected outputs | Specific feature spec |

**Rule**: Never duplicate shared data in feature files. Reference `Commun.json` for credentials, common labels, etc.

---

## Test Data Cleanup Strategies

### Strategy 1: Create + Delete in Same Test (preferred)

```typescript
async ({ etapesFeature }) => {
  await etapesFeature.createItem(jdd.entrants, jdd.sortants);
  await etapesFeature.verifyItem(jdd.entrants);
  await etapesFeature.deleteItem(jdd.entrants.step1.label);
}
```

### Strategy 2: Unique Data per Run

Add a timestamp or UUID suffix to avoid collisions in parallel runs:

```typescript
const uniqueLabel = `${jdd.entrants.step1.label} ${Date.now()}`;
```

### Strategy 3: Idempotent Setup

Use Playwright's `test.beforeAll` for shared data that multiple tests read but don't modify:

```typescript
test.beforeAll(async ({ browser }) => {
  // Create shared reference data via API if available
});
```

---

## Anti-Patterns

| Wrong | Correct | Why |
|---|---|---|
| Hard-coded strings in spec | Use JDD `sortants` | Data changes don't require code edits |
| `entrants: any` in steps | Typed interfaces | Catches errors at compile time |
| Credentials in feature JDD | Use shared `Commun.json` | Single source of truth for auth |
| Flat JDD structure | Group by form step/section | Easier to find and maintain data |
| Same label in all test runs | Add unique suffix | Avoids collisions in parallel execution |
| Mutable shared test data | Immutable or per-test data | Prevents test interdependence |
