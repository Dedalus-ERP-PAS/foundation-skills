---
name: vue-best-practices
description: Vue.js 3 best practices guidelines covering Composition API, component design, reactivity patterns, Tailwind CSS utility-first styling, and code organization. This skill should be used when writing, reviewing, or refactoring Vue.js code to ensure idiomatic patterns and maintainable code.
license: MIT
---

# Vue.js Best Practices

Comprehensive best practices guide for Vue.js 3 applications. Contains guidelines across multiple categories to ensure idiomatic, maintainable, and scalable Vue.js code, including Tailwind CSS integration patterns for utility-first styling.

## When to Apply

Reference these guidelines when:
- Writing new Vue components or composables
- Implementing features with Composition API
- Reviewing code for Vue.js patterns compliance
- Refactoring existing Vue.js code
- Setting up component architecture
- Working with Nuxt.js applications
- Styling Vue components with Tailwind CSS utility classes
- Creating design systems with Tailwind and Vue

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
| Tailwind CSS | Utility-first styling patterns | `tailwind-` |

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

### 9. Tailwind CSS

- `tailwind-utility-first` - Apply utility classes directly in templates, avoid custom CSS
- `tailwind-class-order` - Use consistent class ordering (layout → spacing → typography → visual)
- `tailwind-responsive-mobile-first` - Use mobile-first responsive design (`sm:`, `md:`, `lg:`)
- `tailwind-component-extraction` - Extract repeated utility patterns into Vue components
- `tailwind-dynamic-classes` - Use computed properties or helper functions for dynamic classes
- `tailwind-complete-class-strings` - Always use complete class strings, never concatenate
- `tailwind-state-variants` - Use state variants (`hover:`, `focus:`, `active:`) for interactions
- `tailwind-dark-mode` - Use `dark:` prefix for dark mode support
- `tailwind-design-tokens` - Configure design tokens in Tailwind config for consistency
- `tailwind-avoid-apply-overuse` - Limit `@apply` usage; prefer Vue components for abstraction

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

## Tailwind CSS Best Practices

Vue's component-based architecture pairs naturally with Tailwind's utility-first approach. Follow these patterns for maintainable, consistent styling.

### Utility-First Approach

Apply Tailwind utility classes directly in Vue templates for rapid, consistent styling:

**Correct: Utility classes in template**
```vue
<template>
  <div class="mx-auto max-w-md rounded-xl bg-white p-6 shadow-lg">
    <h2 class="text-xl font-semibold text-gray-900">{{ title }}</h2>
    <p class="mt-2 text-gray-600">{{ description }}</p>
    <button class="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
      {{ buttonText }}
    </button>
  </div>
</template>
```

### Class Ordering Convention

Maintain consistent class ordering for readability. Recommended order:

1. **Layout** - `flex`, `grid`, `block`, `hidden`
2. **Positioning** - `relative`, `absolute`, `fixed`
3. **Box Model** - `w-`, `h-`, `m-`, `p-`
4. **Typography** - `text-`, `font-`, `leading-`
5. **Visual** - `bg-`, `border-`, `rounded-`, `shadow-`
6. **Interactive** - `hover:`, `focus:`, `active:`

Use the official Prettier plugin (`prettier-plugin-tailwindcss`) to automatically sort classes.

### Responsive Design (Mobile-First)

Use Tailwind's responsive prefixes for mobile-first responsive design:

**Correct: Mobile-first responsive layout**
```vue
<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <article
      v-for="item in items"
      :key="item.id"
      class="p-4 text-sm sm:p-6 sm:text-base lg:text-lg"
    >
      <h3 class="font-medium">{{ item.title }}</h3>
    </article>
  </div>
</template>
```

**Breakpoint Reference:**
- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up
- `xl:` - 1280px and up
- `2xl:` - 1536px and up

### State Variants

Use state variants for interactive elements:

**Correct: State variants for buttons**
```vue
<template>
  <button
    class="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white
           transition-colors duration-150
           hover:bg-indigo-700
           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
           active:bg-indigo-800
           disabled:cursor-not-allowed disabled:opacity-50"
    :disabled="isLoading"
  >
    {{ isLoading ? 'Loading...' : 'Submit' }}
  </button>
</template>
```

### Dark Mode Support

Use the `dark:` prefix for dark mode styles:

**Correct: Dark mode support**
```vue
<template>
  <div class="bg-white dark:bg-gray-900">
    <h1 class="text-gray-900 dark:text-white">{{ title }}</h1>
    <p class="text-gray-600 dark:text-gray-400">{{ content }}</p>
    <div class="border-gray-200 dark:border-gray-700 rounded-lg border p-4">
      <slot />
    </div>
  </div>
</template>
```

