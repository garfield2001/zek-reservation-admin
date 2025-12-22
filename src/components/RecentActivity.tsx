"use client";

import {
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react";
import { MOCK_ACTIVITY_LOG } from "@/lib/mock-data";

export default function RecentActivity() {
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-zek-red" />
            Recent Activity
          </h3>
        </div>
        <button className="text-sm font-semibold text-zek-red hover:text-zek-light-red transition-colors">
          View all
        </button>
      </div>
      <div className="p-6">
        <div className="flow-root">
          <ul role="list" className="-mb-8">
            {MOCK_ACTIVITY_LOG.map((activity, activityIdx) => (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {activityIdx !== MOCK_ACTIVITY_LOG.length - 1 ? (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${getBgColor(
                        activity.type
                      )}`}
                    >
                      {getIcon(activity.type)}
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div>
                        <p className="text-sm text-gray-500">
                          <span className="font-medium text-gray-900">
                            {activity.user}
                          </span>{" "}
                          {activity.action}{" "}
                          <span className="font-medium text-gray-900">
                            {activity.target}
                          </span>
                        </p>
                      </div>
                      <div className="whitespace-nowrap text-right text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
