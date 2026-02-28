"use client";

import { Clock, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-start justify-center px-4 pt-16">
      <div className="max-w-xl w-full bg-white border border-gray-100 rounded-2xl shadow-sm px-8 py-10 text-center space-y-6">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-zek-red/10 text-zek-red">
          <LayoutDashboard className="h-7 w-7" />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zek-red">
            Coming soon
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            New dashboard experience on the way
          </h1>
          <p className="text-sm text-gray-500">
            We&apos;re designing a modern operations dashboard tailored for your
            catering workflow. While we finish it, you can continue managing
            reservations and other pages from the sidebar.
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
          <Clock className="h-4 w-4" />
          <span>Dashboard module under active development</span>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/reservations"
            className="inline-flex items-center justify-center w-full sm:w-auto rounded-xl bg-zek-red px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-zek-light-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zek-red transition-colors"
          >
            Go to reservations
          </Link>
          <Link
            href="/catering-packages"
            className="inline-flex items-center justify-center w-full sm:w-auto rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 bg-white hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Manage catering packages
          </Link>
        </div>
      </div>
    </div>
  );
}
