---
name: hexagone-web-feature-extractor
description: "Explore any Hexagone Web space via Playwright headless browser, capture screenshots, and produce a PO-oriented Markdown document."
version: 2.0.0
---

# Hexagone Web Feature Extractor

Explore a Hexagone Web functional space, capture screenshots of every page/tab, and produce a Markdown document (.md) oriented for Product Owners with functional descriptions and embedded screenshots.

## Prerequisites

- **Node.js** installed
- **Playwright** npm package (`npm install playwright`) — installs headless Chromium automatically
- Network access to the Hexagone Web server (default: `https://ws004202.dedalus.lan:8065/hexagone-01/vue/login`)

## Configuration

Default values calibrated for the standard Hexagone Web layout at 1920x1080. Adjust if the layout differs.

| Parameter | Default | Description |
|-----------|---------|-------------|
| Viewport | `1920x1080` | Browser viewport size |
| Sidebar click X coordinate | `38` | Horizontal pixel position for sidebar icon clicks (collapsed mode) |
| Sidebar max left boundary | `280` | Max `rect.left` value to identify sidebar links (expanded mode) |
| Header height offset | `55` | Min `rect.top` value to exclude header elements |
| Login wait timeout | `30s` | Max time to poll for successful login |
| Page load wait timeout | `10s` | Max time to poll for page load after navigation |
| Screenshots directory | `./screenshots` | Where screenshots are saved (relative to working directory) |

## Workflow Overview

```
1. SETUP        → Install Playwright, launch headless Chromium
2. CONNECTION   → Log in to Hexagone Web
3. NAVIGATION   → Navigate to the target space
4. DISCOVERY    → Expand sidebar, list all menu pages
5. EXPLORATION  → Visit each page, capture screenshots + metadata
6. GENERATION   → Produce the Markdown document with embedded screenshots
```

**Key advantage over Chrome extension approach**: Screenshots save directly to disk via `page.screenshot()` — no bridge server or transfer step needed.

---

## Step 1: Setup

### 1.1 Install Playwright

```bash
npm install playwright
npx playwright install chromium
```

### 1.2 Launch Browser

```javascript
const { chromium } = require('playwright');

const browser = await chromium.launch({
  headless: true,
  args: ['--ignore-certificate-errors', '--no-sandbox']
});
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  ignoreHTTPSErrors: true  // Handles self-signed certs automatically
});
const page = await context.newPage();
```

**Why headless Chromium?** Eliminates the need for manual SSL certificate acceptance, Chrome extension setup, and screenshot bridge transfers. The `ignoreHTTPSErrors: true` option handles self-signed certificates programmatically.

---

## Step 2: Connection to Hexagone Web

### 2.1 Navigate to Login Page

```javascript
await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
await sleep(3000); // Wait for Vue.js to mount
```

### 2.2 Fill the Login Form

The Hexagone Web login form has 3 fields: Username, Password, Manager code. Default credentials: username `apvhn` with a random password, unless the user provides others.

Use `page.evaluate()` with the native setter pattern — **required for Vue.js** which does not detect value changes injected directly:

```javascript
await page.evaluate(({ username, password }) => {
  const nativeSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype, 'value'
  ).set;

  const userInput = document.querySelector('input[type="text"]');
  if (userInput) {
    nativeSetter.call(userInput, username);
    userInput.dispatchEvent(new Event('input', { bubbles: true }));
  }

  const pwdInput = document.querySelector('input[type="password"]');
  if (pwdInput) {
    nativeSetter.call(pwdInput, password);
    pwdInput.dispatchEvent(new Event('input', { bubbles: true }));
  }

  const loginBtn = Array.from(document.querySelectorAll('button'))
    .find(b => /connect/i.test(b.textContent));
  if (loginBtn) loginBtn.click();
}, { username: USERNAME, password: PASSWORD });
```

### 2.3 Verify Connection

**Poll every 2s for up to 30s** until the URL no longer contains `/login`:

```javascript
for (let i = 0; i < 15; i++) {
  await sleep(2000);
  if (!page.url().includes('/login')) break;
}
```

