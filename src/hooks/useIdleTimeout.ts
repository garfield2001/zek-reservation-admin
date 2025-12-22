"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export function useIdleTimeout(timeoutMs: number = 30000) {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
    ];

    const resetTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        // Logout logic
        document.cookie =
          "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        router.push("/login?reason=inactive");
      }, timeoutMs);
    };

    // Initial timer start
    resetTimer();

    // Add event listeners
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // Cleanup
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [router, timeoutMs]);
}
