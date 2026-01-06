"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  User,
  Menu,
  Users,
  CheckCircle,
  AlertTriangle,
  Info,
  Clock,
  BarChart,
} from "lucide-react";
import { MOCK_ACTIVITY_LOG } from "@/lib/mock-data";
import { getCookie, clearCookie } from "@/lib/utils";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    const token = getCookie("auth_token");
    if (token) {
      try {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch {}
    }
    clearCookie("auth_token");
    clearCookie("refresh_token");
    router.push("/login");
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "danger":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50";
      case "warning":
        return "bg-yellow-50";
      case "danger":
        return "bg-red-50";
      default:
        return "bg-blue-50";
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 h-16">
      <div className="px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Left Section: Hamburger & Branding (Mobile) */}
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-zek-red transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Optional: Breadcrumbs or Page Title could go here */}
          </div>

          {/* Right Section: Notifications, Profile */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 rounded-full text-gray-400 hover:text-zek-red hover:bg-red-50 transition-colors relative focus:outline-none"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-zek-orange rounded-full border-2 border-white"></span>
              </button>

              {/* Notifications Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transform opacity-100 scale-100 transition-all z-50">
                  <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                    <p className="text-sm font-bold text-gray-900">
                      Notifications
                    </p>
                    <button className="text-xs text-zek-red hover:underline">
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {MOCK_ACTIVITY_LOG.length > 0 ? (
                      <ul className="divide-y divide-gray-100">
                        {MOCK_ACTIVITY_LOG.map((activity) => (
                          <li
                            key={activity.id}
                            className="px-4 py-3 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex gap-3">
                              <div
                                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getBgColor(
                                  activity.type
                                )}`}
                              >
                                {getIcon(activity.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {activity.action}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                  {activity.target} • {activity.user}
                                </p>
                                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {activity.time}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="px-4 py-6 text-center text-sm text-gray-500">
                        No new notifications
                      </div>
                    )}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 rounded-b-xl">
                    <button className="w-full text-center text-xs font-medium text-gray-600 hover:text-zek-red transition-colors">
                      View all activity
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center border-2 border-transparent hover:border-zek-red transition-all">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-semibold text-gray-700">Admin</p>
                  <p className="text-[10px] text-gray-500">Super User</p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transform opacity-100 scale-100 transition-all z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      Administrator
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      admin@zekcatering.com
                    </p>
                  </div>

                  <div className="py-1 border-b border-gray-100">
                    <Link
                      href="/staff"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-zek-red"
                    >
                      <Users className="mr-3 h-4 w-4" />
                      Manage Staffs
                    </Link>
                    <Link
                      href="/analytics"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-zek-red"
                    >
                      <BarChart className="mr-3 h-4 w-4" />
                      Analytics
                    </Link>
                  </div>

                  <Link
                    href="/dashboard/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-zek-red"
                  >
                    <Settings className="mr-3 h-4 w-4" />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
