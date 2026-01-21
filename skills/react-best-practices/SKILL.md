---
name: react-best-practices
description: React and Next.js performance optimization guidelines from Vercel Engineering. This skill should be used when writing, reviewing, or refactoring React/Next.js code to ensure optimal performance patterns. Triggers on tasks involving React components, Next.js pages, data fetching, bundle optimization, or performance improvements.
license: MIT
---

# React Best Practices

Comprehensive performance optimization guide for React and Next.js applications, maintained by Vercel. Contains 45+ rules across 8 categories, prioritized by impact to guide automated refactoring and code generation.

## When to Apply

Reference these guidelines when:
- Writing new React components or Next.js pages
- Implementing data fetching (client or server-side)
- Reviewing code for performance issues
- Refactoring existing React/Next.js code
- Optimizing bundle size or load times

## Rule Categories by Priority

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Eliminating Waterfalls | CRITICAL | `async-` |
| 2 | Bundle Size Optimization | CRITICAL | `bundle-` |
| 3 | Server-Side Performance | HIGH | `server-` |
| 4 | Client-Side Data Fetching | MEDIUM-HIGH | `client-` |
| 5 | Re-render Optimization | MEDIUM | `rerender-` |
| 6 | Rendering Performance | MEDIUM | `rendering-` |
| 7 | JavaScript Performance | LOW-MEDIUM | `js-` |
| 8 | Advanced Patterns | LOW | `advanced-` |

## Quick Reference

### 1. Eliminating Waterfalls (CRITICAL)

- `async-defer-await` - Move await into branches where actually used
- `async-parallel` - Use Promise.all() for independent operations
- `async-dependencies` - Use better-all for partial dependencies
- `async-api-routes` - Start promises early, await late in API routes
- `async-suspense-boundaries` - Use Suspense to stream content

### 2. Bundle Size Optimization (CRITICAL)

- `bundle-barrel-imports` - Import directly, avoid barrel files
- `bundle-dynamic-imports` - Use next/dynamic for heavy components
- `bundle-defer-third-party` - Load analytics/logging after hydration
- `bundle-conditional` - Load modules only when feature is activated
- `bundle-preload` - Preload on hover/focus for perceived speed

### 3. Server-Side Performance (HIGH)

- `server-cache-react` - Use React.cache() for per-request deduplication
- `server-cache-lru` - Use LRU cache for cross-request caching
- `server-serialization` - Minimize data passed to client components
- `server-parallel-fetching` - Restructure components to parallelize fetches
- `server-after-nonblocking` - Use after() for non-blocking operations

### 4. Client-Side Data Fetching (MEDIUM-HIGH)

- `client-swr-dedup` - Use SWR for automatic request deduplication
- `client-event-listeners` - Deduplicate global event listeners
- `client-localstorage-schema` - Version and minimize localStorage data
- `client-passive-listeners` - Use passive event listeners for scrolling

### 5. Re-render Optimization (MEDIUM)

- `rerender-defer-reads` - Don't subscribe to state only used in callbacks
- `rerender-memo` - Extract expensive work into memoized components
- `rerender-dependencies` - Use primitive dependencies in effects
- `rerender-derived-state` - Subscribe to derived booleans, not raw values
- `rerender-functional-setstate` - Use functional setState for stable callbacks
- `rerender-lazy-state-init` - Pass function to useState for expensive values
- `rerender-transitions` - Use startTransition for non-urgent updates

### 6. Rendering Performance (MEDIUM)

- `rendering-animate-svg-wrapper` - Animate div wrapper, not SVG element
- `rendering-content-visibility` - Use content-visibility for long lists
- `rendering-hoist-jsx` - Extract static JSX outside components
- `rendering-svg-precision` - Reduce SVG coordinate precision
- `rendering-hydration-no-flicker` - Use inline script for client-only data
- `rendering-activity` - Use Activity component for show/hide
- `rendering-conditional-render` - Use ternary, not && for conditionals

### 7. JavaScript Performance (LOW-MEDIUM)

- `js-batch-dom-css` - Group CSS changes via classes or cssText
- `js-index-maps` - Build Map for repeated lookups
- `js-cache-property-access` - Cache object properties in loops
- `js-cache-function-results` - Cache function results in module-level Map
- `js-cache-storage` - Cache localStorage/sessionStorage reads
- `js-combine-iterations` - Combine multiple filter/map into one loop
- `js-length-check-first` - Check array length before expensive comparison
- `js-early-exit` - Return early from functions
- `js-hoist-regexp` - Hoist RegExp creation outside loops
- `js-min-max-loop` - Use loop for min/max instead of sort
- `js-set-map-lookups` - Use Set/Map for O(1) lookups
- `js-tosorted-immutable` - Use toSorted() for immutability

