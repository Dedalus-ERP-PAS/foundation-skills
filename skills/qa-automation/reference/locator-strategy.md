# Locator Strategy — Accessibility-First

## Locator Priority Hierarchy

Always prefer the highest available method. Fall back only when necessary.

| Priority | Method | When to use | Example |
|---|---|---|---|
| 1 (best) | `getByRole()` | Buttons, links, headings, checkboxes, textboxes | `page.getByRole("button", { name: "Submit" })` |
| 2 | `getByLabel()` | Form inputs with visible labels | `page.getByLabel("Email")` |
| 3 | `getByText()` | Static text content, menu items | `page.getByText("Welcome", { exact: true })` |
| 4 | `getByPlaceholder()` | Inputs with placeholder text (no label) | `page.getByPlaceholder("Search...")` |
| 5 | `getByTestId()` | Elements with `data-testid` attribute | `page.getByTestId("submit-btn")` |
| 6 | CSS selector | Custom components, complex structures | `page.locator(".custom-widget .inner")` |
| 7 (last) | XPath | Legacy DOM, no other option | Avoid if at all possible |

**Rule**: If you find yourself writing a CSS selector, first check if the element has a role, label, or text content you can use instead.

---

## Locator Patterns in POM

### Simple Locators as Getters

For elements that don't need parameters:

```typescript
get submitButton() {
  return this.page.getByRole("button", { name: "Valider" });
}

get pageTitle() {
  return this.page.getByRole("heading", { level: 1 });
}

get searchInput() {
  return this.page.getByPlaceholder("Rechercher");
}
```

### Parameterized Locators as Methods

For elements that vary by label, text, or index:

```typescript
inputByLabel(label: string) {
  return this.page.getByLabel(label);
}

menuItem(name: string) {
  return this.page.getByRole("menuitem", { name });
}

tabByName(name: string) {
  return this.page.getByRole("tab", { name });
}
```

### Composite Locators

When simple role/label selectors don't work, compose locators:

```typescript
// Input inside a specific section
inputInSection(sectionLabel: string) {
  return this.page
    .locator(".form-section", { has: this.page.getByText(sectionLabel) })
    .locator("input");
}

// Button with specific icon (no text)
addButton(tooltip: string) {
  return this.page.locator(`button[title="${tooltip}"]`);
}

// Nth item in a list
listItem(index: number) {
  return this.page.getByRole("listitem").nth(index);
}
```

### Filtering Locators

```typescript
// Filter by child content
rowWithText(text: string) {
  return this.page.getByRole("row").filter({ hasText: text });
}

// Filter by child element
rowWithButton(buttonName: string) {
  return this.page.getByRole("row").filter({
    has: this.page.getByRole("button", { name: buttonName })
  });
}
```

---

## Waiting Strategies

### Prefer Auto-Wait (default)

Playwright auto-waits for elements before acting. **Do not add explicit waits unless necessary.**

```typescript
// GOOD — auto-waits for button to be visible and enabled
await this.submitButton.click();

// BAD — unnecessary explicit wait
await this.submitButton.waitFor({ state: "visible" });
await this.submitButton.click();
```

### When Explicit Waits ARE Needed

#### After async operations (save, load, navigation):
```typescript
await this.headerActionBtn(HeaderAction.VALIDER).click();
await this.waitForLoaderToFinish(this.internalProgressBar);
```

#### After navigation with WebSocket data loading:
```typescript
await this.navigation.goToSubMenu(entry, subMenu, context);
await this.waitForWebSocketIdle();
```

#### Waiting for an element to disappear:
```typescript
await this.page.locator(".loading-spinner").waitFor({ state: "hidden" });
```

#### Waiting for network idle after navigation:
```typescript
await this.page.waitForLoadState("networkidle");
```

### NEVER Use Fixed Timeouts

```typescript
// NEVER do this — flaky and slow
await this.page.waitForTimeout(2000);

// INSTEAD — wait for a specific condition
await this.page.waitForLoadState("networkidle");
await this.loader.waitFor({ state: "hidden" });
await expect(this.successMessage).toBeVisible();
```

**Exception**: `page.waitForTimeout()` is acceptable only in debugging sessions, never in committed code.

---

## Assertion Patterns

### Visibility Assertions

```typescript
await expect(this.pageTitle).toBeVisible();
await expect(this.errorBanner).not.toBeVisible();
await expect(this.submitButton).toBeEnabled();
await expect(this.submitButton).toBeDisabled();
```

### Text Content Assertions

```typescript
await expect(this.pageTitle).toHaveText("Expected Title");
await expect(this.pageTitle).toContainText("Partial");
await expect(this.statusBadge).toHaveText(/Active|Enabled/);
```

### Form Value Assertions

```typescript
await expect(this.inputByLabel("Name")).toHaveValue("John");
await expect(this.checkbox).toBeChecked();
await expect(this.checkbox).not.toBeChecked();
```

### Count Assertions

```typescript
await expect(this.page.getByRole("listitem")).toHaveCount(5);
await expect(this.page.getByRole("row")).toHaveCount(11); // 10 data + 1 header
```

### URL Assertions

```typescript
await expect(this.page).toHaveURL(/.*\/dashboard/);
await expect(this.page).toHaveTitle("Dashboard");
```

### Soft Assertions (non-blocking)

For checks that should not stop the test:

```typescript
await expect.soft(this.footer).toContainText("v2.0");
await expect.soft(this.breadcrumb).toBeVisible();
// Test continues even if these fail
```

---

## Locator Anti-Patterns

| Wrong | Correct | Why |
|---|---|---|
| `page.locator("#submit")` | `page.getByRole("button", { name: "Submit" })` | IDs are brittle, roles are semantic |
| `page.locator(".btn-primary")` | `page.getByRole("button", { name: "Save" })` | Class names change, roles don't |
| `page.locator("div > span:nth-child(3)")` | `page.getByText("Expected text")` | DOM structure changes break deep selectors |
| `page.locator("input[type='text']")` | `page.getByLabel("Field name")` | Multiple text inputs exist, label is unique |
| `page.waitForTimeout(3000)` | `await expect(el).toBeVisible()` | Fixed waits are slow and flaky |
| `page.$(selector)` | `page.locator(selector)` | `$` is deprecated, locator is lazy + auto-waits |
