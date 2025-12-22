"use client";

import AnalyticsChart from "@/components/AnalyticsChart";
import { REVENUE_DATA } from "@/lib/mock-data";
import { TrendingUp, Users, DollarSign, Calendar } from "lucide-react";

export default function AnalyticsPage() {
  const stats = [
    {
      name: "Total Revenue",
      value: "₱124,500",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      name: "Total Bookings",
      value: "45",
      change: "+5.2%",
      icon: Calendar,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      name: "Active Customers",
      value: "120",
      change: "+8.1%",
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      name: "Growth Rate",
      value: "24%",
      change: "+2.3%",
      icon: TrendingUp,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Reports & Analytics
        </h1>
        <p className="text-sm text-gray-500">
          Financial performance and business growth.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="bg-white overflow-hidden rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between">
              <div className={`flex-shrink-0 rounded-xl p-3 ${item.bg}`}>
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                {item.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">{item.name}</h3>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Revenue Overview
        </h2>
        <div className="h-100">
          <AnalyticsChart data={REVENUE_DATA} />
        </div>
      </div>
    </div>
  );
}
