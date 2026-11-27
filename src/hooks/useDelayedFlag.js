import { useEffect, useState } from "react";

// Повертає true через delay мс після того, як flag став true; false — одразу.
export default function useDelayedFlag(flag, delay) {
  const [delayed, setDelayed] = useState(false);

  useEffect(() => {
    if (!flag) {
      setDelayed(false);
      return;
    }
    const timer = setTimeout(() => setDelayed(true), delay);
    return () => clearTimeout(timer);
  }, [flag, delay]);

  return flag && delayed;
}
