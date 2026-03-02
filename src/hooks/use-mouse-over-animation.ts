import { MotionStyle, transform, useAnimate } from "motion/react";
import { useEventListener } from "usehooks-ts";

const FIXED_PERSPECTIVE_STYLE: MotionStyle = {
  transformPerspective: "5cm",
};

export function useMouseOverAnimation(increaseRatting: number = 1) {
  const [scope, animate] = useAnimate<HTMLElement>();

  useEventListener(
    "pointermove",
    (event: PointerEvent) => {
      const { width, height } = scope.current!.getBoundingClientRect();

      const xr = transform(
        event.offsetY / height,
        [0, 1],
        [-5 * increaseRatting, 5 * increaseRatting],
      );
      const yr = transform(
        event.offsetX / width,
        [0, 1],
        [5 * increaseRatting, -5 * increaseRatting],
      );
      const zr = transform(
        event.offsetX / width,
        [0, 1],
        [1 * increaseRatting, -1 * increaseRatting],
      );

      animate(
        scope.current,
        {
          rotateX: `${xr}deg`,
          rotateY: `${yr}deg`,
          rotateZ: `${zr}deg`,
          scale: 1.05,
          zIndex: 20,
        },
        {
          duration: 0.15,
        },
      );
    },
    scope,
  );

  useEventListener(
    "pointerleave",
    () => {
      animate(
        scope.current,
        {
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          zIndex: 10,
        },
        {
          ease: [0.4, 0, 0.2, 1],
          duration: 0.375,
        },
      );
    },
    scope,
  );

  return {
    scope,
    style: FIXED_PERSPECTIVE_STYLE,
  };
}
