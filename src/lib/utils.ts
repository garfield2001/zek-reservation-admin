import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}-${day}-${year}`;
}

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const part = parts.pop();
    if (!part) return null;
    const segment = part.split(";").shift();
    return segment ? decodeURIComponent(segment) : null;
  }
  return null;
}

type CookieOptions = {
  maxAgeSeconds?: number;
  path?: string;
  sameSite?: "Strict" | "Lax" | "None";
};

export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
) {
  if (typeof document === "undefined") return;

  const encodedValue = encodeURIComponent(value);
  const path = options.path ?? "/";
  const sameSite = options.sameSite ?? "Strict";
  const maxAge = options.maxAgeSeconds;

  let cookie = `${name}=${encodedValue}; path=${path}; SameSite=${sameSite}`;

  if (typeof maxAge === "number" && maxAge > 0) {
    cookie += `; max-age=${maxAge}`;
  }
  document.cookie = cookie;
}

export function clearCookie(name: string, path: string = "/") {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

function decodeJwtExpiryMs(token: string): number | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    const base = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    let padded = base;
    while (padded.length % 4 !== 0) {
      padded += "=";
    }
    if (typeof atob !== "function") return null;
    const json = atob(padded);
    const payload = JSON.parse(json) as { exp?: number };
    if (typeof payload.exp !== "number") return null;
    return payload.exp * 1000;
  } catch {
    return null;
  }
}

let refreshPromise: Promise<{
  token: string;
  refreshToken: string;
  accessTokenExpiresInSeconds?: number;
  sessionMaxAgeSeconds?: number;
} | null> | null = null;

export async function authenticatedFetch(
  input: RequestInfo,
  init: RequestInit = {}
): Promise<Response> {
  const createRequest = (token?: string) => {
    const headers = new Headers(init.headers || {});
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return fetch(input, { ...init, headers });
  };

  const runRefresh = async () => {
    if (!refreshPromise) {
      refreshPromise = (async () => {
        const currentRefreshToken = getCookie("refresh_token");
        if (!currentRefreshToken) {
          clearCookie("auth_token");
          clearCookie("refresh_token");
          return null;
        }

        const refreshResponse = await fetch("/api/auth/refresh", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken: currentRefreshToken }),
        });

        if (!refreshResponse.ok) {
          clearCookie("auth_token");
          clearCookie("refresh_token");
          return null;
        }

        let data: unknown;
        try {
          data = await refreshResponse.json();
        } catch {
          clearCookie("auth_token");
          clearCookie("refresh_token");
          return null;
        }

        if (
          !data ||
          typeof data !== "object" ||
          !("token" in data) ||
          !("refreshToken" in data)
        ) {
          clearCookie("auth_token");
          clearCookie("refresh_token");
          return null;
        }

        const result = data as {
          token: string;
          refreshToken: string;
          accessTokenExpiresInSeconds?: number;
          sessionMaxAgeSeconds?: number;
        };

        console.log(
          "[auth] Refresh successful, issuing new access and refresh tokens"
        );

        const accessTokenExpiresInSeconds =
          typeof result.accessTokenExpiresInSeconds === "number"
            ? result.accessTokenExpiresInSeconds
            : 15 * 60;

        const sessionMaxAgeSeconds =
          typeof result.sessionMaxAgeSeconds === "number"
            ? result.sessionMaxAgeSeconds
            : 7 * 24 * 60 * 60;

        setCookie("auth_token", result.token, {
          maxAgeSeconds: sessionMaxAgeSeconds,
          path: "/",
          sameSite: "Strict",
        });

        setCookie("refresh_token", result.refreshToken, {
          maxAgeSeconds: sessionMaxAgeSeconds,
          path: "/",
          sameSite: "Strict",
        });

        setCookie("auth_token_ttl", String(accessTokenExpiresInSeconds), {
          maxAgeSeconds: sessionMaxAgeSeconds,
          path: "/",
          sameSite: "Strict",
        });

        return result;
      })().finally(() => {
        refreshPromise = null;
      });
    }

    await refreshPromise;
  };

  let token = getCookie("auth_token");

  if (token) {
    const expiryMs = decodeJwtExpiryMs(token);
    if (expiryMs && expiryMs <= Date.now() + 5000) {
      await runRefresh();
      token = getCookie("auth_token");
    }
  }

  let response = await createRequest(token || undefined);

  if (response.status !== 401) {
    return response;
  }

  await runRefresh();

  const newToken = getCookie("auth_token");
  if (!newToken) {
    return response;
  }

  response = await createRequest(newToken);

  return response;
}
