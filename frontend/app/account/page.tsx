"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { api } from "@/lib/api";

interface UserInfo {
  id: number;
  email: string;
  role: string;
}

export default function AccountPage() {
  const [info, setInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    api.get("/account/me").then((r) => setInfo(r.data));
  }, []);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-slate-900 text-white p-6">
        <div className="max-w-lg mx-auto bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h1 className="text-3xl font-bold mb-4 text-center">Account</h1>

          {info ? (
            <div className="space-y-3">
              <p><span className="text-gray-400">ID:</span> {info.id}</p>
              <p><span className="text-gray-400">Email:</span> {info.email}</p>
              <p><span className="text-gray-400">Role:</span> {info.role}</p>

              <a
                href="/dashboard"
                className="block text-center mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
              >
                Перейти в Dashboard
              </a>
            </div>
          ) : (
            <p>Загрузка...</p>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}
