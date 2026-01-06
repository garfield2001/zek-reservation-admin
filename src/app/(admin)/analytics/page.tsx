"use client";

import { useState } from "react";
import {
  BarChart3,
  Settings,
  Database,
  Bell,
  FileText,
  Save,
  Check,
  Download,
  Mail,
  AlertTriangle,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ManageAnalyticsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock State for Settings
  const [settings, setSettings] = useState({
    defaultRange: "30d",
    currency: "USD",
    comparisonMode: true,
    includeTaxes: false,
    emailReports: true,
    emailFrequency: "weekly",
    revenueAlert: true,
    revenueThreshold: "1000",
    occupancyAlert: false,
    occupancyThreshold: "80",
    autoExport: false,
    exportFormat: "csv",
  });

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "exports", label: "Data & Exports", icon: Database },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Analytics</h1>
          <p className="text-sm text-gray-500">
            Configure your analytics preferences, reporting, and alerts.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`
            flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium transition-all shadow-sm
            ${
              isSaving
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-md"
            }
          `}
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Saving...</span>
            </>
          ) : showSuccess ? (
            <>
              <Check className="w-4 h-4" />
              <span>Saved!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 sticky top-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors mb-1
                    ${
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }
                  `}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      activeTab === tab.id ? "text-blue-600" : "text-gray-400"
                    }`}
                  />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* General Settings */}
          {activeTab === "general" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      General Preferences
                    </h2>
                    <p className="text-sm text-gray-500">
                      Customize how data is displayed in your reports.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Default Date Range
                      </label>
                      <select
                        value={settings.defaultRange}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            defaultRange: e.target.value,
                          })
                        }
                        className="w-full p-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all text-sm"
                      >
                        <option value="7d">Last 7 Days</option>
                        <option value="30d">Last 30 Days</option>
                        <option value="90d">Last 3 Months</option>
                        <option value="12m">Last 12 Months</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Currency Display
                      </label>
                      <select
                        value={settings.currency}
                        onChange={(e) =>
                          setSettings({ ...settings, currency: e.target.value })
                        }
                        className="w-full p-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all text-sm"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="PHP">PHP (₱)</option>
                        <option value="JPY">JPY (¥)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="font-medium text-gray-900">
                          Comparison Mode
                        </p>
                        <p className="text-sm text-gray-500">
                          Show percentage change vs previous period
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.comparisonMode}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              comparisonMode: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="font-medium text-gray-900">
                          Include Taxes in Revenue
                        </p>
                        <p className="text-sm text-gray-500">
                          Calculate totals including VAT/Tax
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.includeTaxes}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              includeTaxes: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Dashboard Widgets
                    </h2>
                    <p className="text-sm text-gray-500">
                      Select which charts appear on your main analytics page.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Revenue Overview",
                    "Occupancy Rate",
                    "Popular Dishes",
                    "Customer Retention",
                    "Peak Hours",
                    "Cancellation Rate",
                  ].map((widget) => (
                    <div
                      key={widget}
                      className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="flex-1">
                        <span className="text-sm font-medium text-gray-700">
                          {widget}
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Notifications Settings */}
          {activeTab === "notifications" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Bell className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Alerts & Notifications
                    </h2>
                    <p className="text-sm text-gray-500">
                      Manage how and when you want to be notified.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Email Reports */}
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        <Mail className="w-5 h-5 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <label className="font-medium text-gray-900">
                            Scheduled Email Reports
                          </label>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.emailReports}
                              onChange={(e) =>
                                setSettings({
                                  ...settings,
                                  emailReports: e.target.checked,
                                })
                              }
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">
                          Receive a summary of key metrics directly to your
                          inbox.
                        </p>

                        {settings.emailReports && (
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600">
                              Frequency:
                            </span>
                            <div className="flex gap-2">
                              {["Daily", "Weekly", "Monthly"].map((freq) => (
                                <button
                                  key={freq}
                                  onClick={() =>
                                    setSettings({
                                      ...settings,
                                      emailFrequency: freq.toLowerCase(),
                                    })
                                  }
                                  className={`
                                    px-3 py-1.5 text-xs font-medium rounded-full transition-colors
                                    ${
                                      settings.emailFrequency ===
                                      freq.toLowerCase()
                                        ? "bg-purple-100 text-purple-700 border border-purple-200"
                                        : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                                    }
                                  `}
                                >
                                  {freq}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Revenue Alert */}
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        <TrendingUp className="w-5 h-5 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <label className="font-medium text-gray-900">
                            Revenue Milestones
                          </label>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.revenueAlert}
                              onChange={(e) =>
                                setSettings({
                                  ...settings,
                                  revenueAlert: e.target.checked,
                                })
                              }
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">
                          Get notified when daily revenue exceeds a specific
                          amount.
                        </p>

                        {settings.revenueAlert && (
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-gray-400" />
                            <input
                              type="number"
                              value={settings.revenueThreshold}
                              onChange={(e) =>
                                setSettings({
                                  ...settings,
                                  revenueThreshold: e.target.value,
                                })
                              }
                              className="w-32 p-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-purple-500"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Occupancy Alert */}
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        <AlertTriangle className="w-5 h-5 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <label className="font-medium text-gray-900">
                            Low Occupancy Alert
                          </label>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.occupancyAlert}
                              onChange={(e) =>
                                setSettings({
                                  ...settings,
                                  occupancyAlert: e.target.checked,
                                })
                              }
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">
                          Alert when daily occupancy drops below a percentage.
                        </p>

                        {settings.occupancyAlert && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Below</span>
                            <input
                              type="number"
                              value={settings.occupancyThreshold}
                              onChange={(e) =>
                                setSettings({
                                  ...settings,
                                  occupancyThreshold: e.target.value,
                                })
                              }
                              className="w-20 p-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-purple-500"
                            />
                            <span className="text-sm text-gray-600">%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Data & Exports Settings */}
          {activeTab === "exports" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <Database className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Data Management
                    </h2>
                    <p className="text-sm text-gray-500">
                      Export your data or configure automatic backups.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-5 border border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center text-center">
                    <FileText className="w-10 h-10 text-gray-400 mb-3" />
                    <h3 className="font-medium text-gray-900 mb-1">
                      Export Current Data
                    </h3>
                    <p className="text-sm text-gray-500 mb-4 max-w-xs">
                      Download a complete record of your analytics data for the
                      current period.
                    </p>
                    <div className="flex gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                        <Download className="w-4 h-4" />
                        Download CSV
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                        <Download className="w-4 h-4" />
                        Download PDF
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="font-medium text-gray-900">
                          Automatic Exports
                        </p>
                        <p className="text-sm text-gray-500">
                          Automatically send data exports to your email
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.autoExport}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              autoExport: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Exports Table */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Recent Exports</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 rounded-l-lg">Date</th>
                        <th className="px-4 py-3">Type</th>
                        <th className="px-4 py-3">Size</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 rounded-r-lg">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          date: "Oct 24, 2023",
                          type: "Monthly Report",
                          size: "2.4 MB",
                          status: "Completed",
                        },
                        {
                          date: "Sep 24, 2023",
                          type: "Monthly Report",
                          size: "2.1 MB",
                          status: "Completed",
                        },
                        {
                          date: "Aug 24, 2023",
                          type: "Monthly Report",
                          size: "1.9 MB",
                          status: "Completed",
                        },
                      ].map((row, i) => (
                        <tr
                          key={i}
                          className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50"
                        >
                          <td className="px-4 py-3 font-medium text-gray-900">
                            {row.date}
                          </td>
                          <td className="px-4 py-3 text-gray-500">
                            {row.type}
                          </td>
                          <td className="px-4 py-3 text-gray-500">
                            {row.size}
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {row.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button className="text-blue-600 hover:text-blue-800 font-medium text-xs">
                              Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
