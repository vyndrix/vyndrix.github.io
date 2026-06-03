import {
  motion,
  useAnimationFrame,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useStableRandom } from "@/hooks/use-stable-random";
import React, { useRef } from "react";
import { useMediaQuery } from "usehooks-ts";
import Provider from "./aerostat-provider";
import { useAerostatPositionRatting } from "./use-aerostat-position-ratting";

function Group({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      data-slot="aerostat-group"
      data-testid="aerostat-group"
      variants={{
        inactive: {},
        active: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
      initial="inactive"
      animate="active"
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
    >
      {children}
    </motion.div>
  );
}

interface DialogProps {
  position: { x: number; y: number };
  withArrow?: boolean;
}

function Dialog({
  position,
  withArrow = false,
  children,
  ...props
}: DialogProps & React.ComponentProps<"span">) {
  const breakPoint = useMediaQuery("(max-width: 470px)");
  const shouldReduceMotion = useReducedMotion();

  const ref = useRef<HTMLDivElement>(null);
  const randomizer = useStableRandom(200);

  const { xRat, yRat } = useAerostatPositionRatting();
  const right = useTransform(xRat, (xr) => position.x * xr);
  const bottom = useTransform(
    yRat,
    (yr) => position.y * yr + (breakPoint ? 20 : 0),
  );

  useAnimationFrame((t) => {
    if (!ref.current) return;

    const scale = 1 + Math.sin(t / (350 + randomizer)) * 0.05;
    const x = 5 * Math.sin(t / (550 + randomizer));
    const y = 10 * Math.sin(t / (750 + randomizer));
    const z = 4 * Math.sin(t / (1150 + randomizer)) - 2;

    ref.current.style.transform = `
      scale(${scale}) 
      rotateX(${x}deg)
      rotateY(${-y}deg) 
      rotateZ(${z}deg)`;
  });

  return (
    <motion.div
      ref={ref}
      data-slot="aerostat-dialog"
      data-testid="aerostat-dialog"
      variants={{
        inactive: {
          opacity: 0,
          scale: shouldReduceMotion ? 1 : 0,
          filter: shouldReduceMotion ? "none" : "blur(8px)",
        },
        active: {
          opacity: 1,
          scale: 1,
          filter: shouldReduceMotion ? "none" : "blur(0px)",
        },
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.3,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="absolute border border-primary bg-secondary p-2 px-3 font-bold"
      style={{ right, bottom }}
    >
      <span {...props}>{children}</span>
      {withArrow && (
        <div
          data-slot="aerostat-arrow"
          data-testid="aerostat-arrow"
          className="absolute -bottom-4 -right-px border-l-20 border-l-transparent border-t-16 border-t-primary"
        />
      )}
    </motion.div>
  );
}

export const Aerostat = Object.assign(() => {}, {
  Provider,
  Group,
  Dialog,
});
