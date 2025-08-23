// File: app/(dashboard)/layout.tsx

import { Sidebar } from "@/components/dashboard/Sidebar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Sidebar />
      <main className="lg:pl-72">
        <div>
          {children}
        </div>
      </main>
    </div>
  );
}
