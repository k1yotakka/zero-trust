"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function ManagerDashboard() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    api.get("/admin/users").then((r) => setUsers(r.data));
  }, []);

  return (
    <ProtectedRoute>
      <main className="min-h-screen text-white p-6">
        <h1 className="text-3xl font-bold mb-6">Manager Dashboard</h1>

        <table className="w-full bg-slate-800 border border-slate-700 rounded-xl">
          <thead className="bg-slate-700">
            <tr>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-slate-700">
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </ProtectedRoute>
  );
}
