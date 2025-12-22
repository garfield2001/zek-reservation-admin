"use client";
import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Lock,
  User,
  Loader2,
  ChefHat,
  XCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export default function Page() {
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
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Minimum loading time for smooth animation
    const minLoadTime = new Promise((resolve) => setTimeout(resolve, 800));

    try {
      // Use relative path for proxy
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
        // console.log("Response data:", data);
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

      // Store token
      document.cookie = `auth_token=${
        data.token || "mock_token"
      }; path=/; max-age=86400; SameSite=Strict`;

      // Delay redirect slightly to show success state
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
    <Suspense>
      {" "}
      <div className="min-h-screen flex items-center justify-center bg-zek-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-0 left-0 w-full h-full overflow-hidden z-0"
        >
          <div
            className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] bg-zek-red/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "8s" }}
          />
          <div
            className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-zek-orange/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "10s" }}
          />
        </motion.div>

        <div className="w-full max-w-md z-10 p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
          >
            {/* Header Section */}
            <div className="bg-zek-black p-8 text-center relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-zek-red via-zek-orange to-zek-red" />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2,
                }}
                className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg"
              >
                <ChefHat className="w-9 h-9 text-zek-red" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h1 className="text-2xl font-bold text-white tracking-wide">
                  ZEK CATERING
                </h1>
                <p className="text-gray-400 text-sm mt-1 uppercase tracking-widest font-medium">
                  Services
                </p>
              </motion.div>
            </div>

            <div className="p-8 pt-10">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center mb-8"
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  Admin Portal
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Secure login for staff & administrators
                </p>
              </motion.div>

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
                        <XCircle className="h-5 w-5 text-zek-red flex-shrink-0 mt-0.5" />
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
            </div>

            <div className="bg-gray-50 py-4 text-center border-t border-gray-100">
              <p className="text-xs text-gray-400">
                © {new Date().getFullYear()} Zek Catering Services. All rights
                reserved.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Suspense>
  );
}
