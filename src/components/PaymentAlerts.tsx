"use client";

import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  CalendarDays,
  CreditCard,
  Utensils,
  LayoutDashboard,
} from "lucide-react";

export default function PaymentAlerts() {
  const actions = [
    {
      label: "Create new reservation",
      description: "Schedule a new catering event for a client.",
      href: "/admin/reservations",
      icon: CalendarDays,
      accentBg: "bg-zek-red/10",
      accentColor: "text-zek-red",
    },
    {
      label: "Review upcoming reservations",
      description: "Check details for all upcoming events.",
      href: "/admin/reservations",
      icon: LayoutDashboard,
      accentBg: "bg-indigo-50",
      accentColor: "text-indigo-600",
    },
    {
      label: "Review pending payments",
      description: "Monitor unpaid or overdue reservations.",
      href: "/admin/payments",
      icon: CreditCard,
      accentBg: "bg-amber-50",
      accentColor: "text-amber-600",
    },
    {
      label: "Manage menu items",
      description: "Update dishes, packages, and pricing.",
      href: "/admin/menu",
      icon: Utensils,
      accentBg: "bg-emerald-50",
      accentColor: "text-emerald-600",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-500" />
            Quick Actions
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Jump quickly to the most common admin tasks.
          </p>
        </div>
      </div>
      <div className="p-0 flex-1 overflow-y-auto max-h-100">
        <ul className="divide-y divide-gray-100">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <li
                key={action.label}
                className="group p-4 hover:bg-gray-50 transition-all duration-200"
              >
                <Link href={action.href} className="flex items-center gap-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${action.accentBg}`}
                  >
                    <Icon className={`h-5 w-5 ${action.accentColor}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-gray-950">
                      {action.label}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {action.description}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-zek-red transition-colors" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
