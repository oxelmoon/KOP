import { useEffect, useState } from "react";

// useState, який зберігає значення в localStorage між перезавантаженнями.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // localStorage може бути недоступним — тоді просто не зберігаємо.
    }
  }, [key, value]);

  return [value, setValue];
}
