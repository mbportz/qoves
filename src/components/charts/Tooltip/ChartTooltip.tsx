"use client";

import styles from "./ChartTooltip.module.scss";

type ChartTooltipEntry = {
  name?: string;
  value?: number | string;
  color?: string;
};

type ChartTooltipProps = {
  active?: boolean;
  payload?: ChartTooltipEntry[];
  label?: string | number;
  valueSuffix?: string;
};

export function ChartTooltip({
  active,
  payload,
  label,
  valueSuffix = "",
}: ChartTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className={styles.root} role="tooltip">
      {label ? <p className={`${styles.label} body-4-zagma`}>{label}</p> : null}
      <ul className={styles.list}>
        {payload.map((entry) => (
          <li key={`${entry.name}-${entry.value}`} className={styles.item}>
            <span
              className={styles.swatch}
              style={{ backgroundColor: entry.color }}
              aria-hidden
            />
            <span className="body-3-regular">
              {entry.name}: {entry.value}
              {valueSuffix}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
