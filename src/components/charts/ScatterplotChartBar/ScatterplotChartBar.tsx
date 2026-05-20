"use client";

import { ChartSvgDisplay } from "../svg";
import { motion, shouldSimplifyMotion } from "@/lib/gsap";
import gsap from "gsap";
import { useRef } from "react";
import {
  SCATTER_BAR_BARS,
  SCATTER_BAR_DEFAULT_INDEX,
  SCATTER_BAR_VIEWBOX,
  getScatterBarIndexFromY,
  getScatterBarTranslateY,
} from "./scatterBarBars";
import styles from "./ScatterplotChartBar.module.scss";

type ScatterplotChartBarProps = {
  className?: string;
};

const HIT_AREA = { x: 128, y: 16, width: 152, height: 290 };
const BAR_SELECTOR = 'g[clip-path*="clip1_4_17707"] rect';

function setSelectionTranslate(selection: SVGGElement, translateY: number) {
  selection.setAttribute("transform", `translate(0 ${translateY})`);
}

function setActiveBar(root: HTMLElement, index: number) {
  const bars = root.querySelectorAll<SVGRectElement>(".scatter-bar");

  bars.forEach((bar, barIndex) => {
    const isActive = barIndex === index;
    bar.classList.toggle("isActive", isActive);
    bar.classList.toggle("isDimmed", !isActive);
  });
}

function applyBarIndex(
  root: HTMLElement,
  selection: SVGGElement,
  selectionOffset: { y: number },
  index: number,
  animate: boolean,
) {
  const translateY = getScatterBarTranslateY(index);
  const tween = {
    y: translateY,
    duration: motion.duration.fast,
    ease: motion.ease.soft,
    overwrite: true,
    onUpdate: () => {
      setSelectionTranslate(selection, selectionOffset.y);
    },
  };

  if (animate && !shouldSimplifyMotion()) {
    gsap.to(selectionOffset, tween);
  } else {
    gsap.killTweensOf(selectionOffset);
    selectionOffset.y = translateY;
    setSelectionTranslate(selection, translateY);
  }

  setActiveBar(root, index);
}

function getSvgPoint(svg: SVGSVGElement, event: PointerEvent) {
  const bounds = svg.getBoundingClientRect();
  const x =
    ((event.clientX - bounds.left) / bounds.width) * SCATTER_BAR_VIEWBOX.width;
  const y =
    ((event.clientY - bounds.top) / bounds.height) * SCATTER_BAR_VIEWBOX.height;

  return { x, y };
}

export function ScatterplotChartBar({ className }: ScatterplotChartBarProps) {
  const activeIndexRef = useRef(SCATTER_BAR_DEFAULT_INDEX);

  return (
    <ChartSvgDisplay
      id="scatterBar"
      viewBox={SCATTER_BAR_VIEWBOX}
      rootClassName={styles.root}
      chartClassName={styles.chart}
      className={className}
      setupDesktop={(host, root) => {
        const svg = host.querySelector("svg");
        const selection = host.querySelector<SVGGElement>("#scatter-selection");
        const bars = host.querySelectorAll<SVGRectElement>(BAR_SELECTOR);
        const selectionOffset = { y: 0 };

        if (!svg || !selection || bars.length !== SCATTER_BAR_BARS.length) {
          return undefined;
        }

        bars.forEach((bar, index) => {
          bar.classList.add("scatter-bar");
          bar.dataset.barIndex = String(index);
        });

        applyBarIndex(
          host,
          selection,
          selectionOffset,
          SCATTER_BAR_DEFAULT_INDEX,
          false,
        );

        const onPointerMove = (event: PointerEvent) => {
          const local = getSvgPoint(svg, event);

          if (
            local.x < HIT_AREA.x ||
            local.x > HIT_AREA.x + HIT_AREA.width ||
            local.y < HIT_AREA.y ||
            local.y > HIT_AREA.y + HIT_AREA.height
          ) {
            return;
          }

          const index = getScatterBarIndexFromY(local.y);

          if (index === activeIndexRef.current) {
            return;
          }

          activeIndexRef.current = index;
          applyBarIndex(host, selection, selectionOffset, index, true);
        };

        const onPointerLeave = () => {
          if (activeIndexRef.current === SCATTER_BAR_DEFAULT_INDEX) {
            return;
          }

          activeIndexRef.current = SCATTER_BAR_DEFAULT_INDEX;
          applyBarIndex(
            host,
            selection,
            selectionOffset,
            SCATTER_BAR_DEFAULT_INDEX,
            true,
          );
        };

        root.addEventListener("pointermove", onPointerMove);
        root.addEventListener("pointerleave", onPointerLeave);

        return () => {
          root.removeEventListener("pointermove", onPointerMove);
          root.removeEventListener("pointerleave", onPointerLeave);
          gsap.killTweensOf(selectionOffset);
          applyBarIndex(
            host,
            selection,
            selectionOffset,
            SCATTER_BAR_DEFAULT_INDEX,
            false,
          );
          activeIndexRef.current = SCATTER_BAR_DEFAULT_INDEX;
        };
      }}
    />
  );
}
