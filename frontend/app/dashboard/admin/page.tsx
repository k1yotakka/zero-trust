"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    api.get("/admin/users").then((r) => setUsers(r.data));
  }, []);

  function updateRole(id: number, newRole: string) {
    api.patch(`/admin/users/${id}`, { role: newRole }).then((r) => {
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
      );
    });
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen text-white p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <table className="w-full bg-slate-800 border border-slate-700 rounded-xl">
          <thead className="bg-slate-700">
            <tr>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-slate-700">
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.role}</td>
                <td className="p-3">
                  <select
                    className="bg-slate-700 p-2 rounded"
                    value={u.role}
                    onChange={(e) => updateRole(u.id, e.target.value)}
                  >
                    <option value="employee">employee</option>
                    <option value="manager">manager</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </ProtectedRoute>
  );
}
