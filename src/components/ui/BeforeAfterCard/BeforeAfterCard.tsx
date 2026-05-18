import type { ReactNode } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils/cn";
import styles from "./BeforeAfterCard.module.scss";

type BeforeAfterCardProps = {
  image: ImageProps;
  /** Single-image hero card: label overlaid at top of image */
  label?: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  footer?: ReactNode;
};

export function BeforeAfterCard({
  image,
  label,
  beforeLabel = "Before",
  afterLabel = "After",
  className,
  footer,
}: BeforeAfterCardProps) {
  const isSingle = Boolean(label);
  const { width, height, alt = "", ...imageProps } = image;

  return (
    <article
      className={cn(styles.root, isSingle && styles.rootSingle, className)}
      data-hero-compare-card
    >
      <div className={styles.media}>
        <div
          className={cn(styles.imageFrame, isSingle && styles.imageFrameSingle)}
        >
          {isSingle && label ? (
            <span className={cn("body-4-zagma-lg", styles.labelOverlay)}>
              {label}
            </span>
          ) : null}
          {isSingle ? (
            <Image
              fill
              alt={alt}
              className={cn(styles.image, styles.imageSingle)}
              sizes={imageProps.sizes ?? "(max-width: 768px) 100vw, 439px"}
              {...imageProps}
            />
          ) : (
            <Image
              alt={alt}
              className={styles.image}
              {...imageProps}
              width={width}
              height={height}
            />
          )}
        </div>
        {!isSingle ? (
          <div className={styles.labels}>
            <span className="body-4-zagma-lg">{beforeLabel}</span>
            <span className="body-4-zagma-lg">{afterLabel}</span>
          </div>
        ) : null}
        {footer}
      </div>
    </article>
  );
}
