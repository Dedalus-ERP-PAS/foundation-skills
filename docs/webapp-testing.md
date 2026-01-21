# webapp-testing

Tests d'applications web avec Playwright Python.

## Avec gestion du serveur

```bash
python scripts/with_server.py --server "npm run dev" --port 5173 -- python test.py
```

## Pattern reconnaissance-puis-action

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5173')
    
    # Attendre que la page soit stable
    page.wait_for_load_state('networkidle')
    
    # Inspecter le DOM
    content = page.content()
    
    # Effectuer des actions
    page.click('button#submit')
    
    browser.close()
```

## Exemples disponibles

- `examples/console_logging.py` - Capture des logs console
- `examples/element_discovery.py` - Découverte d'éléments
- `examples/static_html_automation.py` - Automatisation HTML statique