**If login fails**: Take a debug screenshot with `page.screenshot()` and report the failure.

---

## Step 3: Navigation to the Target Space

### 3.1 Open the Space Selector

**CRITICAL**: Use `page.mouse.click()` — NOT `el.click()` via `page.evaluate()`.

Vue.js event handlers require native mouse events (mousedown + mouseup + click). JavaScript's `el.click()` only dispatches the `click` event and **will not trigger the space dropdown**. This was the #1 bug found during development.

The space selector is the `div` with class `bg:orange-dark` in the orange breadcrumb bar. It contains an icon `<i class="hexa-icons">changer_espaces</i>` followed by a `<span>` with the current space name.

```javascript
// Find the space selector coordinates
const selectorRect = await page.evaluate(() => {
  for (const el of document.querySelectorAll('div, span')) {
    const cls = typeof el.className === 'string' ? el.className : '';
    if (cls.includes('bg:orange-dark') && !cls.includes('uppercase') && !cls.includes('hover:')) {
      const rect = el.getBoundingClientRect();
      if (rect.top > 30 && rect.top < 70 && rect.height > 15) {
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      }
    }
  }
  return null;
});

// Click with REAL mouse events (mandatory for Vue.js)
await page.mouse.click(selectorRect.x, selectorRect.y);
await sleep(3000);
```

### 3.2 Select the Space

The dropdown renders inside the sidebar area as a list of `<div>` elements with class `px:1 py:3/4 hover:bg:orange-dark cursor:pointer`. Spaces are listed alphabetically.

```javascript
// Find the target space element
const target = await page.evaluate((spaceName) => {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
  while (walker.nextNode()) {
    const el = walker.currentNode;
    if (el.textContent.trim() === spaceName) {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0 && rect.top > 30) {
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      }
    }
  }
  return null;
}, TARGET_SPACE);

// Click with mouse (not el.click())
await page.mouse.click(target.x, target.y);
```

### 3.3 Wait for Loading

Hexagone Web redirects via an intermediate "Connexion... Redirection..." page. **Poll every 2s for up to 24s** until the URL no longer contains `patient-portal` (the default landing space):

```javascript
for (let i = 0; i < 12; i++) {
  await sleep(2000);
  if (!page.url().includes('patient-portal')) break;
}
await sleep(3000); // Extra wait for Vue.js rendering
```

---

## Step 4: Page Discovery

### 4.1 Expand the Sidebar

The sidebar is collapsed by default (icons only, width ~65px). Click the hamburger menu to expand it and reveal text labels:

```javascript
await page.mouse.click(34, 50); // Hamburger icon position
await sleep(2000);
```

### 4.2 Identify Sidebar Menu Entries

**Primary method**: Look for elements with `cursor:pointer` class in the left 280px. Strip icon text from `<i class="hexa-icons">` children:

```javascript
const menuItems = await page.evaluate((excludeLabels) => {
  const items = [];
  const seen = new Set();
  const allEls = document.querySelectorAll('[class*="cursor:pointer"], a');
  for (const el of allEls) {
    const rect = el.getBoundingClientRect();
    if (rect.left < 280 && rect.top > 55 && rect.height > 15 && rect.height < 60) {
      let text = el.textContent.trim();
      // Strip icon prefix text
      const icon = el.querySelector('i');
      if (icon) text = text.replace(icon.textContent.trim(), '').trim();
      if (!text || text.length <= 1 || text.length >= 60 || seen.has(text)) continue;
      if (excludeLabels.includes(text)) continue;
      // Skip section headers (all-caps short text like "ACHATS")
      if (/^[A-Z ]+$/.test(text) && text.length < 15) continue;
      seen.add(text);
      items.push({
        label: text,
        y: Math.round(rect.top + rect.height / 2),
        x: Math.round(rect.left + rect.width / 2)
      });
    }
  }
  return items;
}, ['Trier par Importance', 'Trier par Emetteur']);
```

