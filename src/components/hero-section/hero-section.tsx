import { aerostats } from "@/data/aerostats";
import { useMouseOverAnimation } from "@/hooks/use-mouse-over-animation";
import AvatarSource from "@/public/avatar.jpg";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Trans } from "@lingui/react/macro";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { AnimatePresence } from "motion/react";
import NextImage from "next/image";
import { useState } from "react";
import { Aerostat } from "../aerostat";
import { useFloatPositionObserver } from "../aerostat/use-aerostat-postition-observer";
import { Avatar, Dialog, Section } from "../ui";
import { Base } from "../ui/base";

export function HeroSection() {
  const { _ } = useLingui();
  const { scope, style } = useMouseOverAnimation(1.5);
  const [open, setOpen] = useState(false);
  const imageAlt = _(msg`Vyndrix's picture`);

  return (
    <Section>
      <Dialog open={open} onOpenChange={setOpen}>
        <Avatar ref={scope} style={style}>
          <Dialog.Trigger
            data-umami-event="avatar-click"
            className="cursor-pointer rounded-full size-full"
            aria-label={imageAlt}
          >
            <Avatar.Image src={AvatarSource.src} alt="" />
          </Dialog.Trigger>
          <Avatar.Fallback delayMs={1500}>
            <span className="text-3xl">RF</span>
          </Avatar.Fallback>
        </Avatar>
        <Dialog.Content
          showCloseButton={false}
          aria-describedby="hero-dialog-desc"
        >
          <VisuallyHidden asChild>
            <Dialog.Title>
              <Trans>Vyndrix | Ramon Fernandes picture</Trans>
            </Dialog.Title>
          </VisuallyHidden>
          <Aerostat.Provider>
            <HeroDialogImage open={open} />
          </Aerostat.Provider>
          <Dialog.Footer className="flex justify-center">
            <span
              id="hero-dialog-desc"
              data-testid="hero-dialog-caption"
              className="text-center text-xs text-foreground"
            >
              <Trans>
                Enjoying the day with my girlfriend at the sports store
              </Trans>
            </span>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
      <Base.Title size="lg" className="self-center mt-2 mb-3">
        <Trans>Hi, I{"'"}m Ramon</Trans>
      </Base.Title>
      <p
        data-testid="hero-section-bio"
        className="transition-colors delay-700 text-lg text-center text-foreground"
      >
        <Trans>
          A frontend and mobile developer focused on growing as a specialist in
          modern interfaces and design-driven experiences, which is also a
          long-time comics collector that{"'"}s permanently supervised by two
          lazy kitties
        </Trans>
      </p>
    </Section>
  );
}

const HeroDialogImage = ({ open }: { open: boolean }) => {
  const { _ } = useLingui();
  const ref = useFloatPositionObserver<HTMLImageElement>();
  const imageAlt = _(msg`Vyndrix's picture`);

  return (
    <div className="flex">
      <NextImage
        ref={ref}
        src={AvatarSource.src}
        width={AvatarSource.width}
        height={AvatarSource.height}
        alt={imageAlt}
      />
      <AnimatePresence mode="wait">
        {open && (
          <Aerostat.Group>
            {aerostats.map((float, index) => (
              <Aerostat.Dialog
                key={index}
                position={float.position}
                withArrow={float.withArrow}
                className="text-xl sm:text-2xl"
              >
                {typeof float.content !== "string"
                  ? _(float.content)
                  : float.content}
              </Aerostat.Dialog>
            ))}
          </Aerostat.Group>
        )}
      </AnimatePresence>
    </div>
  );
};
