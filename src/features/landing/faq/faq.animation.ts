import gsap from "gsap";
import {
  createMotionTimeline,
  getRevealVars,
  getScrollTriggerConfig,
  killScopeScrollTriggers,
  motion,
  sectionSelectors,
} from "@/lib/gsap";

const faqAccordionSelector = "[data-faq-accordion]";

export function createFaqAnimation(scope: HTMLElement) {
  const q = gsap.utils.selector(scope);

  const tl = createMotionTimeline({
    scrollTrigger: getScrollTriggerConfig(scope, "revealLate"),
  });

  tl.from(
    q(sectionSelectors.label),
    getRevealVars("fadeUpLg", { duration: motion.duration.fast }),
  );

  const accordion = q(faqAccordionSelector)[0];
  if (accordion) {
    gsap.set(accordion, { clearProps: "opacity,transform,visibility" });
  }

  return () => {
    if (accordion) {
      gsap.set(accordion, { clearProps: "opacity,transform,visibility" });
    }
    tl.kill();
    killScopeScrollTriggers(scope);
  };
}
