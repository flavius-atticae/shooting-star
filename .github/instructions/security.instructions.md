---
description: Security rules for routes and user-facing forms
applyTo: "app/routes/**, app/components/layout/contact/**"
---

# Security Guidelines

Scoped to routes and contact components — where user input enters the system.

## Input sanitization

All user input (name, email, message) must be sanitized before any processing or storage. The project uses `sanitizeHtml` from `~/lib/security.server`. Never skip this step:

```ts
// ✅
const safeName = sanitizeHtml(formData.get("name"));

// ❌
const name = formData.get("name"); // raw input, never use directly in emails or responses
```

Never use `.innerHTML` to render user-controlled content. Use `.textContent` or React's default rendering (which escapes by default).

## No hardcoded secrets

Never commit API keys, SMTP credentials, or any secret in source code. Always read from environment variables:

```ts
// ✅
const apiKey = process.env.RESEND_API_KEY;

// ❌
const apiKey = "re_abc123...";
```

Secrets for Fly.io are set via `fly secrets set KEY=value` — never in `fly.toml`.

## Server-only modules

Files that handle secrets, email sending, or database access must end in `.server.ts`. React Router will refuse to bundle them client-side:

```ts
// ✅ app/lib/email.server.ts
// ✅ app/lib/contact-action.server.ts

// ❌ app/lib/email.ts — may leak into the client bundle
```

## Form actions

Route `action` functions must:
1. Validate all fields before processing (type, length, format)
2. Return structured errors — never throw raw exceptions to the client
3. Use `json()` with a 400 status for validation errors, 500 for server errors

```ts
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const errors = validateContactForm(formData);
  if (errors) return json({ errors }, { status: 400 });

  try {
    await sendContactEmail(formData);
    return json({ success: true });
  } catch {
    return json({ error: "server_error" }, { status: 500 });
  }
}
```

## Security headers

HTTP security headers are set at the Fly.io / server level — not in component code. If adding or modifying headers, update the server entry (`app/entry.server.tsx`) or the Fly.io config, and document the change in the PR.

Required headers (already configured):
- `Content-Security-Policy`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`

## Dependencies

After any `npm install`, run `npm audit` to check for vulnerabilities. Do not introduce packages with known HIGH or CRITICAL vulnerabilities without explicit justification and a mitigation plan.
