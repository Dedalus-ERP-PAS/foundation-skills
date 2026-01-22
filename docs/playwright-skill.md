# playwright-skill

Tests et automatisation web complète avec Playwright (JavaScript/Node.js).

## Vue d'ensemble

Skill complet pour tester et automatiser des sites web :
- ✅ Gestion du cycle de vie des serveurs
- ✅ Tests de webapps dynamiques (React, Vue, Angular)
- ✅ Reconnaissance DOM automatique
- ✅ Screenshots multi-viewports
- ✅ Tests de formulaires, login flows, liens cassés
- ✅ Navigateur visible par défaut pour débogage

## Workflow

1. **Vérifier si serveur tourne** - Détection auto ou démarrage serveur
2. **Écrire script dans /tmp** - Jamais dans le répertoire du projet
3. Patterns courants

### Test responsive (multi-viewports)

```javascript
const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:3000';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  const viewports = [
    { name: 'Desktop', width: 1920, height: 1080 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Mobile', width: 375, height: 667 },
  ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto(TARGET_URL);
    await page.screenshot({ 
      path: `/tmp/${viewport.name.toLowerCase()}.png`,
      fullPage: true 
    });
  }

  await browser.close();
})();
```

### Test login flow

```javascript
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('http://localhost:3000/login');
  
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');

  await page.waitForURL('**/dashboard');
  console.log('✅ Login réussi');

  await browser.close();
})();
```

### Vérifier liens cassés

```javascript
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');

  const links = await page.locator('a[href^="http"]').all();
  const results = { ok: 0, broken: [] };

  for (const link of links) {
    const href = await link.getAttribute('href');
    try {
      const response = await page.request.head(href);
      response.ok() ? results.ok++ : results.broken.push(href);
    } catch (e) {
      results.broken.push(href);
    }
  }

  console.log(`✅ ${results.ok} liens OK`);
  console.log(`❌ Liens cassés:`, results.broken);

  await browser.close();
})();
(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // ÉTAPE 1: Naviguer et attendre le contenu dynamique
  await page.goto(TARGET_URL);
  await page.waitForLoadState('networkidle'); // CRITIQUE pour apps dynamiques

  // ÉTAPE 2: Reconnaissance - découvrir ce qui est sur la page
  await page.screenshot({ path: '/tmp/inspect.png', fullPage: true });
  
  const buttons = await page.locator('button').all();
  console.log(`Trouvé ${buttons.length} boutons`);
  
  for (let i = 0; i < buttons.length; i++) {
    const text = await buttons[i].textContent();
    console.log(`  Bouton ${i}: "${text}"`);
  }
API essentielle

### Navigation et attentes

```javascript
// Naviguer
await page.goto('http://localhost:3000', {
  waitUntil: 'networkidle'  // Attendre que le réseau soit inactif
});

// Attentes
await page.waitForSelector('.modal');
await page.waitForURL('**/dashboard');
await page.waitForLoadState('networkidle');
```

### Interactions

```javascript
// Clic
await page.click('button#submit');

// Saisie
await page.fill('input[name="email"]', 'test@example.com');
await page.type('#username', 'testuser', { delay: 100 });

// Checkbox
await page.check('input[type="checkbox"]');

// Select
await page.selectOption('select#country', 'france');
```

### Assertions et découverte

```javascript
// Vérifier visibilité
const isVisible = await page.locator('button').isVisible();

// Récupérer texte
const text = await page.locator('h1').textContent();

// Trouver tous les éléments
const allButtons = await page.locator('button').all();
console.log(`Trouvé ${allButtons.length} boutons`);
```

## Bonnes pratiques

### ✅ À faire

- **Attendre networkidle sur apps dynamiques** - Toujours utiliser `waitForLoadState('networkidle')` avant inspection
- **Pattern reconnaissance** - Screenshot, inspection DOM, puis action
- **Navigateur visible** - `headless: false` par défaut pour débogage facile
- **Sélecteurs descriptifs** - Utiliser `text=`, `role=` ou attributs data
- **Gestion erreurs** - Toujours wrapper dans try-catch
- **Nettoyer ressources** - Fermer navigateur et arrêter serveurs

### ❌ À éviter

- **Ne pas inspecter avant networkidle** - Le DOM peut ne pas être prêt
- **Pas de timeouts fixes** - Utiliser `waitForSelector()` au lieu de `waitForTimeout()`
- **Ne pas écrire dans le projet** - Toujours utiliser `/tmp`
- **Pas d'URLs hardcodées** - Utiliser constantes en haut du script

## Cas d'usage

- **Tests visuels** - Screenshots multi-viewports, design responsive
- **Tests fonctionnels** - Login, formulaires, navigation, gestion erreurs
- **Validation** - Liens cassés, images, performance, accessibilité
- **Automatisation** - Remplir formulaires, extraire données, générer rapports
    console.log('✅ Bouton login cliqué');
  }

  await browser.close();
})();
```

## Gestion de serveur

### Démarrer serveur avant test

```javascript
// /tmp/playwright-test-with-server.js
const { chromium } = require('playwright');
const { spawn } = require('child_process');

const TARGET_URL = 'http://localhost:3000';

(async () => {
  // Démarrer serveur
  console.log('Démarrage du serveur...');
  const server = spawn('npm', ['run', 'dev'], { shell: true });
  
  server.stdout.on('data', (data) => console.log(`Serveur: ${data}`));
  server.stderr.on('data', (data) => console.error(`Erreur serveur: ${data}`));

  // Attendre que le serveur soit prêt
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Exécuter tests
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.goto(TARGET_URL);
  await page.waitForLoadState('networkidle');
  
  // Votre logique de test ici
  console.log('Titre:', await page.title());
  
  await browser.close();
  
  // Nettoyer le serveur
  server.kill();
  console.log('✅ Tests terminés, serveur arrêté');
})();
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
