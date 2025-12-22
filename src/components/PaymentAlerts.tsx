"use client";

import { AlertCircle, CreditCard } from "lucide-react";
import { MOCK_RESERVATIONS } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default function PaymentAlerts() {
  const overduePayments = MOCK_RESERVATIONS.filter(
    (r) => r.paymentStatus === "Overdue" || r.paymentStatus === "Unpaid"
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-500" />
            Payment Watchlist
          </h3>
        </div>
        <button className="text-sm font-semibold text-zek-red hover:text-zek-light-red transition-colors">
          View all
        </button>
      </div>
      <div className="p-0 flex-1 overflow-y-auto max-h-100">
        <ul className="divide-y divide-gray-100">
          {overduePayments.map((reservation) => (
            <li
              key={reservation.id}
              className="p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {reservation.clientName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {reservation.packageName}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">
                    ₱{reservation.amount.toLocaleString()}
                  </p>
                  <p
                    className={`text-xs font-medium ${
                      reservation.paymentStatus === "Overdue"
                        ? "text-red-600"
                        : "text-orange-600"
                    }`}
                  >
                    {reservation.paymentStatus}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
