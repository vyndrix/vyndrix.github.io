import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { cn } from "@/lib/utils";

export default function Button({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(
        `inline-flex 
        items-center 
        justify-center 
        gap-2 
        whitespace-nowrap 
        rounded-md 
        text-sm 
        font-medium 
        disabled:pointer-events-none 
        disabled:opacity-50 
        [&_svg]:pointer-events-none 
        [&_svg:not([class*='size-'])]:size-4 
        [&_svg]:shrink-0 
        shrink-0 
        outline-none 
        focus-visible:border-ring 
        focus-visible:ring-ring/50 
        focus-visible:ring-[3px] 
        aria-invalid:ring-destructive/20 
        dark:aria-invalid:ring-destructive/40 
        aria-invalid:border-destructive
        motion-reduce:duration-0 
        transition-[background-color]
        duration-350 
        ease-in-out
        hover:duration-125
        hover:ease-in-out
        hover:bg-accent 
        hover:text-accent-foreground 
        dark:hover:bg-accent/50
        size-10`,
        className,
      )}
      {...props}
    />
  );
}
