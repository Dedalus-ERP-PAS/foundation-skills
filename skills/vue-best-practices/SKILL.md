---
name: vue-best-practices
description: Vue.js 4 LTS performance optimization guidelines. This skill should be used when writing, reviewing, or refactoring Vue.js code to ensure optimal performance patterns. Triggers on tasks involving Vue components, Nuxt pages, data fetching, bundle optimization, or performance improvements.
license: MIT
---

# Vue.js Best Practices

Comprehensive performance optimization guide for Vue.js 4 LTS applications. Contains 40+ rules across 8 categories, prioritized by impact to guide automated refactoring and code generation.

## When to Apply

Reference these guidelines when:
- Writing new Vue components or Nuxt pages
- Implementing data fetching (client or server-side)
- Reviewing code for performance issues
- Refactoring existing Vue.js code
- Optimizing bundle size or load times

## Rule Categories by Priority

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Bundle Size Optimization | CRITICAL | `bundle-` |
| 2 | Reactive System Optimization | CRITICAL | `reactive-` |
| 3 | Server-Side Performance | HIGH | `server-` |
| 4 | Component Structure | MEDIUM-HIGH | `component-` |
| 5 | Re-render Optimization | MEDIUM | `rerender-` |
| 6 | Rendering Performance | MEDIUM | `rendering-` |
| 7 | JavaScript Performance | LOW-MEDIUM | `js-` |
| 8 | State Management | LOW-MEDIUM | `state-` |

## Quick Reference

### 1. Bundle Size Optimization (CRITICAL)

- `bundle-script-setup` - Use `<script setup>` for more efficient compiled output
- `bundle-tree-shaking` - Use ES module imports for tree-shaking
- `bundle-dynamic-imports` - Use defineAsyncComponent for heavy components
- `bundle-defer-third-party` - Load analytics/logging after hydration
- `bundle-lodash-es` - Use lodash-es instead of lodash for tree-shaking
- `bundle-template-compilation` - Pre-compile templates at build time

### 2. Reactive System Optimization (CRITICAL)

- `reactive-shallow-ref` - Use shallowRef() for large immutable objects
- `reactive-shallow-reactive` - Use shallowReactive() for flat objects
- `reactive-computed-cache` - Use computed properties for derived values
- `reactive-stable-props` - Pass stable primitive props to children
- `reactive-avoid-watchers` - Prefer computed over watchers for derived state
- `reactive-trigger-ref` - Use triggerRef() for manual shallow updates

### 3. Server-Side Performance (HIGH)

- `server-ssr-ssg` - Use SSR/SSG for critical initial content
- `server-streaming` - Stream SSR content with Suspense boundaries
- `server-prefetch` - Prefetch critical data on server
- `server-minimize-payload` - Minimize serialized state payload
- `server-cache-responses` - Cache API responses server-side

### 4. Component Structure (MEDIUM-HIGH)

- `component-minimal-abstractions` - Minimize wrapper components
- `component-feature-folders` - Organize by feature, use composables
- `component-single-responsibility` - Keep components focused and small
- `component-lazy-routes` - Lazy load route components
- `component-extract-composables` - Extract reusable logic to composables

### 5. Re-render Optimization (MEDIUM)

- `rerender-v-once` - Use v-once for static content
- `rerender-v-memo` - Use v-memo to memoize expensive subtrees
- `rerender-key-stability` - Use stable keys in v-for loops
- `rerender-computed-oldvalue` - Return oldValue from computed for object stability
- `rerender-avoid-template-expressions` - Move complex expressions to computed

### 6. Rendering Performance (MEDIUM)

- `rendering-virtual-lists` - Virtualize large lists with vue-virtual-scroller
- `rendering-content-visibility` - Use CSS content-visibility for offscreen content
- `rendering-lazy-images` - Use loading="lazy" for images
- `rendering-throttle-events` - Throttle/debounce high-frequency events
- `rendering-event-delegation` - Use event delegation for many listeners

### 7. JavaScript Performance (LOW-MEDIUM)

- `js-batch-dom` - Batch DOM updates using nextTick
- `js-index-maps` - Build Map for repeated lookups
- `js-cache-property-access` - Cache object properties in loops
- `js-set-map-lookups` - Use Set/Map for O(1) lookups
- `js-early-exit` - Return early from functions
- `js-combine-iterations` - Combine multiple filter/map into one loop

### 8. State Management (LOW-MEDIUM)

- `state-modular-stores` - Use modular Pinia stores
- `state-selective-subscriptions` - Subscribe only to needed state slices
- `state-batch-mutations` - Batch store mutations to reduce updates
- `state-normalize-data` - Normalize nested data structures
- `state-persist-selectively` - Only persist necessary state

## Key Performance Principles

### Bundle Size Optimization (CRITICAL Impact)

Reducing initial bundle size improves Time to Interactive and Largest Contentful Paint:

- **Use `<script setup>`**: Components compiled with `<script setup>` produce more efficient code with reduced runtime overhead
- **Pre-compile templates**: Use build tools (Vite, Rollup) to compile templates at build time, saving ~14 KB gzipped
- **Dynamic imports**: Use defineAsyncComponent for heavy components not needed immediately
- **Tree-shaking friendly imports**: Import from ES module sources to enable dead code elimination