### Dynamic Classes with Computed Properties

Use computed properties for conditional class binding:

**Correct: Computed classes for variants**
```vue
<script setup lang="ts">
import { computed } from 'vue'

type ButtonVariant = 'primary' | 'secondary' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

const props = withDefaults(defineProps<{
  variant?: ButtonVariant
  size?: ButtonSize
}>(), {
  variant: 'primary',
  size: 'md'
})

const variantClasses = computed(() => {
  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
  }
  return variants[props.variant]
})

const sizeClasses = computed(() => {
  const sizes: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }
  return sizes[props.size]
})

const buttonClasses = computed(() => [
  'inline-flex items-center justify-center rounded-md font-medium',
  'transition-colors duration-150',
  'focus:outline-none focus:ring-2 focus:ring-offset-2',
  variantClasses.value,
  sizeClasses.value
])
</script>

<template>
  <button :class="buttonClasses">
    <slot />
  </button>
</template>
```

### Class Variance Authority (CVA) Pattern

For complex component variants, use the CVA pattern with a helper library:

**Correct: CVA-style variant management**
```vue
<script setup lang="ts">
import { computed } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'

const button = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      intent: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg'
      }
    },
    defaultVariants: {
      intent: 'primary',
      size: 'md'
    }
  }
)

type ButtonProps = VariantProps<typeof button>

const props = defineProps<{
  intent?: ButtonProps['intent']
  size?: ButtonProps['size']
}>()

const classes = computed(() => button({ intent: props.intent, size: props.size }))
</script>

<template>
  <button :class="classes">
    <slot />
  </button>
</template>
```

### Component Extraction for Reusable Patterns

Extract repeated utility patterns into Vue components:

**Correct: Reusable card component**
```vue
<!-- components/BaseCard.vue -->
<script setup lang="ts">
withDefaults(defineProps<{
  padding?: 'none' | 'sm' | 'md' | 'lg'
  shadow?: 'none' | 'sm' | 'md' | 'lg'
}>(), {
  padding: 'md',
  shadow: 'md'
})
</script>

<template>
  <div
    class="rounded-xl bg-white dark:bg-gray-800"
    :class="[
      {
        'p-0': padding === 'none',
        'p-4': padding === 'sm',
        'p-6': padding === 'md',
        'p-8': padding === 'lg'
      },
      {
        'shadow-none': shadow === 'none',
        'shadow-sm': shadow === 'sm',
        'shadow-md': shadow === 'md',
        'shadow-lg': shadow === 'lg'
      }
    ]"
  >
    <slot />
  </div>
</template>
```

### Tailwind Configuration with Design Tokens

Define design tokens in your Tailwind config for consistency:

**Correct: tailwind.config.js with design tokens**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Semantic color tokens
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8'
        },
        surface: {
          light: '#ffffff',
          dark: '#1f2937'
        }
      },
      spacing: {
        // Custom spacing tokens
        '4.5': '1.125rem',
        '18': '4.5rem'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        '4xl': '2rem'
      }
    }
  },
  plugins: []
}
```

### Tailwind CSS v4 Configuration

For Tailwind CSS v4, use the CSS-first configuration approach:

**Correct: Tailwind v4 CSS configuration**
```css
/* main.css */
@import "tailwindcss";

@theme {
  /* Custom colors */
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;

  /* Custom spacing */
  --spacing-4-5: 1.125rem;
  --spacing-18: 4.5rem;

  /* Custom fonts */
  --font-family-sans: 'Inter', system-ui, sans-serif;
}
```

### Using `cn()` Helper for Conditional Classes

Use a class merging utility for conditional classes:

**Correct: cn() helper with clsx and tailwind-merge**
```typescript
// utils/cn.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Usage in component:**
```vue
<script setup lang="ts">
import { cn } from '@/utils/cn'

const props = defineProps<{
  class?: string
  isActive?: boolean
}>()
</script>

<template>
  <div
    :class="cn(
      'rounded-lg border p-4 transition-colors',
      isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white',
      props.class
    )"
  >
    <slot />
  </div>
</template>
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

### Don't Concatenate Tailwind Class Names

Dynamic class concatenation breaks Tailwind's compiler and classes get purged in production:

**Incorrect:**
```vue
<script setup>
const color = ref('blue')
</script>

<template>
  <!-- Classes will be purged in production! -->
  <div :class="`bg-${color}-500 text-${color}-900`">
    Content
  </div>
</template>
```

**Correct:**
```vue
<script setup>
const color = ref<'blue' | 'green' | 'red'>('blue')

