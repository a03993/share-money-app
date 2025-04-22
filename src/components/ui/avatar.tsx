// customized from shadcn
import { cn } from "@/lib/utils";

import * as React from "react";

import * as AvatarPrimitive from "@radix-ui/react-avatar";

function Avatar({
  className,
  size = "md",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: "lg" | "md" | "sm";
}) {
  const sizeClasses = {
    lg: "size-12",
    md: "size-9",
    sm: "size-7",
  };

  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full",
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  size = "md",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback> & {
  size?: "lg" | "md" | "sm";
}) {
  const sizeClasses = {
    lg: "text-2xl font-semibold",
    md: "text-lg font-semibold",
    sm: "text-base font-medium",
  };

  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full text-white",
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarFallback };
