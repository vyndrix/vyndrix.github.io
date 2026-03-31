import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const variants = cva("transition-colors delay-700 text-foreground", {
  variants: {
    size: {
      lg: "text-3xl font-medium",
      md: "text-2xl font-medium",
      sm: "text-lg",
      xs: "",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

export default function Title({
  className,
  size,
  ...props
}: React.ComponentProps<"h1"> & VariantProps<typeof variants>) {
  const classes = cn(variants({ size, className }));

  if (size === "lg") return <h1 className={classes} {...props} />;

  if (size === "md") return <h2 className={classes} {...props} />;

  if (size === "sm") return <h3 className={classes} {...props} />;

  return <h4 className={classes} {...props} />;
}
