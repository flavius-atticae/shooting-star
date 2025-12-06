import * as React from "react"

import { cn } from "~/lib/utils"

function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Base styling
        "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2",
        "text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm",
        // Placeholder and selection styling
        "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
        // Dark mode and disabled states
        "dark:bg-input/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        // Focus states
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        // Invalid states
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        // Resize behavior
        "resize-y",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
