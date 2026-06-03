import { cn } from "@/lib/utils";

export default function Grid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-testid="grid"
      className={cn("grid sm:grid-cols-2 gap-4", className)}
    >
      {children}
    </div>
  );
}
