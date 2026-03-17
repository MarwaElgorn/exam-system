import { useState, useEffect, useRef } from "react";

export function useTimer(durationMinutes: number, onExpire?: () => void) {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const started = useRef(false);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  // Step 1: set initial value when durationMinutes arrives from API
  useEffect(() => {
    if (durationMinutes > 0 && !started.current) {
      started.current = true;
      setSecondsLeft(durationMinutes * 60);
    }
  }, [durationMinutes]);

  // Step 2: tick every second
  useEffect(() => {
    if (secondsLeft <= 0) return;

    const id = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          onExpireRef.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [secondsLeft]);

  const m = Math.floor(secondsLeft / 60);
  const s = secondsLeft % 60;

  return {
    display: `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`,
    secondsLeft,
    isExpired: secondsLeft <= 0 && durationMinutes > 0,
  };
}