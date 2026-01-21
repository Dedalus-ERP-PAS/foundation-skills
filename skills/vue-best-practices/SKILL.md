---
name: vue-best-practices
description: Vue.js 3 best practices guidelines covering Composition API, component design, reactivity patterns, and code organization. This skill should be used when writing, reviewing, or refactoring Vue.js code to ensure idiomatic patterns and maintainable code.
license: MIT
---

# Vue.js Best Practices

Comprehensive best practices guide for Vue.js 3 applications. Contains guidelines across multiple categories to ensure idiomatic, maintainable, and scalable Vue.js code.

## When to Apply

Reference these guidelines when:
- Writing new Vue components or composables
- Implementing features with Composition API
- Reviewing code for Vue.js patterns compliance
- Refactoring existing Vue.js code
- Setting up component architecture
- Working with Nuxt.js applications

## Rule Categories

| Category | Focus | Prefix |
|----------|-------|--------|
| Composition API | Proper use of Composition API patterns | `composition-` |
| Component Design | Component structure and organization | `component-` |
| Reactivity | Reactive state management patterns | `reactive-` |
| Props & Events | Component communication patterns | `props-` |
| Template Patterns | Template syntax best practices | `template-` |
| Code Organization | Project and code structure | `organization-` |
| TypeScript | Type-safe Vue.js patterns | `typescript-` |
| Error Handling | Error boundaries and handling | `error-` |

## Quick Reference

### 1. Composition API Best Practices

- `composition-script-setup` - Always use `<script setup>` for single-file components
- `composition-ref-vs-reactive` - Use `ref()` for primitives, `reactive()` for objects
- `composition-computed-derived` - Use `computed()` for all derived state
- `composition-watch-side-effects` - Use `watch()`/`watchEffect()` only for side effects
- `composition-composables` - Extract reusable logic into composables
- `composition-lifecycle-order` - Place lifecycle hooks after reactive state declarations
- `composition-avoid-this` - Never use `this` in Composition API

### 2. Component Design

- `component-single-responsibility` - One component, one purpose
- `component-naming-convention` - Use PascalCase for components, kebab-case in templates
- `component-small-focused` - Keep components under 200 lines
- `component-presentational-container` - Separate logic from presentation when beneficial
- `component-slots-flexibility` - Use slots for flexible component composition
- `component-expose-minimal` - Only expose what's necessary via `defineExpose()`

### 3. Reactivity Patterns

- `reactive-const-refs` - Always declare refs with `const`
- `reactive-unwrap-template` - Let Vue unwrap refs in templates (no `.value`)
- `reactive-shallow-large-data` - Use `shallowRef()`/`shallowReactive()` for large non-reactive data
- `reactive-readonly-props` - Use `readonly()` to prevent mutations
- `reactive-toRefs-destructure` - Use `toRefs()` when destructuring reactive objects
- `reactive-avoid-mutation` - Prefer immutable updates for complex state

### 4. Props & Events

- `props-define-types` - Always define prop types with `defineProps<T>()`
- `props-required-explicit` - Be explicit about required vs optional props
- `props-default-values` - Provide sensible defaults with `withDefaults()`
- `props-immutable` - Never mutate props directly
- `props-validation` - Use validator functions for complex prop validation
- `events-define-emits` - Always define emits with `defineEmits<T>()`
- `events-naming` - Use kebab-case for event names in templates
- `events-payload-objects` - Pass objects for events with multiple values

### 5. Template Patterns

- `template-v-if-v-show` - Use `v-if` for conditional rendering, `v-show` for toggling
- `template-v-for-key` - Always use unique, stable `:key` with `v-for`
- `template-v-if-v-for` - Never use `v-if` and `v-for` on the same element
- `template-computed-expressions` - Move complex expressions to computed properties
- `template-event-modifiers` - Use event modifiers (`.prevent`, `.stop`) appropriately
- `template-v-bind-shorthand` - Use shorthand syntax (`:` for `v-bind`, `@` for `v-on`)
- `template-v-model-modifiers` - Use v-model modifiers (`.trim`, `.number`, `.lazy`)

### 6. Code Organization

- `organization-feature-folders` - Organize by feature, not by type
- `organization-composables-folder` - Keep composables in dedicated `composables/` folder
- `organization-barrel-exports` - Use index files for clean imports
- `organization-consistent-naming` - Follow consistent naming conventions
- `organization-colocation` - Colocate related files (component, tests, styles)

### 7. TypeScript Integration

- `typescript-generic-components` - Use generics for reusable typed components
- `typescript-prop-types` - Use TypeScript interfaces for prop definitions
- `typescript-emit-types` - Type emit payloads explicitly
- `typescript-ref-typing` - Specify types for refs when not inferred
- `typescript-template-refs` - Type template refs with `ref<InstanceType<typeof Component> | null>(null)`

