"use client";

import { Edit, Trash2, Eye, Calendar, User } from "lucide-react";
import { Reservation } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

interface ReservationTableProps {
  reservations: Reservation[];
  showDateRangeControls?: boolean;
  recentRange?: "3" | "7" | "all" | "custom";
  onRecentRangeChange?: (range: "3" | "7" | "all" | "custom") => void;
  recentStartDate?: string;
  recentEndDate?: string;
  onRecentStartDateChange?: (value: string) => void;
  onRecentEndDateChange?: (value: string) => void;
}

export default function ReservationTable({
  reservations,
  showDateRangeControls,
  recentRange,
  onRecentRangeChange,
  recentStartDate,
  recentEndDate,
  onRecentStartDateChange,
  onRecentEndDateChange,
}: ReservationTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-50 text-green-700 ring-green-600/20";
      case "Pending":
        return "bg-yellow-50 text-yellow-800 ring-yellow-600/20";
      case "Completed":
        return "bg-blue-50 text-blue-700 ring-blue-700/10";
      case "Cancelled":
        return "bg-red-50 text-red-700 ring-red-600/10";
      case "Deleted":
        return "bg-gray-50 text-gray-600 ring-gray-500/10 grayscale opacity-75";
      default:
        return "bg-gray-50 text-gray-600 ring-gray-500/10";
    }
  };

  const rangeOptions = [
    { key: "all", label: "All dates" },
    { key: "3", label: "Last 3 days" },
    { key: "7", label: "Last 7 days" },
    { key: "custom", label: "Custom date range" },
  ] as const;

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm transition-shadow duration-300 hover:shadow-lg">
      <div className="px-6 pt-4 pb-5 border-b border-gray-100 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-gray-900">
            Recent Reservations
          </h3>
          <p className="text-sm text-gray-500">Latest booking activities</p>
        </div>
        <div className="flex flex-col items-stretch gap-2 sm:items-end">
          {showDateRangeControls && (
            <>
              <div className="flex flex-wrap justify-start gap-2 sm:justify-end">
                {rangeOptions.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() =>
                      onRecentRangeChange && onRecentRangeChange(option.key)
                    }
                    className={`rounded-full px-3 py-1 text-xs font-medium border transition-all ${
                      recentRange === option.key
                        ? "bg-zek-red text-white border-zek-red shadow-sm"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:border-zek-red/50 hover:text-zek-red"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2 justify-start sm:justify-end min-h-[40px]">
                {recentRange === "custom" ? (
                  <>
                    <div className="relative">
                      <Calendar className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="MM-DD-YYYY"
                        maxLength={10}
                        value={recentStartDate}
                        onChange={(e) =>
                          onRecentStartDateChange &&
                          onRecentStartDateChange(e.target.value)
                        }
                        className="w-36 pl-10 pr-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red bg-white"
                      />
                    </div>
                    <span className="text-xs text-gray-400">to</span>
                    <div className="relative">
                      <Calendar className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="MM-DD-YYYY"
                        maxLength={10}
                        value={recentEndDate}
                        onChange={(e) =>
                          onRecentEndDateChange &&
                          onRecentEndDateChange(e.target.value)
                        }
                        className="w-36 pl-10 pr-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red bg-white"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (onRecentStartDateChange) {
                          onRecentStartDateChange("");
                        }
                        if (onRecentEndDateChange) {
                          onRecentEndDateChange("");
                        }
                      }}
                      className="rounded-full border border-gray-200 px-3 py-1 text-[11px] font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors"
                    >
                      Clear dates
                    </button>
                  </>
                ) : (
                  <div className="h-9" />
                )}
              </div>
            </>
          )}
          <button className="self-end text-xs sm:text-sm font-semibold text-zek-red hover:text-zek-light-red transition-colors">
            View all
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50/50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Client Details
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Event & Package
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Date & Guests
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Amount
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reservations.map((reservation) => (
              <tr
                key={reservation.id}
                className="group transition-all duration-150 ease-out hover:bg-gray-50/60 hover:-translate-y-[1px]"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-zek-red/10 to-zek-orange/10 flex items-center justify-center text-zek-red font-bold text-sm border border-zek-red/10">
                        {reservation.clientName.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-semibold text-gray-900">
                        {reservation.clientName}
                      </div>
                      <div className="text-xs text-gray-500">
                        ID: #{reservation.id.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {reservation.eventType}
                  </div>
                  <div className="text-xs text-gray-500">
                    {reservation.packageName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                      {formatDate(reservation.date)}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <User className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                      {reservation.guests} Guests
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusColor(
                      reservation.status
                    )}`}
                  >
                    {reservation.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                  ₱{reservation.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2 opacity-0 translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150">
                    <button
                      className="p-1 text-gray-400 hover:text-zek-red transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
