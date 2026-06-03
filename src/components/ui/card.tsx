import { useMouseOverAnimation } from "@/hooks/use-mouse-over-animation";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Base } from "./base";

const WRAPPER_STYLES: string = `flex
                                flex-col
                                gap-1
                                mx-2
                                sm:mx-0
                                p-4
                                bg-background
                                border
                                transition-colors
                                ease-in-out
                                motion-reduce:duration-0
                                duration-700`;

const Card = ({
  children,
  className,
  animated = false,
}: {
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
}) => {
  if (animated)
    return <AnimatedWrapper className={className}>{children}</AnimatedWrapper>;

  return <RegularWrapper className={className}>{children}</RegularWrapper>;
};

const RegularWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <article className={cn(WRAPPER_STYLES, className)}>{children}</article>
  );
};

const AnimatedWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { scope, style } = useMouseOverAnimation();

  return (
    <motion.article
      ref={scope}
      style={style}
      className={cn(
        "hover:bg-card-background hover:duration-250",
        WRAPPER_STYLES,
        className,
      )}
    >
      {children}
    </motion.article>
  );
};

const Title = ({
  children,
  size = "lg",
}: {
  children: React.ReactNode;
  size?: "lg" | "md";
}) => {
  const bSize = size === "lg" ? "sm" : "xs";

  return (
    <Base.Title size={bSize} className="pointer-events-none">
      {children}
    </Base.Title>
  );
};

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <header
      data-testid="card-header"
      className="flex gap-2 items-center pointer-events-none"
    >
      {children}
    </header>
  );
};

const Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <p
      data-testid="card-content"
      className="flex flex-1 pt-0.5 pb-4 text-sm text-justify text-muted-foreground pointer-events-none"
    >
      {children}
    </p>
  );
};

const Footer = ({ children }: { children: React.ReactNode }) => {
  return (
    <footer
      data-testid="card-footer"
      className="flex flex-col self-start md:self-end gap-2 pointer-events-none"
    >
      {children}
    </footer>
  );
};

export default Object.assign(Card, {
  Title,
  Header,
  Footer,
  Content,
});
