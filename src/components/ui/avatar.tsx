import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { motion } from "motion/react";
import * as React from "react";

import { cn } from "@/lib/utils";

const Avatar = motion.create(
  ({
    className,
    ...props
  }: React.ComponentProps<typeof AvatarPrimitive.Root>) => {
    return (
      <AvatarPrimitive.Root
        data-slot="avatar"
        className={cn(
          "transition-colors delay-700 bg-muted relative flex shrink-0 overflow-hidden rounded-full size-24 border border-muted/50 self-center",
          className,
        )}
        {...props}
      />
    );
  },
);

const Image = ({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) => {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("h-full w-full object-cover", className)}
      {...props}
    />
  );
};

const Fallback = ({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) => {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className,
      )}
      {...props}
    />
  );
};

export default Object.assign(Avatar, {
  Image,
  Fallback,
});
