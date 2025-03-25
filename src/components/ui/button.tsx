import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center text-base tracking-wide font-semibold whitespace-nowrap rounded-full transition-colors cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-gray-light text-gray-base hover:drop-shadow-[0_2px_2px_rgba(34,34,34,0.50)]",
        secondary:
          "bg-black text-white hover:drop-shadow-[0_2px_2px_rgba(34,34,34,0.50)]",
        ghost: "bg-transparent text-black text-sm",
      },
      size: {
        default: "p-3",
        sm: "p-0",
        md: "p-1",
        circle: "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
