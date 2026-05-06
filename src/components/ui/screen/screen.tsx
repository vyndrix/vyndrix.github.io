import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";

export default function Screen({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="flex justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          layout
          variants={{
            inactive: {
              opacity: 0,
              scale: shouldReduceMotion ? 1 : 0.98,
              filter: shouldReduceMotion ? "none" : "blur(8px)",
            },
            active: { opacity: 1, scale: 1, filter: "blur(0px)" },
          }}
          initial="inactive"
          animate="active"
          exit="inactive"
          transition={{
            duration: shouldReduceMotion ? 0 : 0.375,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="flex flex-col gap-6 basis-2xl md:basis-3xl p-4 my-4 mb-16"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
