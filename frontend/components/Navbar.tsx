"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const r = localStorage.getItem("role");
    setLoggedIn(!!token);
    setRole(r);
  }, []);

  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    router.push("/login?logout=true");
  }

  return (
    <nav className="w-full bg-slate-900 text-white px-6 py-4 flex justify-between items-center border-b border-slate-700">
      <a href="/" className="text-xl font-bold">SecureHub</a>

      {loggedIn && (
        <div className="flex gap-4">
          {/* DASHBOARD LINKS BY ROLE */}

          {role === "admin" && (
            <>
              <a href="/dashboard/admin" className="hover:text-blue-400">Admin Panel</a>
              <a href="/dashboard/admin/logs" className="hover:text-blue-400">Audit Logs</a>
            </>
          )}

          {role === "manager" && (
            <a href="/dashboard/manager" className="hover:text-blue-400">
              Manager Dashboard
            </a>
          )}

          {role === "employee" && (
            <a href="/dashboard/user" className="hover:text-blue-400">
              Dashboard
            </a>
          )}

          {/* COMMON LINKS */}
          <a href="/account" className="hover:text-blue-400">Account</a>

          <button
            onClick={logout}
            className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
