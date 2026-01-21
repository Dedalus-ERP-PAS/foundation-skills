# vue-best-practices

Guidelines de performance Vue.js 4 LTS/Nuxt.

## Priorités d'optimisation

### 1. Optimiser le système réactif

```javascript
// ❌ Deep reactivity pour grands objets
const items = ref(largeArray)

// ✅ Shallow reactivity
import { shallowRef } from 'vue'
const items = shallowRef(largeArray)
items.value = [...items.value, newItem]
```

### 2. Optimiser le bundle

- Utiliser `<script setup>` pour un code compilé plus efficace
- Imports dynamiques avec `defineAsyncComponent`
- Pré-compiler les templates au build (~14 KB économisés)
- Utiliser `lodash-es` au lieu de `lodash`

### 3. Éviter les re-renders

```vue
<!-- ✅ v-once pour contenu statique -->
<span v-once>{{ staticText }}</span>

<!-- ✅ v-memo pour mémorisation conditionnelle -->
<div v-for="item in items" :key="item.id" v-memo="[item.updated]">
  <ExpensiveComponent :item="item" />
</div>
```

### 4. Performance computed

```javascript
// ✅ Retourner oldValue si inchangé
const result = computed((oldValue) => {
  const newValue = { isEven: count.value % 2 === 0 }
  if (oldValue && oldValue.isEven === newValue.isEven) {
    return oldValue
  }
  return newValue
})
```

### 5. Virtualiser les grandes listes

```vue
<template>
  <RecycleScroller
    :items="thousandsOfItems"
    :item-size="50"
    key-field="id"
    v-slot="{ item }"
  >
    <div>{{ item.name }}</div>
  </RecycleScroller>
</template>
```

### 6. Extraire la logique en composables

```javascript
// composables/useWindowSize.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useWindowSize() {
  const width = ref(window.innerWidth)
  const onResize = () => { width.value = window.innerWidth }
  onMounted(() => window.addEventListener('resize', onResize))
  onUnmounted(() => window.removeEventListener('resize', onResize))
  return { width }
}
```
