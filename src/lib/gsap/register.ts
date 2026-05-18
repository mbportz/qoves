import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let isRegistered = false;

export function registerGsapPlugins() {
  if (isRegistered || typeof window === "undefined") {
    return;
  }

  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
  isRegistered = true;
}
