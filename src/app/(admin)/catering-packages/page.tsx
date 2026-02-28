"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  ChevronDown,
  ChevronUp,
  Utensils,
  Package,
  ShoppingBag,
  ChefHat,
  Coffee,
  Check,
  Users,
  IceCream2,
  LayoutGrid,
  List,
  Sparkles,
  Image as ImageIcon,
  Type,
  Tag,
  Link as LinkIcon,
} from "lucide-react";
import {
  MOCK_PACKAGES,
  MOCK_DISHES,
  MOCK_ADD_ONS,
  CateringPackage,
  Dish,
  AddOnItem,
  PackageInclusion,
} from "@/lib/mock-data";

export default function CateringPackagesPage() {
  const [activeTab, setActiveTab] = useState<"packages" | "dishes" | "addons">(
    "packages"
  );
  const [packages, setPackages] = useState<CateringPackage[]>(MOCK_PACKAGES);
  const [dishes, setDishes] = useState<Dish[]>(MOCK_DISHES);
  const [addOns, setAddOns] = useState<AddOnItem[]>(MOCK_ADD_ONS);

  // --- Packages State ---
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [editingPackage, setEditingPackage] = useState<CateringPackage | null>(
    null
  );
  const [expandedPackage, setExpandedPackage] = useState<string | null>(null);
  const [packageFormData, setPackageFormData] = useState<
    Partial<CateringPackage>
  >({
    name: "",
    description: "",
    pricePerHead: 0,
    minPax: 30,
    popular: false,
    inclusions: [],
    addOns: ["Rice", "Drinks"],
  });
  const [inclusionInput, setInclusionInput] = useState("");
  const [isSaveReady, setIsSaveReady] = useState(false);
  const [packageFilter, setPackageFilter] = useState("All");

  // Safety delay for Save button to prevent accidental double-clicks
  useEffect(() => {
    if (currentStep === 4) {
      setIsSaveReady(false);
      const timer = setTimeout(() => setIsSaveReady(true), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsSaveReady(false);
    }
  }, [currentStep]);

  // --- Dishes State ---
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [dishFormData, setDishFormData] = useState<Partial<Dish>>({
    name: "",
    category: "Beef",
    image: "",
  });
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // --- Add-ons State ---
  const [isAddOnModalOpen, setIsAddOnModalOpen] = useState(false);
  const [editingAddOn, setEditingAddOn] = useState<AddOnItem | null>(null);
  const [addOnFormData, setAddOnFormData] = useState<Partial<AddOnItem>>({
    name: "",
    category: "Pica Pica",
    price: 0,
    unit: "package",
    description: "",
  });

  // Derived Data
  const categories = Array.from(new Set(dishes.map((d) => d.category))).sort();
  const addOnCategories = Array.from(
    new Set(addOns.map((a) => a.category))
  ).sort();

  const filteredPackages = packages;
  const filteredDishes = dishes;
  const filteredAddOns = addOns;

  // --- Package Handlers ---
  const handleOpenPackageModal = (pkg?: CateringPackage) => {
    setCurrentStep(1);
    if (pkg) {
      setEditingPackage(pkg);
      setPackageFormData(JSON.parse(JSON.stringify(pkg))); // Deep copy for inclusions
    } else {
      setEditingPackage(null);
      setPackageFormData({
        name: "",
        description: "",
        pricePerHead: 0,
        minPax: 50,
        popular: false,
        inclusions: [],
        addOns: ["Rice", "Drinks"],
      });
    }
    setIsPackageModalOpen(true);
  };

  const handlePackageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep !== 4) return; // Prevent accidental submission on Enter key in earlier steps

    if (editingPackage) {
      setPackages(
        packages.map((p) =>
          p.id === editingPackage.id
            ? ({ ...p, ...packageFormData } as CateringPackage)
            : p
        )
      );
    } else {
      const newPackage: CateringPackage = {
        ...(packageFormData as CateringPackage),
        id: `p${Date.now()}`,
      };
      setPackages([...packages, newPackage]);
    }
    setIsPackageModalOpen(false);
  };

  const handleDeletePackage = (id: string) => {
    if (confirm("Are you sure you want to delete this package?")) {
      setPackages(packages.filter((p) => p.id !== id));
    }
  };

  const addInclusionItem = (item: string) => {
    if (!item.trim()) return;
    const current = packageFormData.addOns || [];
    if (!current.includes(item)) {
      setPackageFormData({ ...packageFormData, addOns: [...current, item] });
    }
    setInclusionInput("");
  };

  const removeInclusionItem = (item: string) => {
    const current = packageFormData.addOns || [];
    setPackageFormData({
      ...packageFormData,
      addOns: current.filter((i) => i !== item),
    });
  };

  const addInclusionRule = (type: "main" | "dessert" | "custom" = "custom") => {
    let defaultName = "New Selection";
    if (type === "main") defaultName = "Main Dishes";
    if (type === "dessert") defaultName = "Dessert";

    setPackageFormData({
      ...packageFormData,
      inclusions: [
        ...(packageFormData.inclusions || []),
        { name: defaultName, categories: [], count: 1 },
      ],
    });
  };

  const removeInclusionRule = (index: number) => {
    const newInclusions = [...(packageFormData.inclusions || [])];
    newInclusions.splice(index, 1);
    setPackageFormData({ ...packageFormData, inclusions: newInclusions });
  };

  const updateInclusionRule = (
    index: number,
    field: keyof PackageInclusion,
    value: any
  ) => {
    const newInclusions = [...(packageFormData.inclusions || [])];
    newInclusions[index] = { ...newInclusions[index], [field]: value };
    setPackageFormData({ ...packageFormData, inclusions: newInclusions });
  };

  const toggleCategoryInRule = (ruleIndex: number, category: string) => {
    const newInclusions = [...(packageFormData.inclusions || [])];
    const currentCategories = newInclusions[ruleIndex].categories;
    if (currentCategories.includes(category)) {
      newInclusions[ruleIndex].categories = currentCategories.filter(
        (c) => c !== category
      );
    } else {
      newInclusions[ruleIndex].categories = [...currentCategories, category];
    }
    setPackageFormData({ ...packageFormData, inclusions: newInclusions });
  };

  // --- Dish Handlers ---
  const handleOpenDishModal = (dish?: Dish) => {
    if (dish) {
      setEditingDish(dish);
      setDishFormData(dish);
    } else {
      setEditingDish(null);
      setDishFormData({ name: "", category: categories[0] || "Beef" });
    }
    setIsDishModalOpen(true);
  };

  const handleDishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDish) {
      setDishes(
        dishes.map((d) =>
          d.id === editingDish.id ? ({ ...d, ...dishFormData } as Dish) : d
        )
      );
    } else {
      const newDish: Dish = {
        ...(dishFormData as Dish),
        id: `d${Date.now()}`,
      };
      setDishes([...dishes, newDish]);
    }
    setIsDishModalOpen(false);
  };

  const handleDeleteDish = (id: string) => {
    if (confirm("Are you sure you want to delete this dish?")) {
      setDishes(dishes.filter((d) => d.id !== id));
    }
  };

  // --- Add-on Handlers ---
  const handleOpenAddOnModal = (addOn?: AddOnItem) => {
    if (addOn) {
      setEditingAddOn(addOn);
      setAddOnFormData(addOn);
    } else {
      setEditingAddOn(null);
      setAddOnFormData({
        name: "",
        category: addOnCategories[0] || "Pica Pica",
        price: 0,
        unit: "package",
        description: "",
      });
    }
    setIsAddOnModalOpen(true);
  };

  const handleAddOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAddOn) {
      setAddOns(
        addOns.map((a) =>
          a.id === editingAddOn.id
            ? ({ ...a, ...addOnFormData } as AddOnItem)
            : a
        )
      );
    } else {
      const newAddOn: AddOnItem = {
        ...(addOnFormData as AddOnItem),
        id: `ao${Date.now()}`,
      };
      setAddOns([...addOns, newAddOn]);
    }
    setIsAddOnModalOpen(false);
  };

  const handleDeleteAddOn = (id: string) => {
    if (confirm("Are you sure you want to delete this add-on?")) {
      setAddOns(addOns.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
          <p className="text-sm text-gray-500">
            Manage your packages, menus, and dish options.
          </p>
        </div>
        <div className="flex gap-2" />
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("packages")}
            className={`${
              activeTab === "packages"
                ? "border-zek-red text-zek-red"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
          >
            <Package className="w-4 h-4" />
            Packages
          </button>
          <button
            onClick={() => setActiveTab("dishes")}
            className={`${
              activeTab === "dishes"
                ? "border-zek-red text-zek-red"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
          >
            <Utensils className="w-4 h-4" />
            Meal Choices
          </button>
          <button
            onClick={() => setActiveTab("addons")}
            className={`${
              activeTab === "addons"
                ? "border-zek-red text-zek-red"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
          >
            <ShoppingBag className="w-4 h-4" />
            Add-ons & Extras
          </button>
        </nav>
      </div>

      {/* Content Area */}
      {activeTab === "packages" && (
        <div className="space-y-6">
          {/* Package Filter */}
          <div className="flex gap-3">
            <button
              onClick={() => handleOpenPackageModal()}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-zek-red hover:bg-zek-light-red transition-all"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Package
            </button>
            <div className="relative w-full sm:w-64 ml-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Tag className="h-4 w-4 text-gray-400" />
              </div>
              <select
                value={packageFilter}
                onChange={(e) => setPackageFilter(e.target.value)}
                className="block w-full pl-10 pr-10 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red shadow-sm appearance-none cursor-pointer transition-all hover:border-gray-300"
              >
                <option value="All">
                  All Packages ({filteredPackages.length})
                </option>
                <option value="Popular">
                  Popular Only (
                  {filteredPackages.filter((p) => p.popular).length})
                </option>
                {filteredPackages.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages
              .filter((pkg) => {
                if (packageFilter === "All") return true;
                if (packageFilter === "Popular") return pkg.popular;
                return pkg.id === packageFilter;
              })
              .map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-gray-900">
                            {pkg.name}
                          </h3>
                          {pkg.popular && (
                            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {pkg.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-zek-red">
                          ₱{pkg.pricePerHead}
                        </p>
                        <p className="text-xs text-gray-400">per head</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-6">
                      <div className="flex items-center gap-1.5 bg-gray-50 text-gray-700 px-2.5 py-1 rounded-lg border border-gray-100">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="font-semibold">
                          {pkg.minPax} Min Pax
                        </span>
                      </div>
                      {pkg.addOns?.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 bg-green-50 text-green-700 px-2.5 py-1 rounded-lg border border-green-100"
                        >
                          <Check className="w-4 h-4" />
                          <span className="font-semibold">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Package Menu
                      </h4>
                      {pkg.inclusions.map((inc, idx) => {
                        const isDessert = inc.name
                          .toLowerCase()
                          .includes("dessert");
                        return (
                          <div
                            key={idx}
                            className="flex items-start gap-3 text-sm group"
                          >
                            <div
                              className={`mt-0.5 p-1.5 rounded-lg flex-shrink-0 transition-colors ${
                                isDessert
                                  ? "bg-pink-50 text-pink-600 group-hover:bg-pink-100"
                                  : "bg-orange-50 text-orange-600 group-hover:bg-orange-100"
                              }`}
                            >
                              {isDessert ? (
                                <IceCream2 className="w-4 h-4" />
                              ) : (
                                <ChefHat className="w-4 h-4" />
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">
                                {inc.count} {inc.name}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                                <span className="text-gray-400">
                                  Select from:{" "}
                                </span>
                                {inc.categories.join(", ")}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center mt-auto">
                    <span className="text-xs text-gray-400 font-mono">
                      ID: {pkg.id}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenPackageModal(pkg)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Edit Package"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePackage(pkg.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete Package"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {activeTab === "dishes" && (
        <div className="space-y-6">
          {/* Filter Dropdown */}
          <div className="flex gap-3">
            <button
              onClick={() => handleOpenDishModal()}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-zek-red hover:bg-zek-light-red transition-all"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Dish
            </button>
            <div className="relative w-full sm:w-64 ml-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Tag className="h-4 w-4 text-gray-400" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full pl-10 pr-10 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red shadow-sm appearance-none cursor-pointer transition-all hover:border-gray-300"
              >
                <option value="All">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat} (
                    {filteredDishes.filter((d) => d.category === cat).length})
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Dishes Grid */}
          <div className="space-y-12">
            {categories
              .filter(
                (cat) => selectedCategory === "All" || selectedCategory === cat
              )
              .map((category) => {
                const categoryDishes = filteredDishes.filter(
                  (d) => d.category === category
                );
                if (categoryDishes.length === 0) return null;

                return (
                  <div key={category} className="space-y-4">
                    <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                      <h3 className="text-xl font-bold text-gray-800 tracking-tight">
                        {category}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500 text-xs font-bold">
                        {categoryDishes.length}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                      {categoryDishes.map((dish) => (
                        <motion.div
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          key={dish.id}
                          className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative"
                        >
                          {/* Image Area */}
                          <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                            {dish.image ? (
                              <div
                                className="relative w-full h-full cursor-zoom-in"
                                onClick={() =>
                                  setSelectedImage(dish.image || null)
                                }
                              >
                                <Image
                                  src={dish.image}
                                  alt={dish.name}
                                  fill
                                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              </div>
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 bg-gray-50">
                                <Utensils className="w-10 h-10 mb-2 opacity-50" />
                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">
                                  No Image
                                </span>
                              </div>
                            )}

                            {/* Floating Action Buttons */}
                            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenDishModal(dish);
                                }}
                                className="p-2 bg-white/90 backdrop-blur-sm text-gray-700 rounded-xl hover:bg-zek-red hover:text-white shadow-lg transition-colors transform hover:scale-105"
                                title="Edit"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteDish(dish.id);
                                }}
                                className="p-2 bg-white/90 backdrop-blur-sm text-red-500 rounded-xl hover:bg-red-500 hover:text-white shadow-lg transition-colors transform hover:scale-105 delay-75"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-5">
                            <div className="flex justify-between items-start gap-2 mb-2">
                              <h4 className="font-bold text-gray-900 leading-tight group-hover:text-zek-red transition-colors line-clamp-2">
                                {dish.name}
                              </h4>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-50 text-xs font-medium text-gray-500 border border-gray-100">
                                <Tag className="w-3 h-3 mr-1" />
                                {dish.category}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {activeTab === "addons" && null}

      {/* --- Modals --- */}

      {/* Package Modal */}
      <AnimatePresence>
        {isPackageModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPackageModalOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-white/50"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-100 bg-white/50 backdrop-blur-md sticky top-0 z-10">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-xl font-black text-gray-900 tracking-tight">
                      {editingPackage ? "Edit Package" : "Create New Package"}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">
                      Step {currentStep} of 4:{" "}
                      {currentStep === 1 && "Package Details"}
                      {currentStep === 2 && "Standard Inclusions"}
                      {currentStep === 3 && "Menu Configuration"}
                      {currentStep === 4 && "Review & Finalize"}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsPackageModalOpen(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Progress Stepper */}
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex-1 flex flex-col gap-1">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          step <= currentStep ? "bg-zek-red" : "bg-gray-200"
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 bg-white/40">
                <form id="packageForm" onSubmit={handlePackageSubmit}>
                  {/* Step 1: Package Details */}
                  {currentStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="max-w-2xl mx-auto space-y-6"
                    >
                      <div className="bg-white/60 p-6 rounded-xl border border-white/60 shadow-sm space-y-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Package className="w-5 h-5 text-zek-red" />
                          <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wide">
                            Package Information
                          </h4>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase">
                            Package Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Grand Wedding Feast"
                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red transition-all text-sm font-semibold text-gray-900"
                            value={packageFormData.name}
                            onChange={(e) =>
                              setPackageFormData({
                                ...packageFormData,
                                name: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase">
                            Description <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            required
                            rows={3}
                            placeholder="Describe what makes this package special..."
                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red transition-all text-sm text-gray-600 resize-none"
                            value={packageFormData.description}
                            onChange={(e) =>
                              setPackageFormData({
                                ...packageFormData,
                                description: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase">
                              Price per Head
                            </label>
                            <div className="relative">
                              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">
                                ₱
                              </span>
                              <input
                                type="number"
                                required
                                min="0"
                                className="w-full pl-8 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red transition-all text-sm font-bold text-gray-900"
                                value={packageFormData.pricePerHead}
                                onChange={(e) =>
                                  setPackageFormData({
                                    ...packageFormData,
                                    pricePerHead: Number(e.target.value),
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase">
                              Min Pax
                            </label>
                            <div className="relative">
                              <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <input
                                type="number"
                                required
                                min="1"
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red transition-all text-sm font-bold text-gray-900"
                                value={packageFormData.minPax}
                                onChange={(e) =>
                                  setPackageFormData({
                                    ...packageFormData,
                                    minPax: Number(e.target.value),
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                          <input
                            type="checkbox"
                            id="popular"
                            className="w-4 h-4 text-zek-red border-gray-300 rounded focus:ring-zek-red"
                            checked={packageFormData.popular}
                            onChange={(e) =>
                              setPackageFormData({
                                ...packageFormData,
                                popular: e.target.checked,
                              })
                            }
                          />
                          <label
                            htmlFor="popular"
                            className="text-sm font-medium text-gray-700 select-none cursor-pointer"
                          >
                            Mark as Popular Package
                          </label>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Standard Inclusions */}
                  {currentStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="max-w-2xl mx-auto space-y-6"
                    >
                      <div className="bg-white/60 p-6 rounded-xl border border-white/60 shadow-sm space-y-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Check className="w-5 h-5 text-zek-red" />
                          <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wide">
                            Standard Inclusions
                          </h4>
                        </div>
                        <p className="text-sm text-gray-500">
                          Add items that are automatically included in this
                          package (e.g., Rice, Drinks, Service Crew).
                        </p>

                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Add item (e.g. Soup)..."
                            className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red text-sm"
                            value={inclusionInput}
                            onChange={(e) => setInclusionInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                addInclusionItem(inclusionInput);
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => addInclusionItem(inclusionInput)}
                            disabled={!inclusionInput.trim()}
                            className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Add
                          </button>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex flex-wrap gap-2">
                          {[
                            "Rice",
                            "Iced Tea",
                            "Soup",
                            "Utensils",
                            "Service Crew",
                          ].map((item) => (
                            <button
                              key={item}
                              type="button"
                              onClick={() => addInclusionItem(item)}
                              className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-xs text-gray-600 rounded-lg font-medium transition-colors border border-gray-200"
                            >
                              + {item}
                            </button>
                          ))}
                        </div>

                        {/* Active Inclusions List */}
                        <div className="bg-white/50 p-4 rounded-xl border border-gray-100 min-h-[100px]">
                          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">
                            Current Inclusions
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {packageFormData.addOns?.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg border border-green-100 text-sm font-bold group"
                              >
                                <Check className="w-3.5 h-3.5" />
                                {item}
                                <button
                                  type="button"
                                  onClick={() => removeInclusionItem(item)}
                                  className="ml-1 text-green-400 hover:text-red-500 transition-colors"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                            {(!packageFormData.addOns ||
                              packageFormData.addOns.length === 0) && (
                              <p className="text-sm text-gray-400 italic py-2">
                                No items added yet. Use the input above to add
                                inclusions.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Menu Configuration */}
                  {currentStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="max-w-3xl mx-auto space-y-6"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <h4 className="font-bold text-gray-900">
                            Menu Configuration
                          </h4>
                          <p className="text-sm text-gray-500">
                            Define the menu choices available to customers.
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => addInclusionRule("main")}
                            className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-bold rounded-lg hover:bg-gray-50 hover:text-zek-red transition-colors shadow-sm flex items-center gap-1"
                          >
                            <Utensils className="w-3 h-3" /> + Main
                          </button>
                          <button
                            type="button"
                            onClick={() => addInclusionRule("dessert")}
                            className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-bold rounded-lg hover:bg-gray-50 hover:text-pink-500 transition-colors shadow-sm flex items-center gap-1"
                          >
                            <IceCream2 className="w-3 h-3" /> + Dessert
                          </button>
                          <button
                            type="button"
                            onClick={() => addInclusionRule("custom")}
                            className="px-3 py-1.5 bg-zek-red text-white text-xs font-bold rounded-lg hover:bg-zek-light-red transition-colors shadow-sm flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" /> Custom
                          </button>
                        </div>
                      </div>

                      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 pb-2 scrollbar-thin scrollbar-thumb-gray-200">
                        <AnimatePresence>
                          {packageFormData.inclusions?.map((rule, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow group relative"
                            >
                              <button
                                type="button"
                                onClick={() => removeInclusionRule(idx)}
                                className="absolute top-3 right-3 p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>

                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                                <div className="sm:col-span-2">
                                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">
                                    Rule Name
                                  </label>
                                  <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                                      <List className="w-4 h-4" />
                                    </div>
                                    <input
                                      type="text"
                                      className="flex-1 px-3 py-1.5 bg-gray-50 border-transparent hover:bg-white hover:border-gray-200 border rounded-lg focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red transition-all text-sm font-semibold text-gray-800"
                                      value={rule.name}
                                      onChange={(e) =>
                                        updateInclusionRule(
                                          idx,
                                          "name",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">
                                    Choices Allowed
                                  </label>
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="number"
                                      min="1"
                                      className="w-full px-3 py-1.5 bg-gray-50 border-transparent hover:bg-white hover:border-gray-200 border rounded-lg focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red transition-all text-sm font-bold text-gray-800 text-center"
                                      value={rule.count}
                                      onChange={(e) =>
                                        updateInclusionRule(
                                          idx,
                                          "count",
                                          Number(e.target.value)
                                        )
                                      }
                                    />
                                    <span className="text-xs text-gray-400 font-medium">
                                      Items
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="pt-3 border-t border-gray-100">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">
                                  Available Categories
                                </label>
                                <div className="flex flex-wrap gap-2">
                                  {categories.map((cat) => {
                                    const isSelected =
                                      rule.categories.includes(cat);
                                    return (
                                      <button
                                        key={cat}
                                        type="button"
                                        onClick={() =>
                                          toggleCategoryInRule(idx, cat)
                                        }
                                        className={`
                                          px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 flex items-center gap-1.5
                                          ${
                                            isSelected
                                              ? "bg-zek-red text-white border-zek-red shadow-md shadow-zek-red/20 transform scale-105"
                                              : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700 hover:bg-gray-50"
                                          }
                                        `}
                                      >
                                        {isSelected && (
                                          <Check className="w-3 h-3" />
                                        )}
                                        {cat}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                        {(!packageFormData.inclusions ||
                          packageFormData.inclusions.length === 0) && (
                          <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                            <Utensils className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                            <p className="text-gray-500 text-sm font-medium">
                              No menu rules yet
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              Add a rule to define what dishes customers can
                              choose.
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Review & Finalize */}
                  {currentStep === 4 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="max-w-2xl mx-auto"
                    >
                      <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl text-white shadow-2xl relative overflow-hidden">
                        {/* Background Patterns */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-zek-red/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                        <div className="flex items-center gap-3 mb-6 relative z-10">
                          <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                            <Sparkles className="w-6 h-6 text-yellow-400" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400">
                              Package Summary
                            </h4>
                            <h3 className="text-2xl font-bold">
                              {packageFormData.name || "Untitled Package"}
                            </h3>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mb-8 relative z-10">
                          <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1">
                              Price per Head
                            </label>
                            <p className="text-3xl font-black text-zek-red">
                              ₱
                              {packageFormData.pricePerHead?.toLocaleString() ||
                                0}
                            </p>
                          </div>
                          <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1">
                              Minimum Pax
                            </label>
                            <div className="flex items-center gap-2">
                              <Users className="w-5 h-5 text-gray-400" />
                              <p className="text-xl font-bold">
                                {packageFormData.minPax} Guests
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6 relative z-10">
                          <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">
                              Description
                            </label>
                            <p className="text-gray-300 leading-relaxed text-sm">
                              {packageFormData.description ||
                                "No description provided."}
                            </p>
                          </div>

                          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-3">
                              Included Items
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {packageFormData.addOns?.map((item, i) => (
                                <span
                                  key={i}
                                  className="bg-green-500/20 text-green-200 px-3 py-1.5 rounded-lg border border-green-500/30 text-sm font-medium flex items-center gap-2"
                                >
                                  <Check className="w-3 h-3" />
                                  {item}
                                </span>
                              ))}
                              {(!packageFormData.addOns ||
                                packageFormData.addOns.length === 0) && (
                                <span className="text-gray-500 text-sm italic">
                                  No standard inclusions.
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-3">
                              Menu Configuration Rules
                            </label>
                            <div className="space-y-2">
                              {packageFormData.inclusions?.map((rule, i) => {
                                if (!rule) return null; // Defensive check for malformed data
                                const categories = Array.isArray(
                                  rule.categories
                                )
                                  ? rule.categories
                                  : [];
                                return (
                                  <div
                                    key={i}
                                    className="flex justify-between text-sm py-2 border-b border-white/5 last:border-0"
                                  >
                                    <span className="font-semibold text-white">
                                      {rule.count || 1}x{" "}
                                      {rule.name || "Selection"}
                                    </span>
                                    <span className="text-gray-400 truncate max-w-[200px]">
                                      {categories.length > 0
                                        ? categories.join(", ")
                                        : "Any Category"}
                                    </span>
                                  </div>
                                );
                              })}
                              {(!packageFormData.inclusions ||
                                packageFormData.inclusions.length === 0) && (
                                <span className="text-gray-500 text-sm italic">
                                  No menu rules configured.
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </form>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center rounded-b-2xl">
                {currentStep === 1 ? (
                  <button
                    type="button"
                    onClick={() => setIsPackageModalOpen(false)}
                    className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-800 hover:bg-gray-200/50 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-800 hover:bg-gray-200/50 rounded-xl transition-colors"
                  >
                    Back
                  </button>
                )}

                {currentStep < 4 ? (
                  <button
                    key="next-btn"
                    type="button"
                    onClick={() => {
                      // Simple validation for Step 1
                      if (currentStep === 1) {
                        if (
                          !packageFormData.name ||
                          !packageFormData.description
                        ) {
                          alert(
                            "Please fill in all required fields (Name & Description)"
                          );
                          return;
                        }
                      }
                      setCurrentStep((prev) => prev + 1);
                    }}
                    className="inline-flex items-center px-6 py-2.5 bg-zek-red text-white text-sm font-bold rounded-xl hover:bg-zek-light-red shadow-lg shadow-zek-red/30 hover:shadow-xl hover:shadow-zek-red/40 hover:-translate-y-0.5 transition-all"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    key="save-btn"
                    type="submit"
                    form="packageForm"
                    disabled={!isSaveReady}
                    className={`inline-flex items-center px-6 py-2.5 bg-green-600 text-white text-sm font-bold rounded-xl hover:bg-green-700 shadow-lg shadow-green-600/30 hover:shadow-xl hover:shadow-green-600/40 hover:-translate-y-0.5 transition-all ${
                      !isSaveReady ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    {editingPackage ? "Save Changes" : "Create New Package"}
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dish Modal */}
      <AnimatePresence>
        {isDishModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDishModalOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col overflow-hidden border border-white/50"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white/50 backdrop-blur-md sticky top-0 z-10">
                <div>
                  <h3 className="text-xl font-black text-gray-900 tracking-tight">
                    {editingDish ? "Edit Dish" : "Add New Dish"}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    Manage dish details and visual presentation.
                  </p>
                </div>
                <button
                  onClick={() => setIsDishModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 bg-white/40">
                <form id="dishForm" onSubmit={handleDishSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column: Image Preview */}
                    <div className="space-y-4">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Preview Image
                      </label>
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 group hover:border-zek-red/50 transition-colors shadow-inner">
                        {dishFormData.image ? (
                          <Image
                            src={dishFormData.image}
                            alt="Preview"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => {
                              // Fallback if image fails to load
                              (e.target as HTMLImageElement).src = ""; // Clear src to trigger fallback UI if needed, but in Next/Image we might need a state.
                              // For simplicity, we assume valid URLs or show broken icon if visually broken.
                              // Since we can't easily set state from onError in this render loop without potential issues, we rely on visual feedback or browser behavior.
                            }}
                          />
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                            <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                            <span className="text-xs font-medium">
                              No image URL provided
                            </span>
                          </div>
                        )}

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                          <span className="text-white text-xs font-bold tracking-wide backdrop-blur-md px-3 py-1 rounded-full bg-white/20">
                            Live Preview
                          </span>
                        </div>
                      </div>

                      <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 text-xs text-blue-700 flex gap-2 items-start">
                        <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-500" />
                        <p>
                          Pro Tip: Use high-quality 4:3 images. Images from
                          Unsplash work best!
                        </p>
                      </div>
                    </div>

                    {/* Right Column: Form Fields */}
                    <div className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase">
                          Dish Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Type className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Beef Steak Tagalog"
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red transition-all text-sm font-semibold text-gray-900"
                            value={dishFormData.name}
                            onChange={(e) =>
                              setDishFormData({
                                ...dishFormData,
                                name: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase">
                          Category <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                          <select
                            className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red transition-all text-sm font-medium text-gray-900 appearance-none cursor-pointer"
                            value={
                              isCustomCategory
                                ? "New Category"
                                : dishFormData.category
                            }
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === "New Category") {
                                setIsCustomCategory(true);
                                setDishFormData({
                                  ...dishFormData,
                                  category: "",
                                });
                              } else {
                                setIsCustomCategory(false);
                                setDishFormData({
                                  ...dishFormData,
                                  category: value,
                                });
                              }
                            }}
                          >
                            {categories.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                            <option value="New Category">
                              + Create New Category...
                            </option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      {isCustomCategory && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="bg-gray-50 p-3 rounded-xl border border-gray-200"
                        >
                          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                            New Category Name
                          </label>
                          <input
                            type="text"
                            required
                            autoFocus
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red text-sm"
                            placeholder="e.g. Appetizers"
                            value={dishFormData.category}
                            onChange={(e) =>
                              setDishFormData({
                                ...dishFormData,
                                category: e.target.value,
                              })
                            }
                          />
                        </motion.div>
                      )}

                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase">
                          Image URL
                        </label>
                        <div className="relative">
                          <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="url"
                            placeholder="https://..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red transition-all text-sm text-gray-600 font-mono placeholder:font-sans"
                            value={dishFormData.image || ""}
                            onChange={(e) =>
                              setDishFormData({
                                ...dishFormData,
                                image: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center rounded-b-2xl">
                <button
                  type="button"
                  onClick={() => setIsDishModalOpen(false)}
                  className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-800 hover:bg-gray-200/50 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="dishForm"
                  className="inline-flex items-center px-6 py-2.5 bg-zek-red text-white text-sm font-bold rounded-xl hover:bg-zek-light-red shadow-lg shadow-zek-red/30 hover:shadow-xl hover:shadow-zek-red/40 hover:-translate-y-0.5 transition-all"
                >
                  {editingDish ? "Save Changes" : "Add Dish"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add-on Modal */}
      {isAddOnModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
              onClick={() => setIsAddOnModalOpen(false)}
            />
            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-lg font-bold text-gray-900">
                    {editingAddOn ? "Edit Add-on Item" : "New Add-on Item"}
                  </h3>
                  <button
                    onClick={() => setIsAddOnModalOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form
                  id="addOnForm"
                  onSubmit={handleAddOnSubmit}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Item Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red"
                      value={addOnFormData.name}
                      onChange={(e) =>
                        setAddOnFormData({
                          ...addOnFormData,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <div className="relative">
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red appearance-none"
                        value={addOnFormData.category}
                        onChange={(e) =>
                          setAddOnFormData({
                            ...addOnFormData,
                            category: e.target.value,
                          })
                        }
                      >
                        {addOnCategories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                        <option value="New Category">New Category...</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  {addOnFormData.category === "New Category" && (
                    <div className="mt-2">
                      <input
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red"
                        placeholder="Enter New Category Name"
                        onChange={(e) =>
                          setAddOnFormData({
                            ...addOnFormData,
                            category: e.target.value,
                          })
                        }
                      />
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price (₱)
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red"
                        value={addOnFormData.price}
                        onChange={(e) =>
                          setAddOnFormData({
                            ...addOnFormData,
                            price: Number(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Unit
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. per pax, whole"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red"
                        value={addOnFormData.unit}
                        onChange={(e) =>
                          setAddOnFormData({
                            ...addOnFormData,
                            unit: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description (Optional)
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red"
                      rows={2}
                      value={addOnFormData.description}
                      onChange={(e) =>
                        setAddOnFormData({
                          ...addOnFormData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                </form>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  form="addOnForm"
                  className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-2 bg-zek-red text-base font-medium text-white hover:bg-zek-light-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zek-red sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {editingAddOn ? "Save Changes" : "Add Item"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddOnModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-xl border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center pointer-events-none"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors p-2 pointer-events-auto group flex items-center gap-2"
              >
                <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Close Preview
                </span>
                <div className="bg-white/10 p-2 rounded-full group-hover:bg-white/20 transition-colors">
                  <X className="w-6 h-6" />
                </div>
              </button>
              <div
                className="relative w-full h-full pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedImage}
                  alt="Full size preview"
                  fill
                  className="object-contain drop-shadow-2xl"
                  sizes="100vw"
                  priority
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
