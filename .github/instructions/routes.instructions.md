---
description: Architecture rules for React Router v7 route files
applyTo: "app/routes/**"
---

# Route Architecture

## File structure

Every route file follows this order — no exceptions:

```tsx
// 1. Type imports (React Router generated types)
import type { Route } from "./+types/my-route";

// 2. React Router hooks
import { useLoaderData } from "react-router";

// 3. Component imports
import { Header } from "~/components/layout/header/header";

// 4. Server-side data import (loader/action only)
import { getMyPageContent } from "~/lib/content.server";

// 5. loader (optional)
export function loader(): { myContent: MyContent } { ... }

// 6. action (optional, contact route only)
export async function action({ request }: Route.ActionArgs) { ... }

// 7. meta
export function meta(_args: Route.MetaArgs) { ... }

// 8. Page component (default export)
export default function MyPage() { ... }
```

## loader

Return a plain object — never `json()` or `new Response()`:

```tsx
// ✅
export function loader() {
  return { myContent: getMyPageContent() };
}

// ❌
export function loader() {
  return json({ myContent: getMyPageContent() });
}
```

Type `useLoaderData` with the loader function, not a manual type:

```tsx
const { myContent } = useLoaderData<typeof loader>();
```

## meta

Always return an array with at minimum `title`, `description`, and `keywords`:

```tsx
export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Page title - Pauline Roussel" },
    { name: "description", content: "French description for Québec audience." },
    { name: "keywords", content: "keyword1, keyword2, yoga, doula, Québec" },
  ];
}
```

The `_args` parameter is prefixed with `_` when unused.

## Data access

Routes **never** import directly from `app/data/*`. Always go through `content.server.ts`:

```tsx
// ✅
import { getDoulaContent } from "~/lib/content.server";

// ❌
import { doulaServices } from "~/data/doula";
```

If a route has no dynamic data (e.g., yoga, feminin-sacré with static content), omit the loader entirely and inline the content in JSX.

## Page component structure

```tsx
export default function DoulaPage() {
  const { doulaContent } = useLoaderData<typeof loader>();

  return (
    <>
      <Header />
      <main id="main-content">
        {/* Section comments explain purpose */}
        <Hero variant="default" title={"Titre\nde la page"} subtitle="AVEC PAULINE ROUSSEL" />
        {/* ... */}
      </main>
      <Footer />
    </>
  );
}
```

- `<main>` always has `id="main-content"` for skip-navigation
- `<Header />` and `<Footer />` are included in every page — there is no layout wrapper
- Section comments describe the purpose of each block (`{/* Hero Section - ... */}`)
- Multi-line titles use `\n` inside a template: `{"Ligne 1\nligne 2"}`

## SSR awareness

Routes are server-rendered. Never access `window`, `document`, or `localStorage` at the module level or in loaders/actions. Browser-only code goes inside `useEffect` or is guarded with `typeof window !== "undefined"`.

## Error handling

The `health.tsx` route is the health check endpoint — do not modify it. For contact form errors, return structured error objects from `action`, not thrown `Response` objects.
