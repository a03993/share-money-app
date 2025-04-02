import { useEffect, useRef } from "react";

export function useOnceEffect(callback: () => void | (() => void)) {
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    return callback();
  }, []);
}
