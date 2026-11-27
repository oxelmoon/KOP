import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import styles from "./ConfirmDialog.module.css";

// Підтвердження небезпечної дії (теж через портал — використовує Modal).
export default function ConfirmDialog({ isOpen, title, message, confirmLabel, onConfirm, onCancel }) {
  return (
    <Modal isOpen={isOpen} title={title} onClose={onCancel}>
      <p className={styles.message}>{message}</p>
      <div className={styles.actions}>
        <Button variant="secondary" onClick={onCancel}>Скасувати</Button>
        <Button variant="danger" onClick={onConfirm}>{confirmLabel}</Button>
      </div>
    </Modal>
  );
}
