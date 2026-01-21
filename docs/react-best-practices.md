# react-best-practices

Guidelines de performance React/Next.js.

## Priorités d'optimisation

### 1. Éliminer les waterfalls

```javascript
// ❌ Séquentiel
const user = await getUser()
const posts = await getPosts(user.id)

// ✅ Parallèle
const [user, posts] = await Promise.all([
  getUser(),
  getPosts(userId)
])
```

### 2. Optimiser le bundle

- Imports dynamiques pour le code splitting
- Éviter les barrel files (`index.ts` qui réexportent tout)
- Analyser le bundle avec `@next/bundle-analyzer`

### 3. Performance serveur

- Utiliser `React.cache()` pour déduplication
- Minimiser la sérialisation des données
- Préférer les Server Components

### 4. Optimisation re-renders

- `React.memo()` pour composants coûteux
- Dépendances primitives dans les hooks
- Éviter les objets inline dans les props
