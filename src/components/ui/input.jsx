import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-base transition-all duration-200 outline-none file:inline-flex file:h-7 file:border-0 file:bg-white/10 file:rounded-lg file:px-3 file:text-xs file:font-semibold file:text-foreground file:mr-3 hover:file:bg-white/20 file:cursor-pointer placeholder:text-muted-foreground/60 focus-visible:border-indigo-500/60 focus-visible:ring-4 focus-visible:ring-indigo-500/15 focus-visible:bg-white/[0.07] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm shadow-inner",
        className
      )}
      {...props}
    />
  )
}

export { Input }
