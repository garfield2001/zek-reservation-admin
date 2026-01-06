"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import Preloader from "@/components/Preloader";
import { motion, AnimatePresence } from "framer-motion";
import { useIdleTimeout } from "@/hooks/useIdleTimeout";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie, clearCookie } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useIdleTimeout(600000);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarCollapsed(true);
      } else {
        setIsSidebarCollapsed(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const token = getCookie("auth_token");
    if (!token) {
      return;
    }

    let cancelled = false;

    const verifySession = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok && !cancelled) {
          clearCookie("auth_token");
          clearCookie("refresh_token");
          router.push("/login");
        }
      } catch {
      }
    };

    verifySession();

    return () => {
      cancelled = true;
    };
  }, [router]);

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
