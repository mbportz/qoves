import type gsap from "gsap";
import { motion } from "./motion";

type TweenVars = gsap.TweenVars;

export const reveal = {
  fadeIn: {
    opacity: 0,
  },
  fadeUpSm: {
    opacity: 0,
    y: motion.offset.sm,
  },
  fadeUpMd: {
    opacity: 0,
    y: motion.offset.md,
  },
  fadeUpLg: {
    opacity: 0,
    y: motion.offset.lg,
  },
  fadeUpXl: {
    opacity: 0,
    y: motion.offset.xl,
  },
  fadeUpXxl: {
    opacity: 0,
    y: motion.offset.xxl,
  },
  scrubFadeUp: {
    opacity: 0.6,
    y: motion.offset.xxl,
  },
} as const;

export type RevealPreset = keyof typeof reveal;

export function getRevealVars(
  preset: RevealPreset,
  overrides: TweenVars = {},
): TweenVars {
  return {
    ...reveal[preset],
    ...overrides,
  };
}
