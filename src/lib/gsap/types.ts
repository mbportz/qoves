import type gsap from "gsap";
import type { ScrollTrigger } from "gsap/ScrollTrigger";

export type SectionAnimationResult =
  | gsap.core.Timeline
  | gsap.core.Tween
  | ScrollTrigger
  | (() => void)
  | void;

export type SectionAnimationFactory = (
  scope: HTMLElement,
) => SectionAnimationResult;
