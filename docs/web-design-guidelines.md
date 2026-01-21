# web-design-guidelines

Inspection visuelle et revue de code pour la conformité aux Web Interface Guidelines. Supporte l'analyse statique et l'inspection visuelle via navigateur avec correction automatique.

## Utilisation

### Analyse statique (code uniquement)

```
Revois mon UI dans src/components/
Vérifie l'accessibilité de ma page
Analyse l'UX de mon formulaire d'inscription
```

### Inspection visuelle (navigateur)

```
Revois le design à http://localhost:3000
Vérifie l'UI sur http://localhost:5173/dashboard
Trouve les problèmes de layout sur mon site
```

### Revue complète (recommandé)

```
Revois mon UI à localhost:3000 et corrige les problèmes dans src/
Audite le design et corrige les problèmes responsive
```

## Ce que le skill vérifie

### Analyse statique
- Accessibilité (WCAG)
- Cohérence visuelle
- Patterns UX standards
- Performance perçue
- Responsive design

### Inspection visuelle
- Problèmes de layout (overflow, overlap, alignement)
- Problèmes responsive (mobile, tablet, desktop, wide)
- Accessibilité (contraste, focus, alt text)
- Cohérence visuelle (fonts, couleurs, espacements)

## Workflow

1. **Collecte d'informations** - Détection framework et méthode CSS
2. **Fetch guidelines** - Récupération des règles Vercel
3. **Analyse statique** - Revue du code source
4. **Inspection visuelle** - Screenshots et DOM (si URL fournie)
5. **Correction** - Fixes automatiques priorisés (P1 → P2 → P3)
6. **Re-vérification** - Validation des corrections (loop si nécessaire)

## Prérequis

- Pour l'inspection visuelle: site web accessible (localhost ou remote)
- Pour les corrections: accès au code source dans le workspace

Les guidelines sont récupérées automatiquement depuis le repo officiel Vercel.
