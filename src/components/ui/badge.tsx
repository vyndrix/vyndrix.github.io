import * as React from "react";
import AppIcon from "./icon";

import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Badge = ({ children, className }: Props) => {
  return (
    <span
      data-testid="badge"
      className={cn(
        `flex
        transition-color
        border-transparent
        bg-secondary
        text-secondary-foreground
        duration-700
        ease-in-out
        motion-reduce:duration-0
        items-center
        justify-center
        border
        px-2
        py-1
        text-xs
        font-medium
        [&>svg]:size-3.5
        [&>svg]:pointer-events-none`,
        className,
      )}
    >
      {children}
    </span>
  );
};

const Group = ({ children, className }: Props) => {
  return (
    <div
      data-testid="badge-group"
      className={cn("flex flex-wrap gap-2", className)}
    >
      {children}
    </div>
  );
};

const Icon = ({
  className,
  ...props
}: React.ComponentProps<typeof AppIcon>) => {
  return (
    <AppIcon
      {...props}
      className={cn(
        "transition-colors delay-700 mr-2 w-6 h-6 text-foreground",
        className,
      )}
    />
  );
};

const Text = ({ children, className }: Props) => {
  return (
    <span
      className={cn("transition-colors delay-700 text-foreground", className)}
    >
      {children}
    </span>
  );
};

export default Object.assign(Badge, {
  Group,
  Icon,
  Text,
});