**Sidebar DOM structure** (observed):
```html
<div class="sidebar--section min-w:sidebar bg:teal-darker">
  <div class="py:1 transition cursor:pointer w:inherit hover:bg:teal-dark">
    <div class="flex items:center whitespace:no-wrap">
      <i class="hexa-icons text:3/2" aria-label="Fournisseurs">fournisseurs</i>
      <span class="sidebar--label">Fournisseurs</span>
    </div>
  </div>
</div>
```

**Note**: The old `a.hexa` selector does NOT work for all spaces. The sidebar elements are `<div>` elements with `cursor:pointer` class, not `<a>` tags.

### 4.3 Items to Exclude

Filter out UI elements that are not pages:
- `Trier par Importance` / `Trier par Emetteur` — sort buttons in the Mes Post-Its panel
- Section headers (all-caps short text like `ACHATS`) — section dividers, not clickable pages

### 4.4 Validation Gate

**If zero items are found after discovery**: Stop the exploration and take a debug screenshot. Do NOT proceed with an empty page list. Save the DOM to a debug file for analysis.

### 4.5 Collapse Sidebar

After discovery, collapse the sidebar before starting exploration:
```javascript
await page.mouse.click(34, 50); // Toggle hamburger
await sleep(1000);
```

---

## Step 5: Exploration and Capture

### 5.1 For Each Page in the Menu

**CRITICAL**: The sidebar collapses after clicking a menu item. You MUST re-expand the sidebar and re-discover the item's position before each click.

```
For each menu item:
  1. Expand sidebar: page.mouse.click(34, 50), wait 1.5s
  2. Re-discover the item position via page.evaluate() (label matching)
  3. Click the item: page.mouse.click(freshPos.x, freshPos.y)
  4. Wait for page load (networkidle + 1.5s extra)
  5. Take screenshot: page.screenshot({ path: ... })
  6. Extract metadata via page.evaluate()
  7. If tabs found, explore them (see 5.2)
  8. Build feature description with PO-oriented text
```

**Why re-discover each time?** The sidebar re-renders its content when expanded. Item coordinates shift depending on scroll position and which items are visible. Using stale coordinates from the initial discovery will click on the main content area instead of the sidebar.

### 5.2 Identify Internal Tabs

Some pages have internal tabs (e.g., Fournisseurs → Saisie / Consultation / Réalisé, Marchés → SAISIE / CONSULTATION / DÉBLOCAGE). Use `page.mouse.click()` for tabs too:

```javascript
const tabCoords = await page.evaluate((label) => {
  for (const tab of document.querySelectorAll('[role="tab"], .v-tab')) {
    if (tab.textContent.trim() === label) {
      const rect = tab.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
  }
  return null;
}, tabLabel);

if (tabCoords) {
  await page.mouse.click(tabCoords.x, tabCoords.y);
  await sleep(2500);
  await page.screenshot({ path: tabScreenshotPath });
}
```

**Warning**: The selector `[class*="tab"]` is too broad — it matches pagination controls, filter dropdowns, and elements from previously rendered pages. Prefer `[role="tab"]` or `.v-tab` for tab detection.

### 5.3 Take Screenshots

Screenshots save directly to disk — no bridge or transfer needed:

```javascript
await page.screenshot({
  path: path.join(SCREENSHOT_DIR, `${index}-${sanitize(pageName)}.png`),
  fullPage: false  // Capture viewport only (1920x1080)
});
```

### 5.4 Store Metadata

Build a `features.json` array during exploration with PO-oriented descriptions enriched from page content analysis (tables, forms, actions, tabs).

---

## Step 6: Markdown Document Generation

### 6.1 Prepare the Input

Create a `features.json` file from the metadata collected in Step 5. The file must conform to this structure:

```json
{
  "space": "Name of the explored space",
  "features": [
    {
      "title": "Feature name (string, required)",
      "description": "PO-oriented functional description (string, required)",
      "capabilities": ["Capability 1", "Capability 2"],
      "businessValue": "Business value description (string)",
      "screenshots": [
        { "file": "filename.png", "caption": "Screenshot description" }
      ]
    }
  ]
}
```

