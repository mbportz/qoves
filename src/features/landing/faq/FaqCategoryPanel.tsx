"use client";

import { useEffect, useRef, type ReactNode } from "react";

type FaqCategoryPanelProps = {
  children: ReactNode;
  className?: string;
};

export function FaqCategoryPanel({ children, className }: FaqCategoryPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    const category = panel?.closest<HTMLDetailsElement>("details[data-faq-category]");
    if (!panel || !category) return;

    const closeEntries = () => {
      panel
        .querySelectorAll<HTMLDetailsElement>("details[data-faq-entry][open]")
        .forEach((entry) => {
          entry.open = false;
        });
    };

    const onToggle = () => {
      if (category.open) {
        closeEntries();
      }
    };

    category.addEventListener("toggle", onToggle);
    return () => category.removeEventListener("toggle", onToggle);
  }, []);

  return (
    <div ref={panelRef} className={className}>
      {children}
    </div>
  );
}
