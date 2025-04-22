// customized from shadcn
import { cn } from "@/lib/utils";

import * as React from "react";

import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default";
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "group rounded-full border-1 border-gray-dark bg-gray-lightest flex items-center justify-between p-3 cursor-pointer outline-none h-13 min-w-40",
        "data-[placeholder]:[&>span]:text-gray-dark data-[placeholder]:[&>span]:font-light",
        "disabled:data-[placeholder]:[&>span]:text-gray-light disabled:border-gray-light",
        "[&_[data-slot=select-value]]:flex [&_[data-slot=select-value]]:items-center [&_[data-slot=select-value]]:gap-1 [&_[data-slot=select-value]]:whitespace-nowrap",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-5 stroke-gray-dark group-disabled:stroke-gray-light" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-gray-lightest text-gray-dark relative z-50 max-h-[16rem] min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
        )}
        position={position}
        {...props}
      >
        {/* <SelectScrollUpButton /> */}
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1",
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        {/* <SelectScrollDownButton /> */}
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "text-gray-dark relative flex w-full cursor-pointer items-center gap-2 rounded-sm p-2 text-sm outline-none select-none",
        "*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        "hover:bg-gray-light/50",
        className,
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

// function SelectScrollUpButton({
//   className,
//   ...props
// }: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
//   return (
//     <SelectPrimitive.ScrollUpButton
//       data-slot="select-scroll-up-button"
//       className={cn(
//         "flex cursor-default items-center justify-center py-1",
//         className,
//       )}
//       {...props}
//     >
//       <ChevronUpIcon className="size-4" />
//     </SelectPrimitive.ScrollUpButton>
//   );
// }

// function SelectScrollDownButton({
//   className,
//   ...props
// }: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
//   return (
//     <SelectPrimitive.ScrollDownButton
//       data-slot="select-scroll-down-button"
//       className={cn(
//         "flex cursor-default items-center justify-center py-1",
//         className,
//       )}
//       {...props}
//     >
//       <ChevronDownIcon className="size-4" />
//     </SelectPrimitive.ScrollDownButton>
//   );
// }

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  // SelectScrollDownButton,
  // SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
