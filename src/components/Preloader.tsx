"use client";

import { ChefHat } from "lucide-react";
import { motion } from "framer-motion";

export default function Preloader() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className="w-24 h-24 bg-zek-red rounded-full flex items-center justify-center mb-4 shadow-lg shadow-zek-red/30"
        >
          <ChefHat className="w-12 h-12 text-white" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            ZEK CATERING
          </h1>
          <p className="text-sm text-gray-500 font-semibold tracking-widest uppercase mt-1">
            Admin Portal
          </p>
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.4, duration: 1.5, ease: "easeInOut" }}
          className="h-1 bg-zek-red mt-6 rounded-full w-32"
        />
      </div>
    </div>
  );
}
