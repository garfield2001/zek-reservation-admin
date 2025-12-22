"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  User,
  Users,
  Package,
  Clock,
  MapPin,
  Mail,
  Phone,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Check,
  Utensils,
  Receipt,
} from "lucide-react";
import {
  MOCK_PACKAGES,
  MOCK_DISHES,
  MOCK_STAFF,
  Reservation,
} from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

interface CreateReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Reservation, "id">) => void;
}

export default function CreateReservationModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateReservationModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<{
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    eventType: string;
    date: string;
    time: string;
    venue: string;
    guests: number;
    packageId: string;
    assignedStaffId: string;
    selectedDishes: Record<string, string[]>;
  }>({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    eventType: "Wedding",
    date: "",
    time: "",
    venue: "",
    guests: 100,
    packageId: "",
    assignedStaffId: "",
    selectedDishes: {},
  });

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setFormData({
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        eventType: "Wedding",
        date: "",
        time: "",
        venue: "",
        guests: 100,
        packageId: "",
        assignedStaffId: "",
        selectedDishes: {},
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const selectedPackage = MOCK_PACKAGES.find(
    (p) => p.id === formData.packageId
  );

  const handleNext = () => {
    if (step === 1) {
      if (!formData.clientName || !formData.date || !formData.guests) {
        alert("Please fill in the required fields.");
        return;
      }
    }
    if (step === 2) {
      if (!formData.packageId) {
        alert("Please select a package.");
        return;
      }
    }
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = () => {
    if (!selectedPackage) return;
    const allSelectedDishes = Object.values(formData.selectedDishes).flat();

    onSubmit({
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      clientPhone: formData.clientPhone,
      eventType: formData.eventType,
      date: formData.date,
      time: formData.time,
      venue: formData.venue,
      guests: formData.guests,
      packageId: formData.packageId,
      packageName: selectedPackage.name,
      selectedDishes: allSelectedDishes,
      amount: selectedPackage.pricePerHead * formData.guests,
      status: "Pending",
      paymentStatus: "Unpaid",
      assignedStaffId: formData.assignedStaffId || undefined,
      createdAt: new Date().toISOString().split("T")[0],
    });
    onClose();
  };

  const toggleDishSelection = (
    inclusionIndex: number,
    dishName: string,
    maxCount: number
  ) => {
    const key = String(inclusionIndex);
    const currentSelection = formData.selectedDishes[key] || [];
    const isSelected = currentSelection.includes(dishName);

    let newSelection;
    if (isSelected) {
      newSelection = currentSelection.filter((d) => d !== dishName);
    } else {
      if (currentSelection.length >= maxCount) {
        return;
      }
      newSelection = [...currentSelection, dishName];
    }

    setFormData({
      ...formData,
      selectedDishes: {
        ...formData.selectedDishes,
        [key]: newSelection,
      },
    });
  };

  // --- Animations ---
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 20 },
  };

  const stepContentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  const renderStep1 = () => (
    <motion.div
      key="step1"
      variants={stepContentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white/40 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100/50 pb-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Client Details</h4>
              <p className="text-xs text-gray-500">Contact information</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-2 uppercase tracking-wide">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2.5 bg-white/50 border border-gray-200/50 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red transition-all text-sm font-medium text-gray-900 placeholder:text-gray-400 backdrop-blur-sm"
                placeholder="e.g. Juan dela Cruz"
                value={formData.clientName}
                onChange={(e) =>
                  setFormData({ ...formData, clientName: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-2 uppercase tracking-wide">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-gray-200/50 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red transition-all text-sm text-gray-900 placeholder:text-gray-400 backdrop-blur-sm"
                    placeholder="juan@example.com"
                    value={formData.clientEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, clientEmail: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-2 uppercase tracking-wide">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-gray-200/50 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red transition-all text-sm text-gray-900 placeholder:text-gray-400 backdrop-blur-sm"
                    placeholder="0912..."
                    value={formData.clientPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, clientPhone: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white/40 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100/50 pb-4">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Event Details</h4>
              <p className="text-xs text-gray-500">Logistics & Schedule</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-2 uppercase tracking-wide">
                  Event Type
                </label>
                <div className="relative">
                  <select
                    className="w-full px-3 py-2.5 bg-white/50 border border-gray-200/50 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red transition-all text-sm appearance-none text-gray-900 backdrop-blur-sm"
                    value={formData.eventType}
                    onChange={(e) =>
                      setFormData({ ...formData, eventType: e.target.value })
                    }
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Fiesta">Fiesta</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-2 uppercase tracking-wide">
                  Guests <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    required
                    min="1"
                    className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-gray-200/50 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red transition-all text-sm text-gray-900 placeholder:text-gray-400 backdrop-blur-sm"
                    value={formData.guests}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        guests: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-2 uppercase tracking-wide">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-3 py-2.5 bg-white/50 border border-gray-200/50 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red transition-all text-sm text-gray-900 backdrop-blur-sm"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-2 uppercase tracking-wide">
                  Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="time"
                    className="w-full pl-10 pr-3 py-2.5 bg-white/50 border border-gray-200/50 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red transition-all text-sm text-gray-900 backdrop-blur-sm"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-2 uppercase tracking-wide">
                Venue Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-gray-200/50 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red transition-all text-sm text-gray-900 placeholder:text-gray-400 backdrop-blur-sm"
                  placeholder="123 Event Hall, City"
                  value={formData.venue}
                  onChange={(e) =>
                    setFormData({ ...formData, venue: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      key="step2"
      variants={stepContentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MOCK_PACKAGES.map((pkg) => {
          const isSelected = formData.packageId === pkg.id;
          return (
            <div
              key={pkg.id}
              onClick={() => setFormData({ ...formData, packageId: pkg.id })}
              className={`cursor-pointer rounded-2xl p-6 transition-all duration-200 relative group overflow-hidden ${
                isSelected
                  ? "border-2 border-zek-red bg-white/90 ring-4 ring-zek-red/10 shadow-xl scale-[1.01] backdrop-blur-sm"
                  : "border border-gray-200/50 bg-white/50 hover:border-red-200 hover:bg-white/80 hover:shadow-lg backdrop-blur-sm"
              }`}
            >
              {isSelected && (
                <div className="absolute -top-3 -right-3 bg-zek-red text-white rounded-full p-1.5 shadow-md z-10">
                  <Check className="w-4 h-4" />
                </div>
              )}
              <div className="flex justify-between items-start mb-2">
                <h4
                  className={`font-bold text-lg ${
                    isSelected ? "text-zek-red" : "text-gray-900"
                  }`}
                >
                  {pkg.name}
                </h4>
                {pkg.popular && (
                  <span className="bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
                    Popular
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10">
                {pkg.description}
              </p>
              <div className="flex items-end justify-between border-t border-gray-100 pt-4">
                <div>
                  <span className="text-xs text-gray-400 uppercase font-semibold">
                    Price per head
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-gray-900">
                      ₱{pkg.pricePerHead}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400 uppercase font-semibold">
                    Min Pax
                  </span>
                  <div className="font-semibold text-gray-700">
                    {pkg.minPax}+
                  </div>
                </div>
              </div>
              <div className="mt-4 bg-white/40 border border-white/50 rounded-lg p-3 backdrop-blur-sm">
                <p className="text-[10px] text-gray-400 uppercase font-bold mb-2">
                  Includes
                </p>
                <div className="flex flex-wrap gap-2">
                  {pkg.inclusions.map((inc, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium bg-white/70 border border-gray-200/50 px-2.5 py-1.5 rounded-lg text-gray-600 shadow-sm backdrop-blur-sm"
                    >
                      {inc.count} {inc.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );

  const renderStep3 = () => {
    if (!selectedPackage) return null;

    return (
      <motion.div
        key="step3"
        variants={stepContentVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3 shadow-sm">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Utensils className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-blue-900">
              Customize Menu for {selectedPackage.name}
            </h4>
            <p className="text-xs text-blue-700 mt-1 leading-relaxed">
              Please select your preferred dishes. The counters will update as
              you choose.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {selectedPackage.inclusions.map((rule, idx) => {
            const ruleKey = String(idx);
            const selectedCount = formData.selectedDishes[ruleKey]?.length || 0;
            const remaining = rule.count - selectedCount;
            const isComplete = remaining === 0;

            const availableDishes = MOCK_DISHES.filter((dish) =>
              rule.categories.includes(dish.category)
            );

            return (
              <div
                key={idx}
                className={`bg-white/60 rounded-2xl border transition-all duration-300 overflow-hidden backdrop-blur-sm ${
                  isComplete
                    ? "border-green-200 shadow-md ring-1 ring-green-100"
                    : "border-gray-200/60 shadow-sm"
                }`}
              >
                <div
                  className={`px-6 py-4 border-b flex justify-between items-center ${
                    isComplete
                      ? "bg-green-50/50 border-green-100"
                      : "bg-white/40 border-gray-100/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        isComplete
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 text-sm">
                        {rule.name}
                      </h5>
                      <p className="text-xs text-gray-500">
                        {rule.categories.join(", ")}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${
                        isComplete ? "text-green-600" : "text-orange-500"
                      }`}
                    >
                      {isComplete ? "Completed" : "Selection Required"}
                    </span>
                    <span className="text-xs text-gray-400">
                      {selectedCount} / {rule.count} Selected
                    </span>
                  </div>
                </div>

                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {availableDishes.map((dish) => {
                    const isSelected = formData.selectedDishes[
                      ruleKey
                    ]?.includes(dish.name);
                    return (
                      <button
                        key={dish.id}
                        type="button"
                        disabled={!isSelected && isComplete}
                        onClick={() =>
                          toggleDishSelection(idx, dish.name, rule.count)
                        }
                        className={`relative flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all group ${
                          isSelected
                            ? "border-zek-red bg-red-50/50 shadow-sm ring-1 ring-zek-red/20"
                            : isComplete
                            ? "border-gray-100 bg-gray-50/50 opacity-40 grayscale cursor-not-allowed"
                            : "border-gray-200/60 hover:border-red-200 hover:bg-white/80 hover:shadow-md"
                        }`}
                      >
                        <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0 relative shadow-inner">
                          {dish.image ? (
                            <Image
                              src={dish.image}
                              alt={dish.name}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                              sizes="48px"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                              <Utensils className="w-4 h-4 text-gray-300" />
                            </div>
                          )}
                          {isSelected && (
                            <div className="absolute inset-0 bg-zek-red/20 flex items-center justify-center backdrop-blur-[1px]">
                              <Check className="w-6 h-6 text-white drop-shadow-md" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm font-semibold truncate ${
                              isSelected ? "text-zek-red" : "text-gray-700"
                            }`}
                          >
                            {dish.name}
                          </p>
                          <p className="text-xs text-gray-400 truncate mt-0.5">
                            {dish.category}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    );
  };

  const renderStep4 = () => {
    if (!selectedPackage) return null;
    const totalAmount = selectedPackage.pricePerHead * formData.guests;

    return (
      <motion.div
        key="step4"
        variants={stepContentVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div className="bg-white/60 backdrop-blur-sm border border-gray-200/60 rounded-2xl shadow-sm overflow-hidden flex flex-col xl:flex-row">
          <div className="flex-1 p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Receipt className="w-5 h-5 text-gray-400" />
              <h3 className="font-bold text-gray-900 text-lg">
                Reservation Summary
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Client
                </h4>
                <p className="font-semibold text-gray-900">
                  {formData.clientName}
                </p>
                <p className="text-sm text-gray-500">{formData.clientEmail}</p>
                <p className="text-sm text-gray-500">{formData.clientPhone}</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Event
                </h4>
                <p className="font-semibold text-gray-900">
                  {formData.eventType} ({formData.guests} pax)
                </p>
                <p className="text-sm text-gray-500">
                  {formatDate(formData.date)} @ {formData.time || "TBD"}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {formData.venue || "No Venue Listed"}
                </p>
              </div>
            </div>

            <div className="border-t border-dashed border-gray-200 pt-6">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Menu Selection
              </h4>
              <div className="flex flex-wrap gap-2">
                {Object.values(formData.selectedDishes)
                  .flat()
                  .map((dish, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200"
                    >
                      {dish}
                    </span>
                  ))}
                {Object.values(formData.selectedDishes).flat().length === 0 && (
                  <span className="text-sm text-gray-400 italic">
                    No dishes selected (Chef's Choice)
                  </span>
                )}
              </div>
            </div>

            <div className="pt-4">
              <label className="block text-xs font-bold text-gray-500 mb-2">
                Assign Staff
              </label>
              <div className="relative w-full md:w-1/2">
                <select
                  className="w-full px-3 py-2 bg-white/80 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red transition-all appearance-none backdrop-blur-sm"
                  value={formData.assignedStaffId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      assignedStaffId: e.target.value,
                    })
                  }
                >
                  <option value="">Unassigned</option>
                  {MOCK_STAFF.filter((s) => s.active).map((staff) => (
                    <option key={staff.id} value={staff.id}>
                      {staff.name} ({staff.role})
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="bg-white/40 backdrop-blur-md p-6 md:p-8 xl:w-80 border-t xl:border-t-0 xl:border-l border-white/30 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-zek-red/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative z-10">
              <h4 className="font-bold text-gray-900 mb-6">
                Payment Breakdown
              </h4>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Package Price</span>
                  <span>₱{selectedPackage.pricePerHead.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Guest Count</span>
                  <span>x {formData.guests}</span>
                </div>
                <div className="border-t border-gray-200 my-2"></div>
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>
                    ₱
                    {(
                      selectedPackage.pricePerHead * formData.guests
                    ).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Service Charge (10%)</span>
                  <span>₱{(totalAmount * 0.1).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Discount</span>
                  <span>- ₱0.00</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200/50 border-dashed relative z-10">
              <div className="flex justify-between items-end mb-1">
                <span className="text-sm font-bold text-gray-500">
                  Total Estimated
                </span>
                <span className="text-2xl font-black text-gray-900">
                  ₱{(totalAmount * 1.1).toLocaleString()}
                </span>
              </div>
              <p className="text-[10px] text-gray-400 text-right">
                Includes all taxes and fees
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 sm:p-6">
      <motion.div
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 transition-opacity bg-black/40 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative bg-white/60 backdrop-blur-2xl rounded-3xl text-left shadow-2xl w-full max-w-5xl flex flex-col max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)] border border-white/50 z-50 ring-1 ring-white/60"
      >
        <div className="bg-white/40 px-6 py-4 sm:px-8 sm:py-5 border-b border-white/20 flex justify-between items-center sticky top-0 z-10 rounded-t-3xl backdrop-blur-md">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">
              Create New Reservation
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5 font-medium">
              Complete the form below to reserve a new .
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {[
              { id: 1, label: "Details" },
              { id: 2, label: "Package" },
              { id: 3, label: "Menu" },
              { id: 4, label: "Confirm" },
            ].map((s) => (
              <div key={s.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step === s.id
                        ? "bg-zek-red text-white scale-110 shadow-lg shadow-zek-red/30"
                        : step > s.id
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {step > s.id ? <Check className="w-4 h-4" /> : s.id}
                  </div>
                </div>
                {s.id < 4 && (
                  <div
                    className={`w-8 h-0.5 mx-2 rounded ${
                      step > s.id ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-transparent relative z-0">
          <AnimatePresence mode="wait">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
          </AnimatePresence>
        </div>

        <div className="bg-white/40 px-6 py-4 sm:px-8 sm:py-5 border-t border-white/20 flex justify-between items-center sticky bottom-0 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] rounded-b-3xl backdrop-blur-md">
          <button
            type="button"
            onClick={step === 1 ? onClose : handleBack}
            className="px-6 py-2.5 text-sm font-bold text-gray-600 bg-white/50 border border-white/40 rounded-xl hover:bg-white/80 hover:border-white/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-all backdrop-blur-sm"
          >
            {step === 1 ? "Cancel" : "Back"}
          </button>
          <button
            type="button"
            onClick={step === 4 ? handleSubmit : handleNext}
            className="inline-flex items-center px-8 py-2.5 text-sm font-bold text-white bg-zek-red border border-transparent rounded-xl hover:bg-zek-light-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zek-red shadow-lg shadow-zek-red/30 hover:shadow-xl hover:shadow-zek-red/40 hover:-translate-y-0.5 transition-all"
          >
            {step === 4 ? (
              <>
                Confirm Reservation <Check className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Next Step <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
