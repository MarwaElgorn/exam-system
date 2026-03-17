import { useState, useEffect } from "react";
import { ensureToken, getAuthUserId } from "../../../shared/utils/auth";

interface UseInitAuthResult {
  userId: string | null;
  isReady: boolean;
  isError: boolean;
  error: Error | null;
}

// Runs once on app mount. Ensures a valid token exists, extracts userId.
export function useInitAuth(): UseInitAuthResult {
  const [userId, setUserId] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function init() {
      try {
        await ensureToken();
        if (cancelled) return;
        setUserId(getAuthUserId());
        setIsReady(true);
      } catch (err) {
        if (cancelled) return;
        setIsError(true);
        setError(err instanceof Error ? err : new Error("Auth failed"));
        setIsReady(true);
      }
    }
    init();
    return () => { cancelled = true; };
  }, []);

  return { userId, isReady, isError, error };
}
