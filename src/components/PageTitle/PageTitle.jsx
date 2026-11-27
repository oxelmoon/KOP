import styles from "./PageTitle.module.css";

export default function PageTitle({ eyebrow, title, subtitle }) {
  return (
    <div className={styles.wrapper}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
