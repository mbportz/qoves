import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card/Card";
import { cn } from "@/lib/utils/cn";
import styles from "./ChartCard.module.scss";

type ChartCardProps = {
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function ChartCard({
  title,
  description,
  children,
  className,
}: ChartCardProps) {
  return (
    <Card className={cn(styles.root, className)} padding="md">
      {(title || description) && (
        <header className={styles.header}>
          {title ? (
            <h3 className={cn("heading-8-book", styles.title)}>{title}</h3>
          ) : null}
          {description ? (
            <p className={cn("body-3-regular", styles.description)}>
              {description}
            </p>
          ) : null}
        </header>
      )}
      <div className={styles.chart}>{children}</div>
    </Card>
  );
}
