import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "./motion";
import { shouldSimplifyMotion } from "./responsive";

export function bindGlowHover(
  target: Element,
  glowTarget?: Element | null,
) {
  if (shouldSimplifyMotion()) {
    return () => undefined;
  }

  const glow = glowTarget ?? target;

  const hoverIn = () => {
    gsap.to(glow, {
      opacity: 1,
      scale: 1.05,
      duration: motion.duration.fast,
      ease: motion.ease.soft,
    });
    gsap.to(target, {
      boxShadow: "0 20px 40px rgb(154 174 181 / 25%)",
      duration: motion.duration.fast,
      ease: motion.ease.soft,
    });
  };

  const hoverOut = () => {
    gsap.to(glow, {
      opacity: 0,
      scale: 1,
      duration: motion.duration.fast,
      ease: motion.ease.soft,
    });
    gsap.to(target, {
      boxShadow: "0 0 0 transparent",
      duration: motion.duration.fast,
      ease: motion.ease.soft,
    });
  };

  target.addEventListener("mouseenter", hoverIn);
  target.addEventListener("mouseleave", hoverOut);

  return () => {
    target.removeEventListener("mouseenter", hoverIn);
    target.removeEventListener("mouseleave", hoverOut);
  };
}

export function bindChartBarHover(chart: Element) {
  if (shouldSimplifyMotion()) {
    return () => undefined;
  }

  const bars = gsap.utils.toArray<SVGElement>("[data-hero-chart-bar]", chart);

  const hoverIn = () => {
    gsap.to(bars, {
      scaleY: 1.12,
      transformOrigin: "bottom center",
      duration: motion.duration.fast,
      ease: motion.ease.soft,
      stagger: motion.stagger.tight,
    });
  };

  const hoverOut = () => {
    gsap.to(bars, {
      scaleY: 1,
      duration: motion.duration.fast,
      ease: motion.ease.soft,
      stagger: motion.stagger.tight,
    });
  };

  chart.addEventListener("mouseenter", hoverIn);
  chart.addEventListener("mouseleave", hoverOut);

  return () => {
    chart.removeEventListener("mouseenter", hoverIn);
    chart.removeEventListener("mouseleave", hoverOut);
  };
}

export function bindParallaxLayers(
  scope: HTMLElement,
  layers: Element[],
  speeds: number[],
) {
  if (shouldSimplifyMotion()) {
    return () => undefined;
  }

  const triggers: ScrollTrigger[] = [];

  layers.forEach((layer, index) => {
    const speed = speeds[index] ?? 1;

    const tween = gsap.fromTo(
      layer,
      { y: 0 },
      {
        y: speed * 24,
        ease: motion.ease.linear,
      },
    );

    triggers.push(
      ScrollTrigger.create({
        trigger: scope,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        animation: tween,
      }),
    );
  });

  return () => {
    triggers.forEach((trigger) => trigger.kill());
  };
}

export function openAccordionPanel(panel: HTMLElement, icon?: HTMLElement | null) {
  gsap.killTweensOf([panel, icon].filter(Boolean));

  gsap.set(panel, { display: "block", overflow: "hidden" });
  const height = panel.scrollHeight;

  gsap.fromTo(
    panel,
    { height: 0, opacity: 0 },
    {
      height,
      opacity: 1,
      duration: motion.duration.fast,
      ease: motion.ease.soft,
      onComplete: () => {
        gsap.set(panel, { height: "auto", clearProps: "overflow" });
      },
    },
  );

  if (icon) {
    gsap.to(icon, {
      rotate: 45,
      duration: motion.duration.fast,
      ease: motion.ease.soft,
    });
  }
}

export function closeAccordionPanel(panel: HTMLElement, icon?: HTMLElement | null) {
  gsap.killTweensOf([panel, icon].filter(Boolean));

  const height = panel.scrollHeight;

  gsap.set(panel, { height, overflow: "hidden" });

  gsap.to(panel, {
    height: 0,
    opacity: 0,
    duration: motion.duration.fast,
    ease: motion.ease.soft,
    onComplete: () => {
      gsap.set(panel, { display: "none", clearProps: "height,opacity,overflow" });
    },
  });

  if (icon) {
    gsap.to(icon, {
      rotate: 0,
      duration: motion.duration.fast,
      ease: motion.ease.soft,
    });
  }
}
