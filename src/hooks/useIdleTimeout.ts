"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { clearCookie } from "@/lib/utils";

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
        clearCookie("auth_token");
        clearCookie("refresh_token");
        router.push("/login?reason=inactive");
      }, timeoutMs);
    };

    resetTimer();

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

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
