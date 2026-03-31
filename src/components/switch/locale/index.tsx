import { useLocale } from "@/i18n/use-locale";
import { AnimatePresence, motion, TargetAndTransition } from "motion/react";
import { Button } from "../../ui";

export default function LocaleSwitch() {
  const { locale, toggleLocale } = useLocale();

  return (
    <Button id="btn" onClick={toggleLocale}>
      <AnimatePresence initial={false}>
        {locale === "pt-BR" ? (
          <Locale
            key={locale}
            inactiveVariant={{
              scale: 0,
              rotate: 90,
            }}
          >
            PT
          </Locale>
        ) : null}
        {locale === "en-US" ? (
          <Locale
            key={locale}
            inactiveVariant={{
              scale: 0,
              rotate: -90,
            }}
          >
            EN
          </Locale>
        ) : null}
      </AnimatePresence>
    </Button>
  );
}

const Locale = ({
  children,
  inactiveVariant,
}: {
  children: React.ReactNode;
  inactiveVariant: TargetAndTransition;
}) => {
  return (
    <motion.span
      className="absolute h-[1.2rem] w-[1.2rem]"
      variants={{
        active: {
          scale: 1,
          rotate: 0,
        },
      }}
      initial={inactiveVariant}
      animate={"active"}
      exit={inactiveVariant}
      transition={
        //Tailwind's config
        { duration: 0.15, ease: [0.4, 0, 0.2, 1] }
      }
    >
      {children}
    </motion.span>
  );
};
