import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva } from "class-variance-authority";
import { cn } from "cn"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-white text-zinc-900 hover:bg-zinc-200 font-semibold shadow-sm active:scale-[0.99]",
        outline:
          "border border-zinc-700 bg-transparent hover:bg-zinc-800/80 hover:border-zinc-600 text-zinc-100 font-medium active:scale-[0.99]",
        secondary:
          "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 font-semibold active:scale-[0.99]",
        ghost:
          "hover:bg-zinc-800 hover:text-white active:scale-[0.99]",
        destructive:
          "bg-red-600 hover:bg-red-700 text-white font-semibold shadow-sm active:scale-[0.99]",
        blue:
          "bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm active:scale-[0.99]",
        link:
          "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-10 gap-2 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        xs:
          "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm:
          "h-8 gap-1.5 rounded-[min(var(--radius-md),12px)] px-3 text-[0.825rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3.5",
        lg:
          "h-11 gap-2 rounded-xl px-5 text-base has-data-[icon=inline-end]:pr-3.5 has-data-[icon=inline-start]:pl-3.5",
        icon:
          "size-10 rounded-lg",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg":
          "size-11 rounded-xl",
        xl:
          "h-14 sm:h-16 rounded-2xl px-10 sm:px-14 text-base sm:text-lg font-bold tracking-wide shadow-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
