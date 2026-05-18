import gsap from "gsap";
import { motion, type MotionOverlap } from "./motion";

export function createMotionTimeline(vars: gsap.TimelineVars = {}) {
  return gsap.timeline({
    defaults: {
      ease: motion.ease.smooth,
      duration: motion.duration.base,
    },
    ...vars,
  });
}

export function overlapPosition(key: MotionOverlap = "base") {
  return `-=${motion.duration.fast * motion.overlap[key]}`;
}
