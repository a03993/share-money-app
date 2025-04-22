// customized from shadcn
import { cn } from "@/lib/utils";

import * as React from "react";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "placeholder:text-gray-dark placeholder:font-light text-base flex w-full min-w-0 p-3 rounded-full border border-gray-dark bg-gray-lightest outline-none h-13",
        "disabled:cursor-default disabled:placeholder:text-gray-light disabled:border-gray-light",
        type === "number" &&
          "appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
