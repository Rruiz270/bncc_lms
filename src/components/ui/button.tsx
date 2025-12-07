import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary-azure text-primary-black shadow hover:bg-primary-azure/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-primary-azure bg-transparent text-primary-azure shadow-sm hover:bg-primary-azure hover:text-primary-black",
        secondary: "bg-primary-gray text-primary-powder shadow-sm hover:bg-primary-gray/80",
        ghost: "hover:bg-primary-azure/10 hover:text-primary-azure",
        link: "text-primary-azure underline-offset-4 hover:underline",
        builder: "bg-builder text-primary-black shadow hover:bg-builder/90",
        manager: "bg-manager text-primary-powder shadow hover:bg-manager/90",
        creator: "bg-creator text-primary-black shadow hover:bg-creator/90",
        player: "bg-player text-primary-black shadow hover:bg-player/90",
        trainer: "bg-trainer text-primary-powder shadow hover:bg-trainer/90",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }