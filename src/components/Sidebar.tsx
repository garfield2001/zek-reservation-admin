"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Utensils,
  CalendarDays,
  Users,
  CreditCard,
  BarChart3,
  ChefHat,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

interface SidebarProps {
  isCollapsed: boolean;
}

export default function Sidebar({ isCollapsed }: SidebarProps) {
  const pathname = usePathname();

  const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    {
      name: "Menu Management",
      href: "/menu",
      icon: Utensils,
    },
    {
      name: "Reservations",
      href: "/reservations",
      icon: CalendarDays,
    },
    { name: "Customers", href: "/customers", icon: Users },
    { name: "Payments", href: "/payments", icon: CreditCard },
    { name: "Reports", href: "/reports", icon: BarChart3 },
  ];

  const isActive = (path: string) => {
    if (path === "/dashboard" && pathname === "/dashboard") return true;
    if (path !== "/dashboard" && pathname === path) return true;
    return false;
  };

  return (
    <motion.aside
      initial={{ width: isCollapsed ? 80 : 280 }}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 z-40 overflow-hidden shadow-sm"
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-center border-b border-gray-100 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-zek-red rounded-xl flex items-center justify-center shadow-lg shadow-red-200">
            <ChefHat className="w-6 h-6 text-white" />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isCollapsed ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            className={`flex flex-col ${isCollapsed ? "hidden" : "block"}`}
          >
            <span className="text-lg font-bold text-gray-900 tracking-tight leading-none">
              ZEK CATERING
            </span>
            <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">
              Admin Portal
            </span>
          </motion.div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                group flex items-center px-3 py-3 rounded-xl transition-all duration-200 relative
                ${
                  active
                    ? "bg-red-50 text-zek-red"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }
              `}
              title={isCollapsed ? link.name : ""}
            >
              <div
                className={`flex items-center justify-center ${
                  isCollapsed ? "w-full" : ""
                }`}
              >
                <Icon
                  className={`
                    w-6 h-6 transition-colors
                    ${
                      active
                        ? "text-zek-red"
                        : "text-gray-500 group-hover:text-gray-700"
                    }
                  `}
                />
              </div>

              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="ml-3 font-medium text-sm whitespace-nowrap"
                >
                  {link.name}
                </motion.span>
              )}

              {/* Active Indicator Strip */}
              {active && !isCollapsed && (
                <motion.div
                  layoutId="activeStrip"
                  className="absolute left-0 w-1 h-8 bg-zek-red rounded-r-full"
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer / User Info (Collapsed vs Expanded) */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "gap-3"
          }`}
        >
          <div className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
            <span className="font-bold text-xs text-zek-red">A</span>
          </div>

          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-gray-900 truncate">
                Administrator
              </p>
              <p className="text-xs text-gray-500 truncate">admin@zek.com</p>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
