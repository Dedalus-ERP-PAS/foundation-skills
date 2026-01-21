# react-best-practices

Comprehensive React & Next.js best practices guide covering architecture, performance, shadcn/ui, Motion animations, and modern patterns.

## Categories by Priority

| Priority | Category | Impact |
|----------|----------|--------|
| 1 | Component Architecture | CRITICAL |
| 2 | Eliminating Waterfalls | CRITICAL |
| 3 | Bundle Size | CRITICAL |
| 4 | Server Components | HIGH |
| 5 | shadcn/ui Patterns | HIGH |
| 6 | State Management | MEDIUM-HIGH |
| 7 | Motion & Animations | MEDIUM |
| 8 | Re-render Optimization | MEDIUM |

## Quick Reference

### Component Architecture

```typescript
// Composition over inheritance
function ProductCard({ product }: { product: Product }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>{product.description}</CardContent>
    </Card>
  )
}
```

### Eliminating Waterfalls

```typescript
// Parallel fetching
const [user, posts] = await Promise.all([
  fetchUser(),
  fetchPosts()
])
```

### shadcn/ui Components

```bash
npx shadcn@latest add button card dialog form
```

```typescript
// Build on primitives with CVA variants
import { cva } from 'class-variance-authority'

const buttonVariants = cva('inline-flex items-center', {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground',
      destructive: 'bg-destructive text-destructive-foreground',
    }
  }
})
```

### Motion Animations

```typescript
import { motion, AnimatePresence } from 'motion/react'

// Basic animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.3 }}
>
  {children}
</motion.div>

// Interaction states
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
  Click me
</motion.button>

// Shared element transitions
<motion.div layoutId={`item-${id}`}>
  {content}
</motion.div>
```

### Server Components & Actions

```typescript
// Server Component (default)
async function ProductPage({ id }: { id: string }) {
  const product = await db.product.findUnique({ where: { id } })
  return <ProductDetails product={product} />
}

// Server Action
'use server'
export async function createPost(formData: FormData) {
  await db.post.create({ data: { title: formData.get('title') } })
  revalidatePath('/posts')
}
```

### React 19+ Hooks

```typescript
// useOptimistic for instant UI updates
const [optimisticItems, addOptimisticItem] = useOptimistic(
  items,
  (state, newItem) => [...state, newItem]
)

// useActionState for form handling
const [state, formAction, isPending] = useActionState(submitFn, null)
```

### State Management

- Local state: `useState`, `useReducer`
- Shared static: `Context`
- URL state: `useSearchParams`
- Server state: SWR, TanStack Query
- Avoid derived state - compute instead

### Accessibility

- Semantic HTML elements
- Keyboard navigation
- Focus management in modals
- Respect `prefers-reduced-motion`

## Key Libraries

- [shadcn/ui](https://ui.shadcn.com) - Component primitives
- [Motion](https://motion.dev) - Animations
- [Radix UI](https://radix-ui.com) - Accessible primitives
- [TanStack Query](https://tanstack.com/query) - Server state
- [Zod](https://zod.dev) - Schema validation
