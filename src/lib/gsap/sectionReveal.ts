import gsap from "gsap";
import { motion, type MotionOverlap, type MotionStagger } from "./motion";
import { shouldSimplifyMotion } from "./responsive";
import { getRevealVars, type RevealPreset } from "./reveal";
import { sectionSelectors } from "./selectors";
import { overlapPosition } from "./timeline";

type SelectorFn = (selector: string) => Element[];

type HeaderRevealConfig = {
  badgePreset?: RevealPreset;
  titlePreset?: RevealPreset;
  subtitlePreset?: RevealPreset;
  titleOverlap?: MotionOverlap;
  subtitleOverlap?: MotionOverlap;
};

const defaultHeaderConfig: Required<HeaderRevealConfig> = {
  badgePreset: "fadeUpSm",
  titlePreset: "fadeUpXl",
  subtitlePreset: "fadeUpLg",
  titleOverlap: "base",
  subtitleOverlap: "loose",
};

export function addSectionHeaderReveal(
  timeline: gsap.core.Timeline,
  q: SelectorFn,
  config: HeaderRevealConfig = {},
) {
  const {
    badgePreset,
    titlePreset,
    subtitlePreset,
    titleOverlap,
    subtitleOverlap,
  } = { ...defaultHeaderConfig, ...config };

  timeline.from(
    q(sectionSelectors.badge),
    getRevealVars(badgePreset, { duration: motion.duration.fast }),
  );

  timeline.from(
    q(sectionSelectors.title),
    getRevealVars(titlePreset),
    overlapPosition(titleOverlap),
  );

  timeline.from(
    q(sectionSelectors.subtitle),
    getRevealVars(subtitlePreset),
    overlapPosition(subtitleOverlap),
  );

  return timeline;
}

export function addSectionItemsReveal(
  timeline: gsap.core.Timeline,
  q: SelectorFn,
  options: {
    stagger?: MotionStagger;
    preset?: RevealPreset;
    overlap?: MotionOverlap;
  } = {},
) {
  const {
    stagger = "base",
    preset = "fadeUpMd",
    overlap = "base",
  } = options;

  timeline.from(
    q(sectionSelectors.item),
    getRevealVars(preset, {
      stagger: motion.stagger[stagger],
      duration: motion.duration.fast,
    }),
    overlapPosition(overlap),
  );

  return timeline;
}

export function bindCardHoverLift(elements: Element | Element[]) {
  if (shouldSimplifyMotion()) {
    return () => undefined;
  }

  const cards = gsap.utils.toArray<Element>(elements);
  const cleanups: Array<() => void> = [];

  cards.forEach((card) => {
    const hoverIn = () => {
      gsap.to(card, {
        y: motion.hover.lift,
        duration: motion.duration.fast,
        ease: motion.ease.soft,
      });
    };

    const hoverOut = () => {
      gsap.to(card, {
        y: 0,
        duration: motion.duration.fast,
        ease: motion.ease.soft,
      });
    };

    card.addEventListener("mouseenter", hoverIn);
    card.addEventListener("mouseleave", hoverOut);

    cleanups.push(() => {
      card.removeEventListener("mouseenter", hoverIn);
      card.removeEventListener("mouseleave", hoverOut);
    });
  });

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
}
