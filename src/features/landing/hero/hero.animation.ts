import gsap from "gsap";
import {
  addSectionHeaderReveal,
  addSectionItemsReveal,
  createMotionTimeline,
  getRevealVars,
  heroSelectors,
  motion,
  overlapPosition,
} from "@/lib/gsap";

export function createHeroTimeline(scope: HTMLElement) {
  const q = gsap.utils.selector(scope);
  const tl = createMotionTimeline();

  addSectionHeaderReveal(tl, q, {
    badgePreset: "fadeUpSm",
    titlePreset: "fadeUpXl",
    subtitlePreset: "fadeUpLg",
    titleOverlap: "loose",
    subtitleOverlap: "relaxed",
  });

  const compare = q(heroSelectors.compare)[0];
  const cards = q(heroSelectors.compareCard);
  const compareLinks = q(heroSelectors.compareLinks);

  if (compare) {
    tl.from(
      compare,
      getRevealVars("fadeUpLg", { duration: motion.duration.base }),
      overlapPosition("base"),
    );
  }

  if (cards.length) {
    tl.from(
      cards,
      getRevealVars("fadeUpMd", {
        stagger: motion.stagger.tight,
        duration: motion.duration.fast,
      }),
      overlapPosition("tight"),
    );
  }

  if (compareLinks.length) {
    tl.from(
      compareLinks,
      {
        opacity: 0,
        duration: motion.duration.base,
        ease: motion.ease.soft,
      },
      overlapPosition("tight"),
    );
  }

  addSectionItemsReveal(tl, q, {
    preset: "fadeUpMd",
    stagger: "base",
    overlap: "loose",
  });

  return tl;
}
