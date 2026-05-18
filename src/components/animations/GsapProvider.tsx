"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGsapPlugins } from "@/lib/gsap";

type GsapProviderProps = {
  children: React.ReactNode;
};

export function GsapProvider({ children }: GsapProviderProps) {
  useEffect(() => {
    registerGsapPlugins();

    const refresh = () => ScrollTrigger.refresh();

    refresh();
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
    };
  }, []);

  return children;
}
