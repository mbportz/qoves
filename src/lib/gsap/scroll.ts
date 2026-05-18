import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "./motion";

type ScrollPreset = keyof typeof motion.scroll;

export function getScrollTriggerConfig(
  trigger: HTMLElement,
  preset: ScrollPreset = "reveal",
) {
  return {
    trigger,
    ...motion.scroll[preset],
  };
}

export function killScopeScrollTriggers(scope: HTMLElement) {
  ScrollTrigger.getAll().forEach((instance) => {
    const trigger = instance.trigger;

    if (
      trigger === scope ||
      (trigger instanceof HTMLElement && scope.contains(trigger))
    ) {
      instance.kill();
    }
  });
}
