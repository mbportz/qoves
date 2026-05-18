"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "./reducedMotion";
import { registerGsapPlugins } from "./register";
import type { SectionAnimationFactory } from "./types";

type UseSectionAnimationOptions = {
  dependencies?: unknown[];
  revertOnUpdate?: boolean;
};

export function useSectionAnimation(
  factory: SectionAnimationFactory,
  options: UseSectionAnimationOptions = {},
) {
  const scopeRef = useRef<HTMLElement>(null);
  const { dependencies = [], revertOnUpdate = true } = options;

  useGSAP(
    () => {
      registerGsapPlugins();

      const scope = scopeRef.current;
      if (!scope || prefersReducedMotion()) {
        return;
      }

      const result = factory(scope);

      if (typeof result === "function") {
        return result;
      }

      return () => {
        if (result && typeof result === "object" && "kill" in result) {
          result.kill();
        }
      };
    },
    {
      scope: scopeRef,
      dependencies,
      revertOnUpdate,
    },
  );

  return scopeRef;
}
