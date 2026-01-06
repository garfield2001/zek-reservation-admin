"use client";
import { Suspense } from "react";
import { ChefHat } from "lucide-react";
import { motion } from "framer-motion";
import { LoginForm } from "./LoginForm";

export default function Page() {
  return (
    <Suspense>
      <div className="min-h-screen flex items-center justify-center bg-zek-white relative overflow-hidden">
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

              <LoginForm />
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
