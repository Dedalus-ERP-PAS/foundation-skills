# Checklist, CI/CD & Debugging

## New Feature Checklist

When adding automated tests for a new feature, follow these steps in order:

```
[ ] 1. Create JDD file           fixtures/jdd/[PRODUCT]-[MODULE]-NNN.json
[ ] 2. Create TypeScript types    src/types/[feature].types.ts (entrants/sortants interfaces)
[ ] 3. Create Page Object         src/pages/[module]/PageFeature.ts (extends BasePage)
[ ] 4. Export from page index     src/pages/[module]/index.ts
[ ] 5. Create Steps file          src/steps/[module]/[feature]/EtapesFeature.ts
[ ] 6. Export from steps index    src/steps/index.ts
[ ] 7. Create/update fixture      src/utils/fixtures/[module].fixtures.ts
[ ] 8. Export from fixture index  src/utils/fixtures/index.ts
[ ] 9. Create spec file           tests/[module]/feature.spec.ts
[ ] 10. Run and verify            npx playwright test tests/[module]/feature.spec.ts
```

### Naming Conventions

| Layer | File pattern | Class pattern |
|---|---|---|
| POM | `PageFeatureName.ts` | `class PageFeatureName extends BasePage` |
| Steps | `EtapesFeatureName.ts` | `class EtapesFeatureName` |
| Fixture | `module.fixtures.ts` | exported `test` and `expect` |
| Spec | `featureName.spec.ts` | `test.describe(...)` |
| JDD | `PRODUCT-MODULE-NNN.json` | N/A |
| Types | `feature.types.ts` | `interface FeatureEntrants` / `interface FeatureSortants` |

---

## Test Tagging Strategy

### Tag Hierarchy

```typescript
// Suite-level tags (on test.describe)
test.describe("Feature", { tag: ["@regression", "@moduleName"] }, () => {

  // Test-level tags (on individual test)
  test("Test name", { tag: "@XRAY-KEY-NNN" }, async () => {});
});
```

### Standard Tags

| Tag | Purpose | Runs when |
|---|---|---|
| `@smoke` | Critical path, must-pass | Every pipeline run |
| `@regression` | Full regression coverage | Nightly / release |
| `@moduleName` | Module grouping | Module-specific runs |
| `@XRAY-KEY-NNN` | Xray traceability | Single test by key |
| `@wip` | Work in progress | Excluded from CI |

### Running by Tag

```bash
npx playwright test --grep @smoke
npx playwright test --grep @regression
npx playwright test --grep @XRAY-KEY-127
npx playwright test --grep-invert @wip
```

---

## Running Tests

### Local Development

```bash
# All tests
npx playwright test

# Specific file
npx playwright test tests/module/feature.spec.ts

# Specific test by name
npx playwright test -g "test name pattern"

# By tag
npx playwright test --grep @smoke

# With specific environment
TEST_ENV=dev npx playwright test

# Headed mode (see the browser)
npx playwright test --headed

# UI mode (interactive)
npx playwright test --ui

# Debug mode (step-by-step)
npx playwright test --debug
```

### CI Pipeline

```bash
# Typical CI command
TEST_ENV=staging npx playwright test --grep @regression --reporter=list,junit,allure-playwright

# Smoke tests only (fast gate)
TEST_ENV=staging npx playwright test --grep @smoke

# With retries
npx playwright test --retries=2
```

---

## Debugging Guide

### 1. Trace Viewer (post-mortem)

Traces are captured automatically on failure (configured in `playwright.config.ts`).

```bash
# Open trace for a failed test
npx playwright show-trace test-results/test-name/trace.zip
```

The trace shows: screenshots at each step, DOM snapshots, network requests, console logs.

### 2. Headed Mode (watch it run)

```bash
npx playwright test --headed tests/module/feature.spec.ts
```

### 3. Inspector (step-by-step)

```bash
npx playwright test --debug tests/module/feature.spec.ts
```

