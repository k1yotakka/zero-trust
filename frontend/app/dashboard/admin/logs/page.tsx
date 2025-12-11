"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { api } from "@/lib/api";

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    api.get("/admin/auditLogs").then((r) => setLogs(r.data));
  }, []);

  return (
    <ProtectedRoute>
      <main className="min-h-screen text-white p-6">
        <h1 className="text-3xl font-bold mb-6">Audit Logs</h1>

        {logs.length === 0 ? (
          <p className="text-gray-400">No logs yet...</p>
        ) : (
          <table className="w-full bg-slate-800 border border-slate-700 rounded-xl">
            <thead className="bg-slate-700">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Timestamp</th>
                <th className="p-3 text-left">Event Type</th>
                <th className="p-3 text-left">Email</th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log, index) => (
                <tr key={index} className="border-t border-slate-700">
                  <td className="p-3">{log.id}</td>
                  <td className="p-3">{log.timestamp}</td>
                  <td className="p-3">{log.type}</td>
                  <td className="p-3">{log.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </ProtectedRoute>
  );
}
