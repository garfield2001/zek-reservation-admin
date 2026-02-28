import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Lock, User, Loader2, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, setCookie } from "@/lib/utils";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const reason = searchParams.get("reason");
    if (reason === "inactive") {
      setError("You have been logged out due to inactivity");
    } else if (reason === "session_expired") {
      setError("Your session has expired. Please sign in again.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const minLoadTime = new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const apiUrl = "/api";

      const [response] = await Promise.all([
        fetch(`${apiUrl}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }),
        minLoadTime,
      ]);

      console.log("Response status:", response.status);

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error("Failed to parse JSON:", jsonError);
        throw new Error(
          "Invalid response from server. Check console for details."
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message || `Login failed with status: ${response.status}`
        );
      }

      setIsSuccess(true);

      if (!data.token || !data.refreshToken) {
        throw new Error("Invalid login response from server");
      }

      const accessTokenExpiresInSeconds =
        typeof data.accessTokenExpiresInSeconds === "number"
          ? data.accessTokenExpiresInSeconds
          : 15 * 60;

      const sessionMaxAgeSeconds =
        typeof data.sessionMaxAgeSeconds === "number"
          ? data.sessionMaxAgeSeconds
          : 7 * 24 * 60 * 60;

      setCookie("auth_token", data.token, {
        maxAgeSeconds: sessionMaxAgeSeconds,
        path: "/",
        sameSite: "Strict",
      });

      setCookie("refresh_token", data.refreshToken, {
        maxAgeSeconds: sessionMaxAgeSeconds,
        path: "/",
        sameSite: "Strict",
      });

      setCookie("auth_token_ttl", String(accessTokenExpiresInSeconds), {
        maxAgeSeconds: sessionMaxAgeSeconds,
        path: "/",
        sameSite: "Strict",
      });

      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    } catch (err: unknown) {
      console.error("Login error:", err);
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (err instanceof Error) {
        if (err.message === "Failed to fetch") {
          errorMessage = `Unable to connect to ${process.env.NEXT_PUBLIC_API_URL}. Is the API server running on port 4000?`;
        } else {
          errorMessage = err.message;
        }
      }
      setError(errorMessage);
    } finally {
      if (!isSuccess) {
        setLoading(false);
      }
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="rounded-lg bg-red-50 p-4 border-l-4 border-zek-red flex items-start gap-3">
              <XCircle className="h-5 w-5 text-zek-red shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-red-800">
                  Authentication Failed
                </h3>
                <p className="mt-1 text-sm text-red-700 leading-tight">
                  {error}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-5">
        <div className="group">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-1 ml-1"
          >
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User
                className={cn(
                  "h-5 w-5 transition-colors duration-200",
                  error
                    ? "text-red-400"
                    : "text-gray-400 group-focus-within:text-zek-red"
                )}
              />
            </div>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              disabled={loading || isSuccess}
              className={cn(
                "block w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all bg-gray-50 focus:bg-white text-gray-900 placeholder:text-gray-400",
                error
                  ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-200 focus:border-zek-red focus:ring-zek-red/20"
              )}
              placeholder="Enter username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (error) setError("");
              }}
            />
          </div>
        </div>

        <div className="group">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1 ml-1"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock
                className={cn(
                  "h-5 w-5 transition-colors duration-200",
                  error
                    ? "text-red-400"
                    : "text-gray-400 group-focus-within:text-zek-red"
                )}
              />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              className={cn(
                "block w-full pl-10 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all bg-gray-50 focus:bg-white text-gray-900 placeholder:text-gray-400",
                error
                  ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-200 focus:border-zek-red focus:ring-zek-red/20"
              )}
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError("");
              }}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-zek-red focus:ring-zek-red border-gray-300 rounded cursor-pointer"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-600 cursor-pointer select-none"
          >
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <Link
            href="/forgot-password"
            className="font-medium text-zek-orange hover:text-zek-red transition-colors"
          >
            Forgot password?
          </Link>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        type="submit"
        disabled={loading || isSuccess}
        className={cn(
          "group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all shadow-lg",
          isSuccess
            ? "bg-green-600 hover:bg-green-700 focus:ring-green-500"
            : "bg-zek-red hover:bg-zek-light-red focus:ring-zek-red shadow-zek-red/30 hover:shadow-zek-red/40"
        )}
      >
        {loading ? (
          <Loader2 className="animate-spin h-5 w-5" />
        ) : isSuccess ? (
          "Success!"
        ) : (
          "SIGN IN"
        )}
      </motion.button>
    </form>
  );
}
