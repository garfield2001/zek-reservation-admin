"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import Preloader from "@/components/Preloader";
import { motion, AnimatePresence } from "framer-motion";
import { useIdleTimeout } from "@/hooks/useIdleTimeout";
import { useState, useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Auto logout after 10 minutes of inactivity
  useIdleTimeout(600000);

  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Simulate loading time (e.g., fetching initial data)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds

    // Responsive Sidebar: Auto-collapse on smaller screens
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarCollapsed(true);
      } else {
        setIsSidebarCollapsed(false);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-100"
          >
            <Preloader />
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Sidebar isCollapsed={isSidebarCollapsed} />

          <div
            className="flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out"
            style={{ marginLeft: isSidebarCollapsed ? "80px" : "280px" }}
          >
            <Header
              onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />

            <motion.main
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="grow p-6 w-full"
            >
              <div className="max-w-7xl mx-auto w-full">{children}</div>
            </motion.main>

            <Footer />
          </div>
        </>
      )}
    </div>
  );
}
