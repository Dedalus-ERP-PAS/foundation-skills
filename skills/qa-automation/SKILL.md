---
name: qa-automation
description: "Expert Playwright/TypeScript test automation using a 3-layer architecture (spec → steps → POM), fixture dependency injection, and JDD test data (entrants/sortants). Use when creating, modifying, or debugging Playwright tests, page objects, step files, fixtures, or test data in projects following this architecture."
version: 2.0.0
---

# QA Automation — Playwright 3-Layer Architecture

## Architecture (mandatory for all projects)

```
tests/**/*.spec.ts          ← Layer 1: Specs (orchestration only)
    ↓ uses fixture
src/utils/fixtures/*.ts     ← Dependency injection (NO new elsewhere)
    ↓ injects
src/steps/**/*.ts           ← Layer 2: Steps (business logic, no locators)
    ↓ calls
src/pages/**/*.ts           ← Layer 3: POM (locators + UI interactions)
    ↑
fixtures/jdd/*.json         ← Test data: entrants (inputs) / sortants (expected)
```

## Golden Rules

1. `new PageX()` and `new StepsX()` — **ONLY inside fixture files**
2. **Locators** — ONLY in POM (Layer 3), never in specs or steps
3. **Business logic** — ONLY in Steps (Layer 2), never in specs
4. **Specs** — orchestration only: call step methods, pass JDD data
5. **JDD** — externalize ALL test data; no hardcoded strings in specs or steps
6. **Typed** — use TypeScript interfaces for JDD data, avoid `any`

## Workflow — Adding/Modifying Tests

### Step 1 — Discover the project

Explore the codebase: read existing fixtures, steps, pages, enums, types, and `conf.json` to understand available navigation, components, and conventions.

### Step 2 — Identify which layer to modify

| Task | Layer | File pattern |
|---|---|---|
| New UI interaction | POM | `src/pages/[module]/Page*.ts` |
| New business flow | Steps | `src/steps/[module]/Etapes*.ts` |
| New test scenario | Spec | `tests/[module]/*.spec.ts` |
| New test data | JDD | `fixtures/jdd/[PRODUCT]-[MODULE]-[NNN].json` |
| New module wiring | Fixture | `src/utils/fixtures/[module].fixtures.ts` |

### Step 3 — Implement following layer rules

See [architecture guide](reference/architecture.md) for layer-by-layer rules and examples.

### Step 4 — Wire fixtures

Register new pages/steps in the module's fixture file. See [architecture guide](reference/architecture.md#fixture-composition).

### Step 5 — Write/update spec

Use proper tags, annotations, and JDD imports. See [patterns](reference/patterns.md).

### Step 6 — Verify

Run tests, check Allure report, validate assertions. See [checklist](reference/checklist.md).

## Key References

- [Architecture guide](reference/architecture.md) — layers, fixtures, environment config
- [Code patterns](reference/patterns.md) — forms, navigation, CRUD, reporting, anti-patterns
- [Locator strategy](reference/locator-strategy.md) — accessibility-first, custom locators, waits
- [Test data (JDD)](reference/test-data.md) — entrants/sortants, typing, naming, cleanup
- [Checklist & CI/CD](reference/checklist.md) — new feature checklist, tagging, debugging, CI

## Integration

The `manual-test-designer` skill generates Xray-compatible CSV test cases. Use those as input to scaffold automated tests following this architecture.
