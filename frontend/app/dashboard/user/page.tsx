"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function UserDashboard() {
  const [me, setMe] = useState<any>(null);

  useEffect(() => {
    api.get("/account/me").then((r) => setMe(r.data));
  }, []);

  return (
    <ProtectedRoute>
      <main className="min-h-screen text-white p-6">
        <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>

        {me ? (
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 max-w-md">
            <p><span className="text-gray-400">Email:</span> {me.email}</p>
            <p><span className="text-gray-400">Role:</span> {me.role}</p>
            <p><span className="text-gray-400">User ID:</span> {me.id}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </ProtectedRoute>
  );
}
