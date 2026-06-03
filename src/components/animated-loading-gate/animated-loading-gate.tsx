import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useIsClient } from "usehooks-ts";

interface Props {
  children: React.ReactNode;
}

function setReady() {
  document.documentElement.dataset.ready = "true";
  document.body.dataset.ready = "true";
}

export function AnimatedLoadingGate({ children }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const isClient = useIsClient();

  return (
    <AnimatePresence>
      {isClient && (
        <motion.div
          data-slot="animated-loading-gate"
          data-testid="animated-loading-gate"
          initial={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.375,
            ease: [0.4, 0, 0.2, 1],
          }}
          onAnimationComplete={setReady}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
