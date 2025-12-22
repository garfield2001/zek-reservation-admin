"use client";

import { useState } from "react";
import {
  Calendar,
  Utensils,
  Clock,
  ArrowRight,
  CreditCard,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ReservationTable from "@/components/ReservationTable";
import RecentActivity from "@/components/RecentActivity";
import PaymentAlerts from "@/components/PaymentAlerts";
import { MOCK_RESERVATIONS, Reservation } from "@/lib/mock-data";
import CreateReservationModal from "@/components/CreateReservationModal";
import Link from "next/link";

type ActivityCalendarProps = {
  reservations: Reservation[];
};

type CalendarCell = {
  key: string;
  date: Date;
  isToday: boolean;
  isSelected: boolean;
  hasEvents: boolean;
};

function ActivityCalendar({ reservations }: ActivityCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1);
  });

  const toDateKey = (date: Date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const todayKey = toDateKey(new Date());

  const [selectedDate, setSelectedDate] = useState<string>(todayKey);

  const eventsByDate: Record<string, Reservation[]> = {};

  reservations.forEach((reservation) => {
    if (!reservation.date) return;
    if (!eventsByDate[reservation.date]) {
      eventsByDate[reservation.date] = [];
    }
    eventsByDate[reservation.date].push(reservation);
  });

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const startDay = firstDayOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days: (CalendarCell | null)[] = [];

  for (let i = 0; i < startDay; i += 1) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);
    const key = toDateKey(date);
    days.push({
      key,
      date,
      isToday: key === todayKey,
      isSelected: key === selectedDate,
      hasEvents: Boolean(eventsByDate[key]),
    });
  }

  const monthLabel = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const selectedEvents = eventsByDate[selectedDate] ?? [];

  const handleDateClick = (key: string) => {
    setSelectedDate((prev) => (prev === key ? todayKey : key));
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      newDate.setDate(1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      newDate.setDate(1);
      return newDate;
    });
  };

  const getStatusClasses = (status: Reservation["status"]) => {
    if (status === "Pending") {
      return "bg-blue-50 text-blue-700";
    }
    if (status === "Confirmed") {
      return "bg-emerald-50 text-emerald-700";
    }
    if (status === "Completed") {
      return "bg-gray-900 text-white";
    }
    if (status === "Cancelled" || status === "Deleted") {
      return "bg-red-50 text-red-700";
    }
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            Calendar of Activities
          </h3>
          <p className="text-sm text-gray-500">
            View upcoming reservations and activity by date.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white p-1.5 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-semibold text-gray-900 min-w-[140px] text-center">
            {monthLabel}
          </span>
          <button
            type="button"
            onClick={handleNextMonth}
            className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white p-1.5 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="px-4 sm:px-6 py-4 flex-1 flex flex-col">
        <div className="grid grid-cols-7 gap-1.5 text-[11px] sm:text-xs font-semibold text-gray-400 mb-2 sm:mb-3">
          {weekdayLabels.map((day) => (
            <div
              key={day}
              className="flex items-center justify-center h-6 uppercase tracking-wide"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1.5 text-xs sm:text-sm">
          {days.map((day, index) => {
            if (!day) {
              return (
                <div
                  key={`empty-${index}`}
                  className="h-9 sm:h-12 rounded-lg"
                />
              );
            }

            const isSelected = day.isSelected;
            const hasEvents = day.hasEvents;
            const isToday = day.isToday;

            let stateClasses =
              "border-transparent text-gray-600 hover:bg-gray-50";

            if (isSelected) {
              stateClasses = "bg-zek-red text-white border-zek-red shadow-sm";
            } else if (hasEvents) {
              stateClasses = "border-zek-red/40 bg-zek-red/5 text-zek-red";
            } else if (isToday) {
              stateClasses = "border-gray-300 text-gray-900";
            }

            return (
              <button
                key={day.key}
                type="button"
                onClick={() => handleDateClick(day.key)}
                className={`flex flex-col items-center justify-center h-9 sm:h-12 rounded-lg border text-xs sm:text-sm font-medium transition-all cursor-pointer ${stateClasses}`}
              >
                <span>{day.date.getDate()}</span>
                {hasEvents && (
                  <span className="mt-0.5 inline-flex items-center rounded-full bg-zek-red text-white px-1.5 py-0.5 text-[10px] font-semibold">
                    {(eventsByDate[day.key]?.length ?? 0).toString()}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <div className="mt-4 sm:mt-6 border-t border-gray-100 pt-4 sm:pt-5">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-900">
              {selectedEvents.length > 0
                ? "Activities for selected day"
                : "No activities for this day"}
            </h4>
            {selectedEvents.length > 0 && (
              <span className="text-xs font-medium text-gray-500">
                {selectedEvents.length.toString()}{" "}
                {selectedEvents.length === 1 ? "reservation" : "reservations"}
              </span>
            )}
          </div>
          {selectedEvents.length === 0 ? (
            <p className="text-xs sm:text-sm text-gray-500">
              Select a date with a highlight to see scheduled reservations.
            </p>
          ) : (
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {selectedEvents.map((reservation) => (
                <div
                  key={reservation.id}
                  className="flex items-start justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5"
                >
                  <div className="mr-3">
                    <p className="text-sm font-semibold text-gray-900">
                      {reservation.eventType} · {reservation.clientName}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      {reservation.guests.toString()} guests ·{" "}
                      {reservation.packageName}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${getStatusClasses(
                      reservation.status
                    )}`}
                  >
                    {reservation.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [reservations, setReservations] =
    useState<Reservation[]>(MOCK_RESERVATIONS);

  const totalReservationsCount = reservations.length;

  const pendingReservationsCount = reservations.filter(
    (res) => res.status === "Pending"
  ).length;

  const activeReservationsCount = reservations.filter(
    (res) => res.status !== "Cancelled" && res.status !== "Deleted"
  ).length;

  const paymentsWatchlistCount = reservations.filter(
    (res) => res.paymentStatus === "Overdue" || res.paymentStatus === "Unpaid"
  ).length;

  const [recentRange, setRecentRange] = useState<"3" | "7" | "all" | "custom">(
    "all"
  );
  const [recentStartDate, setRecentStartDate] = useState("");
  const [recentEndDate, setRecentEndDate] = useState("");

  const handleCreateReservation = (newReservation: Omit<Reservation, "id">) => {
    const reservationWithId: Reservation = {
      ...newReservation,
      id: `r${Date.now()}`,
    } as Reservation;
    setReservations([reservationWithId, ...reservations]);
    alert("Reservation created successfully!");
  };

  const stats = [
    {
      name: "Total Reservations",
      value: totalReservationsCount.toString(),
      status: "All time",
      statusColor: "text-emerald-700 bg-emerald-50 border-emerald-100",
      icon: Calendar,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-100",
      link: "/reservations",
    },
    {
      name: "Pending Reservations",
      value: pendingReservationsCount.toString(),
      status: "Awaiting action",
      statusColor: "text-blue-700 bg-blue-50 border-blue-100",
      icon: Clock,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      link: "/reservations?status=pending",
    },
    {
      name: "Active Reservations",
      value: activeReservationsCount.toString(),
      status: "Not cancelled",
      statusColor: "text-violet-700 bg-violet-50 border-violet-100",
      icon: Utensils,
      iconColor: "text-violet-600",
      iconBg: "bg-violet-100",
      link: "/reservations",
    },
    {
      name: "Payments Watchlist",
      value: paymentsWatchlistCount.toString(),
      status: "Overdue or unpaid",
      statusColor: "text-amber-700 bg-amber-50 border-amber-100",
      icon: CreditCard,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-100",
      link: "/payments",
    },
  ];

  const parseCustomDate = (value: string): Date | null => {
    if (!value) return null;
    const parts = value.split("-");
    if (parts.length !== 3) return null;
    const [month, day, year] = parts;
    const monthNumber = Number(month);
    const dayNumber = Number(day);
    const yearNumber = Number(year);
    if (!monthNumber || !dayNumber || !yearNumber) return null;
    const date = new Date(yearNumber, monthNumber - 1, dayNumber);
    if (Number.isNaN(date.getTime())) return null;
    return date;
  };

  const filteredRecentReservations = reservations.filter((reservation) => {
    const created = new Date(reservation.createdAt || reservation.date);
    if (Number.isNaN(created.getTime())) return true;

    const today = new Date();

    if (recentRange === "3") {
      const cutoff = new Date(today);
      cutoff.setDate(cutoff.getDate() - 3);
      return created >= cutoff;
    }

    if (recentRange === "7") {
      const cutoff = new Date(today);
      cutoff.setDate(cutoff.getDate() - 7);
      return created >= cutoff;
    }

    if (recentRange === "custom") {
      if (!recentStartDate && !recentEndDate) return true;

      const start = parseCustomDate(recentStartDate);
      const end = parseCustomDate(recentEndDate);

      if (recentStartDate && start && created < start) return false;

      if (recentEndDate && end) {
        const endInclusive = new Date(end);
        endInclusive.setDate(endInclusive.getDate() + 1);
        if (created >= endInclusive) return false;
      }

      return true;
    }

    return true;
  });

  return (
    <>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Dashboard Overview
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Welcome back, Admin. Here&apos;s what&apos;s happening today.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.name}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white/90 p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-gray-50 via-white to-gray-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex h-full flex-col justify-between gap-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {item.name}
                    </p>
                    <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900">
                      {item.value}
                    </p>
                  </div>
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.iconBg} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-xs">
                  <span className="text-gray-400">Overview</span>
                  <Link
                    href={item.link}
                    className="inline-flex items-center gap-1.5 rounded-full bg-zek-red/5 px-2.5 py-1 font-medium text-zek-red transition-all duration-200 hover:bg-zek-red/10 hover:text-zek-light-red"
                  >
                    <span className="border-b border-transparent transition-colors duration-200 hover:border-zek-light-red">
                      More details
                    </span>
                    <ArrowRight className="h-3 w-3 transform transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6">
          <ReservationTable
            reservations={filteredRecentReservations}
            showDateRangeControls
            recentRange={recentRange}
            onRecentRangeChange={setRecentRange}
            recentStartDate={recentStartDate}
            recentEndDate={recentEndDate}
            onRecentStartDateChange={setRecentStartDate}
            onRecentEndDateChange={setRecentEndDate}
          />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <ActivityCalendar reservations={reservations} />
          </div>
          <div className="space-y-6">
            <PaymentAlerts />
            <RecentActivity />
          </div>
        </div>
      </div>

      <CreateReservationModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateReservation}
      />
    </>
  );
}