Opens the Playwright Inspector: step through actions, inspect locators, explore the DOM.

### 4. Pause in Code

Add `await page.pause()` temporarily in a test to open the inspector mid-execution:

```typescript
async ({ etapesFeature, page }) => {
  await etapesFeature.navigateToFeature();
  await page.pause(); // Opens inspector HERE — remove before commit
  await etapesFeature.createItem(jdd.entrants, jdd.sortants);
}
```

### 5. Screenshot on Demand

```typescript
await this.takeScreenshot("debug-state"); // Saved to test-results/
```

### 6. Verbose Logging

```bash
DEBUG=pw:api npx playwright test tests/module/feature.spec.ts
```

---

## CI/CD Integration Patterns

### Playwright Config for CI

Key settings that differ between local and CI:

```typescript
// playwright.config.ts
export default defineConfig({
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,  // Serial in CI, parallel locally
  use: {
    trace: "on-first-retry",        // Capture traces only on retry
    screenshot: "only-on-failure",   // Screenshots only when tests fail
    video: "retain-on-failure",      // Video only when tests fail
  },
  reporter: [
    ["list"],
    ["html", { open: "never" }],                              // HTML report
    ["allure-playwright"],                                     // Allure report
    ["junit", { outputFile: "results/junit/results.xml" }],   // Xray import
  ],
});
```

### Jenkins Pipeline (typical)

```groovy
stage('E2E Tests') {
  steps {
    sh 'npm ci'
    sh 'npx playwright install --with-deps chromium'
    sh "TEST_ENV=${params.ENVIRONMENT} npx playwright test --grep @regression"
  }
  post {
    always {
      junit 'results/junit/results.xml'
      allure includeProperties: false, results: [[path: 'allure-results']]
      publishHTML(target: [reportDir: 'playwright-report', reportFiles: 'index.html'])
    }
  }
}
```

### GitHub Actions (typical)

```yaml
- name: Run Playwright tests
  run: npx playwright test --grep @regression
  env:
    TEST_ENV: staging
- uses: actions/upload-artifact@v4
  if: always()
  with:
    name: test-results
    path: |
      playwright-report/
      allure-results/
      results/junit/results.xml
```

---

## Test Isolation & Parallel Safety

### Rules

1. **No shared mutable state** — each test creates its own data and cleans up
2. **No test ordering dependencies** — every test must run independently
3. **Unique test data** — append timestamps or UUIDs to avoid collisions
4. **StorageState for auth** — login once in setup project, reuse via `storageState`
5. **No global variables** — use fixtures for shared context

### Auth Setup Pattern

```typescript
// tests/commons/login.setup.ts
import { test as setup } from "@playwright/test";

setup("authenticate", async ({ page }) => {
  await page.goto(loginUrl);
  await page.getByLabel("Username").fill(credentials.username);
  await page.getByLabel("Password").fill(credentials.password);
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForURL("**/home");
  await page.context().storageState({ path: ".auth/login.json" });
});
```

```typescript
// playwright.config.ts
projects: [
  { name: "setup", testMatch: "**/login.setup.ts" },
  {
    name: "chromium",
    dependencies: ["setup"],
    use: { storageState: ".auth/login.json" },
  },
]
```

### Global Setup (clean auth state)

```typescript
// global-setup.ts
import { rm } from "fs/promises";

export default async function globalSetup() {
  await rm(".auth", { recursive: true, force: true });
}
```

---

## Flakiness Prevention

| Cause | Fix |
|---|---|
| Element not yet visible | Use `await expect(el).toBeVisible()` before interaction |
| Async data loading | Use `waitForLoaderToFinish()` or `waitForWebSocketIdle()` |
| Animation in progress | Wait for animation end or stable state |
| Stale element reference | Playwright locators are lazy — re-evaluate automatically |
| Race condition in test data | Use unique data per test run |
| Network latency | Use `waitForLoadState("networkidle")` sparingly |
| Clock-dependent tests | Mock time with `page.clock` API |
