import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import styles from "./GlassScrollingCard.module.scss";

type GlassScrollingCardProps = {
  title: ReactNode;
  items: readonly ReactNode[];
  tone?: "default" | "onVideo";
  className?: string;
};

export function GlassScrollingCard({
  title,
  items,
  tone = "default",
  className,
}: GlassScrollingCardProps) {
  const isLens = tone === "onVideo";

  return (
    <article
      className={cn(styles.root, isLens && styles.onVideo, className)}
      data-glass-card={isLens ? "" : undefined}
    >
      {isLens ? (
        <>
          <div className={styles.lensLayer} data-lens-layer aria-hidden />
          <div className={styles.lensRim} aria-hidden />
          <div className={styles.content}>
            <header className={styles.header}>
              <h3 className={cn("heading-6", styles.title)}>{title}</h3>
            </header>
            <div className={styles.body}>
              {items.map((item, index) => (
                <div key={index} className={styles.item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <header className={styles.header}>
            <h3 className={cn("heading-6", styles.title)}>{title}</h3>
          </header>
          <div className={styles.body}>
            {items.map((item, index) => (
              <div key={index} className={styles.item}>
                {item}
              </div>
            ))}
          </div>
        </>
      )}
    </article>
  );
}
