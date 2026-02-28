"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { MOCK_RESERVATIONS, Reservation } from "@/lib/mock-data";
import ReservationTable from "@/components/ReservationTable";
import CreateReservationModal from "@/components/CreateReservationModal";

export default function ReservationsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [reservations, setReservations] =
    useState<Reservation[]>(MOCK_RESERVATIONS);
  const [recentRange, setRecentRange] = useState<
    "3" | "7" | "30" | "all" | "custom"
  >("30");
  const [recentStartDate, setRecentStartDate] = useState("");
  const [recentEndDate, setRecentEndDate] = useState("");

  const tabs = ["All", "Pending", "Confirmed", "Completed", "Cancelled"];

  const parseMMDDYYYY = (value: string) => {
    const parts = value.split("-");
    if (parts.length !== 3) return null;
    const [mm, dd, yyyy] = parts;
    const month = Number(mm);
    const day = Number(dd);
    const year = Number(yyyy);
    if (!month || !day || !year) return null;
    const date = new Date(year, month - 1, day);
    if (isNaN(date.getTime())) return null;
    return date;
  };

  const filteredReservations = reservations.filter((res) => {
    const matchesTab = activeTab === "All" || res.status === activeTab;
    const matchesSearch =
      res.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.packageName.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesDate = true;
    const eventDate = new Date(res.date);

    if (!isNaN(eventDate.getTime())) {
      if (recentRange === "3" || recentRange === "7" || recentRange === "30") {
        const days = recentRange === "3" ? 3 : recentRange === "7" ? 7 : 30;
        const now = new Date();
        const cutoff = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - days
        );
        matchesDate = eventDate >= cutoff;
      } else if (recentRange === "custom") {
        const start = recentStartDate ? parseMMDDYYYY(recentStartDate) : null;
        const end = recentEndDate ? parseMMDDYYYY(recentEndDate) : null;
        if (start && eventDate < start) {
          matchesDate = false;
        }
        if (end) {
          const endOfDay = new Date(
            end.getFullYear(),
            end.getMonth(),
            end.getDate(),
            23,
            59,
            59,
            999
          );
          if (eventDate > endOfDay) {
            matchesDate = false;
          }
        }
      }
    }

    return matchesTab && matchesSearch && matchesDate;
  });

  const handleCreateReservation = (newReservation: Omit<Reservation, "id">) => {
    const reservationWithId: Reservation = {
      ...newReservation,
      id: `r${Date.now()}`,
    } as Reservation;
    setReservations([reservationWithId, ...reservations]);
    alert("Reservation created successfully!");
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reservations</h1>
            <p className="text-sm text-gray-500">
              Manage all event bookings and requests.
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-zek-red hover:bg-zek-light-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zek-red transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Reservation
          </button>
        </div>

        {/* Filters and Tabs */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg overflow-x-auto w-full md:w-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search reservations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <ReservationTable
          reservations={filteredReservations}
          showDateRangeControls
          recentRange={recentRange}
          onRecentRangeChange={setRecentRange}
          recentStartDate={recentStartDate}
          recentEndDate={recentEndDate}
          onRecentStartDateChange={setRecentStartDate}
          onRecentEndDateChange={setRecentEndDate}
        />
      </div>
      <CreateReservationModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateReservation}
      />
    </>
  );
}
