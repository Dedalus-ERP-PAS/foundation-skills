# vue-best-practices

Best practices Vue.js 3 et Nuxt - Composition API, patterns et organisation de code.

## Composition API

### Structure `<script setup>`

```vue
<script setup lang="ts">
// 1. Imports
import { ref, computed, onMounted } from 'vue'

// 2. Props et Emits
const props = defineProps<{ userId: string }>()
const emit = defineEmits<{ submit: [data: FormData] }>()

// 3. Composables
const { user, loading } = useUser(props.userId)

// 4. État réactif
const formData = ref({ name: '', email: '' })

// 5. Computed
const isValid = computed(() => formData.value.name.length > 0)

// 6. Méthodes
function handleSubmit() {
  if (isValid.value) emit('submit', formData.value)
}

// 7. Lifecycle hooks
onMounted(() => console.log('Mounted'))
</script>
```

### ref vs reactive

```javascript
// ✅ ref() pour primitives et valeurs réassignées
const count = ref(0)
const user = ref<User | null>(null)

// ✅ reactive() pour objets mutés
const state = reactive({ items: [], loading: false })

// ❌ Ne pas destructurer reactive sans toRefs
const { count } = state  // Perd la réactivité !

// ✅ Utiliser toRefs pour destructurer
const { count } = toRefs(state)
```

### Composables

```typescript
// composables/useUser.ts
export function useUser(userId: Ref<string> | string) {
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  async function fetchUser(id: string) {
    loading.value = true
    try {
      user.value = await api.getUser(id)
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }

  if (isRef(userId)) {
    watch(userId, (id) => fetchUser(id), { immediate: true })
  } else {
    fetchUser(userId)
  }

  return { user: readonly(user), loading, error }
}
```

## Props et Events

### Props typées avec defaults

```vue
<script setup lang="ts">
interface Props {
  title: string
  size?: 'sm' | 'md' | 'lg'
  items?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  items: () => []  // Factory pour arrays/objets
})
</script>
```

### Emits typés

```vue
<script setup lang="ts">
const emit = defineEmits<{
  submit: [data: FormData]
  cancel: []
  'update:modelValue': [value: string]
}>()
</script>
```

### v-model avec defineModel (Vue 3.4+)

```vue
<script setup lang="ts">
const model = defineModel<string>({ required: true })
</script>

<template>
  <input v-model="model" />
</template>
```

## Anti-patterns

### Ne jamais muter les props

```vue
<!-- ❌ Incorrect -->
<script setup>
const props = defineProps(['items'])
props.items.push(newItem)  // Mutation interdite !
</script>

<!-- ✅ Correct -->
<script setup>
const props = defineProps(['items'])
const emit = defineEmits(['update:items'])
emit('update:items', [...props.items, newItem])
</script>
```

### v-if avec v-for

```vue
<!-- ❌ Incorrect -->
<div v-for="item in items" v-if="item.isActive" :key="item.id">

<!-- ✅ Correct -->
<script setup>
const activeItems = computed(() => items.value.filter(i => i.isActive))
</script>
<div v-for="item in activeItems" :key="item.id">
```

### État dérivé stocké

```vue
<!-- ❌ Incorrect -->
<script setup>
const items = ref([])
const count = ref(0)
watch(items, () => { count.value = items.value.length })
</script>

<!-- ✅ Correct -->
<script setup>
const items = ref([])
const count = computed(() => items.value.length)
</script>
```

## TypeScript

### Template refs typées

```vue
<script setup lang="ts">
import MyComponent from './MyComponent.vue'

const inputRef = ref<HTMLInputElement | null>(null)
const componentRef = ref<InstanceType<typeof MyComponent> | null>(null)
</script>

<template>
  <input ref="inputRef" />
  <MyComponent ref="componentRef" />
</template>
```

### Provide/Inject typés

```typescript
// types/keys.ts
export const UserKey: InjectionKey<Ref<User>> = Symbol('user')

// Parent
provide(UserKey, user)

// Child
const user = inject(UserKey)
```

## Bonnes pratiques générales

- **Single Responsibility** : Un composant = une responsabilité
- **Props Down, Events Up** : Flux de données unidirectionnel
- **Composables pour la réutilisation** : Extraire la logique partagée
- **Computed pour les valeurs dérivées** : Jamais de watch pour synchroniser
- **`<script setup>`** : Toujours utiliser pour les SFC
- **Taille des composants** : Limiter à ~200 lignes