### 8. Advanced Patterns (LOW)

- `advanced-event-handler-refs` - Store event handlers in refs
- `advanced-use-latest` - useLatest for stable callback refs

## Key Performance Principles

### Eliminating Waterfalls (CRITICAL Impact)

Waterfalls are the #1 performance killer. Each sequential await adds full network latency. Key strategies:

- **Defer await until needed**: Move await operations into branches where they're actually used
- **Parallelize independent operations**: Use Promise.all() for operations that don't depend on each other
- **Start promises early, await late**: In API routes and server components, kick off all async operations first
- **Strategic Suspense boundaries**: Use Suspense to stream content as it becomes available

### Bundle Size Optimization (CRITICAL Impact)

Reducing initial bundle size improves Time to Interactive and Largest Contentful Paint:

- **Avoid barrel file imports**: Import directly from source files to enable tree-shaking
- **Dynamic imports**: Use next/dynamic for heavy components that aren't needed immediately
- **Defer third-party libraries**: Load analytics and logging after hydration
- **Conditional module loading**: Only load modules when features are actually activated

### Server-Side Performance (HIGH Impact)

Optimize server-side rendering and data fetching:

- **Per-request deduplication**: Use React.cache() to deduplicate fetches within a request
- **Cross-request caching**: Use LRU cache for data that can be shared across requests
- **Minimize serialization**: Only pass necessary data to client components
- **Parallel component fetching**: Restructure component tree to parallelize data fetching

### Re-render Optimization (MEDIUM Impact)

Reduce unnecessary re-renders:

- **Defer state reads**: Don't subscribe to state that's only used in callbacks
- **Extract memoized components**: Use memo() for expensive subtrees that don't need to re-render
- **Narrow dependencies**: Use primitive values in useEffect dependencies instead of objects
- **Subscribe to derived state**: Use boolean values from media queries instead of continuous values

### Rendering Performance (MEDIUM Impact)

Optimize what the browser needs to render:

- **Hoist static JSX**: Extract JSX that doesn't change outside component functions
- **Use Activity component**: Preserve state and DOM for frequently toggled expensive components
- **Content visibility**: Use CSS content-visibility for long lists to skip offscreen rendering
- **Explicit conditionals**: Use ternary operators instead of && to avoid rendering false/0

## Common Patterns

### Parallel Data Fetching

**Incorrect: Sequential waterfalls**
```typescript
async function Page() {
  const user = await fetchUser()
  const posts = await fetchPosts(user.id)
  return <div>{/* render */}</div>
}
```

**Correct: Parallel fetching**
```typescript
async function Page() {
  const [user, posts] = await Promise.all([
    fetchUser(),
    fetchPosts()
  ])
  return <div>{/* render */}</div>
}
```

### Dynamic Imports

**Incorrect: Always in bundle**
```typescript
import HeavyChart from './HeavyChart'

function Dashboard({ showChart }) {
  return showChart ? <HeavyChart /> : null
}
```

**Correct: Load only when needed**
```typescript
import dynamic from 'next/dynamic'

const HeavyChart = dynamic(() => import('./HeavyChart'))

function Dashboard({ showChart }) {
  return showChart ? <HeavyChart /> : null
}
```

### Memoization

**Incorrect: Re-renders on every parent render**
```typescript
function Parent() {
  const [count, setCount] = useState(0)
  return <ExpensiveChild data={largeData} />
}
```

**Correct: Memo prevents unnecessary re-renders**
```typescript
import { memo } from 'react'

const ExpensiveChild = memo(({ data }) => {
  // expensive rendering
})

function Parent() {
  const [count, setCount] = useState(0)
  return <ExpensiveChild data={largeData} />
}
```

## References

- [React Documentation](https://react.dev)
- [Next.js Documentation](https://nextjs.org)
- [SWR Documentation](https://swr.vercel.app)
- [Vercel Blog: How we optimized package imports in Next.js](https://vercel.com/blog/how-we-optimized-package-imports-in-next-js)
- [Vercel Blog: How we made the Vercel dashboard twice as fast](https://vercel.com/blog/how-we-made-the-vercel-dashboard-twice-as-fast)
