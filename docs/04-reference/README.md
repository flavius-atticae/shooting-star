# Reference

Reference documentation, guidelines, and troubleshooting for the Shooting Star project.

## Contents

- **[Component Template](component-template.md)** - Standard structure for React components
  - Import order guidelines
  - TypeScript interface patterns
  - JSDoc documentation standards
  - Accessibility requirements (WCAG 2.1 AA)
  - Export patterns and naming conventions
  - Complete examples for UI, layout, and complex components

- **[Security Guidelines](guidelines.md)** - Security best practices and GDPR compliance
  - GDPR, PIPEDA, and Québec Law 25 compliance
  - Web application security
  - Form security and validation
  - Data encryption and protection

- **[Troubleshooting](troubleshooting.md)** - Common issues and solutions

## Component Standards Quick Reference

All React components follow these standards:

### Structure
```typescript
// 1. Imports (ordered)
import * as React from "react";
import { cn } from "~/lib/utils";

// 2. Types
export interface ComponentNameProps extends React.HTMLAttributes<HTMLElement> {
  /** Prop description */
  propName: string;
}

// 3. Component with JSDoc
/**
 * ComponentName - Brief description
 *
 * Detailed description with features and accessibility info.
 *
 * @example
 * ```tsx
 * <ComponentName propName="value" />
 * ```
 */
export function ComponentName({ propName, className, ...props }: ComponentNameProps) {
  return <div className={cn("base-classes", className)} {...props} />;
}
```

### Requirements
- ✅ Explicit TypeScript interfaces for all props
- ✅ JSDoc documentation for every exported component
- ✅ Accessibility documentation (WCAG 2.1 AA)
- ✅ Usage examples in JSDoc
- ✅ Named exports only (no default exports)
- ✅ Pregnancy-safe design considerations where applicable

See [Component Template](component-template.md) for complete guidelines and examples.

[← Back to Documentation](../)
