import * as React from "react"
import { cn } from "cn"

function Textarea({
  className,
  ...props
}) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-24 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-base transition-all duration-200 outline-none placeholder:text-muted-foreground/60 focus-visible:border-indigo-500/60 focus-visible:ring-4 focus-visible:ring-indigo-500/15 focus-visible:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm shadow-inner",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
