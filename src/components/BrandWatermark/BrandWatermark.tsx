import styles from "./BrandWatermark.module.css";

export function BrandWatermark() {
  return (
    <span className={styles.watermark} aria-hidden="true">
      Rodas<span className={styles.watermark__accent}>Dev</span>
    </span>
  );
}
