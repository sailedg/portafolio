import { TechIcon } from "@/lib/icon-map";
import { marqueeIcons } from "@/data/skills";
import styles from "./TechMarquee.module.css";

// Un solo set de iconos es más angosto que las pantallas anchas, así que con 2
// copias no alcanza: el scroll se adelanta al contenido y deja espacio en
// blanco. Repitiendo de sobra siempre hay iconos por delante en cualquier ancho.
const REPEAT_COUNT = 6;
const loopedIcons = Array.from({ length: REPEAT_COUNT }, () => marqueeIcons).flat();

export function TechMarquee() {
  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.marquee__track}>
        {loopedIcons.map((item, index) => (
          <div key={`${item.icon}-${index}`} className={styles.marquee__item}>
            <TechIcon icon={item.icon} iconSet={item.iconSet} className={styles.marquee__icon} />
            <span className={styles.marquee__tooltip}>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
