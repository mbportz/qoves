"use client";

import { useCallback, useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGsapPlugins } from "@/lib/gsap/register";

function playVideo(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;

  if (video.paused) {
    void video.play().catch(() => {});
  }
}

function bindVideoPlayback(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.loop = true;
  video.playsInline = true;
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");

  const onReady = () => playVideo(video);

  video.addEventListener("canplay", onReady);
  video.addEventListener("loadeddata", onReady);

  registerGsapPlugins();

  const section = video.closest<HTMLElement>("[data-philosophy-section]");
  const triggers: ScrollTrigger[] = [];

  if (section) {
    triggers.push(
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => playVideo(video),
        onEnterBack: () => playVideo(video),
      }),
    );
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        playVideo(video);
      }
    },
    { threshold: 0.05 },
  );

  observer.observe(video);

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    onReady();
  });

  return () => {
    video.removeEventListener("canplay", onReady);
    video.removeEventListener("loadeddata", onReady);
    observer.disconnect();
    triggers.forEach((trigger) => trigger.kill());
  };
}

export function usePhilosophyVideo() {
  const cleanupRef = useRef<(() => void) | null>(null);

  const setVideoRef = useCallback((video: HTMLVideoElement | null) => {
    cleanupRef.current?.();
    cleanupRef.current = null;

    if (!video) return;

    cleanupRef.current = bindVideoPlayback(video);
  }, []);

  useEffect(() => () => cleanupRef.current?.(), []);

  return setVideoRef;
}
