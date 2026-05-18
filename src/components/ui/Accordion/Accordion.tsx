"use client";

import Image from "next/image";
import { useEffect, useId, useState, type ReactNode } from "react";
import beforeAmbient from "@/assets/Before 5676.png";
import { cn } from "@/lib/utils/cn";
import { AccordionIcon } from "./AccordionIcon";
import styles from "./Accordion.module.scss";

export type AccordionItemData = {
  id: string;
  title: ReactNode;
  content?: ReactNode;
};

type AccordionProps = {
  items: AccordionItemData[];
  defaultOpenId?: string;
  allowMultiple?: boolean;
  className?: string;
};

function AccordionPanelReveal({
  id,
  triggerId,
  children,
}: {
  id: string;
  triggerId: string;
  children: ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setExpanded(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      id={id}
      role="region"
      aria-labelledby={triggerId}
      className={cn(styles.panelReveal, expanded && styles.panelRevealOpen)}
    >
      <div className={styles.panelRevealInner}>
        <div className={styles.panelStatic}>
          <div className={styles.panelContent}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export function Accordion({
  items,
  defaultOpenId,
  allowMultiple = false,
  className,
}: AccordionProps) {
  const baseId = useId();
  const [openIds, setOpenIds] = useState<string[]>(
    defaultOpenId ? [defaultOpenId] : [],
  );

  const toggle = (id: string) => {
    setOpenIds((current) => {
      const isOpen = current.includes(id);

      if (isOpen) {
        return current.filter((itemId) => itemId !== id);
      }

      if (allowMultiple) {
        return [...current, id];
      }

      return [id];
    });
  };

  return (
    <div className={cn(styles.root, className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const panelId = `${baseId}-${item.id}-panel`;
        const triggerId = `${baseId}-${item.id}-trigger`;

        return (
          <article
            key={item.id}
            className={cn(styles.item, isOpen && styles.itemOpen)}
          >
            <div className={styles.itemShell}>
              {isOpen ? (
                <div className={styles.expandedCard}>
                  <div className={styles.ambient} aria-hidden>
                    <Image
                      className={styles.ambientImage}
                      src={beforeAmbient}
                      alt=""
                      width={444}
                      height={542}
                      priority={false}
                    />
                  </div>

                  <div className={styles.expandedBody}>
                    <button
                      id={triggerId}
                      type="button"
                      className={styles.header}
                      aria-expanded
                      aria-controls={panelId}
                      onClick={() => toggle(item.id)}
                    >
                      <span className={cn("heading-8-medium", styles.headerTitle)}>
                        {item.title}
                      </span>
                      <AccordionIcon variant="close" />
                    </button>

                    {item.content ? (
                      <AccordionPanelReveal id={panelId} triggerId={triggerId}>
                        {item.content}
                      </AccordionPanelReveal>
                    ) : null}
                  </div>
                </div>
              ) : (
                <button
                  id={triggerId}
                  type="button"
                  className={styles.trigger}
                  aria-expanded={false}
                  aria-controls={panelId}
                  onClick={() => toggle(item.id)}
                >
                  <span className={cn("heading-8-medium", styles.triggerTitle)}>
                    {item.title}
                  </span>
                  <AccordionIcon variant="plus" />
                </button>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
