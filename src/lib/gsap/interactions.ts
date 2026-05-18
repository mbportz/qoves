import {
  SCATTER_BAR_DEFAULT_INDEX,
  getScatterBarIndexFromPoint,
  getScatterBarMetrics,
  scatterBarChartLayout,
  scatterBarTraits,
  type ScatterBarMetrics,
} from "@/data/scatterBarChartData";
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

export function bindScatterBarChartHover(chart: Element) {
  if (shouldSimplifyMotion()) {
    return () => undefined;
  }

  const svg = chart.querySelector("svg");
  const hitArea = chart.querySelector("[data-scatter-hit]");
  const highlight = chart.querySelector("[data-scatter-highlight]");
  const indicator = chart.querySelector("[data-scatter-indicator]");
  const topLine = chart.querySelector("[data-scatter-top-line]");
  const bottomLine = chart.querySelector("[data-scatter-bottom-line]");
  const connectorTop = chart.querySelector("[data-scatter-connector-top]");
  const connectorBottom = chart.querySelector("[data-scatter-connector-bottom]");

  if (
    !svg ||
    !hitArea ||
    !highlight ||
    !indicator ||
    !topLine ||
    !bottomLine ||
    !connectorTop ||
    !connectorBottom
  ) {
    return () => undefined;
  }

  const targets = [
    highlight,
    indicator,
    topLine,
    bottomLine,
    connectorTop,
    connectorBottom,
  ];
  const indicatorX = scatterBarChartLayout.indicator.x;
  let activeIndex = SCATTER_BAR_DEFAULT_INDEX;

  const applyIndex = (index: number, animate = true) => {
    const trait = scatterBarTraits[index];
    const metrics = getScatterBarMetrics(trait);
    const pivotY = metrics.indicatorY;
    const tween = {
      duration: motion.duration.fast,
      ease: motion.ease.soft,
      overwrite: true,
    };

    const update = (target: Element, vars: gsap.TweenVars) => {
      if (animate) {
        gsap.to(target, vars);
        return;
      }

      gsap.set(target, vars);
    };

    update(highlight, {
      ...tween,
      attr: {
        y: metrics.highlightY,
        height: metrics.highlightHeight,
      },
    });
    update(indicator, {
      ...tween,
      attr: {
        y: pivotY,
        transform: `rotate(90 ${indicatorX} ${pivotY})`,
      },
    });

    const guides: Array<
      [Element, (value: ScatterBarMetrics) => Record<string, number>]
    > = [
      [topLine, (value) => ({ y1: value.topLineY, y2: value.topLineY })],
      [bottomLine, (value) => ({ y1: value.bottomLineY, y2: value.bottomLineY })],
      [
        connectorTop,
        (value) => ({ y1: value.connectorTopY, y2: value.connectorTopY }),
      ],
      [
        connectorBottom,
        (value) => ({ y1: value.connectorBottomY, y2: value.connectorBottomY }),
      ],
    ];

    guides.forEach(([target, getAttr]) => {
      update(target, { ...tween, attr: getAttr(metrics) });
    });
  };

  const onPointerMove = (event: Event) => {
    if (!(event instanceof PointerEvent)) {
      return;
    }

    const svgElement = svg as SVGSVGElement;
    const ctm = svgElement.getScreenCTM();

    if (!ctm) {
      return;
    }

    const point = svgElement.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const local = point.matrixTransform(ctm.inverse());
    const index = getScatterBarIndexFromPoint(local.y);

    if (index === activeIndex) {
      return;
    }

    activeIndex = index;
    applyIndex(index);
  };

  const onPointerLeave = () => {
    if (activeIndex === SCATTER_BAR_DEFAULT_INDEX) {
      return;
    }

    activeIndex = SCATTER_BAR_DEFAULT_INDEX;
    applyIndex(activeIndex);
  };

  applyIndex(activeIndex, false);

  hitArea.addEventListener("pointermove", onPointerMove);
  hitArea.addEventListener("pointerleave", onPointerLeave);

  return () => {
    hitArea.removeEventListener("pointermove", onPointerMove);
    hitArea.removeEventListener("pointerleave", onPointerLeave);
    gsap.killTweensOf(targets);
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
