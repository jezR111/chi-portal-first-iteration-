"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/dashboard/Layout/Sidebar";

const sortOptions = [
  { value: "recent", label: "Most Recent" },
  { value: "popular", label: "Most Popular" },
  { value: "az", label: "A-Z" },
];

export default function CoursesPage() {
  const [sort, setSort] = useState("recent");

  // Placeholder: sorting does not affect order yet

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside className="hidden lg:block w-64 flex-shrink-0 pt-12 bg-white border-r border-gray-200 min-h-screen">
        <Sidebar />
      </aside>
      {/* Main Content */}
  <main className="flex-1 py-12 px-4 lg:pl-36 lg:pr-36">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold text-center md:text-left">Courses</h1>
          <div className="flex items-center gap-4 justify-center md:justify-end">
            <label htmlFor="sort" className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              id="sort"
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <Link href="/dashboard" className="ml-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium border border-gray-200 transition">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Placeholder course cards */}
          {[1,2,3,4,5,6].map((id) => (
            <div key={id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform cursor-pointer border border-gray-100">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600">C{id}</span>
              </div>
              <div className="font-semibold text-lg mb-2">Course Title {id}</div>
              <div className="text-gray-500 text-sm text-center mb-4">Short description of course {id} goes here. This is a placeholder.</div>
              <button className="mt-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">View Course</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
