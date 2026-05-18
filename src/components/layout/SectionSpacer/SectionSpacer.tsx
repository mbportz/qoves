import type { CSSProperties, HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import styles from "./SectionSpacer.module.scss";

type SectionSpacerProps = HTMLAttributes<HTMLDivElement> & {
  /** Height of the inner block (px). */
  height?: number;
  /** Max width of the inner block (px). */
  maxWidth?: number;
  /** Horizontal padding on the outer wrapper (px). */
  paddingInline?: number;
  /** Show vertical borders (inline) on the inner block. */
  bordered?: boolean;
  innerClassName?: string;
};

export function SectionSpacer({
  className,
  innerClassName,
  height = 120,
  maxWidth = 1360,
  paddingInline = 40,
  bordered = true,
  style,
  ...props
}: SectionSpacerProps) {
  const spacerStyle = {
    ...style,
    "--section-spacer-height": `${height}px`,
    "--section-spacer-max-width": `${maxWidth}px`,
    "--section-spacer-padding-inline": `${paddingInline}px`,
  } as CSSProperties;

  return (
    <div
      className={cn(styles.root, className)}
      style={spacerStyle}
      aria-hidden
      {...props}
    >
      <div
        className={cn(
          styles.inner,
          bordered && styles.innerBordered,
          innerClassName,
        )}
      />
    </div>
  );
}
