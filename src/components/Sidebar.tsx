"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Utensils,
  CalendarDays,
  Users,
  BarChart3,
  ChefHat,
} from "lucide-react";
import { motion } from "framer-motion";

interface SidebarProps {
  isCollapsed: boolean;
}

export default function Sidebar({ isCollapsed }: SidebarProps) {
  const pathname = usePathname();

  const navSections = [
    {
      label: "Dashboard",
      links: [{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
    },
    {
      label: "Operations",
      links: [
        { name: "Reservations", href: "/reservations", icon: CalendarDays },
      ],
    },
    {
      label: "Management",
      links: [
        {
          name: "Packages",
          href: "/catering-packages",
          icon: ChefHat,
        },
        {
          name: "Add-ons",
          href: "/catering-add-ons",
          icon: ChefHat,
        },
        {
          name: "Events",
          href: "/events",
          icon: CalendarDays,
        },
        {
          name: "Menus",
          href: "/menus",
          icon: Utensils,
        },
        {
          name: "Users",
          href: "/users",
          icon: Users,
        },
      ],
    },
    {
      label: "Insights",
      links: [
        { name: "Manage Reports", href: "/reports", icon: BarChart3 },
        { name: "Manage Analytics", href: "/analytics", icon: BarChart3 },
      ],
    },
    {
      label: "Inventory",
      links: [
        { name: "Consumables", href: "/consumables", icon: Utensils },
        { name: "Equipments", href: "/equipments", icon: Utensils },
        { name: "Stock Levels", href: "/stock_levels", icon: Utensils },
      ],
    },
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
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 z-40 overflow-hidden shadow-sm pt-3"
    >
      <div
        className={`h-16 flex items-center border-b border-gray-100 relative ${
          isCollapsed ? "justify-center" : "justify-start px-4"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-zek-red rounded-xl flex items-center justify-center shadow-lg shadow-red-200">
            <ChefHat className="w-6 h-6 text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900 tracking-tight leading-none">
                ZEK CATERING
              </span>
              <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">
                Admin Portal
              </span>
            </div>
          )}
        </div>
      </div>

      <div
        className={`flex-1 py-6 sidebar-scroll-wrapper ${
          isCollapsed ? "px-0" : "pl-3 pr-0"
        }`}
      >
        <div className="space-y-2 h-full sidebar-scroll">
          {navSections.map((section) => (
            <div key={section.label} className="space-y-1">
              {!isCollapsed && (
                <p className="px-3 text-[10px] font-semibold text-gray-400 tracking-widest uppercase">
                  {section.label}
                </p>
              )}
              {section.links.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      group flex items-center rounded-xl transition-all duration-200 relative
                      ${isCollapsed ? "justify-center py-3" : "px-3 py-3"}
                      ${
                        active
                          ? "bg-red-50 text-zek-red"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }
                    `}
                    title={isCollapsed ? link.name : ""}
                  >
                    <div className="flex items-center justify-center">
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
                      <span className="ml-3 font-medium text-sm whitespace-nowrap">
                        {link.name}
                      </span>
                    )}

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
          ))}
        </div>
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
