import { useEffect, useState } from "react";

/**
 * Зворотний відлік на хід. Скидається, коли змінюється turnKey (новий хід або новий тур).
 * seconds = 0 — таймер вимкнено.
 */
export default function useTurnTimer({ seconds, turnKey, active, onExpire }) {
  const [timer, setTimer] = useState({ key: turnKey, left: seconds });

  // Новий хід — скидаємо відлік одразу під час рендеру, без "застарілого" кадру.
  if (timer.key !== turnKey) {
    setTimer({ key: turnKey, left: seconds });
  }

  const enabled = seconds > 0 && active;

  useEffect(() => {
    if (!enabled) return;

    const id = setInterval(() => {
      setTimer((prev) => ({ ...prev, left: Math.max(prev.left - 1, 0) }));
    }, 1000);

    return () => clearInterval(id);
  }, [enabled, turnKey]);

  useEffect(() => {
    if (enabled && timer.key === turnKey && timer.left === 0) onExpire();
  }, [enabled, timer, turnKey, onExpire]);

  return { enabled, timeLeft: timer.left };
}
