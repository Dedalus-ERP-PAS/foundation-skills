---
name: hexagone-web-feature-extractor
description: "Explore any Hexagone Web space via Claude in Chrome, capture screenshots, and produce a PO-oriented Markdown document."
version: 1.1.0
---

# Hexagone Web Feature Extractor

Explore a Hexagone Web functional space, capture screenshots of every page/tab, and produce a Markdown document (.md) oriented for Product Owners with functional descriptions and embedded screenshots.

## Prerequisites

- **Claude in Chrome** enabled and connected
- Network access to the Hexagone Web server (default: `https://ws004202.dedalus.lan:8065/hexagone-01/vue/login`)
- SSL certificate manually accepted if self-signed (user must do this before launching the skill)
- Node.js installed (no external dependencies needed)

## Configuration

Default values calibrated for the standard Hexagone Web layout at 1920x1080. Adjust if the layout differs.

| Parameter | Default | Description |
|-----------|---------|-------------|
| Sidebar click X coordinate | `38` | Horizontal pixel position for sidebar menu clicks |
| Sidebar max left boundary | `250` | Max `rect.left` value to identify sidebar links |
| Header height offset | `60` | Min `rect.top` value to exclude header elements |
| Login wait timeout | `20s` | Max time to poll for successful login |
| Page load wait timeout | `10s` | Max time to poll for page load after navigation |
| Screenshot bridge port | `8765` | HTTP port for the screenshot bridge server |
| Screenshots directory | `/home/claude/screenshots` | Where screenshots are saved (configurable via `--screenshots` arg) |

## Workflow Overview

```
1. CONNECTION   → Log in to Hexagone Web via Chrome
2. NAVIGATION   → Navigate to the target space
3. DISCOVERY    → List all sidebar menu pages
4. EXPLORATION  → Visit each page, capture screenshots + metadata
5. TRANSFER     → Transfer screenshots to the container filesystem
6. GENERATION   → Produce the Markdown document with embedded screenshots
```

---

## Step 1: Connection to Hexagone Web

### 1.1 Prepare the Chrome Tab

```
1. Call tabs_context_mcp(createIfEmpty=true) to get a tab
2. Create a dedicated tab: tabs_create_mcp()
3. Navigate to the login URL (default: `https://ws004202.dedalus.lan:8065/hexagone-01/vue/login`, unless the user provides another)
```

**IMPORTANT**: Initial navigation may fail (timeout) if the SSL certificate is not accepted. In that case:
- Ask the user to manually click "Advanced" > "Continue to site"
- Wait for the login page to display
- Resume control

### 1.2 Fill the Login Form

The Hexagone Web login form has 3 fields: Username, Password, Manager code. Default credentials: username `apvhn` with a random password, unless the user provides others.

**Recommended method**: Use native JavaScript to fill the fields. The `form_input` method works but button clicks may fail (`chrome-extension:// URL` error). Use JavaScript for the entire process:

```javascript
// Fill via JavaScript with event dispatching (required for Vue.js)
const nativeSetter = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype, 'value'
).set;

// Username (default: apvhn, unless user specifies another)
const userInput = document.querySelector('input[type="text"]');
nativeSetter.call(userInput, 'apvhn');
userInput.dispatchEvent(new Event('input', { bubbles: true }));
userInput.dispatchEvent(new Event('change', { bubbles: true }));

// Password (random by default, unless user specifies one)
const pwdInput = document.querySelector('input[type="password"]');
nativeSetter.call(pwdInput, 'Rand' + Math.random().toString(36).slice(2, 10));
pwdInput.dispatchEvent(new Event('input', { bubbles: true }));
pwdInput.dispatchEvent(new Event('change', { bubbles: true }));

// Click the login button — use text content to avoid selecting the wrong button
const buttons = Array.from(document.querySelectorAll('button'));
const loginBtn = buttons.find(b => /connect/i.test(b.textContent));
if (loginBtn) loginBtn.click();
```

**Why JavaScript?** The Vue.js framework in Hexagone Web does not detect value changes injected directly. The `nativeInputValueSetter` + `dispatchEvent('input')` simulates real user input.

### 1.3 Verify Connection

After clicking, **poll every 2s for up to 20s** until one of these conditions is met:
- The tab title changes (e.g., "Hexagone Web - Portail patient")
- A screenshot shows the home page with the "Bienvenue sur l'espace..." message

**If login fails after 20s**: Check for an error message element on the page (`document.querySelector('.error, .alert, [role="alert"]')`) and report the failure reason to the user.

---

## Step 2: Navigation to the Target Space

### 2.1 Open the Space Selector

The active space is displayed in the orange bar at the top (e.g., "PORTAIL PATIENT"). Click on it to open the dropdown list of all available spaces.

### 2.2 Select the Space

The dropdown (orange background) may require scrolling. Spaces are listed alphabetically. Scroll and click on the desired space.

### 2.3 Wait for Loading

Hexagone Web redirects via an intermediate "Connexion... Redirection..." page. **Poll every 2s for up to 15s** until:
- The URL has changed
- The breadcrumb displays the new space name

---

## Step 3: Page Discovery

### 3.1 Identify Sidebar Menu Entries

The sidebar (left side) contains icons without visible text by default. Use JavaScript to list them:

```javascript
const links = document.querySelectorAll('a.hexa');
const items = [];
links.forEach(el => {
  const rect = el.getBoundingClientRect();
  if (rect.left < 250 && rect.top > 60) {
    const raw = el.textContent.trim();
    items.push({
      label: raw,
      y: Math.round(rect.top)
    });
  }
});
JSON.stringify(items, null, 2);
```

**Typical sidebar structure**: Links have the CSS class `hexa`. The text is prefixed by the icon name (e.g., `tdbTableau de bord`, `lettres_budgetLettres budgets`). Extract the part after the icon prefix.

### 3.2 Validation Gate

**IMPORTANT**: After collecting items, verify the result:

```javascript
if (items.length === 0) {
  // Primary selector failed — try fallback selectors
  const fallbackLinks = document.querySelectorAll(
    '[data-menu-item], nav a, .sidebar a, .v-navigation-drawer a'
  );
  // Retry with wider bounding box: rect.left < 350 && rect.top > 40
  // If still zero items: STOP and report failure with DOM state
}
```

**If zero items are found after fallback**: Stop the exploration and report the failure. Do NOT proceed to Step 4 with an empty page list — this would produce an empty document.

### 3.3 Build the Exploration Plan

Create an ordered list of all pages to visit, with their Y coordinates for clicking. Exclude utility pages (Tableau de bord, Mes post-its) if not relevant to the PO deliverable.

---

## Step 4: Exploration and Capture

### 4.1 For Each Page in the Menu

```
1. Click on the menu entry (use the Y coordinate with x=38)
   - If direct click fails, use JavaScript: el.click()
2. Poll every 1s for up to 10s until the main content area has changed
   (compare URL fragment or main content container innerHTML before/after)
3. Take a screenshot: computer(action="screenshot", save_to_disk=true)
4. Extract key textual information via read_page or JavaScript
5. If the page has tabs, iterate through them one by one
6. If the page has sub-pages, explore them
7. Store the screenshot ID and metadata in a list
```

### 4.2 Identify Internal Tabs

Some pages have internal tabs (e.g., Plan comptable → Comptes de résultat / Tableau de financement / Comptes de tiers). Find them with:

```javascript
// Look for tabs by structural role
const tabs = document.querySelectorAll('[role="tab"]');
// Fallback if no ARIA roles
if (tabs.length === 0) {
  const tabLinks = document.querySelectorAll('.tab-link, .v-tab, [data-tab]');
}
```

### 4.3 Store Metadata

Maintain a JSON array of explored pages:

```json
[
  {
    "id": 1,
    "page": "Tableau de bord",
    "screenshotId": "ss_XXXXX",
    "description": "Synthetic view by fiscal year...",
    "tabs": [],
    "subpages": []
  }
]
```

---

## Step 5: Screenshot Transfer to the Container

### Known Limitation

Screenshots taken via `computer(action="screenshot")` are stored in memory by the Chrome extension with an ID (e.g., `ss_49478g4in`). They are **not** directly accessible from the container filesystem (`/home/claude/`).

### Solution: HTTP Bridge

Read the file `scripts/screenshot-bridge.md` for the complete transfer procedure.

**Summary**:
1. Start an HTTP server in the container (`scripts/screenshot-server.js`)
2. Navigate a Chrome tab to the bridge page (`http://localhost:8765/bridge.html`)
3. For each screenshot, use `upload_image(imageId, tabId, ref)` to upload via the bridge page's file input
4. JavaScript on the page sends the file to the server which saves it
5. Files are available in the screenshots directory

### Verification Gate

**IMPORTANT**: Before proceeding to Step 6, verify the screenshot transfer:

```bash
# Count files in screenshots directory
ls -1 /home/claude/screenshots/ | wc -l
```

Compare the count against the expected number of screenshots from Step 4. If screenshots are missing:
- Report which specific screenshots failed to transfer (compare filenames against the metadata list)
- Attempt to re-transfer missing screenshots
- If re-transfer fails, proceed to Step 6 but warn the user that the document will contain placeholder boxes for missing screenshots

---

## Step 6: Markdown Document Generation

### 6.1 Prepare the Input

Create a `features.json` file from the metadata collected in Step 4. The file must conform to this structure:

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
        { "file": "filename.jpg", "caption": "Screenshot description" }
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
- **Target space**: Exact name of the space to explore (e.g., "STRUCTURES / NOMENCLATURES")

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| Navigation timeout | SSL certificate not accepted | User must accept manually |
| `chrome-extension:// URL` error | Focus on extension popup | Use JavaScript instead of direct click |
| Fields not detected by Vue.js | Direct injection without events | Use `nativeInputValueSetter` + `dispatchEvent` |
| Dropdown menu not visible | Scroll needed | `scroll(direction="down")` in the menu |
| Screenshot not accessible from filesystem | Stored in Chrome extension memory | Use the HTTP bridge (Step 5) |
| Zero menu items discovered | CSS class `a.hexa` not matching | Try fallback selectors (see Step 3.2) |
| Login button click selects wrong button | Multiple buttons on page | Use text-content matching: `buttons.find(b => /connect/i.test(b.textContent))` |
| Page content not loaded after click | Slow server or heavy page | Use poll-based waiting instead of fixed delay |
| Screenshot bridge upload fails | Port 8765 already in use | Check port availability, try port 8766-8775 |
| Generated document has missing screenshot placeholders | Screenshots not transferred | Run verification gate (Step 5) before generation |
| `generate-md.js` fails with validation error | Malformed features.json | Check required fields: `space`, `features[].title`, `features[].description` |
