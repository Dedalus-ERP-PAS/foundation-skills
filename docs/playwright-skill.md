# playwright-skill

Automatisation navigateur avec Playwright.

## Script de base

Scripts écrits dans `/tmp/playwright-test-*.js` :

```javascript
const { chromium } = require('playwright')

const browser = await chromium.launch({ headless: false })
const page = await browser.newPage()
await page.goto('http://localhost:3000')
await page.screenshot({ path: '/tmp/screenshot.png' })
await browser.close()
```

## Interactions

```javascript
// Clic
await page.click('button#submit')

// Saisie
await page.fill('input[name="email"]', 'test@example.com')

// Attente
await page.waitForSelector('.result')

// Navigation
await page.goto('https://example.com')
```

## Bonnes pratiques

- Toujours fermer le navigateur après utilisation
- Utiliser des sélecteurs robustes (data-testid, aria-label)
- Attendre les éléments avant d'interagir