**Validation rules:**
- `space` must be a non-empty string
- `features` must be a non-empty array
- Each feature must have `title` (string) and `description` (string)
- `capabilities` must be an array of strings (can be empty)
- `screenshots` must be an array of objects with `file` (string) and `caption` (string)

### 6.2 Generate the Document

Use the script `scripts/generate-md.js`:

```bash
node scripts/generate-md.js --input features.json --output /path/to/output.md --screenshots /path/to/screenshots
```

The `--input` argument is **required**. The script validates the input and fails with clear error messages if the JSON is malformed. No `npm install` needed — the script uses only Node.js built-in modules.

### 6.3 Document Structure

```
# Title (space name)
> Subtitle with date

## Table of contents (linked)

For each feature:
  ## N. Feature title
  - Functional description
  - Screenshot(s) as ![caption](relative/path)
  ### Key capabilities (numbered list)
  ### Business value
  ---
```

### 6.4 Validation and Output

Verify the generated file exists and contains all expected features:

```bash
grep -c '^## [0-9]' output.md  # Should match the number of features
```

---

## Input Parameters

The user must provide:
- **Login URL** *(optional)*: defaults to `https://ws004202.dedalus.lan:8065/hexagone-01/vue/login`. The user can provide a different URL if needed.
- **Username** *(optional)*: defaults to `apvhn`. The user can provide a different code if needed.
- **Password** *(optional)*: defaults to a random value. The user can provide a specific password if needed.
- **Target space**: Exact name of the space to explore (e.g., "HA GHT", "STRUCTURES / NOMENCLATURES")

## Critical Rules (learned from production runs)

1. **Always use `page.mouse.click()`** for any Vue.js interaction — NEVER use `el.click()` via `page.evaluate()`. Vue.js requires native mousedown/mouseup events that only `page.mouse.click()` provides.
2. **Re-expand sidebar before every page click** — the sidebar collapses after each navigation. Using stale coordinates from initial discovery will miss the sidebar entirely.
3. **Re-discover item positions each iteration** — sidebar coordinates shift on re-render. Always query the DOM for fresh coordinates.
4. **Use `[class*="cursor:pointer"]` not `a.hexa`** for sidebar items — sidebar elements are `<div>` elements, not `<a>` tags.
5. **Strip `<i class="hexa-icons">` text** from sidebar labels — icon text is prepended (e.g., `tdbTableau de bord` → `Tableau de bord`).
6. **Exclude utility buttons** like "Trier par Importance" from the page list — they are sort controls in the Post-Its panel, not pages.
7. **Use narrow tab selectors** (`[role="tab"]`, `.v-tab`) — `[class*="tab"]` is too broad and picks up pagination, filters, and stale elements from previously rendered pages.

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| Space dropdown does not open | Used `el.click()` instead of `page.mouse.click()` | Always use `page.mouse.click()` for Vue.js interactions |
| All page screenshots are identical | Sidebar collapsed, clicks miss sidebar items | Re-expand sidebar + re-discover coordinates before each click |
| Sidebar items not found | Used `a.hexa` selector | Use `[class*="cursor:pointer"]` with icon text stripping |
| Too many "tabs" detected | Broad selector `[class*="tab"]` | Use `[role="tab"]` or `.v-tab` only |
| "Trier par Importance" in page list | Sort button mistaken for page | Add to exclude list: `['Trier par Importance', 'Trier par Emetteur']` |
| Fields not detected by Vue.js | Direct value injection without events | Use `nativeInputValueSetter` + `dispatchEvent('input')` |
| Login button click selects wrong button | Multiple buttons on page | Use text-content matching: `buttons.find(b => /connect/i.test(b.textContent))` |
| Page content not loaded after click | Slow server or heavy page | Use `page.waitForLoadState('networkidle')` + extra sleep |
| SSL certificate error | Self-signed cert on Hexagone Web server | `ignoreHTTPSErrors: true` in browser context (handled automatically) |
| `generate-md.js` fails with validation error | Malformed features.json | Check required fields: `space`, `features[].title`, `features[].description` |