const colorClasses = computed(() => {
  const colors = {
    blue: 'bg-blue-500 text-blue-900',
    green: 'bg-green-500 text-green-900',
    red: 'bg-red-500 text-red-900'
  }
  return colors[color.value]
})
</script>

<template>
  <div :class="colorClasses">
    Content
  </div>
</template>
```

### Don't Overuse @apply

Excessive `@apply` usage defeats the purpose of utility-first CSS:

**Incorrect:**
```css
/* styles.css */
.card {
  @apply mx-auto max-w-md rounded-xl bg-white p-6 shadow-lg;
}

.card-title {
  @apply text-xl font-semibold text-gray-900;
}

.card-description {
  @apply mt-2 text-gray-600;
}

.card-button {
  @apply mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700;
}
```

**Correct: Use Vue components instead**
```vue
<!-- components/Card.vue -->
<template>
  <div class="mx-auto max-w-md rounded-xl bg-white p-6 shadow-lg">
    <h2 class="text-xl font-semibold text-gray-900">
      <slot name="title" />
    </h2>
    <p class="mt-2 text-gray-600">
      <slot name="description" />
    </p>
    <div class="mt-4">
      <slot name="actions" />
    </div>
  </div>
</template>
```

### Don't Use Conflicting Utilities

Applying multiple utilities that target the same CSS property causes unpredictable results:

**Incorrect:**
```vue
<template>
  <!-- Both flex and grid target display property -->
  <div class="flex grid">Content</div>

  <!-- Multiple margin utilities conflict -->
  <div class="m-4 mx-6">Content</div>
</template>
```

**Correct:**
```vue
<template>
  <div :class="isGrid ? 'grid' : 'flex'">Content</div>

  <!-- Use specific margin utilities -->
  <div class="mx-6 my-4">Content</div>
</template>
```

### Don't Ignore Accessibility

Always include proper accessibility attributes alongside visual styling:

**Incorrect:**
```vue
<template>
  <button class="rounded bg-blue-600 p-2 text-white">
    <IconX />
  </button>
</template>
```

**Correct:**
```vue
<template>
  <button
    class="rounded bg-blue-600 p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    aria-label="Close dialog"
  >
    <IconX aria-hidden="true" />
  </button>
</template>
```

### Don't Create Overly Long Class Strings

Break down complex class combinations into logical groups or components:

**Incorrect:**
```vue
<template>
  <div class="mx-auto mt-8 flex max-w-4xl flex-col items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:border-blue-500 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 sm:flex-row sm:gap-6 md:p-8 lg:gap-8">
    <!-- 15+ utilities on one element -->
  </div>
</template>
```

**Correct: Extract to component or use computed**
```vue
<script setup>
const containerClasses = [
  // Layout
  'mx-auto max-w-4xl flex flex-col sm:flex-row',
  'items-center justify-between',
  'gap-4 sm:gap-6 lg:gap-8',
  // Spacing
  'mt-8 p-6 md:p-8',
  // Visual
  'rounded-xl border bg-white shadow-lg',
  'border-gray-200 dark:border-gray-700 dark:bg-gray-800',
  // Interactive
  'transition-all duration-300',
  'hover:border-blue-500 hover:shadow-xl'
]
</script>

<template>
  <div :class="containerClasses">
    <slot />
  </div>
</template>
```

## Nuxt.js Specific Guidelines

When using Nuxt.js, follow these additional patterns:

- **Auto-imports**: Leverage Nuxt's auto-imports for Vue APIs and composables
- **useFetch/useAsyncData**: Use Nuxt's data fetching composables for SSR-compatible data loading
- **definePageMeta**: Use for page-level metadata and middleware
- **Server routes**: Use `server/api/` for API endpoints
- **Runtime config**: Use `useRuntimeConfig()` for environment variables

## References

### Vue.js
- [Vue.js Documentation](https://vuejs.org)
- [Vue.js Style Guide](https://vuejs.org/style-guide/)
- [Composition API FAQ](https://vuejs.org/guide/extras/composition-api-faq.html)
- [VueUse - Collection of Vue Composition Utilities](https://vueuse.org)
- [Nuxt Documentation](https://nuxt.com)
- [Pinia Documentation](https://pinia.vuejs.org)

### Tailwind CSS
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Styling with Utility Classes](https://tailwindcss.com/docs/styling-with-utility-classes)
- [Tailwind CSS v4 Release](https://tailwindcss.com/blog/tailwindcss-v4)
- [Class Variance Authority (CVA)](https://cva.style/docs)
- [tailwind-merge](https://github.com/dcastil/tailwind-merge)
- [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)
- [Vue School - Tailwind CSS Fundamentals](https://vueschool.io/courses/tailwind-css-fundamentals)
