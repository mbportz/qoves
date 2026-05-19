"use client";

import featureContainerChartSrc from "@/assets/Feature_Container.svg";
import { motion, shouldSimplifyMotion } from "@/lib/gsap";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import {
  FEATURE_CONTAINER_VIEWBOX,
  applyFeatureSplits,
  collectFeatureContainerChart,
  randomFeatureSplits,
  resetFeatureSplits,
  type FeatureContainerChartParts,
} from "./featureContainerSegments";
import styles from "./FeatureContainerChart.module.scss";

type FeatureContainerChartProps = {
  className?: string;
};

type SplitTweenState = {
  split1: number;
  split2: number;
};

function tweenFeatureChart(
  parts: FeatureContainerChartParts,
  state: SplitTweenState,
  hovered: boolean,
  animate: boolean,
) {
  const target = hovered ? randomFeatureSplits() : parts.defaultSplits;

  if (!animate || shouldSimplifyMotion()) {
    state.split1 = target.split1;
    state.split2 = target.split2;
    applyFeatureSplits(parts, state.split1, state.split2);
    return;
  }

  gsap.to(state, {
    split1: target.split1,
    split2: target.split2,
    duration: motion.duration.slow,
    ease: motion.ease.soft,
    overwrite: true,
    onUpdate: () => {
      applyFeatureSplits(parts, state.split1, state.split2);
    },
  });
}

export function FeatureContainerChart({ className }: FeatureContainerChartProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const [markup, setMarkup] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    void fetch(featureContainerChartSrc.src)
      .then((response) => response.text())
      .then((svg) => {
        if (!cancelled) {
          setMarkup(svg);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const host = chartRef.current;
    const root = rootRef.current;
    if (!markup || !host || !root) {
      return undefined;
    }

    host.innerHTML = markup;

    const parts = collectFeatureContainerChart(host);
    if (!parts) {
      return undefined;
    }

    const tweenState: SplitTweenState = {
      split1: parts.defaultSplits.split1,
      split2: parts.defaultSplits.split2,
    };

    resetFeatureSplits(parts);

    const onHoverIn = () => {
      tweenFeatureChart(parts, tweenState, true, true);
    };

    const onHoverOut = () => {
      tweenFeatureChart(parts, tweenState, false, true);
    };

    root.addEventListener("pointerenter", onHoverIn);
    root.addEventListener("pointerleave", onHoverOut);

    return () => {
      root.removeEventListener("pointerenter", onHoverIn);
      root.removeEventListener("pointerleave", onHoverOut);
      gsap.killTweensOf(tweenState);
      resetFeatureSplits(parts);
    };
  }, [markup]);

  return (
    <div ref={rootRef} className={`${styles.root} ${className ?? ""}`.trim()}>
      <div
        ref={chartRef}
        className={styles.chart}
        aria-hidden
        style={{
          aspectRatio: `${FEATURE_CONTAINER_VIEWBOX.width} / ${FEATURE_CONTAINER_VIEWBOX.height}`,
        }}
      />
    </div>
  );
}
