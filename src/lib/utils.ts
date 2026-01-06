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
