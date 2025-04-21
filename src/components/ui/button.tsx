import { cn } from "@/lib/utils";

import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center text-base tracking-wide font-semibold whitespace-nowrap rounded-full transition-colors cursor-pointer disabled:cursor-default",
  {
    variants: {
      variant: {
        default:
          "bg-gray-light text-gray-base hover:drop-shadow-[0_2px_2px_rgba(34,34,34,0.50)] disabled:bg-gray-lightest",
        secondary:
          "bg-black text-white hover:drop-shadow-[0_2px_2px_rgba(34,34,34,0.50)]",
        ghost: "bg-transparent text-black text-sm hover:bg-gray-light/50",
        link: "bg-white border border-gray-base text-gray-base text-sm font-normal",
      },
      size: {
        default: "p-3",
        sm: "p-0",
        md: "p-1",
        lg: "p-2",
        circle: "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
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
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
