// customized from shadcn
import { cn } from "@/lib/utils";

import * as React from "react";

import * as TabsPrimitive from "@radix-ui/react-tabs";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "flex h-13 px-7 items-center justify-end sm:justify-start gap-4 bg-gray-lighter",
      "fixed top-0 left-0 right-0 z-50",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    isMobile?: boolean;
    isDesktop?: boolean;
    isLogo?: boolean;
  }
>(({ isMobile, isDesktop, isLogo, className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "whitespace-nowrap text-base font-semibold text-gray-base opacity-30",
      "hover:opacity-100 cursor-pointer data-[state=active]:opacity-100",
      isMobile && "sm:hidden",
      isDesktop && "sm:block hidden",
      isLogo && "text-2xl text-black font-black opacity-100",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn("flex justify-center items-center pt-30 pb-40", className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