### 8. Error Handling

- `error-boundaries` - Use `onErrorCaptured()` for component error boundaries
- `error-async-handling` - Handle errors in async operations explicitly
- `error-provide-fallbacks` - Provide fallback UI for error states
- `error-logging` - Log errors appropriately for debugging

## Key Principles

### Composition API Best Practices

The Composition API is the recommended approach for Vue.js 3. Follow these patterns:

- **Always use `<script setup>`**: More concise, better TypeScript inference, and improved performance
- **Organize code by logical concern**: Group related state, computed properties, and functions together
- **Extract reusable logic to composables**: Follow the `use` prefix convention (e.g., `useAuth`, `useFetch`)
- **Keep setup code readable**: Order: props/emits, reactive state, computed, watchers, methods, lifecycle hooks

### Component Design Principles

Well-designed components are the foundation of maintainable Vue applications:

- **Single Responsibility**: Each component should do one thing well
- **Props Down, Events Up**: Follow unidirectional data flow
- **Prefer Composition over Inheritance**: Use composables and slots for code reuse
- **Keep Components Small**: If a component exceeds 200 lines, consider splitting it

### Reactivity Guidelines

Understanding Vue's reactivity system is crucial:

- **ref vs reactive**: Use `ref()` for primitives and values you'll reassign; use `reactive()` for objects you'll mutate
- **Computed for derived state**: Never store derived state in refs; use `computed()` instead
- **Watch for side effects**: Only use `watch()` for side effects like API calls or localStorage
- **Be mindful of reactivity loss**: Don't destructure reactive objects without `toRefs()`

### Props & Events Patterns

Proper component communication ensures maintainable code:

- **Type your props**: Use TypeScript interfaces with `defineProps<T>()`
- **Validate complex props**: Use validator functions for business logic validation
- **Emit typed events**: Use `defineEmits<T>()` for type-safe event handling
- **Use v-model for two-way binding**: Implement `modelValue` prop and `update:modelValue` emit

## Common Patterns

### Script Setup Structure

**Recommended structure for `<script setup>`:**
```vue
<script setup lang="ts">
// 1. Imports
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { User } from '@/types'

// 2. Props and Emits
const props = defineProps<{
  userId: string
  initialData?: User
}>()

const emit = defineEmits<{
  submit: [user: User]
  cancel: []
}>()

// 3. Composables
const router = useRouter()
const { user, loading, error } = useUser(props.userId)

// 4. Reactive State
const formData = ref({ name: '', email: '' })
const isEditing = ref(false)

// 5. Computed Properties
const isValid = computed(() => {
  return formData.value.name.length > 0 && formData.value.email.includes('@')
})

// 6. Watchers (for side effects only)
watch(() => props.userId, (newId) => {
  fetchUserData(newId)
})

// 7. Methods
function handleSubmit() {
  if (isValid.value) {
    emit('submit', formData.value)
  }
}

// 8. Lifecycle Hooks
onMounted(() => {
  if (props.initialData) {
    formData.value = { ...props.initialData }
  }
})
</script>
```

### Composable Pattern

**Correct: Well-structured composable**
```typescript
// composables/useUser.ts
import { ref, computed, watch } from 'vue'
import type { Ref } from 'vue'
import type { User } from '@/types'

export function useUser(userId: Ref<string> | string) {
  // State
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  // Computed
  const fullName = computed(() => {
    if (!user.value) return ''
    return `${user.value.firstName} ${user.value.lastName}`
  })

  // Methods
  async function fetchUser(id: string) {
    loading.value = true
    error.value = null
    try {
      const response = await api.getUser(id)
      user.value = response.data
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }

  // Auto-fetch when userId changes (if reactive)
  if (isRef(userId)) {
    watch(userId, (newId) => fetchUser(newId), { immediate: true })
  } else {
    fetchUser(userId)
  }

  // Return
  return {
    user: readonly(user),
    fullName,
    loading: readonly(loading),
    error: readonly(error),
    refresh: () => fetchUser(unref(userId))
  }
}
```

### Props with Defaults

**Correct: Typed props with defaults**
```vue
<script setup lang="ts">
interface Props {
  title: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  items?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  disabled: false,
  items: () => []  // Use factory function for arrays/objects
})
</script>
```

### Event Handling

**Correct: Typed emits with payloads**
```vue
<script setup lang="ts">
interface FormData {
  name: string
  email: string
}

const emit = defineEmits<{
  submit: [data: FormData]
  cancel: []
  'update:modelValue': [value: string]
}>()

function handleSubmit(data: FormData) {
  emit('submit', data)
}
</script>
```

### v-model Implementation

**Correct: Custom v-model with defineModel (Vue 3.4+)**
```vue
<script setup lang="ts">
const model = defineModel<string>({ required: true })

// Or with default
const modelWithDefault = defineModel<string>({ default: '' })
</script>

<template>
  <input :value="model" @input="model = $event.target.value" />
</template>
```

**Correct: Custom v-model (Vue 3.3 and earlier)**
```vue
<script setup lang="ts">
const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>

<template>
  <input v-model="value" />
</template>
```

### Template Ref Typing

**Correct: Typed template refs**
```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MyComponent from './MyComponent.vue'

// DOM element ref
const inputRef = ref<HTMLInputElement | null>(null)

// Component ref
const componentRef = ref<InstanceType<typeof MyComponent> | null>(null)

onMounted(() => {
  inputRef.value?.focus()
  componentRef.value?.someExposedMethod()
})
</script>

<template>
  <input ref="inputRef" />
  <MyComponent ref="componentRef" />
</template>
```

### Provide/Inject with Types

**Correct: Type-safe provide/inject**
```typescript
// types/injection-keys.ts
import type { InjectionKey, Ref } from 'vue'
import type { User } from './user'

export const UserKey: InjectionKey<Ref<User>> = Symbol('user')

// Parent component
import { provide, ref } from 'vue'
import { UserKey } from '@/types/injection-keys'

const user = ref<User>({ id: '1', name: 'John' })
provide(UserKey, user)

// Child component
import { inject } from 'vue'
import { UserKey } from '@/types/injection-keys'

const user = inject(UserKey)
if (!user) {
  throw new Error('User not provided')
}
```

### Error Boundary Component

**Correct: Error boundary with onErrorCaptured**
```vue
<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'

const error = ref<Error | null>(null)

onErrorCaptured((err) => {
  error.value = err
  // Return false to stop error propagation
  return false
})

function reset() {
  error.value = null
}
</script>

<template>
  <div v-if="error" class="error-boundary">
    <p>Something went wrong: {{ error.message }}</p>
    <button @click="reset">Try again</button>
  </div>
  <slot v-else />
</template>
```

### Async Component Loading

**Correct: Async components with loading/error states**
```typescript
import { defineAsyncComponent } from 'vue'

const AsyncDashboard = defineAsyncComponent({
  loader: () => import('./Dashboard.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorDisplay,
  delay: 200,  // Show loading after 200ms
  timeout: 10000  // Timeout after 10s
})
```

## Anti-Patterns to Avoid

### Don't Mutate Props

**Incorrect:**
```vue
<script setup>
const props = defineProps(['items'])

function addItem(item) {
  props.items.push(item)  // Never mutate props!
}
</script>
```

**Correct:**
```vue
<script setup>
const props = defineProps(['items'])
const emit = defineEmits(['update:items'])

function addItem(item) {
  emit('update:items', [...props.items, item])
}
</script>
```

### Don't Use v-if with v-for

**Incorrect:**
```vue
<template>
  <div v-for="item in items" v-if="item.isActive" :key="item.id">
    {{ item.name }}
  </div>
</template>
```

**Correct:**
```vue
<script setup>
const activeItems = computed(() => items.value.filter(item => item.isActive))
</script>

<template>
  <div v-for="item in activeItems" :key="item.id">
    {{ item.name }}
  </div>
</template>
```

### Don't Store Derived State

**Incorrect:**
```vue
<script setup>
const items = ref([])
const itemCount = ref(0)  // Derived state stored separately

watch(items, () => {
  itemCount.value = items.value.length  // Manually syncing
})
</script>
```

**Correct:**
```vue
<script setup>
const items = ref([])
const itemCount = computed(() => items.value.length)  // Computed property
</script>
```

### Don't Destructure Reactive Objects

**Incorrect:**
```vue
<script setup>
const state = reactive({ count: 0, name: 'Vue' })
const { count, name } = state  // Loses reactivity!
</script>
```

**Correct:**
```vue
<script setup>
const state = reactive({ count: 0, name: 'Vue' })
const { count, name } = toRefs(state)  // Preserves reactivity
</script>
```

## Nuxt.js Specific Guidelines

When using Nuxt.js, follow these additional patterns:

- **Auto-imports**: Leverage Nuxt's auto-imports for Vue APIs and composables
- **useFetch/useAsyncData**: Use Nuxt's data fetching composables for SSR-compatible data loading
- **definePageMeta**: Use for page-level metadata and middleware
- **Server routes**: Use `server/api/` for API endpoints
- **Runtime config**: Use `useRuntimeConfig()` for environment variables

## References

- [Vue.js Documentation](https://vuejs.org)
- [Vue.js Style Guide](https://vuejs.org/style-guide/)
- [Composition API FAQ](https://vuejs.org/guide/extras/composition-api-faq.html)
- [VueUse - Collection of Vue Composition Utilities](https://vueuse.org)
- [Nuxt Documentation](https://nuxt.com)
- [Pinia Documentation](https://pinia.vuejs.org)
