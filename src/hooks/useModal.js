import { useEffect, useRef } from "react";

/**
 * Поведінка модального вікна: Escape закриває (якщо є onClose),
 * сторінка під вікном не прокручується, фокус переходить у вікно і повертається назад.
 */
export default function useModal({ isOpen, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    // Фокус на першу кнопку у вікні (для клавіатури та скрінрідерів).
    dialogRef.current?.querySelector("button, [href], input, select")?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && onClose) onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.();
    };
  }, [isOpen, onClose]);

  return { dialogRef };
}
