import type { ReactNode } from "react";
import { Badge } from "@/components/ui/Badge/Badge";
import { cn } from "@/lib/utils/cn";
import styles from "./SectionLabel.module.scss";

type SectionLabelProps = {
  badge?: ReactNode;
  title: ReactNode;
  /** Second phrase in the same heading (Heading 4) — accent color only. */
  titleAccent?: ReactNode;
  subtitle?: ReactNode;
  align?: "start" | "center";
  className?: string;
};

function renderTitle(title: ReactNode, titleAccent?: ReactNode) {
  if (titleAccent == null || titleAccent === "") {
    return title;
  }

  return (
    <>
      {title}
      {" "}
      <span className={styles.titleAccent} data-section-title-accent>
        {titleAccent}
      </span>
    </>
  );
}

export function SectionLabel({
  badge,
  title,
  titleAccent,
  subtitle,
  align = "start",
  className,
}: SectionLabelProps) {
  return (
    <header
      className={cn(styles.root, styles[align], className)}
      data-section-label
    >
      {badge ? <Badge data-section-badge>{badge}</Badge> : null}
      <h2 className={cn("heading-4", styles.title)} data-section-title>
        {renderTitle(title, titleAccent)}
      </h2>
      {subtitle ? (
        <p
          className={cn("body-2", styles.subtitle)}
          data-section-subtitle
        >
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}
