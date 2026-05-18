import type { ReactNode } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils/cn";
import styles from "./GlassInfoCard.module.scss";

type GlassInfoCardProps = {
  image?: ImageProps;
  title: ReactNode;
  subtitle?: ReactNode;
  tone?: "default" | "onVideo";
  className?: string;
  children?: ReactNode;
};

export function GlassInfoCard({
  image,
  title,
  subtitle,
  tone = "default",
  className,
  children,
}: GlassInfoCardProps) {
  return (
    <article className={cn(styles.container, className)}>
      <div
        className={cn(
          styles.surface,
          tone === "onVideo" ? styles.onVideo : styles.default,
        )}
      >
        {image ? (
          <div className={styles.mediaRow}>
            <div className={styles.imageWrap}>
              <Image className={styles.image} {...image} alt={image.alt ?? ""} />
            </div>
          </div>
        ) : null}
        <div className={styles.body}>
          <h3 className={cn("heading-7", styles.title)}>{title}</h3>
          {subtitle ? <p className={cn("body-3-regular", styles.subtitle)}>{subtitle}</p> : null}
          {children}
        </div>
      </div>
    </article>
  );
}
