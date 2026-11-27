import cx from "../../utils/cx";
import styles from "./Card.module.css";

// Біла картка-контейнер — основний будівельний блок сторінок.
export default function Card({ as: Tag = "section", className, children, ...rest }) {
  return (
    <Tag className={cx(styles.card, className)} {...rest}>
      {children}
    </Tag>
  );
}
