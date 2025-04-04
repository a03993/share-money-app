"use client";

import { cn } from "@/lib/utils";

import * as React from "react";

import * as TogglePrimitive from "@radix-ui/react-toggle";
import { type VariantProps, cva } from "class-variance-authority";

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-full cursor-pointer",
  {
    variants: {
      variant: {
        default: "",
        outline: "outline outline-1 outline-gray-dark outline-offset-3",
      },
      size: {
        default: "size-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