### Reactive System Optimization (CRITICAL Impact)

Vue's reactivity system is powerful but can be expensive with large data structures:

- **Shallow reactivity for large objects**: Use `shallowRef()` or `shallowReactive()` when you don't need deep tracking
- **Computed over methods**: Computed properties cache results and only recalculate when dependencies change
- **Stable props**: Pass primitive values to children to minimize unnecessary re-renders
- **Avoid watchers for derived state**: Use computed properties instead; watchers are for side effects

### Server-Side Performance (HIGH Impact)

Optimize server-side rendering and data fetching:

- **SSR/SSG for critical content**: Reduces time-to-first-paint for SEO-critical pages
- **Streaming SSR**: Use Suspense boundaries to stream content as it becomes available
- **Minimize serialization**: Only hydrate necessary state to reduce payload size
- **Server-side caching**: Cache API responses and computed data

### Re-render Optimization (MEDIUM Impact)

Reduce unnecessary re-renders with Vue's built-in directives:

- **v-once for static content**: Renders once and skips all future updates
- **v-memo for conditional memoization**: Only re-renders when specified dependencies change
- **Stable computed values**: Return oldValue from computed when object properties haven't changed
- **Stable v-for keys**: Use unique, stable keys to help Vue track elements efficiently

### Rendering Performance (MEDIUM Impact)

Optimize what the browser needs to render:

- **Virtualize large lists**: Only render visible items using vue-virtual-scroller
- **Content visibility**: Use CSS content-visibility for long lists to skip offscreen rendering
- **Throttle events**: Debounce or throttle scroll, resize, and input events
- **Lazy load assets**: Use native lazy loading for images and async components

## Common Patterns

### Shallow Reactivity for Large Objects

**Incorrect: Deep reactivity for large immutable data**
```typescript
import { ref } from 'vue'

// Deep tracking overhead for large arrays
const items = ref(largeArrayOfObjects)
```

**Correct: Shallow reactivity when deep tracking not needed**
```typescript
import { shallowRef } from 'vue'

// Only tracks .value replacement, not nested changes
const items = shallowRef(largeArrayOfObjects)

// Replace entire value to trigger updates
items.value = [...items.value, newItem]
```

### Dynamic Component Loading

**Incorrect: Always in bundle**
```typescript
import HeavyChart from './HeavyChart.vue'

// Chart always loaded even if not displayed
```

**Correct: Load only when needed**
```typescript
import { defineAsyncComponent } from 'vue'

const HeavyChart = defineAsyncComponent(() => 
  import('./HeavyChart.vue')
)
```

### v-memo for Expensive Lists

**Incorrect: Re-renders entire list on any change**
```vue
<template>
  <div v-for="item in items" :key="item.id">
    <ExpensiveComponent :item="item" />
  </div>
</template>
```

**Correct: Memoize items that haven't changed**
```vue
<template>
  <div v-for="item in items" :key="item.id" v-memo="[item.id, item.updated]">
    <ExpensiveComponent :item="item" />
  </div>
</template>
```

### Computed with Object Stability

**Incorrect: Returns new object reference every time**
```typescript
const result = computed(() => {
  return { isEven: count.value % 2 === 0 }
})
```

**Correct: Preserve reference when value unchanged**
```typescript
const result = computed((oldValue) => {
  const newValue = { isEven: count.value % 2 === 0 }
  if (oldValue && oldValue.isEven === newValue.isEven) {
    return oldValue
  }
  return newValue
})
```

### Composables for Reusable Logic

**Incorrect: Duplicate logic in components**
```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const windowWidth = ref(window.innerWidth)
const onResize = () => { windowWidth.value = window.innerWidth }
onMounted(() => window.addEventListener('resize', onResize))
onUnmounted(() => window.removeEventListener('resize', onResize))
</script>
```

**Correct: Extract to composable**
```typescript
// composables/useWindowSize.ts
import { ref, onMounted, onUnmounted } from 'vue'

export function useWindowSize() {
  const width = ref(window.innerWidth)
  const height = ref(window.innerHeight)
  
  const onResize = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }
  
  onMounted(() => window.addEventListener('resize', onResize))
  onUnmounted(() => window.removeEventListener('resize', onResize))
  
  return { width, height }
}
```

```vue
<script setup>
import { useWindowSize } from '@/composables/useWindowSize'

const { width } = useWindowSize()
</script>
```

### Virtual Lists for Large Data

**Incorrect: Render all items**
```vue
<template>
  <div v-for="item in thousandsOfItems" :key="item.id">
    {{ item.name }}
  </div>
</template>
```

**Correct: Virtualize the list**
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

<script setup>
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
</script>
```

## References

- [Vue.js Documentation](https://vuejs.org)
- [Vue.js Performance Guide](https://vuejs.org/guide/best-practices/performance.html)
- [Nuxt Documentation](https://nuxt.com)
- [Pinia Documentation](https://pinia.vuejs.org)
- [Vue Virtual Scroller](https://github.com/Akryum/vue-virtual-scroller)
- [VueUse Composables](https://vueuse.org)
