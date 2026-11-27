import { createPortal } from "react-dom";
import useModal from "../../hooks/useModal";
import styles from "./Modal.module.css";

// Вікно рендериться через портал у #modal-root (поза деревом сторінки), тож його
// не обрізають overflow чи z-index батьківських елементів.
export default function Modal({ isOpen, title, onClose, children }) {
  const { dialogRef } = useModal({ isOpen, onClose });

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        ref={dialogRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="modal-title" className={styles.title}>{title}</h2>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root") ?? document.body
  );
}
