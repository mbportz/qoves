import styles from "./GridOverlay.module.scss";

export function GridOverlay() {
  return (
    <div className={styles.root} aria-hidden>
      <div className={styles.column} />
      <div className={styles.column} />
      <div className={styles.column} />
      <div className={styles.column} />
    </div>
  );
}
